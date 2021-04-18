import os
from flask import Flask, request, Response
import filetype
from tqdm import tqdm
from googletrans import Translator
import io
from base64 import encodebytes
from PIL import Image
import pymongo
import base64

from util import make_response
import brahmi_classifier
from segmentation import image_segmentation
from possible_word_finder import searchForWords

app = Flask(__name__)

input_data = "input_data"
segmented_letters = "segmented_letters"

@app.route("/api/getLetters", methods=["POST"])
def translateLetters():
    try:
        data = request.get_json()['image']

        with open("input_data/plate.png", "wb") as fh:
            fh.write(base64.b64decode(data))

        flag = image_segmentation()

        if (flag == True):
            result = {}
            classify_letters = brahmi_classifier.classify_letters()
            result['letter'] = classify_letters

            test_path = os.path.join(segmented_letters)
            segmented_images = []

            for img in tqdm(os.listdir(test_path)):
                if filetype.is_image(os.path.join(test_path, img)):
                    image_path = os.path.join(test_path, img)
                    pil_img = Image.open(image_path, mode='r')
                    byte_arr = io.BytesIO()
                    pil_img.save(byte_arr, format='PNG')
                    encoded_img = encodebytes(byte_arr.getvalue()).decode('ascii')
                    segmented_images.append(encoded_img)
                    os.remove(os.path.join(test_path, img))

            result['images'] = segmented_images

            response = make_response(result, True, 200)
            os.remove("input_data/plate.png")
            return Response(response=response, status=200, mimetype='application/json')
        else:
            test_path = os.path.join(segmented_letters)

            for img in tqdm(os.listdir(test_path)):
                if filetype.is_image(os.path.join(test_path, img)):
                    os.remove(os.path.join(test_path, img))

            os.remove("input_data/plate.png")
            response = make_response("Too much noise in image", True, 200)
            return Response(response=response, status=200, mimetype='application/json')
    except Exception as e:
        response = make_response('Something went wrong', False, 404)
        return Response(response=response, status=404, mimetype='application/json')


@app.route('/api/getPossibleWords', methods=['POST'])
def getPossibleWords():
    try:
        data = request.get_json()['letters']
        myclient = pymongo.MongoClient("mongodb+srv://brahmilator_db:brahmilator123@cluster0.zf5dm.mongodb.net/brahmilator_db?retryWrites=true&w=majority")
        mydb = myclient["brahmilator_database"]
        column = mydb["words"]

        words = searchForWords(column, data)

        if len(words) > 0:
            possible_words = []
            for key, value in words.items():
                possible_words.append(key)

            result = {}
            result["possible_words"] = possible_words
            result["possible_words_with_meaning"] = words

            response = make_response(result, True, 200)
            return Response(response=response, status=200, mimetype='application/json')
        else:
            response = make_response("Possible match not found", True, 404)
            return Response(response=response, status=200, mimetype='application/json')
    except Exception as e:
        response = make_response('Something went wrong', False, 404)
        return Response(response=response, status=404, mimetype='application/json')


@app.route("/api/translate", methods=["POST"])
def translate():
    try:
        data = request.get_json()['possible_words_with_meaning']
        src_lan = request.get_json()['src_lan']
        dest_lan = request.get_json()['dest_lan']
        translator = Translator()

        output = {}
        for key, value in data.items():
            temp = []
            for word in value:
                translate = translator.translate(word, src=src_lan, dest=dest_lan)
                temp.append(translate.text)
            output[key] = temp

        result = {}
        result['possible_words_with_meaning'] = output
        result['src_lan'] = dest_lan

        response = make_response(result, False, 200)
        return Response(response=response, status=200, mimetype='application/json')
    except Exception as e:
        response = make_response('Something went wrong', False, 404)
        return Response(response=response, status=404, mimetype='application/json')


if __name__ == '__main__':
    app.run('0.0.0.0')

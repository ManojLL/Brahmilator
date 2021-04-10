import os

import flask
from flask import Flask, request, Response, jsonify
import filetype
from tqdm import tqdm
from googletrans import Translator
import io
from base64 import encodebytes
from PIL import Image
import pymongo
from util import make_response
import brahmi_classifier
from segmentation import image_segmentation
from possible_word_finder import searchForWords

app = Flask(__name__)

input_data = "input_data"
segmented_letters = "segmented_letters"

@app.route("/api/getLetters", methods=["POST"])
def translateLetters():
    global image_name
    try:
        image = request.files["image"]
        image_name = image.filename
        image.save(os.path.join(input_data, image_name))

        if filetype.is_image(os.path.join(input_data, image_name)):
            flag = image_segmentation(image_name)

            if (flag == True):
                result = {}
                classify_letters = brahmi_classifier.classify_letters()
                result['letter'] = classify_letters

                test_path = os.path.join(segmented_letters)
                segmented_images = []

                for img in tqdm(os.listdir(test_path)):
                    image_path = os.path.join(test_path, img)
                    pil_img = Image.open(image_path, mode='r')
                    byte_arr = io.BytesIO()
                    pil_img.save(byte_arr, format='PNG')
                    encoded_img = encodebytes(byte_arr.getvalue()).decode('ascii')
                    segmented_images.append(encoded_img)
                    os.remove(os.path.join(test_path, img))

                result['images'] = segmented_images

                response = make_response(result, True, 200)
                os.remove(os.path.join(input_data, image_name))
                return Response(response=response, status=200, mimetype='application/json')
            else:
                test_path = os.path.join(segmented_letters)

                for img in tqdm(os.listdir(test_path)):
                    os.remove(os.path.join(test_path, img))

                os.remove(os.path.join(input_data, image_name))
                response = make_response("Too much noise in image", True, 200)
                return Response(response=response, status=200, mimetype='application/json')
        else:
            os.remove(os.path.join(input_data, image_name))
            response = make_response('The file is NOT an Image', False, 403)
            return Response(response=response, status=403, mimetype='application/json')
    except Exception as e:
        os.remove(os.path.join(input_data, image_name))
        response = make_response('The file is NOT FOUND', False, 404)
        return Response(response=response, status=404, mimetype='application/json')

@app.route('/api/getSegmentedImage', methods=['POST'])
def segmentedImages():
    try:
        image = request.files["image"]
        image_name = image.filename
        image.save(os.path.join(input_data, image_name))

        if filetype.is_image(os.path.join(input_data, image_name)):
            flag = image_segmentation(image_name)

            if (flag == True):
                test_path = os.path.join(segmented_letters)

                segmented_images = []

                for img in tqdm(os.listdir(test_path)):
                    image_path = os.path.join(test_path, img)
                    pil_img = Image.open(image_path, mode='r')  # reads the PIL image
                    byte_arr = io.BytesIO()
                    pil_img.save(byte_arr, format='PNG')  # convert the PIL image to byte array
                    encoded_img = encodebytes(byte_arr.getvalue()).decode('ascii')  # encode as base64
                    segmented_images.append(encoded_img)
                    os.remove(os.path.join(test_path, img))

                os.remove(os.path.join(input_data, image_name))
                result = {'images': segmented_images}
                response = make_response(result, True, 200)
                return Response(response=response, status=200, mimetype='application/json')
            else:
                test_path = os.path.join(segmented_letters)

                for img in tqdm(os.listdir(test_path)):
                    os.remove(os.path.join(test_path, img))

                os.remove(os.path.join(input_data, image_name))
                response = make_response("Too much noise in image", True, 200)
                return Response(response=response, status=200, mimetype='application/json')
        else:
            os.remove(os.path.join(input_data, image_name))
            response = make_response('The file is NOT an Image', False, 200)
            return Response(response=response, status=200, mimetype='application/json')
    except Exception as e:
        os.remove(os.path.join(input_data, image_name))
        response = make_response('The file is NOT FOUND', False, 404)
        return Response(response=response, status=404, mimetype='application/json')

@app.route('/api/getPossibleWords', methods=['POST'])
def getPossibleWords():
    data = request.get_json()['letters']
    print(data)
    myclient = pymongo.MongoClient("mongodb+srv://brahmilator_db:brahmilator123@cluster0.zf5dm.mongodb.net/brahmilator_db?retryWrites=true&w=majority")
    mydb = myclient["brahmilator_database"]
    column = mydb["words"]

    result = searchForWords(column, data)

    response = make_response(result, True, 200)
    return Response(response=response, status=200, mimetype='application/json')

@app.route("/api/translate", methods=["POST"])
def translate():
    args = request.args
    sentence = args['sentence']
    src_lan = args['src_lan']
    dest_lan = args['dest_lan']
    translator = Translator()
    translate = translator.translate(sentence, src=src_lan, dest=dest_lan)
    response = make_response(translate.text, False, 200)
    return Response(response=response, status=200, mimetype='application/json')

if __name__ == '__main__':
    app.run('0.0.0.0')

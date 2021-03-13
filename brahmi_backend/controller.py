import os
from flask import Flask, redirect, url_for, request, jsonify, Response, abort, json
import filetype

app = Flask(__name__)


@app.route("/api/getLetters", methods=["POST"])
def translateLetters():
    try:
        image = request.files["image"]
        image_name = image.filename
        image.save(os.path.join(os.getcwd(), image_name))
        if filetype.is_image(image_name):
            letter = {'letters': ['a', 'b', 'c', 'd']}
            count = 1
            os.remove(image_name)
            # todo: pre processing part
            # todo :  predictions
            # todo : get result and add to response
            return Response(json.dumps(letter), status=200, mimetype='application/json')
        else:
            return Response(json.dumps({'result': 'not an image'}), status=200, mimetype='application/json')
    except:
        return Response(json.dumps({'massege': 'file not found'}), status=404, mimetype='application/json')


# @app.route("/api/getWords", methods=["POST"])
# def getWords():

if __name__ == '__main__':
    app.run()

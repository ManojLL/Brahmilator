import os
from flask import Flask, redirect, url_for, request, jsonify, Response, abort, json
import filetype
import services
from util import make_response
app = Flask(__name__)


@app.route("/api/getLetters", methods=["POST"])
def translateLetters():
    try:
        image = request.files["image"]
        image_name = image.filename
        image.save(os.path.join(os.getcwd(), image_name))
        if filetype.is_image(image_name):
            classify_letters = services.classify_letters(image_name)
            result = {'letters': classify_letters,'suggestions':{'c':1}}
            response = make_response(result,True,200)
            # todo: pre processing part
            # todo :  predictions
            # todo : get result and add to response
            os.remove(image_name)
            return Response(response=response, status=200, mimetype='application/json')
        else:
            response = make_response('The file is NOT an Image', False, 200)
            return Response(response=response, status=200, mimetype='application/json')
    except:
        response = make_response('The file is NOT FOUND', False, 404)
        return Response(response=response, status=404, mimetype='application/json')


# @app.route("/api/getWords", methods=["POST"])
# def getWords():

if __name__ == '__main__':
    app.run()

import os
import json
from flask import Flask, redirect, url_for, request, jsonify, Response, abort

app = Flask(__name__)


@app.route("/api/getLetters", methods=["POST"])
def translateLetters():
    try:
        image = request.files["image"]
        image_name = image.filename
        image.save(os.path.join(os.getcwd(), image_name))
        # todo: pre processing part
        # todo :  predictions
        # todo : get result and add to response
        response = ['a', 'b', 'c', 'd']
        letter = []
        count = 1

        for x in response:
            x = {count: x}
            letter.append(x)
            count = count + 1
        os.remove(image_name)

        return Response(json.dumps(letter), status=200, mimetype='application/json')
    except FileNotFoundError:
        abort(404)


# @app.route("/api/getWords", methods=["POST"])
# def getWords():

if __name__ == '__main__':
    app.run()

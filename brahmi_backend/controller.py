import os
from flask import Flask, redirect, url_for, request, jsonify, Response, abort, json
import filetype
import services
from util import make_response

app = Flask(__name__)

data_save_path = "D:/Studies/IIT/Level 5/2 Sem/SDGP/SDGP_THE_Tyrants/brahmi_backend/data"

@app.route("/api/getLetters", methods=["POST"])
def translateLetters():
    try:
        image = request.files["image"]
        image_name = image.filename
        image.save(os.path.join(data_save_path, image_name))
        if filetype.is_image(os.path.join(data_save_path, image_name)):
            classify_letters = services.classify_letters()
            result = {'letter': classify_letters}
            response = make_response(result,True,200)
            os.remove(os.path.join(data_save_path, image_name))
            return Response(response=response, status=200, mimetype='application/json')
        else:
            response = make_response('The file is NOT an Image', False, 200)
            return Response(response=response, status=200, mimetype='application/json')
    except Exception as e:
        print(e)
        response = make_response('The file is NOT FOUND', False, 404)
        return Response(response=response, status=404, mimetype='application/json')


# @app.route("/api/getWords", methods=["POST"])
# def getWords():

if __name__ == '__main__':
    app.run()

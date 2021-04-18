import json


# function to make return statement (type - json) with result
def make_response(result, ok, code):
    response = {
        'status_code': str(code),
        'status': str(ok),
        'outPut': result
    }

    return json.dumps(response)

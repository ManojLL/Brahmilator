import json


def make_response(result, ok, code):
    # if isinstance(result, str):
    #     response = {
    #         'status_code': str(code),
    #         'status': str(ok),
    #         'result': result
    #     }
    #     return json.dumps({"response": response})

    response = {
        'status_code': str(code),
        'status': str(ok),
        'outPut': result
    }

    return json.dumps(response)

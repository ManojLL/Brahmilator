import pymongo

def search(value, column):
    myquery = {"word": value}

    mydoc = column.find(myquery)

    possible_meanings = []

    for x in mydoc:
        possible_meanings.append(x['meaning'])

    return possible_meanings
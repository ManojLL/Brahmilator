import pymongo
import csv

def search(value):
    myquery = {"word": value}

    myclient = pymongo.MongoClient(
        "mongodb+srv://brahmilator_db:brahmilator123@cluster0.zf5dm.mongodb.net/brahmilator_db?retryWrites=true&w=majority")

    mydb = myclient["brahmilator_database"]


    column = mydb["words"]

    mydoc = column.find(myquery)

    possible_meanings = []

    for x in mydoc:
        possible_meanings.append(x['meaning'])

    return possible_meanings
import pymongo
import csv

def search(query):
    # print('db test')
    print(query)
    myclient = pymongo.MongoClient(
        "mongodb+srv://brahmilator_db:brahmilator123@cluster0.zf5dm.mongodb.net/brahmilator_db?retryWrites=true&w=majority")

    mydb = myclient["brahmilator_database"]

    column = mydb["words"]

    mydoc = column.find(query)

    for x in mydoc:
        print("response")
        print(x)
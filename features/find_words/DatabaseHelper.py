import pymongo
import csv

myclient = pymongo.MongoClient(
    "mongodb+srv://brahmilator_db:brahmilator123@cluster0.zf5dm.mongodb.net/brahmilator_db?retryWrites=true&w=majority")
print(myclient.test)

# Creating the database
mydb = myclient["brahmilator_database"]
print("database created")

dblist = myclient.list_database_names()
if "brahmilator_database" in dblist:
    print("The database exists")

column = mydb["words"]


# words = [
#     {"brahmi": "akara", "eng": "house"},
#     {"brahmi": "biku", "eng": "monk"},
# ]

def read_csv(filename):
    with open(filename) as f:
        file_data = csv.reader(f)
        headers = next(file_data)
        return [dict(zip(headers, i)) for i in file_data]


words = read_csv("db1.txt")

print(words)

# insert data into the column one -> word
x = column.insert_many(words)

# print list of the _id values of the inserted documents:
print(x.inserted_ids)

myquery = {"id": "1"}

mydoc = column.find(myquery)

for x in mydoc:
    print(x)

column.delete_many({})

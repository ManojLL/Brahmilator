import pymongo

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

words = [
    {"brahmi": "akara", "eng": "house"},
    {"brahmi": "biku", "eng": "monk"},
]

# insert data into the column one -> word
x = column.insert_many(words)

# print list of the _id values of the inserted documents:
print(x.inserted_ids)

myquery = {"brahmi": "biku"}

mydoc = column.find(myquery)

for x in mydoc:
    print(x)

column.delete_many({})
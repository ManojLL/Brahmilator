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

# Creating db Column to hold data
column = mydb["words"]

print(column.inserted_id)


def read_csv(filename):
    # Clear db and re-populate it with new data
    # column.delete_many({})
    # Read data from db.txt
    with open(filename) as f:
        file_data = csv.reader(f)
        headers = next(file_data)
        return [dict(zip(headers, i)) for i in file_data]


words = read_csv("db1.txt")

print(words)

# Insert data into the column one -> words
x = column.insert_many(words)

# Sample Query added
myquery = {"id": "1"}
mydoc = column.find(myquery)
for x in mydoc:
    print(x)

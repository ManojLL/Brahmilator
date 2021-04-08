import pymongo

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["mydatabase"]

print(client.list_database_names())

dblist = client.list_database_names()
if "mydatabase" in dblist:
  print("The database exists.")


column_index_one = db["word"]
column_index_two = db["meaning"]

words = { "akara": "house", "biku": "monk" }

# insert data into the column one -> word
x = column_index_one.insert_one(words)
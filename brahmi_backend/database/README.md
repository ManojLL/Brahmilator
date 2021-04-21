# Brahmi Words Library

`BrahmiWordsLibrary.db` file can be used to create the csv file using DB Browser.

`db.csv` file is used to populate the MongoDb atlas database. This file should be replaced every time a new csv file is created using BrahmiWordsLibrary.db file. Even though db.csv file can be edited directly, it is better to use `BrahmiWordsLibrary.db` to add data since it has an autoincrementing id as primary key.

`DatabaseHelper.py` file contains the code to create the database, creat columns and populate it with the data in csv file.

    mongodb+srv://brahmilator_db:brahmilator123@cluster0.zf5dm.mongodb.net/brahmilator_db?retryWrites=true&w=majority

This connection string is used to access the mongodb atlas database. Also this connection string can be used to connect to the database via MongoDB compass.

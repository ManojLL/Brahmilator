from math import pow
import pymongo
from dbtest import search

result = {}

def subsequences(str):
    allWordList = []
    posibilities = []

    n = len(str)
    opsize = int(pow(2, n-1))

    for counter in range(opsize):
        current_word = ""
        for j in range(n):
            current_word = current_word + str[j]

            if (counter & (1<<j)):
                current_word = current_word + " "


        allWordList.append(current_word)

    for x in allWordList:
        x = x.split()
        for y in x:
            posibilities.append(y)

    return posibilities

myclient = pymongo.MongoClient(
        "mongodb+srv://brahmilator_db:brahmilator123@cluster0.zf5dm.mongodb.net/brahmilator_db?retryWrites=true&w=majority")

mydb = myclient["brahmilator_database"]

column = mydb["words"]

str = ['ba', 'ta', 'na', 'ga']
posibile_words = subsequences(str)

print('all posibilities')
print(*posibile_words, sep=" , ")

posibile_words = dict.fromkeys(posibile_words)

print('\nafter remove duplicates')
print(*posibile_words, sep=" , ")

for x in posibile_words:
    possible_meanings = search(x, column)
    if len(possible_meanings) != 0:
        result[x] = possible_meanings

print('\nmeanings')
for keys, values in result.items():
    print(keys)
    print(values)
    print()
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

str = ["ba", "ta", "gu", "ta",  "ha", "le", "ne", "sa", "ga", "sa"]
posibile_words = subsequences(str)

print('all posibilities')
print(*posibile_words, sep=" , ")

posibile_words = dict.fromkeys(posibile_words)

print('\nafter remove duplicates')
print(*posibile_words, sep=" , ")

given_letters = ''.join(str)

word_list = []
meaning_list = []

for x in posibile_words:
    possible_meanings = search(x, column)
    if len(possible_meanings) != 0:
        result[x] = possible_meanings
        word_list.append(x)
        meaning_list.append(possible_meanings)

index = []
for key, value in result.items():
    index.append(given_letters.find(key))

n = len(index)
for i in range(n - 1):
    for j in range(0, n - i - 1):
        if index[j] > index[j + 1]:
            word_list[j], word_list[j + 1] = word_list[j + 1], word_list[j]
            meaning_list[j], meaning_list[j + 1] = meaning_list[j + 1], meaning_list[j]
            index[j], index[j + 1] = index[j + 1], index[j]

final_result = {}
for i in range(n):
    final_result[word_list[i]] = meaning_list[i]

print('\nmeanings')
for keys, values in final_result.items():
    print(keys)
    print(values)
    print()
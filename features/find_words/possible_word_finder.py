from math import pow
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

str = ['ba', 'ta', 'na', 'ga']
posibile_words = subsequences(str)

posibile_words = dict.fromkeys(posibile_words)

for x in posibile_words:
    print(x)
    possible_meanings = search(x)
    if len(possible_meanings) != 0:
        result[x] = possible_meanings

for keys, values in result.items():
    print(keys)
    print(values)
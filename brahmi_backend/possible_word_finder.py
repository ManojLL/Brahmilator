from math import pow

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

def searchInDB(column, word):
    query = {"word": word}
    mydoc = column.find(query)
    possible_meanings = []

    for x in mydoc:
        possible_meanings.append(x['meaning'])

    return possible_meanings


def searchForWords(column, str):
    posibile_words = subsequences(str)
    posibile_words = dict.fromkeys(posibile_words)

    result = {}

    for x in posibile_words:
        possible_meanings = searchInDB(column, x)
        if len(possible_meanings) != 0:
            result[x] = possible_meanings

    return result
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

    given_letters = ''.join(str)

    result = {}
    word_list = []
    meaning_list = []

    for x in posibile_words:
        possible_meanings = searchInDB(column, x)
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

    final_result = {}
    for i in range(n):
        final_result[word_list[i]] = meaning_list[i]

    return final_result
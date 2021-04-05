def charCount(word):
    dict = {}
    for i in word:
        dict[i] = dict.get(i, 0) + 1
    return dict


def possible_words(lwords, charSet, input2):
    for word in lwords:
        flag = 1
        chars = charCount(word)
        for key in chars:
            if key not in charSet:
                flag = 0
            else:
                if charSet.count(key) != chars[key]:
                    flag = 0
        if flag == 1:
            index = lwords.index(word)
            print(word + ' : ' + input2[index])


input = ['go', 'bat', 'me', 'eat', 'goal', 'boy', 'run']
input2 = ['g+o', 'b+a+t', 'm+e', 'e+a+t', 'g+o+a+l', 'b+o+y', 'r+u+n']
charSet = ['e', 'o', 'b', 'a', 'm', 'g', 'l']
possible_words(input, charSet, input2)
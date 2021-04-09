# Python 3 program to print all strings
# that can be made by placing spaces
from math import pow
from dbtest import search

posibilities = []
result = {}

def printSubsequences(str):
	n = len(str)
	opsize = int(pow(2, n - 1))


	f = open("words.txt", "a")
	open('words.txt', 'w').close()

	for counter in range(opsize):
		for j in range(n):
			f.write(str[j].rstrip('\n'))
			# print(str[j], end = "")
			if (counter & (1 << j)):
				f.write(" ".rstrip('\n'))
				# print(" ", end = "")

		f.write("\n")
		# print("\n", end = "")

	f.close()

	read()

def read():
	# Using readlines()
	file1 = open('words.txt', 'r')
	Lines = file1.readlines()

	# Strips the newline character
	for line in Lines:
		line = line.split()
		for word in line:
			posibilities.append(word)


# Driver code

str = ['ba', 'ta', 'na', 'ga']
printSubsequences(str)

print(*posibilities, sep=" , ")
posibilities = dict.fromkeys(posibilities)
print(*posibilities, sep=" , ")

for x in posibilities:
	possible_meanings = search(x)
	if len(possible_meanings) != 0:
		result[x] = possible_meanings

print("output")
for keys,values in result.items():
    print(keys)
    print(values)

open('words.txt', 'w').close()


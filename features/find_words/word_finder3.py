# Python 3 program to print all strings
# that can be made by placing spaces
from math import pow
from dbtest import search

posibilities = []

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

	count = 0
	# Strips the newline character
	for line in Lines:
		line = line.split()
		posibilities.append(line)


# Driver code

str = ['ba', 'ta', 'na', 'ga']
printSubsequences(str)

# This code is contributed by
# Sanjit_Prasad

for x in posibilities:
	for y in x:
		myquery = {"word": y}
		search(myquery)

# open('words.txt', 'w').close()


Step 1: Finding all possible subsequences of given letters

Input characters: ["ba", "ta", "ne", "ga"]
Possible subsequences: [batanega , ba , tanega , bata , nega , ba , ta , nega , batane , ga , ba , tane , ga , bata , ne , ga , ba , ta , ne , ga]

Step 2: Remove duplicates from subsequences results

Possible subsequences: [batanega , ba , tanega , bata , nega , ta , batane , ga , tane , ne]

Step 3: Search remaining subsequences results in database. If subsequences result exists in database, then add them into result list and consider as a possible word in given plate.

Step 4: Reordering final result list according to given character list. In step 2 when removing duplicated there can be changes in word order. 
	
	4.1: Concertante given characters into one string
	
	Given characters: ["ba", "ta", "gu", "ta", "ha", "le", "ne", "sa", "ga", "sa"]
	Concatenate String: “batagutahalenesagasa”

	4.2: Find possible word index in concertante string

	Possible word “bata” index in concatenate string is 0
	Possible word “ha” index in concatenate string is 8
	Possible word “sagasa” index in concatenate string is 14	
	Possible word “lene” index in concatenate string is 10
	Store possible word and indexes in two different lists.
	
	4.3: Sort both arrays according to indexes using bubble sort algorithm

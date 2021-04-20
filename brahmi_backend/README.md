
API contains 3 routes

# 1. Get images of segmented letters and letter meanings - http://...url.../api/getLetters

Image of inscription send to backend as encoded data (base64).

Step 1: Retrieve data

Step 2: Decoding image of inscription as plate.png

Step 3: Send retrieved image to letter segmentation module

Step 4: If image of inscription has too much noise. Then letter segmentation can be crashed.
So, if letter segmentation done without crashing segmented letters send to Mobile-Net classification module to identify the letters in given plate.

Step 5: Return the results

# 2. Get possible words in Brahmi inscription - http://...url.../api/getPossibleWords

Step 1: Retrieve list of characters data

Step 2: Establishing connection between MongoDB and Brahmi-Backend

Step 3: Send ‘words’ column data in DB and retrieved characters to possible word find module

Step 4: Return the results

# 3. Get translated words in given native language - http://...url.../api/translate

Used googletrans (version = 3.1.0a0) library to translate given words into native language.

Step 1: Retrieve data
  •	List of words to translate
  •	Current source language
  •	Destination language
  
Step 2: translate according retrieved data using googletrans library

Step 3: Return the results


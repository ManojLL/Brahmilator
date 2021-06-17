
# Server-side of the Brahmilator

Server-side of the Brahmilator runs on a server which is currently intergrated with a CI/CD pipeline.

## 1. Get images of segmented letters and letter meanings - ../api/getLetters

Image of inscription send to backend as encoded data (base64). Steps of the procedure as follows;

01. Retrieve data.

02. Decoding image of inscription as plate.png.

03. Send retrieved image to letter segmentation module.

04. If image of inscription has too much noise. Then letter segmentation can be crashed. So, if letter segmentation done without crashing segmented letters send to Mobile-Net classification module to identify the letters in given plate.

05. Return the results.

## 2. Get possible words in Brahmi inscription - ../api/getPossibleWords

01. Retrieve list of characters data.

02. Establishing connection between MongoDB and Brahmi-Backend.

03. Send ‘words’ column data in DB and retrieved characters to possible word find module.

04. Return the results.

## 3. Get translated words in given native language - ../api/translate

Used `googletrans` (version = 3.1.0a0) library to translate given words into native language.

01. Retrieve data
    - List of words to translate
    -	Current source language
    - Destination language
  
02. Rranslate according to the retrieved data using googletrans library.
.
03. Return the results


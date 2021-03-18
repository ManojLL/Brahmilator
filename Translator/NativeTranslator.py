from googletrans import Translator

translator = Translator()

sentence = str(input("Enter Here : "))

translate = translator.translate(sentence, src='en', dest='fr')

print(translate.text)
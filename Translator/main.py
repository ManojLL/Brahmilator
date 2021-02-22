from deep_translator import PonsTranslator

sentence = str(input("Enter Here : "))

translated_sentence = PonsTranslator(source='en', target='hi').translate(sentence)

print(translated_sentence)
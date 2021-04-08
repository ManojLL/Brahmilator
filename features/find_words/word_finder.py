def Possible_Words(character):
   x = {}
   for n in character:
      x[n] = x.get(n, 0) + 1
   return x

def character_set(w, character, str):
   for char in w:
      value = 1
      m = Possible_Words(char)
      for k in m:
         if k not in character:
            value = 0
         else:
            if character.count(k) != m[k]:
               value = 0
      if value == 1:
         if (char in str):
             print(char)



data = ['fat', 'tap', 'day', 'fun', 'man', 'ant', 'bag', 'aim']
words = ['m', 'p', 'e', 'd', 'f', 'a', 't', 'y', 'i']

str = ""
for x in range(len(words)):
    str += words[x]

character_set(data, words, str)
import spacy
nlp = spacy.load('fr_core_news_md')

print(nlp("salut,je suis heureux").to_array)
      
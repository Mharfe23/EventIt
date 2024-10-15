import spacy

# Load the French spaCy model
nlp = spacy.load('fr_core_news_md')

# Process a text
#text = "Je suis Ingénieur Logiciel spécialisé dans le Développement web et je participe à cet événement pour découvrir les dernières tendances en matière de frameworks JavaScript et rencontrer des experts en React et Node.js."
text = "Alice est passionnée par l'intelligence artificielle et le développement d'applications mobiles. Elle a travaillé sur plusieurs projets d'IA et est toujours à la recherche de nouvelles technologies pour améliorer ses compétences. Elle participe à des événements technologiques pour rencontrer d'autres professionnels et échanger des idées.."
doc = nlp(text)

for token in doc:
    print(token.text, token.lemma_, token.pos_, token.is_stop)
# Iterate through the tokens in the processed text


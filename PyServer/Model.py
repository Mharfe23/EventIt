import spacy
from collections import defaultdict

# Load the French spaCy model
nlp = spacy.load('fr_core_news_md')

def extract_keywords(text):
    doc = nlp(text)
    # Extract lemmatized forms of the keywords including verbs
    keywords = [token.lemma_ for token in doc if token.pos_ in ['NOUN','ADJ'] if not token.is_stop]
    return keywords



# Matchmaking function based on keyword overlap and cosine similarity
def match_participants(participants, target):
    matches = []
    target_keywords = extract_keywords(target["info"])  # Get lemmatized keywords from target
    doc_target_keywords = nlp(" ".join(target_keywords))

    for p1 in participants:
        if p1['user_id'] != target["user_id"]:
            keywords = extract_keywords(p1["info"])  # Get lemmatized keywords from participant
            doc_keyword = nlp(" ".join(keywords))

            # Calculate keyword overlap
            overlap = set(keywords) & set(target_keywords)
            
            score = doc_target_keywords.similarity(doc_keyword)  
           
            
            
            
            if score > 0.8 or len(overlap) >= 2 :  # Only match if there is an overlap
                matches.append({
                    "user_id": p1['user_id'],
                    "fullname": p1["fullname"],
                    "common_keywords": list(overlap),
                    "score":score,
                    
                })

    matches.sort(key=lambda x: x["score"], reverse=True)  # Sort matches by final score
    return matches

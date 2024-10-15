import spacy
from collections import defaultdict
from sklearn.metrics.pairwise import cosine_similarity
#from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np

# Load the French spaCy model
nlp = spacy.load('fr_core_news_sm')

def extract_keywords(text):
    doc = nlp(text)
    # Extract lemmatized forms of the keywords including verbs
    keywords = [token.lemma_.lower() for token in doc if not token.is_stop and not token.is_punct and token.pos_ in ['NOUN', 'ADJ', 'ADV', 'VERB']]
    return keywords

def calculate_cosine_similarity(keywords1, keywords2):
    # Create a CountVectorizer to create vectors from keywords
    #vectorizer = CountVectorizer().fit_transform([' '.join(keywords1), ' '.join(keywords2)])

    vectorizer = TfidfVectorizer().fit_transform([' '.join(keywords1), ' '.join(keywords2)])


    vectors = vectorizer.toarray()  # Convert to array
    return cosine_similarity(vectors)[0][1]  # Return cosine similarity

# Matchmaking function based on keyword overlap and cosine similarity
def match_participants(participants, target):
    matches = []
    target_keywords = extract_keywords(target["info"])  # Get lemmatized keywords from target

    for p1 in participants:
        if p1['user_id'] != target["user_id"]:
            keywords = extract_keywords(p1["info"])  # Get lemmatized keywords from participant
            
            # Calculate keyword overlap
            overlap = set(keywords) & set(target_keywords)
            overlap_score = len(overlap)  # Score based on the number of common keywords
            
            # Calculate cosine similarity based on keywords
            cosine_score = calculate_cosine_similarity(keywords, target_keywords)
            
            # Combine scores for final matching score (you can weight them as needed)
            final_score = overlap_score*5 + cosine_score
            
            if overlap:  # Only match if there is an overlap
                matches.append({
                    "user_id": p1['user_id'],
                    "fullname": p1["fullname"],
                    "common_keywords": list(overlap),
                    "overlap_score": overlap_score,
                    "cosine_score": cosine_score,
                    "final_score": final_score,
                    
                })

    matches.sort(key=lambda x: x["final_score"], reverse=True)  # Sort matches by final score
    return matches

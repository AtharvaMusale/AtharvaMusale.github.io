
![image](https://user-images.githubusercontent.com/46114095/134459818-7e858caa-7782-4a4b-92c3-b3f4c75ea11c.png)

Any Machine Learning or Deep Learning model operates on a numeric feature space, expecting an input to be a two-dimensional vector where rows are the instances and columns are the features. In order to perform a language modeling on text, text must be transformed into vector representation such that machine learning or deep learning algorithms can be applied to the textual data. This process of converting text to a vector is called Vectorization. This is the first essential step towards language modeling.

## Text Vectorization Techniques

Some commonly used text vectorization techniques are-

* Bag Of Words
* TF-IDF 
* W2Vec
* Glove

Out of all these common techniques, W2Vec and Glove are used widely due to their ability to take into account the semantic meaning of words as well. So let's take a deep dive into each of these techniques.

## Bag Of Words

![image](https://user-images.githubusercontent.com/46114095/134460035-7e383086-e800-42c7-bd52-453256c0a008.png)

Bag Of Words(BOW) is one of the simplest techniques to convert a text into a vector. A bag-of-words is a representation of text that describes the occurrence of words within a document. It involves two things:

*  A vocabulary of known words.
*  A measure of the presence of known words.

It is called a bag because the order of the words is not preserved and it is only concerned if a word is present in the corpus or not. A simple intuition behind this representation is that two text corpora are similar if they have the same words in them. Let's take a simple example and try to understand how it works.

# Step 1- Data Collection

* This pasta is very tasty.
* This pasta is not so tasty.

Consider the above two lines as two text reviews from the single text corpus. Unique words in the above sentences are

# Step2- Creating a vocabulary

* This
* pasta
* is
* very
* tasty
* not
* so

These are the 7 words from the whole corpus of 11 words.

# Step3- Create Document Vectors

![image](https://user-images.githubusercontent.com/46114095/134460538-6eb8442e-9f22-4432-93be-628f98621549.png)

![image](https://user-images.githubusercontent.com/46114095/134460554-47c2f9da-2a49-4d10-b04b-2e815392e0e2.png)

While creating the BOW vector it will consider each of the words in the vocabulary and count the number of times that word appeared in the whole text corpus that count will be the value of the vector.

# How to Implement the Bag Of Words

![image](https://user-images.githubusercontent.com/46114095/134461072-4668f124-3da8-4ff3-aef0-8bdb45ecded1.png)

# Advantages of Bag Of Words
* Simple to understand and implement.

# Disadvantages of Bag Of Words
* Curse of Dimensionality- If the unique words in the corpus are too high and there are many words with low frequency then it will lead to a sparse vector representation of BOW. Sparse vector is difficult for a model to compute as well as to interpret. So the metrics of a model would be low since the model won't be able to interpret the features properly.

* Vocabulary- The vocabulary of the BOW needs to be created carefully. The text corpus should be preprocessed (like removing stopwords/punctuations, stemming, lemmatization, converting to lower case, etc). This will significantly reduce the sparsity by a lot and also help the model to interpret the vector in a better manner.

* Not Considering The Meaning- The biggest drawback of BOW is ignoring the meaning of the words in the corpus. The meaning of the words brings intuition to the whole sentence. BOW is not taking into account this while vectorizing. This is one of the biggest disadvantages of a BOW words vectorization.

## TF-IDF (Term Frequency- Inverse Document Frequency)

![image](https://user-images.githubusercontent.com/46114095/134461303-baf882f0-4cd9-4f79-ab89-2d5c3628ed6b.png)

TF-IDF is a measure of the originality of a word by comparing the number of times appears in a document with the number of documents the word appears in. Term frequency (TF) is how often a word appears in a document, divided by how many words there are. The inverse document frequency is a measure of how much information the word provides, i.e., if it's common or rare across all documents. It is the logarithmically scaled inverse fraction of the documents that contain the word (obtained by dividing the total number of documents by the number of documents containing the term, and then taking the logarithm of that quotient). Check the above figure to get the simplified formula of TFIDF.

## Need Of Log Term In IDF Formula
In simple as well as modified TFIDF formula there is a log term in the IDF formula. To understand why log term is needed let's look at the formula of IDF without considering the log term (I am considering only a simplified version of the IDF here). Without the log term formula of IDF would look like N/n. In this N is the total number of documents and n is the total number of documents in which term is present. Lets assume there were 100000 documents and the term for which IDF is being calculated is present in only 10 documents then the IDF term would be 100000/10 = 10000. The term frequency in TFIDF would be too low as compared to the IDF value calculated above. So if TF-IDF is calculated without the log term then IDF part of the formula will dominate the overall value of the TFIDF. Instead of that if we use log in the IDF then this value of IDF will be log(10000)= 4 which is significantly lower than the one without log term.

Consider the following document which has two sentences in it

d1: "Hey man! How are you? I thought you moved to New York. How come you are here in LA?"

d2: "How on earth can someone be that stupid?"

Let's calculate the TFIDF vector for the word "How". (Assuming all the punctuation are removed and preprocessing is done before calculating the TFIDF vector)

TF("How",d1) = 2 ("How" appeared two times in d1)/19(Total number of terms in d1)

TF("How",d2) = 1 ("How" appeared once in d2)/8(Total number of terms in d2 )

IDF("How",D) = log(2/2) = 0

TF-IDF("How",d1,D) = 0.10526315789 * 0 = 0

TF-IDF("How",d2,D) = 0.125 * 0 = 0

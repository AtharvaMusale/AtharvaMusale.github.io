Representing Text To Vector

![image](https://user-images.githubusercontent.com/46114095/134459818-7e858caa-7782-4a4b-92c3-b3f4c75ea11c.png)

Any Machine Learning or Deep Learning model operates on a numeric feature space, expecting an input to be a two-dimensional vector where rows are the instances and columns are the features. In order to perform a language modeling on text, text must be transformed into vector representation such that machine learning or deep learning algorithms can be applied to the textual data. This process of converting text to a vector is called Vectorization. This is the first essential step towards language modeling.

## Text Vectorization Techniques

Some commonly used text vectorization techniques are-

* Bag Of Words
* TF-IDF 
* W2Vec
* Glove

Out of all these common techniques, W2Vec and Glove are used widely due to their ability to take into account the semantic meaning of words as well. So let's take a deep dive into each of these techniques.

### Bag Of Words

![image](https://user-images.githubusercontent.com/46114095/134460035-7e383086-e800-42c7-bd52-453256c0a008.png)

Bag Of Words(BOW) is one of the simplest techniques to convert a text into a vector. A bag-of-words is a representation of text that describes the occurrence of words within a document. It involves two things:

*  A vocabulary of known words.
*  A measure of the presence of known words.

It is called a bag because the order of the words is not preserved and it is only concerned if a word is present in the corpus or not. A simple intuition behind this representation is that two text corpora are similar if they have the same words in them. Let's take a simple example and try to understand how it works.

## Step 1- Data Collection

* This pasta is very tasty.
* This pasta is not so tasty.

Consider the above two lines as two text reviews from the single text corpus. Unique words in the above sentences are

## Step2- Creating a vocabulary

* This
* pasta
* is
* very
* tasty
* not
* so

These are the 7 words from the whole corpus of 11 words.

## Step3- Create Document Vectors

![image](https://user-images.githubusercontent.com/46114095/134460538-6eb8442e-9f22-4432-93be-628f98621549.png)

![image](https://user-images.githubusercontent.com/46114095/134460554-47c2f9da-2a49-4d10-b04b-2e815392e0e2.png)

While creating the BOW vector it will consider each of the words in the vocabulary and count the number of times that word appeared in the whole text corpus that count will be the value of the vector.

## How to Implement the Bag Of Words

import nltk

import re

import numpy as np

//execute the text here as :

//text = """ # place text here  """

dataset = nltk.sent_tokenize(text)

for i in range(len(dataset)):

<t>dataset[i] = dataset[i].lower()<\t>
  
<t>dataset[i] = re.sub(r'\W', ' ', dataset[i])<\t>
  
<t>dataset[i] = re.sub(r'\s+', ' ', dataset[i])<\t>
  

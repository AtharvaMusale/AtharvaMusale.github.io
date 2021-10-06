 
# **Table Of Content -** 
* Introduction
* Population and Sample
* Gaussian Distribution
* Skewness
* Kurtosis
* Standard Normal Variate
* Kernel Density Estimation
* Central Limit Theorem
* Quantile Quantile Plots
* Bernoulli Distribution
* Chebyshew Inequality
* Log Normal Distribution
* Power Law Distribution


# **Introduction -** 

Probability is all about handling the uncertainty. Uncertainty involves making decisions based on incomplete information and this is how the whole world operates. Probability is the field of mathematics that gives tools to quantify the uncertanty of the events and reason in principled manner. Machine learning is all about building a predictive model by using uncertain data. There are three main reasons which causes uncertainty in the machine learning which are noisy data, incomplete coverage of problem domain, imperfect models. These all uncertainties can be managed by using tools of probabilty. Some of the aspects in Machine Learning where probability is used are - 

* Classification models must predict a probability of class membership.
* Algorithms are designed using probability (e.g. Naive Bayes).
* Learning algorithms will make decisions using probability (e.g. information gain).
* Sub-fields of study are built on probability (e.g. Bayesian networks).
* Algorithms are trained under probability frameworks (e.g. maximum likelihood).
* Models are fit using probabilistic loss functions (e.g. log loss and cross entropy).
* Model hyperparameters are configured with probability (e.g. Bayesian optimization).
* Probabilistic measures are used to evaluate model skill (e.g. brier score, ROC).

This is the reason why a profound knowledge of probability can be a game changer to understand the machine learning models in depth. So there are lots of thing to cover in this blog so lets dive in with some simple concepts - 

# **Population And Sample-**

![image](https://user-images.githubusercontent.com/46114095/136209142-a0c7799c-dc94-41ff-90e9-97c2c9d3c062.png)

A population is set of similar items or events which are of interest to certain experiment whereas a statistical sample is a set of items selected from the population. For example, there are ~7 Billion people on earth and the experiment is supposed to be conducted to calculate average height of humans on earth. So the population for this experiment would be 7 Billion, but carrying out an experiment on such a large scale is practically impossible. So we take the sample out of this population. Lets say like 5 Million people from all around the globe. So based on this sampled data a predictive model can be built to predict an average height of humans on earth. So to put these concepts simply, we can say that sampled data is a subset of the population and we can say that Sample < Population.

# **Gaussian Distribution / Normal Distribution-**

![image](https://user-images.githubusercontent.com/46114095/136209715-ab13adac-9e7c-4f07-9a0b-cd209dd5fef3.png)

![image](https://user-images.githubusercontent.com/46114095/136209625-95f4611a-e23a-4624-849d-9e9197e30c6c.png)

This is one of the most widely used distribution in the field of Machine Learning. 

# **References -**
* https://machinelearningmastery.com/probability-for-machine-learning/ 





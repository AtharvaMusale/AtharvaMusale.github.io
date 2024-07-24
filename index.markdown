---
layout: home
---

<!-- # Highlighted Post
- [Vision Transformer](https://atharvamusale.github.io/2021/06/06/Vision-Transformers.html) - Vision Transformers are setting new benchmarks in computer vision, showing that models trained on large datasets can outperform traditional CNNs. -->

## Recent Posts
{% for post in site.posts limit:5 %}
- [Vision Transformer](https://atharvamusale.github.io/2021/06/06/Vision-Transformers.html) - Vision Transformers are setting new benchmarks in computer vision, showing that models trained on large datasets can outperform traditional CNNs. 
- [Probability And Statistics For Machine Learning](https://atharvamusale.github.io/2021/06/10/Probability-and-Statistics-For-Machine-Learning.html) - Understanding probability is crucial in machine learning as it aids in handling uncertainty with incomplete data. This blog explores the foundational role of probability in various machine learning scenarios, from classification models predicting class membership probabilities to algorithms making decisions based on probabilistic measures like information gain and Brier score. We delve into essential concepts such as population vs. sample, Gaussian distribution, skewness, kurtosis, and kernel density estimation, illustrating how mastering probability can significantly enhance the depth of understanding in machine learning models.
{% endfor %}

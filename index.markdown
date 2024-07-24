---
layout: home
---

# Welcome to My Website

<!-- ## Highlighted Post
- [Vision Transformer](https://atharvamusale.github.io/2021/06/06/Vision-Transformers.html) - Vision Transformers are setting new benchmarks in computer vision, showing that models trained on large datasets can outperform traditional CNNs. -->

## Recent Posts
{% for post in site.posts limit:5 %}
- [Vision Transformer](https://atharvamusale.github.io/2021/06/06/Vision-Transformers.html) - {Vision Transformers are setting new benchmarks in computer vision, showing that models trained on large datasets can outperform traditional CNNs. | truncate: 50 }
{% endfor %}

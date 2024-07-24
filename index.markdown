---
layout: home
---

# Welcome to My Website

## Recent Posts
{% for post in site.posts limit:5 %}
- [{{ Representing text to vector }}]({{ https://atharvamusale.github.io/2021/09/23/Representing-Text-To-Vector.html | https://atharvamusale.github.io/2021/09/23/Representing-Text-To-Vector.html }})
{% endfor %}

<!-- ## Projects
{% for project in site.projects limit:3 %}
- [{{ project.name }}]({{ project.url | relative_url }})
{% endfor %} -->

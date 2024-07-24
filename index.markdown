---
layout: home
title: About Me
permalink: /home/
published: true
---
# Recent Posts

{% for post in site.posts limit:5 %}
<div class="post">
  <a href="{{ post.url | relative_url }}">
    <img src="{{ post.image }}" alt="{{ post.title }}" style="width: 100%; height: auto;">
    <h2>{{ post.title }}</h2>
  </a>
  <p>{{ post.excerpt | strip_html | truncate: 160 }}</p>
</div>
{% endfor %}

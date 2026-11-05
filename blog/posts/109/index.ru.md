---
title: HowToDraw 2022
---

🌲

Благодаря HowToDraw я добавил в свою библиотеку 27 картинок. Теперь я умею их рисовать и кто-то из вас тоже! 🙂

{% for post in collections.HowToDraw %} {% assign year = post.date | date: "%Y" %} {% if year == '2022' %}

1.  [{{post.data.title | escape}}]({{post.url}}) {% endif %}{% endfor %}

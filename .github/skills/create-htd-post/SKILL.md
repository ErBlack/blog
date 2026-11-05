---
name: create-htd-post
description: 'Create a HowToDraw blog post. Use when: user asks to create a "how to draw" post, HowToDraw post, HTD post, or sketch drawing tutorial post.'
argument-hint: 'Topic name and text for the post, optionally in English too'
---

# Create HowToDraw Post

1. Run `npm run post`. It creates `blog/posts/{id}/index.ru.md` and `blog/posts/{id}/{id}.11tydata.json` with today's date and the `sketch` tag.
2. In `index.ru.md`, set the title and add the Russian text after the front matter.
3. If English text is given, create `index.en.md` with the English title and text, same format. Never translate yourself.
4. In `{id}.11tydata.json`, add `HowToDraw` to `tags`; change `date` only if the user asked.
5. If an image is given, copy it into the post folder and run `npm run images`.
6. Run `npm run build`, then report the post number and titles.

## Format
- **title**: emoji + space + object name, e.g. `🧵 Шпулька` / `🧵 Spool`; double quotes only if it contains `:`.
- **body**: the user's text as-is, one blank line after the front matter, no `№` prefix.

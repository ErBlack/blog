---
name: create-htd-post
description: 'Create a HowToDraw blog post. Use when: user asks to create a "how to draw" post, HowToDraw post, HTD post, or sketch drawing tutorial post.'
argument-hint: 'Topic name and text for the post'
---

# Create HowToDraw Post

## When to Use
- User asks to create a new HowToDraw / "how to draw" blog post
- User provides a topic name and descriptive text for a drawing tutorial

## Procedure

1. **Create the post scaffold**: Run `npm run post` in the terminal. This script (`lib/scripts/createPost.js`) auto-increments the post ID and creates `blog/posts/{nextId}/index.md` with today's date and a blank frontmatter template.

2. **Edit the generated file** to fill in the HowToDraw content:
   - Set the **title**: emoji + space + Russian object name (e.g. `☘️ Клевер`, `🧲 Магнит`, `💥 Взрыв`)
   - Add the `HowToDraw` tag (the scaffold only has `sketch`)
   - Add the body text after the closing `---`
   - If the user specified a different date, update it

### Format rules
- **title**: Always starts with a single relevant emoji, followed by a space, followed by the Russian object name
- **date**: `YYYY-MM-DD` format, no quotes
- **tags**: Always exactly `sketch` and `HowToDraw`, indented with 4 spaces, no quotes
- **body**: The user's text as-is, separated from frontmatter by one blank line. No `№` numbering prefix. Paragraphs separated by blank lines.
- **No quotes** around the title unless it contains a colon (`:`), in which case use double quotes.

3. **Confirm** the post number and title to the user.

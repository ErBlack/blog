const { readdir, writeFile, mkdir } = require('fs/promises');

const POSTS_PATH = './blog/posts';

const leadingZero = num => String(num).padStart(2, '0');
const formatDate = date => `${date.getFullYear()}-${leadingZero(date.getMonth() + 1)}-${leadingZero(date.getDate())}`;

async function createPost() {
    const today = new Date();
    const maxPostId = (await readdir(POSTS_PATH))
        .map(Number)
        .filter(id => !isNaN(id))
        .reduce((a, b) => (a > b ? a : b));

    const postId = maxPostId + 1;

    await mkdir(`${POSTS_PATH}/${postId}`);

    await writeFile(
        `${POSTS_PATH}/${postId}/index.md`,
        `---
title: 
date: ${formatDate(today)}
tags:
    - sketch
layout: sketch.liquid
---
`
    );
}

createPost();

const { extname } = require('path');
const { readdir, writeFile } = require('fs/promises');
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];

const POSTS_PATH = './blog/posts';

const list = [];

async function exec() {
    const posts = (await readdir(POSTS_PATH))
        .map(Number)
        .filter(dir => !isNaN(dir))
        .sort((a, b) => a - b);

    await Promise.all(
        posts.map(async post => {
            const postDir = `${POSTS_PATH}/${post}`;

            const images = (await readdir(postDir)).filter(file => imageExtensions.includes(extname(file)));

            images.forEach(filename => {
                list.push(`./blog/posts/${post}/${filename}`);
            });
        })
    );
}

exec().then(() => console.log(list));

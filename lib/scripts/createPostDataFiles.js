const { extname } = require('path');
const { readdir, writeFile, readFile } = require('fs/promises');

const POSTS_PATH = './blog/posts';

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];

async function createDataFiles() {
    const posts = (await readdir(POSTS_PATH)).filter(dir => !isNaN(Number(dir)));

    await Promise.all(
        posts.map(async post => {
            const postDir = `${POSTS_PATH}/${post}`;

            const images = (await readdir(postDir))
                .filter(file => imageExtensions.includes(extname(file)))
                .map(file => `${postDir}/${file.normalize()}`);

            const data = {
                images,
            };

            const dataFile = `${postDir}/${post}.11tydata.json`;

            await writeFile(dataFile, JSON.stringify(data, null, 2), { encoding: 'utf-8' });
        })
    );
}

createDataFiles();

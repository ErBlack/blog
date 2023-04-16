const { extname, basename, dirname, join } = require('path');
const { readdir, writeFile, rename } = require('fs/promises');

const POSTS_PATH = './blog/posts';

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];

async function createDataFiles() {
    const posts = (await readdir(POSTS_PATH)).filter(dir => !isNaN(Number(dir)));

    await Promise.all(
        posts.map(async post => {
            const postDir = `${POSTS_PATH}/${post}`;

            const images = (await readdir(postDir)).filter(file => imageExtensions.includes(extname(file)));

            const normalizedImages = await Promise.all(
                images.map(async imageFileName => {
                    const normalizedFileName = imageFileName.replace(/[,!;]/g, '').replace(/ /g, '_').toLowerCase();

                    const newImagePath = `${postDir}/${normalizedFileName}`;

                    await rename(`${postDir}/${imageFileName}`, newImagePath);

                    return newImagePath;
                })
            );

            const data = {
                images: normalizedImages,
            };

            const dataFile = join(postDir, `${post}.11tydata.json`);

            await writeFile(dataFile, JSON.stringify(data, null, 2));
        })
    );
}

createDataFiles();

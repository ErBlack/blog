const { extname } = require('path');
const { readdir, rename } = require('fs/promises');

const { IMAGE_EXTENSIONS, POSTS_PATH } = require('../constants.json');

async function normalizedFileNames() {
    const posts = (await readdir(POSTS_PATH)).filter(dir => !isNaN(Number(dir)));

    await Promise.all(
        posts.map(async post => {
            const postDir = `${POSTS_PATH}/${post}`;

            const images = (await readdir(postDir)).filter(file => IMAGE_EXTENSIONS.includes(extname(file)));

            await Promise.all(
                images.map(async imageFileName => {
                    const normalizedFileName = imageFileName
                        .trim()
                        .replace(/[,!;—]/g, '')
                        .replace(/  /g, ' ')
                        .replace(/ /g, '_')
                        .toLowerCase()
                        .normalize();

                    const newImagePath = `${postDir}/${normalizedFileName}`;

                    await rename(`${postDir}/${imageFileName}`, newImagePath);

                    return newImagePath;
                })
            );
        })
    );
}

normalizedFileNames();

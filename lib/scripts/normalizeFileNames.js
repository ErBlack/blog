import { extname } from 'path';
import { readdir, rename } from 'fs/promises';

import { IMAGE_EXTENSIONS, POSTS_PATH } from '../constants.js';

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

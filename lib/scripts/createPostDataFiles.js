import { extname } from 'path';
import { readdir, writeFile, access } from 'fs/promises';

import { IMAGE_EXTENSIONS, POSTS_PATH } from '../constants.js';

async function createDataFiles() {
    const posts = (await readdir(POSTS_PATH)).filter(dir => !isNaN(Number(dir)));

    await Promise.all(
        posts.map(async post => {
            const postDir = `${POSTS_PATH}/${post}`;
            const dataFile = `${postDir}/${post}.11tydata.json`;

            try {
                await access(dataFile);
                return;
            } catch (_) {}

            const images = (await readdir(postDir))
                .filter(file => IMAGE_EXTENSIONS.includes(extname(file)))
                .map(file => `${postDir}/${file.normalize()}`);

            if (images.length) {
                const data = {
                    images,
                };

                await writeFile(dataFile, JSON.stringify(data, null, 2), { encoding: 'utf-8' });
            }
        })
    );
}

createDataFiles();

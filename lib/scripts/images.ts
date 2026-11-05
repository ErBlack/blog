import { existsSync } from 'fs';
import { extname } from 'path';
import { readdir, readFile, rename, writeFile } from 'fs/promises';

import { config } from '../../eleventy.config.ts';

const POSTS_PATH = `./${config.dir.input}/posts`;

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];

const isImage = (file: string) => IMAGE_EXTENSIONS.includes(extname(file));

const normalizeFileName = (fileName: string) =>
    fileName
        .trim()
        .replace(/[,!;—]/g, '')
        .replace(/  /g, ' ')
        .replace(/ /g, '_')
        .toLowerCase()
        .normalize();

async function readData(dataFile: string): Promise<{ images?: string[] }> {
    return existsSync(dataFile) ? JSON.parse(await readFile(dataFile, { encoding: 'utf-8' })) : {};
}

async function processPost(post: string) {
    const postDir = `${POSTS_PATH}/${post}`;
    const dataFile = `${postDir}/${post}.11tydata.json`;

    const files = (await readdir(postDir)).filter(isImage);
    await Promise.all(files.map(file => rename(`${postDir}/${file}`, `${postDir}/${normalizeFileName(file)}`)));

    const data = await readData(dataFile);
    if (data.images) return;

    const images = (await readdir(postDir)).filter(isImage).map(file => `${postDir}/${file.normalize()}`);
    if (images.length) {
        await writeFile(dataFile, `${JSON.stringify({ images, ...data }, null, 4)}\n`, { encoding: 'utf-8' });
    }
}

const posts = (await readdir(POSTS_PATH)).filter(dir => !isNaN(Number(dir)));

await Promise.all(posts.map(processPost));

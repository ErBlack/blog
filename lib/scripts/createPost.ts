import { readdir, writeFile, mkdir } from 'fs/promises';

import { config } from '../../eleventy.config.ts';
import languages from '../../blog/_data/languages.json' with { type: 'json' };

const POSTS_PATH = `./${config.dir.input}/posts`;

const leadingZero = (num: number) => String(num).padStart(2, '0');
const formatDate = (date: Date) =>
    `${date.getFullYear()}-${leadingZero(date.getMonth() + 1)}-${leadingZero(date.getDate())}`;

const today = new Date();
const maxPostId = (await readdir(POSTS_PATH))
    .map(Number)
    .filter(id => !isNaN(id))
    .reduce((a, b) => (a > b ? a : b));

const postId = maxPostId + 1;

await mkdir(`${POSTS_PATH}/${postId}`);

for (const { code } of languages) {
    await writeFile(`${POSTS_PATH}/${postId}/index.${code}.md`, '---\ntitle: \n---\n');
}

await writeFile(
    `${POSTS_PATH}/${postId}/${postId}.11tydata.json`,
    `${JSON.stringify({ date: formatDate(today) }, null, 4)}\n`
);

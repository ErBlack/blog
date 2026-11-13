import { execFileSync, spawnSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { readdir, readFile, writeFile } from 'fs/promises';
import { basename, extname } from 'path';

import { due } from '../due.ts';
import globals from '../../blog/_data/globals.json' with { type: 'json' };

const START = Temporal.PlainDate.from('2026-11-14');
const CHAT_ID = process.env.TELEGRAM_CHAT_ID ?? '@ErSketch';
const SITE = `${globals.host}/blog`;
const POSTS_PATH = './blog/posts';
const TEXT_LIMIT = 32768;
const MEDIA_LIMIT = 50;

const [BEFORE] = process.argv.slice(2);

const git = (...args: string[]) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });

const dataPath = (id: string) => `${POSTS_PATH}/${id}/${id}.11tydata.json`;
const textPath = (id: string) => `${POSTS_PATH}/${id}/index.ru.md`;

const call = async (method: string, params: object) => {
    const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/${method}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, ...params }),
    });
    const { ok, result, description } = await response.json();
    if (!ok) throw new Error(`${method}: ${description}`);

    return result;
};

const ids = (await readdir(POSTS_PATH)).filter(id => existsSync(textPath(id))).sort((a, b) => Number(a) - Number(b));

for (const id of ids) {
    const data = JSON.parse(await readFile(dataPath(id), 'utf8'));
    if (Temporal.PlainDate.compare(Temporal.PlainDate.from(data.date), START) < 0 || !due(data.date)) continue;
    if (
        data.telegram &&
        !(
            BEFORE &&
            [textPath(id), dataPath(id)].some(
                path =>
                    spawnSync('git', ['show', `${BEFORE}:${path}`], { encoding: 'utf8' }).stdout !==
                    readFileSync(path, 'utf8')
            )
        )
    )
        continue;

    const { tags = [], images = [] } = data;
    const markdown = [
        ...images.map((src: string) => `![](${SITE}/posts/${id}/${basename(src, extname(src))}.jpeg)`),
        tags.map((tag: string) => `\\#${tag}`).join(' '),
        (await readFile(textPath(id), 'utf8'))
            .replace(/^---\n[\s\S]*?\n---\n/, '')
            .replaceAll('](/', `](${SITE}/`)
            .trim(),
    ]
        .filter(Boolean)
        .join('\n\n');

    if (markdown.includes('{%') || markdown.length > TEXT_LIMIT || images.length > MEDIA_LIMIT) continue;

    if (!data.telegram) {
        data.telegram = (await call('sendRichMessage', { rich_message: { markdown } })).message_id;
        await writeFile(dataPath(id), `${JSON.stringify(data, null, 4)}\n`);
        git('commit', '-m', `telegram ${id}`, dataPath(id));
        git('pull', '--rebase', 'origin', 'main');
        git('push', 'origin', 'HEAD:main');
        continue;
    }

    try {
        await call('editMessageText', { message_id: data.telegram, rich_message: { markdown } });
    } catch (error) {
        if (!String(error).includes('message is not modified')) throw error;
    }
}

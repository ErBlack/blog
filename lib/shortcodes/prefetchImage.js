import Image from '@11ty/eleventy-img';
import { dirname } from 'path';

import { BUILD_PATH } from '../constants.js';

export async function prefetchImage(src) {
    if (!src) return '';

    const postDir = dirname(src);
    const outputDir = `${BUILD_PATH}/${postDir}`;
    const urlPath = '/' + postDir;

    const preview = await Image(src, {
        widths: [800],
        formats: ['avif'],
        outputDir,
        urlPath,
    });

    return `<link rel="prefetch" as="image" href="${preview.avif[0].url}">`;
}

import Image from '@11ty/eleventy-img';
import { basename, dirname } from 'path';

import { BUILD_PATH } from '../constants.js';

const COVER_SIZE = 107;

export async function cover(src, className) {
    const postDir = dirname(src);
    const postId = basename(postDir);
    const outputDir = `${BUILD_PATH}/${postDir}`;
    const urlPath = '/' + postDir;

    const metadata = await Image(src, {
        widths: [COVER_SIZE],
        formats: ['avif', 'webp', 'jpeg'],
        outputDir,
        urlPath,
        filenameFormat: function (_hash, _src, _width, format) {
            return `cover.${format}`;
        },
        sharpJpegOptions: {
            progressive: true,
        },
    });

    return Image.generateHTML(metadata, {
        alt: '',
        class: className,
        loading: 'lazy',
        decoding: 'async',
        style: `view-transition-name: cover-${postId}`,
    });
}

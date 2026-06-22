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
        widths: [COVER_SIZE, COVER_SIZE * 2],
        formats: ['avif', 'webp', 'jpeg'],
        outputDir,
        urlPath,
        filenameFormat: function (_hash, _src, width, format) {
            return `cover-${width}.${format}`;
        },
        sharpJpegOptions: {
            progressive: true,
            quality: 85,
        },
        sharpWebpOptions: {
            quality: 85,
        },
        sharpAvifOptions: {
            quality: 65,
        },
    });

    return Image.generateHTML(
        metadata,
        {
            alt: '',
            class: className,
            sizes: `${COVER_SIZE}px`,
            loading: 'lazy',
            decoding: 'async',
            style: `view-transition-name: cover-${postId}`,
        },
        { fallback: 'smallest' }
    );
}

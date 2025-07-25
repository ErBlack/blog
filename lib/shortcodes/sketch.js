import Image from '@11ty/eleventy-img';
import { dirname, basename } from 'path';

import { BUILD_PATH } from '../constants.js';

export async function sketch(src, feed = false) {
    const postDir = dirname(src);
    const outputDir = `${BUILD_PATH}/${postDir}`;
    const urlPath = '/' + postDir;

    const preview = await Image(src, {
        widths: [800],
        formats: ['webp', 'jpeg'],
        outputDir,
        urlPath,
    });

    const full = await Image(src, {
        widths: [6000],
        formats: ['jpeg'],
        outputDir,
        urlPath,
        filenameFormat: function (_id, src, _width, format) {
            const filename = basename(src);
            const name = filename.slice(0, filename.lastIndexOf('.'));

            return `${name}.${format}`;
        },
        sharpJpegOptions: {
            quality: 98,
            progressive: true,
        },
    });

    return feed
        ? `<img src="https://erblack.me${preview.jpeg[0].url}" alt="" align="left" width="100%" decoding="async" loading="lazy" />`
        : `<a href="${full.jpeg[0].url}">${Image.generateHTML(preview, {
              alt: '',
              decoding: 'async',
          })}</a>`;
}

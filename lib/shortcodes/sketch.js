import Image from '@11ty/eleventy-img';
import { dirname, basename } from 'path';

import { BUILD_PATH } from '../constants.js';

export async function sketch(src, feed = false, isFirstInGallery = false) {
    const postDir = dirname(src);
    const postId = basename(postDir);
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

    if (feed) {
        return `<img src="https://erblack.me${preview.jpeg[0].url}" alt="" align="left" width="100%" decoding="async" loading="lazy" />`;
    }

    const imgHtml = Image.generateHTML(preview, {
        alt: '',
        decoding: 'async',
    });

    const styledImgHtml = isFirstInGallery
        ? imgHtml.replace('<img', `<img style="view-transition-name: cover-${postId}"`)
        : imgHtml;

    return `<a href="${full.jpeg[0].url}">${styledImgHtml}</a>`;
}

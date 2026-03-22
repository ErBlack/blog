import Image from '@11ty/eleventy-img';
import { dirname, basename } from 'path';

import { BUILD_PATH, WEB_PATH } from '../constants.js';

export const SIZES = '(max-width: 832px) calc(100vw - 32px), 800px';

export const previewCache = new Map();

export async function sketch(src, feed = false, isFirstInGallery = false) {
    const postDir = dirname(src);
    const postId = basename(postDir);
    const outputDir = `${BUILD_PATH}/${postDir}`;
    const urlPath = '/' + postDir;

    const preview = await Image(src, {
        widths: [400, 800],
        formats: ['avif', 'webp', 'jpeg'],
        outputDir,
        urlPath,
        sharpJpegOptions: {
            progressive: true,
        },
    });

    previewCache.set(src, preview);

    const full = await Image(src, {
        widths: [6000],
        formats: ['jpeg'],
        outputDir,
        urlPath,
        filenameFormat: function (_hash, src, _width, format) {
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
        return `<img src="${WEB_PATH}${preview.jpeg[0].url}" alt="" align="left" width="${preview.jpeg[0].width}" height="${preview.jpeg[0].height}" decoding="async" loading="lazy" />`;
    }

    const imgHtml = Image.generateHTML(preview, {
        alt: '',
        sizes: SIZES,
        loading: isFirstInGallery ? 'eager' : 'lazy',
        decoding: isFirstInGallery ? 'sync' : 'async',
        fetchpriority: isFirstInGallery ? 'high' : 'low',
        style: isFirstInGallery ? `view-transition-name: cover-${postId}` : undefined,
    });

    return `<a href="${full.jpeg[0].url}">${imgHtml}</a>`;
}

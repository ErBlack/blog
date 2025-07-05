import Image from '@11ty/eleventy-img';
import { dirname } from 'path';

const buildDir = '_site';

const COVER_SIZE = 107;

export async function cover(src, className) {
    const postDir = dirname(src);
    const outputDir = `${buildDir}/${postDir}`;
    const urlPath = '/' + postDir;

    const cover = await Image(src, {
        widths: [COVER_SIZE],
        formats: ['jpeg'],
        outputDir,
        urlPath,
        filenameFormat: function (_id, _src, _width, format) {
            return `cover.${format}`;
        },
    });

    const { width, height } = cover.jpeg[0];

    const aspectRatio = width / height;
    const resultWidth = aspectRatio < 1 ? Math.round(width * aspectRatio) : width;
    const resultHeight = aspectRatio < 1 ? COVER_SIZE : height;

    return `<img alt="" class=${className} loading="lazy" decoding="async" src="${cover.jpeg[0].url}" width="${cover.jpeg[0].width}" height="${cover.jpeg[0].height}">`;
}

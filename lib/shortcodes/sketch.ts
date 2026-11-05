import Image, { generateHTML } from '@11ty/eleventy-img';
import { dirname, basename, extname } from 'path';

import { imageOutput, type ImageDirs } from '../imageOutput.ts';

export const SIZES = '(max-width: 832px) calc(100vw - 32px), 800px';

export const sketchPreview = (src: string, imageDirs: ImageDirs) =>
    Image(src, {
        widths: [400, 800],
        formats: ['avif', 'webp', 'jpeg'],
        ...imageOutput(src, imageDirs),
        sharpJpegOptions: {
            progressive: true,
            quality: 85,
        },
        sharpWebpOptions: {
            quality: 85,
        },
        sharpAvifOptions: {
            quality: 70,
        },
    });

export const sketch =
    (imageDirs: ImageDirs) =>
    async (src: string, feed = false, isFirstInGallery = false) => {
        const postId = basename(dirname(src));

        const preview = await sketchPreview(src, imageDirs);

        const full = await Image(src, {
            widths: [6000],
            formats: ['jpeg'],
            ...imageOutput(src, imageDirs),
            filenameFormat: function (_hash: string, src: string, _width: number, format: string) {
                return `${basename(src, extname(src))}.${format}`;
            },
            sharpJpegOptions: {
                quality: 98,
                progressive: true,
            },
        });

        if (feed) {
            return `<img src="${preview.jpeg[0].url}" alt="" align="left" width="${preview.jpeg[0].width}" height="${preview.jpeg[0].height}" decoding="async" loading="lazy" />`;
        }

        const imgHtml = generateHTML(preview, {
            alt: '',
            sizes: SIZES,
            loading: isFirstInGallery ? 'eager' : 'lazy',
            decoding: isFirstInGallery ? 'sync' : 'async',
            fetchpriority: isFirstInGallery ? 'high' : 'low',
            style: isFirstInGallery ? `view-transition-name: cover-${postId}` : undefined,
        });

        return `<a href="${full.jpeg[0].url}">${imgHtml}</a>`;
    };

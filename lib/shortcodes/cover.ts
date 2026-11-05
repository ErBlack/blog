import Image, { generateHTML } from '@11ty/eleventy-img';
import { basename, dirname, extname } from 'path';

import { imageOutput, type ImageDirs } from '../imageOutput.ts';

const COVER_SIZE = 107;

export const cover = (imageDirs: ImageDirs) => async (src: string, className: string) => {
    const postId = basename(dirname(src));

    const metadata = await Image(src, {
        widths: [COVER_SIZE, COVER_SIZE * 2],
        formats: ['avif', 'webp', 'jpeg'],
        ...imageOutput(src, imageDirs),
        filenameFormat: function (_hash: string, src: string, width: number, format: string) {
            return `cover-${basename(src, extname(src))}-${width}.${format}`;
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

    return generateHTML(
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
};

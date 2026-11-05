import Image from '@11ty/eleventy-img';

import { imageOutput, type ImageDirs } from '../imageOutput.ts';

export const ogImage = (imageDirs: ImageDirs) => async (src: string | undefined) => {
    if (!src) return undefined;

    const og = await Image(src, {
        widths: [600],
        formats: ['jpeg'],
        ...imageOutput(src, imageDirs),
        sharpJpegOptions: {
            quality: 94,
        },
    });

    return og.jpeg[0];
};

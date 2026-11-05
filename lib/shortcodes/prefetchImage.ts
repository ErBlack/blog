import type { ImageDirs } from '../imageOutput.ts';
import { sketchPreview } from './sketch.ts';

export const prefetchImage = (imageDirs: ImageDirs) => async (src: string) => {
    if (!src) return '';

    const { avif } = await sketchPreview(src, imageDirs);

    return `<link rel="prefetch" as="image" href="${avif[avif.length - 1].url}">`;
};

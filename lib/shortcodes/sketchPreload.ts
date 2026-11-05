import type { ImageDirs } from '../imageOutput.ts';
import { SIZES, sketchPreview } from './sketch.ts';

export const sketchPreload = (imageDirs: ImageDirs) => async (src: string) => {
    if (!src) return '';

    const { avif } = await sketchPreview(src, imageDirs);
    const avifSrcset = avif.map(image => `${image.url} ${image.width}w`).join(', ');

    return `<link rel="preload" as="image" imagesrcset="${avifSrcset}" imagesizes="${SIZES}" fetchpriority="high" type="image/avif">`;
};

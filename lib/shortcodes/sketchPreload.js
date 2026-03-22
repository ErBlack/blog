import { SIZES, previewCache } from './sketch.js';

export async function sketchPreload(src) {
    if (!src) return '';

    const preview = previewCache.get(src);
    if (!preview) return '';

    const avifSrcset = preview.avif.map(image => `${image.url} ${image.width}w`).join(', ');

    return `<link rel="preload" as="image" imagesrcset="${avifSrcset}" imagesizes="${SIZES}" fetchpriority="high" type="image/avif">`;
}

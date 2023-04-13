const Image = require('@11ty/eleventy-img');
const { dirname } = require('path');

const outputDir = '_site/blog/img';
const urlPath = '/blog/img/';

module.exports = async function sketch(src, inputPath = this.page.inputPath) {
    const fullPath = `${dirname(inputPath)}/${src}`;

    const preview = await Image(fullPath, {
        widths: [800],
        formats: ['avif', 'webp', 'jpeg'],
        outputDir,
        urlPath,
    });

    const full = await Image(fullPath, {
        widths: [1200],
        formats: ['jpeg'],
        outputDir,
        urlPath,
        sharpJpegOptions: {
            quality: 98,
            progressive: true,
        },
    });

    return `<a href="${full.jpeg[0].url}">${Image.generateHTML(preview, {
        alt: '',
        loading: 'lazy',
        decoding: 'async',
    })}</a>`;
};

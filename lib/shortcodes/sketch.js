const Image = require('@11ty/eleventy-img');
const { dirname, basename } = require('path');

const buildDir = '_site';

module.exports = async function sketch(src) {
    const postDir = dirname(src);
    const outputDir = `${buildDir}/${postDir}`;
    const urlPath = '/' + postDir;

    const preview = await Image(src, {
        widths: [800],
        formats: ['avif', 'webp', 'jpeg'],
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

    return `<a href="${full.jpeg[0].url}">${Image.generateHTML(preview, {
        alt: '',
        loading: 'lazy',
        decoding: 'async',
    })}</a>`;
};

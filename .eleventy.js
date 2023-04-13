const Image = require('@11ty/eleventy-img');
const { dirname } = require('path');
const postImages = require('./lib/shortcodes/postImages.js');
const sketch = require('./lib/shortcodes/sketch.js');

module.exports = function (eleventyConfig) {
    eleventyConfig.addShortcode('image', async function (src, alt, inputPath = this.page.inputPath) {
        const metadata = await Image(`${dirname(inputPath)}/${src}`, {
            widths: [800, 1200],
            formats: ['avif', 'webp', 'jpeg'],
            outputDir: '_site/blog/img',
            urlPath: '/blog/img/',
        });

        const imageAttributes = {
            alt,
            loading: 'lazy',
            decoding: 'async',
            sizes: 800,
        };

        return `<a>${Image.generateHTML(metadata, imageAttributes)}</a>`;
    });

    eleventyConfig.addShortcode('postImages', postImages);
    eleventyConfig.addShortcode('sketch', sketch);
};

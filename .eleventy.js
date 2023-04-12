const Image = require('@11ty/eleventy-img');
const { dirname } = require('path');

module.exports = function (eleventyConfig) {
    eleventyConfig.addShortcode('image', async function (src, alt, inputPath = this.page.inputPath) {
        const metadata = await Image(`${dirname(inputPath)}/${src}`, {
            widths: [800],
            formats: ['avif', 'webp', 'jpeg'],
            outputDir: '_site/blog/img',
            urlPath: '/blog/img/',
        });

        const imageAttributes = {
            alt,
            loading: 'lazy',
            decoding: 'async',
        };

        return Image.generateHTML(metadata, imageAttributes);
    });
};

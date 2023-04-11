const Image = require('@11ty/eleventy-img');
const { dirname } = require('path');

module.exports = function (eleventyConfig) {
    eleventyConfig.addShortcode('image', async function (src, alt, sizes) {
        console.log(dirname(this.page.inputPath));

        const metadata = await Image(`${dirname(this.page.inputPath)}/${src}`, {
            widths: [800],
            formats: ['avif', 'webp', 'jpeg'],
            outputDir: '_site/img',
        });

        const imageAttributes = {
            alt,
            sizes,
            loading: 'lazy',
            decoding: 'async',
        };

        return Image.generateHTML(metadata, imageAttributes);
    });
};

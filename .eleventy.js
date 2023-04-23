const pluginXml = require('eleventy-xml-plugin');

const sketch = require('./lib/shortcodes/sketch.js');
const cover = require('./lib/shortcodes/cover.js');
const ogImage = require('./lib/shortcodes/ogImage.js');

const year = require('./lib/filters/year.js');
const cdata = require('./lib/filters/cdata.js');

/**
 * @typedef {import('@11ty/eleventy/src/UserConfig')} UserConfig
 */

/**
 * @param {UserConfig} eleventyConfig
 */
module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('blog/static/*');

    eleventyConfig.addShortcode('sketch', sketch);
    eleventyConfig.addShortcode('cover', cover);
    eleventyConfig.addShortcode('og_image', ogImage);

    eleventyConfig.addFilter('year', year);
    eleventyConfig.addFilter('cdata', cdata);

    eleventyConfig.addPlugin(pluginXml);
};

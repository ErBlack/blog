const pluginXml = require('eleventy-xml-plugin');

const sketch = require('./lib/shortcodes/sketch.js');
const cover = require('./lib/shortcodes/cover.js');

const year = require('./lib/filters/year.js');
const stripLinks = require('./lib/filters/stripLinks.js');
const cdata = require('./lib/filters/cdata.js');

/**
 * @typedef {import('@11ty/eleventy/src/UserConfig')} UserConfig
 */

/**
 * @param {UserConfig} eleventyConfig
 */
module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('blog/*.css');
    eleventyConfig.addPassthroughCopy('blog/*.js');

    eleventyConfig.addShortcode('sketch', sketch);
    eleventyConfig.addShortcode('cover', cover);

    eleventyConfig.addFilter('year', year);
    eleventyConfig.addFilter('strip_links', stripLinks);
    eleventyConfig.addFilter('cdata', cdata);

    eleventyConfig.addPlugin(pluginXml);
};

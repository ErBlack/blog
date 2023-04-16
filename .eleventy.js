const sketch = require('./lib/shortcodes/sketch.js');
const cover = require('./lib/shortcodes/cover.js');

const year = require('./lib/filters/year.js');

/**
 * @typedef {import('@11ty/eleventy/src/UserConfig')} UserConfig
 */

/**
 * @param {UserConfig} eleventyConfig
 */
module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('blog/*.css');

    eleventyConfig.addShortcode('sketch', sketch);
    eleventyConfig.addShortcode('cover', cover);

    eleventyConfig.addFilter('year', year);
};

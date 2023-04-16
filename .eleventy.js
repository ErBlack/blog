const sketch = require('./lib/shortcodes/sketch.js');

const year = require('./lib/filters/year.js');

/**
 * @typedef {import('@11ty/eleventy/src/UserConfig')} UserConfig
 */

/**
 * @param {UserConfig} eleventyConfig
 */
module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('blog/main.css');

    eleventyConfig.addShortcode('sketch', sketch);

    eleventyConfig.addFilter('year', year);
};

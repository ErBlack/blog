const postImages = require('./lib/shortcodes/postImages.js');
const sketch = require('./lib/shortcodes/sketch.js');

const year = require('./lib/filters/year.js');

module.exports = function (eleventyConfig) {
    eleventyConfig.addShortcode('postImages', postImages);
    eleventyConfig.addShortcode('sketch', sketch);

    eleventyConfig.addFilter('year', year);
};

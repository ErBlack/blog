import pluginXml from 'eleventy-xml-plugin';

import { sketch } from './lib/shortcodes/sketch.js';
import { cover } from './lib/shortcodes/cover.js';
import { ogImage } from './lib/shortcodes/ogImage.js';

import { isoString } from './lib/filters/isoString.js';
import { cdata } from './lib/filters/cdata.js';

/**
 * @typedef {import('@11ty/eleventy').UserConfig} UserConfig
 */

/**
 * @param {UserConfig} eleventyConfig
 */
export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('blog/static/*');

    eleventyConfig.addShortcode('sketch', sketch);
    eleventyConfig.addShortcode('cover', cover);
    eleventyConfig.addShortcode('og_image', ogImage);

    eleventyConfig.addFilter('iso-string', isoString);
    eleventyConfig.addFilter('cdata', cdata);

    eleventyConfig.addPlugin(pluginXml);

    eleventyConfig.addGlobalData('currentDate', new Date());
}

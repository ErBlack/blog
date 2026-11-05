import { pathToFileURL } from 'url';

import { HtmlBasePlugin, type UserConfig } from '@11ty/eleventy';
import pluginXml from 'eleventy-xml-plugin';
import Image from '@11ty/eleventy-img';

import { sketch } from './lib/shortcodes/sketch.ts';
import { sketchPreload } from './lib/shortcodes/sketchPreload.ts';
import { prefetchImage } from './lib/shortcodes/prefetchImage.ts';
import { cover } from './lib/shortcodes/cover.ts';
import { ogImage } from './lib/shortcodes/ogImage.ts';

import { isoString } from './lib/filters/isoString.ts';
import { cdata } from './lib/filters/cdata.ts';
import { imageSrcsetBasePlugin } from './lib/plugins/imageSrcsetBase.ts';
import languages from './blog/_data/languages.json' with { type: 'json' };

export const config = {
    pathPrefix: '/blog/',
    dir: {
        input: 'blog',
    },
};

export default function (eleventyConfig: UserConfig) {
    Image.concurrency = 2;

    eleventyConfig.addDataExtension('ts', {
        read: false,
        parser: async (filePath: string) => (await import(pathToFileURL(filePath).href)).default,
    });

    const { input, output } = eleventyConfig.directories;

    eleventyConfig.addPassthroughCopy(`${input}static/*`);

    eleventyConfig.addShortcode('sketch', sketch({ input, output }));
    eleventyConfig.addShortcode('cover', cover({ input, output }));
    eleventyConfig.addFilter('og_image', ogImage({ input, output }));
    eleventyConfig.addShortcode('sketch_preload', sketchPreload({ input, output }));
    eleventyConfig.addShortcode('prefetch_image', prefetchImage({ input, output }));

    eleventyConfig.addFilter('iso-string', isoString);
    eleventyConfig.addFilter('cdata', cdata);

    for (const { code } of languages) {
        eleventyConfig.addCollection(`post_${code}`, api => api.getFilteredByGlob(`${input}posts/*/index.${code}.md`));
    }

    eleventyConfig.addPlugin(HtmlBasePlugin);
    eleventyConfig.addPlugin(imageSrcsetBasePlugin);
    eleventyConfig.addPlugin(pluginXml);

    eleventyConfig.addGlobalData('currentDate', new Date());
}

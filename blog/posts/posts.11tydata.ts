import { existsSync } from 'fs';
import { basename, dirname } from 'path';

import languages from '../_data/languages.json' with { type: 'json' };

type Language = (typeof languages)[number];

type Image = string | Record<string, string>;

type Data = { page: { inputPath: string }; images?: Image[] };

const languageOf = (inputPath: string) => {
    const code = basename(inputPath).split('.')[1];
    const language = languages.find(language => language.code === code);
    if (!language) throw new Error(`Post file must be index.<language>.md: ${inputPath}`);

    return language;
};

const postUrl = (language: Language, inputPath: string) => `${language.home}posts/${basename(dirname(inputPath))}/`;

export default {
    layout: 'post.liquid',
    eleventyComputed: {
        language: (data: Data) => languageOf(data.page.inputPath),
        permalink: (data: Data) => postUrl(languageOf(data.page.inputPath), data.page.inputPath),
        translations: (data: Data) =>
            languages
                .filter(({ code }) => existsSync(`${dirname(data.page.inputPath)}/index.${code}.md`))
                .map(language => ({ url: postUrl(language, data.page.inputPath), language })),
        images: (data: Data) => {
            if (!Array.isArray(data.images)) return undefined;

            const lang = languageOf(data.page.inputPath).code;

            return data.images.map(image => {
                if (typeof image === 'string') return image;
                if (!image[lang]) throw new Error(`No "${lang}" image in ${data.page.inputPath}`);

                return image[lang];
            });
        },
    },
};

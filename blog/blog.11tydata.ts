import { basename, dirname } from 'path';

import languages from './_data/languages.json' with { type: 'json' };

type Data = {
    page: { inputPath: string; url: string; fileSlug: string };
    pagination: { pageNumber: number };
    permalink?: string;
};

const languageOf = (data: Data) => languages.find(({ code }) => code === basename(dirname(data.page.inputPath)));

export default {
    eleventyComputed: {
        language: languageOf,
        permalink: (data: Data) => {
            const language = languageOf(data);
            if (!language) return data.permalink;
            if (data.page.fileSlug === 'feed') return language.feed;

            const { pageNumber } = data.pagination;

            return pageNumber ? `${language.home}${pageNumber}/` : language.home;
        },
        translations: (data: Data) =>
            languages.some(({ home }) => home === data.page.url)
                ? languages.map(language => ({ url: language.home, language }))
                : undefined,
    },
};

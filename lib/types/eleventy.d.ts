declare module '@11ty/eleventy' {
    type CollectionApi = { getFilteredByGlob(glob: string): unknown[] };

    export type UserConfig = {
        directories: { input: string; output: string };
        pathPrefix: string;
        htmlTransformer: { addPosthtmlPlugin(extensions: string, plugin: () => unknown): void };
        addPassthroughCopy(path: string): void;
        addShortcode(name: string, shortcode: (...args: never[]) => unknown): void;
        addFilter(name: string, filter: (...args: never[]) => unknown): void;
        addCollection(name: string, collection: (api: CollectionApi) => unknown): void;
        addPlugin(plugin: (eleventyConfig: UserConfig) => void): void;
        addGlobalData(name: string, data: unknown): void;
        addDataExtension(extension: string, options: { read: boolean; parser: (filePath: string) => unknown }): void;
    };

    export const HtmlBasePlugin: (eleventyConfig: UserConfig) => void;
}

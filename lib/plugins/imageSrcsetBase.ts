import type { UserConfig } from '@11ty/eleventy';

type Node = { attrs: Record<string, string> };

type Tree = { match(expression: object, callback: (node: Node) => Node): void };

export function imageSrcsetBasePlugin(eleventyConfig: UserConfig) {
    const { pathPrefix } = eleventyConfig;

    eleventyConfig.htmlTransformer.addPosthtmlPlugin('html', () => (tree: Tree) => {
        tree.match({ tag: 'link', attrs: { imagesrcset: true } }, node => {
            node.attrs.imagesrcset = node.attrs.imagesrcset.replace(/(^|,\s*)\//g, `$1${pathPrefix}`);

            return node;
        });

        return tree;
    });
}

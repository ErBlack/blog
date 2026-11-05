import { dirname, relative } from 'path';

export type ImageDirs = { input: string; output: string };

export const imageOutput = (src: string, { input, output }: ImageDirs) => {
    const postDir = relative(input, dirname(src));

    return { outputDir: `${output}${postDir}`, urlPath: `/${postDir}` };
};

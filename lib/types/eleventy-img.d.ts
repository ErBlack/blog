declare module '@11ty/eleventy-img' {
    type ImageItem = { url: string; width: number; height: number };

    type Metadata = Record<string, ImageItem[]>;

    type Options = {
        widths: number[];
        formats: string[];
        outputDir: string;
        urlPath: string;
        filenameFormat?: (id: string, src: string, width: number, format: string) => string;
        sharpJpegOptions?: object;
        sharpWebpOptions?: object;
        sharpAvifOptions?: object;
    };

    type Image = {
        (src: string, options: Options): Promise<Metadata>;
        concurrency: number;
    };

    const Image: Image;

    export default Image;

    export function generateHTML(
        metadata: Metadata,
        attributes: Record<string, string | undefined>,
        options?: { fallback?: string }
    ): string;
}

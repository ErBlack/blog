const Image = require('@11ty/eleventy-img');
const { dirname } = require('path');

const { WEB_PATH, BUILD_PATH } = require('../constants.json');

module.exports = async function ogImage() {
    let content = `${WEB_PATH}/blog/static/er256.png`;
    let width = 256;
    let height = 256;

    // @ts-ignore
    const src = this?.ctx?.environments?.images?.[0];
    if (src) {
        const postDir = dirname(src);
        const outputDir = `${BUILD_PATH}/${postDir}`;
        const urlPath = '/' + postDir;
        const og = await Image(src, {
            widths: [600],
            formats: ['jpeg'],
            outputDir,
            urlPath,
            sharpJpegOptions: {
                quality: 94,
            },
        });

        content = `${WEB_PATH}${og.jpeg[0].url}`;
        width = og.jpeg[0].width;
        height = og.jpeg[0].height;
    }

    return `<meta property="og:image" content="${content}">
    <meta property="og:image:width" content="${width}">
    <meta property="og:image:height" content="${height}">`;
};

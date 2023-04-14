const { dirname, extname } = require('path');
const { readdir } = require('fs/promises');
const sketch = require('./sketch');

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];

module.exports = async function postImages(inputPath = this.page.inputPath) {
    const postDir = dirname(inputPath);

    const files = await readdir(postDir);

    return await Promise.all(
        files.filter(file => imageExtensions.includes(extname(file))).map(src => sketch(src, inputPath))
    );
};

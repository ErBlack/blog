module.exports = function cdata(string) {
    return `<![CDATA[${string}]]>`;
};

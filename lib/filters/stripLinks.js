module.exports = function stripLinks (text) {
  return text.replace(/<a.*?>(.*?)<\/a>/g, '$1')
}
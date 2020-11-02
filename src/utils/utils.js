/* eslint-disable no-useless-escape */
/* eslint-disable prefer-const */
const Utils = {};

Utils.getLink = (body) => {
  let expression = /(https?:\/\/)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~@:%]*)*(#[\w\-]*)?(\?[^\s]*)?/gi;
  let regex = new RegExp(expression);
  let match = ''; let splitText = []; let startIndex = 0;
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(body)) != null) {
    splitText.push({ text: body.substr(startIndex, (match.index - startIndex)), type: 'text' });
    let cleanedLink = body.substr(match.index, (match[0].length));
    cleanedLink = cleanedLink.replace(/^https?:\/\//, '');
    splitText.push({ text: cleanedLink, type: 'link' });
    startIndex = match.index + (match[0].length);
  }
  if (startIndex < body.length) splitText.push({ text: body.substr(startIndex), type: 'text' });
  return splitText[1].text;
};

module.exports = Utils;

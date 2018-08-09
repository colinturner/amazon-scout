// import { AMAZON_URL } from './constants';

// export const scrapeString = async (selector, page) => {
//   return await page.evaluate(
//     (selector) => [document.querySelector(selector)].map(elem => elem.innerText).pop(),
//     selector
//   );
// };

// export const extractCategoryAndRank = (str, destination) => {
//   str
//     .replace(new RegExp(String.fromCharCode(160), 'g'), ' ')
//     .replace(/\s*?\(.*?\)|#/g, '')
//     .split('\n')
//     .filter(val => val.length)
//     .map(val => val.split(' in '))
//     .forEach(val => destination[val[1]] = Number(val[0]))
// };

// export const openAmazonProductPage = async (asin, page) => {
//   await page.goto(`${AMAZON_URL}${asin}`);
// };
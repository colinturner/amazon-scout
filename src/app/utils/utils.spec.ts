// import { expect } from 'chai';
// import { extractCategoryAndRank } from './helpers';
// import { scrapeString } from './helpers';

// describe('Test suite', () => {
//   it('should test assertions', () => {
//     expect(true).to.equal(true);
//   })
// })

// describe('Helper functions', () => {
//   describe('extractCategoryAndRank', () => {
//     it('should format web-scraped category/rank string into JSON', () => {
//       const webScrapedString1 = '#9 in Baby (See top 100)\n#1 in Baby > Baby Care > Health\n#2 in Baby > Baby Care > Pacifiers, Teethers & Teething Relief > Teethers\n';
//       const desiredFormat1 = {
//         rank: {
//           Baby: 9,
//           'Baby > Baby Care > Health': 1,
//           'Baby > Baby Care > Pacifiers, Teethers & Teething Relief > Teethers': 2,
//         }
//       };
//       let productJSON = {
//         rank: {}
//       };
//       extractCategoryAndRank(webScrapedString1, productJSON['rank']);
//       expect(productJSON).to.deep.equal(desiredFormat1);

//       productJSON = {
//         rank: {}
//       };
//       const webScrapedString2 = '#411 in Baby (See top 100)\n#3 in Industrial & Scientific > Professional Medical Supplies > Diagnostics & Screening > Thermometers > Oral\n';
//       const desiredFormat2 = {
//         rank: {
//           Baby: 411,
//           'Industrial & Scientific > Professional Medical Supplies > Diagnostics & Screening > Thermometers > Oral': 3,
//         }
//       };
//       extractCategoryAndRank(webScrapedString2, productJSON['rank']);
//       expect(productJSON).to.deep.equal(desiredFormat2);
//     })
//   });
// });
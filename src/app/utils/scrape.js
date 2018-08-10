const puppeteer = require('puppeteer');
const {
  scrapeString,
  extractCategoryAndRank,
  openAmazonProductPage,
} = require('./helpers');
const {
  NAME_ELEMENT,
  NAME_SELECTOR,
  DIMENSIONS_ELEMENT,
  DIMENSIONS_SELECTOR,
  CATEGORY_AND_RANK_ELEMENT,
  RANK,
  USER_AGENT,
  ASIN,
  ERROR_MESSAGE,
} = require('./constants');

const scrape = async (asin = ASIN, browser) => {
  try {
    // Open new page in headless browser
    const page = await browser.newPage();
    page.setUserAgent(USER_AGENT);

    // Navigate to Amazon product page in headless browser
    await openAmazonProductPage(asin, page);
    await page.waitForSelector(DIMENSIONS_SELECTOR);
    await page.waitForSelector(NAME_SELECTOR);

    // Scrape relevant data as strings
    const nameString = await scrapeString(NAME_ELEMENT, page);
    const dimensionsString = await scrapeString(DIMENSIONS_ELEMENT, page);
    const categoryAndRankString = await scrapeString(CATEGORY_AND_RANK_ELEMENT, page);

    // Format strings into JSON
    const product = {
      name: nameString,
      dimensions: dimensionsString,
      rank: {},
    };
    extractCategoryAndRank(categoryAndRankString, product[RANK]);

    // Print and return JSON
    console.log(product);
    page.close();
    return product;

    // Handle errors
  } catch (e) {
    console.log(ERROR_MESSAGE, e);
  }
};

module.exports = { scrape };

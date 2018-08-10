# AmazonScout

This is a full-stack web application for retrieving and storing product information based on an ASIN (Amazon Standard Identification Number). It's built with MongoDB (hosted on mLab), Express, Angular and Node.js.

## Production Environment
This project is live at https://amazon-scout.herokuapp.com/

## Development Environment

Run `ng serve` for a dev server to preview the frontend - navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
Run `npm start` to spin up a local API server and test the backend with [Postman](https://www.getpostman.com/). The server will be available on `http://localhost:8080/`.

## Design

This app was built without the use of Amazon's Product API. To work around it, the app spawns a chrome headless browser (see: [puppeteer](https://github.com/GoogleChrome/puppeteer)) inside Node.js to visit Amazon's website and scrape the DOM for information related to the product's name, dimensions, categories and ranks.
- Routes - see /server.js
- Web scraper - see /src/app/utils/scrape.js
- Angular components - see /src/app/products folder

## Limitations

Because Amazon does not use a standard, universal product page - that is, different Amazon product pages have different DOM structures - it's challenging to write a web scraper that will succeed for every Amazon product. Sometimes, for example, the product dimensions are located inside an HTML table, sometimes not - sometimes they don't exist on the page at all! That being said, this web scraper has been tested extensively for Amazon products in the [Baby Best Sellers category](https://www.amazon.com/gp/bestsellers/baby-products/ref=sv_Baby_1) and works fine for products in that section - among others :)

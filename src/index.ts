import fetch from 'node-fetch';
import {JSDOM} from 'jsdom';

/**
 * Small wrapper method for getting the actual HTML content of a website
 * @param {string} url The URL to get the HTML for
 * @return {Promise<string>} The HTML content as string
 */
const getWebsiteContent = async (url: string): Promise<string> => {
    // Simple HTTP call
    const content = await fetch(url);
    // Parsing to result as text
    return content.text();
};

/**
 * Scraper method which tries to get the value of an input element defined by the
 * provided 'cssSelector' on the provided 'url'
 * @param {string} url The URL to be crawled
 * @param {string} cssSelector The selector to apply to find the input element
 * @return {Promise<string | null | undefined>} The value of the found input element, if found
 */
const scrape = async (url: string, cssSelector: string): Promise<string | null | undefined> => {
    // Get the HTML of the URL
    const websiteHtml = await getWebsiteContent(url);
    // Create JSDOM to have a virtual DOM we can query
    const dom: JSDOM = new JSDOM(websiteHtml);
    const doc: Document = dom.window.document;
    // Search for the input element we want the value for and return it's value
    return (doc.querySelector(cssSelector) as HTMLInputElement)?.value;
};

/**
 * Simple main method to set up the parameters for our scraping
 * and posting its result
 */
const main = async (): Promise<void> => {
    // Prepare our variables
    const url: string = 'https://www.google.com';
    const cssSelector: string = 'form input[type=submit]';
    // Run the Crawler
    const scrapeResult: string | null | undefined = await scrape(url, cssSelector);
    // Print the parameters + result
    console.log('---------------------');
    console.log(`Crawling URL: '${url}'`);
    console.log(`CSS Selector : '${cssSelector}'`);
    console.log('---------------------');
    console.log(`Result: '${scrapeResult}'\n`);
};

main();

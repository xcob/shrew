import puppeteer from 'puppeteer';
import csv from 'csv-parser';
import fs from 'fs';



// app.get('/data', (req, res) => {
//   connection.query('SELECT * FROM your_table', (error, results, fields) => {
//     if (error) throw error;
//     res.send(JSON.stringify(results));
//   });
// });

const generateRandomUA = () => {
  // Array of random user agents
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15'
  ];
  // Get a random index based on the length of the user agents array 
  const randomUAIndex = Math.floor(Math.random() * userAgents.length);
  // Return a random user agent using the index above
  return userAgents[randomUAIndex];
}

  (async () => {
  //initalize browser
    const browser = await puppeteer.launch({
        headless: 'new'
    });


      // Custom user agent from generateRandomUA() function
      const customUA = generateRandomUA();


      try {
        // scan csv to pull url from row
        fs.createReadStream('./websiteMap/sitemap-zarelectric.csv')
        .pipe(csv())
        .on('data', async (data) => {
         // const res = JSON.parse(data);
          //console.log(data);
              for (const site_url in data){
                try {
                 // console.log(data.site_url);
                  //url variable from csv
                  const csvURL = data[site_url];

                  //start new page
                  let page = await browser.newPage();
    
                  // Set custom user agent
                  await page.setUserAgent(customUA);  


                 

                  //// Page await delay to hide scraping
                  const delayTime = Math.floor(Math.random() * 800) + 300;

                  //go to url
                  await page.goto(csvURL, {delay: delayTime});
                  console.log(`Navigating to ${csvURL}...`);

                  //page timeout
                  await page.waitForTimeout(6000);
    
                  //get everything on the page 
                  const dataHTML = await page.evaluate(() => document.querySelector('*').outerHTML);
                  //console.log(dataHTML);
    
                  //turn url into string and clean up for file name
                  let fileNameRaw = JSON.stringify(csvURL);
                  let fileNameDashed = fileNameRaw.replaceAll('/'|'.', '-');
                  let fileName = fileNameDashed.substring(13, fileNameDashed.length - 2)
    
                  //write returned page html to html file
                  //fs.appendFileSync('./webpages/'+fileName+'.html', dataHTML);
                  console.log("The file was saved!");
    
                }
                catch (err) {
                  //error handler
                  throw err;
                }
                finally {
                  //close the browser
                  //browser.close();
                  //Program successfully completed
                 // console.log('Program completed!')
                 }
              }
            
          });
      }
      catch(err) {
        //error handler
        throw err;
      }
  })();


export default {
};
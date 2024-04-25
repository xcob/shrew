import puppeteer from 'puppeteer';
import fs from 'fs';
//import data from './tmp/trace.json' with { type: "json" };


(async () => {
    //initalize browser
    const browser = await puppeteer.launch({
          headless: 'new'
    });

    //start new page
    let page = await browser.newPage();

    const siteURL = 'https://www.zarelectric.net/about-us/';
    console.log(`Navigating to ${siteURL}...`);

    try {
       // work dev tools 
        // await page.tracing.start({categories: ['devtools.timeline'], path: './tmp/trace.json'});
        // // console.log(pageTrace);
        // // navigate to url
        // await page.goto(siteURL);
        // console.log('Writing trace json');
        // //stop tracing
        // await page.tracing.stop();


        //retrieve json info
        let data = JSON.parse(fs.readFileSync('./tmp/trace.json'));
        //const refinedData = data.slice(1,1);
        const key = 'traceEvents.args.data.styleSheetUrl';
        const value = "https://www.zarelectric.net/cms/includes/3k9lqfkapaq.2402151356143.css";
        //const value = 'css';
        //const result = data.traceEvents.filter(d=>d[key] === value);

        if(key in data){
            //console.log(data);
            console.log('yus');
        } else{
            console.log('no');
        }


        ///////IMAGE RE-WRITE 
        // const imgAssetSubURL = 'img[data-src*="/assets/"]'
          // //const imgNotAssetSubURL = 'img[data-src*="/images/"]'
          // const updatedAssetPath = await page.$$eval(imgAssetSubURL, linkSrc => {
          //   return linkSrc.map(linkDataSrc => 
          //   linkDataSrc.getAttribute('data-src')
          //   .replaceAll('data-src="assets/'|'data-src="/assets/', 'data-src="/wp-content/uploads/assets/')
          //   );
          // });

          // const updatedAssetPath = await page.$$eval(imgAssetSubURL, linkSrc => {
          //   return linkSrc.map(linkDataSrc => 
          //   linkDataSrc.getAttribute('data-src')
          //   .replace('/assets/', 'wp-content/uploads/assets/')
          //   );
          // });



          //console.log(updatedImagePath);
          //console.log(updatedAssetPath);




          
          // // ///////
          // // /////// ADDING PAGE SPECIFIC CSS STYLESHEETS 
          // // ///////

          //get in document styles and write them to a main css file in /webpages/
            // let dataInPageCSS = await page.$$eval('style', styles => {
            //     return styles.map(stylesText => 
            //     stylesText.innerText
            //     );
            // });
            // //join array together to remove commas on file write
            // let dataInPageCSSString = dataInPageCSS.join('');
            // //change returned text to string
            // dataInPageCSSString = dataInPageCSSString.toString();
            // //css to main css file
            // fs.writeFileSync("./webpages/css/main-inpage.css", dataInPageCSSString);
            // console.log("CSS added to main css file");

          // // ///////THIS IS BEING CAUSE BY FILES.JS CONST NAME - CAN BE FIXED 
         
          // let cssLinkTarget = await page.$$eval('link[type="text/css"]', linkSrc => {
          //     return linkSrc.map(linkDataSrc => 
          //     linkDataSrc.getAttribute('href')
          //     );
          //   });
          // // making url from array a string  
          // let cssRefinedLinkTarget = cssLinkTarget.toString()
          // //getting last / of string
          // const rstrg = cssRefinedLinkTarget.lastIndexOf("/");
          // //removing dir structure from string
          // let cssFileNameFromLink = cssRefinedLinkTarget.substring(rstrg);

          // //turn url into string and clean up for file name
          // //let fileNameRaw = JSON.stringify(cssRefinedLinkTarget);
          // let fileName = cssFileNameFromLink.replaceAll('/'|'.', '-');

          // //write returned page html to html file
          //  if (fs.existsSync("./webpages/css"+fileName)) {
          //   // Don't write file
          //   console.log("CSS file already exists!");
          //  }else{
          //    //go to url
          //   await page.goto('https://'+baseURL+cssRefinedLinkTarget, {delay: delayTime});
          //   console.log(`Navigating to ${baseURL}${cssRefinedLinkTarget}`);

          //   //page timeout
          //   await page.waitForTimeout(6000);

          //   //get everything on the page 
          //   let dataCSS = await page.evaluate(() => document.querySelector('pre').innerHTML);
          //   //console.log(dataCSS);
          //   dataCSS = dataCSS.toString()
          //   dataCSS = dataCSS.replace(/&gt;/g, '>');
          //   //write file to css folder
          //   fs.appendFileSync("./webpages/css"+fileName, dataCSS);
          //   console.log("Added page specific CSS file");
          //  }

          // //  ///////
          // //  ///////  END ADDING STYLESHEETS
          // //  ///////

            //////
            //////
            //////
            ////////IMAGE SCAPING 
            //////
            //////
            //////
              //getting img data-src from local index files
              let imagefiles = await page.$$eval('picture img', imgLink => {
                return imgLink.map(imgLinkSrc => 
                  imgLinkSrc.getAttribute('data-src')
                );
              });
          //filtering null values from array
          let imagesFilesFilter = imagefiles.filter(function (el) {
          return el != null;
          });
          //console.log(imagesFilesFilter)
            for await (const imagefile of imagesFilesFilter) {
              let imagesUrlForPage = imagefile.toString();
              //removing ? query string from the end of img src
              let imageFileSplit = imagesUrlForPage.split('?');
              //creating whole img src url 
              let fullImageUrl = 'https://'+baseURL+imageFileSplit[0];
              //updating img url for file name
              let imgFileNameRefined = imageFileSplit[0].replace(/^.*[\\\/]/, '');
              if (fs.existsSync('./webpages/images/' + imgFileNameRefined)) {
                // Don't write file
                console.log("The image file already exists!");
              }else{
                console.log(fullImageUrl);
                //Going to image url
                const imagefileDL = await page.goto(fullImageUrl, {delay: delayTime});

                console.log(`Grabbing image at ${fullImageUrl}`);
                //page timeout
                await page.waitForTimeout(6000);
                //Create file from image
                fs.writeFile('./webpages/images/' + imgFileNameRefined, await imagefileDL.buffer(), function(err) {
                  if(err) {
                      return console.log(err);
                  }

                  console.log("The image file was saved!");
                });
              }
          }
          //////
          //////
          //////
          ////// IMAGE SCRAPING END
        
     

          

           //const { window } = new jsdom(dataHTMLString);

        //const dom = new JSDOM(dataHTMLString);

        // await page.exposeFunction('puppeteerLogMutation', () => {
        //   console.log('Mutation Detected: A child node has been added or removed.');
        // });

     
        //   let imgLinksUpdated = await page.$$eval(imgNotAssetSubURL,linkSrc => {
        //     linkSrc.forEach(linkDataSrc => 
        //       linkDataSrc.setAttribute(
        //         'data-src', linkDataSrc.getAttribute('data-src').replace('/images/', '/wp-content/uploads/images/')
        //         )
        //       )
        //   });
        //   console.log(imgLinksUpdated);

           
        // const imgTarget = await page.evaluate(() => document.querySelector('img'));
        // await page.$$eval(imgTarget, imgSingle => {
        //   console.log(imgSingle);
        //   const observer = new MutationObserver( mutations => {
        //     for (const mutation of mutations) {
        //       if(mutation.attributeName.includes('data-src')){
        //         //console.log(img.getAttribute('data-src'));
        //       }
        //       puppeteerLogMutation();
        //     }
        //   });
        //  observer.observe(imgSingle, { attributes: true });
        // });
        

          // const config = { subtree: true, childList: true, attributes: true, characterData: true };
          // const callback = function () { 
          //   window.updateTime(clock.innerText); 
          // };
          // const observer = new MutationObserver(callback);
          // observer.observe(clock, config);
        // setTimeout(async () => { 
        //   try{
        //      // get images and re-write src string to match wp-content structure
        

        //     ////////////////make this work
            

            
        //    }  catch(err) {
        //      //error handler
        //      throw err;
        //    }
        // }, 2000);

        

        // fs.writeFileSync(htmlPage, function(err) {
        //   if(err) {
        //       return console.log(err);
        //   }
        //   console.log("The file was saved!");
        //   });

        //console.log(encodedHTMLString);


    } 


    catch (error) {
        throw error;  
    }
    
    
})();
    
    export default {

    };


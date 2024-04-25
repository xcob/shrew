import puppeteer from 'puppeteer';
import fs from 'fs';
import mysql from 'mysql';
import { onlyTenHTMLFiles } from './files.js'

//Local WP DB Connection 
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'local',
  port: '10010',
  socketPath: '/Users/jacob/Library/Application Support/Local/run/zUrqC3vqp/mysql/mysqld.sock'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);

  // let myWPQuery = 'SELECT ID,post_content FROM wp_posts WHERE post_type="page"';

  // connection.query(myWPQuery, function (error, results, fields) {
  //   if (error) throw error;
  //   console.log('select query');
  // });
});

// app.get('/data', (req, res) => {
//   connection.query('SELECT * FROM your_table', (error, results, fields) => {
//     if (error) throw error;
//     res.send(JSON.stringify(results));
//   });
// });





  (async () => {
    //console.log(onlyTenHTMLFiles);
    //initalize browser
      const browser = await puppeteer.launch({
        headless: 'new'
      });

      try{
        //start new page
        let page = await browser.newPage();

        // let testSite = 'https://www.google.com/';
        // await page.goto(testSite);

        for (let [index, soloHTMLFile] of onlyTenHTMLFiles.entries()) {
          
        //soloHTMLFile.forEach(async (, index) => {
          let htmlPathPage = soloHTMLFile;
          //console.log(htmlPathPage);


          //Setting baseURL to use for images, css, js 
          // let getBaseURL = htmlPathPage.lastIndexOf("//");
          // let baseURL = htmlPathPage.substring(getBaseURL+2);
          // baseURL = baseURL.split('-');
          // baseURL = baseURL[0].toString();
          // console.log(baseURL);

          // Page await delay to hide scraping
          const delayTime = Math.floor(Math.random() * 800) + 300;



          let contentHtml = fs.readFileSync(htmlPathPage, 'utf8');
          //console.log(typeof contentHtml)
         
          await page.setContent(contentHtml);

          //grab all html
          let dataHTMLString = await page.$eval('#MainZone', el => el.innerHTML);

          //grab title for POST_TITLE
          let titleStringRaw = await page.$eval('title', el => el.textContent);

          //Slice title string to not include Site Title
          let titleString = titleStringRaw.substring(0, titleStringRaw.indexOf("|"));
          
          //replacing spaces with dash, shortening, and lowercasing title for url/slug
          let slugURLRaw = titleString.replace(/\s+/g, '-').toLowerCase();
          let slugURL = slugURLRaw.substring(0, slugURLRaw.length - 1);

          //SEO Content for yoast
            let metaDescription = await page.$$eval('meta[name="description"]', metaSrc => {
                return metaSrc.map(metaSrcContent => 
                  metaSrcContent.getAttribute('content')
                );
            });
            //console.log(metaDescription)
            metaDescription = metaDescription.toString();


          // const imgAssetSubURL = 'img[data-src*="/assets/"]';
          // let imageDataSrcArray = Array.from( await page.evaluate(() => document.querySelectorAll('img[data-src*="/assets/"]')));
          // for (let index = 0; index < imageDataSrcArray.length; index++) {
          //   console.log(imageDataSrcArray[index])
          // }

              //Lots of string manipulation for temp image fixes (will be refactored)
          //img data-src strings
          //overwriting "0" for some reason
          // let imageDataStringUpdate = dataHTMLString.replaceAll('[data-src="images/'|'[data-src="/images/','[data-src="/wp-content/uploads/images/');
          // let assetDataStringUpdate = imageDataStringUpdate.replaceAll('data-src="assets/'|'data-src="/assets/', 'data-src="/wp-content/uploads/assets/');

          // //img src strings
          // let leadingSlashWithDots = dataHTMLString.replaceAll('src="../../', 'src="../');
          // let imageSrcStringUpdate = leadingSlashWithDots.replaceAll('src="/images/'|'src="images/'|'src="../images/', 'src="/wp-content/uploads/images/');
          // let finalStringWithUpdatedImgAssets = imageSrcStringUpdate.replaceAll('src="../assets/'|'src="assets/'|'src="/assets/', 'src="/wp-content/uploads/assets/');
          //let finalStringWithUpdatedImgAssets = assetSrcStringUpdate.replaceAll('src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="', 'src=""');



            //
            // Link Src fixes
            //
            dataHTMLString = dataHTMLString.replaceAll('../'||'../../', '/');
            dataHTMLString = dataHTMLString.replaceAll("/index.html", "");

            //put all link href's in an array
              // await page.$$eval('a', links => {
              //   console.log(links)
              //    links.map((linksLink) => {
              //     console.log(linksLink)
              //       if(linksLink == null){
              //         console.log('null value');
              //       }else{
              //         console.log(linksLink.getAttribute('href'))
                      
              //         //.replaceAll("/index.html", "")
              //       }
              //     })

              //   });
               //loop through link src array and update them
              // for (let [ index, soloLink ] of linkFixes.entries()){
              //   if(soloLink != null){
              //     let pathingLink = soloLink.replaceAll('../'||'../../', '/')
              //     let replacedLinked = pathingLink.
              //     console.log(replacedLinked)
                  
              //   }
                
              // }
            //}
            
           

            //
            // Image Src fixes
            // THESE ARE ONLY UPDATING THE ARRAY AND NOT THE MAIN CONTENT STRING
            //
            //put all image src's in array
            // let imagesFixes = await page.$$eval('img', images => {
            //     return images.map(imageSrc => 
            //       imageSrc.getAttribute('src')
            //     );
            // });
            // //loop through array and update image src's
            // for await (let [ index, soloImg ] of imagesFixes.entries()){
            //   if(soloImg != null){
            //     soloImg.replaceAll('../'||'../../', '/')
            //     //console.log(replacedSrcImages)
            //   }
            // }
            // //put all image data-src's in array
            // let imagesDataFixes = await page.$$eval('img', imageDataSrc => {
            //     return imageDataSrc.map(indImagesDataSrc => 
            //       indImagesDataSrc.getAttribute('data-src')
            //     );
            // });
            // //loop through array and update image data-src's
            // for await (let [ index, soloImgData ] of imagesDataFixes.entries()){
            //   if(soloImgData != null){
            //     soloImgData.replaceAll('../'||'../../', '/')
            //     //console.log(replacedDataImages)
            //   }
            // }

            //
            //get in document styles and write them to a main css file in /webpages/
            let dataInPageCSS = await page.$$eval('style', styles => {
                return styles.map(stylesText => 
                stylesText.innerText
                );
            });
            //join array together to remove commas on file write
            let dataInPageCSSString = dataInPageCSS.join('');
            //change returned text to string
            dataInPageCSSString = dataInPageCSSString.toString();
            //css to main css file
            fs.writeFileSync("./public/css/main-inpage.css", dataInPageCSSString);
            console.log("Page css added to main css file");

            //
            //get in document scripts and write them to a main js file in /public/js/
            let dataInPageJS = await page.$$eval('script', script => {
              return script.map(scriptText => 
                scriptText.innerText
              );
            });
            //join array together to remove commas on file write
            let dataInPageJSString = dataInPageJS.join('');
            //change returned text to string
            dataInPageJSString = dataInPageJSString.toString();
            //css to main css file
            fs.writeFileSync("./public/js/main-inpage.js", dataInPageJSString);
            console.log("Page js added to main js file");
      
      



          //bakery raw HTML wrappers
          const bakeryWrapperStart = '[vc_raw_html]';
          const bakeryWrapperEnd = '[/vc_raw_html]';

          //encoding the string 
          let encodedHTMLString = Buffer.from(dataHTMLString).toString('base64');

          //wrapping encoded string in bakery [raw wrapper bits]
          let wrappedBakeryHTML = bakeryWrapperStart + encodedHTMLString + bakeryWrapperEnd;

          //get current date and string fix to match WP Query
          let postRawDate = new Date();
          let postDate = postRawDate.toISOString();
          let postTime = postDate.slice(11, 19);
          let postYear = postDate.slice(0, 10);

          // console.log(postTime);
          // console.log(postYear);
          //'2022-02-01 00:00:00'

          //Post ID based on loop index- could be better
          let IDStart = index+100;
          console.log(IDStart);

          // writing encoded and wrapped string into db
          // The below is needed for actual posts with categories
          // INSERT INTO wp_term_relationships (object_id,term_taxonomy_id) VALUES ('+index+',1) 
          let myWPQuery = 'INSERT INTO wp_posts (ID,post_title,post_content,post_name,post_modified,post_date,post_excerpt,post_author,post_status,post_type,to_ping,pinged,post_content_filtered) VALUES ("'+IDStart+'","'+titleString+'","'+wrappedBakeryHTML+'","'+slugURL+'","'+postYear+' '+postTime+'","'+postYear+' '+postTime+'","'+metaDescription+'",1,"publish","page","test","test","test")'
          connection.query(myWPQuery, function (error, results, fields) {
            if (error) throw error;
            console.log('query posted into DB');
          });

          
          
        };

        
        
       
     }
     catch(err) {
       //error handler
       throw err;
     }
     finally{
      console.log('All scripts done.')
     }
  })();


export default {
};

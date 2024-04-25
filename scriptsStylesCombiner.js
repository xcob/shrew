import fs from 'fs';

let htmlPathPage = '/Users/jacob/Downloads/www-zarelectric-net'

function getAllFiles (dir, allFilesList = []){
    const files = fs.readdirSync(dir);
    files.map(file => {
      const name = dir + '/' + file;
       // check if subdirectory is present and the dir name doesn't contain underscores 
      if (fs.statSync(name).isDirectory() 
        && name.toString().indexOf('_') === -1
      ) {
        getAllFiles(name, allFilesList);     // do recursive execution for subdirectory
      } else {
          allFilesList.push(name);           // push filename into the array
      }
    })
    
    return allFilesList;
}

const allFiles = getAllFiles(htmlPathPage);
//filter by .css file ending
const allCSSFiles = allFiles.filter(file => file.endsWith('.css'))

//write all CSS to masterCSS file
for (let [ index, singleCSSFile ] of allCSSFiles.entries()){

    const cssFileData = fs.readFileSync(singleCSSFile.toString())
    //console.log(cssFileData);

    fs.writeFileSync('./public/css/masterCSS.css', cssFileData);
}


//filter by .js file ending
const allJSFiles = allFiles.filter(file => file.endsWith('.js'))

//write all JS to masterJS file
for (let [ index, singleJSFile ] of allJSFiles.entries()){

    const jsFileData = fs.readFileSync(singleJSFile.toString())
    //console.log(jsFileData);

    fs.writeFileSync('./public/js/masterJS.js', jsFileData);
}

console.log('css and js files created.')

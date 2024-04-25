import fs from 'fs';


//pathing to your file structure
let htmlPathPage = '/Users/jacob/Downloads/www-zarelectric-net'

function getAllFiles (dir, allFilesList = []){
    const files = fs.readdirSync(dir);
    files.map(file => {
      const name = dir + '/' + file;
       // check if subdirectory is present and the dir name isn't cms/admin/blog or the file/dir contains an underscore
      if (fs.statSync(name).isDirectory() 
        && name.toString().indexOf('cms') === -1 
        && name.toString().indexOf('admin') === -1 
        && name.toString().indexOf('usc') === -1
        && name.toString().indexOf('blog') === -1
        && name.toString().indexOf('_') === -1
        //|| file.toString().indexOf('_') === -1
      ) {
        getAllFiles(name, allFilesList);     // do recursive execution for subdirectory
      } else {
          allFilesList.push(name);           // push filename into the array
      }
    })
    
    return allFilesList;
}

const allFiles = getAllFiles(htmlPathPage);
const allHTMLFiles = allFiles.filter(file => file.endsWith('.html'))


//exporting only 1 file for testing purposes, remove array slice to get all files from dir
export const onlyTenHTMLFiles = allHTMLFiles.slice(0, 1);

//console.log(onlyTenHTMLFiles);
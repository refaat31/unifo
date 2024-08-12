var fs = require("fs");
var path = require("path");


// removees brackets that persists after automatically extracting data from Wiki using Selenium. (maybe that code needs re-factoring)
// e.g Tempe[p] --> Tempe
function simpleProcess(file) {
  let output = [];
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let array = JSON.parse(data);
    let i = 0;
    array.forEach((uni) => {
      let newObj = {};
      for (key in uni) {
        newObj[key] = uni[key].replace(/\[.*$/, "");
      }
      output.push(newObj);

      i += 1;
    });
   
    // let temp =   path.basename(file).substring(0, path.basename(file).lastIndexOf("."));

    // console.log(temp)
    fs.writeFile('./data/cleaned/'+
      path.basename(file).substring(0, path.basename(file).lastIndexOf(".")) +
        "_cleaned" +
        path.extname(file),
      JSON.stringify(output),
      (err) => {
        console.log(output.length);
        if (err) {
          console.error(err);
        } else {
        }
      }
    );
  });
}




simpleProcess("./data/raw/r1.json");
simpleProcess("./data/raw/r2.json");
simpleProcess("./data/raw/r3.json");


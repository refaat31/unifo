var fs = require("fs");
var path = require("path");

// o/p - list of elements
// e.g. of each element
// {
//     "Institution": "Arizona State University",
//     "Category":"R1",
//     "Control": "Public",
//     "City": "Tempe",
//     "State": "AZ"
// }


// easily add some global properties
// to each object of a list
function processFile(file, special) {
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
        newObj[key] = uni[key];
      }
      for (prop in special) {
        newObj[prop] = special[prop];
      }
      output.push(newObj);

      i += 1;
    });

    fs.writeFile('./data/final/'+
        path.basename(file).substring(0, path.basename(file).lastIndexOf(".")) +
        "_final" +
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



processFile("./data/cleaned/r1_cleaned.json", { Category: "R1" });
processFile("./data/cleaned/r2_cleaned.json", { Category: "R2" });
processFile("./data/cleaned/r3_cleaned.json", { Category: "Special Focus" });

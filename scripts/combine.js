var fs = require("fs");

let r1 = fs.readFileSync("./data/final/r1_cleaned_final.json", {
  encoding: "utf8",
  flag: "r",
});

let r2 = fs.readFileSync("./data/final/r2_cleaned_final.json", {
  encoding: "utf8",
  flag: "r",
});

let r3 = fs.readFileSync("./data/final/r3_cleaned_final.json", {
  encoding: "utf8",
  flag: "r",
});

r1 = JSON.parse(r1);
r2 = JSON.parse(r2);
r3 = JSON.parse(r3);

combined = r1.concat(r2, r3);

console.log(combined.length);

fs.writeFileSync("./data/final/combined_final.json", JSON.stringify(combined));

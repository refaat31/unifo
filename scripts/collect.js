const { Builder, By, Browser } = require("selenium-webdriver");
const { writeFile } = require("fs");

(async function function1() {
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  let tablesFinal = [];
  try {
    await driver.get(
      "https://en.wikipedia.org/wiki/List_of_research_universities_in_the_United_States"
    );
    let tables = await driver.findElements(By.className("wikitable"));
    for (let i = 0; i < tables.length; i++) {
      let cur = [];
      // let table_caption = await tables[i].findElement(By.css('caption'));
      // console.log(await table_caption.getText());
      let body = await tables[i].findElement(By.css("tbody"));
      let rows = await body.findElements(By.css("tr"));
      for (let j = 0; j < rows.length; j++) {
        let cols = await rows[j].findElements(By.css("td"));
        let info = [];
        for (let k = 0; k < cols.length; k++) {
          if (cols[k].getAttribute("innerText")) {
            let a = await cols[k].findElement(By.css("a")).catch(() => null);
            if (a) {
              a = await a.getAttribute("innerText");
            }
            let fullText = await cols[k].getAttribute("innerText");
            info.push(fullText);
          } else {
            let a = await cols[k].findElement(By.css("a")).catch(() => null);
            info.push(await a.getAttribute("innerText"));
          }
        }
        cur.push(info);
      }
      tablesFinal.push(cur);
    }

    for (let i = 0; i < tablesFinal.length; i++) {
      let path = `./data/raw/r${i + 1}.json`;
      let out = [];
      for (let j = 0; j < tablesFinal[i].length; j++) {
        let obj = {
          Institution: tablesFinal[i][j][0],
          Control: tablesFinal[i][j][1],
          City: tablesFinal[i][j][2],
          State: tablesFinal[i][j][3],
        };
        out.push(obj);
      }

      writeFile(path, JSON.stringify(out, null, 2), (error) => {
        if (error) {
          console.log("error has occured", error);
          return;
        }
      });
    }
  } finally {
    await driver.quit();
  }
})();

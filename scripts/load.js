let combined;
let uni = [];
fetch(
  "https://raw.githubusercontent.com/refaat31/unifo/main/data/final/combined_final.json"
)
  .then((x) => x.text())
  .then((y) => {
    combined = JSON.parse(y);
    console.log(combined);
    for (let i = 0; i < combined.length; i++) {
      uni.push(combined[i]["Institution"]);
    }
    console.log(uni);
  });

function myFunction() {
  $("#mySearch").autocomplete({
    source: function (request, response) {
      var matcher = new RegExp(
        "^" + $.ui.autocomplete.escapeRegex(request.term),
        "i"
      );
      response(
        $.grep(uni, function (item) {
          return matcher.test(item);
        })
      );
    },
  });
}

function display(e) {
  if (true) {
    e.preventDefault();

    let search = document.getElementById("mySearch").value;
    for (let i = 0; i < combined.length; i++) {
      if (search === combined[i]["Institution"]) {
        document.getElementById("display").innerText = JSON.stringify(
          combined[i]
        );
        // {
        //   "Institution": combined[i]['Institution'],
        //   "Control": combined[i]['Control'],
        //   "City": combined[i]['City'],
        //   "State": combined[i]['State'],
        //   "Category": combined[i]['Category']
        // };
        break;
      }
    }
  }

  // e.preventDefault()
  // alert(`${cal}`)
}

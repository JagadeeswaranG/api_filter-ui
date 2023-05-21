const url =
  "https://gitlab.com/gvanderput/gerard-movie-filtering/-/raw/master/data/movies.json";


let dataArr;
const mainDiv = document.getElementById("main");
const table = document.createElement("table");
const searchByYear = document.getElementById("searchByYear");

mainDiv.append(table);

const populate = (data) => {

  let keys = Object.keys(data[0]);
  table.innerHTML = "";
  let tableContent = `<tr>${keys
    .map((e) => {
      return `<th>${e}</th>`;
    })
    .join("")}</tr>`;
  const mapArr = data.map((val) => {
    return `<tr>${(keys.map((i) => `<td>${val[i]}</td>`)).join('')}</tr>`;
  });

  tableContent += mapArr.join("");
  table.innerHTML = tableContent;
};

fetch(url)
  .then((res) => res.json())
  .then((res) => {
    dataArr = res;
    populate(dataArr);
    return res;
  });

searchByYear.addEventListener("keyup", (e) => {
  if (e.target.value.length == 4) {
    let year = +e.target.value;
    console.log( year);
    const data = dataArr.filter((val) => val.year === year)
    console.log(data);
    if (data.length != 0) {
      populate(data);
    } else {
      alert("No Data Found");
      searchByYear.value = "";
      populate(dataArr);
    }
  }
});

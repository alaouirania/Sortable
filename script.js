// Search Bar
(function(document) {
    'use strict';
  
    var TableFilter = (function(myArray) {
        var search_input;
        
        function _onInputSearch(e) {
            search_input = e.target;
            var tables = document.getElementsByClassName(search_input.getAttribute('data-table'));
            myArray.forEach.call(tables, function(table) {
                myArray.forEach.call(table.tBodies, function(tbody) {
                    myArray.forEach.call(tbody.rows, function(row) {
                        var text_content = row.textContent.toLowerCase();
                        var search_val = search_input.value.toLowerCase();
                        row.style.display = text_content.indexOf(search_val) > -1 ? '' : 'none';
                    });
                });
            });
        }
  
        return {
            init: function() {
                var inputs = document.getElementsByClassName('search-input');
                myArray.forEach.call(inputs, function(input) {
                    input.oninput = _onInputSearch;
                });
            }
        };
    })(Array.prototype);
  
    document.addEventListener('readystatechange', function() {
        if (document.readyState === 'complete') {
            TableFilter.init();
        }
    });
  
  })(document);

// Fetch API to Get Data
const loadData = heroes => {
    console.log(heroes)
}
fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json').then(
    res => {
        res.json().then(
            data => {
                if (data.length > 0) {
                    let pagination = new Pagination(data);
                    pagination.init();
                  }
                console.log(data);
                if (data.length > 0) {
                    // Display table element 
                    var temp = "";
                    for(i = 0; i < 20; i++){
                        temp += "<tr>";
                        temp += "<td>" +"<img height=60 width=60 src="+ data[i].images.xs+" alt="+"></img>" + "</td>";
                        temp += "<td>" + data[i].name + "</td>";
                        temp += "<td>" + data[i].biography.fullName + "</td>";
                        temp += "<td>"+"I:" + data[i].powerstats.intelligence +" /S: "+ data[i].powerstats.strength+ "<br>"+"S:"+data[i].powerstats.speed+" /D: "+data[i].powerstats.durability+"<br>"+"P:"+data[i].powerstats.power+" / C: "+data[i].powerstats.combat+ "</td>";
                        temp += "<td>" + data[i].appearance.race + "</td>";
                        temp += "<td>" + data[i].appearance.gender + "</td>";
                        temp += "<td>" + data[i].appearance.height + "</td>";
                        temp += "<td>" + data[i].appearance.weight + "</td>";
                        temp += "<td>" + data[i].biography.placeOfBirth + "</td>";
                        temp += "<td>" + data[i].biography.alignment + "</td>";
                    }
                    document.getElementById('data').innerHTML = temp;
                }
                
            }
        )
    }

)

// Select
function select(option){
  fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json').then(
  res => {
      res.json().then(
          data => {
              if (data.length > 0) {
                  let pagination = new Pagination(data);
                  pagination.init();
                }
              console.log(data);
              if (data.length > 0) {

                  var temp = "";
                  if(option == 0)
                  option = Object.keys(data).length
                  for(i = 0; i < option; i++){
                      temp += "<thead>";
                      temp += "<tr>";
                      temp += "<td>" +"<img src="+ data[i].images.xs+" alt="+"></img>" + "</td>";
                      temp += "<td>" + data[i].name + "</td>";
                      temp += "<td>" + data[i].biography.fullName + "</td>";
                      temp += "<td>"+"I:" + data[i].powerstats.intelligence +" /S: "+ data[i].powerstats.strength+ "<br>"+"S:"+data[i].powerstats.speed+" /D: "+data[i].powerstats.durability+"<br>"+"P:"+data[i].powerstats.power+" / C: "+data[i].powerstats.combat+ "</td>";
                      temp += "<td>" + data[i].appearance.race + "</td>";
                      temp += "<td>" + data[i].appearance.gender + "</td>";
                      temp += "<td>" + data[i].appearance.height + "</td>";
                      temp += "<td>" + data[i].appearance.weight + "</td>";
                      temp += "<td>" + data[i].biography.placeOfBirth + "</td>";
                      temp += "<td>" + data[i].biography.alignment + "</td>";
                  }
                  document.getElementById('data').innerHTML = temp;
              }
          }
      )
    }
  )
}
//Function that take the values of the select in order to choose the number of element on each row to display it on the page

function myFunc(){
    const num = document.getElementById('pages').value
    document.getElementById('data').innerHTML = ''
    select(num)
}

// Mutltiple Pages
function Pagination(data) {
    const prevButton = document.getElementById("button_prev");
    const nextButton = document.getElementById("button_next");
    const clickPageNumber = document.querySelectorAll(".clickPageNumber");
  
    //The default page size selected option is 20
    let current_page = 1;
    let records_per_page = 20;
    console.log(data);
  
    this.init = function () {
      changePage(1);
      pageNumbers();
      selectedPage();
      clickPage();
      addEventListeners();
    };
  
    // Build Table
    function buildTable(data, page) {
        let temp = "";
        
        for (
          var i = (page - 1) * records_per_page;
          i < page * records_per_page && i < data.length;
          i++
        ) {
          let itemData = data[i];
          temp += "<tr>";
          temp +=
            "<td>" +
            "<img src=" +
            itemData.images.xs +
            " alt=" +
            "></img>" +
            "</td>";
          temp += "<td>" + itemData.name + "</td>";
          temp += "<td>" + itemData.biography.fullName + "</td>";
          temp += "<td>" + itemData.powerstats.intelligence + "</td>";
          temp += "<td>" + itemData.appearance.race + "</td>";
          temp += "<td>" + itemData.appearance.gender + "</td>";
          temp += "<td>" + itemData.appearance.height + "</td>";
          temp += "<td>" + itemData.appearance.weight + "</td>";
          temp += "<td>" + itemData.biography.placeOfBirth + "</td>";
          temp += "<td>" + itemData.biography.alignment + "</td>";
        }
        document.getElementById("data").innerHTML = temp;
      }
  
    let addEventListeners = function () {
      prevButton.addEventListener("click", prevPage);
      nextButton.addEventListener("click", nextPage);
    };
  
    // Selected Page
    let selectedPage = function () {
      let page_number = document
        .getElementById("page_number")
        .getElementsByClassName("clickPageNumber");
      for (let i = 0; i < page_number.length; i++) {
        if (i == current_page - 1) {
          page_number[i].style.opacity = "1.0";
        } else {
          page_number[i].style.opacity = "0.5";
        }
      }
    };

    // Check button opacity
    let checkButtonOpacity = function () {
      current_page == 1
        ? prevButton.classList.add("opacity")
        : prevButton.classList.remove("opacity");
      current_page == numPages()
        ? nextButton.classList.add("opacity")
        : nextButton.classList.remove("opacity");
    };

    // Change Page
    let changePage = function (page) {
      const listingTable = document.getElementById("data");
  
      if (page < 1) {
        page = 1;
      }
      if (page > numPages() - 1) {
        page = numPages();
      }
  
      listingTable.innerHTML = "";
  
      buildTable(data, page);
  
      checkButtonOpacity();
      selectedPage();
    };
  
    //Previous Page
    let prevPage = function () {
      if (current_page > 1) {
        current_page--;
        changePage(current_page);
      }
    };
  
    //Next Page
    let nextPage = function () {
      if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
      }
    };
  
    let clickPage = function () {
      document.addEventListener("click", function (e) {
        if (
          e.target.nodeName == "SPAN" &&
          e.target.classList.contains("clickPageNumber")
        ) {
          current_page = e.target.textContent;
          changePage(current_page);
        }
      });
    };
  
    // Numbers of Page
    let pageNumbers = function () {
      let pageNumber = document.getElementById("page_number");
      pageNumber.innerHTML = "";
  
      for (let i = 1; i < numPages() + 1; i++) {
        pageNumber.innerHTML += "<button><span class='clickPageNumber'>" + i + "</span></button>";
      }
    };
  
    let numPages = function () {
      return Math.ceil(data.length / records_per_page);
    };
  
}


// Sort
cPrev = -1; // global var saves the previous c, used to determine if the same column is clicked again

// Sort By
function sortBy(c) {
    rows = document.getElementById("tablehero").rows.length; // num of rows
    columns = document.getElementById("tablehero").rows[0].cells.length; // num of columns
    arrTable = [...Array(rows)].map(e => Array(columns)); // create an empty 2d array

    for (ro=0; ro<rows; ro++) { // cycle through rows
        for (co=0; co<columns; co++) { // cycle through columns
            // assign the value in each row-column to a 2d array by row-column
            arrTable[ro][co] = document.getElementById("tablehero").rows[ro].cells[co].innerHTML;
        }
    }

    th = arrTable.shift(); // remove the header row from the array, and save it
    
    if (c !== cPrev) { // different column is clicked, so sort by the new column
        arrTable.sort(
            function (a, b) {
                if (a[c] === b[c]) {
                    return 0;
                } else {
                    return (a[c] < b[c]) ? -1 : 1;
                }
            }
        );
    } else { // if the same column is clicked then reverse the array
        arrTable.reverse();
    }
    
    cPrev = c; // save in previous c

    arrTable.unshift(th); // put the header back in to the array

    // cycle through rows-columns placing values from the array back into the html table
    for (ro=0; ro<rows; ro++) {
        for (co=0; co<columns; co++) {
            document.getElementById("tablehero").rows[ro].cells[co].innerHTML = arrTable[ro][co];
        }
    }
}
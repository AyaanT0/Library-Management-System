/*HOW WILL THIS WORK?

There are a few ways that I could approach search for the library system book search function.
The method that I think I’ll settle on is that I’ll use the Firebase jquery query.where function to
search all the search terms against all the saved book documents, and it will return the books that
have all the matching criteria. It wouldn’t make sense for me to return all the books if
they have less than all the matching criteria since I could select “fiction” and “2021-2023”
and it could return a fiction book from 2005, which wouldn’t be helpful. I’ll write the code so that
it only searches those terms if the field is filled. Then, to handle different cases, I’ll make the code
make all text entry sections pull the data as a string just to make matching against the database easier.
Additionally, since I opted not to use local storage to store book data, I decided to use local storage
to display search results, just to keep some semblance of the original instructions, while
adding my own unique code, ideas, and features to the project.

*/

function displayResults() {
    //retrieves the number of books from local storage
    var bookAmount = localStorage.getItem("bookCount");

    //checks if there are no books, if none then display "No results found" in the heading bar
    if (bookAmount === 0) {
        document.getElementById("numberofbooks").innerHTML = "No Results Found";
        return;
    }

    //creates the table header row with the specified CSS class
    var tableHeader = "<thead class='sticky-header'>" +
        "<tr>" +
        "<th>Cover</th>"+
        "<th>Title</th>" +
        "<th>Book Number</th>" +
        "<th>Author</th>" +
        "<th>Publication Date</th>" +
        "<th>Type</th>" +
        "<th>Genre</th>" +
        "<th>Pages</th>" +
        "<th>Status</th>" +
        "</tr>" +
        "</thead>";

  // creates the table body rows
  var tableBody = "<tbody>";
  for (var i = 0; i < bookAmount; i++) {
    // retrieves book info from local storage
    var bookData = JSON.parse(localStorage.getItem("book" + i));

    // creates a table row for the current book
    tableBody +=
      "<tr>" +
      "<td><img src='" +
      bookData[7] +
      "' width='100' height='150'></td>" +
      "<td>" +
      bookData[1] +
      "</td>" +
      "<td>" +
      bookData[0] +
      "</td>" +
      "<td>" +
      bookData[2] +
      "</td>" +
      "<td>" +
      bookData[4] +
      "</td>" +
      "<td>" +
      bookData[3] +
      "</td>" +
      "<td>" +
      bookData[5] +
      "</td>" +
      "<td>" +
      bookData[6] +
      "</td>" +
      "<td>" +
      bookData[8] +
      "</td>" +
      "</tr>";
  }
  tableBody += "</tbody>";

  // creates the table with header and body
  var bookTable = "<table>" + tableHeader + tableBody + "</table>";

  // displays the number of books in the heading bar "numberofbooks" element
  document.getElementById("numberofbooks").innerHTML = "Results: " + bookAmount;

  // displays the books in the results table
  var resultsElement = document.getElementById("results");
  resultsElement.innerHTML = bookTable;

  // sets the table dimensions and makes it scrollable
  resultsElement.style.width = "73vw";
  resultsElement.style.height = "78.215vh";
  resultsElement.style.overflow = "auto";
  resultsElement.style.left = "25.9766vw";
  resultsElement.style.top = "16.41vh";
  resultsElement.style.position = "relative";

  // sets the z-index and position for the sticky header
  var stickyHeader = resultsElement.querySelector(".sticky-header");
  stickyHeader.style.position = "sticky";
  stickyHeader.style.top = "0";
  stickyHeader.style.zIndex = "12";

  // styles the header for the sticky header
  stickyHeader.style.background = "#bfc1cc";
}
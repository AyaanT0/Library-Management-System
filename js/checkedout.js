$(document).ready(function () { //jquery event listener, once page is loaded, the script is loaded in and waits for something to be submitted
  var firebaseConfig = { //contains all the information needed to connect to the firebase database
    apiKey: "AIzaSyBuyAp0-coTH4f2B-yV90Yk9rbnE7Qwb3w",
    authDomain: "librarymanagementsystem-fcb1c.firebaseapp.com",
    databaseURL: "https://librarymanagementsystem-fcb1c-default-rtdb.firebaseio.com/",
    projectId: "librarymanagementsystem-fcb1c",
    storageBucket: "librarymanagementsystem-fcb1c.appspot.com",
    messagingSenderId: "472846118639",
    appId: "1:472846118639:web:aabfb8d9921c5dc2eb351a",
  };
  //initializes firebase
  firebase.initializeApp(firebaseConfig);

  var db = firebase.firestore(); //sets up a connection to the firebase database (used to store data)
});

function displayResults() {
  //accesses the checkedout collection in firestore
  var checkedoutRef = firebase.firestore().collection('checkedout');

  //retrieve the checkedout books from firestore
  checkedoutRef.get()
    .then(function (querySnapshot) {
      var checkedoutBooks = [];

      querySnapshot.forEach(function (doc) {
        var book = doc.data();
        checkedoutBooks.push(book);
      });

      //checks if there are 0 books checked out
      if (checkedoutBooks.length === 0) {
        document.getElementById("results").innerHTML = "No results found.";
        return;
      }

      //create the table header
      var tableHeader = "<thead class='sticky-header'>" +
        "<tr>" +
        "<th>Cover</th>" +
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

      //create the table body rows
      var tableBody = "<tbody>";
      checkedoutBooks.forEach(function (book) {
        //retrieve book information
        var bookCover = book.bookCover;
        var bookTitle = book.bookname;
        var bookNumber = book.booknumber;
        var bookAuthor = book.bookauthor;
        var bookPublication = book.bookpublication;
        var bookType = book.booktype;
        var bookGenre = book.bookgenre;
        var bookPages = book.bookpages;
        var bookStatus = book.bookstatus;

        //create a table row for the current book
        tableBody += "<tr>" +
          "<td><img src='" + bookCover + "' width='100' height='150'></td>" +
          "<td>" + bookTitle + "</td>" +
          "<td>" + bookNumber + "</td>" +
          "<td>" + bookAuthor + "</td>" +
          "<td>" + bookPublication + "</td>" +
          "<td>" + bookType + "</td>" +
          "<td>" + bookGenre + "</td>" +
          "<td>" + bookPages + "</td>" +
          "<td>" + bookStatus + "</td>" +
          "</tr>";
      });
      tableBody += "</tbody>";

      //creates the table with header and body
      var bookTable = "<table>" + tableHeader + tableBody + "</table>";

      //displays the number of books in the heading bar "numberofbooks" element
      document.getElementById("numberofbooks").innerHTML = "Results: " + checkedoutBooks.length;

      //displays the books in the results table
      var resultsElement = document.getElementById("results");
      resultsElement.innerHTML = bookTable;

      //sets the table dimensions and make it scrollable
      resultsElement.style.width = "73vw";
      resultsElement.style.height = "78.215vh";
      resultsElement.style.overflow = "auto";
      resultsElement.style.left = "25.9766vw";
      resultsElement.style.top = "16.41vh";
      resultsElement.style.position = "relative";

      //sets the z-index and position for the sticky header
      var stickyHeader = resultsElement.querySelector(".sticky-header");
      stickyHeader.style.position = "sticky";
      stickyHeader.style.top = "0";
      stickyHeader.style.zIndex = "12";

      //sets style for the header of the sticky header
      stickyHeader.style.background = "#bfc1cc";
    })
    .catch(function (error) {
      console.log("Error retrieving checkedout books: " + error);
    });
}

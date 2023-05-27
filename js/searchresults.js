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
    // Retrieve the number of books from local storage
    var bookAmount = localStorage.getItem("bookCount");

    // Check if there are no books, if none then display "No results found" in the heading bar
    if (bookAmount === 0) {
        document.getElementById("results").innerHTML = "No results found.";
        return;
    }

    // Create the table header row
    var tableHeader = "<thead><tr>" +
        "<th>Book Number</th>" +
        "<th>Title</th>" +
        "<th>Author</th>" +
        "<th>Publication Date</th>" +
        "<th>Type</th>" +
        "<th>Genre</th>" +
        "<th>Pages</th>" +
        "<th>Cover</th>" +
        "<th>Status</th>" +
        "</tr></thead>";

    // Create the table body rows
    var tableBody = "<tbody>";
    for (var i = 0; i < bookAmount; i++) {
        // Retrieve book info from local storage
        var bookNumber = localStorage.getItem("bookNumber" + i);
        var bookTitle = localStorage.getItem("bookName" + i);
        var bookAuthor = localStorage.getItem("bookAuthor" + i);
        var bookPublication = localStorage.getItem("bookPublication" + i);
        var bookType = localStorage.getItem("bookType" + i);
        var bookGenre = localStorage.getItem("bookGenre" + i);
        var bookPages = localStorage.getItem("bookPages" + i);
        var bookCover = localStorage.getItem("bookCover" + i);
        var bookStatus = localStorage.getItem("bookStatus" + i);

        // Create a table row for the current book
        tableBody += "<tr>" +
            "<td>" + bookNumber + "</td>" +
            "<td>" + bookTitle + "</td>" +
            "<td>" + bookAuthor + "</td>" +
            "<td>" + bookPublication + "</td>" +
            "<td>" + bookType + "</td>" +
            "<td>" + bookGenre + "</td>" +
            "<td>" + bookPages + "</td>" +
            "<td><img src='" + bookCover + "' width='100' height='150'></td>" +
            "<td>" + bookStatus + "</td>" +
            "</tr>";
    }
    tableBody += "</tbody>";

    // Create the complete table with header and body
    var bookTable = "<table>" + tableHeader + tableBody + "</table>";

    // Display the number of books in the heading bar "numberofbooks" element
    document.getElementById("numberofbooks").innerHTML = "Results: " + bookAmount;

    // Display the books in the results table
    var resultsElement = document.getElementById("results");
    resultsElement.innerHTML = bookTable;

    // Set the table dimensions and make it scrollable
    resultsElement.style.width = "73vw";
    resultsElement.style.height = "76.2vh";
    resultsElement.style.overflow = "auto";
    resultsElement.style.left = "25.9766vw";
    resultsElement.style.top = "18.5vh";
    resultsElement.style.position = "relative"; // Set position to relative

    // Make the table header row sticky
    var table = resultsElement.querySelector("table");
    var thead = table.querySelector("thead");
    thead.style.position = "sticky";
    thead.style.top = "0";
}
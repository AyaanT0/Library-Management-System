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
    //reteives the number of books from the local storage
    var bookAmount = localStorage.getItem("bookCount");

    //check if there are no books, if none then display no results found on the heading bar
    if (bookAmount === 0) {
        document.getElementById("results").innerHTML = "No results found.";
        return;
    }

    //variable to store book list html in a table
    var bookList = "<table>";
    //loops through each book
    for (var i = 0; i < bookAmount; i++) {
        //gets keys for retrieving book info from the local storage
        var bookNumber = "bookNumber" + i;
        var bookName = "bookName" + i;
        var bookAuthor = "bookAuthor" + i;
        //retrieves book cover link from local storage
        var bookCover = localStorage.getItem("bookCover" + i);

        //stores book info and book cover in a string
        var bookInfo = "<b>Book Number:</b> " + localStorage.getItem(bookNumber) + "<br>" +
                       "<b>Title:</b> " + localStorage.getItem(bookName) + "<br>" +
                       "<b>Author:</b> " + localStorage.getItem(bookAuthor) + "<br>" +
                       "<img src='" + bookCover + "' width='100' height='150'>";

        //new row if there is an even number of books (always a new row when 2 books)
        if (i % 2 === 0) {
            //makes the new row
            bookList += "<tr>";
        }
        //adds the book inf to the table cell
        bookList += "<td>" + bookInfo + "</td>";

        //check if the current book is odd (if 1 book, add another book to the row)
        if (i % 2 === 1 || i === bookAmount - 1) {
            //end row if odd or last book
            bookList += "</tr>";
        }
    }
     //closing table tag
    bookList += "</table>";

    //display the number of books in the heading bar "numberofbooks" element
    document.getElementById("numberofbooks").innerHTML = "Results: " + bookAmount;

    //display books in the results table
    document.getElementById("results").innerHTML = bookList;
}

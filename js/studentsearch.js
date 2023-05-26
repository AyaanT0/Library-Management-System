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

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var db = firebase.firestore(); //sets up a connection to the firebase database (used to store data)

  $("#booksearchform").submit(function (e) {
    e.preventDefault();
  }); //prevents submission of form when enter is pressed if the form is not filled out

  $('#submit').click(function () {
    searchBooks();
  }); //once the submit button is clicked, the add_this function is called
});


function searchBooks() {
  const db = firebase.firestore();
  const bookNumber = document.getElementById("bookNumberS").value;
  const bookName = document.getElementById("bookNameS").value;
  const bookAuthor = document.getElementById("bookAuthorS").value;
  const bookTypeF = document.querySelector("#bookTypeF");
  const bookTypeNF = document.querySelector("#bookTypeNF");
  const bookTypeGN = document.querySelector("#bookTypeGN");
  const bookPublication = document.getElementById("bookPublicationS").value;
  const bookGenre = document.getElementById("bookGenreS").value;
  const bookPages = document.getElementById("bookPagesS").value;
  const bookStatus = document.querySelector('input[name="bookStatus"]:checked').value;

  if (bookStatus === "available") {
    // Connect to Firestore database
    const db = firebase.firestore();
    // Get reference to the 'books' collection in Firestore
    const booksRef = db.collection("books");

    // Get search input values from form
    const bookNumber = document.getElementById("bookNumberS").value;
    const bookName = document.getElementById("bookNameS").value;
    const bookAuthor = document.getElementById("bookAuthorS").value;
    const bookTypeF = document.querySelector("#bookTypeF");
    const bookTypeNF = document.querySelector("#bookTypeNF");
    const bookTypeGN = document.querySelector("#bookTypeGN");
    const bookPublication = document.getElementById("bookPublicationS").value;
    const bookGenre = document.getElementById("bookGenreS").value;
    const bookPages = document.getElementById("bookPagesS").value;
    // Initialize query with 'booksRef'
    let query = booksRef;

    // Add search criteria to 'query' if the corresponding input field is not empty
    if (bookNumber !== "") {
      query = query.where("booknumber", "==", bookNumber);
    }
    if (bookName !== "") {
      query = query.where("bookname", "==", bookName);
    }
    if (bookAuthor !== "") {
      query = query.where("bookauthor", "==", bookAuthor);
    }
    const types = [];
    if (bookTypeF.checked) {
      types.push("fiction");
    }
    if (bookTypeNF.checked) {
      types.push("non-fiction");
    }
    if (bookTypeGN.checked) {
      types.push("graphic-novel");
    }
    if (types.length > 0) {
      const bookTypeString = types.join("");
      query = query.where("booktype", "==", bookTypeString);
    }
    if (bookPublication !== "") {
      query = query.where("bookpublication", "==", bookPublication);
    }
    if (bookGenre !== "") {
      query = query.where("bookgenre", "==", bookGenre);
    }
    if (bookPages !== "") {
      query = query.where("bookpages", "==", bookPages);
    }

    // Execute the query and handle the results
    query
      .get()
      .then(querySnapshot => {
        const results = [];
        let index = 0;
        localStorage.clear();
        querySnapshot.forEach(doc => {
          const bookData = {
            bookNumber: doc.data().booknumber || "",
            bookName: doc.data().bookname || "",
            bookAuthor: doc.data().bookauthor || "",
            bookType: doc.data().booktype || "",
            bookPublication: doc.data().bookpublication || "",
            bookGenre: doc.data().bookgenre || "",
            bookPages: doc.data().bookpages || "",
            bookCover: doc.data().bookCover || ""
          };
          const fields = Object.values(bookData)
            .join(" ")
            .toLowerCase();
          if (
            fields.includes(bookNumber.toLowerCase()) ||
            fields.includes(bookName.toLowerCase()) ||
            fields.includes(bookAuthor.toLowerCase()) ||
            types.length === 0 ||
            (types.includes("fiction") && bookData.bookType.includes("fiction")) ||
            (types.includes("non-fiction") && bookData.bookType.includes("non-fiction")) ||
            (types.includes("graphic-novel") && bookData.bookType.includes("graphic-novel")) ||
            fields.includes(bookPublication.toLowerCase()) ||
            fields.includes(bookGenre.toLowerCase()) ||
            fields.includes(bookPages.toLowerCase())
          ) {
            for (const [key, value] of Object.entries(bookData)) {
              localStorage.setItem(`${key}${index}`, value);
            }
            index++;
            results.push(bookData);
          }
        });
        if (results.length > 0) {
          console.log("Books found:");
          localStorage.setItem("bookCount", results.length);
          window.location.href = "searchresults.html";
        } else {
          console.log("No books found.");
          localStorage.clear();
          localStorage.setItem("bookCount", results.length);
          window.location.href = "searchresults.html";
        }
      })
      .catch(error => {
        console.log(error);
      });
  } else if (bookStatus === "checkedOut") {
    // Connect to Firestore database
    const db = firebase.firestore();
    // Get reference to the 'checkedout' collection in Firestore
    const checkedOutRef = db.collection("checkedout");

    // Get search input values from form
    const bookNumber = document.getElementById("bookNumberS").value;
    const bookName = document.getElementById("bookNameS").value;
    const bookAuthor = document.getElementById("bookAuthorS").value;
    const bookTypeF = document.querySelector("#bookTypeF");
    const bookTypeNF = document.querySelector("#bookTypeNF");
    const bookTypeGN = document.querySelector("#bookTypeGN");
    const bookPublication = document.getElementById("bookPublicationS").value;
    const bookGenre = document.getElementById("bookGenreS").value;
    const bookPages = document.getElementById("bookPagesS").value;
    // Initialize query with 'booksRef'
    let query = checkedOutRef;

    // Add search criteria to 'query' if the corresponding input field is not empty
    if (bookNumber !== "") {
      query = query.where("booknumber", "==", bookNumber);
    }
    if (bookName !== "") {
      query = query.where("bookname", "==", bookName);
    }
    if (bookAuthor !== "") {
      query = query.where("bookauthor", "==", bookAuthor);
    }
    const types = [];
    if (bookTypeF.checked) {
      types.push("fiction");
    }
    if (bookTypeNF.checked) {
      types.push("non-fiction");
    }
    if (bookTypeGN.checked) {
      types.push("graphic-novel");
    }
    if (types.length > 0) {
      const bookTypeString = types.join("");
      query = query.where("booktype", "==", bookTypeString);
    }
    if (bookPublication !== "") {
      query = query.where("bookpublication", "==", bookPublication);
    }
    if (bookGenre !== "") {
      query = query.where("bookgenre", "==", bookGenre);
    }
    if (bookPages !== "") {
      query = query.where("bookpages", "==", bookPages);
    }

    // Execute the query and handle the results
    query
      .get()
      .then(querySnapshot => {
        const results = [];
        let index = 0;
        localStorage.clear();
        querySnapshot.forEach(doc => {
          const bookData = {
            bookNumber: doc.data().booknumber || "",
            bookName: doc.data().bookname || "",
            bookAuthor: doc.data().bookauthor || "",
            bookType: doc.data().booktype || "",
            bookPublication: doc.data().bookpublication || "",
            bookGenre: doc.data().bookgenre || "",
            bookPages: doc.data().bookpages || "",
            bookCover: doc.data().bookCover || ""
          };
          const fields = Object.values(bookData)
            .join(" ")
            .toLowerCase();
          if (
            fields.includes(bookNumber.toLowerCase()) ||
            fields.includes(bookName.toLowerCase()) ||
            fields.includes(bookAuthor.toLowerCase()) ||
            types.length === 0 ||
            (types.includes("fiction") && bookData.bookType.includes("fiction")) ||
            (types.includes("non-fiction") && bookData.bookType.includes("non-fiction")) ||
            (types.includes("graphic-novel") && bookData.bookType.includes("graphic-novel")) ||
            fields.includes(bookPublication.toLowerCase()) ||
            fields.includes(bookGenre.toLowerCase()) ||
            fields.includes(bookPages.toLowerCase())
          ) {
            for (const [key, value] of Object.entries(bookData)) {
              localStorage.setItem(`${key}${index}`, value);
            }
            index++;
            results.push(bookData);
          }
        });
        if (results.length > 0) {
          console.log("Books found:");
          localStorage.setItem("bookCount", results.length);
          window.location.href = "searchresults.html";
        } else {
          console.log("No books found.");
          localStorage.clear();
          localStorage.setItem("bookCount", results.length);
          window.location.href = "searchresults.html";
        }
      })
      .catch(error => {
        console.log(error);
      });

  } else if (bookStatus === "both") {
    // Connect to Firestore database
    const db = firebase.firestore();

    // Get reference to the 'books' collection in Firestore
    const booksRef = db.collection("books");

    // Get reference to the 'checkedout' collection in Firestore
    const checkedOutRef = db.collection("checkedout");

    // Get search input values from form
    const bookNumber = document.getElementById("bookNumberS").value;
    const bookName = document.getElementById("bookNameS").value;
    const bookAuthor = document.getElementById("bookAuthorS").value;
    const bookTypeF = document.querySelector("#bookTypeF");
    const bookTypeNF = document.querySelector("#bookTypeNF");
    const bookTypeGN = document.querySelector("#bookTypeGN");
    const bookPublication = document.getElementById("bookPublicationS").value;
    const bookGenre = document.getElementById("bookGenreS").value;
    const bookPages = document.getElementById("bookPagesS").value;

    // Initialize promises for each query
    const booksQuery = applyFiltersToQuery(booksRef);
    const checkedOutQuery = applyFiltersToQuery(checkedOutRef);

    // Execute both queries concurrently
    Promise.all([booksQuery, checkedOutQuery])
      .then(([booksSnapshot, checkedOutSnapshot]) => {
        const results = [];
        let index = 0;
        localStorage.clear();

        // Process 'books' collection snapshot
        booksSnapshot.forEach(doc => {
          const bookData = {
            bookNumber: doc.data().booknumber || "",
            bookName: doc.data().bookname || "",
            bookAuthor: doc.data().bookauthor || "",
            bookType: doc.data().booktype || "",
            bookPublication: doc.data().bookpublication || "",
            bookGenre: doc.data().bookgenre || "",
            bookPages: doc.data().bookpages || "",
            bookCover: doc.data().bookCover || ""
          };
          if (isBookMatch(bookData)) {
            for (const [key, value] of Object.entries(bookData)) {
              localStorage.setItem(`${key}${index}`, value);
            }
            index++;
            results.push(bookData);
          }
        });

        // Process 'checkedout' collection snapshot
        checkedOutSnapshot.forEach(doc => {
          const bookData = {
            bookNumber: doc.data().booknumber || "",
            bookName: doc.data().bookname || "",
            bookAuthor: doc.data().bookauthor || "",
            bookType: doc.data().booktype || "",
            bookPublication: doc.data().bookpublication || "",
            bookGenre: doc.data().bookgenre || "",
            bookPages: doc.data().bookpages || "",
            bookCover: doc.data().bookCover || ""
          };
          if (isBookMatch(bookData)) {
            for (const [key, value] of Object.entries(bookData)) {
              localStorage.setItem(`${key}${index}`, value);
            }
            index++;
            results.push(bookData);
          }
        });

        if (results.length > 0) {
          console.log("Books found:");
          localStorage.setItem("bookCount", results.length);
          window.location.href = "searchresults.html";
        } else {
          console.log("No books found.");
          localStorage.clear();
          localStorage.setItem("bookCount", results.length);
          window.location.href = "searchresults.html";
        }
      })
      .catch(error => {
        console.log(error);
      });

    // Function to apply search filters to the given query
    function applyFiltersToQuery(query) {
      // Apply search criteria to 'query' if the corresponding input field is not empty
      if (bookNumber !== "") {
        query = query.where("booknumber", "==", bookNumber);
      }
      if (bookName !== "") {
        query = query.where("bookname", "==", bookName);
      }
      if (bookAuthor !== "") {
        query = query.where("bookauthor", "==", bookAuthor);
      }

      const types = [];
      if (bookTypeF.checked) {
        types.push("fiction");
      }
      if (bookTypeNF.checked) {
        types.push("non-fiction");
      }
      if (bookTypeGN.checked) {
        types.push("graphic-novel");
      }
      if (types.length > 0) {
        const bookTypeString = types.join("");
        query = query.where("booktype", "==", bookTypeString);
      }

      if (bookPublication !== "") {
        query = query.where("bookpublication", "==", bookPublication);
      }
      if (bookGenre !== "") {
        query = query.where("bookgenre", "==", bookGenre);
      }
      if (bookPages !== "") {
        query = query.where("bookpages", "==", bookPages);
      }

      return query.get();
    }

    // Function to check if a book matches the search criteria
    function isBookMatch(bookData) {
      const fields = Object.values(bookData)
        .join(" ")
        .toLowerCase();

      return (
        fields.includes(bookNumber.toLowerCase()) ||
        fields.includes(bookName.toLowerCase()) ||
        fields.includes(bookAuthor.toLowerCase()) ||
        (bookTypeF.checked && bookData.bookType.includes("fiction")) ||
        (bookTypeNF.checked && bookData.bookType.includes("non-fiction")) ||
        (bookTypeGN.checked && bookData.bookType.includes("graphic-novel")) ||
        fields.includes(bookPublication.toLowerCase()) ||
        fields.includes(bookGenre.toLowerCase()) ||
        fields.includes(bookPages.toLowerCase())
      );
    }
  }
}

//old function, not using anymore
//this function was for returning only books that are available. Now we are returning books that are from the selected category (available, checked out, or both)

// Define function to search for books
/*function searchBooks() {
  // Connect to Firestore database
  const db = firebase.firestore();
  // Get reference to the 'books' collection in Firestore
  const booksRef = db.collection("books");

  // Get search input values from form
  const bookNumber = document.getElementById("bookNumberS").value;
  const bookName = document.getElementById("bookNameS").value;
  const bookAuthor = document.getElementById("bookAuthorS").value;
  const bookTypeF = document.querySelector("#bookTypeF");
  const bookTypeNF = document.querySelector("#bookTypeNF");
  const bookTypeGN = document.querySelector("#bookTypeGN");
  /*const bookTypeF = document.getElementById("bookTypeF").checked;
  const bookTypeNF = document.getElementById("bookTypeNF").checked;
  const bookTypeGN = document.getElementById("bookTypeGN").checked;*/
/*const bookPublication = document.getElementById("bookPublicationS").value;
const bookGenre = document.getElementById("bookGenreS").value;
const bookPages = document.getElementById("bookPagesS").value;
const bookStatus = document.querySelector('input[name="bookStatus"]:checked').value;
// Initialize query with 'booksRef'
let query = booksRef;

if (bookStatus === "available") {
  query = db.collection("books");
} else if (bookStatus === "checkedOut") {
  query = db.collection("checkedout");
} else {
  const booksQuery = db.collection("books").where("bookstatus", "==", "available");
  const checkedOutQuery = db.collection("checkedout").where("bookstatus", "==", "checkedout");
  query = Promise.all([booksQuery.get(), checkedOutQuery.get()]);
}

// Add search criteria to 'query' if the corresponding input field is not empty
if (bookNumber !== "") {
  query = query.where("booknumber", "==", bookNumber);
}
if (bookName !== "") {
  query = query.where("bookname", "==", bookName);
}
if (bookAuthor !== "") {
  query = query.where("bookauthor", "==", bookAuthor);
}
//i finally fixed this book type section. The problem was that it was saved as an array and there were square brackets
//i solved it by using .join to remove the square brackets and save it as a string
const types = [];
if (bookTypeF.checked) {
  types.push("fiction");
}
if (bookTypeNF.checked) {
  types.push("non-fiction");
}
if (bookTypeGN.checked) {
  types.push("graphic-novel");
}
if (types.length > 0) {
  const bookTypeString = types.join("");
  query = query.where("booktype", "==", bookTypeString);
}
if (bookPublication !== "") {
  query = query.where("bookpublication", "==", bookPublication);
}
if (bookGenre !== "") {
  query = query.where("bookgenre", "==", bookGenre);
}
if (bookPages !== "") {
  query = query.where("bookpages", "==", bookPages);
}

// Execute the query and handle the results
query.get().then((querySnapshot) => {
const results = [];
let index = 0;
// Clear the local storage before setting new books
localStorage.clear();
querySnapshot.forEach((doc) => {
  // Extract book data from the document and add it to 'results'
  const bookData = {
    bookNumber: doc.data().booknumber || "",
    bookName: doc.data().bookname || "",
    bookAuthor: doc.data().bookauthor || "",
    bookType: doc.data().booktype || "",
    bookPublication: doc.data().bookpublication || "",
    bookGenre: doc.data().bookgenre || "",
    bookPages: doc.data().bookpages || "",
    bookCover: doc.data().bookCover || ""
  };
  // Concatenate all fields in 'bookData' to create a single string for searching
  const fields = Object.values(bookData).join(" ").toLowerCase();
  // Check if any of the search terms are present in the concatenated string
  if (
    fields.includes(bookNumber.toLowerCase()) ||
    fields.includes(bookName.toLowerCase()) ||
    fields.includes(bookAuthor.toLowerCase()) ||
    types.length === 0 || // If no checkboxes are checked, include all books
    (types.includes("fiction") && bookData.bookType.includes("fiction")) ||
    (types.includes("non-fiction") && bookData.bookType.includes("non-fiction")) ||
    (types.includes("graphic-novel") && bookData.bookType.includes("graphic-novel")) ||
    fields.includes(bookPublication.toLowerCase()) ||
    fields.includes(bookGenre.toLowerCase()) ||
    fields.includes(bookPages.toLowerCase())
  ) {
    // Store the book data in local storage
    for (const [key, value] of Object.entries(bookData)) {
      localStorage.setItem(`${key}${index}`, value);
    }
    index++;
    results.push(bookData);
  }
});
// If one or more books are found, redirect to search results page
if (results.length > 0) {
  // If there are, log a message indicating that books were found
  console.log("Books found:");
  // Store the total number of books found in local storage
  localStorage.setItem("bookCount", results.length);
  // Redirect the user to the search results page
  window.location.href = "searchresults.html";
} else {
  // If there are no search results, log a message indicating this
  console.log("No books found.");
  // Clear the local storage (if any)
  localStorage.clear();
  // Store the total number of books found in local storage
  localStorage.setItem("bookCount", results.length);
  // Redirect the user to the search results page
  window.location.href = "searchresults.html";
}
// If there was an error during the search, log it to the console
}).catch((error) => {
  console.log(error);
});
}*/
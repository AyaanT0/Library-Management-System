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
    //connect to firestore database
    const db = firebase.firestore();
    //gets 'books' collection reference from Firestore
    const booksRef = db.collection("books");

    //gets search input values from form
    const bookNumber = document.getElementById("bookNumberS").value;
    const bookName = document.getElementById("bookNameS").value;
    const bookAuthor = document.getElementById("bookAuthorS").value;
    const bookTypeF = document.querySelector("#bookTypeF");
    const bookTypeNF = document.querySelector("#bookTypeNF");
    const bookTypeGN = document.querySelector("#bookTypeGN");
    const bookPublication = document.getElementById("bookPublicationS").value;
    const bookGenre = document.getElementById("bookGenreS").value;
    const bookPages = document.getElementById("bookPagesS").value;
    //initialize query with 'booksRef'
    let query = booksRef;

    //adds search criteria to 'query' if the corresponding input field is not empty
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

    //executes the query and handle the results
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
            bookCover: doc.data().bookCover || "",
            bookStatus: doc.data().bookstatus || ""
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
            const bookArray = Object.values(bookData); // Convert bookData object to an array

            // Save the book array to localStorage
            localStorage.setItem(`book${index}`, JSON.stringify(bookArray));

            results.push(bookArray); // Add the book array to the results array

            index++; // Increment the index
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
    //connects to Firestore database
    const db = firebase.firestore();
    //gets reference to the 'checkedout' collection in Firestore
    const checkedOutRef = db.collection("checkedout");

    //gets search input values from form
    const bookNumber = document.getElementById("bookNumberS").value;
    const bookName = document.getElementById("bookNameS").value;
    const bookAuthor = document.getElementById("bookAuthorS").value;
    const bookTypeF = document.querySelector("#bookTypeF");
    const bookTypeNF = document.querySelector("#bookTypeNF");
    const bookTypeGN = document.querySelector("#bookTypeGN");
    const bookPublication = document.getElementById("bookPublicationS").value;
    const bookGenre = document.getElementById("bookGenreS").value;
    const bookPages = document.getElementById("bookPagesS").value;
    //initializse query with 'booksRef'
    let query = checkedOutRef;

    //adds search criteria to 'query' if the corresponding input field is not empty
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

    //execute the query and handle the results
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
            bookCover: doc.data().bookCover || "",
            bookStatus: doc.data().bookstatus || ""
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
            const bookArray = Object.values(bookData); // Convert bookData object to an array

            // Save the book array to localStorage
            localStorage.setItem(`book${index}`, JSON.stringify(bookArray));

            results.push(bookArray); // Add the book array to the results array

            index++; // Increment the index
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
    //connect to Firestore database
    const db = firebase.firestore();

    //get reference to the 'books' collection in Firestore
    const booksRef = db.collection("books");

    //get reference to the 'checkedout' collection in Firestore
    const checkedOutRef = db.collection("checkedout");

    //get search input values from form
    const bookNumber = document.getElementById("bookNumberS").value;
    const bookName = document.getElementById("bookNameS").value;
    const bookAuthor = document.getElementById("bookAuthorS").value;
    const bookTypeF = document.querySelector("#bookTypeF");
    const bookTypeNF = document.querySelector("#bookTypeNF");
    const bookTypeGN = document.querySelector("#bookTypeGN");
    const bookPublication = document.getElementById("bookPublicationS").value;
    const bookGenre = document.getElementById("bookGenreS").value;
    const bookPages = document.getElementById("bookPagesS").value;

    //initialize promises for each query
    const booksQuery = applyFiltersToQuery(booksRef);
    const checkedOutQuery = applyFiltersToQuery(checkedOutRef);

    //clear localstorage before adding new results
    localStorage.clear();

    //execute both queries concurrently
    Promise.all([booksQuery, checkedOutQuery])
      .then(([booksSnapshot, checkedOutSnapshot]) => {
        const results = [];
        let index = 0;

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
            bookCover: doc.data().bookCover || "",
            bookStatus: doc.data().bookstatus || ""
          };
          if (isBookMatch(bookData)) {
            const bookKey = `book${index}`;
            localStorage.setItem(bookKey, JSON.stringify(Object.values(bookData))); // Store book data array in localStorage
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
            bookCover: doc.data().bookCover || "",
            bookStatus: doc.data().bookstatus || ""
          };
          if (isBookMatch(bookData)) {
            const bookKey = `book${index}`;
            localStorage.setItem(bookKey, JSON.stringify(Object.values(bookData))); // Store book data array in localStorage
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

    //function to apply search filters to the given query
    function applyFiltersToQuery(query) {
      //apply search criteria to 'query' if the corresponding input field is not empty
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

    //function to check if a book matches the search criteria

    /*return (
            fields.includes(searchQueryLowercase) ||
            (bookTypeF.checked && bookData.bookType.includes("fiction")) ||
            (bookTypeNF.checked && bookData.bookType.includes("non-fiction")) ||
            (bookTypeGN.checked && bookData.bookType.includes("graphic-novel")) ||
            fields.includes(searchQueryLowercase)
          );
        }*/
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
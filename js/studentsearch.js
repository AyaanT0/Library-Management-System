$(document).ready(function () {
    var firebaseConfig = {
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

    var db = firebase.firestore();

    $("#booksearchform").submit(function (e) {
        e.preventDefault();
    });

    $('#submit').click(function () {
        searchBooks();
    });

    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            window.location = 'homepage.html';
        }
    });

});

function searchBooks() {
    const db = firebase.firestore();
    const booksRef = db.collection("books");
  
    const bookNumber = document.getElementById("bookNumberS").value;
    const bookName = document.getElementById("bookNameS").value;
    const bookAuthor = document.getElementById("bookAuthorS").value;
    const bookType = document.querySelectorAll('input[name="bookTypeS"]:checked');
    const bookPublication = document.getElementById("bookPublicationS").value;
    const bookGenre = document.getElementById("bookGenreS").value;
    const bookPages = document.getElementById("bookPagesS").value;
  
    let query = booksRef;
  
    if (bookNumber !== "") {
      query = query.where("booknumber", "==", bookNumber);
    }
    if (bookName !== "") {
      query = query.where("bookname", "==", bookName);
    }
    if (bookAuthor !== "") {
      query = query.where("bookauthor", "==", bookAuthor);
    }
    if (bookType.length > 0) {
      const types = Array.from(bookType, (el) => el.value);
      query = query.where("booktype", "array-contains", types);
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
  
    query.get().then((querySnapshot) => {
      const results = [];
      querySnapshot.forEach((doc) => {
        const bookData = [
          doc.data().booknumber || "",
          doc.data().bookname || "",
          doc.data().bookauthor || "",
          doc.data().booktype || "",
          doc.data().bookpublication || "",
          doc.data().bookgenre || "",
          doc.data().bookpages || "",
        ];
        const fields = bookData.join(" ").toLowerCase();
        if (
          fields.includes(bookNumber.toLowerCase()) ||
          fields.includes(bookName.toLowerCase()) ||
          fields.includes(bookAuthor.toLowerCase()) ||
          types.some((t) => fields.includes(t.toLowerCase())) ||
          fields.includes(bookPublication.toLowerCase()) ||
          fields.includes(bookGenre.toLowerCase()) ||
          fields.includes(bookPages.toLowerCase())
        ) {
          results.push(bookData);
        }
      });
      if (results.length > 0) {
        console.log("Books found:");
        results.forEach((bookData) => {
          console.log(bookData.join(", "));
        });
      } else {
        console.log("No books found.");
      }
    }).catch((error) => {
      console.log(error);
    });
  }
  
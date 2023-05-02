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
  /*book type doesn't work yet :( */
  if (bookType.length > 0) {
    const types = [];
    bookType.forEach((checkbox) => {
      types.push(checkbox.value);
    });
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
      const bookData = {
        bookNumber: doc.data().booknumber || "",
        bookName: doc.data().bookname || "",
        bookAuthor: doc.data().bookauthor || "",
        bookType: doc.data().booktype || "",
        bookPublication: doc.data().bookpublication || "",
        bookGenre: doc.data().bookgenre || "",
        bookPages: doc.data().bookpages || "",
      };
      const fields = Object.values(bookData).join(" ").toLowerCase();
      if (
        fields.includes(bookNumber.toLowerCase()) ||
        fields.includes(bookName.toLowerCase()) ||
        fields.includes(bookAuthor.toLowerCase()) ||
        bookType.length === 0 ||
        bookType.some((t) => fields.includes(t.toLowerCase())) ||
        fields.includes(bookPublication.toLowerCase()) ||
        fields.includes(bookGenre.toLowerCase()) ||
        fields.includes(bookPages.toLowerCase())
      ) {
        results.push(bookData);
      }
    });
    if (results.length > 0) {
      console.log("Books found:");
      localStorage.clear()
      results.forEach((bookData, index) => {
        localStorage.setItem(`book${index}`, JSON.stringify(bookData));
        console.log(bookData);
      });
      localStorage.setItem("bookCount", results.length);
      window.location.href = "searchresults.html";
    } else {
      console.log("No books found.");
      localStorage.clear();
      localStorage.setItem("bookCount", results.length);
      window.location.href = "searchresults.html";
    }
  }).catch((error) => {
    console.log(error);
  });
}

/*old if statement, put all books into 1 array*/

/*if (results.length > 0) {
  console.log("Books found:");
  results.forEach((bookData) => {
    console.log(bookData.join(", "));
  });
  /*localStorage.setItem("searchResults", JSON.stringify(results));*//*
} else {
console.log("No books found.");
}
}).catch((error) => {
console.log(error);
});
}*/


/* tried making a ranking system for partial matches, did not work :/ */

/*function searchBooks() {
  const db = firebase.firestore();
  const booksRef = db.collection("books");

  const bookNumber = document.getElementById("bookNumberS").value;
  const bookName = document.getElementById("bookNameS").value;
  const bookAuthor = document.getElementById("bookAuthorS").value;
  const bookType = document.querySelectorAll('input[name="bookTypeS"]:checked');
  const types = Array.from(document.querySelectorAll('input[name="bookTypeS"]:checked'), (el) => el.value);
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
    let types = Array.from(bookType, (el) => el.value);
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
      let matchCount = 0;
      if (fields.includes(bookNumber.toLowerCase())) {
        matchCount++;
      }
      if (fields.includes(bookName.toLowerCase())) {
        matchCount++;
      }
      if (fields.includes(bookAuthor.toLowerCase())) {
        matchCount++;
      }
      const typeMatches = types.filter((t) => fields.includes(t.toLowerCase())).length;
      matchCount += typeMatches; // Add the number of matched types to the match count
      if (fields.includes(bookPublication.toLowerCase())) {
        matchCount++;
      /*const typeMatches = types.filter((t) => fields.includes(t.toLowerCase())).length;*/
/*
      if (typeMatches > 0) {
        matchCount += typeMatches;
      }
      if (fields.includes(bookPublication.toLowerCase())) {
        matchCount++;
      }
      if (fields.includes(bookGenre.toLowerCase())) {
        matchCount++;
      }
      if (fields.includes(bookPages.toLowerCase())) {
        matchCount++;
      }
      if (matchCount > 0) {
        results.push({ bookData, matchCount });
      }
    });
    if (results.length > 0) {
      console.log("Books found:");
      results.sort((a, b) => b.matchCount - a.matchCount);
      results.forEach((result) => {
        console.log(result.bookData.join(", "));
      });
    } else {
      console.log("No books found.");
    }
  }).catch((error) => {
    console.log(error);
  });
}*/
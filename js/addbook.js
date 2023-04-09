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

    $("#bookaddform").submit(function (e) {
        e.preventDefault();
    });

    $('#submit').click(function () {
        add_this();
    });

    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            window.location = 'homepage.html';
        }
    });

});

function add_this() {
    var bookCoverFile = document.getElementById("bookcovert").files[0];
    var BookNumber = document.getElementById("bookNumberT").value;
    var BookName = document.getElementById("bookNameT").value;
    var BookAuthor = document.getElementById("bookAuthorT").value;
    var BookType = document.querySelector('input[name="bookTypeT"]:checked').value;
    var BookPublication = document.getElementById("bookPublicationT").value;
    var BookGenre = document.getElementById("bookGenreT").value;
    var BookPages = document.getElementById("bookPagesT").value;
    var db = firebase.firestore();

    //upload book cover image to firebase storage
    var storageRef = firebase.storage().ref();
    var coverImageRef = storageRef.child('book_covers/' + BookNumber);
    coverImageRef.put(bookCoverFile)
    .then(function(snapshot) {
        return snapshot.ref.getDownloadURL();
    })
    .then(function(downloadURL) {
        //saves book details and book cover url from storage
        return db.collection("books").doc(BookNumber).set({
            bookCover: downloadURL,
            booknumber: BookNumber,
            bookname: BookName,
            bookauthor: BookAuthor,
            booktype: BookType,
            bookpublication: BookPublication,
            bookgenre: BookGenre,
            bookpages: BookPages
        });
    })
    .then(function() {
        console.log("success");
        window.alert("Book Added Successfully");
        window.location = 'technicianportal.html';
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

//old code with broken image upload
/*function add_this() {
    var bookCover = document.getElementById("bookcovert").files[0]; //doesn't work :(
    var BookNumber = document.getElementById("bookNumberT").value;
    var BookName = document.getElementById("bookNameT").value;
    var BookAuthor = document.getElementById("bookAuthorT").value;
    var BookType = document.querySelector('input[name="bookTypeT"]:checked').value;
    var BookPublication = document.getElementById("bookPublicationT").value;
    var BookGenre = document.getElementById("bookGenreT").value;
    var BookPages = document.getElementById("bookPagesT").value;
    var db = firebase.firestore();

    db.collection("books").doc(BookNumber).set({
        bookCover: downloadURL, //doesn't work :(
        booknumber: BookNumber,
        bookname: BookName,
        bookauthor: BookAuthor,
        booktype: BookType,
        bookpublication: BookPublication,
        bookgenre: BookGenre,
        bookpages: BookPages
    })

        //it worked :)
        .then(function () {
            console.log("success");
            window.alert("Book Added Successfully");
            window.location = 'technicianportal.html';
        })

        //error thrown when it is brokey
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}*/
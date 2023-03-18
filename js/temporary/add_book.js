/* // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuyAp0-coTH4f2B-yV90Yk9rbnE7Qwb3w",
  authDomain: "librarymanagementsystem-fcb1c.firebaseapp.com",
  projectId: "librarymanagementsystem-fcb1c",
  storageBucket: "librarymanagementsystem-fcb1c.appspot.com",
  messagingSenderId: "472846118639",
  appId: "1:472846118639:web:aabfb8d9921c5dc2eb351a",
  measurementId: "G-8WHX6E54YT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);*/

$(document).ready(function() {
    var firebaseConfig = {
    apiKey: "AIzaSyBuyAp0-coTH4f2B-yV90Yk9rbnE7Qwb3w",
    authDomain: "librarymanagementsystem-fcb1c.firebaseapp.com",
    databaseURL: "https://librarymanagementsystem-fcb1c-default-rtdb.firebaseio.com/",
    projectId: "librarymanagementsystem-fcb1c",
    storageBucket: "librarymanagementsystem-fcb1c.appspot.com",
    messagingSenderId: "472846118639",
    appId: "1:472846118639:web:aabfb8d9921c5dc2eb351a",
    measurementId: "G-8WHX6E54YT"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var db = firebase.firestore();

    $("#bookaddform").submit(function(e) {
        e.preventDefault();
    });

    $('#submit').click(function() {
      add_this();
    });

    firebase.auth().onAuthStateChanged(user => {
        if(!user) {
            window.location = 'index.html';
            }
    });

});

function add_this()
{
    var BookNumber = document.getElementById("bookNumberT").value;
    var BookName = document.getElementById("bookNameT").value;
    var BookAuthor = document.getElementById("bookAuthorT").value;
    var BookType = document.getElementById("bookTypeT").value;
    var BookPublication = document.getElementById("bookPublicationT").value;
    var BookGenre = document.getElementById("bookGenre").value;
    var BookPages = document.getElementById("bookPagesT").value;
    var BookCover = document.getElementById("bookcovert").value;
    var db = firebase.firestore();
 
    db.collection("books").doc(BookNumber).set({
        booknumber: BookNumber,
        bookname : BookName,
        bookauthor: BookAuthor,
        booktype: BookType,
        bookpublication : BookPublication,
        bookgenre : BookGenre,
        bookpages : BookPages,
        bookcover : BookCover
    })
    .then(function() {
        console.log("Document successfully written!");
        window.alert("Successfully Book Added");
        window.location = 'technicianportal.html';
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

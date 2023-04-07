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

    $("#bookcheckinform").submit(function (e) {
        e.preventDefault();
    });

    $('#submit').click(function () {
        move_book_to_books();
    });

    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            window.location = 'homepage.html';
        }
    });

});

//takes book out of checked out section and moves into books section
function move_book_to_books(BookNumber) {
    var BookNumber = document.getElementById("bookNumberT").value;
    var db = firebase.firestore();

    // Get the reference to the document with the given book number in the "checkedout" collection
    var boooook = db.collection("checkedout").doc(BookNumber);

    // Get the data of the book document
    boooook.get()
    .then(function(bookDoc) {
        if (bookDoc.exists) {
            var bookData = bookDoc.data();

            // Add the book data to the "books" collection with the same book number as the document ID
            db.collection("books").doc(BookNumber).set(bookData)
            .then(function() {
                console.log("Book checked in successfully");
                window.alert("Book checked in successfully");

                // Delete the book document from the "checkedout" collection
                boooook.delete()
                .then(function() {
                    console.log("removed from checked out success");
                    // Perform any additional actions after book removal
                })
                .catch(function(error) {
                    console.error("Error checking in: ", error);
                    // Handle error if book removal from checkedout collection fails
                });
            })
            .catch(function(error) {
                console.error("Error checking in: ", error);
                // Handle error if adding book to books collection fails
            });
        } else {
            console.error("Book not checked out");
            window.alert("Book not checked out");
        }
    })
    .catch(function(error) {
        console.error("Error getting book document: ", error);
        // Handle error if getting book document fails
    });
}

// Get the book number input field value and call the move_book_to_books() function when a button is clicked
$("#moveToBooksButton").click(function() {
    var bookNumber = $("#bookNumberT").val();
    move_book_to_books(bookNumber);
});

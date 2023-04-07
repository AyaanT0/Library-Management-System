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

    $("#bookcheckoutform").submit(function (e) {
        e.preventDefault();
    });

    $('#submit').click(function () {
        move_book_to_checkedout();
    });

    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            window.location = 'homepage.html';
        }
    });

});
//takes book out of book section and moves into checked out section
function move_book_to_checkedout(BookNumber) {
    var BookNumber = document.getElementById("bookNumberT").value;
    var db = firebase.firestore();

    //takes book number from input
    var boooook = db.collection("books").doc(BookNumber);

    //collects book data from the database
    boooook.get()
    .then(function(bookDoc) {
        if (bookDoc.exists) {
            var bookData = bookDoc.data();

            //adds book data to "checkedout" section with same data
            db.collection("checkedout").doc(BookNumber).set(bookData)
            .then(function() {
                console.log("Book checked out successfully");
                window.alert("Book checked out successfully");

                //deletes book data from books section
                boooook.delete()
                .then(function() {
                    console.log("Book checked out successfully");
                    //logs success message to console
                })
                .catch(function(error) {
                    console.error("Error checking out: ", error);
                    //error
                });
            })
            .catch(function(error) {
                console.error("Error checking out: ", error);
                //error
            });
        } else {
            console.error("Book not found");
            window.alert("Book not found");
        }
    })
    .catch(function(error) {
        console.error("Error getting book document: ", error);
        //error
    });
}

// collects book number and calls function
$("#moveToCheckedOutButton").click(function() {
    var bookNumber = $("#bookNumberT").val();
    move_book_to_checkedout(bookNumber);
});

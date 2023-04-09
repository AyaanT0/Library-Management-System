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

    $("#bookremoveform").submit(function (e) {
        e.preventDefault();
    });

    $('#submit').click(function () {
        remove_this();
    });

    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            window.location = 'homepage.html';
        }
    });

});

function remove_this(BookNumber) {
    var BookNumber = document.getElementById("bookNumberT").value;
    var db = firebase.firestore();

    //gets book num from input
    var boooook = db.collection("books").doc(BookNumber);

    //check if book exists
    boooook.get()
    .then(function(doc) {
        if (doc.exists) {
            //gets book cover url from the book data document (saved in storage)
            var coverImageURL = doc.data().bookCover;
            
            //delete book
            boooook.delete()
            .then(function() {
                console.log("Book removed successfully");
                window.alert("Book removed successfully");

                //deletes book cover image from storage
                if (coverImageURL) {
                    var storageRef = firebase.storage().refFromURL(coverImageURL);
                    storageRef.delete()
                    .then(function() {
                        console.log("Cover image removed successfully");
                    })
                    .catch(function(error) {
                        console.error("Error removing cover image: ", error);
                    });
                }
            })
            .catch(function(error) {
                console.error("Error removing book: ", error);
                window.alert("Error removing book: " + error);
                //error
            });
        } else {
            //error
            window.alert("Book does not exist. Please check if the book is checked in first.");
        }
    })
    .catch(function(error) {
        console.error("Error checking book existence: ", error);
        window.alert("Error checking book existence: " + error);
        //error
    });
}

//gets books number and calls function
$("#removeBookButton").click(function() {
    var bookNumber = $("#bookNumberT").val();
    remove_book(bookNumber);
});
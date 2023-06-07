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

    $("#bookremoveform").submit(function (e) {
        e.preventDefault();
    }); //prevents submission of form when enter is pressed if the form is not filled out

    $('#submit').click(function () {
        remove_this();
    }); //once the submit button is clicked, the remove_this function is called

    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            window.location = 'homepage.html';
        }
    }); //event listener that checks whether the user is authenticated as a technician, if not, they are redirected to the homepage


});

//removes book from database
function remove_this(BookNumber) {
    var BookNumber = document.getElementById("bookNumberT").value;
    var db = firebase.firestore();

    //gets book num from input
    var boooook = db.collection("books").doc(BookNumber);

    //check if book exists
    boooook.get()
        .then(function (doc) {
            if (doc.exists) {
                //gets book cover url from the book data document (saved in storage)
                var coverImageURL = doc.data().bookCover;

                //delete book
                boooook.delete()
                    .then(function () {
                        console.log("Book removed successfully"); //logs success message to console
                        window.alert("Book removed successfully"); //alerts user that book was removed successfully

                        //deletes book cover image from storage
                        if (coverImageURL) {
                            var storageRef = firebase.storage().refFromURL(coverImageURL);
                            storageRef.delete()
                                .then(function () {
                                    console.log("Cover image removed successfully");
                                }) //cover image deleted
                                .catch(function (error) {
                                    console.error("Error removing cover image: ", error);
                                });//could not delete cover image
                        }
                    })
                    .catch(function (error) {
                        console.error("Error removing book: ", error);
                        window.alert("Error removing book: " + error);
                        //error
                    });
            } else {
                //error
                window.alert("Book does not exist. Please check if the book is checked in first.");
            }
        })
        .catch(function (error) {
            console.error("Error checking book existence: ", error);
            window.alert("Error checking book existence: " + error);
            //error
        });
}

//gets books number and calls function
$("#removeBookButton").click(function () {
    var bookNumber = $("#bookNumberT").val();
    remove_book(bookNumber);
});
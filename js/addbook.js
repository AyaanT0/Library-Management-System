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

    $("#bookaddform").submit(function (e) {
        e.preventDefault();
    }); //prevents submission of form when enter is pressed if the form is not filled out

    $('#submit').click(function () {
        add_this();
    }); //once the submit button is clicked, the add_this function is called

    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            window.location = 'homepage.html';
        }
    }); //event listener that checks whether the user is authenticated as a technician, if not, they are redirected to the homepage

});

function add_this() { //takes all the data from the form and adds it to the database
    var bookCoverFile = document.getElementById("bookcovert").files[0];
    var BookNumber = document.getElementById("bookNumberT").value;
    var BookName = document.getElementById("bookNameT").value;
    var BookAuthor = document.getElementById("bookAuthorT").value;
    var BookType = document.querySelector('input[name="bookTypeT"]:checked').value;
    var BookPublication = document.getElementById("bookPublicationT").value;
    var BookGenre = document.getElementById("bookGenreT").value;
    var BookPages = document.getElementById("bookPagesT").value;
    var db = firebase.firestore();

    // validate the form data
    if (!bookCoverFile || !BookNumber || !BookName || !BookAuthor || !BookType || !BookPublication || !BookGenre || !BookPages) {
        window.alert("Please fill in all the fields.");
        return;
    }

    var bookExists = false; // Flag to check if book already exists in database

    // Check if book number already exists in the database
    db.collection("books").doc(BookNumber).get().then(function (doc) {
        if (doc.exists) {
            // Book already exists in books collection, so alert user and do not add book
            window.alert("Book already exists");
            bookExists = true;
            return;
        }

        // Check if book number exists in checkedout collection
        db.collection("checkedout").doc(BookNumber).get().then(function (doc) {
            if (doc.exists) {
                // Book already exists in checkedout collection, so alert user and do not add book
                window.alert("Book already exists");
                bookExists = true;
                return;
            }

            // If the book does not exist, continue with adding the book
            if (!bookExists) {
                // Upload book cover image to firebase storage
                var storageRef = firebase.storage().ref();
                var coverImageRef = storageRef.child('book_covers/' + BookNumber);
                coverImageRef.put(bookCoverFile)
                    .then(function (snapshot) {
                        return snapshot.ref.getDownloadURL();
                    })
                    .then(function (downloadURL) {
                        // Save book details and book cover url from storage
                        //saves variable to specific value/key in database
                        //code is formatted as variable:key
                        //whenever a book is added, its automatically set to available
                        return db.collection("books").doc(BookNumber).set({
                            bookCover: downloadURL,
                            booknumber: BookNumber,
                            bookname: BookName,
                            bookauthor: BookAuthor,
                            booktype: BookType,
                            bookpublication: BookPublication,
                            bookgenre: BookGenre,
                            bookpages: BookPages,
                            bookstatus: "available"
                        });
                    })
                    //logs and alerts success message if book is added successfully
                    .then(function () {
                        console.log("success");
                        window.alert("Book Added Successfully");
                        window.location = 'technicianportal.html';
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });//if a firebase error occurs, it is logged in the console
            }
        }).catch(function (error) {
            console.error("Error getting document: ", error);
        }); //if a firebase error occurs, it is logged in the console
    }).catch(function (error) {
        console.error("Error getting document: ", error);
    });//if a firebase error occurs, it is logged in the console
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
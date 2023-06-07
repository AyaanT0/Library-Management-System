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

    $("#loginform").submit(function (e) {
        e.preventDefault();
    });//prevents submission of form when enter is pressed if the form is not filled out

    $('#submit').click(function () {
        login();
    }); //once the submit button is clicked, it logs you in after successful authentication

    $('#back').click(function () {
        logout();
    }); //back function, cancels login process

    $('#logout').click(function () {
        logout();
    }); //logout function, cancels login process

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            window.location = 'technicianportal.html'; //event listener that sends you to technician portal once you are authenticated as a technician  
        }
    });
});

//this function is called when the user clicks the login button
function login() {
    //gets the values of the email and password fields
    var email = document.getElementById("usert").value;
    var password = document.getElementById("passt").value;

    //checks if the email is equal to the default technician email
    if (email === "technician@northpark.com") {
        //signs in the user with the email and password provided
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            //handle Errors if there is any
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert(errorMessage); //displays the error message to the user
        });
    }
}

//this function is called when the user clicks the logout button
function logout() {
    //signs out the current user
    firebase.auth().signOut().then(function () {
        //sign-out successful
    }).catch(function (error) {
        //error
    });
}


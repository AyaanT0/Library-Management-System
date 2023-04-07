$(document).ready(function() {

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

    $('#logout').click(function()
    {
        logout();
    });
    firebase.auth().onAuthStateChanged(user => {
        if(!user) {
            window.location = 'homepage.html';
            }
    });

});

function logout()
{
    firebase.auth().signOut().then(function() {
        console.log("logout done");
        window.location = 'homepage.html';
    }).catch(function(error) {
        console.log("error");
    });
}
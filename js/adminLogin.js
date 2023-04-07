$(document).ready(function(){
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

    $("#loginform").submit(function(e) {
        e.preventDefault();
    });

    $('#submit').click(function() {
      login();
    });

    $('#back').click(function()
    {
        logout();
    });

    $('#logout').click(function()
    {
        logout();
    });

    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            window.location = 'technicianportal.html'; //After successful login, user will be redirected   
            }
        });

  });
  
function login(){
    var email = document.getElementById("usert").value;
    var password = document.getElementById("passt").value;

    if(email === "technician@northpark.com")
    {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert(errorMessage);
        });
    }
    
}
function logout()
{
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    }).catch(function(error) {
    // An error happened.
    });
}

$(document).ready(function () {
    //initializes firebase
    firebase.initializeApp({
        apiKey: "AIzaSyBuyAp0-coTH4f2B-yV90Yk9rbnE7Qwb3w",
        authDomain: "librarymanagementsystem-fcb1c.firebaseapp.com",
        databaseURL: "https://librarymanagementsystem-fcb1c-default-rtdb.firebaseio.com/",
        projectId: "librarymanagementsystem-fcb1c",
        storageBucket: "librarymanagementsystem-fcb1c.appspot.com",
        messagingSenderId: "472846118639",
        appId: "1:472846118639:web:aabfb8d9921c5dc2eb351a",
    });

    //gets a reference to the Firestore database
    var db = firebase.firestore();

    //retrieves book requests from Firebase
    db.collection('requests').get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var request = doc.data();
    
            //creates a book request element
            var bookRequest = $('<div class="bookRequest"></div>');
    
            //creates title element
            var title = $('<div class="bookRequestTitle">' + request.title + '</div>');
    
            //creates details element
            var details = $('<div class="bookRequestDetails"></div>');
            var author = $('<div><strong>Author:</strong> ' + request.author + '</div>');
            var why = $('<div><strong>Reason:</strong> ' + request.why + '</div>');
    
            //appends title and details to the book request element
            bookRequest.append(title);
            bookRequest.append(details);
    
            //appends author and why to the details element
            details.append(author);
            details.append(why);
    
            //hides the details initialy
            details.hide();
    
            //toggle visibility of details on click of the book request element
            bookRequest.on('click', function () {
                details.slideToggle();
            });
    
            //appends the book request element to the container
            $('#bookRequestsContainer').append(bookRequest);
        });
    });
    
});

$(document).ready(function () {
    // Initialize Firebase
    firebase.initializeApp({
        apiKey: "AIzaSyBuyAp0-coTH4f2B-yV90Yk9rbnE7Qwb3w",
        authDomain: "librarymanagementsystem-fcb1c.firebaseapp.com",
        databaseURL: "https://librarymanagementsystem-fcb1c-default-rtdb.firebaseio.com/",
        projectId: "librarymanagementsystem-fcb1c",
        storageBucket: "librarymanagementsystem-fcb1c.appspot.com",
        messagingSenderId: "472846118639",
        appId: "1:472846118639:web:aabfb8d9921c5dc2eb351a",
    });

    // Get a reference to the Firestore database
    var db = firebase.firestore();

    // Retrieve book requests from Firebase
    db.collection('requests').get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var request = doc.data();
    
            // Create a book request element
            var bookRequest = $('<div class="bookRequest"></div>');
    
            // Create title element
            var title = $('<div class="bookRequestTitle">' + request.title + '</div>');
    
            // Create details element
            var details = $('<div class="bookRequestDetails"></div>');
            var author = $('<div><strong>Author:</strong> ' + request.author + '</div>');
            var why = $('<div><strong>Reason:</strong> ' + request.why + '</div>');
    
            // Append title and details to the book request element
            bookRequest.append(title);
            bookRequest.append(details);
    
            // Append author and why to the details element
            details.append(author);
            details.append(why);
    
            // Initially hide the details
            details.hide();
    
            // Toggle visibility of details on click
            bookRequest.on('click', function () {
                details.slideToggle();
            });
    
            // Append the book request element to the container
            $('#bookRequestsContainer').append(bookRequest);
        });
    });
    
});

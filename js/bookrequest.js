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

    // Handle form submission
    $('#bookrequestform').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        // Get form values
        var title = $('#title').val();
        var author = $('#author').val();
        var why = $('#why').val();

        // Check if why is longer than 150 characters
        if (why.length > 250) {
            alert('Please limit your request to 250 characters.');
            return; // Stop further execution
        }

        // Generate the request ID with book title and request number
        generateRequestId(title).then(function (requestId) {
            // Create a new document in the "requests" collection with the generated request ID
            db.collection('requests').doc(requestId).set({
                title: title,
                author: author,
                why: why
            })
                .then(function () {
                    console.log('Document written with ID: ', requestId);
                    // Reset the form after successful submission
                    $('#bookrequestform')[0].reset();
                    $('#confirmationModal').modal('show');
                })
                .catch(function (error) {
                    console.error('Error adding document: ', error);
                });
        });
    });

    // Handle the "Submit Another" button click
    $('#submitAnotherBtn').on('click', function () {
        window.location.href = 'bookrequest.html';
    });

    // Handle the "View Existing" button click
    $('#viewExistingBtn').on('click', function () {
        window.location.href = 'bookrequests.html';
    });

    // Function to generate the request ID using the book title and request count
    function generateRequestId(title) {
        var sanitizedTitle = title.replace(/\s/g, ''); // Remove whitespace from the title

        return db.collection('requests').get().then(function (querySnapshot) {
            var requestCount = querySnapshot.size + 1; // Increment the count by 1 for the new request

            // Combine the sanitized title and request count to generate the request ID
            var requestId = sanitizedTitle + requestCount;

            return requestId;
        });
    }
});

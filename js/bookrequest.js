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

    //gets a referecne to firestore database
    var db = firebase.firestore();

    //handles form submission
    $('#bookrequestform').on('submit', function (e) {
        e.preventDefault(); //prevents the default form submission (required by firebase, handles null requests)

        //gets form values
        var title = $('#title').val();
        var author = $('#author').val();
        var why = $('#why').val();

        //check if 'why' is longer than 150 characters
        if (why.length > 150) {
            alert('Please limit your request to 150 characters.');
            return; //stops further execution (submission of the form is blocked)
        }

        //generates the request ID with book title and request number
        generateRequestId(title).then(function (requestId) {
            //creates a new document in the "requests" collection with the generated request ID
            db.collection('requests').doc(requestId).set({
                title: title,
                author: author,
                why: why
            })
                .then(function () {
                    console.log('Document written with ID: ', requestId);
                    //resets the form after successful submission
                    $('#bookrequestform')[0].reset();
                    $('#confirmationModal').modal('show');
                })
                .catch(function (error) {
                    console.error('Error adding document: ', error);
                });
        });
    });

    //custom dialog box since you can't change the buttons (ok, cancel) on a regular alert box

    //handle the "Submit Another" button click
    $('#submitAnotherBtn').on('click', function () {
        window.location.href = 'bookrequest.html';
    });

    //handles the "View Existing" button click
    $('#viewExistingBtn').on('click', function () {
        window.location.href = 'bookrequests.html';
    });

    //function to generate the request ID using the book title and request count
    //it basically takes whatever the request number is and appends it to the end of the book title
    function generateRequestId(title) {
        var cleanTitle = title.replace(/\s/g, ''); //removes whitespace from the title (i added this to clean up the format)

        return db.collection('requests').get().then(function (querySnapshot) {
            var requestCount = querySnapshot.size + 1; //increment the count by 1 for the new request

            //combines the title and request count to generate the request ID
            var requestId = cleanTitle + requestCount;

            return requestId;
        });
    }
});

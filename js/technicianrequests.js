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

    firebase.initializeApp(firebaseConfig);

    var db = firebase.firestore();

    $('#logout').click(function () {
        logout();
    });

    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            window.location = 'homepage.html';
        } else {
            displayBookRequests();
        }
    });

    function logout() {
        firebase.auth().signOut().then(function () {
            console.log("logout done");
            window.location = 'homepage.html';
        }).catch(function (error) {
            console.error("Error during logout: ", error);
        });
    }

    function displayBookRequests() {
        var db = firebase.firestore();

        db.collection('requests').get().then(function (querySnapshot) {
            // Clear the bookRequestsContainer before appending book requests
            $('#bookRequestsContainer').empty();

            querySnapshot.forEach(function (doc) {
                var request = doc.data();

                var bookRequest = $('<div class="bookRequest"></div>');

                var deleteButton = $('<button class="deleteButton">Delete</button>');

                bookRequest.append(deleteButton);

                var title = $('<div class="bookRequestTitle">' + request.title + '</div>');

                var details = $('<div class="bookRequestDetails"></div>');
                var author = $('<div><strong>Author:</strong> ' + request.author + '</div>');
                var why = $('<div><strong>Reason:</strong> ' + request.why + '</div>');

                bookRequest.append(title);
                bookRequest.append(details);

                details.append(author);
                details.append(why);

                details.hide();

                bookRequest.on('click', function () {
                    details.slideToggle();
                });

                deleteButton.on('click', function (event) {
                    event.stopPropagation();

                    db.collection('requests').doc(doc.id).delete().then(function () {
                        bookRequest.remove();
                    }).catch(function (error) {
                        console.error("Error removing document: ", error);
                    });
                });

                $('#bookRequestsContainer').append(bookRequest);
            });
        });
    }

    displayBookRequests(); // Call the function to display book requests
});

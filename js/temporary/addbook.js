// Get the form element
const form = document.getElementById('bookaddform');

// Listen for the form submission event
form.addEventListener('submit', function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the form data
  const formData = new FormData(form);

  // Create an object to store the form data
  const bookData = {};

  // Loop through the form data and store it in the object
  for (const [key, value] of formData.entries()) {
    bookData[key] = value;
  }

  // Retrieve the existing books from localStorage
  let books = JSON.parse(localStorage.getItem('books')) || [];

  // Add the new book to the array
  books.push(bookData);

  // Store the updated books array in localStorage
  localStorage.setItem('books', JSON.stringify(books));
});

// Retrieve the stored books from localStorage
const storedBooks = JSON.parse(localStorage.getItem('books')) || [];

// Use the stored books array to display the stored data
console.log(storedBooks);
 
//Not yet coded

/*HOW WILL THIS WORK?

There are a few ways that I could approach search for the library system book search function. 
The method that I think I’ll settle on is that I’ll use the Firebase jquery query.where function to 
search all the search terms against all the saved book documents, and it will return the books that 
have all the matching criteria. It wouldn’t make sense for me to return all the books if 
they have less than all the matching criteria since I could select “fiction” and “2021-2023” 
and it could return a fiction book from 2005, which wouldn’t be helpful. I’ll write the code so that 
it only searches those terms if the field is filled. Then, to handle different cases, I’ll make the code 
make all text entry sections pull the data as a string just to make matching against the database easier. 
Additionally, since I opted not to use local storage to store book data, I decided to use local storage 
to display search results, just to keep some semblance of the original instructions, while 
adding my own unique code, ideas, and features to the project.
*/
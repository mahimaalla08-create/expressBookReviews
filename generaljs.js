const axios = require('axios');

// Fetch all books from API
async function getAllBooks() {
  try {
    const res = await axios.get('http://localhost:3000/books');
    console.log("All Books:", res.data);
  } catch (error) {
    console.log("Error fetching all books");
  }
}

// Fetch a book by ISBN
async function getBookByISBN(isbn) {
  try {
    const res = await axios.get(`http://localhost:3000/books/isbn/${isbn}`);
    
    if (!res.data) {
      console.log("Book not found");
    } else {
      console.log("Book:", res.data);
    }

  } catch (error) {
    console.log("Error fetching book by ISBN");
  }
}

// Fetch books by author name
async function getBooksByAuthor(author) {
  try {
    const res = await axios.get(`http://localhost:3000/books/author/${author}`);
    
    if (res.data.length === 0) {
      console.log("No books found for this author");
    } else {
      console.log("Books by Author:", res.data);
    }

  } catch (error) {
    console.log("Error fetching books by author");
  }
}

// Fetch books by title
async function getBooksByTitle(title) {
  try {
    const res = await axios.get(`http://localhost:3000/books/title/${title}`);
    
    if (res.data.length === 0) {
      console.log("No books found for this title");
    } else {
      console.log("Books by Title:", res.data);
    }

  } catch (error) {
    console.log("Error fetching books by title");
  }
}

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle
};

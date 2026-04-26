const axios = require('axios');

// Base URL of the API
const BASE_URL = "http://localhost:3000";

// ✅ Get all books
async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    console.log("All Books:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching all books:", error.message);
  }
}

// ✅ Get book by ISBN
async function getBookByISBN(isbn) {
  try {
    const response = await axios.get(`${BASE_URL}/books/isbn/${isbn}`);
    
    if (response.data) {
      console.log("Book Found:", response.data);
    } else {
      console.log("Book not found");
    }

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log("Book not found (404)");
    } else {
      console.error("Error fetching book by ISBN:", error.message);
    }
  }
}

// ✅ Get books by Author
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`${BASE_URL}/books/author/${author}`);
    
    if (response.data.length > 0) {
      console.log("Books by Author:", response.data);
    } else {
      console.log("No books found for this author");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching books by author:", error.message);
  }
}

// ✅ Get books by Title
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`${BASE_URL}/books/title/${title}`);
    
    if (response.data.length > 0) {
      console.log("Books by Title:", response.data);
    } else {
      console.log("No books found for this title");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching books by title:", error.message);
  }
}

// Export all functions
module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle
};

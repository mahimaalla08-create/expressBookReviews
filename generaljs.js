const axios = require('axios');

async function getBooksByAuthor(author) {
  try {
    const res = await axios.get(`http://localhost:3000/books/author/${author}`);
    
    if (res.data.length === 0) {
      console.log("No books found for this author");
    } else {
      console.log("Books found:", res.data);
    }

  } catch (error) {
    if (error.response) {
      console.log("Server error:", error.response.status);
    } else {
      console.log("Error fetching data");
    }
  }
}

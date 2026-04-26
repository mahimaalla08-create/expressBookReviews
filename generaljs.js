const axios = require('axios');

async function getAllBooks() {
  const res = await axios.get('http://localhost:3000/books');
  console.log(res.data);
}

async function getBookByISBN(isbn) {
  const res = await axios.get(`http://localhost:3000/books/isbn/${isbn}`);
  console.log(res.data);
}

async function getBooksByAuthor(author) {
  const res = await axios.get(`http://localhost:3000/books/author/${author}`);
  console.log(res.data);
}

async function getBooksByTitle(title) {
  const res = await axios.get(`http://localhost:3000/books/title/${title}`);
  console.log(res.data);
}

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle
};
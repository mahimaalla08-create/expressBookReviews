const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const SECRET = "secret123";

// ✅ 10 BOOKS (IMPORTANT FIX)
let books = {
  "1":{"title":"Things Fall Apart","author":"Chinua Achebe","reviews":{}},
  "2":{"title":"Fairy Tales","author":"Hans Christian Andersen","reviews":{}},
  "3":{"title":"The Divine Comedy","author":"Dante Alighieri","reviews":{}},
  "4":{"title":"The Epic Of Gilgamesh","author":"Unknown","reviews":{}},
  "5":{"title":"The Book Of Job","author":"Unknown","reviews":{}},
  "6":{"title":"One Thousand and One Nights","author":"Unknown","reviews":{}},
  "7":{"title":"Njál's Saga","author":"Unknown","reviews":{}},
  "8":{"title":"Pride and Prejudice","author":"Jane Austen","reviews":{}},
  "9":{"title":"Le Père Goriot","author":"Honoré de Balzac","reviews":{}},
  "10":{"title":"Molloy, Malone Dies, The Unnamable","author":"Samuel Beckett","reviews":{}}
};

let users = [];

// ✅ Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// ✅ Get book by ISBN
app.get('/books/isbn/:isbn', (req, res) => {
  res.json(books[req.params.isbn]);
});

// ✅ Get books by author
app.get('/books/author/:author', (req, res) => {
  const result = Object.values(books).filter(
    b => b.author.toLowerCase() === req.params.author.toLowerCase()
  );
  res.json(result);
});

// ✅ Get books by title
app.get('/books/title/:title', (req, res) => {
  const result = Object.values(books).filter(
    b => b.title.toLowerCase() === req.params.title.toLowerCase()
  );
  res.json(result);
});

// ✅ FIXED: Get review (correct endpoint)
app.get('/review/:isbn', (req, res) => {
  res.json(books[req.params.isbn].reviews);
});

// ✅ Register user
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.json({ message: "User registered successfully" });
});

// ✅ Login user
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ username }, SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// ✅ Middleware for auth
function auth(req, res, next) {
  const token = req.headers['authorization']?.split(" ")[1];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// ✅ FIXED: Add / Modify review
app.put('/review/:isbn', auth, (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;

  books[isbn].reviews[req.user.username] = review;
  res.json({ message: "Review added successfully" });
});

// ✅ FIXED: Delete review
app.delete('/review/:isbn', auth, (req, res) => {
  const isbn = req.params.isbn;

  delete books[isbn].reviews[req.user.username];
  res.json({ message: "Review deleted successfully" });
});

// ✅ Start server
app.listen(3000, () => console.log("Server running on port 3000"));
  

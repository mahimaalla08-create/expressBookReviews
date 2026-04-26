const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const SECRET = "secret123";

let books = {
  "1": {
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    reviews: {}
  },
  "2": {
    title: "Harry Potter",
    author: "J.K. Rowling",
    reviews: {}
  }
};

let users = [];

app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/isbn/:isbn', (req, res) => {
  res.json(books[req.params.isbn]);
});

app.get('/books/author/:author', (req, res) => {
  const result = Object.values(books).filter(
    b => b.author.toLowerCase() === req.params.author.toLowerCase()
  );
  res.json(result);
});

app.get('/books/title/:title', (req, res) => {
  const result = Object.values(books).filter(
    b => b.title.toLowerCase() === req.params.title.toLowerCase()
  );
  res.json(result);
});

app.get('/books/review/:isbn', (req, res) => {
  res.json(books[req.params.isbn].reviews);
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.json({ message: "User registered successfully" });
});

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

function auth(req, res, next) {
  const token = req.headers['authorization']?.split(" ")[1];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.put('/books/review/:isbn', auth, (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;

  books[isbn].reviews[req.user.username] = review;
  res.json({ message: "Review added/updated", reviews: books[isbn].reviews });
});

app.delete('/books/review/:isbn', auth, (req, res) => {
  const isbn = req.params.isbn;

  delete books[isbn].reviews[req.user.username];
  res.json({ message: "Review deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const books = [
  { isbn: "12355", title: "Hellen", author: "John", reviews: [] },
  { isbn: "67560", title: "The Castel", author: "Charles", reviews: [] }

];

// Task 1: Get the book list available in the shop
app.get("/books", async (req, res) => {
  res.json(books);
});

// Task 2: Get the books based on ISBN
app.get("/books/isbn/:isbn", (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  book ? res.json(book) : res.status(404).json({ error: "Book not found" });
});

// Task 3: Get all books by Author
app.get("/books/author/:author", (req, res) => {
  const results = books.filter(b => b.author === req.params.author);
  results.length ? res.json(results) : res.status(404).json({ error: "No books found" });
});

// Task 4: Get all books based on Title
app.get("/books/title/:title", (req, res) => {
  const results = books.filter(b => b.title.includes(req.params.title));
  results.length ? res.json(results) : res.status(404).json({ error: "No books found" });
});

// Task 5: Get book Review
app.get("/books/review/:isbn", (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  book ? res.json(book.reviews) : res.status(404).json({ error: "Book not found" });
});

// Task 6: Register New User
app.post("/register", (req, res) => {
  res.json({ message: "User registered successfully" });
});

// Task 7: Login as a Registered User
app.post("/login", (req, res) => {
  res.json({ message: "User logged in successfully" });
});

// Task 8: Add/Modify a book review
app.post("/books/review/:isbn", (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (book) {
    book.reviews.push(req.body.review);
    res.json({ message: "Review added successfully" });
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

// Task 9: Delete book review added by that particular user
app.delete("/books/review/:isbn", (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (book) {
    book.reviews = [];
    res.json({ message: "Review deleted successfully" });
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

// Task 10: Get all books – Using async callback function
app.get("/async/books", async (req, res) => {
  res.json(books);
});

// Task 11: Search by ISBN – Using Promises
app.get("/promise/books/isbn/:isbn", (req, res) => {
  new Promise((resolve, reject) => {
    const book = books.find(b => b.isbn === req.params.isbn);
    book ? resolve(book) : reject("Book not found");
  })
    .then(book => res.json(book))
    .catch(error => res.status(404).json({ error }));
});

// Task 12: Search by Author
app.get("/promise/books/author/:author", (req, res) => {
  new Promise((resolve, reject) => {
    const results = books.filter(b => b.author === req.params.author);
    results.length ? resolve(results) : reject("No books found");
  })
    .then(results => res.json(results))
    .catch(error => res.status(404).json({ error }));
});

// Task 13: Search by Title
app.get("/promise/books/title/:title", (req, res) => {
  new Promise((resolve, reject) => {
    const results = books.filter(b => b.title.includes(req.params.title));
    results.length ? resolve(results) : reject("No books found");
  })
    .then(results => res.json(results))
    .catch(error => res.status(404).json({ error }));
});

app.listen(3000, () => console.log("Server running on port 3000"));
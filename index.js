const express = require('express');
const app = express();

//  Middleware
app.use(express.json());

//  Home Route
app.get('/', (req, res) => {
    res.send("Library API is running");
});

// In-memory database
let books = [];
let id = 1;

// GET all books
app.get('/api/books', (req, res) => {
    res.status(200).json(books);
});

// GET book by ID
app.get('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
});

// CREATE book
app.post('/api/books', (req, res) => {
    // Validation
    if (!req.body || !req.body.title) {
        return res.status(400).json({ message: "Title is required" });
    }

    const book = {
        id: id++,
        title: req.body.title,
        author: req.body.author || "Unknown",
        available: true
    };

    books.push(book);

    res.status(201).json(book);
});

// UPDATE book
app.put('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Update fields safely
    if (req.body.title) book.title = req.body.title;
    if (req.body.author) book.author = req.body.author;

    res.status(200).json(book);
});

// DELETE book
app.delete('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    books = books.filter(b => b.id != req.params.id);

    res.status(200).json({ message: "Book deleted successfully" });
});

// Server start
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
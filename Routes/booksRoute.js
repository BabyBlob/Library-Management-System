import express from 'express';

const  router = express.Router();

import { Book } from '../Models/BookModel.js';

router.post('/', async (request, response) => {
    try {
        if (
            !request.body.book_ID ||
            !request.body.book_name ||
            !request.body.book_publisher ||
            !request.body.book_author ||
            !request.body.book_ISBN ||
            !request.body.book_condition
        ) {
            return response.status(400).send({
                message: 'All the fields are required in order to add a book'
            })
        }
        const addBook = {
            book_ID: request.body.book_ID,
            book_name: request.body.book_name,
            book_publisher: request.body.book_publisher,
            book_author: request.body.book_author,
            book_ISBN: request.body.book_ISBN,
            book_condition: request.body.book_condition
        };

        const book = await Book.create(addBook);
        return response.status(201).send(book);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            status: 'success',
            data: books 
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/:book_ID', async (request, response) => {
    try {

        const { book_ID } = request.params;

        const book = await Book.findOne({ book_ID });

        if (!book) {
            return response.status(404).json({ message: 'Book cannot be found in the database. Check for any misinput in search text.' });
        }

        return response.status(200).json(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.put('/:book_ID', async (request, response) => {
    try {
        const { book_ID } = request.params;
        const result = await Book.findOneAndUpdate({ book_ID }, request.body, { new: true });

        if (!result) {
            return response.status(404).json({ error: "Book not found" });
        }

        response.status(200).json({ message: "Book has been updated successfully", book: result });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

router.delete('/:book_ID', async (request, response) => {
    try {
        const { book_ID } = request.params;
        const result = await Book.findOneAndDelete({ book_ID });

        if (!result) {
            return response.status(404).json({ error: "Book not found" });
        }

        response.status(200).json({ message: "Book has been deleted successfully", book: result });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

export default router;
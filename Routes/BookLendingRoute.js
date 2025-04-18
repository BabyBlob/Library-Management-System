import express from 'express';
const router = express.Router();
import { Book_Return } from '../Models/BookReturnModel.js';
import { Book_Borrow } from '../Models/BookBorrowModel.js';
import { Book } from '../Models/BookModel.js';
import { Book_Log } from '../Models/BookLogModel.js';

router.post('/Lending/borrow', async (request, response) => {
    try {
        const { book_ID, borrower_name, borrower_phone, date_borrowed, due_date, book_condition } = request.body;

        if (!book_ID || !borrower_name || !borrower_phone || !date_borrowed || !due_date || !book_condition) {
            return response.status(400).json({
                status: 'error',
                message: 'All fields are required to borrow a book'
            });
        }

        const book = await Book.findOne({ book_ID });
        if (!book) {
            return response.status(404).json({
                status: 'error',
                message: 'Book not found'
            });
        }

        const existingBorrow = await Book_Borrow.findOne({ book_ID });
        if (existingBorrow) {
            return response.status(400).json({
                status: 'error',
                message: 'This book is already borrowed'
            });
        }

        const borrowRecord = await Book_Borrow.create({
            book_ID,
            borrower_name,
            borrower_phone,
            date_borrowed,
            due_date,
            book_condition
        });

        await Book_Log.create({
            book_ID,
            date_borrowed,
            borrower_name,
            borrower_phone,
            status: 'borrowed'
        });

        return response.status(201).json({
            status: 'success',
            data: borrowRecord
        });
    } catch (error) {
        console.error('Borrow error:', error);
        return response.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

router.post('/Lending/return', async (request, response) => {
    try {
        const { book_ID, returnee_name, returnee_phone, date_returned, book_condition } = request.body;

        if (!book_ID || !returnee_name || !returnee_phone || !date_returned || !book_condition) {
            return response.status(400).json({
                status: 'error',
                message: 'All fields are required to return a book'
            });
        }

        const book = await Book.findOne({ book_ID });
        if (!book) {
            return response.status(404).json({
                status: 'error',
                message: 'Book not found'
            });
        }

        const borrowRecord = await Book_Borrow.findOne({ book_ID });
        if (!borrowRecord) {
            return response.status(400).json({
                status: 'error',
                message: 'This book is not currently borrowed'
            });
        }

        const returnRecord = await Book_Return.create({
            book_ID,
            returnee_name,
            returnee_phone,
            date_returned,
            book_condition
        });

        await Book.findOneAndUpdate(
            { book_ID },
            { book_condition },
            { new: true }
        );

        await Book_Log.findOneAndUpdate(
            { 
                book_ID,
                status: 'borrowed',
                borrower_name: borrowRecord.borrower_name,
                borrower_phone: borrowRecord.borrower_phone
            },
            { 
                date_returned,
                returnee_name,
                returnee_phone,
                status: 'returned'
            },
            { new: true }
        );

        await Book_Borrow.deleteOne({ book_ID });

        return response.status(201).json({
            status: 'success',
            data: returnRecord
        });
    } catch (error) {
        console.error('Return error:', error);
        return response.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

router.get('/Lending/Logs', async (request, response) => {
    try {
        const logs = await Book_Log.find({}).sort({ date_borrowed: -1 });
        return response.status(200).json({
            status: 'success',
            data: logs
        });
    } catch (error) {
        console.error('Logs error:', error);
        return response.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

router.get('/Lending/Logs/:book_ID', async (request, response) => {
    try {
        const { book_ID } = request.params;
        const logs = await Book_Log.find({ book_ID }).sort({ date_borrowed: -1 });
        return response.status(200).json({
            status: 'success',
            data: logs
        });
    } catch (error) {
        console.error('Book logs error:', error);
        return response.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

router.get('/Lending/borrows', async (request, response) => {
    try {
        const borrows = await Book_Borrow.find({});
        return response.status(200).json({
            status: 'success',
            data: borrows
        });
    } catch (error) {
        console.error('Borrows error:', error);
        return response.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

router.get('/Lending/returns', async (request, response) => {
    try {
        const returns = await Book_Return.find({});
        return response.status(200).json({
            status: 'success',
            data: returns
        });
    } catch (error) {
        console.error('Returns error:', error);
        return response.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

router.get('/Lending/history/:book_ID', async (request, response) => {
    try {
        const { book_ID } = request.params;
        const borrows = await Book_Borrow.find({ book_ID });
        const returns = await Book_Return.find({ book_ID });
        const history = [
            ...borrows.map(b => ({ ...b._doc, type: 'borrow' })),
            ...returns.map(r => ({ ...r._doc, type: 'return' }))
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return response.status(200).json({
            status: 'success',
            data: history
        });
    } catch (error) {
        console.error('History error:', error);
        return response.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

export default router;
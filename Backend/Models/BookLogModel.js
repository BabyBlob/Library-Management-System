import mongoose from 'mongoose';

const book_transaction_historySchema = new mongoose.Schema({
    book_ID: {
        type: Number,
        required: true,
    },
    date_borrowed: {
        type: Date,
        required: true,
    },
    date_returned: {
        type: Date,
    },
}, {
    timestamps: true,
});

export const Book_Log = mongoose.model('Book_Log', book_transaction_historySchema, 'Book_Log');
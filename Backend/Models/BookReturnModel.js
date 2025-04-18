import mongoose from "mongoose";

const BookReturnSchema = mongoose.Schema(
    {
        book_ID: {
            type: Number,
            required: true,
        },
        returnee_name: {
            type: String,
            required: true,
        },
        returnee_phone: {
            type: String,
            required: true,
        },
        date_returned: {
            type: String,
            required: true,
        },
        book_condition: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

export const Book_Return = mongoose.model('Book_Return', BookReturnSchema, 'Book_Return');
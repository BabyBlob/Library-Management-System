import mongoose from "mongoose";

const BookBorrowSchema = mongoose.Schema(
    {
        book_ID:{
            type: Number,
            required: true,
        },

        borrower_name:{
            type: String,
            required: true,
        },

        borrower_phone:{
            type: String,
            required: true,
        },

        date_borrowed:{
            type: String,
            required: true,
        },

        due_date :{
            type: String,
            required: true,
        },

        book_condition:{
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

export const Book_Borrow = mongoose.model('Book_Borrow', BookBorrowSchema, 'Book_Borrow');
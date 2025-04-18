import mongoose from "mongoose";


const BookSchema = mongoose.Schema(
    {
        book_ID:{
            type: Number,
            required: true,
        },

        book_name:{
            type: String,
            required: true,
        },

        book_publisher:{
            type: String,
            required: true,
        },

        book_author:{
            type: String,
            required: true,
        },

        book_ISBN :{
            type: String,
            required: true,
        },

        book_condition:{
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Book = mongoose.model('Book', BookSchema, 'Book'); 
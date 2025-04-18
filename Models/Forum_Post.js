import mongoose from "mongoose";

const ForumPostSchema = mongoose.Schema(
  {
    Genre: {
      type: String,
      required: true,
    },
    Book_Name: {
      type: String,
      required: true,
    },
    Rating: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    Review: { 
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Post = mongoose.model('Post', ForumPostSchema, 'Post');
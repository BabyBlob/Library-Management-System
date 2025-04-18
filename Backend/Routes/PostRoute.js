import express from 'express';
import { Post } from '../Models/Forum_Post.js';

const router = express.Router();

const isValidPostId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
};

router.get('/', async (request, response) => {
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        return response.status(200).json({
            status: 'success',
            count: posts.length,
            data: posts
        });
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        response.status(500).json({ 
            status: 'error',
            message: 'Server error while fetching posts' 
        });
    }
});

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        if (!isValidPostId(id)) {
            return response.status(400).json({ 
                status: 'error',
                message: 'Invalid post ID format' 
            });
        }

        const post = await Post.findById(id);

        if (!post) {
            return response.status(404).json({ 
                status: 'error',
                message: 'Post not found' 
            });
        }

        return response.status(200).json({
            status: 'success',
            data: post
        });

    } catch (error) {
        console.error('Error fetching post:', error.message);
        response.status(500).json({ 
            status: 'error',
            message: 'Server error while fetching post' 
        });
    }
});

router.post('/', async (request, response) => {
    try {
        const { Genre, Book_Name, Rating, username, Review } = request.body;

        if (!Genre || !Book_Name || !Rating || !username) {
            return response.status(400).json({
                status: 'error',
                message: 'All fields (Genre, Book_Name, Rating, username) are required'
            });
        }

        if (isNaN(Rating) || Rating < 1 || Rating > 5) {
            return response.status(400).json({
                status: 'error',
                message: 'Rating must be a number between 1 and 5'
            });
        }

        const newPost = await Post.create({
            Genre,
            Book_Name,
            Rating: Number(Rating),
            username,
            Review: Review || ""
        });

        return response.status(201).json({
            status: 'success',
            message: 'Post created successfully',
            data: newPost
        });

    } catch (error) {
        console.error('Error creating post:', error.message);
        
        if (error.name === 'ValidationError') {
            return response.status(400).json({
                status: 'error',
                message: error.message
            });
        }

        response.status(500).json({
            status: 'error',
            message: 'Server error while creating post'
        });
    }
});

router.put('/:id/review', async (request, response) => {
    try {
        const { id } = request.params;
        const { Review } = request.body;

        if (!isValidPostId(id)) {
            return response.status(400).json({ 
                status: 'error',
                message: 'Invalid post ID format' 
            });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { Review },
            { new: true }
        );

        if (!updatedPost) {
            return response.status(404).json({
                status: 'error',
                message: 'Post not found'
            });
        }

        return response.status(200).json({
            status: 'success',
            message: 'Review updated successfully',
            data: updatedPost
        });
    } catch (error) {
        console.error('Error updating review:', error.message);
        response.status(500).json({
            status: 'error',
            message: 'Server error while updating review'
        });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        if (!isValidPostId(id)) {
            return response.status(400).json({ 
                status: 'error',
                message: 'Invalid Formatting' 
            });
        }

        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return response.status(404).json({ 
                status: 'error',
                message: 'Post not found' 
            });
        }

        return response.status(200).json({
            status: 'success',
            message: 'Post deleted successfully',
            data: deletedPost
        });

    } catch (error) {
        console.error('Error deleting post:', error.message);
        response.status(500).json({ 
            status: 'error',
            message: 'Error whilst deleting post' 
        });
    }
});

export default router;
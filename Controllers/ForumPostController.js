import axios from 'axios';

const Url = 'http://localhost:5555';

export const FetchBooks = async () => {
  try {
    const response = await axios.get(`${Url}/Book`);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to load books. Check server connection.');
  }
};

export const FetchPosts = async () => {
  try {
    const response = await axios.get(`${Url}/posts`);
    return response.data?.data || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error(error.response?.data?.message || 'Failed to load forum posts.');
  }
};

export const CreatePost = async (postData) => {
  if (!postData.Genre || !postData.Book_Name || !postData.Rating || !postData.username) {
    throw new Error('All fields (Genre, Book Name, Rating, Username) are required');
  }

  if (postData.Rating < 1 || postData.Rating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }

  try {
    const response = await axios.post(`${Url}/posts`, postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error(error.response?.data?.message || 'Failed to create post');
  }
};

export const DeletePost = async (postId) => {
  try {
    await axios.delete(`${Url}/posts/${postId}`);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete post');
  }
};
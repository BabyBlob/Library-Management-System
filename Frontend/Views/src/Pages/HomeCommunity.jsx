import React, { useEffect, useState } from 'react';
import { FetchBooks, FetchPosts, CreatePost } from '../../../Controllers/ForumPostController.js';
import Spinner from '../components/Spinner';
import { MdInfoOutline } from 'react-icons/md';
import StarRatings from '../components/starRatings.jsx';
import Headerbar from '../components/headerbar_default.jsx';
import DesktopImage from '../assets/images/BackgroundImageLibraryBookSystem.jpg';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    Genre: '',
    Book_Name: '',
    Rating: null,
    username: '',
    Review: ''
  });
  const [search, setSearch] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [expandedPostId, setExpandedPostId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const username = user ? user.username : 'guest';
    setCurrentUser(username);
    setNewPost(prev => ({ ...prev, username }));

    setLoading(true);

    FetchBooks()
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setError(error.message);
      });

    loadPosts();
  }, []);

  const loadPosts = () => {
    setLoading(true);
    FetchPosts()
      .then((data) => {
        setPosts(data);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setError(error.message);
        setPosts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePostChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingChange = (rating) => {
    setNewPost({
      ...newPost,
      Rating: rating
    });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      await CreatePost({
        ...newPost,
        username: currentUser
      });
      loadPosts();

      setNewPost({
        Genre: '',
        Book_Name: '',
        Rating: null,
        username: currentUser,
        Review: ''
      });
      setShowPostForm(false);
    } catch (error) {
      console.error('Error creating post:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpandPost = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  const filteredPosts = posts.filter(post =>
    post?.Book_Name?.toLowerCase().includes(search.toLowerCase()) ||
    post?.Genre?.toLowerCase().includes(search.toLowerCase()) ||
    post?.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Headerbar />
      <div className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: `url(${DesktopImage})` }}>
        <div className="flex justify-center items-start pt-8 h-full">
          <div className="bg-[#CAC4CE] p-8 mx-14 rounded shadow-lg w-full max-w-6xl">
            <h1 className="text-3xl text-center mb-8">Community Forum</h1>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  id="post-search"
                  placeholder="Search posts..."
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={search}
                  onChange={(e) => setsearch(e.target.value)}
                />
              </div>
              <button
                onClick={() => setShowPostForm(!showPostForm)}
                className="inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 whitespace-nowrap h-[52px]"
              >
                <span className="relative px-5 h-full transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent flex items-center justify-center">
                  Create Post
                </span>
              </button>
            </div>
            <hr className="my-4 border-gray-300" />
            {error && (
              <div className='p-4 mb-4 bg-red-100 text-red-700 rounded'>
                {error}
              </div>
            )}
            {showPostForm && (
              <div className='mb-8 p-6 bg-gray-100 rounded-lg border border-gray-300'>
                <h2 className='text-2xl mb-4'>Create Post</h2>
                <form onSubmit={handlePostSubmit}>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                    <div>
                      <label className='block mb-2'>Genre</label>
                      <select
                        name='Genre'
                        value={newPost.Genre}
                        onChange={handlePostChange}
                        className='w-full p-2 border rounded' required>
                        <option value=''>Select a genre</option>
                        <option value='Action'>Action</option>
                        <option value='Adventure'>Adventure</option>
                        <option value='Comedy'>Comedy</option>
                        <option value='Drama'>Drama</option>
                        <option value='Fantasy'>Fantasy</option>
                        <option value='Horror'>Horror</option>
                        <option value='Mystery'>Mystery</option>
                        <option value='Romance'>Romance</option>
                        <option value='Sci-Fi'>Sci-Fi</option>
                        <option value='Thriller'>Thriller</option>
                      </select>
                    </div>
                    <div>
                      <label className='block mb-2'>Book Name *</label>
                      <input
                        type='text'
                        name='Book_Name'
                        value={newPost.Book_Name}
                        onChange={handlePostChange}
                        className='w-full p-2 border rounded'
                        required
                      />
                    </div>
                  </div>
                  <div className='mb-4'>
                    <label className='block mb-2'>Your Rating *</label>
                    <StarRatings
                      rating={newPost.Rating}
                      onRatingChange={handleRatingChange}
                    />
                  </div>
                  <div className='mb-4'>
                    <label className='block mb-2'>Your Review</label>
                    <textarea
                      name="Review"
                      value={newPost.Review}
                      onChange={handlePostChange}
                      className='w-full p-2 border rounded'
                      rows="3"
                    />
                  </div>
                  <div className='flex justify-end gap-2'>
                    <button
                      type='button'
                      onClick={() => {
                        setShowPostForm(false);
                        setNewPost({
                          Genre: '',
                          Book_Name: '',
                          Rating: null,
                          username: currentUser,
                          Review: ''
                        });
                        setError(null);
                      }}
                      className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:opacity-50"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Post'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : (
              <div className="overflow-x-auto">
                {filteredPosts.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">There are currently no posts {!showPostForm && 'Create one!'}</p>
                ) : (
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 border-b text-left">Book Name</th>
                        <th className="py-3 px-4 border-b text-left">Genre</th>
                        <th className="py-3 px-4 border-b text-left">Rating</th>
                        <th className="py-3 px-4 border-b text-left">Posted By</th>
                        <th className="py-3 px-4 border-b text-left">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPosts.map((post) => (
                        <React.Fragment key={post._id}>
                          <tr className="hover:bg-gray-50">
                            <td className="py-3 px-4 border-b">{post.Book_Name}</td>
                            <td className="py-3 px-4 border-b">{post.Genre}</td>
                            <td className="py-3 px-4 border-b">
                              <StarRatings
                                rating={post.Rating}
                                interactive={false}
                              />
                            </td>
                            <td className="py-3 px-4 border-b">{post.username}</td>
                            <td className="py-3 px-4 border-b">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => toggleExpandPost(post._id)}
                                  className="text-blue-500 hover:text-blue-700"
                                  title="View details"
                                >
                                  <MdInfoOutline className='text-xl' />
                                </button>
                              </div>
                            </td>
                          </tr>
                          {expandedPostId === post._id && (
                            <tr>
                              <td colSpan="5" className="px-4 py-3 bg-gray-50">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium mb-1">Date Posted</h4>
                                    <p>{new Date(post.createdAt).toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-1">Review</h4>
                                    {post.Review ? (
                                      <p>{post.Review}</p>
                                    ) : (
                                      <p className="text-gray-500">No review yet.</p>
                                    )}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
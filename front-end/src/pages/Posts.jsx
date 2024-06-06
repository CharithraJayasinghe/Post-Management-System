import React, { useState, useEffect } from 'react';
import api from '../api';
import PostCard from '../components/postCard';
import { Link } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/all-post')
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    api.delete(`/delete-post/${id}`)
      .then(() => setPosts(posts.filter(post => post._id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Link to="/create-post" className="bg-green-500 text-white px-4 py-2 rounded">Add Post</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(post => (
          <PostCard key={post._id} post={post} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
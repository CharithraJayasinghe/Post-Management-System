import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post, onDelete }) => {
  
  const backendUrl = "http://localhost:5000";

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-700">{post.description}</p>
      
      {post.image && <img src={`${backendUrl}/${post.image}`} alt={post.image} className="w-full h-64 object-cover mt-4" />}
      <div className="mt-4 flex justify-end space-x-2">
        <Link to={`/post/${post._id}`} className="text-blue-500">View Details</Link>
        <Link to={`/edit-post/${post._id}`} className="text-yellow-500">Edit</Link>
        <button onClick={() => onDelete(post._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </div>
    </div>
  );
};

export default PostCard;

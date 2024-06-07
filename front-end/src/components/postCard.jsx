import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const PostCard = ({ post, onDelete }) => {
  const backendUrl = import.meta.env.VITE_IMAGE_URL;

  return (
    <div className="bg-gray-200 shadow-md rounded-lg p-4 m-4 hover:bg-gray-400">
      <h2 className="text-xl font-bold">{post.title}</h2>

      <p className="text-gray-700">{post.description.slice(0, 50)}...</p>

      {post.image && (
        <img
          src={`${backendUrl}/${post.image}`}
          alt={post.image}
          className="w-full h-64 object-cover mt-4"
        />
      )}
      <div className="mt-4 flex justify-end space-x-8">
        <Link to={`/post/${post._id}`} className="text-blue-500">
          {" "}
          <FontAwesomeIcon icon={faEye} size="lg" />
        </Link>
        <Link to={`/edit-post/${post._id}`} className="text-yellow-500">
          <FontAwesomeIcon icon={faEdit} size="lg" />
        </Link>
        <button onClick={() => onDelete(post._id)} className="text-red-500">
          <FontAwesomeIcon icon={faTrashAlt} size="lg" />
        </button>
      </div>
    </div>
  );
};

export default PostCard;

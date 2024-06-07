import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const backendUrl = "http://localhost:5000";

  useEffect(() => {
    api
      .get(`/get-post/${id}`)
      .then((response) => setPost(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p>{post.description}</p>
      {post.image && (
        <img
          src={`${backendUrl}/${post.image}`}
          alt={post.image}
          className="mt-2 w-full h-64 object-cover"
        />
      )}
    </div>
  );
};

export default PostDetails;

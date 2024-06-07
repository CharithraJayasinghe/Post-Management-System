import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    api.get(`/get-post/${id}`)
      .then(response => {
        const { title, description, image } = response.data;
        setTitle(title);
        setDescription(description);
        setImage(image);
      })
      .catch(error => console.error(error));
  }, [id]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   api.put(`/update-post/${id}`, { title, description, image })
  //     .then(() => navigate('/posts'))
  //     .catch(error => console.error(error));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    api
      .post("/upload", formData)
      .then((response) => {
        console.log(response.data.filePath);
        const imagePath = response.data.filePath;
        return api.put(`update-post/${id}`, { title, description, imagePath });
      })
      .then(() => navigate("/posts"))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
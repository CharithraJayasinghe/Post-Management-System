import Post from "../models/postModel.js";

export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to get posts", error });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, description, imagePath } = req.body;

    if (!title || !description || !imagePath) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPost = new Post({ title, description, image: imagePath });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Failed to create post", error });
  }
};


export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, imagePath } = req.body;

    if (!title || !description || !imagePath) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, description, image: imagePath },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Failed to update post", error });
  }
};

// Get a post by ID
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to get post", error });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post", error });
  }
};

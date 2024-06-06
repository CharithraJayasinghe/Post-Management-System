import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Post from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Header />

      
      <Routes>
        <Route path="/" element={<Post />} />
        <Route path="/posts" element={<Post />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
        <Route path="/post/:id" element={<PostDetails />} />
        
      </Routes>
   

      
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchMyPosts() {
      try {
        const response = await axios.get(`http://localhost:9000/myposts/${userId}`);
        setPosts(response.data.posts);
      } catch (err) {
        console.error("Error fetching user's posts:", err.message);
        setError("Error fetching your posts. Please try again.");
      }
    }
    if (userId) fetchMyPosts();
  }, [userId]);

  // Handle Delete
  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`http://localhost:9000/deletepost/${postId}`);
        alert("Post deleted successfully!");
        setPosts(posts.filter((post) => post.id !== postId));
      } catch (error) {
        console.error("Error deleting post:", error.message);
      }
    }
  };

  return (
    <div>
      <nav className="navbar">
        <button className="btn1" onClick={() => navigate("/")}>Back</button>
        <h1>My Posts</h1>
        <button className="btn1" onClick={() => navigate("/addpost")}>Add Post</button>
      </nav>

      <div className="categories">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="card" key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <p>Date: {new Date(post.date).toLocaleDateString()}</p>
              <button onClick={() => navigate(`/editpost/${post.id}`)}>Edit</button>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
}

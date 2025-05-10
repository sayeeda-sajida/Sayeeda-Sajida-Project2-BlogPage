import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./styles.css";

export default function CategoryPage() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  // Fetch posts based on category
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(`http://localhost:9000/posts/${categoryId}`);
        setPosts(response.data.posts);
      } catch (err) {
        console.error("Error fetching posts:", err.message);
        setError("Error fetching posts. Please try again.");
      }
    }
    fetchPosts();
  }, [categoryId]);

  return (
    <div className="container">
      <nav style={{justifyContent:"center"}} className="navbar">
       
        <h1>{categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} Posts</h1>
      </nav>

      

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="posts">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="card">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <div>
                <p>Posted by: {post.username}</p>
                <p>Date: {new Date(post.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available in this category.</p>
        )}
      </div>
    <div className="button">  <button onClick={()=>navigate('/')}>Back</button></div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Fetch categories from the backend
    async function fetchCategories() {
      try {
        const response = await axios.get("http://localhost:9000/categories");
        setCategories(response.data.categories);
      } catch (err) {
        console.error("Error fetching categories:", err.message);
        setError("Failed to load categories.");
      }
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !selectedCategory) {
      setError("All fields are required.");
      return;
    }

    try {
      await axios.post("http://localhost:9000/addpost", {
        title,
        description,
        category_id: selectedCategory,
        user_id: userId,
      });

      navigate("/myposts");
    } catch (err) {
      console.error("Error adding post:", err.message);
      setError("Failed to add post. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Add New Post</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
}

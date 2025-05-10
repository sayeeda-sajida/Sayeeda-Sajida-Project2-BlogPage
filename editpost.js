import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";

export default function EditPost() {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================
  // 🚀 Fetch the post details to prefill the form
  // =====================================
  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await axios.get(`http://localhost:9000/post/${id}`);
        
        if (response.data) {
          setTitle(response.data.title);
          setDescription(response.data.description);
        } else {
          console.error("Post not found");
        }
      } catch (error) {
        console.error("Error fetching post details:", error.message);
      }
    }
    fetchPost();
  }, [id]);

  // =====================================
  // 🚀 Handle form submission to update the post
  // =====================================
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`http://localhost:9000/post/${id}`, {
        title,
        description,
      });

      alert("Post updated successfully!");
      navigate("/myposts"); // Redirect back to My Posts after update
    } catch (error) {
      console.error("Error updating post:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Edit Post</h2>

      <form onSubmit={handleUpdate}>
        <table className="edit-post-table">
          <tbody>
            <tr>
              <td>
                <label htmlFor="title">Title:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Edit Title"
                  required
                />
              </td>
            </tr>

            <tr>
              <td>
                <label htmlFor="description">Description:</label>
              </td>
              <td>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Edit Description"
                  rows="4"
                  required
                />
              </td>
            </tr>

            <tr>
              <td colSpan="2" style={{ textAlign: "center", paddingTop: "15px" }}>
                <button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Update Post"}
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => navigate("/myposts")}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

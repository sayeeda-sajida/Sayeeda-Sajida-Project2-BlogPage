import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './signIn.css';

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, password } = formData;

    // Validation
    if (!name || !password) {
      setError("Enter all fields");
    } else if (!isNaN(name)) {
      setError("Invalid Input! Name cannot be a number");
    } else if (name.length < 2) {
      setError("Name should contain at least three characters");
    } else if (password.length < 8) {
      setError("Password should contain at least eight characters");
    } else {
      setError("");
      try {
        const response = await fetch("http://localhost:9000/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, password }),
        });

        const data = await response.json();

        if (data.success) {
          // Save the user info in localStorage
          localStorage.setItem("userId", data.user.id);
          localStorage.setItem("username", data.user.username);

          // Navigate to the categories page
          navigate("/");
        } else {
          setError("Invalid credentials. Please try again.");
        }
      } catch (err) {
        console.error("Login failed:", err);
        setError("An error occurred while logging in.");
      }
    }
  };

  return (
    <div className="component">
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <table>
          <tbody>
            <tr>
              <td><label>User Name:</label></td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td><label>Password:</label></td>
              <td>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td colSpan={2} align="center">
                {error && <p style={{ color: "red" }}>{error}</p>}
              </td>
            </tr>

            <tr>
              <td>
                <button type="button" onClick={() => navigate("/")}>
                  Cancel
                </button>
              </td>
              <td>
                <button type="submit">Login</button>
              </td>
            </tr>

            <tr>
              <td align="center">
                <a href="/forgetpassword">Forgot password?</a>
              </td>
              <td>
                <a href="/signup">New User</a>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

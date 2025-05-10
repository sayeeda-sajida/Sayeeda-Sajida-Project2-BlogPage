import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Import axios for API requests

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    cpassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidEmail = (email) => {
    return email.includes("@") && email.includes(".");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, contact, password, cpassword } = formData;

    // Validation
    if (!name || !email || !contact || !password || !cpassword) {
      setError("Enter all fields");
    } else if (!isNaN(name)) {
      setError("Invalid Input! Name cannot be a number");
    } else if (name.length < 3) {
      setError("Name should contain at least three characters");
    } else if (!isValidEmail(email)) {
      setError("Invalid email format");
    } else if (!/^\d{10,}$/.test(contact)) {
      setError("Contact should be at least 10 digits and numeric");
    } else if (password.length < 8) {
      setError("Password should contain at least eight characters");
    } else if (password !== cpassword) {
      setError("Passwords do not match");
    } else {
      setError("");

      // API call to register user
      try {
        const response = await axios.post("http://localhost:9000/signup", {
          name,
          email,
          contact,
          password
        });
        if (response.status === 201) {
          navigate("/signin");  // Redirect to sign-in page after successful registration
        } else {
          setError("Sign up failed. Please try again.");
        }
      } catch (err) {
        console.error("Sign up failed:", err);
        setError("An error occurred while signing up.");
      }
    }
  };

  return (
    <div className="component">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
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
              <td><label>E-Mail :</label></td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td><label>Contact:</label></td>
              <td>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
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
              <td><label>Confirm Password:</label></td>
              <td>
                <input
                  type="password"
                  name="cpassword"
                  value={formData.cpassword}
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
                <button type="submit">Sign Up</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

import express from 'express';
import cors from 'cors';
import db from './db.js';

const blogapp = express();
blogapp.use(cors());
blogapp.use(express.json());

// =====================================
// 🚀 Register Route
// =====================================
blogapp.post("/signup", (req, res) => {
  const { name, email, password, contact } = req.body;

  const query = `INSERT INTO Users (username, email, password, contact) VALUES (?, ?, ?, ?)`;

  db.query(query, [name, email, password, contact], (err, result) => {
    if (err) {
      console.error("Registration Error:", err.message);
      res.status(500).json({ error: "Registration failed. Try again." });
    } else {
      res.status(201).json({ message: "User registered successfully!" });
    }
  });
});

// =====================================
// 🚀 Sign-in Route
// =====================================
blogapp.post("/signin", (req, res) => {
  const { name, password } = req.body;

  const query = 'SELECT * FROM Users WHERE username = ?';
  db.query(query, [name], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error." });
    if (result.length === 0) return res.status(401).json({ error: "User not found." });

    const user = result[0];

    if (user.password === password) {
      return res.status(200).json({
        success: true,
        message: "Login successful.",
        user: { id: user.id, username: user.username }
      });
    } else {
      return res.status(401).json({ error: "Invalid credentials." });
    }
  });
});

// =====================================
// 🚀 Get Posts by Category
// =====================================
blogapp.get('/posts/:categoryId', (req, res) => {
  const { categoryId } = req.params;

  const categoryMapping = {
    travel: 1,
    cooking: 2,
    shopping: 3,
    fitness: 4,
    parenting: 5,
    craft: 6,
  };

  const category_id = categoryMapping[categoryId];

  if (!category_id) {
    return res.status(400).json({ error: "Invalid category." });
  }

  const query = `
    SELECT Posts.id, Posts.title, Posts.description, Posts.date, Users.username 
    FROM Posts 
    JOIN Users ON Posts.user_id = Users.id 
    WHERE category_id = ?
  `;

  db.query(query, [category_id], (err, result) => {
    if (err) {
      console.error("Error fetching posts:", err.message);
      return res.status(500).json({ error: "Error fetching posts." });
    }
    return res.status(200).json({ posts: result });
  });
});

// =====================================
// 🚀 Get User's Posts
// =====================================
blogapp.get('/myposts/:userId', (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT id, title, description, date, category_id 
    FROM Posts 
    WHERE user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user's posts:", err.message);
      return res.status(500).json({ error: "Error fetching posts." });
    }
    return res.status(200).json({ posts: results });
  });
});

// =====================================
// 🚀 Get All Categories
// =====================================
blogapp.get('/categories', (req, res) => {
  const query = "SELECT id, name FROM Categories";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching categories:", err.message);
      res.status(500).json({ error: "Error fetching categories." });
    } else {
      res.status(200).json({ categories: result });
    }
  });
});

// =====================================
// 🚀 Add New Post
// =====================================
blogapp.post('/addpost', (req, res) => {
  const { title, description, category_id, user_id } = req.body;

  const query = `INSERT INTO Posts (title, description, category_id, user_id) VALUES (?, ?, ?, ?)`;
  db.query(query, [title, description, category_id, user_id], (err, result) => {
    if (err) {
      console.error("Error adding post:", err.message);
      res.status(500).json({ error: "Error adding post." });
    } else {
      res.status(201).json({ message: "Post added successfully!" });
    }
  });
});

// =====================================
// 🚀 Get Single Post (Edit Page Prefill)
// =====================================
blogapp.get('/post/:id', (req, res) => {
  const { id } = req.params;

  const query = `SELECT id, title, description FROM Posts WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error fetching post:", err.message);
      return res.status(500).json({ error: "Error fetching post." });
    }
    
    if (result.length > 0) {
      res.status(200).json(result[0]); // Return the first object
    } else {
      res.status(404).json({ error: "Post not found." });
    }
  });
});


// =====================================
// 🚀 Update Post
// =====================================
blogapp.put('/post/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const query = `UPDATE Posts SET title = ?, description = ? WHERE id = ?`;
  db.query(query, [title, description, id], (err, result) => {
    if (err) {
      console.error("Error updating post:", err.message);
      return res.status(500).json({ error: "Error updating post." });
    }
    
    res.status(200).json({ message: "Post updated successfully" });
  });
});


// =====================================
// 🚀 Delete Post
// =====================================
blogapp.delete('/deletepost/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM Posts WHERE id = ?`;

  db.query(query, [id], (err) => {
    if (err) {
      console.error("Error deleting post:", err.message);
      res.status(500).json({ error: "Error deleting post." });
    } else {
      res.status(200).json({ message: "Post deleted successfully!" });
    }
  });
});

// =====================================
// 🌐 Start the Server
// =====================================
blogapp.listen(9000, () => {
  console.log("Server running on http://localhost:9000");
});

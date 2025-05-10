import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const categories = [
  { id: "travel", title: "Travel Adventures", image: require("./images/travel.png") },
  { id: "cooking", title: "Cooking Delights", image: require("./images/cooking.png") },
  { id: "shopping", title: "Shopping Trends", image: require("./images/shopping.png") },
  { id: "fitness", title: "Fitness Guide", image: require("./images/fitness.png") },
  { id: "parenting", title: "Parenting Tips", image: require("./images/parenting.png") },
  { id: "craft", title: "Creative Crafts", image: require("./images/craft.png") },
];

export default function Homepage1() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("userId");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="container">
      <nav className="navbar">
        <img src="./../blog1.png" height={50} width={50} alt="logo" />
        <h1>Happy Blogging!!!</h1>
        <div className="nav-buttons">
          {isLoggedIn ? (
            <>
              <button onClick={() => navigate("/myposts")}>My Posts</button>
              <button onClick={handleSignOut}>Sign Out</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/signin")}>Sign In</button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={() => navigate("/signup")}>Sign Up</button>
            </>
          )}
        </div>
      </nav>

      <div className="categories">
        {categories.map((category) => (
          <button
            key={category.id}
            className="card"
            onClick={() => navigate(`/category/${category.id}`)}
          >
            <img src={category.image} className="blog-image" alt={category.title} />
            <h2>{category.title}</h2>
          </button>
        ))}
      </div>
    </div>
  );
}

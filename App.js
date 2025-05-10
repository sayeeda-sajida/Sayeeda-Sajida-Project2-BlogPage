import { Routes, Route } from "react-router-dom";
import MyPosts from "./myposts";
import SignIn from "./signin";
import SignUp from "./signup";
import ForgetPassword from "./forgetpassword";
import Homepage1 from "./homepage";
import CategoryPage from "./categoryBlog";
import AddPost from "./addposts";
import EditPost from "./editpost";

function App() {
  return (
    <Routes>
      <Route path="/myposts" element={<MyPosts />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/" element={<Homepage1 />} />
      <Route path="/addpost" element={<AddPost />} />
      <Route path="/editpost/:id" element={<EditPost />} /> 
      <Route path="/category/:categoryId" element={<CategoryPage />} />
    </Routes>
  );
}

export default App;

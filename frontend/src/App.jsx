import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import CreatePosts from "./pages/CreatePosts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";
import { ToastContainer } from "react-toastify";
import Category from "./pages/Category";
import Profile from "./pages/Profile";
import UsersTable from "./pages/UsersTable";
import PostsTable from "./pages/PostsTable";
import CategoriesTable from "./pages/CategoriesTable";
import CommentsTable from "./pages/CommentsTable";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/categories/:category" element={<Category />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route
          path="/create-post"
          element={user ? <CreatePosts /> : <Navigate to={"/"} />}
        />
        <Route
          path="/admin-dashboard"
          element={user?.isAdmin ? <AdminDashboard /> : <Navigate to={"/"} />}
        />
        <Route
          path="/admin-dashboard/users-table"
          element={user?.isAdmin ? <UsersTable /> : <Navigate to={"/"} />}
        />
        <Route
          path="/admin-dashboard/posts-table"
          element={user?.isAdmin ? <PostsTable /> : <Navigate to={"/"} />}
        />
        <Route
          path="/admin-dashboard/comments-table"
          element={user?.isAdmin ? <CommentsTable /> : <Navigate to={"/"} />}
        />
        <Route
          path="/admin-dashboard/categories-table"
          element={user?.isAdmin ? <CategoriesTable /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to={"/"} />}
        />
        <Route
          path="/users/:userId/verify/:token"
          element={!user ? <VerifyEmail /> : <Navigate to={"/"} />}
        />
        <Route
          path="/reset-password/:userId/:token"
          element={!user ? <ResetPassword /> : <Navigate to={"/"} />}
        />
        <Route
          path="/forgot-password"
          element={!user ? <ForgotPassword /> : <Navigate to={"/"} />}
        />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

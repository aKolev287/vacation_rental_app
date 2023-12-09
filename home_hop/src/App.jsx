import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProfilePage from "./pages/ProfilePage";
import EditProfile from "./pages/EditProfile";
import UserPage from "./pages/UserPage";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import Footer from "./components/Footer";
import EditPost from "./pages/EditPost";
import FilteredPostsPage from "./pages/FilteredPostsPage";
import Terms from "./pages/Terms";
import Page404 from "./pages/Page404";
import About from "./pages/About";
import Reservations from "./pages/Reservations";
function App() {
  return (
    <>
      <Router>
        <NavBar />
        <div className="flex flex-col h-screen justify-between">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/filtered_posts" element={<FilteredPostsPage />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile_edit" element={<EditProfile />} />
            <Route path="/profile/:username" element={<UserPage />} />
            <Route path="/create_offer" element={<CreatePost />} />
            <Route path="/rooms/:id" element={<PostDetails />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Page404 />} />
            <Route path="/reservation/:username" element={<Reservations />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;

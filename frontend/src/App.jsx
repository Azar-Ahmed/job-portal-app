import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Dashboard from './pages/Dashboard'
import PostApplication from './pages/PostApplication'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import NotFound from './pages/NotFound'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getUser } from "./redux/slices/userSlice";
import { useEffect } from 'react'
function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/post/application/:jobId"
            element={<PostApplication />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-right" theme="dark" />
      </Router>
    </>
  )
}

export default App

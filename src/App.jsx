import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobDetails from "./pages/JobDetails";
import PostJob from "./pages/PostJob";
import { AppProvider } from "./context/AppContext";
import "./styles/global.css";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import MyJobs from "./pages/MyJobs";
import Profile from "./pages/Profile";
import ApplicantDetails from "./components/ApplicantDetails";

function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/jobs" element={<MyJobs />} />
          <Route path="/applicant/:id" element={<ApplicantDetails />} />
        </Routes>
      </Router>
      {/* <Footer /> */}
    </AppProvider>
  );
}

export default App;

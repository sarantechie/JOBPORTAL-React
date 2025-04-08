import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import JobDetails from "./pages/JobDetails/JobDetails";
import PostJob from "./pages/PostJob/PostJob";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
import MyJobs from "./pages/MyJobs";
import Profile from "./pages/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Jobs from "./pages/Jobs/Jobs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import ApplicantDetailsPage from "./pages/ApplicationsDetailsPage/ApplicationsDetailsPage";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/my-jobs" element={<MyJobs />} />
            <Route path="/applications/:jobId/:applicationId" element={<ApplicantDetailsPage  />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Footer />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;

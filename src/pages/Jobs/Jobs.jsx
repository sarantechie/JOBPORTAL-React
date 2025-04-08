import { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import JobCard from "../../components/JobCard/JobCard"; 
import "../Home/Home.css";

function Jobs() {
//   const jobs = [
//     {
//         id: 1,
//         title: "Frontend Developer",
//         company: "TechCorp",
//         location: "Remote",
//         type: "Full-time",
//         salary: "$80,000 - $100,000",
//         posted: "2 days ago"
//     },
//     {
//         id: 2,
//         title: "Backend Developer",
//         company: "InnovateX",
//         location: "New York, NY",
//         type: "Full-time",
//         salary: "$90,000 - $110,000",
//         posted: "5 days ago"
//     },
//     {
//         id: 3,
//         title: "Full Stack Developer",
//         company: "DevSolutions",
//         location: "San Francisco, CA",
//         type: "Contract",
//         salary: "$100,000 - $120,000",
//         posted: "1 week ago"
//     },
//     {
//         id: 4,
//         title: "UI/UX Designer",
//         company: "DesignHub",
//         location: "Remote",
//         type: "Part-time",
//         salary: "$60,000 - $80,000",
//         posted: "3 days ago"
//     },
//     {
//         id: 5,
//         title: "Data Scientist",
//         company: "DataWorks",
//         location: "Boston, MA",
//         type: "Full-time",
//         salary: "$110,000 - $130,000",
//         posted: "2 weeks ago"
//     },
//     {
//         id: 6,
//         title: "DevOps Engineer",
//         company: "CloudNet",
//         location: "Seattle, WA",
//         type: "Full-time",
//         salary: "$105,000 - $125,000",
//         posted: "4 days ago"
//     },
//     {
//         id: 7,
//         title: "Software Engineer",
//         company: "CodeLab",
//         location: "Austin, TX",
//         type: "Full-time",
//         salary: "$95,000 - $115,000",
//         posted: "1 week ago"
//     },
//     {
//         id: 8,
//         title: "Cybersecurity Analyst",
//         company: "SecureIT",
//         location: "Washington, D.C.",
//         type: "Full-time",
//         salary: "$85,000 - $105,000",
//         posted: "6 days ago"
//     },
//     {
//         id: 9,
//         title: "Machine Learning Engineer",
//         company: "AI Innovations",
//         location: "Remote",
//         type: "Contract",
//         salary: "$120,000 - $140,000",
//         posted: "1 day ago"
//     },
//     {
//         id: 10,
//         title: "Data Scientist",
//         company: "DataWorks",
//         location: "Boston, MA",
//         type: "Full-time",
//         salary: "$110,000 - $130,000",
//         posted: "2 weeks ago"
//     },
// ];


  const { jobs, fetchJobs } = useContext(AppContext);
  useEffect(() => {
    fetchJobs();
  }, []);

  if (!jobs) return <p>Loading...</p>
  return (
//     <div className="home-container">
//       <h1>Job Listings</h1>
//       <div className="job-list">
//         {jobs?.map((job) => (
//           <JobCard key={job._id} job={job} />
//         ))}
//       </div>
//     </div>
//   );
// }

<section className="job-listings">
<div className="container">
  <div className="section-header">
    <h2>All Jobs</h2>
  </div>
  
  <div className="jobs-grid">
    {jobs.length === 0 && <p>No jobs available</p>}
    {jobs.map((job,index) => (
      <JobCard key={job._id} job={job} index={index} />
    ))}
  </div>
</div>
</section>
);
};

export default Jobs;

import { useContext, useEffect, useState } from "react";
import { fetchJobApplications, fetchMyPostedJobs } from "../../../services/api";
import AppContext from "../../../context/AppContext";
import "./EmployerJobs.css";
import { useNavigate } from "react-router-dom";

const EmployerJobs = () => {
  const { user, token } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(2);
  const [visibleJobs, setVisibleJobs] = useState({});
  const navigate = useNavigate();

  const handleAddJob = () => {
    navigate("/post-job");
  };

  const navigateToJobDetails = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const res = await fetchMyPostedJobs();
      setJobs(res.data);
      ("Posted jobs:", res.data);

      
      // const visibilityState = {};
      // res.data.forEach(job => {
      //   visibilityState[job._id] = job.visible || false;
      // });
      // setVisibleJobs(visibilityState);

      setLoading(false);
    };
    if (user?.role === "employer") {
      fetchJobs();
    }
  }, [user, token]);

  const toggleVisibility = (jobId) => {
    setVisibleJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
    // Here you would also call an API to update visibility in the backend
  };

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  if (loading)
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading your applications...</p>
      </div>
    );

  return (
    <div className="employer-jobs-container">
      <div className="header-section">
        <h2>Posted Jobs</h2>
        <button className="add-job-btn" onClick={handleAddJob}>
          Add new job
        </button>
      </div>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <>
          <div className="table-container">
            <table className="jobs-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Emp Type</th>
                  <th>Exp Level</th>
                  <th>Posted on</th>
                  <th>Location</th>
                  {/* <th>Application Deadline</th> */}
                  {/* <th>Visible</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentJobs.map((job) => {
                  return (
                    <tr
                      key={job._id}
                     
                    >
                      <td>{job.title}</td>
                      <td>{job.employmentType}</td>
                      <td>{job.experienceLevel}</td>
                      <td>
                        {new Date(job.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td>{job.location}</td>
                      {/* <td>
                        {" "}
                        {new Date(job.applicationDeadline).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </td> */}
                      {/* <td>{job.applicants?.length || 0}</td> */}
                      {/* <td>{noOfApplicants}</td> */}
                      {/* <td>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={visibleJobs[job._id] || false}
                          onChange={() => toggleVisibility(job._id)}
                        />
                        <span className="slider"></span>
                      </label>
                    </td> */}
                      <td>
                        <button
                          className="action-btn view-btn"
                          onClick={() => navigateToJobDetails(job._id)}
                        >
                          View
                        </button>
                        {/* <button className="action-btn edit-btn">Edit</button> */}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployerJobs;

import { Link, useNavigate } from "react-router-dom";
import "./JobCard.css";
import { formatDistanceToNow } from "date-fns";

function JobCard({ job, showDate = false, index }) {
  const navigate = useNavigate();

  const navigateToJobs = () => {
    navigate(`/job/${job._id}`);
  };

  const postedDate = job?.createdAt
    ? formatDistanceToNow(new Date(job.createdAt), {
        addSuffix: true,
      })
    : job.posted;

  return (
    <div key={job._id} className="job-card">
      <div className="job-header">
        <div className="company-logo">
          {job.logo ? (
            <img src={job.logo} alt={job.companyName?.charAt(0)} />
          ) : (
            <div className="logo-placeholder">{job.companyName?.charAt(0)}</div>
          )}
        </div>
        <div className="job-title-wrapper">
          <h3>{job.title}</h3>
          <div className="company-info">
            <p className="company">{job.companyName}</p>
            {job.remote && <span className="remote-badge">Remote</span>}
          </div>
        </div>
      </div>

      <div className="job-details">
        <div className="detail-row">
          <span className="detail-item">
            <i className="fas fa-map-marker-alt"></i> {job.location}
          </span>
          <span className="detail-item">
            <i className="fas fa-briefcase"></i> {job.employmentType}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-item">
            <i className="fas fa-money-bill-wave"></i> ₹{job.minSalary} - ₹
            {job.maxSalary}
          </span>
          <span className="detail-item">
            <i className="fas fa-user-tie"></i> {job.minExperience}-
            {job.maxExperience} yrs
          </span>
        </div>
      </div>

      <div className="job-footer">
        <div className="meta-info">
          {job.skills?.length > 0 && (
            <div className="skill-tags">
              {job.skills.slice(0, 3).map((skill, i) => (
                <span key={i} className="skill-tag">
                  {skill}
                </span>
              ))}
              {job.skills.length > 3 && (
                <span className="skill-tag">+{job.skills.length - 3}</span>
              )}
            </div>
          )}
          <span className="posted">
            <i className="far fa-clock"></i> {postedDate}
          </span>
        </div>
        <button className="view-btn" onClick={() => navigateToJobs(job._id)}>
          View Details <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}

export default JobCard;

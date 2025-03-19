import { Link } from "react-router-dom";
import "../styles/JobCard.css";
import { formatDistanceToNow } from "date-fns";

function JobCard({ job ,showDate = false }) {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p className="location">{job.location}</p>
      {showDate && job.createdAt && (
        <p className="posted-date">
          Posted {formatDistanceToNow(new Date(job.createdAt))} ago
        </p>
      )}
      <Link to={`/job/${job._id}`} className="view-details">
        View Details
      </Link>
    </div>
  );
}

export default JobCard;

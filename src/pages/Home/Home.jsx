import React from 'react';
import './Home.css';
import JobListings from '../JobListing/JobListing';

const Home = () => {
  const companies = ["Spotify", "Slack", "Adobe", "Osona", "Linear"];
  return (
    <div className="job-portal-home">
      {/* Hero Section */}
      <header className="hero">
        <div className="container">
          <h1>Find Your Dream Job Today!</h1>
          <p className="tagline">Connecting Talent with Opportunity: Your Gateway to Career Success</p>
          
          {/* Search Box */}
          <div className="search-box">
            <div className="search-row">
              <input type="text" placeholder="Job Title or Company" />
              <select defaultValue="">
                <option value="" disabled>Select Location</option>
                <option value="new-york">New York</option>
                <option value="london">London</option>
                <option value="tokyo">Tokyo</option>
              </select>
              <select defaultValue="">
                <option value="" disabled>Select Category</option>
                <option value="it">IT & Software</option>
                <option value="marketing">Marketing</option>
                <option value="finance">Finance</option>
              </select>
            </div>
            <button className="search-btn">Search Job</button>
          </div>
          
          {/* Stats */}
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">25K+</span>
              <span className="stat-label">Jobs Posted</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Candidates</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">18K+</span>
              <span className="stat-label">Companies</span>
            </div>
          </div>
        </div>
      </header>
      <JobListings/>
      
      {/* Companies Section */}
      <section className="companies">
        <div className="container">
          <h2>Top Companies Hiring</h2>
          <div className="company-logos">
            {companies.map((company, index) => (
              <div key={index} className="logo">{company}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
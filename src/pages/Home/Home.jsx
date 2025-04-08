import React from 'react';
import './Home.css';
import JobListings from '../JobListing/JobListing';

const Home = () => {
  const companies = ["Spotify", "Slack", "Adobe", "Osona", "Linear"];
  return (
    <div className="job-portal-home">
      <header className="hero">
        <div className="container">
          <h1>Find Your Dream Job Today!</h1>
          <p className="tagline">Connecting Talent with Opportunity: Your Gateway to Career Success</p>
        </div>
      </header>
      <JobListings/>
      
      
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
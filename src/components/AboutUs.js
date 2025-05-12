
import React from "react";
import '../styles.css';

  import PageTemplate, { 
    AnimatedHeading, 
    AnimatedParagraph, 
    AnimatedButton, 
    AnimatedContainer ,
    AnimatedAnchor,
    AnimatedMap,
    AnimatedImage,
    AnimatedList,
    AnimatedListItem,
    AnimatedGroup
  } from './PageTemplate';
const developers = [
  {
    name: "Ken Robert Noleal",
    role: "Project Lead",
    image: "./images/Noleal.jpg",
  },
  {
    name: "Elay Angel Marie Tandingan",
    role: "System Analyst",
    image: "./images/Tandingan.jpg",
  },
  {
    name: "Cj Napoles",
    role: "Backend Developer",
    image: `./images/Napoles.jpg`,
  },
  {
    name: "Hans Matthew De Guzman",
    role: "Frontend Developer",
    image: "./images/DeGuzman.jpg",
  },
];

const AboutUs = () => {
  return (
       <PageTemplate className="about-us-page">
        <AnimatedGroup 
        className="my-12 space-y-6 bg-gray-50 p-6 rounded-lg shadow-md"
        baseDelay={0.2}  // Start delay (seconds)
        delayIncrement={0.15}  // Each child adds this much delay
      >
    <div className="about-wrapper">
      {/* Header */}
      <header className="top-header">
         <AnimatedHeading className="site-logo">Ski-Folio</AnimatedHeading>
        <div className="action-btns">
          <a href="/" className="buttonHome">Home</a>
        </div>
      </header>

      {/* System Description */}
      <section className="about-content">
        <AnimatedHeading className="about-title">About Ski-Folio</AnimatedHeading>
        <AnimatedParagraph delay={0.3} className="about-description">
          Ski-Folio is a personalized job matching and portfolio platform designed to connect applicants with employers in a simple and efficient way. 
          Applicants can showcase their skills, create digital portfolios, and apply for jobs posted by businesses. 
          Meanwhile, employers can post job openings and find ideal candidates that match their needs.
        </AnimatedParagraph>

        {/* Developer Section */}
        <AnimatedHeading className="about-title" style={{ marginTop: "50px" }}>Meet the Developers</AnimatedHeading>
        <div className="dev-cards-container">
          {developers.map((dev, index) => (
            <div className="dev-card" key={index}>
              <AnimatedImage src={dev.image} alt={dev.name} className="dev-image" />
             <AnimatedHeading className="dev-name">{dev.name}</AnimatedHeading>
              <p className="dev-role">{dev.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="homepage-footer">
        Â© {new Date().getFullYear()} Ski-Folio. All rights reserved.
      </footer>
    </div>
    </AnimatedGroup>
    </PageTemplate>
  );
};

export default AboutUs;
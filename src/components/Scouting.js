import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "../styles.css";
import PageTemplate, { 
  AnimatedHeading, 
  AnimatedParagraph, 
  AnimatedButton, 
  AnimatedContainer,
  AnimatedAnchor,
  AnimatedMap,
  AnimatedImage,
  AnimatedList,
  AnimatedListItem,
  AnimatedGroup
} from './PageTemplate';

const jobOptions = [
  "Front-end Developer", "Back-end Developer", "Full Stack Developer",
  "React Developer", "Vue.js Developer", "Angular Developer",
  "Node.js Developer", "Django Developer", "Laravel Developer",
  "Express.js Developer", "JavaScript Engineer", "TypeScript Developer",
  "Next.js Developer", "Nuxt.js Developer", "API Developer"
];

// Example: relevant jobs for "relevancy" filter
const relevantJobs = [
  "Front-end Developer", "Back-end Developer", "React Developer", "Node.js Developer", "JavaScript Engineer"
];


const Scouting = () => {
  const [scoutVisibility, setScoutVisibility] = useState(false);
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterMode, setFilterMode] = useState("absolute"); // "absolute" or "relevancy"

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchScoutingStatus(user.uid);
      } else {
        console.log("No user signed in.");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchScoutingStatus = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "applicants", uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setScoutVisibility(data.scoutVisibility || false);
        setExperience(data.experience || "");
        setSkills(data.skills || {});
      }
    } catch (error) {
      console.error("Error fetching scouting status:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleScoutVisibility = async () => {
    if (!auth.currentUser) return;
    const newVisibility = !scoutVisibility;
    setScoutVisibility(newVisibility);

    try {
      await updateDoc(doc(db, "applicants", auth.currentUser.uid), { scoutVisibility: newVisibility });
    } catch (error) {
      console.error("Error updating scout visibility:", error);
    }
  };

  const handleExperienceChange = async (value) => {
    if (!auth.currentUser) return;
    setExperience(value);

    try {
      await updateDoc(doc(db, "applicants", auth.currentUser.uid), { experience: value });
    } catch (error) {
      console.error("Error updating experience:", error);
    }
  };

  const toggleSkillSelection = async (job) => {
    if (!auth.currentUser) return;
    const updatedSkills = { ...skills };

    if (updatedSkills[job]) {
      delete updatedSkills[job]; // Uncheck
    } else {
      updatedSkills[job] = true; // Check
    }

    setSkills(updatedSkills);

    try {
      await updateDoc(doc(db, "applicants", auth.currentUser.uid), { skills: updatedSkills });
    } catch (error) {
      console.error("Error updating skills:", error);
    }
  };

  const getDisplayedJobs = () => {
    return filterMode === "relevancy" ? relevantJobs : jobOptions;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-80vh">
        <div className="spinner"></div> {/* Add a spinner class in CSS */}
      </div>
    );
  }

  return (
   <AnimatedGroup 
    className="sc-talent-main-container my-6 md:my-12 space-y-4 md:space-y-6 rounded-lg shadow-md"
    baseDelay={0.2}
    delayIncrement={0.15}
  >
    <div className="sc-talent-content">
      <h2 className="sc-talent-title">Scouting Visibility</h2>

      <div className="sc-talent-toggle-container">
        <div className="sc-talent-toggle-wrapper">
          <input
            type="checkbox"
            id="sc_talent_checkbox"
            className="sc-talent-checkbox"
            checked={scoutVisibility}
            onChange={toggleScoutVisibility}
          />
          <label htmlFor="sc_talent_checkbox" className="sc-talent-toggle-switch"></label>
        </div>

        <div className="sc-talent-status-message">
          <p className="sc-talent-status-text">
            {scoutVisibility ? "You are visible to employers." : "You are hidden from employers."}
          </p>
        </div>
      </div>

      {scoutVisibility && (
        <div className="sc-talent-options-panel">
          <h3 className="sc-talent-section-title">Experience Level</h3>
          <div className="sc-talent-experience-buttons">
            <button
              className={`sc-talent-exp-btn ${experience === "No experience" ? "sc-talent-active" : ""}`}
              onClick={() => handleExperienceChange("No experience")}
            >
              No Experience
            </button>

            <button
              className={`sc-talent-exp-btn ${experience === "Have job experience" ? "sc-talent-active" : ""}`}
              onClick={() => handleExperienceChange("Have job experience")}
            >
              Have Job Experience
            </button>
          </div>

          <h3 className="sc-talent-section-title">Preferred Job Roles</h3>
          <div className="sc-talent-job-grid">
            {getDisplayedJobs().map((job) => (
              <div
                key={job}
                onClick={() => toggleSkillSelection(job)}
                className={`sc-talent-job-item ${skills[job] ? "sc-talent-selected" : ""}`}
              >
                {job}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

    <style jsx>{`
      .sc-talent-main-container {
        background-color: transparent;
        padding: 1rem;
        border: none;
      }
      
      .sc-talent-content {
        padding: 1rem;
        text-align: center;
      }
      
      .sc-talent-title {
        color: #1e293b;
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        animation: fadeIn 0.6s ease-in-out;
        position: relative;
        display: inline-block;
      }
      
      .sc-talent-title:after {
        content: "";
        position: absolute;
        width: 40px;
        height: 3px;
        background: linear-gradient(90deg, #3b82f6, #06b6d4);
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 2px;
      }
      
      .sc-talent-toggle-container {
        margin-bottom: 1.5rem;
      }
      
      .sc-talent-toggle-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1rem;
      }
      
      .sc-talent-checkbox {
        position: absolute;
        opacity: 0;
        height: 0;
        width: 0;
      }
      
      .sc-talent-toggle-switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
        background-color: rgba(203, 213, 225, 0.6);
        border-radius: 34px;
        transition: 0.4s;
        cursor: pointer;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      .sc-talent-toggle-switch:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        border-radius: 50%;
        transition: 0.4s;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      }
      
      .sc-talent-checkbox:checked + .sc-talent-toggle-switch {
        background: linear-gradient(45deg, #3b82f6, #06b6d4);
      }
      
      .sc-talent-checkbox:checked + .sc-talent-toggle-switch:before {
        transform: translateX(26px);
        box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
      }
      
      .sc-talent-status-message {
        display: flex;
        justify-content: center;
        margin-top: 0.75rem;
      }
      
      .sc-talent-status-text {
        font-size: 1rem;
        font-weight: 600;
        color: #0f172a;
        margin: 0;
        transition: color 0.3s ease;
        text-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);
      }
      
      .sc-talent-checkbox:checked ~ .sc-talent-status-message .sc-talent-status-text {
        background: linear-gradient(90deg, #3b82f6, #06b6d4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: subtlePulse 1s ease-in-out;
      }
      
      .sc-talent-options-panel {
        max-width: 100%;
        margin: 1.5rem auto 0;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        padding: 1.25rem;
        border-radius: 1rem;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.2);
        animation: slideUp 0.5s ease-out;
      }
      
      .sc-talent-section-title {
        margin-bottom: 1rem;
        color: #1e293b;
        font-size: 1.125rem;
        font-weight: 600;
        position: relative;
        display: inline-block;
        letter-spacing: 0.5px;
      }
      
      .sc-talent-section-title:after {
        content: "";
        position: absolute;
        width: 30px;
        height: 2px;
        background: linear-gradient(90deg, #3b82f6, #06b6d4);
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 2px;
      }
      
      .sc-talent-experience-buttons {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
      }
      
      .sc-talent-exp-btn {
        padding: 0.75rem 1.5rem;
        border-radius: 0.75rem;
        border: 1px solid rgba(59, 130, 246, 0.3);
        background: rgba(255, 255, 255, 0.7);
        color: #3b82f6;
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 600;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      }
      
      .sc-talent-exp-btn:hover {
        background: rgba(255, 255, 255, 0.9);
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(59, 130, 246, 0.15);
      }
      
      .sc-talent-exp-btn.sc-talent-active {
        background: linear-gradient(45deg, #3b82f6, #06b6d4);
        color: #fff;
        border: 1px solid transparent;
      }
      
      .sc-talent-job-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.75rem;
      }
      
      .sc-talent-job-item {
        padding: 0.75rem;
        border: 1px solid rgba(226, 232, 240, 0.6);
        border-radius: 0.75rem;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.6);
        font-weight: 500;
        text-align: center;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
        backdrop-filter: blur(5px);
        font-size: 0.875rem;
      }
      
      .sc-talent-job-item:hover {
        border-color: rgba(59, 130, 246, 0.3);
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(59, 130, 246, 0.1);
        background: rgba(255, 255, 255, 0.8);
      }
      
      .sc-talent-job-item.sc-talent-selected {
        background: linear-gradient(45deg, #3b82f6, #06b6d4);
        color: #fff;
        border-color: transparent;
        box-shadow: 0 6px 15px rgba(59, 130, 246, 0.2);
      }
      
      @keyframes fadeIn {
        0% { 
          opacity: 0;
          transform: translateY(-10px);
        }
        100% { 
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes slideUp {
        0% { 
          opacity: 0;
          transform: translateY(20px);
          filter: blur(5px);
        }
        100% { 
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
      }
      
      /* Add subtle pulse animation for toggle */
      @keyframes subtlePulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      
      /* Small screen styles */
      @media (min-width: 480px) {
        .sc-talent-main-container {
          padding: 2rem;
        }
        
        .sc-talent-content {
          padding: 1.25rem;
        }
        
        .sc-talent-job-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      
      /* Medium screen styles */
      @media (min-width: 768px) {
        .sc-talent-main-container {
          padding: 3rem;
        }
        
        .sc-talent-content {
          padding: 1.5rem;
        }
        
        .sc-talent-title {
          font-size: 1.75rem;
        }
        
        .sc-talent-title:after {
          width: 50px;
        }
        
        .sc-talent-experience-buttons {
          flex-direction: row;
          gap: 1rem;
        }
        
        .sc-talent-exp-btn {
          padding: 0.875rem 1.5rem;
          font-size: 1rem;
        }
        
        .sc-talent-job-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        
        .sc-talent-job-item {
          padding: 0.875rem;
          font-size: 0.9375rem;
        }
      }
      
      /* Large screen styles */
      @media (min-width: 1024px) {
        .sc-talent-main-container {
          padding: 4rem;
        }
        
        .sc-talent-content {
          padding: 1.5rem;
        }
        
        .sc-talent-title {
          font-size: 2rem;
          margin-bottom: 2rem;
        }
        
        .sc-talent-title:after {
          width: 60px;
        }
        
        .sc-talent-options-panel {
          padding: 2rem;
          max-width: 800px;
          border-radius: 1.5rem;
        }
        
        .sc-talent-section-title {
          font-size: 1.25rem;
          margin-bottom: 1.25rem;
        }
        
        .sc-talent-section-title:after {
          width: 40px;
        }
        
        .sc-talent-experience-buttons {
          gap: 1.25rem;
          margin-bottom: 2rem;
        }
        
        .sc-talent-exp-btn {
          padding: 0.875rem 2rem;
        }
        
        .sc-talent-job-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        
        .sc-talent-job-item {
          font-size: 1rem;
        }
      }
    `}</style>
  </AnimatedGroup>
  );
};

export default Scouting;
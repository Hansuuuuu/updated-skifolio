import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "../styles.css";

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
      <div style={{ height: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="spinner"></div> {/* Add a spinner class in CSS */}
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ color: "#333" }}>Scouting Visibility</h2>

      <div className="toggle-container" style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
          <input
            type="checkbox"
            id="checkboxInput"
            checked={scoutVisibility}
            onChange={toggleScoutVisibility}
          />
          <label htmlFor="checkboxInput" className="toggleSwitch"></label>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          <p style={{ fontSize: "18px", fontWeight: "600", color: "#000", margin: 0 }}>
            {scoutVisibility ? "You are visible to employers." : "You are hidden from employers."}
          </p>
        </div>
      </div>

      {scoutVisibility && (
        <div style={{ maxWidth: "700px", margin: "auto", background: "#ffffff", padding: "30px", borderRadius: "12px", boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)" }}>
          <h3 style={{ marginBottom: "15px", color: "#333" }}>Experience Level</h3>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "25px" }}>
            <button
              className="experience-btn"
              onClick={() => handleExperienceChange("No experience")}
              style={{
                padding: "15px 40px",
                borderRadius: "10px",
                border: "2px solid #4ad4d4",
                background: experience === "No experience" ? "#4ad4d4" : "#fff",
                color: experience === "No experience" ? "#fff" : "#4ad4d4",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "600",
                transition: "all 0.3s ease"
              }}
            >
              No Experience
            </button>

            <button
              className="experience-btn"
              onClick={() => handleExperienceChange("Have job experience")}
              style={{
                padding: "15px 40px",
                borderRadius: "10px",
                border: "2px solid #4ad4d4",
                background: experience === "Have job experience" ? "#4ad4d4" : "#fff",
                color: experience === "Have job experience" ? "#fff" : "#4ad4d4",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "600",
                transition: "all 0.3s ease"
              }}
            >
              Have Job Experience
            </button>
          </div>

          <h3 style={{ marginBottom: "15px", color: "#333" }}>Filter Skills</h3>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
            <button
              onClick={() => setFilterMode("relevancy")}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "2px solid #4ad4d4",
                background: filterMode === "relevancy" ? "#4ad4d4" : "#fff",
                color: filterMode === "relevancy" ? "#fff" : "#4ad4d4",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "16px",
                transition: "0.3s"
              }}
            >
              Relevancy
            </button>

            <button
              onClick={() => setFilterMode("absolute")}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "2px solid #4ad4d4",
                background: filterMode === "absolute" ? "#4ad4d4" : "#fff",
                color: filterMode === "absolute" ? "#fff" : "#4ad4d4",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "16px",
                transition: "0.3s"
              }}
            >
              Absolute
            </button>
          </div>

          <h3 style={{ marginBottom: "15px", color: "#333" }}>Preferred Job Roles</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {getDisplayedJobs().map((job) => (
              <div
                key={job}
                onClick={() => toggleSkillSelection(job)}
                style={{
                  padding: "14px",
                  border: "2px solid #ccc",
                  borderRadius: "10px",
                  cursor: "pointer",
                  background: skills[job] ? "#4ad4d4" : "#fff",
                  fontWeight: "600",
                  textAlign: "center",
                  transition: "0.3s",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
                }}
              >
                {job}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Scouting;

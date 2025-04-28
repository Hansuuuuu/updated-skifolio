import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const skillOptions = [
  "Front-end Developer", "Back-end Developer", "Full Stack Developer",
  "React Developer", "Vue.js Developer", "Angular Developer",
  "Node.js Developer", "Django Developer", "Laravel Developer",
  "Express.js Developer", "JavaScript Engineer", "TypeScript Developer",
  "Next.js Developer", "Nuxt.js Developer", "API Developer"
];

const EmployerSkillFilter = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [filterMode, setFilterMode] = useState("relevancy"); // 'relevancy' or 'absolute'
  const [modeAnimation, setModeAnimation] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);  // Track modal visibility

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const removeSkill = (skillToRemove) => {
    setSelectedSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  };

  const clearAllSkills = () => {
    setSelectedSkills([]);
  };

  const toggleFilterMode = () => {
    setFilterMode((prev) => (prev === "relevancy" ? "absolute" : "relevancy"));
    setModeAnimation(true);
    setTimeout(() => setModeAnimation(false), 500); // Animation lasts 500ms
  };

  useEffect(() => {
    const fetchApplicants = async () => {
      const snapshot = await getDocs(collection(db, "applicants"));
      let filtered = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (!data.scoutVisibility) return;

        const applicantSkills = data.selectedJobs || [];

        let match = false;
        if (filterMode === "absolute") {
          // Absolute mode: Applicant's skills must match exactly (no extra skills)
          match = selectedSkills.length === applicantSkills.length &&
                  selectedSkills.every(skill => applicantSkills.includes(skill));
        } else {
          // Relevancy mode: any skill matches
          match = selectedSkills.some(skill => applicantSkills.includes(skill));
        }

        if (match) {
          filtered.push({ id: doc.id, ...data });
        }
      });

      filtered.sort((a, b) => parseFloat(b.average || 0) - parseFloat(a.average || 0));
      setFilteredApplicants(filtered);
    };

    if (selectedSkills.length > 0) {
      fetchApplicants();
    } else {
      setFilteredApplicants([]);
    }
  }, [selectedSkills, filterMode]);

  const openModal = (applicant) => {
    setSelectedApplicant(applicant);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedApplicant(null);
    setModalVisible(false);
  };

  return (
    <div style={{ padding: "100px", maxWidth: "1000px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Filter Applicants by Skills</h2>

      {/* Skill Options */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "10px",
        marginBottom: "20px"
      }}>
        {skillOptions.map((skill) => (
          <div
            key={skill}
            onClick={() => toggleSkill(skill)}
            style={{
              padding: "12px",
              border: "2px solid #ccc",
              borderRadius: "8px",
              cursor: "pointer",
              backgroundColor: selectedSkills.includes(skill) ? "#4ad4d4" : "#fff",
              fontWeight: "600",
              textAlign: "center",
              transition: "0.3s",
            }}
          >
            {skill}
          </div>
        ))}
      </div>

      {/* Selected Skills + Controls */}
      {selectedSkills.length > 0 && (
        <div style={{ marginBottom: "30px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h4>Selected Skills:</h4>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={toggleFilterMode}
                style={{
                  backgroundColor: "#4ad4d4",
                  color: "#fff",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transform: modeAnimation ? "scale(1.1)" : "scale(1)",
                  transition: "transform 0.3s ease",
                }}
              >
                Mode: {filterMode === "relevancy" ? "Relevancy" : "Absolute"}
              </button>
              <button
                onClick={clearAllSkills}
                style={{
                  backgroundColor: "#ff4d4d",
                  color: "#fff",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Clear All
              </button>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
            {selectedSkills.map((skill) => (
              <div
                key={skill}
                onClick={() => removeSkill(skill)}
                style={{
                  backgroundColor: "#4ad4d4",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                {skill} ✖
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Applicants List */}
      <h3>Matching Applicants: {filteredApplicants.length}</h3>
      <div style={{ display: "grid", gap: "15px", marginTop: "20px" }}>
        {filteredApplicants.length > 0 ? (
          filteredApplicants.map((applicant) => (
            <div
              key={applicant.id}
              onClick={() => openModal(applicant)}
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "10px",
                backgroundColor: "#f9f9f9",
                cursor: "pointer",
                transition: "0.3s ease",
              }}
            >
              <p><strong>{applicant.name}</strong> — {applicant.experience}</p>
              <p>{(applicant.selectedJobs || []).join(", ")}</p>
            </div>
          ))
        ) : selectedSkills.length > 0 ? (
          <div style={{
            textAlign: "center",
            marginTop: "40px",
            fontSize: "20px",
            color: "#000000",
            animation: "fadeIn 0.5s ease-in-out"
          }}>
            🚫 No applicants match your current selection.
          </div>
        ) : null}
      </div>

      {/* Applicant Modal */}
      {selectedApplicant && modalVisible && (
        <div className={`modal-overlay ${modalVisible ? 'fadeIn' : ''}`}>
          <div className="modal-container">
            <button onClick={closeModal} style={{ float: "right", fontSize: "20px" }}>✖</button>
            <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
              <img src={selectedApplicant.profilePicURL} alt="Profile" style={{ width: "120px", borderRadius: "10px" }} />
              <div>
                <h2>{selectedApplicant.name}</h2>
                <p><strong>Email:</strong> {selectedApplicant.email}</p>
                <p><strong>Experience:</strong> {selectedApplicant.experience}</p>
                <p><strong>GitHub:</strong> <a href={selectedApplicant.githubLink} target="_blank" rel="noreferrer">{selectedApplicant.githubLink}</a></p>
                <p><strong>Resume:</strong> <a href={selectedApplicant.resumeURL} target="_blank" rel="noreferrer">View PDF</a></p>
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <h3>Skills</h3>
              <ul>
                {(selectedApplicant.selectedJobs || []).map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: "20px" }}>
              <h3>Certifications</h3>
              {selectedApplicant.certifications && Object.entries(selectedApplicant.certifications).map(([category, urls]) => (
                <div key={category} style={{ marginBottom: "10px" }}>
                  <h4>{category}</h4>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {urls.map((url, i) => (
                      <img key={i} src={url} alt="cert" style={{ width: "150px", borderRadius: "8px" }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerSkillFilter;

// import React, { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase";
// import PageTemplate, { 
//   AnimatedHeading, 
//   AnimatedParagraph, 
//   AnimatedButton, 
//   AnimatedContainer ,
//   AnimatedAnchor,
//   AnimatedMap,
//   AnimatedImage,
//   AnimatedList,
//   AnimatedListItem,
//   AnimatedGroup
// } from './PageTemplate';
// const skillOptions = [
//   "Front-end Developer", "Back-end Developer", "Full Stack Developer",
//   "React Developer", "Vue.js Developer", "Angular Developer",
//   "Node.js Developer", "Django Developer", "Laravel Developer",
//   "Express.js Developer", "JavaScript Engineer", "TypeScript Developer",
//   "Next.js Developer", "Nuxt.js Developer", "API Developer"
// ];

// const EmployerSkillFilter = () => {
//   const [selectedSkills, setSelectedSkills] = useState([]);
//   const [filteredApplicants, setFilteredApplicants] = useState([]);
//   const [selectedApplicant, setSelectedApplicant] = useState(null);
//   const [filterMode, setFilterMode] = useState("relevancy"); // 'relevancy' or 'absolute'
//   const [modeAnimation, setModeAnimation] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);  // Track modal visibility

//   const toggleSkill = (skill) => {
//     setSelectedSkills((prev) =>
//       prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
//     );
//   };

//   const removeSkill = (skillToRemove) => {
//     setSelectedSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
//   };

//   const clearAllSkills = () => {
//     setSelectedSkills([]);
//   };

//   const toggleFilterMode = () => {
//     setFilterMode((prev) => (prev === "relevancy" ? "absolute" : "relevancy"));
//     setModeAnimation(true);
//     setTimeout(() => setModeAnimation(false), 500); // Animation lasts 500ms
//   };

// useEffect(() => {
//   const fetchApplicants = async () => {
//     const snapshot = await getDocs(collection(db, "applicants"));
//     let filtered = [];

//     snapshot.forEach((doc) => {
//       const data = doc.data();
//       if (!data.scoutVisibility) return;
      
//       // Access skills from the skills map rather than selectedJobs
//       const applicantSkills = data.skills ? Object.keys(data.skills).filter(skill => data.skills[skill] === true) : [];
      
//       let match = false;
//       if (filterMode === "absolute") {
//         // Absolute mode: Applicant's skills must match exactly (no extra skills)
//         match = selectedSkills.length === applicantSkills.length &&
//                 selectedSkills.every(skill => applicantSkills.includes(skill));
//       } else {
//         // Relevancy mode: any skill matches
//         match = selectedSkills.some(skill => applicantSkills.includes(skill));
//       }

//       if (match) {
//         filtered.push({ id: doc.id, ...data });
//       }
//     });

//     filtered.sort((a, b) => parseFloat(b.average || 0) - parseFloat(a.average || 0));
//     setFilteredApplicants(filtered);
//   };

//   if (selectedSkills.length > 0) {
//     fetchApplicants();
//   } else {
//     setFilteredApplicants([]);
//   }
// }, [selectedSkills, filterMode]);

//   const openModal = (applicant) => {
//     setSelectedApplicant(applicant);
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setSelectedApplicant(null);
//     setModalVisible(false);
//   };

//   return (
//     <AnimatedGroup 
//   className="sc-applicant-container"
//   baseDelay={0.1}
//   delayIncrement={0.15}
// >
//   <div className="sc-applicant-main">
//     <h2 className="sc-applicant-title">Filter Applicants by Skills</h2>

//     {/* Skill Options */}
//     <div className="sc-applicant-skills-grid">
//       {skillOptions.map((skill) => (
//         <div
//           key={skill}
//           onClick={() => toggleSkill(skill)}
//           className={`sc-applicant-skill-item ${selectedSkills.includes(skill) ? "sc-applicant-selected" : ""}`}
//         >
//           {skill}
//         </div>
//       ))}
//     </div>

//     {/* Selected Skills + Controls */}
//     {selectedSkills.length > 0 && (
//       <div className="sc-applicant-selected-section">
//         <div className="sc-applicant-controls">
//           <h4 className="sc-applicant-section-heading">Selected Skills:</h4>
//           <div className="sc-applicant-buttons">
//             <button
//               onClick={toggleFilterMode}
//               className={`sc-applicant-mode-btn ${modeAnimation ? "sc-animate-pulse" : ""}`}
//             >
//               Mode: {filterMode === "relevancy" ? "Relevancy" : "Absolute"}
//             </button>
//             <button
//               onClick={clearAllSkills}
//               className="sc-applicant-clear-btn"
//             >
//               Clear All
//             </button>
//           </div>
//         </div>

//         <div className="sc-applicant-tags">
//           {selectedSkills.map((skill) => (
//             <div
//               key={skill}
//               onClick={() => removeSkill(skill)}
//               className="sc-applicant-tag"
//             >
//               {skill} <span className="sc-applicant-tag-close">✖</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     )}

//     {/* Applicants List */}
//     <h3 className="sc-applicant-results-title">Matching Applicants: {filteredApplicants.length}</h3>
//     <div className="sc-applicant-list">
//       {filteredApplicants.length > 0 ? (
//         filteredApplicants.map((applicant) => (
//           <div
//             key={applicant.id}
//             onClick={() => openModal(applicant)}
//             className="sc-applicant-card"
//           >
//             <p className="sc-applicant-name">{applicant.name} <span className="sc-applicant-exp">— {applicant.experience}</span></p>
//             <p className="sc-applicant-jobs">{(applicant.selectedJobs || []).join(", ")}</p>
//           </div>
//         ))
//       ) : selectedSkills.length > 0 ? (
//         <div className="sc-applicant-no-results">
//           🚫 No applicants match your current selection.
//         </div>
//       ) : null}
//     </div>

//     {/* Applicant Modal */}
//     {selectedApplicant && modalVisible && (
//       <div className="sc-applicant-modal-overlay">
//         <div className="sc-applicant-modal">
//           <button onClick={closeModal} className="sc-applicant-modal-close">✖</button>
          
//           <div className="sc-applicant-modal-header">
//             {selectedApplicant.profilePicURL && (
//               <img 
//                 src={selectedApplicant.profilePicURL} 
//                 alt="Profile" 
//                 className="sc-applicant-profile-img"
//               />
//             )}
//             <div className="sc-applicant-modal-info">
//               <h2 className="sc-applicant-modal-name">{selectedApplicant.name}</h2>
//               <p className="sc-applicant-modal-detail"><strong>Email:</strong> {selectedApplicant.email}</p>
//               {selectedApplicant.experience && (
//                 <p className="sc-applicant-modal-detail"><strong>Experience:</strong> {selectedApplicant.experience}</p>
//               )}
//               {selectedApplicant.githubRepo && (
//                 <p className="sc-applicant-modal-detail">
//                   <strong>GitHub:</strong> <a href={selectedApplicant.githubRepo} target="_blank" rel="noreferrer" className="sc-applicant-link">{selectedApplicant.githubRepo}</a>
//                 </p>
//               )}
//               {selectedApplicant.resumeURL && (
//                 <p className="sc-applicant-modal-detail">
//                   <strong>Resume:</strong> <a href={selectedApplicant.resumeURL} target="_blank" rel="noreferrer" className="sc-applicant-link">View PDF</a>
//                 </p>
//               )}
//             </div>
//           </div>
          
//           {selectedApplicant.skills && (
//             <div className="sc-applicant-modal-section">
//               <h3 className="sc-applicant-modal-section-title">Skills</h3>
//               <div className="sc-applicant-modal-skills">
//                 {Object.keys(selectedApplicant.skills)
//                   .filter(skill => selectedApplicant.skills[skill] === true)
//                   .map((skill) => (
//                     <span key={skill} className="sc-applicant-modal-skill-tag">{skill}</span>
//                   ))
//                 }
//               </div>
//             </div>
//           )}
          
//           {selectedApplicant.certifications && (
//             <div className="sc-applicant-modal-section">
//               <h3 className="sc-applicant-modal-section-title">Certifications</h3>
//               {Object.entries(selectedApplicant.certifications).map(([category, urls]) => (
//                 <div key={category} className="sc-applicant-cert-category">
//                   <h4 className="sc-applicant-cert-title">{category}</h4>
//                   <div className="sc-applicant-cert-images">
//                     {urls.map((url, i) => (
//                       <img key={i} 
//                           src={url} 
//                           alt={`${category} certification ${i+1}`} 
//                           className="sc-applicant-cert-img"
//                       />
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     )}
//   </div>

//   <style jsx>{`
//     /* Main Container */
//     .sc-applicant-main {
//       padding: 5rem 40px;
//       max-width: 1100px;
//       margin: auto;
//     }
    
//     /* Typography */
//     .sc-applicant-title {
//       text-align: center;
//       color: #1e293b;
//       font-size: 2.25rem;
//       font-weight: 700;
//       margin-bottom: 2rem;
//       position: relative;
//       display: inline-block;
//       left: 50%;
//       transform: translateX(-50%);
//     }
    
//     .sc-applicant-title:after {
//       content: "";
//       position: absolute;
//       width: 80px;
//       height: 3px;
//       background: linear-gradient(90deg, #3b82f6, #06b6d4);
//       bottom: -10px;
//       left: 50%;
//       transform: translateX(-50%);
//       border-radius: 2px;
//     }
    
//     .sc-applicant-section-heading {
//       font-size: 1.2rem;
//       margin: 0;
//       color: #1e293b;
//     }
    
//     .sc-applicant-results-title {
//       margin: 30px 0 15px;
//       color: #1e293b;
//       font-size: 1.25rem;
//       font-weight: 600;
//       position: relative;
//       display: inline-block;
//     }
    
//     .sc-applicant-results-title:after {
//       content: "";
//       position: absolute;
//       width: 40px;
//       height: 2px;
//       background: linear-gradient(90deg, #3b82f6, #06b6d4);
//       bottom: -6px;
//       left: 0;
//       border-radius: 2px;
//     }
    
//     /* Skills Grid */
//     .sc-applicant-skills-grid {
//       display: grid;
//       grid-template-columns: repeat(3, 1fr);
//       gap: 12px;
//       margin-bottom: 30px;
//     }
    
//     .sc-applicant-skill-item {
//       padding: 14px;
//       border: 1px solid rgba(226, 232, 240, 0.6);
//       border-radius: 12px;
//       cursor: pointer;
//       background: rgba(255, 255, 255, 0.6);
//       font-weight: 500;
//       text-align: center;
//       transition: all 0.3s ease;
//       box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
//       backdrop-filter: blur(5px);
//     }
    
//     .sc-applicant-skill-item:hover {
//       border-color: rgba(59, 130, 246, 0.3);
//       transform: translateY(-2px);
//       box-shadow: 0 8px 16px rgba(59, 130, 246, 0.1);
//       background: rgba(255, 255, 255, 0.8);
//     }
    
//     .sc-applicant-skill-item.sc-applicant-selected {
//       background: linear-gradient(45deg, #3b82f6, #06b6d4);
//       color: #fff;
//       border-color: transparent;
//       box-shadow: 0 6px 15px rgba(59, 130, 246, 0.2);
//     }
    
//     /* Selected Section */
//     .sc-applicant-selected-section {
//       margin-bottom: 30px;
//       padding: 20px;
//       border-radius: 16px;
//       background: rgba(255, 255, 255, 0.7);
//       backdrop-filter: blur(10px);
//       box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
//     }
    
//     .sc-applicant-controls {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       margin-bottom: 15px;
//     }
    
//     .sc-applicant-buttons {
//       display: flex;
//       gap: 12px;
//     }
    
//     .sc-applicant-mode-btn {
//       background: linear-gradient(45deg, #3b82f6, #06b6d4);
//       color: #fff;
//       border: none;
//       padding: 10px 16px;
//       border-radius: 8px;
//       cursor: pointer;
//       font-weight: 600;
//       transition: all 0.3s ease;
//       box-shadow: 0 4px 8px rgba(59, 130, 246, 0.2);
//     }
    
//     .sc-applicant-mode-btn:hover {
//       transform: translateY(-2px);
//       box-shadow: 0 6px 12px rgba(59, 130, 246, 0.3);
//     }
    
//     .sc-animate-pulse {
//       animation: pulse 0.5s ease-in-out;
//     }
    
//     .sc-applicant-clear-btn {
//       background: linear-gradient(45deg, #f43f5e, #ef4444);
//       color: #fff;
//       border: none;
//       padding: 10px 16px;
//       border-radius: 8px;
//       cursor: pointer;
//       font-weight: 600;
//       transition: all 0.3s ease;
//       box-shadow: 0 4px 8px rgba(239, 68, 68, 0.2);
//     }
    
//     .sc-applicant-clear-btn:hover {
//       transform: translateY(-2px);
//       box-shadow: 0 6px 12px rgba(239, 68, 68, 0.3);
//     }
    
//     /* Tags */
//     .sc-applicant-tags {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 10px;
//     }
    
//     .sc-applicant-tag {
//       background: linear-gradient(45deg, #3b82f6, #06b6d4);
//       color: #fff;
//       padding: 8px 14px;
//       border-radius: 20px;
//       display: flex;
//       align-items: center;
//       gap: 8px;
//       font-weight: 500;
//       cursor: pointer;
//       transition: all 0.2s ease;
//       box-shadow: 0 3px 6px rgba(59, 130, 246, 0.2);
//     }
    
//     .sc-applicant-tag:hover {
//       transform: translateY(-1px);
//       box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
//     }
    
//     .sc-applicant-tag-close {
//       font-weight: 700;
//       transition: transform 0.2s ease;
//     }
    
//     .sc-applicant-tag:hover .sc-applicant-tag-close {
//       transform: scale(1.2);
//     }
    
//     /* Applicant List */
//     .sc-applicant-list {
//       display: grid;
//       gap: 15px;
//       margin-top: 20px;
//     }
    
//     .sc-applicant-card {
//       border: 1px solid rgba(226, 232, 240, 0.5);
//       padding: 24px;
//       border-radius: 12px;
//       background: rgba(255, 255, 255, 0.7);
//       cursor: pointer;
//       transition: all 0.3s ease;
//       backdrop-filter: blur(8px);
//       box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
//     }
    
//     .sc-applicant-card:hover {
//       transform: translateY(-3px);
//       box-shadow: 0 8px 20px rgba(59, 130, 246, 0.1);
//       border-color: rgba(59, 130, 246, 0.2);
//     }
    
//     .sc-applicant-name {
//       font-weight: 600;
//       color: #1e293b;
//       margin: 0 0 6px 0;
//       font-size: 1.1rem;
//     }
    
//     .sc-applicant-exp {
//       font-weight: normal;
//       color: #475569;
//     }
    
//     .sc-applicant-jobs {
//       color: #64748b;
//       margin: 0;
//     }
    
//     .sc-applicant-no-results {
//       text-align: center;
//       margin-top: 40px;
//       font-size: 20px;
//       color: #0f172a;
//       animation: fadeIn 0.5s ease-in-out;
//     }
    
//     /* Modal */
//     .sc-applicant-modal-overlay {
//       position: fixed;
//       top: 0;
//       left: 0;
//       right: 0;
//       bottom: 0;
//       background-color: rgba(0, 0, 0, 0.6);
//       backdrop-filter: blur(4px);
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       z-index: 1000;
//       animation: fadeIn 0.3s ease-out;
//     }
    
//     .sc-applicant-modal {
//       background: rgba(255, 255, 255, 0.95);
//       border-radius: 16px;
//       padding: 28px;
//       max-width: 800px;
//       width: 90%;
//       max-height: 90vh;
//       overflow-y: auto;
//       position: relative;
//       box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
//       border: 1px solid rgba(255, 255, 255, 0.3);
//       animation: zoomIn 0.3s ease-out;
//     }
    
//     .sc-applicant-modal-close {
//       position: absolute;
//       top: 20px;
//       right: 20px;
//       background: none;
//       border: none;
//       font-size: 22px;
//       cursor: pointer;
//       color: #64748b;
//       transition: all 0.2s ease;
//       width: 36px;
//       height: 36px;
//       border-radius: 50%;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }
    
//     .sc-applicant-modal-close:hover {
//       background: rgba(0, 0, 0, 0.05);
//       color: #0f172a;
//     }
    
//     .sc-applicant-modal-header {
//       display: flex;
//       gap: 24px;
//       margin-top: 10px;
//       flex-wrap: wrap;
//     }
    
//     .sc-applicant-profile-img {
//       width: 120px;
//       height: 120px;
//       object-fit: cover;
//       border-radius: 12px;
//       box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//     }
    
//     .sc-applicant-modal-info {
//       flex: 1;
//     }
    
//     .sc-applicant-modal-name {
//       margin-top: 0;
//       margin-bottom: 12px;
//       color: #1e293b;
//       font-size: 1.75rem;
//     }
    
//     .sc-applicant-modal-detail {
//       margin: 8px 0;
//       color: #475569;
//     }
    
//     .sc-applicant-link {
//       color: #3b82f6;
//       text-decoration: none;
//       transition: color 0.2s ease;
//     }
    
//     .sc-applicant-link:hover {
//       color: #1d4ed8;
//       text-decoration: underline;
//     }
    
//     .sc-applicant-modal-section {
//       margin-top: 24px;
//       padding-top: 20px;
//       border-top: 1px solid rgba(226, 232, 240, 0.8);
//     }
    
//     .sc-applicant-modal-section-title {
//       margin-top: 0;
//       margin-bottom: 16px;
//       color: #1e293b;
//       font-size: 1.25rem;
//       position: relative;
//       display: inline-block;
//     }
    
//     .sc-applicant-modal-section-title:after {
//       content: "";
//       position: absolute;
//       width: 30px;
//       height: 2px;
//       background: linear-gradient(90deg, #3b82f6, #06b6d4);
//       bottom: -6px;
//       left: 0;
//       border-radius: 2px;
//     }
    
//     .sc-applicant-modal-skills {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 10px;
//     }
    
//     .sc-applicant-modal-skill-tag {
//       background: rgba(241, 245, 249, 0.8);
//       padding: 6px 12px;
//       border-radius: 15px;
//       font-size: 14px;
//       color: #334155;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
//       border: 1px solid rgba(226, 232, 240, 0.6);
//     }
    
//     .sc-applicant-cert-category {
//       margin-bottom: 24px;
//     }
    
//     .sc-applicant-cert-title {
//       margin-top: 0;
//       margin-bottom: 12px;
//       color: #334155;
//       font-size: 1.1rem;
//     }
    
//     .sc-applicant-cert-images {
//       display: flex;
//       gap: 12px;
//       flex-wrap: wrap;
//     }
    
//     .sc-applicant-cert-img {
//       width: 150px;
//       border-radius: 8px;
//       box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//       transition: all 0.3s ease;
//     }
    
//     .sc-applicant-cert-img:hover {
//       transform: scale(1.05);
//       box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
//     }
    
//     /* Animations */
//     @keyframes fadeIn {
//       0% { opacity: 0; }
//       100% { opacity: 1; }
//     }
    
//     @keyframes zoomIn {
//       0% { 
//         opacity: 0;
//         transform: scale(0.95);
//       }
//       100% { 
//         opacity: 1;
//         transform: scale(1);
//       }
//     }
    
//     @keyframes pulse {
//       0% { transform: scale(1); }
//       50% { transform: scale(1.1); }
//       100% { transform: scale(1); }
//     }
    
//     /* Responsive */
//     @media (max-width: 768px) {
//       .sc-applicant-main {
//         padding: 40px 20px;
//       }
      
//       .sc-applicant-skills-grid {
//         grid-template-columns: repeat(2, 1fr);
//       }
      
//       .sc-applicant-controls {
//         flex-direction: column;
//         align-items: flex-start;
//         gap: 12px;
//       }
      
//       .sc-applicant-title {
//         font-size: 1.75rem;
//       }
//     }
    
//     @media (max-width: 480px) {
//       .sc-applicant-skills-grid {
//         grid-template-columns: 1fr;
//       }
      
//       .sc-applicant-buttons {
//         width: 100%;
//         justify-content: space-between;
//       }
      
//       .sc-applicant-modal-header {
//         flex-direction: column;
//         align-items: center;
//         text-align: center;
//       }
      
//       .sc-applicant-modal-section-title:after {
//         left: 50%;
//         transform: translateX(-50%);
//       }
//     }
//   `}</style>
// </AnimatedGroup>
//   );
// };

// export default EmployerSkillFilter;
import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";
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
  
  // Report states
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        
        // Access skills from the skills map rather than selectedJobs
        const applicantSkills = data.skills ? Object.keys(data.skills).filter(skill => data.skills[skill] === true) : [];
        
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
    // Reset report form when opening modal
    setShowReportForm(false);
    setReportReason("");
    setReportDetails("");
  };

  const closeModal = () => {
    setSelectedApplicant(null);
    setModalVisible(false);
    setShowReportForm(false);
  };

  const toggleReportForm = (e) => {
    if (e) e.stopPropagation();
    setShowReportForm(!showReportForm);
  };

  const handleReportApplicant = async (e) => {
    e.preventDefault();
    
    if (!auth.currentUser) {
      alert("You must be logged in to report applicants.");
      return;
    }
    
    if (!reportReason) {
      alert("Please select a reason for reporting this applicant.");
      return;
    }
    
    if (!reportDetails || reportDetails.trim().length < 10) {
      alert("Please provide more details about the violation.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const employerId = auth.currentUser.uid;
      const employerRef = doc(db, "employers", employerId);
      const employerSnap = await getDoc(employerRef);
      
      if (!employerSnap.exists()) {
        alert("Employer profile not found!");
        setIsSubmitting(false);
        return;
      }
      
      const employerData = employerSnap.data();
      
      // Create the report in the job_reports collection
      const reportsRef = collection(db, "job_reports");
      await addDoc(reportsRef, {
        applicantId: selectedApplicant.id,
        applicantName: selectedApplicant.name,
        applicantEmail: selectedApplicant.email,
        reportedBy: employerId,
        reporterName: employerData.companyName || "Anonymous Employer",
        reporterEmail: employerData.email || "No email provided",
        reason: reportReason,
        details: reportDetails,
        status: "pending", // pending, reviewed, resolved
        violationType:reportReason,
        createdAt: serverTimestamp(),
        relatedSkills: selectedSkills, // Include the skills that were used to filter
      });
      
      alert("Thank you for your report. Our team will review it shortly.");
      setShowReportForm(false);
      setReportReason("");
      setReportDetails("");
    } catch (error) {
      console.error("Error submitting applicant report:", error);
      alert("There was an error submitting your report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedGroup 
  className="sc-applicant-container"
  baseDelay={0.1}
  delayIncrement={0.15}
>
  <div className="sc-applicant-main">
    <h2 className="sc-applicant-title">Filter Applicants by Skills</h2>

    {/* Skill Options */}
    <div className="sc-applicant-skills-grid">
      {skillOptions.map((skill) => (
        <div
          key={skill}
          onClick={() => toggleSkill(skill)}
          className={`sc-applicant-skill-item ${selectedSkills.includes(skill) ? "sc-applicant-selected" : ""}`}
        >
          {skill}
        </div>
      ))}
    </div>

    {/* Selected Skills + Controls */}
    {selectedSkills.length > 0 && (
      <div className="sc-applicant-selected-section">
        <div className="sc-applicant-controls">
          <h4 className="sc-applicant-section-heading">Selected Skills:</h4>
          <div className="sc-applicant-buttons">
            <button
              onClick={toggleFilterMode}
              className={`sc-applicant-mode-btn ${modeAnimation ? "sc-animate-pulse" : ""}`}
            >
              Mode: {filterMode === "relevancy" ? "Relevancy" : "Absolute"}
            </button>
            <button
              onClick={clearAllSkills}
              className="sc-applicant-clear-btn"
            >
              Clear All
            </button>
          </div>
        </div>

        <div className="sc-applicant-tags">
          {selectedSkills.map((skill) => (
            <div
              key={skill}
              onClick={() => removeSkill(skill)}
              className="sc-applicant-tag"
            >
              {skill} <span className="sc-applicant-tag-close">✖</span>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Applicants List */}
    <h3 className="sc-applicant-results-title">Matching Applicants: {filteredApplicants.length}</h3>
    <div className="sc-applicant-list">
      {filteredApplicants.length > 0 ? (
        filteredApplicants.map((applicant) => (
          <div
            key={applicant.id}
            onClick={() => openModal(applicant)}
            className="sc-applicant-card"
          >
            <p className="sc-applicant-name">{applicant.name} <span className="sc-applicant-exp">— {applicant.experience}</span></p>
            <p className="sc-applicant-jobs">{(applicant.selectedJobs || []).join(", ")}</p>
          </div>
        ))
      ) : selectedSkills.length > 0 ? (
        <div className="sc-applicant-no-results">
          🚫 No applicants match your current selection.
        </div>
      ) : null}
    </div>

    {/* Applicant Modal */}
    {selectedApplicant && modalVisible && (
      <div className="sc-applicant-modal-overlay" onClick={closeModal}>
        <div className="sc-applicant-modal" onClick={(e) => e.stopPropagation()}>
          <button onClick={closeModal} className="sc-applicant-modal-close">✖</button>
          
          <div className="sc-applicant-modal-header">
            {selectedApplicant.profilePicURL && (
              <img 
                src={selectedApplicant.profilePicURL} 
                alt="Profile" 
                className="sc-applicant-profile-img"
              />
            )}
            <div className="sc-applicant-modal-info">
              <h2 className="sc-applicant-modal-name">{selectedApplicant.name}</h2>
              <p className="sc-applicant-modal-detail"><strong>Email:</strong> {selectedApplicant.email}</p>
              {selectedApplicant.experience && (
                <p className="sc-applicant-modal-detail"><strong>Experience:</strong> {selectedApplicant.experience}</p>
              )}
              {selectedApplicant.githubRepo && (
                <p className="sc-applicant-modal-detail">
                  <strong>GitHub:</strong> <a href={selectedApplicant.githubRepo} target="_blank" rel="noreferrer" className="sc-applicant-link">{selectedApplicant.githubRepo}</a>
                </p>
              )}
              {selectedApplicant.resumeURL && (
                <p className="sc-applicant-modal-detail">
                  <strong>Resume:</strong> <a href={selectedApplicant.resumeURL} target="_blank" rel="noreferrer" className="sc-applicant-link">View PDF</a>
                </p>
              )}
              <button 
                onClick={toggleReportForm} 
                className="sc-applicant-report-btn"
              >
                {showReportForm ? "Cancel Report" : "Report Applicant"}
              </button>
            </div>
          </div>
          
          {/* Report Form */}
          {showReportForm && (
            <div className="sc-applicant-report-form">
              <h3 className="sc-applicant-report-title">Report Applicant</h3>
              <form onSubmit={handleReportApplicant}>
                <div className="sc-applicant-form-group">
                  <label className="sc-applicant-form-label">
                    Reason for Report:*
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="sc-applicant-form-select"
                    required
                  >
                    <option value="">-- Select a reason --</option>
                    <option value="Fake or misleading profile">Fake or misleading profile</option>
                    <option value="Inappropriate content">Inappropriate content</option>
                    <option value="False qualifications">False qualifications</option>
                    <option value="Duplicate profile">Duplicate profile</option>
                    <option value="Spam behavior">Spam behavior</option>
                    <option value="Identity theft">Identity theft</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="sc-applicant-form-group">
                  <label className="sc-applicant-form-label">
                    Details:*
                  </label>
                  <textarea
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    className="sc-applicant-form-textarea"
                    placeholder="Please provide specific details about the violation..."
                    required
                  />
                </div>
                
                <div className="sc-applicant-form-buttons">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="sc-applicant-form-submit"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Report"}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {!showReportForm && (
            <>
              {selectedApplicant.skills && (
                <div className="sc-applicant-modal-section">
                  <h3 className="sc-applicant-modal-section-title">Skills</h3>
                  <div className="sc-applicant-modal-skills">
                    {Object.keys(selectedApplicant.skills)
                      .filter(skill => selectedApplicant.skills[skill] === true)
                      .map((skill) => (
                        <span key={skill} className="sc-applicant-modal-skill-tag">{skill}</span>
                      ))
                    }
                  </div>
                </div>
              )}
              
              {selectedApplicant.certifications && (
                <div className="sc-applicant-modal-section">
                  <h3 className="sc-applicant-modal-section-title">Certifications</h3>
                  {Object.entries(selectedApplicant.certifications).map(([category, urls]) => (
                    <div key={category} className="sc-applicant-cert-category">
                      <h4 className="sc-applicant-cert-title">{category}</h4>
                      <div className="sc-applicant-cert-images">
                        {urls.map((url, i) => (
                          <img key={i} 
                              src={url} 
                              alt={`${category} certification ${i+1}`} 
                              className="sc-applicant-cert-img"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )}
  </div>

  <style jsx>{`
    /* Main Container */
    .sc-applicant-main {
      padding: 5rem 40px;
      max-width: 1100px;
      margin: auto;
    }
    
    /* Typography */
    .sc-applicant-title {
      text-align: center;
      color: #1e293b;
      font-size: 2.25rem;
      font-weight: 700;
      margin-bottom: 2rem;
      position: relative;
      display: inline-block;
      left: 50%;
      transform: translateX(-50%);
    }
    
    .sc-applicant-title:after {
      content: "";
      position: absolute;
      width: 80px;
      height: 3px;
      background: linear-gradient(90deg, #3b82f6, #06b6d4);
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 2px;
    }
    
    .sc-applicant-section-heading {
      font-size: 1.2rem;
      margin: 0;
      color: #1e293b;
    }
    
    .sc-applicant-results-title {
      margin: 30px 0 15px;
      color: #1e293b;
      font-size: 1.25rem;
      font-weight: 600;
      position: relative;
      display: inline-block;
    }
    
    .sc-applicant-results-title:after {
      content: "";
      position: absolute;
      width: 40px;
      height: 2px;
      background: linear-gradient(90deg, #3b82f6, #06b6d4);
      bottom: -6px;
      left: 0;
      border-radius: 2px;
    }
    
    /* Skills Grid */
    .sc-applicant-skills-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 30px;
    }
    
    .sc-applicant-skill-item {
      padding: 14px;
      border: 1px solid rgba(226, 232, 240, 0.6);
      border-radius: 12px;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.6);
      font-weight: 500;
      text-align: center;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
      backdrop-filter: blur(5px);
    }
    
    .sc-applicant-skill-item:hover {
      border-color: rgba(59, 130, 246, 0.3);
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(59, 130, 246, 0.1);
      background: rgba(255, 255, 255, 0.8);
    }
    
    .sc-applicant-skill-item.sc-applicant-selected {
      background: linear-gradient(45deg, #3b82f6, #06b6d4);
      color: #fff;
      border-color: transparent;
      box-shadow: 0 6px 15px rgba(59, 130, 246, 0.2);
    }
    
    /* Selected Section */
    .sc-applicant-selected-section {
      margin-bottom: 30px;
      padding: 20px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
    }
    
    .sc-applicant-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
    
    .sc-applicant-buttons {
      display: flex;
      gap: 12px;
    }
    
    .sc-applicant-mode-btn {
      background: linear-gradient(45deg, #3b82f6, #06b6d4);
      color: #fff;
      border: none;
      padding: 10px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 8px rgba(59, 130, 246, 0.2);
    }
    
    .sc-applicant-mode-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(59, 130, 246, 0.3);
    }
    
    .sc-animate-pulse {
      animation: pulse 0.5s ease-in-out;
    }
    
    .sc-applicant-clear-btn {
      background: linear-gradient(45deg, #f43f5e, #ef4444);
      color: #fff;
      border: none;
      padding: 10px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 8px rgba(239, 68, 68, 0.2);
    }
    
    .sc-applicant-clear-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(239, 68, 68, 0.3);
    }
    
    /* Tags */
    .sc-applicant-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    
    .sc-applicant-tag {
      background: linear-gradient(45deg, #3b82f6, #06b6d4);
      color: #fff;
      padding: 8px 14px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 3px 6px rgba(59, 130, 246, 0.2);
    }
    
    .sc-applicant-tag:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
    }
    
    .sc-applicant-tag-close {
      font-weight: 700;
      transition: transform 0.2s ease;
    }
    
    .sc-applicant-tag:hover .sc-applicant-tag-close {
      transform: scale(1.2);
    }
    
    /* Applicant List */
    .sc-applicant-list {
      display: grid;
      gap: 15px;
      margin-top: 20px;
    }
    
    .sc-applicant-card {
      border: 1px solid rgba(226, 232, 240, 0.5);
      padding: 24px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.7);
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
    }
    
    .sc-applicant-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(59, 130, 246, 0.1);
      border-color: rgba(59, 130, 246, 0.2);
    }
    
    .sc-applicant-name {
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 6px 0;
      font-size: 1.1rem;
    }
    
    .sc-applicant-exp {
      font-weight: normal;
      color: #475569;
    }
    
    .sc-applicant-jobs {
      color: #64748b;
      margin: 0;
    }
    
    .sc-applicant-no-results {
      text-align: center;
      margin-top: 40px;
      font-size: 20px;
      color: #0f172a;
      animation: fadeIn 0.5s ease-in-out;
    }
    
    /* Modal */
    .sc-applicant-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease-out;
    }
    
    .sc-applicant-modal {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
      padding: 28px;
      max-width: 800px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.3);
      animation: zoomIn 0.3s ease-out;
    }
    
    .sc-applicant-modal-close {
      position: absolute;
      top: 20px;
      right: 20px;
      background: none;
      border: none;
      font-size: 22px;
      cursor: pointer;
      color: #64748b;
      transition: all 0.2s ease;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .sc-applicant-modal-close:hover {
      background: rgba(0, 0, 0, 0.05);
      color: #0f172a;
    }
    
    .sc-applicant-modal-header {
      display: flex;
      gap: 24px;
      margin-top: 10px;
      flex-wrap: wrap;
    }
    
    .sc-applicant-profile-img {
      width: 120px;
      height: 120px;
      object-fit: cover;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .sc-applicant-modal-info {
      flex: 1;
    }
    
    .sc-applicant-modal-name {
      margin-top: 0;
      margin-bottom: 12px;
      color: #1e293b;
      font-size: 1.75rem;
    }
    
    .sc-applicant-modal-detail {
      margin: 8px 0;
      color: #475569;
    }
    
    .sc-applicant-link {
      color: #3b82f6;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    
    .sc-applicant-link:hover {
      color: #1d4ed8;
      text-decoration: underline;
    }
    
    .sc-applicant-modal-section {
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid rgba(226, 232, 240, 0.8);
    }
    
    .sc-applicant-modal-section-title {
      margin-top: 0;
      margin-bottom: 16px;
      color: #1e293b;
      font-size: 1.25rem;
      position: relative;
      display: inline-block;
    }
    
    .sc-applicant-modal-section-title:after {
      content: "";
      position: absolute;
      width: 30px;
      height: 2px;
      background: linear-gradient(90deg, #3b82f6, #06b6d4);
      bottom: -6px;
      left: 0;
      border-radius: 2px;
    }
    
    .sc-applicant-modal-skills {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    
    .sc-applicant-modal-skill-tag {
      background: rgba(241, 245, 249, 0.8);
      padding: 6px 12px;
      border-radius: 15px;
      font-size: 14px;
      color: #334155;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(226, 232, 240, 0.6);
    }
    
    .sc-applicant-cert-category {
      margin-bottom: 24px;
    }
    
    .sc-applicant-cert-title {
      margin-top: 0;
      margin-bottom: 12px;
      color: #334155;
      font-size: 1.1rem;
    }
    
    .sc-applicant-cert-images {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    
    .sc-applicant-cert-img {
      width: 150px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    
    .sc-applicant-cert-img:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }
    
    /* Report Button & Form */
    .sc-applicant-report-btn {
      margin-top: 15px;
      background: linear-gradient(45deg, #f43f5e, #ef4444);
      color: #fff;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
      box-shadow: 0 3px 6px rgba(239, 68, 68, 0.2);
      display: inline-block;
    }
    
    .sc-applicant-report-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);
    }
    
    .sc-applicant-report-form {
      margin-top: 24px;
      padding: 20px;
      border-radius: 12px;
      background: rgba(248, 250, 252, 0.8);
      border: 1px solid rgba(226, 232, 240, 0.8);
    }
    
    .sc-applicant-report-title {
      margin-top: 0;
      margin-bottom: 16px;
      color: #1e293b;
      font-size: 1.3rem;
      position: relative;
      display: inline-block;
    }
    
    .sc-applicant-report-title:after {
      content: "";
      position: absolute;
      width: 30px;
      height: 2px;
      background: linear-gradient(90deg, #ef4444, #f43f5e);
      bottom: -6px;
      left: 0;
      border-radius: 2px;
    }
    
    .sc-applicant-form-group {
      margin-bottom: 16px;
    }
    
    .sc-applicant-form-label {
      display: block;
      margin-bottom: 8px;
      color: #334155;
      font-weight: 500;
    }
    
    .sc-applicant-form-select {
      width: 100%;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid rgba(226, 232, 240, 0.8);
      background-color: #fff;
      color: #1e293b;
      font-size: 15px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
      transition: all 0.2s ease;
    }
    
    .sc-applicant-form-select:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }
    
    .sc-applicant-form-textarea {
      width: 100%;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid rgba(226, 232, 240, 0.8);
      background-color: #fff;
      color: #1e293b;
      font-size: 15px;
      min-height: 120px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
      transition: all 0.2s ease;
      resize: vertical;
    }
    
    .sc-applicant-form-textarea:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }
    
    .sc-applicant-form-buttons {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
    
    .sc-applicant-form-submit {
      background: linear-gradient(45deg, #ef4444, #f43f5e);
      color: #fff;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 8px rgba(239, 68, 68, 0.2);
    }
    
    .sc-applicant-form-submit:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(239, 68, 68, 0.3);
    }
    
    .sc-applicant-form-submit:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    /* Animations */
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    
    @keyframes zoomIn {
      0% {
        opacity: 0;
        transform: scale(0.95);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }
    
    /* Responsive Styles */
    @media (max-width: 768px) {
      .sc-applicant-skills-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .sc-applicant-modal {
        width: 95%;
        padding: 20px;
      }
      
      .sc-applicant-modal-header {
        flex-direction: column;
        gap: 16px;
      }
      
      .sc-applicant-profile-img {
        width: 100px;
        height: 100px;
      }
    }
    
    @media (max-width: 480px) {
      .sc-applicant-skills-grid {
        grid-template-columns: 1fr;
      }
      
      .sc-applicant-controls {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }
      
      .sc-applicant-cert-img {
        width: 100%;
      }
    }
  `}</style>
</AnimatedGroup>
    );
};

export default EmployerSkillFilter;
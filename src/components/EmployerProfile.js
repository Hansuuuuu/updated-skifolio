// import React, { useState, useEffect } from "react";
// import { db, auth, storage } from "../firebase";
// import { doc, getDoc, updateDoc, collection, query, where, getDocs, deleteDoc,addDoc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { onSnapshot } from "firebase/firestore";
// import "../styles.css";

// const EmployerProfile = () => {
//     const [employer, setEmployer] = useState(null);
//     const [jobPosts, setJobPosts] = useState([]);
//     const [applicants, setApplicants] = useState({});
//     const [selectedJob, setSelectedJob] = useState(null);
//     const [selectedApplicant, setSelectedApplicant] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [emailSubject, setEmailSubject] = useState("");
//     const [emailBody, setEmailBody] = useState("");
//     const [editedData, setEditedData] = useState({
//         industry: "",
//         location: "",
//         description: "",
//         phone: "",
//         contactPerson: "",
//     });
//     const [profilePic, setProfilePic] = useState(null);
//     const [uploading, setUploading] = useState(false);

//     useEffect(() => {
//         const fetchEmployerData = async () => {
//             if (auth.currentUser) {
//                 const employerRef = doc(db, "employers", auth.currentUser.uid);
//                 const employerSnap = await getDoc(employerRef);
//                 if (employerSnap.exists()) {
//                     setEmployer(employerSnap.data());
//                     setEditedData({
//                         industry: employerSnap.data().industry,
//                         location: employerSnap.data().location,
//                         description: employerSnap.data().description,
//                         phone: employerSnap.data().phone,
//                         contactPerson: employerSnap.data().contactPerson,
//                     });
//                     setProfilePic(employerSnap.data().profilePic || "");
//                 } else {
//                     console.log("No employer data found.");
//                 }
//             }
//         };

//         const fetchJobPosts = async () => {
//             if (auth.currentUser) {
//                 const jobsRef = collection(db, "jobs");
//                 const q = query(jobsRef, where("employerId", "==", auth.currentUser.uid));
//                 const querySnapshot = await getDocs(q);
//                 setJobPosts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//             }
//         };

//         fetchEmployerData();
//         fetchJobPosts();
//     }, []);

//     useEffect(() => {
//         const unsubscribeMap = {};
    
//         jobPosts.forEach((job) => {
//             const applicationsRef = collection(db, "jobs", job.id, "applications");
    
//             // Listen for real-time changes
//             const unsubscribe = onSnapshot(applicationsRef, (snapshot) => {
//                 const applicantsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    
//                 setApplicants((prev) => ({
//                     ...prev,
//                     [job.id]: applicantsData, // Update the job's applicants
//                 }));
//             });
    
//             unsubscribeMap[job.id] = unsubscribe;
//         });
    
//         return () => {
//             Object.values(unsubscribeMap).forEach((unsubscribe) => unsubscribe());
//         };
//     }, [jobPosts]); // Ensure it re-runs when jobPosts change

//     const handleJobClick = (job) => {
//         setSelectedJob(job.id);
//     };
    
//     const handleApplicantClick = (applicant) => {
//         setSelectedApplicant(applicant);
//     };

//     const handleEditClick = () => {
//         setIsEditing(true);
//     };

//     const handleSaveClick = async () => {
//         if (auth.currentUser) {
//             const employerRef = doc(db, "employers", auth.currentUser.uid);
//             await updateDoc(employerRef, editedData);
//             setEmployer((prev) => ({ ...prev, ...editedData }));
//             setIsEditing(false);
//         }
//     };

//     const handleProfilePicChange = async (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setUploading(true);
//             const storageRef = ref(storage, `profile_pictures/${auth.currentUser.uid}`);
//             await uploadBytes(storageRef, file);
//             const downloadURL = await getDownloadURL(storageRef);

//             setProfilePic(downloadURL);
//             await updateDoc(doc(db, "employers", auth.currentUser.uid), { profilePic: downloadURL });

//             setUploading(false);
//         }
//     };

//     const handleDeleteJob = async (jobId) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this job post?");
//         if (confirmDelete) {
//             await deleteDoc(doc(db, "jobs", jobId));
//             setJobPosts((prev) => prev.filter((job) => job.id !== jobId));
//             alert("Job post deleted successfully!");
//         }
//     };
//     const handleCloseApplicantModal = () => {
//         setSelectedApplicant(null);
//     };

//     const handleChange = (e) => {
//         setEditedData({ ...editedData, [e.target.name]: e.target.value });
//     };

//   const handleEmailSend = async () => {
//     if (!selectedApplicant || !selectedJob || !employer) {
//         console.error("Missing required data (applicant, job, or employer).");
//         return;
//     }

//     try {
//         // Reference to the applicant's notifications subcollection
//         const notificationsRef = collection(db, "applicants", selectedApplicant.id, "notifications");

//         // Create the notification object with company name, email subject, and email body
//         const newNotification = {
//             jobId: selectedJob,
//             companyName: employer.companyName,  // Include company name
//             subject: emailSubject,  // Include email subject
//             message: emailBody,  // Include company name, subject, and body
//             timestamp: new Date(),
//             status: "unread",
//         };

//         // Add the notification to Firestore
//         await addDoc(notificationsRef, newNotification);

//         console.log("Notification added successfully!");

//         // Send email


//         // Show success alert
//         alert("Email sent successfully!");

//         // Close the applicant submission modal
//         setSelectedApplicant(null);
        
//     } catch (error) {
//         console.error("Error sending email or updating Firestore:", error);
//         alert("Failed to send email. Please try again.");
//     }
// };



//     return (
//       <div className="employer-profile">
//       <h2 style={{marginTop: "50px"}}>Employer Profile</h2>
//       {employer ? (
//         <div className="profile-details">
//           <div className="profile-picture">
//             <label htmlFor="profile-pic-upload">
//               <img src={profilePic || "/default-profile.png"} alt="Profile" className="profile-pic" />
//             </label>
//             <input type="file" id="profile-pic-upload" style={{ display: "none" }} onChange={handleProfilePicChange} />
//           </div>

//           <h3>{employer.companyName}</h3>
//           <p><strong>Industry:</strong> {isEditing ? <input type="text" name="industry" value={editedData.industry} onChange={handleChange} /> : employer.industry}</p>
//           <p><strong>Location:</strong> {isEditing ? <input type="text" name="location" value={editedData.location} onChange={handleChange} /> : employer.location}</p>
//           <p><strong>Description:</strong> {isEditing ? <input type="text" name="description" value={editedData.description} onChange={handleChange} /> : employer.description}</p>

//           <h3>Contact Information</h3>
//           <p><strong>Name:</strong> {isEditing ? <input type="text" name="contactPerson" value={editedData.contactPerson} onChange={handleChange} /> : employer.contactPerson}</p>
//           <p><strong>Email:</strong> {employer.email}</p>
//           <p><strong>Phone:</strong> {isEditing ? <input type="text" name="phone" value={editedData.phone} onChange={handleChange} /> : employer.phone}</p>

//           {isEditing ? (
//             <button className="save-btn" onClick={handleSaveClick}>Save Changes</button>
//           ) : (
//             <button className="edit-btn" onClick={handleEditClick}>Edit Profile</button>
//           )}
//                     <h3 style={{marginTop: "10px"}}>Jobs Posted</h3>
//                     {jobPosts.length > 0 ? (
//                         <ul className="job-list">
//                             {jobPosts.map((job) => (
//                                 <li key={job.id} onClick={() => handleJobClick(job)} className="clickable-job">
//                                     <h4>{job.title}</h4>
//                                     <p>{job.description}</p>
//                                     <p><strong>Location:</strong> {job.location}</p>

//                                     {selectedJob === job.id && (
//                                         <div id='JOBlist'>
//                                             <h5>Applicants:</h5>
//                                             <div style={{
//                                             maxHeight: '200px',
//                                             overflowY: 'auto',
//                                             border: '1px solid #ccc',
//                                             padding: '10px',
//                                             borderRadius: '5px',
//                                                                 }}
//                                          className="applicant-list">
//                                                 {applicants[job.id] && applicants[job.id].length > 0 ? (
//                                             applicants[job.id].map((applicant) => (
//                                                 <div
//                                                     key={applicant.id}
//                                                     style={{
//                                                         padding: '10px',
//                                                         margin: '10px 0',
//                                                         backgroundColor: '#f9f9f9',
//                                                         cursor: 'pointer',
//                                                         borderRadius: '5px',
//                                                     }}
//                                                     onClick={() => handleApplicantClick(applicant)}
//                                                 >
//                                                     <p><strong>Name:</strong> {applicant.name}</p>
//                                                 </div>
//                                             ))
//                                         ) : (
//                                             <p>No applicants yet.</p>
//                                         )}
//                                             </div>
//                                         </div>
//                                     )}
//                                     <button id="Delete" onClick={() => handleDeleteJob(job.id)}>Remove</button>
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p>No jobs posted yet.</p>
//                     )}

//                     {/* Applicant Modal */}
//                     {selectedApplicant && (
//                 <div className="modal-overlay1">
//                     <div className="modal-content1">
//                         <h4>Applicant Details</h4>
//                         <p><strong>Name:</strong> {selectedApplicant.name}</p>
//                         <p><strong>Email:</strong> {selectedApplicant.email}</p>
//                         <p><strong>Resume:</strong>{' '}
//                             <a
//                                 href={selectedApplicant.resumeURL}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                             >
//                                 {selectedApplicant.resumeURL}
//                             </a>
//                         </p>

//                         <p><strong>Certifications:</strong></p>
//                         <div style={{ marginBottom: '20px' }}>
//                             {selectedApplicant.certifications && Object.keys(selectedApplicant.certifications).length > 0 ? (
//                                 Object.entries(selectedApplicant.certifications).map(([skill, certs]) => (
//                                     <div key={skill} style={{ marginBottom: '5px' }}>
//                                         <strong>{skill}:</strong>
//                                         <div>
//                                             {certs.map((cert, index) => (
//                                                 <div key={index}>
//                                                     <a href={cert} target="_blank" rel="noopener noreferrer" style={{ color: '#007BFF' }}>
//                                                         Certificate {index + 1}
//                                                     </a>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p>No certifications available</p>
//                             )}
//                         </div>

//                                 <p><strong>Submissions:</strong></p>
//                                 {selectedApplicant.submissions && selectedApplicant.submissions.length > 0 ? (
//                                     selectedApplicant.submissions.map((submission, index) => (
//                                         <div
//                                             key={submission.id}
//                                             style={{
//                                                 marginBottom: '20px',
//                                                 padding: '10px',
//                                                 border: '1px solid #ccc',
//                                                 borderRadius: '5px',
//                                             }}
//                                         >
//                                             <div>
//                                                 <video width="100%" controls style={{ margin: '10px 0' }}>
//                                                     <source src={submission.demoVideoLink} type="video/mp4" />
//                                                     Your browser does not support the video tag.
//                                                 </video>
//                                             </div>
//                                             <a
//                                                 href={submission.liveDemoLink}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 style={{ color: '#007BFF', fontWeight: 'bold' }}
//                                             >
//                                                 Live Demo Link: Demo {index + 1}
//                                             </a>

//                                             <p>CSS Score: {submission.scores?.css || 'N/A'}</p>
//                                             <p>HTML Score: {submission.scores?.html || 'N/A'}</p>
//                                             <p>JavaScript Score: {submission.scores?.javascript || 'N/A'}</p>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p>No submissions available</p>
//                                 )}

//                             <h4>Send Email to Applicant</h4>
//                             <input
//                                 type="text"
//                                 placeholder="Email Subject"
//                                 value={emailSubject}
//                                 onChange={(e) => setEmailSubject(e.target.value)}
//                                 style={{
//                                     width: '100%',
//                                     padding: '10px',
//                                     marginBottom: '10px',
//                                     borderRadius: '5px',
//                                 }}
//                             />
//                                 <textarea
//                                 placeholder="Email Body"
//                                 value={emailBody}
//                                 onChange={(e) => setEmailBody(e.target.value)}
//                                 rows="4"
//                                 style={{
//                                     width: '100%',
//                                     padding: '10px',
//                                     borderRadius: '5px',
//                                     marginBottom: '10px',
//                                 }}
//                             />
//                                 <button
//                                 onClick={handleEmailSend}
//                                 style={{
//                                     padding: '10px 15px',
//                                     backgroundColor: '#007BFF',
//                                     color: '#fff',
//                                     border: 'none',
//                                     borderRadius: '5px',
//                                     cursor: 'pointer',
//                                 }}
//                             >
//                                 Send Email
//                             </button>

//                             <button
//                                 onClick={handleCloseApplicantModal}
//                                 style={{
//                                     padding: '10px 15px',
//                                     backgroundColor: '#DC3545',
//                                     color: '#fff',
//                                     border: 'none',
//                                     borderRadius: '5px',
//                                     cursor: 'pointer',
//                                     marginLeft: '10px',
//                                 }}
//                             >
//                                 Close
//                             </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             ) : (
//                 <p>Loading employer details...</p>
//             )}
//         </div>
//     );
// };

// export default EmployerProfile;

import React, { useState, useEffect } from "react";
import { db, auth, storage } from "../firebase";
import { doc, getDoc, updateDoc, collection, query, where, getDocs, deleteDoc, addDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onSnapshot } from "firebase/firestore";
import "../styles.css";
import { Link } from "react-router-dom";
import { FaUser, FaBriefcase, FaSearch, FaFileAlt, FaEye, FaBell, FaPlus, FaSignOutAlt } from "react-icons/fa";
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
const EmployerProfile = () => {
    const [employer, setEmployer] = useState(null);
    const [jobPosts, setJobPosts] = useState([]);
    const [applicants, setApplicants] = useState({});
    const [selectedJob, setSelectedJob] = useState(null);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [emailSubject, setEmailSubject] = useState("");
    const [emailBody, setEmailBody] = useState("");
    const [hiredApplicants, setHiredApplicants] = useState({});
    const [filterCriteria, setFilterCriteria] = useState("name");
    const [filterOrder, setFilterOrder] = useState("asc");
    const [showHiredApplicants, setShowHiredApplicants] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isHired, setUser] = useState()
    const [showReportForm, setShowReportForm] = useState(false);
    const [reportReason, setReportReason] = useState("");
    const [reportDetails, setReportDetails] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

       
const handleRemoveHiredEmployee = async (hiredEmployee, jobId) => {
  if (!hiredEmployee || !jobId) {
    console.error("No employee or job selected");
    return;
  }

  const confirmRemove = window.confirm(`Are you sure you want to remove ${hiredEmployee.name} from hired employees?`);
  
  if (confirmRemove) {
    try {
      // Get the employer's company name
      const employerRef = doc(db, "employers", auth.currentUser.uid);
      const employerDoc = await getDoc(employerRef);
      
      if (!employerDoc.exists()) {
        console.error("Employer document not found");
        alert("Error: Employer profile not found");
        return;
      }
      
      const employerData = employerDoc.data();
      const companyName = employerData.companyName;
      
      if (!companyName) {
        console.error("Company name not found in employer data");
        alert("Error: Company name not found in your profile");
        return;
      }
      
      // 1. Remove from the legacy structure first (if it exists there)
      const legacyHiredRef = doc(db, "employers", auth.currentUser.uid, "hired", jobId);
      const legacyHiredDoc = await getDoc(legacyHiredRef);
      
      if (legacyHiredDoc.exists()) {
        const currentHired = legacyHiredDoc.data().applicants || [];
        
        // Find the employee reference to be removed
        const employeeIndex = currentHired.findIndex(employee => 
          employee.id === hiredEmployee.id || 
          (employee.reference && employee.reference.includes(hiredEmployee.id))
        );
        
        if (employeeIndex !== -1) {
          // Save the removed reference data to deletedFiles collection
          await setDoc(doc(db, "deletedFiles", `removed-legacy-ref-${hiredEmployee.id}-${jobId}`), {
            originalPath: `employers/${auth.currentUser.uid}/hired/${jobId}`,
            removedReference: currentHired[employeeIndex],
            deletedAt: new Date().toISOString(),
            action: "removed_reference"
          });
          
          // Remove the reference from the array
          currentHired.splice(employeeIndex, 1);
          
          // Update the document with filtered array
          if (currentHired.length > 0) {
            await setDoc(legacyHiredRef, { 
              applicants: currentHired,
              jobId: jobId
            }, { merge: true });
          } else {
            // If no references left, delete the document
            await deleteDoc(legacyHiredRef);
          }
        }
      }
      
      // 2. Remove from the primary storage (company-based structure)
      const hiredEmployeeRef = doc(db, "companies", companyName, "jobs", jobId, "hired", hiredEmployee.id);
      const hiredEmployeeSnapshot = await getDoc(hiredEmployeeRef);
      
      if (hiredEmployeeSnapshot.exists()) {
        // Save the hired employee data to deletedFiles collection for recovery if needed
        await setDoc(doc(db, "deletedFiles", `removed-hire-${hiredEmployee.id}-${Date.now()}`), {
          originalPath: `companies/${companyName}/jobs/${jobId}/hired/${hiredEmployee.id}`,
          employeeData: hiredEmployeeSnapshot.data(),
          deletedAt: new Date().toISOString(),
          companyName: companyName,
          jobId: jobId,
          employeeId: hiredEmployee.id,
          action: "removed_hired_employee"
        });
        
        // Delete the document
        await deleteDoc(hiredEmployeeRef);
      } else {
        console.warn("Hired employee document not found in primary storage path");
      }
      
      // 3. Update local state
      setHiredApplicants(prev => ({
        ...prev,
        [jobId]: (prev[jobId] || []).filter(emp => emp.id !== hiredEmployee.id)
      }));
      
      alert(`${hiredEmployee.name} has been removed from hired employees.`);
      
    } catch (error) {
      console.error("Error removing hired employee:", error);
      alert("Failed to remove hired employee. Please try again.");
    }
  }
};

    useEffect(() => {
        if (selectedJob) {
            fetchHiredEmployees(selectedJob);
        }
    }, [selectedJob]);

    const fetchHiredEmployees = async (jobId, companyName) => {
    if (!jobId || !companyName) return;
    
    try {
        // Get reference to the hired collection for this job
        const hiredCollectionRef = collection(db, "companies", companyName, "jobs", jobId, "hired");
        const hiredSnapshot = await getDocs(hiredCollectionRef);
        
        if (!hiredSnapshot.empty) {
            // If there are hired applicants, collect their IDs
            const hiredApplicantsIds = hiredSnapshot.docs.map(doc => doc.id);
            
            // For each hired applicant, get their full details
            const hiredApplicantsData = await Promise.all(
                hiredApplicantsIds.map(async (applicantId) => {
                    const applicantRef = doc(db, "companies", companyName, "jobs", jobId, "hired", applicantId);
                    const applicantDoc = await getDoc(applicantRef);
                    if (applicantDoc.exists()) {
                        return { id: applicantId, ...applicantDoc.data() };
                    }
                    return null;
                })
            );
            
            // Filter out any null values and update state
            const validHiredApplicants = hiredApplicantsData.filter(Boolean);
            
            setHiredApplicants(prev => ({
                ...prev,
                [jobId]: validHiredApplicants
            }));
        } else {
            // No hired applicants for this job
            setHiredApplicants(prev => ({
                ...prev,
                [jobId]: []
            }));
        }
    } catch (error) {
        console.error("Error fetching hired employees:", error);
    }
};
    const [editedData, setEditedData] = useState({
        industry: "",
        location: "",
        description: "",
        phone: "",
        contactPerson: "",
    });
    const [profilePic, setProfilePic] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchEmployerData = async () => {
            if (auth.currentUser) {
                const employerRef = doc(db, "employers", auth.currentUser.uid);
                const employerSnap = await getDoc(employerRef);
                if (employerSnap.exists()) {
                    setEmployer(employerSnap.data());
                    setEditedData({
                        industry: employerSnap.data().industry,
                        location: employerSnap.data().location,
                        description: employerSnap.data().description,
                        phone: employerSnap.data().phone,
                        contactPerson: employerSnap.data().contactPerson || "",
                    });
                    setProfilePic(employerSnap.data().profilePic || "");
                } else {
                    console.log("No employer data found.");
                }
            }
        };

        const fetchJobPosts = async () => {
            if (auth.currentUser) {
                const jobsRef = collection(db, "jobs");
                const q = query(jobsRef, where("employerId", "==", auth.currentUser.uid));
                const querySnapshot = await getDocs(q);
                setJobPosts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            }
        };

        fetchEmployerData();
        fetchJobPosts();
    }, []);

    useEffect(() => {
    const unsubscribeMap = {};

    jobPosts.forEach((job) => {
        // Set up listener for applications
        const applicationsRef = collection(db, "jobs", job.id, "applications");

        // Listen for real-time changes to applications
        const unsubscribe = onSnapshot(applicationsRef, (snapshot) => {
            const applicantsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            setApplicants((prev) => ({
                ...prev,
                [job.id]: applicantsData,
            }));
        });

        unsubscribeMap[job.id] = unsubscribe;

        // Fetch hired applicants based on the data structure from your screenshot
        const fetchHiredApplicants = async () => {
            try {
                // First try the new structure from your screenshot
                // Path: /companies/{companyName}/jobs/{jobId}/hired/
                if (job.companyName) {
                    const newHiredRef = collection(db, "companies", job.companyName, "jobs", job.id, "hired");
                    const newHiredSnapshot = await getDocs(newHiredRef);
                    
                    if (!newHiredSnapshot.empty) {
                        // Map each hired applicant document to include its ID and data
                        const hiredApplicantsData = newHiredSnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        }));
                        
                        setHiredApplicants(prev => ({
                            ...prev,
                            [job.id]: hiredApplicantsData
                        }));
                        
                        // If we found applicants in the new structure, return early
                        return;
                    }
                }
                
                // Fall back to the existing structure if new structure had no results
                // Path: employers/{uid}/hired/{jobId}
                const hiredRef = collection(db, "employers", auth.currentUser.uid, "hired");
                const hiredDocRef = doc(hiredRef, job.id);
                const hiredDocSnap = await getDoc(hiredDocRef);
                
                if (hiredDocSnap.exists()) {
                    setHiredApplicants(prev => ({
                        ...prev,
                        [job.id]: hiredDocSnap.data().applicants || []
                    }));
                } else {
                    // Make sure we have an empty array if no hired applicants are found
                    setHiredApplicants(prev => ({
                        ...prev,
                        [job.id]: []
                    }));
                }
            } catch (error) {
                console.error("Error fetching hired applicants for job", job.id, ":", error);
                // Ensure we have an empty array even in case of error
                setHiredApplicants(prev => ({
                    ...prev,
                    [job.id]: []
                }));
            }
        };

        fetchHiredApplicants();
    });

    // Clean up listeners on unmount
    return () => {
        Object.values(unsubscribeMap).forEach((unsubscribe) => unsubscribe());
    };
}, [jobPosts]);

    const handleJobClick = (job) => {
        setSelectedJob(job.id);
        setShowHiredApplicants(false);
    };
    
    const handleApplicantClick = (applicant) => {
        setSelectedApplicant(applicant);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        if (auth.currentUser) {
            const employerRef = doc(db, "employers", auth.currentUser.uid);
            await updateDoc(employerRef, editedData);
            setEmployer((prev) => ({ ...prev, ...editedData }));
            setIsEditing(false);
        }
    };

    const handleProfilePicChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploading(true);
            const storageRef = ref(storage, `profile_pictures/${auth.currentUser.uid}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            setProfilePic(downloadURL);
            await updateDoc(doc(db, "employers", auth.currentUser.uid), { profilePic: downloadURL });

            setUploading(false);
        }
    };

    const handleDeleteJob = async (jobId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this job post?");
        if (confirmDelete) {
    // Get reference to the job document
    const jobRef = doc(db, "jobs", jobId);
    
    // Get the current job data before deleting
    const jobSnapshot = await getDoc(jobRef);
    
    if (jobSnapshot.exists()) {
        // Save the job data to deletedFiles collection
        await setDoc(doc(db, "deletedFiles", `deleted-job-${jobId}`), {
            originalPath: `jobs/${jobId}`,
            jobData: jobSnapshot.data(),
            deletedAt: serverTimestamp(),
            jobId: jobId
        });
        
        // Now delete the original job document
        await deleteDoc(jobRef);
        
        // Update the UI state to remove the deleted job
        setJobPosts((prev) => prev.filter((job) => job.id !== jobId));
        alert("Job post deleted successfully!");
    } else {
        console.error("Job document doesn't exist, cannot backup before deletion");
        alert("Error: Could not find job to delete");
    }
}
    };

    const handleCloseApplicantModal = () => {
        setSelectedApplicant(null);
    };

    const handleChange = (e) => {
        setEditedData({ ...editedData, [e.target.name]: e.target.value });
    };
    const handleAcceptSend = async (job) => {
        if (!selectedApplicant || !selectedJob || !employer) {
            console.error("Missing required data (applicant, job, or employer).");
            return;
        }

        try {
            // Reference to the applicant's notifications subcollection
            const notificationsRef = collection(db, "applicants", selectedApplicant.id, "notifications");
            const jobRef = doc(db, "jobs", selectedJob);

                // Then fetch the document
            const jobSnapshot = await getDoc(jobRef);

            const jobData = jobSnapshot.data();
            const jobTitle = jobData.title; // Now you can access title
               
            const emailbody = `Your job application for ${jobTitle} have been accepted`
            const emailsub = "Job Status"
            // Create the notification object with company name, email subject, and email body
            const newNotification = {
                jobId: selectedJob,
                companyName: employer.companyName,
                subject: emailsub,
                message: emailbody,
                timestamp: new Date(),
                status: "unread",
            };

            // Add the notification to Firestore
            await addDoc(notificationsRef, newNotification);

            console.log("Notification added successfully!");

            // Show success alert
            

            // Close the applicant submission modal
            setSelectedApplicant(null);
            
        } catch (error) {
            console.error("Error sending email or updating Firestore:", error);
            alert("Failed to send email. Please try again.");
        }
    };
    const handleRejectSend = async (job) => {
        if (!selectedApplicant || !selectedJob || !employer) {
            console.error("Missing required data (applicant, job, or employer).");
            return;
        }

        try {
            // Reference to the applicant's notifications subcollection
            const notificationsRef = collection(db, "applicants", selectedApplicant.id, "notifications");
             const jobRef = doc(db, "jobs", selectedJob);

                // Then fetch the document
                const jobSnapshot = await getDoc(jobRef);

               
                // Access the data
                const jobData = jobSnapshot.data();
                const jobTitle = jobData.title; // Now you can access title
               
            const emailbody = `Your job application for ${jobTitle} have been rejected`
            const emailsub = "Job Status"
            // Create the notification object with company name, email subject, and email body
            const newNotification = {
                jobId: selectedJob,
                companyName: employer.companyName,
                subject: emailsub,
                message: emailbody,
                timestamp: new Date(),
                status: "unread",
            };
            // Add the notification to Firestore
            await addDoc(notificationsRef, newNotification);

            console.log("Notification added successfully!");

            // Show success alert
            

            // Close the applicant submission modal
            setSelectedApplicant(null);
            
        } catch (error) {
            console.error("Error sending email or updating Firestore:", error);
            alert("Failed to send email. Please try again.");
        }
    };
    const handleEmailSend = async () => {
        if (!selectedApplicant || !selectedJob || !employer) {
            console.error("Missing required data (applicant, job, or employer).");
            return;
        }

        try {
            // Reference to the applicant's notifications subcollection
            const notificationsRef = collection(db, "applicants", selectedApplicant.id, "notifications");
           
            // Create the notification object with company name, email subject, and email body
            const newNotification = {
                jobId: selectedJob,
                companyName: employer.companyName,
                subject: emailSubject,
                message: emailBody,
                timestamp: new Date(),
                status: "unread",
            };

            // Add the notification to Firestore
            await addDoc(notificationsRef, newNotification);

            console.log("Notification added successfully!");

            // Show success alert
            alert("Email sent successfully!");

            // Close the applicant submission modal
            setSelectedApplicant(null);
            
        } catch (error) {
            console.error("Error sending email or updating Firestore:", error);
            alert("Failed to send email. Please try again.");
        }
    };

    // New functions for requirements
  const handleHireApplicant = async () => {
  if (!selectedApplicant || !selectedJob) {
    console.error("No applicant or job selected");
    return;
  }

  try {
    // Get the employer's company name
    const serverTimestamp = new Date().toISOString();
    const employerRef = doc(db, "employers", auth.currentUser.uid);
    const employerDoc = await getDoc(employerRef);
    
    if (!employerDoc.exists()) {
      console.error("Employer document not found");
      alert("Error: Employer profile not found");
      return;
    }
    
    const employerData = employerDoc.data();
    const companyName = employerData.companyName;
    
    if (!companyName) {
      console.error("Company name not found in employer data");
      alert("Error: Company name not found in your profile");
      return;
    }
    
    // PRIMARY STORAGE: company-based structure
    // 1. Ensure the company document exists
    const companyDocRef = doc(db, "companies", companyName);
    const companyDoc = await getDoc(companyDocRef);
    
    if (!companyDoc.exists()) {
      // Create the company document if it doesn't exist
      await setDoc(companyDocRef, {
        companyName: companyName,
        employerId: auth.currentUser.uid,
        createdAt: serverTimestamp
      });
    }
    
    // 2. Ensure the job document exists under this company
    const jobInCompanyRef = doc(db, "companies", companyName, "jobs", selectedJob);
    const jobInCompanyDoc = await getDoc(jobInCompanyRef);
    
    if (!jobInCompanyDoc.exists()) {
      // Get job data from the jobs collection
      const jobRef = doc(db, "jobs", selectedJob);
      const jobDoc = await getDoc(jobRef);
      
      if (jobDoc.exists()) {
        // Add job to the company's jobs collection
        await setDoc(jobInCompanyRef, {
          ...jobDoc.data(),
          companyName: companyName,
          employerId: auth.currentUser.uid,
          updatedAt: serverTimestamp
        });
      } else {
        // If job doesn't exist, create a minimal entry
        await setDoc(jobInCompanyRef, {
          id: selectedJob,
          companyName: companyName,
          employerId: auth.currentUser.uid,
          createdAt: serverTimestamp
        });
      }
    }
    
    // 3. Check if applicant is already hired
    const hiredApplicantRef = doc(db, "companies", companyName, "jobs", selectedJob, "hired", selectedApplicant.id);
    const hiredApplicantDoc = await getDoc(hiredApplicantRef);
    
    if (hiredApplicantDoc.exists()) {
      alert("This applicant has already been hired!");
      return;
    }
    
    // 4. Add the applicant to the hired subcollection under the job
    await setDoc(hiredApplicantRef, {
      ...selectedApplicant,
      jobId: selectedJob,
      companyName: companyName,
      employerId: auth.currentUser.uid,
      hiredAt: serverTimestamp
    });
    
    // 5. Create a REFERENCE in the legacy structure (instead of duplicating data)
    const originalHiredRef = doc(db, "employers", auth.currentUser.uid, "hired", selectedJob);
    
    // Get current hired applicants if they exist
    const originalHiredDoc = await getDoc(originalHiredRef);
    let currentHired = [];
    
    if (originalHiredDoc.exists()) {
      currentHired = originalHiredDoc.data().applicants || [];
    }
    
    // Add a reference to the applicant (storing ID only, not full data)
    currentHired.push({
      id: selectedApplicant.id,
      reference: `companies/${companyName}/jobs/${selectedJob}/hired/${selectedApplicant.id}`
    });
    
    // Update original Firestore location with reference
    await setDoc(originalHiredRef, { 
      applicants: currentHired,
      jobId: selectedJob
    }, { merge: true });
    
    // 6. Remove applicant from all jobs application collections where they've applied
    // First, handle the current job's applications collection
    const applicationRef = doc(db, "jobs", selectedJob, "applications", selectedApplicant.id);
    
    try {
      const applicationSnapshot = await getDoc(applicationRef);
      
      if (applicationSnapshot.exists()) {
        // Backup before deletion
        await setDoc(doc(db, "deletedFiles", `hired-applicant-${selectedApplicant.id}-job-${selectedJob}`), {
          originalPath: `jobs/${selectedJob}/applications/${selectedApplicant.id}`,
          applicantData: applicationSnapshot.data(),
          deletedAt: serverTimestamp,
          jobId: selectedJob,
          hiredReference: `companies/${companyName}/jobs/${selectedJob}/hired/${selectedApplicant.id}`
        });
        
        // Delete from the current job's applications
        await deleteDoc(applicationRef);
        console.log(`Removed applicant ${selectedApplicant.id} from job ${selectedJob}`);
      }
      
      // If you know the applicant might have applied to multiple jobs,
      // check if we need to remove them from any other job applications
      // This could be implemented different ways:
      
      // Option 1: If you have a record of which jobs they've applied to:
      if (selectedApplicant.appliedJobs && Array.isArray(selectedApplicant.appliedJobs)) {
        for (const jobId of selectedApplicant.appliedJobs) {
          if (jobId !== selectedJob) { // Skip the one we already handled
            const otherJobAppRef = doc(db, "jobs", jobId, "applications", selectedApplicant.id);
            const otherAppSnapshot = await getDoc(otherJobAppRef);
            
            if (otherAppSnapshot.exists()) {
              // Backup before deletion
              await setDoc(doc(db, "deletedFiles", `hired-applicant-${selectedApplicant.id}-job-${jobId}`), {
                originalPath: `jobs/${jobId}/applications/${selectedApplicant.id}`,
                applicantData: otherAppSnapshot.data(),
                deletedAt: serverTimestamp,
                originalJobId: jobId,
                hiredJobId: selectedJob,
                hiredReference: `companies/${companyName}/jobs/${selectedJob}/hired/${selectedApplicant.id}`
              });
              
              // Delete from the other job's applications
              await deleteDoc(otherJobAppRef);
              console.log(`Removed applicant ${selectedApplicant.id} from job ${jobId}`);
            }
          }
        }
      }

      // Option 2: If you have a specific job ID that you know needs to be checked
      // (using the specific path you mentioned)
      const specificJobId = "job_1746972169732";
      if (specificJobId !== selectedJob) { // Only if it's different from the current job
        const specificPathRef = doc(db, "jobs", specificJobId, "applications", selectedApplicant.id);
        const specificDoc = await getDoc(specificPathRef);
        
        if (specificDoc.exists()) {
          // Backup before deletion
          await setDoc(doc(db, "deletedFiles", `hired-applicant-${selectedApplicant.id}-job-${specificJobId}`), {
            originalPath: `jobs/${specificJobId}/applications/${selectedApplicant.id}`,
            applicantData: specificDoc.data(),
            deletedAt: serverTimestamp,
            originalJobId: specificJobId,
            hiredJobId: selectedJob,
            hiredReference: `companies/${companyName}/jobs/${selectedJob}/hired/${selectedApplicant.id}`
          });
          
          // Delete from the specific job's applications
          await deleteDoc(specificPathRef);
          console.log(`Removed applicant ${selectedApplicant.id} from job ${specificJobId}`);
        }
      }
      
    } catch (error) {
      console.error("Error removing applicant from job applications:", error);
      // Continue with the hiring process even if removal fails
    }
    
    // 7. Update local state
    setHiredApplicants(prev => ({
      ...prev,
      [selectedJob]: [...(prev[selectedJob] || []), selectedApplicant]
    }));
    
    alert(`${selectedApplicant.name} has been hired!`);
    setSelectedApplicant(null);
    
  } catch (error) {
    console.error("Error hiring applicant:", error);
    alert("Failed to hire applicant. Please try again.");
  }
};
    // const handleHireApplicant = async () => {
    //     if (!selectedApplicant || !selectedJob) {
    //         console.error("No applicant or job selected");
    //         return;
    //     }
    
    //     try {
    //         // Add to hired applicants subcollection
    //         const hiredRef = doc(db, "employers", auth.currentUser.uid, "hired", selectedJob);
            
    //         // Get current hired applicants if they exist
    //         const hiredDoc = await getDoc(hiredRef);
    //         let currentHired = [];
    
    //         if (hiredDoc.exists()) {
    //             currentHired = hiredDoc.data().applicants || [];
    //         }
    
    //         // Check if applicant is already hired
    //         if (!currentHired.some(app => app.id === selectedApplicant.id)) {
    //             currentHired.push(selectedApplicant);
    
    //             // Update Firestore: Add to 'hired'
    //             await setDoc(hiredRef, { applicants: currentHired }, { merge: true });
    
    //             // ✅ Delete applicant from jobs/{jobId}/applications
    //             const applicantRef = doc(db, "jobs", selectedJob, "applications", selectedApplicant.id);
    //             await deleteDoc(applicantRef);
    
    //             // Update local state
    //             setHiredApplicants(prev => ({
    //                 ...prev,
    //                 [selectedJob]: [...(prev[selectedJob] || []), selectedApplicant]
    //             }));
    
    //             alert(`${selectedApplicant.name} has been hired!`);
    //             setSelectedApplicant(null);
    //         } else {
    //             alert("This applicant has already been hired!");
    //         }
    //     } catch (error) {
    //         console.error("Error hiring applicant:", error);
    //         alert("Failed to hire applicant. Please try again.");
    //     }
    // };
    
    // onClick={() => handleRemoveHiredEmployee(employee, selectedJob)}
    const handleRejectApplicant = async (employee, selectedJob) => {
        if (!selectedApplicant || !selectedJob) {
            console.error("No applicant or job selected");
            return;
        }

        const confirmReject = window.confirm(`Are you sure you want to reject ${selectedApplicant.name}?`);
        if (confirmReject) {
            try {

                if (isHired == true){
                    handleRemoveHiredEmployee(employee, selectedJob)
                    return;
                }
                else {
                    // Delete from applications subcollection
                // First, get the reference to the document that will be deleted
                    const applicationRef = doc(db, "jobs", selectedJob, "applications", selectedApplicant.id);

                    // Get the current data from the document before deleting it
                    const applicationSnapshot = await getDoc(applicationRef);

                    if (applicationSnapshot.exists()) {
                    // Add the data to the deletedFiles collection with a reference to the rejected applicant
                    await setDoc(doc(db, "deletedFiles", `rejected-applicant-${selectedApplicant.id}`), {
                        originalPath: `jobs/${selectedJob}/applications/${selectedApplicant.id}`,
                        applicantData: applicationSnapshot.data(),
                        deletedAt: serverTimestamp(),
                        jobId: selectedJob
                    });
                    
                    // Now delete the original document
                    await deleteDoc(applicationRef);
                    } else {
                    console.error("Application document doesn't exist, cannot backup before deletion");
                    }
                
                // Update local state
                setApplicants(prev => ({
                    ...prev,
                    [selectedJob]: prev[selectedJob].filter(app => app.id !== selectedApplicant.id)
                }));
                
                alert(`${selectedApplicant.name} has been rejected.`);
                setSelectedApplicant(null);
                }
                
            } catch (error) {
                console.error("Error rejecting applicant:", error);
                alert("Failed to reject applicant. Please try again.");
            }
        }
    };

    

    const handleCloseJob = async (jobId) => {
        const confirmClose = window.confirm("Are you sure you want to close this job post? It will no longer be visible to applicants.");
        if (confirmClose) {
            try {
                await updateDoc(doc(db, "jobs", jobId), { status: "closed" });
                
                // Update local state
                setJobPosts(prev => prev.map(job => 
                    job.id === jobId ? { ...job, status: "closed" } : job
                ));
                
                alert("Job post has been closed.");
            } catch (error) {
                console.error("Error closing job:", error);
                alert("Failed to close job. Please try again.");
            }
        }
    };
    const handleOpenJob = async (jobId) => {
        const confirmOpen = window.confirm("Are you sure you want to open this job post? It will be visible to applicants.");
        if (confirmOpen) {
            try {
                await updateDoc(doc(db, "jobs", jobId), { status: "open" });
                
                // Update local state
                setJobPosts(prev => prev.map(job => 
                    job.id === jobId ? { ...job, status: "open" } : job
                ));
                
                alert("Job post has been opened.");
            } catch (error) {
                console.error("Error closing job:", error);
                alert("Failed to close job. Please try again.");
            }
        }
    };

    const toggleHiredApplicants = (jobId) => {
        setSelectedJob(jobId);
        setShowHiredApplicants(!showHiredApplicants);
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
    
    // Create the report in a new collection
    const reportsRef = collection(db, "job_reports");
    await addDoc(reportsRef, {
      applicantId: selectedApplicant.id,
      applicantName: selectedApplicant.name,
      applicantEmail: selectedApplicant.email,
      jobId: selectedJob,
      jobTitle: jobPosts.find(job => job.id === selectedJob)?.title || "Unknown Job",
      reportedBy: employerId,
      reporterName: employerData.companyName || "Anonymous Employer",
      reporterEmail: employerData.email || "No email provided",
      reason: reportReason,
      details: reportDetails,
      status: "pending", // pending, reviewed, resolved
      createdAt: serverTimestamp(),
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
    const toggleReportForm = (e) => {
      e.stopPropagation();
      setShowReportForm(!showReportForm);
    };
    // Report form JSX
    const reportForm = (
      <div 
        style={{
          marginTop: "20px",
          padding: "16px",
          border: "1px solid #eee",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h3 style={{ marginTop: 0, color: "#d32f2f" }}>Report Job Listing</h3>
        <form onSubmit={handleReportApplicant}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
              Reason for Report:*
            </label>
            <select
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
              required
            >
              <option value="">-- Select a reason --</option>
              <option value="Discriminatory content">Discriminatory content</option>
              <option value="Misleading information">Misleading information</option>
              <option value="Inappropriate salary/compensation">Inappropriate salary/compensation</option>
              <option value="Scam/Fraud">Scam or fraudulent posting</option>
              <option value="Duplicate posting">Duplicate posting</option>
              <option value="Unprofessional language">Unprofessional language</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
              Details:*
            </label>
            <textarea
              value={reportDetails}
              onChange={(e) => setReportDetails(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                minHeight: "100px",
                resize: "vertical",
              }}
              placeholder="Please provide specific details about the violation..."
              required
            />
          </div>
          
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: "#d32f2f",
                color: "#fff",
                padding: "10px 16px",
                borderRadius: "4px",
                border: "none",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </button>
            
            <button
              type="button"
              onClick={toggleReportForm}
              style={{
                backgroundColor: "#757575",
                color: "#fff",
                padding: "10px 16px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );

    const getSortedApplicants = (jobId) => {
        if (!applicants[jobId]) return [];
        
        return [...applicants[jobId]].sort((a, b) => {
            if (filterCriteria === "name") {
                return filterOrder === "asc" 
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            }
            // Add more sorting criteria as needed
            return 0;
        });
    };
    const ApplicantDetailsModal = ({ cert, onClose }) => {
  if (!cert) return null;
    
  return (
    <AnimatedGroup 
            className="my-12 space-y-6 bg-gray-50 p-6 rounded-lg shadow-md"
            baseDelay={0.2}  // Start delay (seconds)
            delayIncrement={0.15}  // Each child adds this much delay
          >
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '400px'
      }}>
        <h4>Certification Details</h4>
        <p><strong>Name:</strong> {cert.name}</p>
        <p><strong>Issuer:</strong> {cert.issuer}</p>
        <p><strong>Issue Date:</strong> {cert.issueDate}</p>
        <p><strong>Expiry Date:</strong> {cert.expiryDate}</p>
        <p><strong>Credential ID:</strong> {cert.credentialID}</p>
        {cert.imageURL && (
          <img
            src={cert.imageURL}
            alt="cert"
            style={{ maxWidth: "100%", marginTop: "10px", borderRadius: "5px" }}
          />
        )}
        <button onClick={onClose} style={{ marginTop: '15px' }}>Close</button>
      </div>
    </div>
    </AnimatedGroup>
  );
};

      
      
    return (
        <AnimatedGroup 
                className="my-12 space-y-6 bg-gray-50 p-6 rounded-lg shadow-md"
                baseDelay={0.2}  // Start delay (seconds)
                delayIncrement={0.15}  // Each child adds this much delay
              >
        <div className="employer-profile" style={{ 
            maxWidth: "1200px", 
            margin: "0 auto", 
            padding: "20px", 
            fontFamily: "Arial, sans-serif" 
        }}>
            <h2 style={{ 
                marginTop: "20px", 
                color: "#333", 
                textAlign: "center",
                fontSize: "28px",
                fontWeight: "600",
                marginBottom: "30px",
                marginTop:"5%" 
            }}>Employer Dashboard</h2>

            {employer ? (
                <div className="profile-container" style={{ 
                    display: "flex", 
                    flexWrap: "wrap", 
                    gap: "30px" 
                }}>
                    {/* Profile Section */}
                    <div className="profile-details" style={{ 
                        flex: "1", 
                        minWidth: "300px", 
                        backgroundColor: "#fff", 
                        borderRadius: "10px", 
                        padding: "25px", 
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)" 
                    }}>
                        <div style={{ 
                            display: "flex", 
                            alignItems: "center", 
                            marginBottom: "20px" 
                        }}>
                            <div className="profile-picture" style={{ 
                                position: "relative", 
                                marginRight: "20px" 
                            }}>
                                <label htmlFor="profile-pic-upload" style={{ cursor: "pointer" }}>
                                    <div style={{
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: "50%",
                                        overflow: "hidden",
                                        border: "3px solid #3498db",
                                        position: "relative"
                                    }}>
                                        <img 
                                            src={profilePic || "/default-profile.png"} 
                                            alt="Profile" 
                                            style={{ 
                                                width: "100%", 
                                                height: "100%", 
                                                objectFit: "cover" 
                                            }} 
                                        />
                                        {uploading && (
                                            <div style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: "100%",
                                                height: "100%",
                                                backgroundColor: "rgba(0,0,0,0.5)",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                color: "#fff"
                                            }}>
                                                Uploading...
                                            </div>
                                        )}
                                    </div>
                                    <div style={{
                                        position: "absolute",
                                        bottom: "0",
                                        right: "0",
                                        backgroundColor: "#3498db",
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "50%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: "#fff",
                                        fontSize: "18px"
                                    }}>
                                        +
                                    </div>
                                </label>
                                <input 
                                    type="file" 
                                    id="profile-pic-upload" 
                                    style={{ display: "none" }} 
                                    onChange={handleProfilePicChange} 
                                />
                            </div>
                            <div>
                                <h3 style={{ 
                                    fontSize: "24px", 
                                    fontWeight: "600", 
                                    color: "#333", 
                                    margin: "0 0 5px 0" 
                                }}>
                                    {employer.companyName}
                                </h3>
                                <div style={{ 
                                    display: "flex", 
                                    alignItems: "center", 
                                    color: "#666" 
                                }}>
                                    <span style={{ marginRight: "10px" }}>
                                        {employer.industry}
                                    </span>
                                    •
                                    <span style={{ marginLeft: "10px" }}>
                                        {employer.location}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <h4 style={{ 
                                fontSize: "18px", 
                                fontWeight: "600", 
                                color: "#333", 
                                marginBottom: "10px",
                                paddingBottom: "5px",
                                borderBottom: "1px solid #eee"
                            }}>
                                Company Details
                            </h4>
                            
                            <div style={{ marginBottom: "10px" }}>
                                <div style={{ fontWeight: "600", marginBottom: "3px" }}>Industry:</div>
                                {isEditing ? (
                                    <input 
                                        type="text" 
                                        name="industry" 
                                        value={editedData.industry} 
                                        onChange={handleChange} 
                                        style={{ 
                                            width: "100%", 
                                            padding: "8px", 
                                            borderRadius: "5px", 
                                            border: "1px solid #ddd" 
                                        }} 
                                    />
                                ) : (
                                    <div>{employer.industry}</div>
                                )}
                            </div>
                            
                            <div style={{ marginBottom: "10px" }}>
                                <div style={{ fontWeight: "600", marginBottom: "3px" }}>Location:</div>
                                {isEditing ? (
                                    <input 
                                        type="text" 
                                        name="location" 
                                        value={editedData.location} 
                                        onChange={handleChange} 
                                        style={{ 
                                            width: "100%", 
                                            padding: "8px", 
                                            borderRadius: "5px", 
                                            border: "1px solid #ddd" 
                                        }} 
                                    />
                                ) : (
                                    <div>{employer.location}</div>
                                )}
                            </div>
                            
                            <div style={{ marginBottom: "10px" }}>
                                <div style={{ fontWeight: "600", marginBottom: "3px" }}>Description:</div>
                                {isEditing ? (
                                    <textarea 
                                        name="description" 
                                        value={editedData.description} 
                                        onChange={handleChange} 
                                        style={{ 
                                            width: "100%", 
                                            padding: "8px", 
                                            borderRadius: "5px", 
                                            border: "1px solid #ddd",
                                            minHeight: "100px",
                                            resize: "vertical"
                                        }} 
                                    />
                                ) : (
                                    <div style={{ 
                                        lineHeight: "1.5",
                                        color: "#555" 
                                    }}>{employer.description}</div>
                                )}
                            </div>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <h4 style={{ 
                                fontSize: "18px", 
                                fontWeight: "600", 
                                color: "#333", 
                                marginBottom: "10px",
                                paddingBottom: "5px",
                                borderBottom: "1px solid #eee"
                            }}>
                                Contact Information
                            </h4>
                            
                            <div style={{ marginBottom: "10px" }}>
                                <div style={{ fontWeight: "600", marginBottom: "3px" }}>Contact Person:</div>
                                {isEditing ? (
                                    <input 
                                        type="text" 
                                        name="contactPerson" 
                                        value={editedData.contactPerson} 
                                        onChange={handleChange} 
                                        style={{ 
                                            width: "100%", 
                                            padding: "8px", 
                                            borderRadius: "5px", 
                                            border: "1px solid #ddd" 
                                        }} 
                                    />
                                ) : (
                                    <div>{employer.contactPerson || "Not specified"}</div>
                                )}
                            </div>
                            
                            <div style={{ marginBottom: "10px" }}>
                                <div style={{ fontWeight: "600", marginBottom: "3px" }}>Email:</div>
                                <div>{employer.email}</div>
                            </div>
                            
                            <div style={{ marginBottom: "10px" }}>
                                <div style={{ fontWeight: "600", marginBottom: "3px" }}>Phone:</div>
                                {isEditing ? (
                                    <input 
                                        type="text" 
                                        name="phone" 
                                        value={editedData.phone} 
                                        onChange={handleChange} 
                                        style={{ 
                                            width: "100%", 
                                            padding: "8px", 
                                            borderRadius: "5px", 
                                            border: "1px solid #ddd" 
                                        }} 
                                    />
                                ) : (
                                    <div>{employer.phone}</div>
                                )}
                            </div>
                        </div>

                        {isEditing ? (
                            <button 
                                className="save-btn" 
                                onClick={handleSaveClick}
                                style={{
                                    backgroundColor: "#2ecc71",
                                    color: "#fff",
                                    border: "none",
                                    padding: "10px 15px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                    width: "100%",
                                    fontSize: "16px"
                                }}
                            >
                                Save Changes
                            </button>
                        ) : (
                            <button 
                                className="edit-btn" 
                                onClick={handleEditClick}
                                style={{
                                    backgroundColor: "#3498db",
                                    color: "#fff",
                                    border: "none",
                                    padding: "10px 15px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                    width: "100%",
                                    fontSize: "16px"
                                }}
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {/* Jobs Section */}
                    <div className="jobs-section" style={{ 
                        flex: "2", 
                        minWidth: "400px", 
                        backgroundColor: "#fff", 
                        borderRadius: "10px", 
                        padding: "25px", 
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)" 
                    }}>
                        <h3 style={{ 
                            fontSize: "22px", 
                            fontWeight: "600", 
                            color: "#333", 
                            marginBottom: "20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <span>Active Job Listings</span>
                            {/* <a href="/employer/post-job" style={{
                                fontSize: "14px",
                                backgroundColor: "#3498db",
                                color: "#fff",
                                textDecoration: "none",
                                padding: "8px 15px",
                                borderRadius: "5px",
                                display: "inline-block"
                            }}>
                                + Post New Job
                            </a> */}
                            <Link to="/employer/post-job" style={{
                                fontSize: "14px",
                                backgroundColor: "#3498db",
                                color: "#fff",
                                textDecoration: "none",
                                padding: "5px 15px",
                                borderRadius: "5px",
                                display: "inline-block"
                            }}>
                                                {/* <FaUser /> */}
                                                <span>+ Post New Job</span>
                                              </Link>
                        </h3>

                        {jobPosts.length > 0 ? (
                            <ul className="job-list" style={{ 
                                listStyle: "none", 
                                padding: "0", 
                                margin: "0" 
                            }}>
                                {jobPosts.map((job) => (
                                    <li 
                                        key={job.id} 
                                        className="job-card" 
                                        style={{ 
                                            marginBottom: "20px", 
                                            backgroundColor: "#f9f9f9", 
                                            borderRadius: "8px", 
                                            padding: "20px", 
                                            borderLeft: job.status === "closed" ? "4px solid #e74c3c" : "4px solid #3498db" 
                                        }}
                                    >
                                        <div style={{ marginBottom: "15px", display: "flex", justifyContent: "space-between" }}>
                                            <h4 style={{ 
                                                margin: "0", 
                                                fontSize: "18px", 
                                                fontWeight: "600",
                                                color: "#333"
                                            }}>
                                                {job.title} 
                                                {job.status === "closed" && (
                                                    <span style={{ 
                                                        color: "#e74c3c", 
                                                        fontSize: "14px", 
                                                        fontWeight: "normal", 
                                                        marginLeft: "10px",
                                                        padding: "3px 8px",
                                                        backgroundColor: "#fde2e2",
                                                        borderRadius: "4px"
                                                    }}>
                                                        Closed
                                                    </span>
                                                )}
                                                {job.status === "open" && (
                                                    <span style={{ 
                                                        color: "white", 
                                                        fontSize: "14px", 
                                                        fontWeight: "normal", 
                                                        marginLeft: "10px",
                                                        padding: "3px 8px",
                                                        backgroundColor: "#73f071",
                                                        borderRadius: "4px"
                                                    }}>
                                                        Active
                                                    </span>
                                                )}
                                            </h4>
                                            <div style={{ display: "flex", gap: "10px" }}>
                                                <button 
                                                    onClick={() => handleCloseJob(job.id)} 
                                                    disabled={job.status === "closed"}
                                                    style={{
                                                        padding: "5px 10px",
                                                        backgroundColor: job.status === "closed" ? "#ccc" : "#e74c3c",
                                                        color: "#fff",
                                                        border: "none",
                                                        borderRadius: "4px",
                                                        cursor: job.status === "closed" ? "not-allowed" : "pointer",
                                                        fontSize: "12px"
                                                    }}
                                                >
                                                    Close Job
                                                </button>
                                                  <button 
                                                    onClick={() => handleOpenJob(job.id)} 
                                                    disabled={job.status != "closed"}
                                                    style={{
                                                        padding: "5px 10px",
                                                        backgroundColor: job.status === "closed" ? "#2ecc71" : "#cccccc",
                                                        color: "#fff",
                                                        border: "none",
                                                        borderRadius: "4px",    
                                                        cursor: job.status === "closed" ? "pointer" : "not-allowed",
                                                        fontSize: "12px"
                                                    }}
                                                >
                                                    Open Job
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteJob(job.id)}
                                                    style={{
                                                        padding: "5px 10px",
                                                        backgroundColor: "#7f8c8d",
                                                        color: "#fff",
                                                        border: "none",
                                                        borderRadius: "4px",
                                                        cursor: "pointer",
                                                        fontSize: "12px"
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div style={{ 
                                            display: "flex", 
                                            alignItems: "center", 
                                            marginBottom: "10px",
                                            color: "#666",
                                            fontSize: "14px"
                                        }}>
                                            <span style={{ marginRight: "15px" }}>
                                                📍 {job.location}
                                            </span>
                                            {job.salary && (
                                                <span>
                                                    💰 {job.salary}
                                                </span>
                                            )}
                                        </div>
                                        
                                        <p style={{ 
                                            margin: "0 0 15px 0", 
                                            color: "#555",
                                            fontSize: "14px",
                                            lineHeight: "1.5"
                                        }}>
                                            {job.description?.length > 150 
                                                ? `${job.description.substring(0, 150)}...` 
                                                : job.description}
                                        </p>
                                        
                                        <div className="job-stats" style={{ 
                                            display: "flex", 
                                            marginBottom: "15px",
                                            fontSize: "13px"
                                        }}>
                                            <div style={{ 
                                                marginRight: "15px", 
                                                backgroundColor: "#eaf2fd", 
                                                padding: "5px 10px", 
                                                borderRadius: "4px", 
                                                color: "#3498db" 
                                            }}>
                                                👥 {applicants[job.id]?.length || 0} Applicants
                                            </div>
                                            <div style={{ 
                                                backgroundColor: "#e2f7eb", 
                                                padding: "5px 10px", 
                                                borderRadius: "4px", 
                                                color: "#27ae60" 
                                            }}>
                                                ✅ {hiredApplicants[job.id]?.length || 0} Hired
                                            </div>
                                        </div>

                                        <div className="job-buttons" style={{ 
                                            display: "flex", 
                                            gap: "10px",
                                            flexWrap: "wrap" 
                                        }}>
                                            <button 
                                                onClick={() => {
                                                    handleJobClick(job);
                                                    setUser(false);
                                                } }
                                                style={{
                                                    padding: "8px 12px",
                                                    backgroundColor: selectedJob === job.id && !showHiredApplicants ? "#2c3e50" : "#3498db",
                                                    color: "#fff",
                                                    border: "none",
                                                    borderRadius: "4px",
                                                    cursor: "pointer",
                                                    flex: "1"
                                                }}
                                            >
                                                View Applicants
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    toggleHiredApplicants(job.id);
                                                    setUser(true);
                                                  }}
                                                style={{
                                                    padding: "8px 12px",
                                                    backgroundColor: showHiredApplicants && selectedJob === job.id ? "#2c3e50" : "#2ecc71",
                                                    color: "#fff",
                                                    border: "none",
                                                    borderRadius: "4px",
                                                    cursor: "pointer",
                                                    flex: "1"
                                                }}
                                            >
                                                View Hired
                                            </button>
                                            
                                        </div>

                                        {selectedJob === job.id && !showHiredApplicants && (
                                            <div id="JOBlist" style={{ 
                                                marginTop: "15px", 
                                                backgroundColor: "#fff",
                                                borderRadius: "6px",
                                                padding: "15px",
                                                border: "1px solid #e1e1e1"
                                            }}>
                                                <div style={{ 
                                                    display: "flex", 
                                                    justifyContent: "space-between", 
                                                    alignItems: "center",
                                                    marginBottom: "15px" 
                                                }}>
                                                    <h5 style={{ 
                                                        margin: "0", 
                                                        fontSize: "16px", 
                                                        fontWeight: "600",
                                                        color: "#333"
                                                    }}>
                                                        Applicants ({applicants[job.id]?.length || 0})
                                                    </h5>
                                                    <div className="filter-controls" style={{ 
                                                        display: "flex", 
                                                        gap: "10px",
                                                        alignItems: "center" 
                                                    }}>
                                                        <select 
                                                            value={filterCriteria}
                                                            onChange={(e) => setFilterCriteria(e.target.value)}
                                                            style={{
                                                                padding: "6px",
                                                                borderRadius: "4px",
                                                                border: "1px solid #ddd",
                                                                fontSize: "13px"
                                                            }}
                                                        >
                                                            <option value="name">Name</option>
                                                            {/* Add more filter options as needed */}
                                                        </select>
                                                        <select 
                                                            value={filterOrder}
                                                            onChange={(e) => setFilterOrder(e.target.value)}
                                                            style={{
                                                                padding: "6px",
                                                                borderRadius: "4px",
                                                                border: "1px solid #ddd",
                                                                fontSize: "13px"
                                                            }}
                                                        >
                                                            <option value="asc">A-Z</option>
                                                            <option value="desc">Z-A</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div style={{
                                                    maxHeight: '300px',
                                                    overflowY: 'auto',
                                                    borderRadius: '6px',
                                                }} className="applicant-list">
                                                    {applicants[job.id] && applicants[job.id].length > 0 ? (
                                                        getSortedApplicants(job.id).map((applicant) => (
                                                            <div
                                                                key={applicant.id}
                                                                style={{
                                                                    padding: '15px',
                                                                    marginBottom: '10px',
                                                                    backgroundColor: '#f9f9f9',
                                                                    borderRadius: '6px',
                                                                    cursor: 'pointer',
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center',
                                                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                                                    border: '1px solid #eee',
                                                                    ":hover": {
                                                                        transform: 'translateY(-2px)',
                                                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                                                    }
                                                                }}
                                                            >
                                                                <div style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    flex: '1'
                                                                }}>
                                                                    {applicant.profilePicURL ? (
                                                                        <img 
                                                                            src={applicant.profilePicURL} 
                                                                            alt={applicant.name} 
                                                                            style={{
                                                                                width: '40px',
                                                                                height: '40px',
                                                                                borderRadius: '50%',
                                                                                objectFit: 'cover',
                                                                                marginRight: '15px',
                                                                                border: '2px solid #3498db'
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <div style={{
                                                                            width: '40px',
                                                                            height: '40px',
                                                                            borderRadius: '50%',
                                                                            backgroundColor: '#3498db',
                                                                            display: 'flex',
                                                                            justifyContent: 'center',
                                                                            alignItems: 'center',
                                                                            color: '#fff',
                                                                            fontWeight: 'bold',
                                                                            marginRight: '15px',
                                                                            fontSize: '16px'
                                                                        }}>
                                                                            {applicant.name ? applicant.name[0].toUpperCase() : 'A'}
                                                                        </div>
                                                                    )}
                                                                    <div>
                                                                        <div style={{
                                                                            fontWeight: '600',
                                                                            fontSize: '15px',
                                                                            color: '#333',
                                                                            marginBottom: '3px'
                                                                        }}>{applicant.name}</div>
                                                                        <div style={{
                                                                            fontSize: '13px',
                                                                            color: '#666'
                                                                        }}>{applicant.email}</div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <button 
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleApplicantClick(applicant);
                                                                        }}
                                                                        style={{
                                                                            padding: '6px 12px',
                                                                            backgroundColor: '#3498db',
                                                                            color: '#fff',
                                                                            border: 'none',
                                                                            borderRadius: '4px',
                                                                            cursor: 'pointer',
                                                                            fontSize: '13px',
                                                                            fontWeight: '600'
                                                                        }}
                                                                    >
                                                                        View Details
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div style={{
                                                            padding: '20px',
                                                            textAlign: 'center',
                                                            color: '#777',
                                                            backgroundColor: '#f9f9f9',
                                                            borderRadius: '6px',
                                                            border: '1px dashed #ddd'
                                                        }}>
                                                            <div style={{ fontSize: '24px', marginBottom: '10px' }}>👥</div>
                                                            <p style={{ margin: '0' }}>No applicants for this position yet.</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {selectedJob === job.id && showHiredApplicants && (
                                            <div id="HiredList" style={{ 
                                                marginTop: '15px', 
                                                backgroundColor: '#fff',
                                                borderRadius: '6px',
                                                padding: '15px',
                                                border: '1px solid #e1e1e1'
                                            }}>
                                                <h5 style={{ 
                                                    margin: '0 0 15px 0', 
                                                    fontSize: '16px', 
                                                    fontWeight: '600',
                                                    color: '#333'
                                                }}>
                                                    Hired Applicants ({hiredApplicants[job.id]?.length || 0})
                                                </h5>
                                                <div style={{
                                                    maxHeight: '300px',
                                                    overflowY: 'auto',
                                                    borderRadius: '6px',
                                                }} className="hired-applicant-list">
                                                    {hiredApplicants[job.id] && hiredApplicants[job.id].length > 0 ? (
                                                        hiredApplicants[job.id].map((applicant) => (
                                                            <div
                                                                key={applicant.id}
                                                                style={{
                                                                    padding: '15px',
                                                                    marginBottom: '10px',
                                                                    backgroundColor: '#e6ffe6',
                                                                    border: '1px solid #c1e7c1',
                                                                    borderRadius: '6px',
                                                                    cursor: 'pointer',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                                                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                                                                    ":hover": {
                                                                        transform: 'translateY(-2px)',
                                                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                                                    }
                                                                }}
                                                                onClick={() => handleApplicantClick(applicant)}
                                                            >
                                                                {applicant.profilePicURL ? (
                                                                    <img 
                                                                        src={applicant.profilePicURL} 
                                                                        alt={applicant.name} 
                                                                        style={{
                                                                            width: '40px',
                                                                            height: '40px',
                                                                            borderRadius: '50%',
                                                                            objectFit: 'cover',
                                                                            marginRight: '15px',
                                                                            border: '2px solid #27ae60'
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <div style={{
                                                                        width: '40px',
                                                                        height: '40px',
                                                                        borderRadius: '50%',
                                                                        backgroundColor: '#27ae60',
                                                                        display: 'flex',
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        color: '#fff',
                                                                        fontWeight: 'bold',
                                                                        marginRight: '15px',
                                                                        fontSize: '16px'
                                                                    }}>
                                                                        {applicant.name ? applicant.name[0].toUpperCase() : 'A'}
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <div style={{
                                                                        fontWeight: '600',
                                                                        fontSize: '15px',
                                                                        color: '#333',
                                                                        marginBottom: '3px'
                                                                    }}>{applicant.name}</div>
                                                                    <div style={{
                                                                        fontSize: '13px',
                                                                        color: '#666'
                                                                    }}>{applicant.email}</div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div style={{
                                                            padding: '20px',
                                                            textAlign: 'center',
                                                            color: '#777',
                                                            backgroundColor: '#f9f9f9',
                                                            borderRadius: '6px',
                                                            border: '1px dashed #ddd'
                                                        }}>
                                                            <div style={{ fontSize: '24px', marginBottom: '10px' }}>✅</div>
                                                            <p style={{ margin: '0' }}>No hired applicants for this position yet.</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div style={{
                                padding: '30px',
                                textAlign: 'center',
                                backgroundColor: '#f9f9f9',
                                borderRadius: '8px',
                                border: '1px dashed #ddd'
                            }}>
                                <div style={{ fontSize: '32px', marginBottom: '15px' }}>📋</div>
                                <p style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#555' }}>You haven't posted any jobs yet.</p>
                                {/* <a href="/post-job" style={{
                                    backgroundColor: '#3498db',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    display: 'inline-block',
                                    fontWeight: '600'
                                }}>
                                    Post Your First Job
                                </a> */}
                                <Link to="/employer/post-job" style={{
                                fontSize: "14px",
                                backgroundColor: "#3498db",
                                color: "#fff",
                                textDecoration: "none",
                                padding: "5px 15px",
                                borderRadius: "5px",
                                display: "inline-block"
                            }}>
                                                {/* <FaUser /> */}
                                                <span>Post Your First Job</span>
                                              </Link>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div style={{
                    padding: '40px',
                    textAlign: 'center',
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        margin: '0 auto 20px',
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #3498db',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }}></div>
                    <p style={{ fontSize: '18px', color: '#777' }}>Loading employer details...</p>
                    <style>{`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            )}

            {/* Applicant Modal */}
            {selectedApplicant && (
                <div className="modal-overlay1" style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div className="modal-content" style={{
                        backgroundColor: '#fff',
                        borderRadius: '10px',
                        width: '90%',
                        maxWidth: '700px',
                        maxHeight: '90vh',
                        overflow: 'auto',
                        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)',
                        padding: '0'
                    }}>
                        <div style={{
                            padding: '20px',
                            borderBottom: '1px solid #eee',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#f8f9fa',
                            borderTopLeftRadius: '10px',
                            borderTopRightRadius: '10px'
                        }}>
                            <h4 style={{
                                margin: 0,
                                fontSize: '20px',
                                fontWeight: '600',
                                color: '#333'
                            }}>Applicant Details</h4>
                            <button
                                onClick={handleCloseApplicantModal}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '24px',
                                    cursor: 'pointer',
                                    color: '#777'
                                }}
                            >
                                &times;
                            </button>
                        </div>
                        {showReportForm ? (
          reportForm
        ) : (
          <button
            onClick={toggleReportForm}
            style={{
              backgroundColor: "#ff9800",
              color: "#fff",
              padding: "8px 14px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
            }}
          >
            <span style={{ marginRight: "6px" }}>⚠️</span> Report Applicant
          </button>
        )}
                        <div style={{ padding: '25px' }}>
                            {/* Profile and basic info */}
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'flex-start', 
                                marginBottom: '25px',
                                backgroundColor: '#f9f9f9',
                                borderRadius: '8px',
                                padding: '20px'
                            }}>
                                <div style={{ marginRight: '20px' }}>
                                    {selectedApplicant.profilePicURL ? (
                                        <img 
                                            src={selectedApplicant.profilePicURL} 
                                            alt="Profile" 
                                            style={{ 
                                                width: '100px', 
                                                height: '100px', 
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                border: '3px solid #3498db'
                                            }} 
                                        />
                                    ) : (
                                        <div style={{
                                            width: '100px',
                                            height: '100px',
                                            borderRadius: '50%',
                                            backgroundColor: '#3498db',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            color: '#fff',
                                            fontWeight: 'bold',
                                            fontSize: '40px'
                                        }}>
                                            {selectedApplicant.name ? selectedApplicant.name[0].toUpperCase() : 'A'}
                                        </div>
                                    )}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{
                                        margin: '0 0 5px 0',
                                        fontSize: '24px',
                                        fontWeight: '600',
                                        color: '#333'
                                    }}>{selectedApplicant.name}</h3>
                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '10px',
                                        marginBottom: '10px'
                                    }}>
                                        <div style={{
                                            backgroundColor: '#e3f2fd',
                                            color: '#1976d2',
                                            padding: '5px 10px',
                                            borderRadius: '4px',
                                            fontSize: '13px',
                                            fontWeight: '500'
                                        }}>
                                            {selectedApplicant.type || "Not specified"}
                                        </div>
                                        {selectedApplicant.status && (
                                            <div style={{
                                                backgroundColor: selectedApplicant.status === "Active" ? '#e8f5e9' : '#ffebee',
                                                color: selectedApplicant.status === "Active" ? '#388e3c' : '#d32f2f',
                                                padding: '5px 10px',
                                                borderRadius: '4px',
                                                fontSize: '13px',
                                                fontWeight: '500'
                                            }}>
                                                {selectedApplicant.status}
                                            </div>
                                        )}
                                    </div>
                                    <div style={{
                                        fontSize: '15px',
                                        color: '#666',
                                        marginBottom: '5px'
                                    }}>
                                        <span style={{ marginRight: '5px' }}>📧</span> {selectedApplicant.email}
                                    </div>
                                    {selectedApplicant.phone && (
                                        <div style={{
                                            fontSize: '15px',
                                            color: '#666'
                                        }}>
                                            <span style={{ marginRight: '5px' }}>📱</span> {selectedApplicant.phone}
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div style={{ 
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                gap: '20px',
                                marginBottom: '25px'
                            }}>
                                {/* Resume section
                                {selectedApplicant.resumeURL && (
                                    <div style={{ 
                                        backgroundColor: '#f9f9f9',
                                        borderRadius: '8px',
                                        padding: '15px',
                                        border: '1px solid #eee'
                                    }}>
                                        <h5 style={{
                                            margin: '0 0 10px 0',
                                            fontSize: '16px',
                                            fontWeight: '600',
                                            color: '#333',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <span style={{ marginRight: '8px' }}>📄</span> Resume
                                        </h5>
                                        <a
                                            href={selectedApplicant.resumeURL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ 
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '10px',
                                                backgroundColor: '#fff',
                                                borderRadius: '5px',
                                                border: '1px solid #ddd',
                                                color: '#3498db',
                                                textDecoration: 'none',
                                                fontWeight: '500',
                                                transition: 'background-color 0.2s'
                                            }}
                                        >
                                            <span style={{ marginRight: '8px' }}>⬇️</span>
                                            Download Resume
                                        </a>
                                    </div>
                                )} */}
                                
                                {/* GitHub section */}
                                {selectedApplicant.githubRepo && (
                                    <div style={{ 
                                        backgroundColor: '#f9f9f9',
                                        borderRadius: '8px',
                                        padding: '15px',
                                        border: '1px solid #eee'
                                    }}>
                                        <h5 style={{
                                            margin: '0 0 10px 0',
                                            fontSize: '16px',
                                            fontWeight: '600',
                                            color: '#333',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <span style={{ marginRight: '8px' }}>👨‍💻</span> GitHub Repository
                                        </h5>
                                        <a
                                            href={selectedApplicant.githubRepo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ 
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '10px',
                                                backgroundColor: '#fff',
                                                borderRadius: '5px',
                                                border: '1px solid #ddd',
                                                color: '#3498db',
                                                textDecoration: 'none',
                                                fontWeight: '500',
                                                transition: 'background-color 0.2s',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            <span style={{ marginRight: '8px' }}>🔗</span>
                                            {selectedApplicant.githubRepo.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
                                        </a>
                                    </div>
                                )}
                            </div>
                            
                            {/* Social links section */}
                            {selectedApplicant.socialLinks && Object.keys(selectedApplicant.socialLinks).length > 0 && (
                                <div style={{ 
                                    marginBottom: '25px',
                                    backgroundColor: '#f9f9f9',
                                    borderRadius: '8px',
                                    padding: '15px',
                                    border: '1px solid #eee'
                                }}>
                                    <h5 style={{
                                        margin: '0 0 15px 0',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        color: '#333',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <span style={{ marginRight: '8px' }}>🔗</span> Social Links
                                    </h5>
                                    <div style={{ 
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                        gap: '10px'
                                    }}>
                                        {selectedApplicant.socialLinks.linkedin && (
                                            <a
                                                href={selectedApplicant.socialLinks.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ 
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    padding: '10px',
                                                    backgroundColor: '#e8f1f8',
                                                    borderRadius: '5px',
                                                    color: '#0077b5',
                                                    textDecoration: 'none',
                                                    fontWeight: '500',
                                                    transition: 'transform 0.2s',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                <span style={{ marginRight: '8px', fontSize: '18px' }}>in</span>
                                                LinkedIn
                                            </a>
                                        )}
                                        {selectedApplicant.socialLinks.portfolio && (
                                            <a
                                                href={selectedApplicant.socialLinks.portfolio}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ 
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    padding: '10px',
                                                    backgroundColor: '#e8f5e9',
                                                    borderRadius: '5px',
                                                    color: '#388e3c',
                                                    textDecoration: 'none',
                                                    fontWeight: '500',
                                                    transition: 'transform 0.2s',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                <span style={{ marginRight: '8px', fontSize: '18px' }}>🌐</span>
                                                Portfolio
                                            </a>
                                        )}
                                        {selectedApplicant.socialLinks.twitter && (
                                            <a
                                                href={selectedApplicant.socialLinks.twitter}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ 
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    padding: '10px',
                                                    backgroundColor: '#e8f5fd',
                                                    borderRadius: '5px',
                                                    color: '#1da1f2',
                                                    textDecoration: 'none',
                                                    fontWeight: '500',
                                                    transition: 'transform 0.2s',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                <span style={{ marginRight: '8px', fontSize: '18px' }}>🐦</span>
                                                Twitter
                                            </a>
                                        )}
                                        {selectedApplicant.socialLinks.other && (
                                            <a
                                                href={selectedApplicant.socialLinks.other}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ 
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    padding: '10px',
                                                    backgroundColor: '#fff3e0',
                                                    borderRadius: '5px',
                                                    color: '#ff9800',
                                                    textDecoration: 'none',
                                                    fontWeight: '500',
                                                    transition: 'transform 0.2s',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                <span style={{ marginRight: '8px', fontSize: '18px' }}>🔗</span>
                                                Other
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Certifications section */}
                            <div style={{ 
                                marginBottom: '25px',
                                backgroundColor: '#f9f9f9',
                                borderRadius: '8px',
                                padding: '15px',
                                border: '1px solid #eee'
                            }}>
                                <h5 style={{
                                    margin: '0 0 15px 0',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: '#333',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <span style={{ marginRight: '8px' }}>🏆</span> Certifications
                                </h5>
                                {selectedApplicant.certifications && Object.keys(selectedApplicant.certifications).length > 0 ? (
                                    <div style={{ 
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                        gap: '15px'
                                    }}>
                                        {Object.entries(selectedApplicant.certifications).map(([skill, certs]) => (
                                            <div key={skill} style={{ 
                                                backgroundColor: '#fff',
                                                borderRadius: '6px',
                                                padding: '15px',
                                                boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                                            }}>
                                                <div style={{
                                                    fontWeight: '600',
                                                    fontSize: '15px',
                                                    color: '#333',
                                                    marginBottom: '10px',
                                                    borderBottom: '1px solid #eee',
                                                    paddingBottom: '5px'
                                                }}>{skill}</div>
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '5px'
                                                }}>
                                                   
                                                      {certs.map((cert, index) => (
                                                        <button
                                                        key={`${skill}-${index}`}
                                                        onClick={() => {
                                                          setSelectedApplicant({ ...selectedApplicant, selectedCert: cert });
                                                          setShowModal(true);
                                                        }}
                                                        style={{
                                                          fontSize: '14px',
                                                          color: '#3498db',
                                                          background: 'none',
                                                          border: 'none',
                                                          cursor: 'pointer',
                                                          display: 'flex',
                                                          alignItems: 'center',
                                                          padding: '3px 0',
                                                          outline: 'none'
                                                        }}
                                                      >
                                                        <span style={{ marginRight: '5px', fontSize: '12px' }}>🔗</span>
                                                        Certificate {index + 1}
                                                      </button>
                                                      
                                                      ))}
                                                      
                                             
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{
                                    padding: '15px',
                                    textAlign: 'center',
                                    color: '#777',
                                    backgroundColor: '#f2f2f2',
                                    borderRadius: '6px',
                                    border: '1px dashed #ddd'
                                }}>
                                    No certifications provided
                                </div>
                            )}
                        </div>
                        
                        {/* Application details section */}
                        <div style={{ 
                            marginBottom: '25px',
                            backgroundColor: '#f9f9f9',
                            borderRadius: '8px',
                            padding: '15px',
                            border: '1px solid #eee'
                        }}>
                            <h5 style={{
                                margin: '0 0 15px 0',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#333',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <span style={{ marginRight: '8px' }}>📝</span> Application Details
                            </h5>
                            
                            <div style={{ marginBottom: '15px' }}>
                                <div style={{ fontWeight: '600', marginBottom: '5px', color: '#555' }}>Cover Letter</div>
                                <div style={{ 
                                    backgroundColor: '#fff',
                                    borderRadius: '6px',
                                    padding: '15px',
                                    border: '1px solid #eee',
                                    lineHeight: '1.6',
                                    color: '#444',
                                    fontSize: '14px'
                                }}>
                                    {selectedApplicant.socialLinks|| "No cover letter provided"}
                                </div>
                            </div>
                            
                            {selectedApplicant.portfolioLinks && selectedApplicant.portfolioLinks.length > 0 && (
                                <div style={{ marginBottom: '15px' }}>
                                    <div style={{ fontWeight: '600', marginBottom: '5px', color: '#555' }}>Portfolio Links</div>
                                    <div style={{ 
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '5px'
                                    }}>
                                        {selectedApplicant.portfolioLinks.map((link, index) => (
                                            <a 
                                                key={index}
                                                href={link} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                style={{
                                                    fontSize: '14px',
                                                    color: '#3498db',
                                                    textDecoration: 'none',
                                                    backgroundColor: '#f0f8ff',
                                                    padding: '8px 12px',
                                                    borderRadius: '4px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                <span style={{ marginRight: '8px', fontSize: '14px' }}>🔗</span>
                                                {link}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {selectedApplicant.additionalInfo && (
                                <div>
                                    <div style={{ fontWeight: '600', marginBottom: '5px', color: '#555' }}>Additional Information</div>
                                    <div style={{ 
                                        backgroundColor: '#fff',
                                        borderRadius: '6px',
                                        padding: '15px',
                                        border: '1px solid #eee',
                                        lineHeight: '1.6',
                                        color: '#444',
                                        fontSize: '14px'
                                    }}>
                                        {selectedApplicant.additionalInfo}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Contact applicant section */}
                        <div style={{ 
                            marginBottom: '25px',
                            backgroundColor: '#f0f8ff',
                            borderRadius: '8px',
                            padding: '15px',
                            border: '1px solid #d1e6fa'
                        }}>
                            <h5 style={{
                                margin: '0 0 15px 0',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#1976d2',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <span style={{ marginRight: '8px' }}>✉️</span> Contact Applicant
                            </h5>
                            
                            <div style={{ marginBottom: '15px' }}>
                                <div style={{ fontWeight: '600', marginBottom: '5px', color: '#555' }}>Email Subject</div>
                                <input 
                                    type="text" 
                                    value={emailSubject} 
                                    onChange={(e) => setEmailSubject(e.target.value)} 
                                    placeholder="Regarding your application for [Job Title]"
                                    style={{ 
                                        width: '100%', 
                                        padding: '10px', 
                                        borderRadius: '5px',
                                        border: '1px solid #cce5ff',
                                        backgroundColor: '#fff'
                                    }} 
                                />
                            </div>
                            
                            <div style={{ marginBottom: '15px' }}>
                                <div style={{ fontWeight: '600', marginBottom: '5px', color: '#555' }}>Email Body</div>
                                <textarea 
                                    value={emailBody} 
                                    onChange={(e) => setEmailBody(e.target.value)} 
                                    placeholder="Write your message to the applicant here..."
                                    style={{ 
                                        width: '100%', 
                                        padding: '10px', 
                                        borderRadius: '5px',
                                        border: '1px solid #cce5ff',
                                        backgroundColor: '#fff',
                                        minHeight: '120px',
                                        resize: 'vertical'
                                    }} 
                                />
                            </div>
                            
                            <button 
                                onClick={handleEmailSend}
                                disabled={!emailSubject || !emailBody}
                                style={{
                                    backgroundColor: !emailSubject || !emailBody ? '#b3d7ff' : '#1976d2',
                                    color: !emailSubject || !emailBody ? '#666' : '#fff',
                                    border: 'none',
                                    padding: '10px 15px',
                                    borderRadius: '5px',
                                    cursor: !emailSubject || !emailBody ? 'not-allowed' : 'pointer',
                                    fontWeight: '600',
                                    width: '100%',
                                    fontSize: '16px'
                                }}
                            >
                                Send Email
                            </button>
                        </div>
                        
                        {/* Action buttons */}
                        <div style={{ 
                            display: 'flex',
                            gap: '15px',
                            marginTop: '15px' 
                        }}>
                            <button 
                                className="hire-btn" 
                                onClick={() => {
                                handleHireApplicant();
                                handleAcceptSend(selectedJob);
                                }}
                                style={{
                                    backgroundColor: '#2ecc71',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '12px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    flex: '1',
                                    fontSize: '16px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <span style={{ marginRight: '8px' }}>✅</span> Hire Applicant
                            </button>
                            <button 
                                className="reject-btn" 
                                onClick={() => {handleRejectApplicant(selectedApplicant, selectedJob);
                                    handleRejectSend(selectedJob);
                                }   }
                                style={{
                                    backgroundColor: '#e74c3c',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '12px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    flex: '1',
                                    fontSize: '16px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <span style={{ marginRight: '8px' }}>❌</span> Reject Applicant
                            </button>
                        </div>
                    </div>
                    {/* <div style={{ 
                            marginTop: '30px',
                            backgroundColor: '#f0f9ff',
                            borderRadius: '8px',
                            padding: '20px',
                            border: '1px solid #d1ecf1'
                        }}>
                            <h4 style={{
                                margin: '0 0 15px 0',
                                fontSize: '18px',
                                fontWeight: '600',
                                color: '#0c5460',
                                display: 'flex',
                                alignItems: 'center',
                                borderBottom: '1px solid #bee5eb',
                                paddingBottom: '10px'
                            }}>
                                <span style={{ marginRight: '10px' }}>👥</span> Hired Employees
                            </h4>
                            
                            {hiredApplicants && hiredApplicants[selectedJob] && hiredApplicants[selectedJob].length > 0 ? (
                                <div style={{ 
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                    gap: '15px'
                                }}>
                                    {hiredApplicants[selectedJob].map(employee => (
                                        <div key={employee.id} style={{ 
                                            backgroundColor: '#fff',
                                            borderRadius: '6px',
                                            padding: '15px',
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                                            border: '1px solid #e3f2fd'
                                        }}>
                                            <div style={{ 
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '10px'
                                            }}>
                                                <div style={{ marginRight: '10px' }}>
                                                    {employee.profilePicURL ? (
                                                        <img 
                                                            src={employee.profilePicURL} 
                                                            alt="Profile" 
                                                            style={{ 
                                                                width: '40px', 
                                                                height: '40px', 
                                                                borderRadius: '50%',
                                                                objectFit: 'cover',
                                                                border: '2px solid #3498db'
                                                            }} 
                                                        />
                                                    ) : (
                                                        <div style={{
                                                            width: '40px',
                                                            height: '40px',
                                                            borderRadius: '50%',
                                                            backgroundColor: '#3498db',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            color: '#fff',
                                                            fontWeight: 'bold',
                                                            fontSize: '16px'
                                                        }}>
                                                            {employee.name ? employee.name[0].toUpperCase() : 'A'}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div style={{
                                                        fontWeight: '600',
                                                        fontSize: '15px',
                                                        color: '#333'
                                                    }}>{employee.name}</div>
                                                    <div style={{
                                                        fontSize: '13px',
                                                        color: '#666'
                                                    }}>{employee.email}</div>
                                                </div>
                                            </div>
                                            
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginTop: '10px',
                                                gap: '8px'
                                            }}>
                                                <button 
                                                    onClick={() => setSelectedApplicant(employee)}
                                                    style={{
                                                        backgroundColor: '#e3f2fd',
                                                        color: '#1976d2',
                                                        border: 'none',
                                                        padding: '8px 12px',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontWeight: '500',
                                                        fontSize: '13px',
                                                        flex: '1',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <span style={{ marginRight: '5px' }}>👁️</span> View
                                                </button>
                                                <button 
                                                    onClick={() => HhandleRemoveiredEmployee(employee, selectedJob)}
                                                    style={{
                                                        backgroundColor: '#ffebee',
                                                        color: '#d32f2f',
                                                        border: 'none',
                                                        padding: '8px 12px',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontWeight: '500',
                                                        fontSize: '13px',
                                                        flex: '1',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <span style={{ marginRight: '5px' }}>✖️</span> Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{
                                    padding: '15px',
                                    textAlign: 'center',
                                    color: '#777',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '6px',
                                    border: '1px dashed #dee2e6'
                                }}>
                                    No hired employees for this job position
                                </div>
                            )}
                        </div> */}
                    {showModal && selectedApplicant?.selectedCert && (
                        <ApplicantDetailsModal
                            cert={selectedApplicant.selectedCert}
                            onClose={() => {
                            setShowModal(false);
                            setSelectedApplicant(null);
                            }}
                        />
                        )}

                </div>
            </div>
            
        )}
         <style jsx>{`

    body {
  overflow-x: hidden !important;
}
       * {
  box-sizing: border-box;
  word-break: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}

html, body {
  max-width: 100%;
  width: 100%;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

#root, 
.app, 
.ski-folio-dashboard {
  max-width: 100%;
  width: 100%;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

.ski-folio-dashboard {
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
  min-height: 100vh;
  position: relative;
  margin: 0;
  padding: 0;
}

.mobile-header {
  width: 100%;
  max-width: 100%;
  background: linear-gradient(to right, #4eb3ff, #2196f3);
  color: white;
  display: flex;
  align-items: center;
  padding: 15px;
  position: sticky;
  top: 0;
  z-index: 10;
  margin: 0;
}

.dashboard-content {
  width: 100%;
  max-width: 100%;
  padding: 15px;
  margin: 0;
  overflow: hidden;
}

.profile-section,
.jobs-section {
  width: 100%;
  max-width: 100%;
  margin: 0;
  overflow: hidden;
}

.profile-section {
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.contact-info p {
  margin-bottom: 10px;
  font-size: 14px;
  word-break: break-word;
  overflow-wrap: break-word;
}

.edit-profile-btn {
  width: 100%;
  padding: 10px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
}

.jobs-section {
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.job-card {
  width: 100%;
  max-width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  overflow: hidden;
}

.job-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
}

.job-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  width: 100%;
}

.job-actions button {
  flex: 1;
  min-width: 0;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  margin-bottom: 5px;
}

.job-view-buttons {
  display: flex;
  gap: 10px;
  width: 100%;
}

.job-view-buttons button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
}

.hired-applicants-section {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 15px;
  width: 100%;
  max-width: 100%;
  margin: 0;
  overflow: hidden;
}

.hired-applicant {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  max-width: 100%;
}

.hired-applicant-initial {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #2196f3;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-weight: bold;
}

.hired-applicant-details {
  flex-grow: 1;
  overflow: hidden;
}

.hired-applicant-details h4 {
  margin: 0;
  font-size: 14px;
  word-break: break-word;
  overflow-wrap: break-word;
}

.hired-applicant-details p {
  margin: 0;
  font-size: 12px;
  color: #666;
  word-break: break-word;
  overflow-wrap: break-word;
}

.job-header, 
.job-actions, 
.job-view-buttons {
  flex-wrap: wrap;
}

.job-actions button,
.job-view-buttons button {
  flex: 1 1 100%;
  min-width: 0;
  word-break: break-word;
}

.hired-applicant-details p,
.hired-applicant-details h4 {
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}

@media screen and (max-width: 480px) {
  * {
    max-width: 100%;
    overflow-x: hidden;
  }
  
  .job-actions {
    flex-direction: column;
  }

  .job-actions button {
    width: 100%;
  }
}
      `}</style>
    </div>
    </AnimatedGroup>
);
};

export default EmployerProfile;
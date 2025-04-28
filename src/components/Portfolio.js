// import React, { useState, useEffect } from 'react';
// import { db, auth, storage } from '../firebase'; // Include storage in your Firebase import
// import { doc, getDoc, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import axios from 'axios';

// const Portfolio = () => {
//     const [userData, setUserData] = useState(null);
//     const [submissions, setSubmissions] = useState([]);
//     const [liveDemoLink, setLiveDemoLink] = useState('');
//     const [demoVideoFile, setDemoVideoFile] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [isVideoValid, setIsVideoValid] = useState(false);
//     const [submissionLoading, setSubmissionLoading] = useState(false);
//     const [userRepos, setUserRepos] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         fetchUserData();
//         fetchSubmissions();
//     }, []);

//     const fetchUserData = async () => {
//         if (auth.currentUser) {
//             const userRef = doc(db, 'applicants', auth.currentUser.uid);
//             const userSnap = await getDoc(userRef);
//             if (userSnap.exists()) {
//                 setUserData(userSnap.data());
//                 fetchUserRepos(userSnap.data().githubLink);
//             } else {
//                 console.log("No such document!");
//             }
//         }
//     };

//     const fetchUserRepos = async (githubLink) => {
//         if (!githubLink) return;
    
//         let username = "";
    
//         // Extract username from GitHub profile link (e.g., https://github.com/crajex)
//         if (githubLink.includes("github.com")) {
//             username = githubLink.split('/').pop();
//         }
//         // Extract username from GitHub Pages link (e.g., https://crajex.github.io/NewJeans)
//         else if (githubLink.includes(".github.io")) {
//             username = new URL(githubLink).hostname.split('.')[0];
//         }
    
//         if (!username) {
//             setError("Invalid GitHub link format.");
//             return;
//         }
    
//         try {
//             const response = await axios.get(`https://api.github.com/users/${username}/repos`);
//             setUserRepos(response.data.map(repo => repo.name));
//         } catch (error) {
//             console.error("Error fetching user repositories:", error);
//             setError("Failed to fetch your GitHub repositories. Please try again later.");
//         }
//     };

//     const fetchSubmissions = async () => {
//         setLoading(true);
//         try {
//             if (!auth.currentUser) {
//                 console.log("User not authenticated");
//                 return;
//             }
            
//             const submissionsRef = collection(doc(db, 'applicants', auth.currentUser.uid), 'submissions');
//             const snapshot = await getDocs(submissionsRef);
//             const submissionsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             setSubmissions(submissionsData);
//         } catch (error) {
//             console.error("Error fetching submissions:", error);
//             setError("Failed to load your previous submissions.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file && file.type.startsWith('video/')) {
//             setDemoVideoFile(file);
//             setIsVideoValid(true);
//         } else {
//             setDemoVideoFile(null);
//             setIsVideoValid(false);
//             alert('Please upload a valid video file (e.g., .mp4, .mov).');
//         }
//     };

//     const handleOpenModal = () => {
//         if (!liveDemoLink.trim()) {
//             alert("Please enter a Live Demo Link first.");
//             return;
//         }
//         setShowModal(true);
//     };

//     const handleCloseModal = () => {
//         setShowModal(false);
//         setDemoVideoFile(null);
//         setIsVideoValid(false);
//     };

//     const handleSubmission = async () => {
//         setError("");
        
//         if (!liveDemoLink.trim() || !demoVideoFile) {
//             alert("Please enter a valid live demo link and upload a video.");
//             return;
//         }

//         // Improved URL validation
//         let isValidUrl = false;
//         try {
//             new URL(liveDemoLink);
//             isValidUrl = true;
//         } catch (e) {
//             alert("Please enter a valid URL.");
//             return;
//         }

//         if (!isValidUrl) {
//             alert("Please enter a valid URL including http:// or https://");
//             return;
//         }

//         // Extract repo name from GitHub URL if applicable
//         let belongsToUser = true;
//         if (liveDemoLink.includes('github.com') || liveDemoLink.includes('.github.io')) {
//             let repoName = "";
            
//             if (liveDemoLink.includes("github.com")) {
//                 const urlParts = liveDemoLink.split('/');
//                 const repoIndex = urlParts.indexOf('github.com') + 2;
//                 if (repoIndex < urlParts.length) repoName = urlParts[repoIndex].replace('.git', '');
//             } else if (liveDemoLink.includes(".github.io")) {
//                 repoName = new URL(liveDemoLink).pathname.split('/')[1]; // Extract repo from GitHub Pages URL
//             }
        
//             if (!userRepos.includes(repoName)) 
//                 alert("Error Repository not Initialized");
//                 return;{
//                 if (!window.confirm("This repository doesn't appear to belong to your GitHub account. Do you want to continue?")) {
//                     alert("Error repo not owned");
//                     return;
//                 }
//             }
//         }

//         setSubmissionLoading(true);

//         try {
//             // Upload video to Firebase Storage
//             const storageRef = ref(storage, `videos/${auth.currentUser.uid}/${Date.now()}_${demoVideoFile.name}`);
//             const uploadTask = await uploadBytes(storageRef, demoVideoFile);
//             const videoURL = await getDownloadURL(uploadTask.ref);

//             // Analyze live demo link
//             const newPayload = { url: liveDemoLink };
            
//             // Log request before sending
//             console.log("Sending analysis request for:", liveDemoLink);
            
//             const response = await axios.post('https://skifolio-main.onrender.com/analyze', newPayload, {
//                 headers: { 'Content-Type': 'application/json' },
//                 timeout: 60000 // Increase timeout to 60 seconds for large sites
//             });

//             // Check if scores exist in the response
//             if (response?.data?.scores) {
//                 console.log("Analysis results received:", response.data);
                
//                 const newSubmission = {
//                     liveDemoLink,
//                     demoVideoLink: videoURL,
//                     timestamp: new Date(),
//                     scores: response.data.scores,
//                     feedback: response.data.feedback || {}
//                 };

//                 const submissionsRef = collection(doc(db, 'applicants', auth.currentUser.uid), 'submissions');
//                 await addDoc(submissionsRef, newSubmission);

//                 fetchSubmissions();
//                 setLiveDemoLink('');
//                 handleCloseModal();
//                 alert("Your project has been successfully submitted and analyzed!");
//             } else {
//                 throw new Error("Invalid response from analysis server. Missing scores data.");
//             }
//         } catch (error) {
//             console.error("Error submitting the demo link:", error);
//             setError(`Submission failed: ${error.message || "Unknown error occurred"}`);
//             alert(`Failed to analyze your project. ${error.message || "Please try again later."}`);
//         } finally {
//             setSubmissionLoading(false);
//         }
//     };

//     const handleDeleteSubmission = async (submissionId) => {
//         if (window.confirm("Are you sure you want to delete this submission?")) {
//             try {
//                 const submissionRef = doc(db, 'applicants', auth.currentUser.uid, 'submissions', submissionId);
//                 await deleteDoc(submissionRef);
//                 fetchSubmissions();
//             } catch (error) {
//                 console.error("Error deleting submission:", error);
//                 alert("Failed to delete submission. Please try again.");
//             }
//         }
//     };

//     return (
//         <div className="portfolio-container">
//             <h3 className="section-title">Portfolio</h3>
//             {userData && (
//                 <div className="github-link">
//                     <p>
//                         GitHub: <a href={userData.githubLink} target="_blank" rel="noopener noreferrer">{userData.githubLink}</a>
//                     </p>
//                 </div>
//             )}

//             <div className="form-group">
//                 <input
//                     type="text"
//                     placeholder="Enter Live Demo Link"
//                     value={liveDemoLink}
//                     onChange={(e) => setLiveDemoLink(e.target.value)}
//                 />
//                 <button className="primary-button" onClick={handleOpenModal}>Submit</button>
//             </div>

//             {error && <div className="error-message">{error}</div>}

//             {showModal && (
//                 <div className="portfolio-modal-overlay">
//                     <div className="portfolio-modal-content">
//                         <h4>Upload Demo Video</h4>
//                         <p className="modal-instruction">Please upload a short video demonstrating your projects.</p>
//                         <input type="file" accept="video/*" onChange={handleFileChange} />
//                         <div className="portfolio-modal-actions">
//                             <button className="secondary-btn" onClick={handleCloseModal}>Cancel</button>
//                             <button
//                                 disabled={!isVideoValid || submissionLoading}
//                                 onClick={handleSubmission}
//                                 className="primary-button"
//                             >
//                                 {submissionLoading ? "Submitting..." : "Submit"}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {loading ? (
//                 <p>Loading submissions...</p>
//             ) : (
//                 <div className="submissions-grid">
//                     {submissions.length === 0 ? (
//                         <p>No submissions yet. Submit your first project!</p>
//                     ) : (
//                         submissions.map((submission, index) => (
//                             <div key={submission.id} className="submission-card">
//                                 <h4>
//                                     <a
//                                         href={submission.liveDemoLink}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="demo-link"
//                                     >
//                                         Live Demo [{index + 1}]
//                                     </a>
//                                 </h4>
//                                 <video width="320" height="240" controls>
//                                     <source src={submission.demoVideoLink} type="video/mp4" />
//                                     Your browser does not support the video tag.
//                                 </video>
//                                 <div className="scores">
//                                     <p>Scores:</p>
//                                     <ul>
//                                         <li>HTML: <span className="score">{submission.scores.html}</span></li>
//                                         <li>CSS: <span className="score">{submission.scores.css}</span></li>
//                                         <li>JavaScript: <span className="score">{submission.scores.javascript}</span></li>
//                                     </ul>
//                                 </div>
//                                 <button className="delete-btn" onClick={() => handleDeleteSubmission(submission.id)}>Delete</button>
                        
//                             </div>
//                         ))
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Portfolio;
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import axios from 'axios';

const Portfolio = () => {
    const [userData, setUserData] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [liveDemoLink, setLiveDemoLink] = useState('');
    const [submissionLoading, setSubmissionLoading] = useState(false);
    const [userRepos, setUserRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showHelp, setShowHelp] = useState(false);
    const [githubUsername, setGithubUsername] = useState("");

    useEffect(() => {
        fetchUserData();
        fetchSubmissions();
    }, []);

    const fetchUserData = async () => {
        if (auth.currentUser) {
            const userRef = doc(db, 'applicants', auth.currentUser.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                const data = userSnap.data();
                setUserData(data);
                
                // Get GitHub URL from correct field (githubRepo, not githubLink)
                const githubUrl = data.githubRepo || "";
                
                // Extract just the username from the GitHub URL
                let username = extractGithubUsername(githubUrl);
                setGithubUsername(username);
                
                // Fetch repos using just the username
                if (username) {
                    fetchUserReposByUsername(username);
                }
            } else {
                console.log("No such document!");
            }
        }
    };
    
    const extractGithubUsername = (githubUrl) => {
        if (!githubUrl) return "";
        
        // Extract username from GitHub profile link
        if (githubUrl.includes("github.com")) {
            const parts = githubUrl.split('github.com/');
            if (parts.length > 1) {
                // Get everything up to the next slash or the end
                return parts[1].split('/')[0];
            }
        }
        
        return "";
    };

    const fetchUserReposByUsername = async (username) => {
        if (!username) {
            setError("Invalid GitHub username.");
            return;
        }
    
        try {
            console.log("Fetching repos for username:", username);
            const response = await axios.get(`https://api.github.com/users/${username}/repos`);
            // Store repos in lowercase for case-insensitive comparison later
            setUserRepos(response.data.map(repo => ({
                name: repo.name,
                nameLower: repo.name.toLowerCase()
            })));
            console.log("Found repos:", response.data.map(repo => repo.name));
        } catch (error) {
            console.error("Error fetching user repositories:", error);
            setError("Failed to fetch your GitHub repositories. Please try again later.");
        }
    };

    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            if (!auth.currentUser) {
                console.log("User not authenticated");
                return;
            }
            
            const submissionsRef = collection(doc(db, 'applicants', auth.currentUser.uid), 'submissions');
            const snapshot = await getDocs(submissionsRef);
            const submissionsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSubmissions(submissionsData);
        } catch (error) {
            console.error("Error fetching submissions:", error);
            setError("Failed to load your previous submissions.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmission = async () => {
        setError("");
        
        if (!liveDemoLink.trim()) {
            alert("Please enter a valid live demo link.");
            return;
        }

        // Improved URL validation
        let isValidUrl = false;
        try {
            new URL(liveDemoLink);
            isValidUrl = true;
        } catch (e) {
            alert("Please enter a valid URL.");
            return;
        }

        if (!isValidUrl) {
            alert("Please enter a valid URL including http:// or https://");
            return;
        }

        // Extract repo name from GitHub URL if applicable
        if (liveDemoLink.includes('github.com') || liveDemoLink.includes('.github.io')) {
            let repoName = "";
            let demoUsername = "";
            
            if (liveDemoLink.includes("github.com")) {
                // For regular GitHub repos
                const parts = liveDemoLink.split('github.com/');
                if (parts.length > 1) {
                    const pathParts = parts[1].split('/');
                    if (pathParts.length > 1) {
                        demoUsername = pathParts[0];
                        repoName = pathParts[1].replace('.git', '');
                    }
                }
            } else if (liveDemoLink.includes(".github.io")) {
                // For GitHub Pages URLs like https://crajex.github.io/NewJeans
                try {
                    const url = new URL(liveDemoLink);
                    demoUsername = url.hostname.split('.')[0];
                    const pathParts = url.pathname.split('/');
                    // The first path part after the domain is the repo name
                    if (pathParts.length > 1 && pathParts[1]) {
                        repoName = pathParts[1];
                    }
                } catch (error) {
                    console.error("Error parsing GitHub Pages URL:", error);
                }
            }
            
            console.log("Extracted username from demo:", demoUsername);
            console.log("Stored GitHub username:", githubUsername);
            console.log("Extracted repo name:", repoName);
            
            // Always do case-insensitive comparison
            const usernameMatches = demoUsername.toLowerCase() === githubUsername.toLowerCase();
            
            if (!usernameMatches) {
                if (!window.confirm(`The GitHub username in the demo link (${demoUsername}) doesn't match your GitHub account (${githubUsername}). Do you want to continue anyway?`)) {
                    return;
                }
            } else if (repoName) {
                // If username matches, check if the repo exists in the user's repos
                const repoNameLower = repoName.toLowerCase();
                const repoExists = userRepos.some(repo => repo.nameLower === repoNameLower);
                
                console.log("Repository exists in user repos:", repoExists);
                console.log("Available repos:", userRepos.map(repo => repo.name).join(", "));
                
                if (!repoExists) {
                    if (!window.confirm(`Repository "${repoName}" wasn't found in your GitHub account. Do you want to continue anyway?`)) {
                        return;
                    }
                }
            }
        }

        setSubmissionLoading(true);

        try {
            // Analyze live demo link
            const newPayload = { url: liveDemoLink };
            
            // Log request before sending
            console.log("Sending analysis request for:", liveDemoLink);
            
            const response = await axios.post('https://skifolio-main.onrender.com/analyze', newPayload, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 60000 // Increase timeout to 60 seconds for large sites
            });

            // Check if scores exist in the response
            if (response?.data?.scores) {
                console.log("Analysis results received:", response.data);
                
                const newSubmission = {
                    liveDemoLink,
                    timestamp: new Date(),
                    scores: response.data.scores,
                    feedback: response.data.feedback || {}
                };

                const submissionsRef = collection(doc(db, 'applicants', auth.currentUser.uid), 'submissions');
                await addDoc(submissionsRef, newSubmission);

                fetchSubmissions();
                setLiveDemoLink('');
                alert("Your project has been successfully submitted and analyzed!");
            } else {
                throw new Error("Invalid response from analysis server. Missing scores data.");
            }
        } catch (error) {
            console.error("Error submitting the demo link:", error);
            setError(`Submission failed: ${error.message || "Unknown error occurred"}`);
            alert(`Failed to analyze your project. ${error.message || "Please try again later."}`);
        } finally {
            setSubmissionLoading(false);
        }
    };

    const handleDeleteSubmission = async (submissionId) => {
        if (window.confirm("Are you sure you want to delete this submission?")) {
            try {
                const submissionRef = doc(db, 'applicants', auth.currentUser.uid, 'submissions', submissionId);
                await deleteDoc(submissionRef);
                fetchSubmissions();
            } catch (error) {
                console.error("Error deleting submission:", error);
                alert("Failed to delete submission. Please try again.");
            }
        }
    };

    return (
        <div className="portfolio-container">
            <h3 className="section-title">Portfolio</h3>
            {userData && (
                <div className="github-link">
                    <p>
                        GitHub: <a href={userData.githubRepo} target="_blank" rel="noopener noreferrer">{userData.githubRepo}</a>
                    </p>
                </div>
            )}

            <div className="form-group">
                <input
                    type="text"
                    placeholder="Enter Live Demo Link"
                    value={liveDemoLink}
                    onChange={(e) => setLiveDemoLink(e.target.value)}
                />
                <button 
                    className="primary-button" 
                    onClick={handleSubmission}
                    disabled={submissionLoading}
                >
                    {submissionLoading ? "Submitting..." : "Submit"}
                </button>
                <button 
                    className="help-button" 
                    onClick={() => setShowHelp(!showHelp)}
                >
                    {showHelp ? "Hide Help" : "Need Help?"}
                </button>
            </div>

            {showHelp && (
                <div className="help-section">
                    <h4>Getting Started with GitHub and Live Demo Pages</h4>
                    <div className="help-links">
                        <div className="help-card">
                            <h5>Creating a GitHub Repository</h5>
                            <p>Learn how to create your first GitHub repository:</p>
                            <a href="https://docs.github.com/en/get-started/quickstart/create-a-repo" target="_blank" rel="noopener noreferrer">
                                GitHub Docs: Creating a Repository
                            </a>
                            <a href="https://www.youtube.com/watch?v=QUtk-Uuq9nE" target="_blank" rel="noopener noreferrer">
                                Video Tutorial: Creating a GitHub Repository
                            </a>
                        </div>
                        <div className="help-card">
                            <h5>Creating a GitHub Pages Live Demo</h5>
                            <p>Learn how to publish your project with GitHub Pages:</p>
                            <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site" target="_blank" rel="noopener noreferrer">
                                GitHub Docs: Creating a GitHub Pages site
                            </a>
                            <a href="https://www.youtube.com/watch?v=8hrJ4oN1u_8" target="_blank" rel="noopener noreferrer">
                                Video Tutorial: Publishing with GitHub Pages
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <p>Loading submissions...</p>
            ) : (
                <div className="submissions-grid">
                    {submissions.length === 0 ? (
                        <p>No submissions yet. Submit your first project!</p>
                    ) : (
                        submissions.map((submission, index) => (
                            <div key={submission.id} className="submission-card">
                                <h4>
                                    <a
                                        href={submission.liveDemoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="demo-link"
                                    >
                                        Live Demo [{index + 1}]
                                    </a>
                                </h4>
                                <div className="scores">
                                    <p>Scores:</p>
                                    <ul>
                                        <li>HTML: <span className="score">{submission.scores.html}</span></li>
                                        <li>CSS: <span className="score">{submission.scores.css}</span></li>
                                        <li>JavaScript: <span className="score">{submission.scores.javascript}</span></li>
                                    </ul>
                                </div>
                                <button className="delete-btn" onClick={() => handleDeleteSubmission(submission.id)}>Delete</button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Portfolio;
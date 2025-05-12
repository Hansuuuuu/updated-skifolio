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
import { doc, getDoc, collection, addDoc, getDocs, deleteDoc,setDoc,serverTimestamp } from 'firebase/firestore';
import axios from 'axios';
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
                const submissionSnapshot = await getDoc(submissionRef);
                const userId = auth.currentUser.uid
                if (submissionSnapshot.exists()) {
                        // Save the job data to deletedFiles collection
                        await setDoc(doc(db, "deletedFiles", `deleted-portfolio-submissions-${userId}`), {
                            submissionData: submissionSnapshot.data(),
                            deletedAt: serverTimestamp(),
                            applicantId: userId
                        });
                        
                        // Now delete the original job document
                        await deleteDoc(submissionRef);
                    }
                fetchSubmissions();
            } catch (error) {
                console.error("Error deleting submission:", error);
                alert("Failed to delete submission. Please try again.");
            }
        }
    };

    return (
<AnimatedGroup 
  className="mt-16 mb-16 space-y-8 bg-slate-100 p-8 rounded-xl "
  baseDelay={0.2}
  delayIncrement={0.15}
>
  <div className="proj-showcase">
    <h3 className="proj-heading">Portfolio Projects</h3>
    {userData && (
      <div className="repo-reference">
        <p>
          GitHub: <a href={userData.githubRepo} target="_blank" rel="noopener noreferrer">{userData.githubRepo}</a>
        </p>
      </div>
    )}
    <div className="input-container">
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Enter Live Demo Link (e.g., https://username.github.io/project-name)"
          value={liveDemoLink}
          onChange={(e) => setLiveDemoLink(e.target.value)}
          className="proj-input"
          id='inputProj'
        />
        <div className="input-hint">
          A live demo link is a URL where people can view your project online. Typically from GitHub Pages.
        </div>
      </div>
      <button 
        className="action-btn" 
        onClick={handleSubmission}
        disabled={submissionLoading}
      >
        {submissionLoading ? "Submitting..." : "Submit"}
      </button>
      <button 
        className="assist-btn" 
        onClick={() => setShowHelp(!showHelp)}
      >
        {showHelp ? "Hide Help" : "Need Help?"}
      </button>
    </div>
    {showHelp && (
      <div className="assist-panel">
        <h4 className="assist-title">Getting Started with GitHub and Live Demo Pages</h4>
        
        <div className="demo-explanation">
          <h5 className="info-title">What is a Live Demo Link?</h5>
          <p>A live demo link is a URL where your project is hosted and accessible online for anyone to view in a web browser.</p>
          <div className="template-box">
            <h6 className="template-title">Example Links:</h6>
            <ul className="template-list">
              <li><code>https://username.github.io/project-name</code> (GitHub Pages)</li>
              <li><code>https://project-name.netlify.app</code> (Netlify)</li>
              <li><code>https://project-name.vercel.app</code> (Vercel)</li>
            </ul>
          </div>
        </div>
        
        <div className="resource-links">
          <div className="resource-item">
            <h5 className="resource-subtitle">Creating a GitHub Repository</h5>
            <p>Learn how to create your first GitHub repository:</p>
            <a href="https://docs.github.com/en/get-started/quickstart/create-a-repo" target="_blank" rel="noopener noreferrer" className="resource-link">
              GitHub Docs: Creating a Repository
            </a>
            <a href="https://www.youtube.com/watch?v=QUtk-Uuq9nE" target="_blank" rel="noopener noreferrer" className="resource-link">
              Video Tutorial: Creating a GitHub Repository
            </a>
          </div>
          <div className="resource-item">
            <h5 className="resource-subtitle">Creating a GitHub Pages Live Demo</h5>
            <p>Learn how to publish your project with GitHub Pages:</p>
            <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site" target="_blank" rel="noopener noreferrer" className="resource-link">
              GitHub Docs: Creating a GitHub Pages site
            </a>
            <a href="https://www.youtube.com/watch?v=8hrJ4oN1u_8" target="_blank" rel="noopener noreferrer" className="resource-link">
              Video Tutorial: Publishing with GitHub Pages
            </a>
          </div>
          <div className="resource-item">
            <h5 className="resource-subtitle">Step-by-Step Guide</h5>
            <ol className="steps-list">
              <li>Push your project to a GitHub repository</li>
              <li>Go to your repository's Settings tab</li>
              <li>Scroll down to "GitHub Pages" section</li>
              <li>Select "main" or "master" branch as source</li>
              <li>Click Save and wait for deployment (usually 1-2 minutes)</li>
              <li>Copy the GitHub Pages URL that appears</li>
              <li>Paste that URL in the input field above</li>
            </ol>
          </div>
        </div>
      </div>
    )}
    {error && <div className="alert-message">{error}</div>}
    {loading ? (
      <p className="loading-indicator">Loading submissions...</p>
    ) : (
      <div className="projects-gallery">
        {submissions.length === 0 ? (
          <p className="empty-state">No submissions yet. Submit your first project!</p>
        ) : (
          submissions.map((submission, index) => (
            <div key={submission.id} className="project-item">
              <h4>
                <a
                  href={submission.liveDemoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  Live Demo [{index + 1}]
                </a>
              </h4>
              <div className="evaluation-metrics">
                <p>Scores:</p>
                <ul className="metrics-list">
                  <li>HTML: <span className="metric-value">{submission.scores.html}</span></li>
                  <li>CSS: <span className="metric-value">{submission.scores.css}</span></li>
                  <li>JavaScript: <span className="metric-value">{submission.scores.javascript}</span></li>
                </ul>
              </div>
              <button className="remove-btn" onClick={() => handleDeleteSubmission(submission.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    )}
  </div>
  {/* Custom CSS Styles */}
\{/* Custom CSS Styles */}
<style jsx>{`
  .proj-showcase {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .proj-heading {
    font-size: 2rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 4rem;
    border-bottom: 3px solid #6366f1;
    padding-bottom: 0.5rem;
    display: inline-block;
  }

  .repo-reference {
    background-color: #eef2ff;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
    border-left: 4px solid #6366f1;
  }

  .repo-reference a {
    color: #4f46e5;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .repo-reference a:hover {
    color: #4338ca;
    text-decoration: underline;
  }

  .input-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.60rem;
    margin-bottom: 1.5rem;
    align-items: center;
  }

  .input-wrapper {
    flex: 1;
    position: relative;
    min-width: 250px;
  }

  .proj-input {
    
    width: 100%;
    padding: 0.75rem 2rem;
    border: 2px solid #cbd5e1;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: border-color 0.2s ease;
  }
    #inputProj
  {
    margin-top: 1.4rem;
  }

  .proj-input:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }

  .action-btn {
    padding: 0.75rem 1.25rem;
    background-color: #6366f1;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .action-btn:hover {
    background-color: #4f46e5;
    transform: translateY(-2px);
  }

  .action-btn:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
    transform: none;
  }

  .assist-btn {
    padding: 0.75rem 1.25rem;
    background-color: #f8fafc;
    color: #475569;
    border: 2px solid #cbd5e1;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .assist-btn:hover {
    background-color: #f1f5f9;
    border-color: #94a3b8;
  }

  .assist-panel {
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .assist-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #334155;
    margin-bottom: 1.5rem;
    text-align: center;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 0.75rem;
  }
  
  .demo-explanation {
    background-color: white;
    padding: 1.25rem;
    border-radius: 0.5rem;
    border: 1px solid #e2e8f0;
    margin-bottom: 1.5rem;
  }
  
  .info-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 0.75rem;
  }
  
  .template-box {
    background-color: #f1f5f9;
    border-radius: 0.375rem;
    padding: 1rem;
    margin-top: 1rem;
    border-left: 4px solid #6366f1;
  }
  
  .template-title {
    font-weight: 600;
    color: #334155;
    margin-bottom: 0.5rem;
  }
  
  .template-list {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 0;
  }
  
  .template-list code {
    background-color: #e2e8f0;
    padding: 0.25rem 0.375rem;
    border-radius: 0.25rem;
    font-family: monospace;
    font-size: 0.875rem;
  }
  
  .steps-list {
    padding-left: 1.25rem;
    margin: 0.75rem 0;
  }
  
  .steps-list li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }

  .resource-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .resource-item {
    background-color: white;
    padding: 1.25rem;
    border-radius: 0.5rem;
    border: 1px solid #e2e8f0;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .resource-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .resource-subtitle {
    font-size: 1.125rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 0.75rem;
  }

  .resource-link {
    display: block;
    color: #6366f1;
    text-decoration: none;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e2e8f0;
    transition: all 0.2s ease;
  }

  .resource-link:last-child {
    border-bottom: none;
  }

  .resource-link:hover {
    color: #4f46e5;
    padding-left: 0.5rem;
  }

  .alert-message {
    background-color: #fee2e2;
    color: #dc2626;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    font-weight: 500;
    border-left: 4px solid #dc2626;
  }

  .loading-indicator {
    text-align: center;
    color: #6366f1;
    font-size: 1.125rem;
    padding: 2rem 0;
  }

  .empty-state {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #64748b;
  font-style: italic;
  padding: 2rem;
  z-index: -100;
}


  .projects-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .project-item {
    background-color: white;
    border-radius: 0.75rem;
    border: 1px solid #e2e8f0;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    display: flex;
    flex-direction: column;
  }

  .project-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }

  .project-item h4 {
    background-color: #6366f1;
    color: white;
    margin: 0;
    padding: 1rem;
  }

  .project-link {
    color: white;
    text-decoration: none;
    display: block;
    font-weight: 600;
    transition: color 0.2s ease;
  }

  .project-link:hover {
    color: #e0e7ff;
    text-decoration: underline;
  }

  .evaluation-metrics {
    padding: 1rem;
    flex-grow: 1;
  }

  .evaluation-metrics p {
    font-weight: 600;
    color: #475569;
    margin-bottom: 0.75rem;
  }

  .metrics-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .metrics-list li {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px dashed #e2e8f0;
  }

  .metrics-list li:last-child {
    border-bottom: none;
  }

  .metric-value {
    font-weight: 700;
    color: #334155;
    background-color: #f8fafc;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
  }

  .remove-btn {
    padding: 0.75rem 1rem;
    background-color: #f1f5f9;
    color: #ef4444;
    border: none;
    border-top: 1px solid #e2e8f0;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;
  }

  .remove-btn:hover {
    background-color: #fee2e2;
  }
`}</style>
</AnimatedGroup>

    );
};

export default Portfolio;
// import React, { useState, useEffect } from 'react';
// import { db, storage, auth } from '../firebase';
// import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
// import { doc, getDoc, updateDoc, arrayRemove, setDoc, collection, addDoc } from 'firebase/firestore';




// const ApplicantProfile = () => {
//     const [profilePicURL, setProfilePicURL] = useState('');
//     const [coverPhotoURL, setCoverPhotoURL] = useState('');
//     const [name, setName] = useState('');
//     const [resumeURL, setResumeURL] = useState('');
//     const [certifications, setCertifications] = useState({
//         HTML: [],
//         CSS: [],
//         JavaScript: [],
//         Others:[],
//     });
//     const [selectedSkill, setSelectedSkill] = useState('HTML');

//     useEffect(() => {
//         const loadUserData = async () => {
//             if (!auth.currentUser) {
//                 console.error("User is not signed in.");
//                 return;
//             }

//             try {
//                 const userDoc = await getDoc(doc(db, 'applicants', auth.currentUser.uid));
//                 if (userDoc.exists()) {
//                     const data = userDoc.data();
//                     setProfilePicURL(data.profilePicURL || 'defaultProfilePic.jpg');
//                     setCoverPhotoURL(data.coverPhotoURL || 'defaultCoverPhoto.jpg');
//                     setName(data.name || '');
//                     setResumeURL(data.resumeURL || '');
//                     setCertifications({
//                         HTML: Array.isArray(data.certifications?.HTML) ? data.certifications.HTML : [],
//                         CSS: Array.isArray(data.certifications?.CSS) ? data.certifications.CSS : [],
//                         JavaScript: Array.isArray(data.certifications?.JavaScript) ? data.certifications.JavaScript : [],
//                         Others: Array.isArray(data.certifications?.Others) ? data.certifications.Others : [],
//                     });
//                 }
//             } catch (error) {
//                 console.error("Error fetching user data:", error);
//             }
//         };

//         loadUserData();
//     }, []);

//     const handleFileChange = async (e, type) => {
//         const file = e.target.files[0];
//         if (!file) return;
    
//         let storageRef;
//         let url;
    
//         try {
//             if (type === 'resume') {
//                 storageRef = ref(storage, `users/${auth.currentUser.uid}/resume/${file.name}`);
//                 await uploadBytes(storageRef, file);
//                 url = await getDownloadURL(storageRef);
//                 setResumeURL(url);
//                 await updateDoc(doc(db, 'applicants', auth.currentUser.uid), { resumeURL: url });
//             } else if (type === 'certificate') {
//                 storageRef = ref(storage, `users/${auth.currentUser.uid}/certifications/${selectedSkill}/${file.name}`);
//                 await uploadBytes(storageRef, file);
//                 url = await getDownloadURL(storageRef);
//                 const updatedCertifications = [...(certifications[selectedSkill] || []), url];
//                 setCertifications((prev) => ({
//                     ...prev,
//                     [selectedSkill]: updatedCertifications,
//                 }));
//                 await updateDoc(doc(db, 'applicants', auth.currentUser.uid), {
//                     certifications: {
//                         ...certifications,
//                         [selectedSkill]: updatedCertifications,
//                     },
//                 });
//             } else if (type === 'profilePic') {
//                 storageRef = ref(storage, `users/${auth.currentUser.uid}/profilePic/${file.name}`);
//                 await uploadBytes(storageRef, file);
//                 url = await getDownloadURL(storageRef);
//                 setProfilePicURL(url);
//                 await updateDoc(doc(db, 'applicants', auth.currentUser.uid), { profilePicURL: url });
//             } else if (type === 'coverPhoto') {
//                 storageRef = ref(storage, `users/${auth.currentUser.uid}/coverPhoto/${file.name}`);
//                 await uploadBytes(storageRef, file);
//                 url = await getDownloadURL(storageRef);
//                 setCoverPhotoURL(url);
//                 await updateDoc(doc(db, 'applicants', auth.currentUser.uid), { coverPhotoURL: url });
//             }
//         } catch (error) {
//             console.error("Error uploading file:", error);
//         }
//     };
    

//     const archiveFile = async (type, skill, url) => {
//         const archivedData = {
//             applicantId: auth.currentUser.uid,
//             type,
//             skill,
//             url,
//             deletedAt: new Date(),
//         };
//         try {
//             await addDoc(collection(db, 'deletedFiles'), archivedData);
//         } catch (error) {
//             console.error("Error archiving file:", error);
//         }
//     };

//     const handleDelete = async (type, skill, url) => {
//         try {
//           // Archive the file before deletion
//           await archiveFile(type, skill, url);
      
//           const storageRef = ref(storage, url);
//           await deleteObject(storageRef);
      
//           if (type === 'resume') {
//             await updateDoc(doc(db, 'applicants', auth.currentUser.uid), { resumeURL: '' });
//             setResumeURL('');
//           } else if (type === 'certificate') {
//             const updatedCertifications = certifications[skill].filter((cert) => cert !== url);
      
//             setCertifications((prev) => ({
//               ...prev,
//               [skill]: updatedCertifications,
//             }));
      
//             // Update Firestore with the new certifications list, ensuring "Others" is handled
//             await updateDoc(doc(db, 'applicants', auth.currentUser.uid), {
//               certifications: {
//                 ...certifications,
//                 [skill]: updatedCertifications,
//               },
//             });
//           }
//         } catch (error) {
//           console.error("Error deleting file:", error);
//         }
//       };
      

//     return (
//         <div id='applicant'>
//             <h2>Applicant Profile</h2>

//             {/* Cover Photo */}
//             <div style={{ position: 'relative', width: '100%', height: '300px', overflow: 'hidden', marginBottom: '10px' }}>
//                 <img
//                     src={coverPhotoURL}
//                     alt="Cover"
//                     style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
//                     onClick={() => document.getElementById('coverPhotoInput').click()}
//                 />
//                 <input
//                     id="coverPhotoInput"
//                     type="file"
//                     accept="image/*"
//                     style={{ display: 'none' }}
//                     onChange={(e) => handleFileChange(e, 'coverPhoto')}
//                 />
//             </div>

//             {/* Profile Picture */}
//             <div style={{ display: 'flex', alignItems: 'center', marginTop: '-50px', position: 'relative', }}>
//                 <img
//                     src={profilePicURL}
//                     alt="Profile"
//                     style={{
//                         width: '150px',
//                         height: '150px',
//                         borderRadius: '50%',
//                         borderColor:'green',
//                         cursor: 'pointer',
//                         border: '3px solid black',
//                     }}
//                     onClick={() => document.getElementById('profilePicInput').click()}
//                 />
//                 <input
                
//                     id="profilePicInput"
//                     type="file"
//                     accept="image/*"
//                     style={{ display: 'none'}}
//                     onChange={(e) => handleFileChange(e, 'profilePic')}
//                 />
//                 <div style={{ marginLeft: '20px' }}>
//                     <br></br>
//                     <h3>{name}</h3>
//                 </div>
//             </div>
//              {/* Badges */}
//                 <div style={{ marginTop: '20px', display: 'flex', gap: '10px', marginLeft: "10px" }}>
//                 {Object.keys(certifications).map((skill) =>
//                     certifications[skill]?.length > 0 ? ( // Include "Others" as well
//                     <span
//                         key={skill}
//                         style={{
//                         backgroundColor: '#007bff',
//                         color: 'white',
//                         padding: '5px 10px',
//                         borderRadius: '5px',
//                         fontSize: '12px',
//                         }}
//                     >
//                         {skill} Certified
//                     </span>
//                     ) : null
//                 )}
//                 </div>

//             {/*START CHANGED PROFILE* */}
//                     {/* Resume Section */}
//                     <div style={{
//                         marginTop: '30px', 
//                         padding: '20px', 
//                         background: '#ffffff', 
//                         borderRadius: '12px', 
//                         boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//                         width: '100%',
//                         textAlign: 'center',
//                         transition: '0.3s ease',
//                     }} id='Resume'>
//                         <h4 style={{ marginBottom: '15px', fontWeight: 'bold' }}>
//                             <span style={{ marginRight: '10px' }}>📄</span> Resume
//                         </h4>
//                         {resumeURL ? (
//                             <div>
//                                 <a href={resumeURL} target="_blank" rel="noopener noreferrer" 
//                                     style={{ 
//                                         color: '#007bff', 
//                                         textDecoration: 'none', 
//                                         fontWeight: 'bold', 
//                                         fontSize: '16px' 
//                                     }}>
//                                     View Resume
//                                 </a>
//                                 <button onClick={() => handleDelete('resume', null, resumeURL)} 
//                                     style={{ 
//                                         marginLeft: '10px', 
//                                         color: 'white', 
//                                         backgroundColor: '#f44336', 
//                                         border: 'none', 
//                                         borderRadius: '20px', 
//                                         padding: '7px 15px',
//                                         cursor: 'pointer',
//                                         fontSize: '14px',
//                                         transition: 'background-color 0.3s ease',
//                                     }}
//                                     onMouseOver={(e) => e.target.style.backgroundColor = '#e53935'}
//                                     onMouseOut={(e) => e.target.style.backgroundColor = '#f44336'}>
//                                     Delete
//                                 </button>
//                             </div>
//                         ) : (
//                             <button
//                                 onClick={() => document.getElementById('resumeInput').click()}
//                                 style={{
//                                     padding: '10px 20px',
//                                     backgroundColor: '#007bff',
//                                     color: 'white',
//                                     border: 'none',
//                                     borderRadius: '8px',
//                                     cursor: 'pointer',
//                                     fontWeight: 'bold',
//                                     fontSize: '16px',
//                                     transition: '0.3s ease',
//                                 }}
//                                 onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
//                                 onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}>
//                                 Upload Resume
//                             </button>
//                         )}
//                         <input
//                             id="resumeInput"
//                             type="file"
//                             accept=".pdf"
//                             style={{ display: 'none' }}
//                             onChange={(e) => handleFileChange(e, 'resume')}
//                         />
//                     </div>

//                     {/* Add Certificate Section */}
//                     <div style={{
//                         marginTop: '30px', 
//                         padding: '20px', 
//                         background: '#ffffff', 
//                         borderRadius: '12px', 
//                         boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//                         width: '100%',
//                         textAlign: 'center',
//                         transition: '0.3s ease',
//                     }} id='certificate'>
//                         <h4 style={{ marginBottom: '15px', fontWeight: 'bold' }}>
//                             <span style={{ marginRight: '10px' }}>🏅</span> Add a New Certificate
//                         </h4>
//                         <select
//                             value={selectedSkill}
//                             onChange={(e) => setSelectedSkill(e.target.value)}
//                             style={{ 
//                                 padding: '8px 15px', 
//                                 marginBottom: '15px', 
//                                 marginRight: '10px', 
//                                 borderRadius: '8px', 
//                                 border: '1px solid #ccc',
//                                 fontSize: '14px',
//                                 width: '100%',
//                                 maxWidth: '300px',
//                             }}>
//                             {Object.keys(certifications).map((skill) => (
//                                 <option key={skill} value={skill}>{skill}</option>
//                             ))}
//                         </select>
//                         <button
//                             onClick={() => document.getElementById('fileInput').click()}
//                             style={{
//                                 padding: '10px 20px',
//                                 backgroundColor: '#007bff',
//                                 color: 'white',
//                                 border: 'none',
//                                 borderRadius: '8px',
//                                 cursor: 'pointer',
//                                 fontWeight: 'bold',
//                                 fontSize: '16px',
//                                 transition: '0.3s ease',
//                             }}
//                             onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
//                             onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}>
//                             Upload Certificate
//                         </button>
//                         <input
//                             id="fileInput"
//                             type="file"
//                             accept="image/*,application/pdf"
//                             style={{ display: 'none' }}
//                             onChange={(e) => handleFileChange(e, 'certificate')}
//                         />
//                     </div>

//                     {/* Certifications Display by Category */}
//                     <div style={{
//                         marginTop: '30px', 
//                         padding: '20px', 
//                         background: '#ffffff', 
//                         borderRadius: '12px', 
//                         boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//                         width: '100%',
//                         textAlign: 'center',
//                         transition: '0.3s ease',
//                     }} id='certificateTable'>
//                         <h4 style={{ marginBottom: '20px', fontWeight: 'bold' }}>
//                             <span style={{ marginRight: '10px' }}>🎓</span> Certifications
//                         </h4>
//                         {Object.entries(certifications).map(([skill, urls]) => (
//                             <div key={skill} style={{ marginBottom: '25px' }}>
//                                 <h5 style={{ color: '#333', fontSize: '18px' }}>{skill} Certificates</h5>
//                                 {urls.length ? (
//                                     <div>
//                                         {urls.map((url, index) => (
//                                             <div key={`${skill}-${index}`} style={{
//                                                 marginBottom: '10px',
//                                                 alignItems: 'center',
//                                                 marginLeft: '10px',
//                                                 justifyContent: 'center',
//                                                 flexDirection: 'column',
//                                             }}>
//                                                 <a href={url} target="_blank" rel="noopener noreferrer" 
//                                                     style={{ 
//                                                         color: '#007bff', 
//                                                         textDecoration: 'none', 
//                                                         fontWeight: 'bold', 
//                                                         fontSize: '16px',
//                                                         padding: '7px 15px',

//                                                     }}>
//                                                     View Certificate {index + 1}
//                                                 </a>
//                                                 <button
//                                                     onClick={() => handleDelete('certificate', skill, url)}
//                                                     style={{
//                                                         marginTop: '10px',
//                                                         color: 'white',
//                                                         backgroundColor: '#f44336',
//                                                         border: 'none',
//                                                         borderRadius: '20px',
//                                                         padding: '7px 15px',
//                                                         cursor: 'pointer',
//                                                         fontSize: '14px',
//                                                         transition: 'background-color 0.3s ease',
//                                                     }}
//                                                     onMouseOver={(e) => e.target.style.backgroundColor = '#e53935'}
//                                                     onMouseOut={(e) => e.target.style.backgroundColor = '#f44336'}>
//                                                     Delete
//                                                 </button>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 ) : (
//                                     <div style={{
//                                         display: 'flex',
//                                         justifyContent: 'center',
//                                         alignItems: 'center',
//                                         minHeight: '60px',
//                                     }}>
//                                         <p style={{
//                                             fontSize: '16px',
//                                             color: '#777',
//                                             textAlign: 'center',
//                                             fontStyle: 'italic',
//                                             margin: 0
//                                         }}>
//                                             No certificates for {skill}
//                                         </p>
//                                     </div>
//                                 )}
//                             </div>
//                 ))}
//                             {/*END CHANGED PROFILE* */}
//             </div>
//         </div>
//     );
// };

// export default ApplicantProfile;
import React, { useState, useEffect } from 'react';
import { db, storage, auth } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, getDoc, updateDoc, arrayRemove, setDoc, collection, addDoc,serverTimestamp } from 'firebase/firestore';
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
const ApplicantProfile = () => {
    const [profilePicURL, setProfilePicURL] = useState('');
    const [coverPhotoURL, setCoverPhotoURL] = useState('');
    const [name, setName] = useState('');
    const [githubRepo, setGithubRepo] = useState('');
    const [socialLinks, setSocialLinks] = useState({
        linkedin: '',
        twitter: '',
        portfolio: '',
        github: '',
        other: '',
    });
    const [certifications, setCertifications] = useState({
        HTML: [],
        CSS: [],
        JavaScript: [],
        Others: [],
    });
    const [selectedSkill, setSelectedSkill] = useState('HTML');
    const [newCertificate, setNewCertificate] = useState({
        name: '',
        issuer: '',
        issueDate: '',
        expiryDate: '',
        credentialID: '',
        imageURL: '',
    });
    const [editMode, setEditMode] = useState(false);
    const [showCertGuide, setShowCertGuide] = useState(false);
    const [showProfileGuide, setShowProfileGuide] = useState(false);
    const [showSocialGuide, setShowSocialGuide] = useState(false);
    const [showCoverGuide, setShowCoverGuide] = useState(false);
    const [expiryError, setExpiryError] = useState(''); // New state for expiry error message

    useEffect(() => {
        const loadUserData = async () => {
            if (!auth.currentUser) {
                console.error("User is not signed in.");
                return;
            }

            try {
                const userDoc = await getDoc(doc(db, 'applicants', auth.currentUser.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setProfilePicURL(data.profilePicURL || 'defaultProfilePic.jpg');
                    setCoverPhotoURL(data.coverPhotoURL || 'defaultCoverPhoto.jpg');
                    setName(data.name || '');
                    setGithubRepo(data.githubRepo || '');
                    
                    // Process GitHub URL to get the username only
                    const githubUrl = data.githubRepo || '';
                    const githubUsername = githubUrl.replace(/\/[^/]*$/, '');
                    
                    setSocialLinks({
                        linkedin: data.socialLinks?.linkedin || '',
                        twitter: data.socialLinks?.twitter || '',
                        portfolio: data.socialLinks?.portfolio || '',
                        github: githubUsername || '',
                        other: data.socialLinks?.other || '',
                    });
                    setCertifications({
                        HTML: Array.isArray(data.certifications?.HTML) ? data.certifications.HTML : [],
                        CSS: Array.isArray(data.certifications?.CSS) ? data.certifications.CSS : [],
                        JavaScript: Array.isArray(data.certifications?.JavaScript) ? data.certifications.JavaScript : [],
                        Others: Array.isArray(data.certifications?.Others) ? data.certifications.Others : [],
                    });
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        loadUserData();
    }, []);

    const handleFileChange = async (e, type) => {
        const file = e.target.files[0];
        if (!file) return;
    
        let storageRef;
        let url;
    
        try {
            if (type === 'certificate') {
                storageRef = ref(storage, `users/${auth.currentUser.uid}/certifications/${selectedSkill}/${file.name}`);
                await uploadBytes(storageRef, file);
                url = await getDownloadURL(storageRef);
                
                // Update the certificate with the image URL
                setNewCertificate(prev => ({
                    ...prev,
                    imageURL: url
                }));
            } else if (type === 'profilePic') {
                storageRef = ref(storage, `users/${auth.currentUser.uid}/profilePic/${file.name}`);
                await uploadBytes(storageRef, file);
                url = await getDownloadURL(storageRef);
                setProfilePicURL(url);
                await updateDoc(doc(db, 'applicants', auth.currentUser.uid), { profilePicURL: url });
            } else if (type === 'coverPhoto') {
                storageRef = ref(storage, `users/${auth.currentUser.uid}/coverPhoto/${file.name}`);
                await uploadBytes(storageRef, file);
                url = await getDownloadURL(storageRef);
                setCoverPhotoURL(url);
                await updateDoc(doc(db, 'applicants', auth.currentUser.uid), { coverPhotoURL: url });
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };
    
    const handleSocialLinkChange = (e, type) => {
        const value = e.target.value;
        setSocialLinks(prev => ({
            ...prev,
            [type]: value
        }));
    };

    const saveSocialLinks = async () => {
        try {
            // Don't modify githubRepo, just save the other social links
            await updateDoc(doc(db, 'applicants', auth.currentUser.uid), { 
                socialLinks: {
                    linkedin: socialLinks.linkedin,
                    twitter: socialLinks.twitter,
                    portfolio: socialLinks.portfolio,
                    other: socialLinks.other
                } 
            });
            setEditMode(false);
            alert("Social links saved successfully!");
        } catch (error) {
            console.error("Error updating social links:", error);
            alert("Error saving social links. Please try again.");
        }
    };

    const handleCertificateInputChange = (e) => {
        const { name, value } = e.target;
        setNewCertificate(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear expiry error when user changes the expiry date
        if (name === 'expiryDate') {
            setExpiryError('');
        }
    };

    // Function to check if a certificate is still valid
    const isCertificateValid = (certificate) => {
        if (!certificate.expiryDate) return true; // No expiry date means valid forever
        
        const today = new Date();
        const expiryDate = new Date(certificate.expiryDate);
        return today <= expiryDate;
    };

    // New function to validate the expiry date before saving
    const validateExpiryDate = () => {
        if (!newCertificate.expiryDate) return true; // No expiry date is valid
        
        const today = new Date();
        const expiryDate = new Date(newCertificate.expiryDate);
        
        if (expiryDate < today) {
            setExpiryError('Cannot add an expired certificate. Please provide a valid expiry date.');
            return false;
        }
        
        setExpiryError('');
        return true;
    };

    const saveCertificate = async () => {
        if (!newCertificate.name || !newCertificate.issuer || !newCertificate.issueDate || !newCertificate.imageURL) {
            alert("Please fill all required fields and upload certificate image");
            return;
        }

        // Validate that the certificate isn't expired
        if (!validateExpiryDate()) {
            return; // Stop if validation fails
        }

        try {
            const updatedCertifications = [...(certifications[selectedSkill] || []), newCertificate];
            setCertifications((prev) => ({
                ...prev,
                [selectedSkill]: updatedCertifications,
            }));
            
            await updateDoc(doc(db, 'applicants', auth.currentUser.uid), {
                certifications: {
                    ...certifications,
                    [selectedSkill]: updatedCertifications,
                },
            });

            // Reset form
            setNewCertificate({
                name: '',
                issuer: '',
                issueDate: '',
                expiryDate: '',
                credentialID: '',
                imageURL: '',
            });
        } catch (error) {
            console.error("Error saving certificate:", error);
        }
    };

    const archiveFile = async (type, skill, certificate) => {
         const customDocId = `deleted-file-${Date.now()}-${certificate.id || Math.random().toString(36).substring(2, 8)}`;

        const archivedData = {
            applicantId: auth.currentUser.uid,
            type,
            skill,
            certificate,
            deletedAt: new Date(),
        };
        try {
            await setDoc(doc(db, "deletedFiles", customDocId), {
                    deletedAt: serverTimestamp(),
                    userId: auth.currentUser.uid
                    });
        } catch (error) {
            console.error("Error archiving file:", error);
        }
    };

    const handleDelete = async (type, skill, certificate) => {
        try {
            // Archive the certificate before deletion
            await archiveFile(type, skill, certificate);
            
            // Delete the image from storage if there is an imageURL
           if (certificate.imageURL) {
                try {
                    // For Storage operations, we use ref() from firebase/storage
                    const storageRef = ref(storage, certificate.imageURL);
                    
                    // For Firestore operations, we need to use a document reference from firebase/firestore
                    // First save the info about the file being deleted
                    const customDocId = `deleted-certificate-${Date.now()}-${certificate.id || Math.random().toString(36).substring(2, 8)}`;

                    // Use setDoc with a document reference that includes your custom ID
                    await setDoc(doc(db, "deletedFiles", customDocId), {
                    storageURL: certificate.imageURL,
                    deletedAt: serverTimestamp(),
                    userId: auth.currentUser.uid
                    });
                    
                    // Then delete the file from storage
                    await deleteObject(storageRef);
                } catch (error) {
                    console.error("Error in deletion process:", error);
                    throw error; // Re-throw so the caller can handle it
                }
                }
            // Remove the certificate from the certifications array
            const updatedCertifications = certifications[skill].filter(
                (cert) => cert.imageURL !== certificate.imageURL || cert.name !== certificate.name
            );
        
            setCertifications((prev) => ({
                ...prev,
                [skill]: updatedCertifications,
            }));
        
            // Update Firestore with the new certifications list
            await updateDoc(doc(db, 'applicants', auth.currentUser.uid), {
                certifications: {
                    ...certifications,
                    [skill]: updatedCertifications,
                },
            });
        } catch (error) {
            console.error("Error deleting certificate:", error);
        }
    };

    // Enhanced InfoPopover component with better styling
    const InfoPopover = ({ show, onClose, title, content }) => {
        if (!show) return null;
        
return (
           <AnimatedGroup 
                    className="my-12 space-y-6 bg-gray-50 p-6 rounded-lg shadow-md"
                    baseDelay={0.2}  // Start delay (seconds)
                    delayIncrement={0.15}  // Each child adds this much delay
                  >
            <div style={{
                position: 'absolute',
                zIndex: 1000,
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '0',
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                maxWidth: '380px',
                right: '0',
                top: '30px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                animation: 'fadeIn 0.3s ease'
            }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '15px 20px',
                    borderBottom: '1px solid #f0f0f0',
                    backgroundColor: '#f8f9fa'
                }}>
                    <h4 style={{ 
                        margin: 0, 
                        color: '#3a3a3a', 
                        fontSize: '16px',
                        fontWeight: '600'
                    }}>{title}</h4>
                    <button 
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '18px',
                            color: '#666',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {e.target.style.backgroundColor = '#f0f0f0'; e.target.style.color = '#333';}}
                        onMouseOut={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#666';}}
                    >
                        ×
                    </button>
                </div>
                <div style={{ 
                    padding: '20px',
                    color: '#444',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    maxHeight: '400px',
                    overflowY: 'auto'
                }}>
                    {content}
                </div>
            </div>
                </AnimatedGroup>
        
        );
    };

    // InfoButton component for consistent styling
    const InfoButton = ({ onClick, style }) => (
        <button 
            onClick={onClick}
            style={{
                backgroundColor: 'rgb(255, 255, 255)',
                border: '0px solid #e0e0e0',
                borderRadius: '10%',
                width: '1px',
                height: '1px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
                transition: 'all 0.2s ease',
                opacity: '1',
                ...style
            }}
            onMouseOver={(e) => {e.target.style.backgroundColor = '#f0f9ff'; e.target.style.boxShadow = '0 3px 7px rgba(0,0,0,0.12)';}}
            onMouseOut={(e) => {e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'; e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.08)';}}
        >
            <span style={{ 
               
                fontSize: '15px', 
                color: '#0078d4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>ℹ️</span>
        </button>
    );

    // Style for section containers
    const sectionStyle = {
        marginTop: '30px', 
        padding: '25px', 
        background: '#ffffff', 
        borderRadius: '12px', 
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        width: '100%',
        transition: '0.3s ease',
        position: 'relative',
        border: '1px solid #f0f0f0'
    };

    return (
         <AnimatedGroup 
                    className="my-12 space-y-6 bg-gray-50 p-6 rounded-lg shadow-md"
                    baseDelay={0.2}  // Start delay (seconds)
                    delayIncrement={0.15}  // Each child adds this much delay
                  >
        <div id='applicant'>
            <h2>Applicant Profile</h2>

            {/* Cover Photo */}
            <div style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden', borderRadius: '12px',marginTop:"2rem" }}>
                <div style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 10 }}>
                    <InfoButton 
                        onClick={() => setShowCoverGuide(!showCoverGuide)}
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}
                    />
                    <div style={{ position: 'relative' }}>
                        <InfoPopover 
                            show={showCoverGuide} 
                            onClose={() => setShowCoverGuide(false)} 
                            title="Cover Photo Guidelines"
                            content={
                                <div>
                                    <p style={{ fontSize: '14px', margin: '0 0 15px 0' }}>Your cover photo creates the first impression for recruiters and employers.</p>
                                    <ul style={{ paddingLeft: '20px', margin: '0 0 15px 0', color: '#555' }}>
                                        <li style={{ marginBottom: '8px' }}><strong>Recommended size:</strong> 1584×396 pixels</li>
                                        <li style={{ marginBottom: '8px' }}><strong>Content:</strong> Professional background related to your field</li>
                                        <li style={{ marginBottom: '8px' }}><strong>Best practice:</strong> Avoid busy images with text</li>
                                        <li style={{ marginBottom: '8px' }}><strong>How to update:</strong> Click anywhere on the cover image to upload a new one</li>
                                    </ul>
                                    <div style={{ 
                                       
                                        padding: '12px',
                                        backgroundColor: '#f0f9ff',
                                        borderLeft: '4px solid #0078d4',
                                        borderRadius: '4px',
                                        fontSize: '13px'
                                    }}>
                                        A professional cover photo increases profile views by up to 40%.
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </div>
                <img
                    src={coverPhotoURL}
                    alt="Cover"
                    style={{ 
                        
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        cursor: 'pointer',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                    onClick={() => document.getElementById('coverPhotoInput').click()}
                />
                <input
                    id="coverPhotoInput"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(e, 'coverPhoto')}
                />
            </div>

            {/* Profile Picture */}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '-50px', position: 'relative' }}>
                <div style={{ position: 'relative', marginLeft: '20px' }}>
                    <img
                        src={profilePicURL}
                        alt="Profile"
                        style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            border: '4px solid white',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
                            objectFit: 'cover'
                        }}
                        onClick={() => document.getElementById('profilePicInput').click()}
                    />
                    <InfoButton 
                        onClick={() => setShowProfileGuide(!showProfileGuide)}
                        style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px',
                            zIndex: 5,
                        }}
                    />
                </div>
                <input
                    id="profilePicInput"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none'}}
                    onChange={(e) => handleFileChange(e, 'profilePic')}
                />
                <div style={{ marginLeft: '20px', position: 'relative' }}>
                    <InfoPopover 
                        show={showProfileGuide} 
                        onClose={() => setShowProfileGuide(false)} 
                        title="Profile Picture Guidelines"
                        content={
                            <div>
                                <p style={{ fontSize: '14px', margin: '0 0 15px 0' }}>Your profile picture is your professional identity online:</p>
                                <ul style={{ paddingLeft: '20px', margin: '0 0 15px 0', color: '#555' }}>
                                    <li style={{ marginBottom: '8px' }}><strong>Quality:</strong> Use a high-quality, professional headshot</li>
                                    <li style={{ marginBottom: '8px' }}><strong>Setting:</strong> Ensure good lighting and a neutral background</li>
                                    <li style={{ marginBottom: '8px' }}><strong>Framing:</strong> Face should take up 60% of the frame</li>
                                    <li style={{ marginBottom: '8px' }}><strong>Appearance:</strong> Present a professional appearance</li>
                                    <li style={{ marginBottom: '8px' }}><strong>How to update:</strong> Click on the current image to update</li>
                                </ul>
                                <div style={{ 
                                    padding: '12px',
                                    backgroundColor: '#f0f9ff',
                                    borderLeft: '4px solid #0078d4',
                                    borderRadius: '4px',
                                    fontSize: '13px'
                                }}>
                                    Profiles with professional photos get up to 21× more views and 36× more messages.
                                </div>
                            </div>
                        }
                    />
                    <br></br>
                    <h3>{name}</h3>
                </div>
            </div>

            {/* Badges */}
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', marginLeft: "20px" }}>
                {Object.keys(certifications).map((skill) =>
                    certifications[skill]?.length > 0 ? (
                    <span
                        key={skill}
                        style={{
                            backgroundColor: '#0078d4',
                            color: 'white',
                            padding: '7px 12px',
                            borderRadius: '50px',
                            fontSize: '13px',
                            fontWeight: '500',
                            boxShadow: '0 2px 5px rgba(0, 120, 212, 0.3)',
                        }}
                    >
                        {skill} Certified
                    </span>
                    ) : null
                )}
            </div>

            {/* Social Links Section */}
            <div style={sectionStyle} id='SocialLinks'>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h4 style={{ fontWeight: '600', margin: '0', fontSize: '18px', color: '#333' }}>
                            <span style={{ marginRight: '10px', fontSize: '20px' }}>🔗</span> Social Links
                        </h4>
                        <div style={{ position: 'relative', marginLeft: '10px' }}>
                            <InfoButton onClick={() => setShowSocialGuide(!showSocialGuide)} />
                            <InfoPopover 
                                show={showSocialGuide} 
                                onClose={() => setShowSocialGuide(false)} 
                                title="Social Links Importance"
                                content={
                                    <div>
                                        <p style={{ fontSize: '14px', margin: '0 0 15px 0' }}>Adding social links helps employers verify your professional identity and work:</p>
                                        <ul style={{ paddingLeft: '20px', margin: '0 0 15px 0', color: '#555' }}>
                                            <li style={{ marginBottom: '8px' }}><strong>LinkedIn:</strong> Shows your full professional experience and network</li>
                                            <li style={{ marginBottom: '8px' }}><strong>GitHub:</strong> Demonstrates your actual coding projects and contributions</li>
                                            <li style={{ marginBottom: '8px' }}><strong>Twitter:</strong> Shows industry engagement and thought leadership</li>
                                            <li style={{ marginBottom: '8px' }}><strong>Portfolio:</strong> Showcases your best projects and technical skills</li>
                                        </ul>
                                        <div style={{ 
                                            padding: '12px',
                                            backgroundColor: '#f0f9ff',
                                            borderLeft: '4px solid #0078d4',
                                            borderRadius: '4px',
                                            fontSize: '13px',
                                            marginBottom: '10px'
                                        }}>
                                            Complete profiles with active social links receive 30% more interest from employers.
                                        </div>
                                        <div style={{ 
                                            padding: '12px',
                                            backgroundColor: '#fff8f0',
                                            borderLeft: '4px solid #f7b731',
                                            borderRadius: '4px',
                                            fontSize: '13px'
                                        }}>
                                            <strong>Pro tip:</strong> Keep all your social profiles updated with consistent information.
                                        </div>
                                    </div>
                                }
                            />
                        </div>
                    </div>
                    
                    {editMode ? (
                        <div>
                            <button 
                                onClick={saveSocialLinks}
                                style={{
                                    padding: '8px 15px',
                                    backgroundColor: '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    marginRight: '10px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 2px 5px rgba(40, 167, 69, 0.25)'
                                }}
                                onMouseOver={(e) => {e.target.style.backgroundColor = '#218838'; e.target.style.boxShadow = '0 4px 8px rgba(40, 167, 69, 0.3)';}}
                                onMouseOut={(e) => {e.target.style.backgroundColor = '#28a745'; e.target.style.boxShadow = '0 2px 5px rgba(40, 167, 69, 0.25)';}}
                            >
                                Save
                            </button>
                            <button 
                                onClick={() => setEditMode(false)}
                                style={{
                                    padding: '8px 15px',
                                    backgroundColor: '#6c757d',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 2px 5px rgba(108, 117, 125, 0.25)'
                                }}
                                onMouseOver={(e) => {e.target.style.backgroundColor = '#5a6268'; e.target.style.boxShadow = '0 4px 8px rgba(108, 117, 125, 0.3)';}}
                                onMouseOut={(e) => {e.target.style.backgroundColor = '#6c757d'; e.target.style.boxShadow = '0 2px 5px rgba(108, 117, 125, 0.25)';}}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={() => setEditMode(true)}
                            style={{
                                padding: '8px 15px',
                                backgroundColor: '#0078d4',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 2px 5px rgba(0, 120, 212, 0.25)'
                            }}
                            onMouseOver={(e) => {e.target.style.backgroundColor = '#006cbd'; e.target.style.boxShadow = '0 4px 8px rgba(0, 120, 212, 0.3)';}}
                            onMouseOut={(e) => {e.target.style.backgroundColor = '#0078d4'; e.target.style.boxShadow = '0 2px 5px rgba(0, 120, 212, 0.25)';}}
                        >
                            Edit
                        </button>
                    )}
                </div>
                
                <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <label style={{ width: '100px', textAlign: 'right', marginRight: '15px', fontWeight: '500', color: '#444' }}>LinkedIn:</label>
                    <input
                        type="text"
                        value={socialLinks.linkedin}
                        onChange={(e) => handleSocialLinkChange(e, 'linkedin')}
                        placeholder="Your LinkedIn URL"
                        disabled={!editMode}
                        style={{ 
                            padding: '10px 15px', 
                            borderRadius: '8px', 
                            border: '1px solid #ddd',
                            width: '60%',
                            maxWidth: '400px',
                            backgroundColor: editMode ? '#fff' : '#f9f9f9',
                            transition: 'all 0.3s ease',
                            fontSize: '14px'
                        }}
                    />
                </div>
                
                <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <label style={{ width: '100px', textAlign: 'right', marginRight: '15px', fontWeight: '500', color: '#444' }}>GitHub:</label>
                    <input
                        type="text"
                        value={socialLinks.github}
                        onChange={(e) => handleSocialLinkChange(e, 'github')}
                        placeholder="Your GitHub Username"
                        disabled={true}
                        style={{ 
                            padding: '10px 15px', 
                            borderRadius: '8px', 
                            border: '1px solid #ddd',
                            width: '60%',
                            maxWidth: '400px',
                            backgroundColor: '#f9f9f9',
                            color: '#666',
                            fontSize: '14px'
                        }}
                    />
                </div>
                
                <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <label style={{ width: '100px', textAlign: 'right', marginRight: '15px', fontWeight: '500', color: '#444' }}>Twitter:</label>
                    <input
                        type="text"
                        value={socialLinks.twitter}
                        onChange={(e) => handleSocialLinkChange(e, 'twitter')}
                        placeholder="Your Twitter URL"
                        disabled={!editMode}
                        style={{ 
                            padding: '10px 15px', 
                            borderRadius: '8px', 
                            border: '1px solid #ddd',
                            width: '60%',
                            maxWidth: '400px',
                            backgroundColor: editMode ? '#fff' : '#f9f9f9',
                            transition: 'all 0.3s ease',
                            fontSize: '14px'
                        }}
                    />
                </div>
                
                <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <label style={{ width: '100px', textAlign: 'right', marginRight: '15px', fontWeight: '500', color: '#444' }}>Portfolio:</label>
    <input
        type="text"
        value={socialLinks.portfolio}
        onChange={(e) => handleSocialLinkChange(e, 'portfolio')}
        placeholder="Your Portfolio URL"
        disabled={!editMode}
        style={{ 
            padding: '10px 15px', 
            borderRadius: '8px', 
            border: '1px solid #ddd',
            width: '60%',
            maxWidth: '400px',
            backgroundColor: editMode ? '#fff' : '#f9f9f9',
            transition: 'all 0.3s ease',
            fontSize: '14px'
        }}
    />
</div>

<div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <label style={{ width: '100px', textAlign: 'right', marginRight: '15px', fontWeight: '500', color: '#444' }}>Other:</label>
    <input
        type="text"
        value={socialLinks.other}
        onChange={(e) => handleSocialLinkChange(e, 'other')}
        placeholder="Other website URL"
        disabled={!editMode}
        style={{ 
            padding: '10px 15px', 
            borderRadius: '8px', 
            border: '1px solid #ddd',
            width: '60%',
            maxWidth: '400px',
            backgroundColor: editMode ? '#fff' : '#f9f9f9',
            transition: 'all 0.3s ease',
            fontSize: '14px'
        }}
    />
</div>
</div>

{/* Certifications Section */}
<div style={sectionStyle} id='Certifications'>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <h4 style={{ fontWeight: '600', margin: '0', fontSize: '18px', color: '#333' }}>
                <span style={{ marginRight: '10px', fontSize: '20px' }}>🏆</span> Certifications
            </h4>
            <div style={{ position: 'relative', marginLeft: '10px' }}>
                <InfoButton onClick={() => setShowCertGuide(!showCertGuide)} />
                <InfoPopover 
                    show={showCertGuide} 
                    onClose={() => setShowCertGuide(false)} 
                    title="Certification Guidelines"
                    content={
                        <div>
                            <p style={{ fontSize: '14px', margin: '0 0 15px 0' }}>Adding verified certifications enhances your credibility:</p>
                            <ul style={{ paddingLeft: '20px', margin: '0 0 15px 0', color: '#555' }}>
                                <li style={{ marginBottom: '8px' }}><strong>Issuer:</strong> Include the organization that granted the certification</li>
                                <li style={{ marginBottom: '8px' }}><strong>Dates:</strong> Issue date and expiry date if applicable</li>
                                <li style={{ marginBottom: '8px' }}><strong>ID:</strong> Credential ID for verification purposes</li>
                                <li style={{ marginBottom: '8px' }}><strong>Image:</strong> Upload your certificate image for verification</li>
                            </ul>
                            <div style={{ 
                                padding: '12px',
                                backgroundColor: '#f0f9ff',
                                borderLeft: '4px solid #0078d4',
                                borderRadius: '4px',
                                fontSize: '13px',
                                marginBottom: '10px'
                            }}>
                                Applicants with verified certifications are 59% more likely to receive interview requests.
                            </div>
                            <div style={{ 
                                padding: '12px',
                                backgroundColor: '#fff8f0',
                                borderLeft: '4px solid #f7b731',
                                borderRadius: '4px',
                                fontSize: '13px'
                            }}>
                                <strong>Pro tip:</strong> Keep your certifications current and updated with the latest versions.
                            </div>
                        </div>
                    }
                />
            </div>
        </div>
    </div>

    {/* Tabs for certification categories */}
    <div style={{ marginBottom: '20px', display: 'flex', borderBottom: '1px solid #eee' }}>
        {Object.keys(certifications).map((skill) => (
            <div
                key={skill}
                onClick={() => setSelectedSkill(skill)}
                style={{
                    padding: '12px 20px',
                    fontWeight: selectedSkill === skill ? '600' : '400',
                    cursor: 'pointer',
                    borderBottom: selectedSkill === skill ? '3px solid #0078d4' : 'none',
                    color: selectedSkill === skill ? '#0078d4' : '#555',
                    transition: 'all 0.3s ease',
                }}
            >
                {skill} {certifications[skill]?.length > 0 && `(${certifications[skill].length})`}
            </div>
        ))}
    </div>

    {/* Current Certifications Display */}
    <div style={{ marginBottom: '30px' }}>
        {certifications[selectedSkill]?.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                {certifications[selectedSkill].map((cert, index) => (
                    <div
                        key={index}
                        style={{
                            width: 'calc(33.33% - 10px)',
                            minWidth: '250px',
                            border: '1px solid #eee',
                            borderRadius: '8px',
                            padding: '15px',
                            position: 'relative',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                            backgroundColor: isCertificateValid(cert) ? '#fff' : '#fff5f5',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                        }}
                    >
                        {!isCertificateValid(cert) && (
                            <div style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                backgroundColor: '#ff4d4f',
                                color: 'white',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                fontWeight: '500'
                            }}>
                                Expired
                            </div>
                        )}
                        <div style={{ marginBottom: '10px', height: '150px', overflow: 'hidden', borderRadius: '5px' }}>
                            <img
                                src={cert.imageURL}
                                alt={cert.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <h5 style={{ margin: '8px 0', fontSize: '16px', color: '#333', fontWeight: '600' }}>{cert.name}</h5>
                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                            <strong>Issuer:</strong> {cert.issuer}
                        </p>
                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                            <strong>Issued:</strong> {cert.issueDate}
                        </p>
                        {cert.expiryDate && (
                            <p style={{ margin: '5px 0', fontSize: '14px', color: isCertificateValid(cert) ? '#555' : '#ff4d4f' }}>
                                <strong>Expires:</strong> {cert.expiryDate}
                            </p>
                        )}
                        {cert.credentialID && (
                            <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                                <strong>ID:</strong> {cert.credentialID}
                            </p>
                        )}
                        <div style={{ marginTop: '15px', textAlign: 'right' }}>
                            <button
                                onClick={() => handleDelete('certification', selectedSkill, cert)}
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    color: '#dc3545',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '5px 10px',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseOver={(e) => {e.target.style.backgroundColor = '#ffecec';}}
                                onMouseOut={(e) => {e.target.style.backgroundColor = '#f5f5f5';}}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div style={{ textAlign: 'center', padding: '30px 0', color: '#777', fontSize: '15px' }}>
                No {selectedSkill} certifications added yet.
            </div>
        )}
    </div>

    {/* Add New Certification Form */}
    <div>
        <h5 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
            Add New {selectedSkill} Certification
        </h5>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#444', fontSize: '14px' }}>
                        Certificate Name*
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={newCertificate.name}
                        onChange={handleCertificateInputChange}
                        placeholder="e.g. JavaScript Advanced"
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            borderRadius: '8px', 
                            border: '1px solid #ddd'
                        }}
                    />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#444', fontSize: '14px' }}>
                        Issuer*
                    </label>
                    <input
                        type="text"
                        name="issuer"
                        value={newCertificate.issuer}
                        onChange={handleCertificateInputChange}
                        placeholder="e.g. Udemy, Coursera"
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            borderRadius: '8px', 
                            border: '1px solid #ddd'
                        }}
                    />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#444', fontSize: '14px' }}>
                        Credential ID
                    </label>
                    <input
                        type="text"
                        name="credentialID"
                        value={newCertificate.credentialID}
                        onChange={handleCertificateInputChange}
                        placeholder="e.g. ABC123XYZ"
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            borderRadius: '8px', 
                            border: '1px solid #ddd'
                        }}
                    />
                </div>
            </div>
            
            <div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#444', fontSize: '14px' }}>
                        Issue Date*
                    </label>
                    <input
                        type="date"
                        name="issueDate"
                        value={newCertificate.issueDate}
                        onChange={handleCertificateInputChange}
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            borderRadius: '8px', 
                            border: '1px solid #ddd'
                        }}
                    />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#444', fontSize: '14px' }}>
                        Expiry Date (if applicable)
                    </label>
                    <input
                        type="date"
                        name="expiryDate"
                        value={newCertificate.expiryDate}
                        onChange={handleCertificateInputChange}
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            borderRadius: '8px', 
                            border: '1px solid #ddd'
                        }}
                    />
                    {expiryError && (
                        <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                            {expiryError}
                        </p>
                    )}
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#444', fontSize: '14px' }}>
                        Certificate Image*
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'certificate')}
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            borderRadius: '8px', 
                            border: '1px solid #ddd'
                        }}
                    />
                </div>
            </div>
        </div>
        
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <button
                onClick={saveCertificate}
                style={{
                    backgroundColor: '#0078d4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    boxShadow: '0 2px 5px rgba(0, 120, 212, 0.25)',
                    transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {e.target.style.backgroundColor = '#006cbd'; e.target.style.boxShadow = '0 4px 8px rgba(0, 120, 212, 0.3)';}}
                onMouseOut={(e) => {e.target.style.backgroundColor = '#0078d4'; e.target.style.boxShadow = '0 2px 5px rgba(0, 120, 212, 0.25)';}}
            >
                Add Certificate
            </button>
        </div>
    </div>
</div>
</div>
</AnimatedGroup>
);
};

export default ApplicantProfile;
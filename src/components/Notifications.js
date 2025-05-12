// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles.css";


// const NotificationPanel = () => {
//   const [notifications, setNotifications] = useState({
//     news: [],
//     application: [],
//   });
//   const [activeTab, setActiveTab] = useState("news");


//   useEffect(() => {
//     setNotifications({
//       news: [
//         { id: 1, message: "New job posting available!", route: "/applicant/search-jobs" },
//         { id: 4, message: "Visit Ski-Folio", route: "/" }
//       ],
//       application: [
//         { id: 2, message: "Your application has been viewed!", route: "/applicant/profile" }
//       ],
//     });
//   }, []);


//   return (
//     <div className="notification-page" style={{ position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)", width: "80%" }}>
//       <h2>Notifications</h2>
//       <div className="tabs" style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #ccc", paddingBottom: "5px" }}>
//         {Object.keys(notifications).map((tab) => (
//           <button
//             key={tab}
//             className={`tab-button ${activeTab === tab ? "active" : ""}`}
//             onClick={() => setActiveTab(tab)}
//             style={{ flex: "1", textAlign: "center", padding: "10px", border: "1px", background: "#4ad4d4", cursor: "pointer" }}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>
//       <div className="notification-content">
//         <ul>
//           {notifications[activeTab].length > 0 ? (
//             notifications[activeTab].map((notif) => (
//               <li key={notif.id} className="notification-item">
//                 <Link to={notif.route}>{notif.message}</Link>
//               </li>
//             ))
//           ) : (
//             <li>
//               {activeTab === "application"? (
//                 "They are still currently reviewing your application."
//               ) : (
//                 "No new notifications"
//               )}
//             </li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };


// export default NotificationPanel;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { db, auth } from "../firebase"; // Import Firestore & Auth
// import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles.css";

// const NotificationPanel = () => {
//   const [notifications, setNotifications] = useState({
//     news: [],
//     application: [],
//   });
//   const [activeTab, setActiveTab] = useState("news");
//   const [userType, setUserType] = useState(null);

//   useEffect(() => {
//     const fetchUserType = async () => {
//       if (auth.currentUser) {
//         const userRef = doc(db, "applicants", auth.currentUser.uid);
//         const employerRef = doc(db, "employers", auth.currentUser.uid);

//         const userSnap = await getDoc(userRef);
//         const employerSnap = await getDoc(employerRef);

//         if (userSnap.exists()) {
//           setUserType("applicant");
//         } else if (employerSnap.exists()) {
//           setUserType("employer");
//         }
//       }
//     };

//     const fetchNotifications = async () => {
//       const newsCollection = collection(db, "news");
//       const querySnapshot = await getDocs(newsCollection);
//       const fetchedNews = querySnapshot.docs.map((doc) => doc.data());

//       if (userType === "applicant") {
//         setNotifications({
//           news: fetchedNews,
//           application: [
//             { id: 1, message: "Your application has been viewed!", route: "/applicant/profile" },
//           ],
//         });
//       } else if (userType === "employer") {
//         // Fetch job applications linked to this employer's job posts
//         const employerJobPostsQuery = query(collection(db, "jobs"), where("employerId", "==", auth.currentUser.uid));
//         const jobPostsSnapshot = await getDocs(employerJobPostsQuery);
//         const jobPosts = jobPostsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

//         let applications = [];
//         for (const job of jobPosts) {
//           const applicationsQuery = collection(db, "jobs", job.id, "applications");
//           const applicationsSnapshot = await getDocs(applicationsQuery);

//           applications = applicationsSnapshot.docs.map((doc) => ({
//             id: doc.id,
//             message: `New applicant for ${job.title}!`,
//             route: "/employer/profile",
//           }));
//         }

//         setNotifications({
//           news: fetchedNews,
//           application: applications.length > 0 ? applications : [{ id: 2, message: "No new applications.", route: "#" }],
//         });
//       }
//     };

//     fetchUserType().then(fetchNotifications);
//   }, [userType]);

//   return (
//     <div className="notification-page" style={{ position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)", width: "80%" }}>
//       <h2>Notifications</h2>
//       <div className="tabs" style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #ccc", paddingBottom: "5px" }}>
//         {Object.keys(notifications).map((tab) => (
//           <button
//             key={tab}
//             className={`tab-button ${activeTab === tab ? "active" : ""}`}
//             onClick={() => setActiveTab(tab)}
//             style={{ flex: "1", textAlign: "center", padding: "10px", background: "#4ad4d4", cursor: "pointer" }}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>
//       <div className="notification-content">
//         <ul>
//           {notifications[activeTab].length > 0 ? (
//             notifications[activeTab].map((notif, index) => (
//               <li key={index} className="notification-item">
//                 <Link to={notif.route}>{notif.message}</Link>
//               </li>
//             ))
//           ) : (
//             <li>
//               {activeTab === "application" ? "No new application updates." : "No new notifications."}
//             </li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default NotificationPanel;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { db, auth } from "../firebase";
// import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles.css";

// const NotificationPanel = () => {
//   const [notifications, setNotifications] = useState({
//     news: [],
//     application: [],
//   });
//   const [activeTab, setActiveTab] = useState("news");
//   const [userType, setUserType] = useState(null);

//   useEffect(() => {
//     const fetchUserType = async () => {
//       if (auth.currentUser) {
//         const userRef = doc(db, "applicants", auth.currentUser.uid);
//         const employerRef = doc(db, "employers", auth.currentUser.uid);

//         const userSnap = await getDoc(userRef);
//         const employerSnap = await getDoc(employerRef);

//         if (userSnap.exists()) {
//           setUserType("applicant");
//         } else if (employerSnap.exists()) {
//           setUserType("employer");
//         }
//       }
//     };

//     const fetchNotifications = async () => {
//       const newsCollection = collection(db, "news");
//       const querySnapshot = await getDocs(newsCollection);
//       const fetchedNews = querySnapshot.docs.map((doc) => doc.data());

//       if (userType === "applicant") {
//         setNotifications({
//           news: fetchedNews,
//           application: [
//             { id: 1, message: "Your application has been viewed!", route: "/applicant/profile" },
//           ],
//         });
//       } else if (userType === "employer") {
//         // Fetch job applications for employer's job posts
//         const employerJobPostsQuery = query(collection(db, "jobs"), where("employerId", "==", auth.currentUser.uid));
//         const jobPostsSnapshot = await getDocs(employerJobPostsQuery);
//         const jobPosts = jobPostsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

//         let jobNotifications = [];
//         for (const job of jobPosts) {
//           const applicationsQuery = collection(db, "jobs", job.id, "applications");
//           const applicationsSnapshot = await getDocs(applicationsQuery);

//           const applicationCount = applicationsSnapshot.docs.length;
//           if (applicationCount > 0) {
//             jobNotifications.push({
//               id: job.id,
//               message: `${applicationCount} new applicant(s) for ${job.title}!`,
//               route: "/employer/profile",
//             });
//           }
//         }

//         setNotifications({
//           news: fetchedNews,
//           jobPost: jobNotifications.length > 0 ? jobNotifications : [{ id: "empty", message: "No new applications.", route: "#" }],
//         });
//       }
//     };

//     fetchUserType().then(fetchNotifications);
//   }, [userType]);

//   return (
//     <div className="notification-page" style={{ position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)", width: "80%" }}>
//       <h2>Notifications</h2>
//       <div className="tabs" style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #ccc", paddingBottom: "5px" }}>
//         {Object.keys(notifications).map((tab) => (
//           <button
//             key={tab}
//             className={`tab-button ${activeTab === tab ? "active" : ""}`}
//             onClick={() => setActiveTab(tab)}
//             style={{ flex: "1", textAlign: "center", padding: "10px", background: "#4ad4d4", cursor: "pointer" }}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>
//       <div className="notification-content">
//         <ul>
//           {notifications[activeTab].length > 0 ? (
//             notifications[activeTab].map((notif, index) => (
//               <li key={index} className="notification-item">
//                 <Link to={notif.route}>{notif.message}</Link>
//               </li>
//             ))
//           ) : (
//             <li>
//               {activeTab === "jobPost" ? "No new applications for your job posts." : "No new notifications."}
//             </li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default NotificationPanel;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { db, auth } from "../firebase";
// import { collection, getDocs, doc, getDoc, query, where,deleteDoc } from "firebase/firestore";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles.css";

// const NotificationPanel = () => {
//   const [notifications, setNotifications] = useState({
//     news: [],
//     application: [],
//   });
//   const [activeTab, setActiveTab] = useState("news");
//   const [userType, setUserType] = useState(null);

//   useEffect(() => {
//     const fetchUserType = async () => {
//       if (auth.currentUser) {
//         const userRef = doc(db, "applicants", auth.currentUser.uid);
//         const employerRef = doc(db, "employers", auth.currentUser.uid);

//         const userSnap = await getDoc(userRef);
//         const employerSnap = await getDoc(employerRef);

//         if (userSnap.exists()) {
//           setUserType("applicant");
//         } else if (employerSnap.exists()) {
//           setUserType("employer");
//         }
//       }
//     };

//     const fetchNotifications = async () => {
//       if (!auth.currentUser) return;
  
//       try {
//           // Reference to the current user's notifications subcollection
//           const notificationsRef = collection(db, "applicants", auth.currentUser.uid, "notifications");
  
//           // Query to fetch only "unread" notifications
//           const q = query(notificationsRef, where("status", "==", "unread"));
//           const querySnapshot = await getDocs(q);
  
//           // Store notifications along with document ID for deletion
//           const fetchedNotifications = querySnapshot.docs.map((doc) => ({
//               id: doc.id,
//               ...doc.data(),
//           }));
  
//           setNotifications((prev) => ({
//               ...prev,
//               application: fetchedNotifications,
//           }));
//       } catch (error) {
//           console.error("Error fetching notifications:", error);
//       }
//   };
  

//     fetchUserType().then(fetchNotifications);
//   }, [userType]);
//   const handleNotificationClick = async (notifId) => {
//     if (!auth.currentUser) return;

//     try {
//         // Reference to the notification document
//         const notifDocRef = doc(db, "applicants", auth.currentUser.uid, "notifications", notifId);

//         // Delete the notification after clicking
//         await deleteDoc(notifDocRef);

//         // Remove it from state
//         setNotifications((prev) => ({
//             ...prev,
//             application: prev.application.filter((notif) => notif.id !== notifId),
//         }));
//     } catch (error) {
//         console.error("Error updating notification status:", error);
//     }
// };

//   return (
//     <div className="notification-page" style={{ position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)", width: "80%" }}>
//       <h2>Notifications</h2>
//       <div className="tabs" style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #ccc", paddingBottom: "5px" }}>
//         {Object.keys(notifications).map((tab) => (
//           <button
//             key={tab}
//             className={`tab-button ${activeTab === tab ? "active" : ""}`}
//             onClick={() => setActiveTab(tab)}
//             style={{ flex: "1", textAlign: "center", padding: "10px", background: "#4ad4d4", cursor: "pointer" }}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>
//       <div className="notification-content">
//         <ul>
//           {notifications[activeTab].length > 0 ? (
//             notifications[activeTab].map((notif, index) => (
//               <li key={index} className="notification-item">
//                 <Link to={notif.route}>{notif.message}</Link>
//               </li>
//             ))
//           ) : (
//             <li>
//               {activeTab === "jobPost" ? "No new applications for your job posts." : "No new notifications."}
//             </li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default NotificationPanel;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles.css";


// const NotificationPanel = () => {
//   const [notifications, setNotifications] = useState({
//     news: [],
//     application: [],
//   });
//   const [activeTab, setActiveTab] = useState("news");


//   useEffect(() => {
//     setNotifications({
//       news: [
//         { id: 1, message: "New job posting available!", route: "/applicant/search-jobs" },
//         { id: 4, message: "Visit Ski-Folio", route: "/" }
//       ],
//       application: [
//         { id: 2, message: "Your application has been viewed!", route: "/applicant/profile" }
//       ],
//     });
//   }, []);


//   return (
//     <div className="notification-page" style={{ position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)", width: "80%" }}>
//       <h2>Notifications</h2>
//       <div className="tabs" style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #ccc", paddingBottom: "5px" }}>
//         {Object.keys(notifications).map((tab) => (
//           <button
//             key={tab}
//             className={`tab-button ${activeTab === tab ? "active" : ""}`}
//             onClick={() => setActiveTab(tab)}
//             style={{ flex: "1", textAlign: "center", padding: "10px", border: "1px", background: "#4ad4d4", cursor: "pointer" }}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>
//       <div className="notification-content">
//         <ul>
//           {notifications[activeTab].length > 0 ? (
//             notifications[activeTab].map((notif) => (
//               <li key={notif.id} className="notification-item">
//                 <Link to={notif.route}>{notif.message}</Link>
//               </li>
//             ))
//           ) : (
//             <li>
//               {activeTab === "application"? (
//                 "They are still currently reviewing your application."
//               ) : (
//                 "No new notifications"
//               )}
//             </li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };


// export default NotificationPanel;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { db, auth } from "../firebase"; // Import Firestore & Auth
// import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles.css";

// const NotificationPanel = () => {
//   const [notifications, setNotifications] = useState({
//     news: [],
//     application: [],
//   });
//   const [activeTab, setActiveTab] = useState("news");
//   const [userType, setUserType] = useState(null);

//   useEffect(() => {
//     const fetchUserType = async () => {
//       if (auth.currentUser) {
//         const userRef = doc(db, "applicants", auth.currentUser.uid);
//         const employerRef = doc(db, "employers", auth.currentUser.uid);

//         const userSnap = await getDoc(userRef);
//         const employerSnap = await getDoc(employerRef);

//         if (userSnap.exists()) {
//           setUserType("applicant");
//         } else if (employerSnap.exists()) {
//           setUserType("employer");
//         }
//       }
//     };

//     const fetchNotifications = async () => {
//       const newsCollection = collection(db, "news");
//       const querySnapshot = await getDocs(newsCollection);
//       const fetchedNews = querySnapshot.docs.map((doc) => doc.data());

//       if (userType === "applicant") {
//         setNotifications({
//           news: fetchedNews,
//           application: [
//             { id: 1, message: "Your application has been viewed!", route: "/applicant/profile" },
//           ],
//         });
//       } else if (userType === "employer") {
//         // Fetch job applications linked to this employer's job posts
//         const employerJobPostsQuery = query(collection(db, "jobs"), where("employerId", "==", auth.currentUser.uid));
//         const jobPostsSnapshot = await getDocs(employerJobPostsQuery);
//         const jobPosts = jobPostsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

//         let applications = [];
//         for (const job of jobPosts) {
//           const applicationsQuery = collection(db, "jobs", job.id, "applications");
//           const applicationsSnapshot = await getDocs(applicationsQuery);

//           applications = applicationsSnapshot.docs.map((doc) => ({
//             id: doc.id,
//             message: `New applicant for ${job.title}!`,
//             route: "/employer/profile",
//           }));
//         }

//         setNotifications({
//           news: fetchedNews,
//           application: applications.length > 0 ? applications : [{ id: 2, message: "No new applications.", route: "#" }],
//         });
//       }
//     };

//     fetchUserType().then(fetchNotifications);
//   }, [userType]);

//   return (
//     <div className="notification-page" style={{ position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)", width: "80%" }}>
//       <h2>Notifications</h2>
//       <div className="tabs" style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #ccc", paddingBottom: "5px" }}>
//         {Object.keys(notifications).map((tab) => (
//           <button
//             key={tab}
//             className={`tab-button ${activeTab === tab ? "active" : ""}`}
//             onClick={() => setActiveTab(tab)}
//             style={{ flex: "1", textAlign: "center", padding: "10px", background: "#4ad4d4", cursor: "pointer" }}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>
//       <div className="notification-content">
//         <ul>
//           {notifications[activeTab].length > 0 ? (
//             notifications[activeTab].map((notif, index) => (
//               <li key={index} className="notification-item">
//                 <Link to={notif.route}>{notif.message}</Link>
//               </li>
//             ))
//           ) : (
//             <li>
//               {activeTab === "application" ? "No new application updates." : "No new notifications."}
//             </li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default NotificationPanel;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { db, auth } from "../firebase";
// import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles.css";

// const NotificationPanel = () => {
//   const [notifications, setNotifications] = useState({
//     news: [],
//     application: [],
//   });
//   const [activeTab, setActiveTab] = useState("news");
//   const [userType, setUserType] = useState(null);

//   useEffect(() => {
//     const fetchUserType = async () => {
//       if (auth.currentUser) {
//         const userRef = doc(db, "applicants", auth.currentUser.uid);
//         const employerRef = doc(db, "employers", auth.currentUser.uid);

//         const userSnap = await getDoc(userRef);
//         const employerSnap = await getDoc(employerRef);

//         if (userSnap.exists()) {
//           setUserType("applicant");
//         } else if (employerSnap.exists()) {
//           setUserType("employer");
//         }
//       }
//     };

//     const fetchNotifications = async () => {
//       const newsCollection = collection(db, "news");
//       const querySnapshot = await getDocs(newsCollection);
//       const fetchedNews = querySnapshot.docs.map((doc) => doc.data());

//       if (userType === "applicant") {
//         setNotifications({
//           news: fetchedNews,
//           application: [
//             { id: 1, message: "Your application has been viewed!", route: "/applicant/profile" },
//           ],
//         });
//       } else if (userType === "employer") {
//         // Fetch job applications for employer's job posts
//         const employerJobPostsQuery = query(collection(db, "jobs"), where("employerId", "==", auth.currentUser.uid));
//         const jobPostsSnapshot = await getDocs(employerJobPostsQuery);
//         const jobPosts = jobPostsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

//         let jobNotifications = [];
//         for (const job of jobPosts) {
//           const applicationsQuery = collection(db, "jobs", job.id, "applications");
//           const applicationsSnapshot = await getDocs(applicationsQuery);

//           const applicationCount = applicationsSnapshot.docs.length;
//           if (applicationCount > 0) {
//             jobNotifications.push({
//               id: job.id,
//               message: `${applicationCount} new applicant(s) for ${job.title}!`,
//               route: "/employer/profile",
//             });
//           }
//         }

//         setNotifications({
//           news: fetchedNews,
//           jobPost: jobNotifications.length > 0 ? jobNotifications : [{ id: "empty", message: "No new applications.", route: "#" }],
//         });
//       }
//     };

//     fetchUserType().then(fetchNotifications);
//   }, [userType]);

//   return (
//     <div className="notification-page" style={{ position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)", width: "80%" }}>
//       <h2>Notifications</h2>
//       <div className="tabs" style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #ccc", paddingBottom: "5px" }}>
//         {Object.keys(notifications).map((tab) => (
//           <button
//             key={tab}
//             className={`tab-button ${activeTab === tab ? "active" : ""}`}
//             onClick={() => setActiveTab(tab)}
//             style={{ flex: "1", textAlign: "center", padding: "10px", background: "#4ad4d4", cursor: "pointer" }}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>
//       <div className="notification-content">
//         <ul>
//           {notifications[activeTab].length > 0 ? (
//             notifications[activeTab].map((notif, index) => (
//               <li key={index} className="notification-item">
//                 <Link to={notif.route}>{notif.message}</Link>
//               </li>
//             ))
//           ) : (
//             <li>
//               {activeTab === "jobPost" ? "No new applications for your job posts." : "No new notifications."}
//             </li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default NotificationPanel;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { db, auth } from "../firebase";
// import { collection, getDocs, doc, getDoc, query, where,deleteDoc } from "firebase/firestore";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles.css";

// const NotificationPanel = () => {
//   const [notifications, setNotifications] = useState({
//     news: [],
//     application: [],
//   });
//   const [activeTab, setActiveTab] = useState("news");
//   const [userType, setUserType] = useState(null);

//   useEffect(() => {
//     const fetchUserType = async () => {
//       if (auth.currentUser) {
//         const userRef = doc(db, "applicants", auth.currentUser.uid);
//         const employerRef = doc(db, "employers", auth.currentUser.uid);

//         const userSnap = await getDoc(userRef);
//         const employerSnap = await getDoc(employerRef);

//         if (userSnap.exists()) {
//           setUserType("applicant");
//         } else if (employerSnap.exists()) {
//           setUserType("employer");
//         }
//       }
//     };

//     const fetchNotifications = async () => {
//       if (!auth.currentUser) return;
  
//       try {
//           // Reference to the current user's notifications subcollection
//           const notificationsRef = collection(db, "applicants", auth.currentUser.uid, "notifications");
  
//           // Query to fetch only "unread" notifications
//           const q = query(notificationsRef, where("status", "==", "unread"));
//           const querySnapshot = await getDocs(q);
  
//           // Store notifications along with document ID for deletion
//           const fetchedNotifications = querySnapshot.docs.map((doc) => ({
//               id: doc.id,
//               ...doc.data(),
//           }));
  
//           setNotifications((prev) => ({
//               ...prev,
//               application: fetchedNotifications,
//           }));
//       } catch (error) {
//           console.error("Error fetching notifications:", error);
//       }
//   };
  

//     fetchUserType().then(fetchNotifications);
//   }, [userType]);
//   const handleNotificationClick = async (notifId) => {
//     if (!auth.currentUser) return;

//     try {
//         // Reference to the notification document
//         const notifDocRef = doc(db, "applicants", auth.currentUser.uid, "notifications", notifId);

//         // Delete the notification after clicking
//         await deleteDoc(notifDocRef);

//         // Remove it from state
//         setNotifications((prev) => ({
//             ...prev,
//             application: prev.application.filter((notif) => notif.id !== notifId),
//         }));
//     } catch (error) {
//         console.error("Error updating notification status:", error);
//     }
// };

//   return (
//     <div className="notification-page" style={{ position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)", width: "80%" }}>
//       <h2>Notifications</h2>
//       <div className="tabs" style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #ccc", paddingBottom: "5px" }}>
//         {Object.keys(notifications).map((tab) => (
//           <button
//             key={tab}
//             className={`tab-button ${activeTab === tab ? "active" : ""}`}
//             onClick={() => setActiveTab(tab)}
//             style={{ flex: "1", textAlign: "center", padding: "10px", background: "#4ad4d4", cursor: "pointer" }}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>
//       <div className="notification-content">
//         <ul>
//           {notifications[activeTab].length > 0 ? (
//             notifications[activeTab].map((notif, index) => (
//               <li key={index} className="notification-item">
//                 <Link to={notif.route}>{notif.message}</Link>
//               </li>
//             ))
//           ) : (
//             <li>
//               {activeTab === "jobPost" ? "No new applications for your job posts." : "No new notifications."}
//             </li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default NotificationPanel;

// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebase";
// import { collection, getDocs, doc, query, updateDoc, orderBy } from "firebase/firestore";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles.css";

// const NotificationPanel = () => {
//   const [notifications, setNotifications] = useState({
//     news: [],
//     application: [],
//   });
//   const [activeTab, setActiveTab] = useState("news");
//   const [expandedNotif, setExpandedNotif] = useState(null);

//     useEffect(() => {
//       const fetchNotifications = async () => {
//         if (!auth.currentUser) return;
    
//         try {
//           // 1. Personal Notifications
//           const notificationsRef = collection(
//             db,
//             "applicants",
//             auth.currentUser.uid,
//             "notifications"
//           );
//           const q1 = query(notificationsRef);
//           const querySnapshot1 = await getDocs(q1);
    
//           const personalNotifications = querySnapshot1.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }));
    
//           // 2. Public Announcements
//           const announcementRef = collection(db, "announcement");
//           const q2 = query(announcementRef);
//           const querySnapshot2 = await getDocs(q2);
    
//           const applicantAnnouncements = querySnapshot2.docs
//             .map((doc) => ({
//               id: doc.id,
//               ...doc.data(),
//             }))
//             .filter((doc) => doc.recipientType === "applicant");
    
//           // 3. Set separate tabs
//           setNotifications({
//             application: personalNotifications.sort((a, b) => b.timestamp?.toDate() - a.timestamp?.toDate()),
//             news: applicantAnnouncements.sort((a, b) => b.timestamp?.toDate() - a.timestamp?.toDate()),
//           });
//         } catch (error) {
//           console.error("Error fetching notifications:", error);
//         }
//       };
    
//       fetchNotifications();
//     }, []);
  
  

//     const handleNotificationClick = async (notif) => {
//       if (!auth.currentUser) return;
    
//       try {
//         let notifDocRef;
//         const tabKey = notif.recipientType === "applicant" ? "news" : "application";
    
//         if (notif.recipientType === "applicant") {
//           notifDocRef = doc(db, "announcement", notif.id);
//         } else {
//           notifDocRef = doc(
//             db,
//             "applicants",
//             auth.currentUser.uid,
//             "notifications",
//             notif.id
//           );
//         }
    
//         await updateDoc(notifDocRef, { status: "read" });
//         setExpandedNotif(expandedNotif === notif.id ? null : notif.id);
    
//         setNotifications((prev) => ({
//           ...prev,
//           [tabKey]: prev[tabKey].map((n) =>
//             n.id === notif.id ? { ...n, status: "read" } : n
//           ),
//         }));
//       } catch (error) {
//         console.error("Error updating notification status:", error);
//       }
//     };
    
  
//   return (
//     <div className="notification-page">
//       <div className="notification-top">
//         <h2 style={{margin: "25px"}}>Notifications</h2>

//         <div className="tabs">
//           {Object.keys(notifications).map((tab) => (
//             <button
//               key={tab}
//               className={`tab-button ${activeTab === tab ? "active" : ""}`}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>

//         <div className="notification-content">
//   <ul>
//     {notifications[activeTab].length > 0 ? (
//       <>
//         {/* Personal Notifications */}
//         {notifications[activeTab].some((notif) => !notif.recipientType) && (
//           <>
//             <li className="notif-section-title">📬 Your Notifications</li>
//             {notifications[activeTab]
//               .filter((notif) => !notif.recipientType)
//               .map((notif) => (
//                 <li
//                   key={notif.id}
//                   className={`notification-item ${notif.status === "unread" ? "unread" : "read"}`}
//                   onClick={() => handleNotificationClick(notif)}
//                 >
//                   <div className="notif-header">
//                     <strong>{notif.companyName}</strong>
//                     {notif.status === "unread" && (
//                       <span className="badge">New 🔥</span>
//                     )}
//                   </div>

//                   {expandedNotif === notif.id && (
//                     <div className="notif-details">
//                       <p><strong>Subject:</strong> {notif.subject}</p>
//                       <p>{notif.message}</p>
//                       <p className="timestamp">
//                         <strong>Received:</strong> {notif.timestamp?.toDate().toLocaleString()}
//                       </p>
//                     </div>
//                   )}
//                 </li>
//               ))}
//           </>
//         )}

//         {/* Announcements */}
//         {notifications[activeTab].some((notif) => notif.recipientType === "applicant") && (
//           <>
//             <li className="notif-section-title">📢 Announcements from Admin</li>
//             {notifications[activeTab]
//               .filter((notif) => notif.recipientType === "applicant")
//               .map((notif) => (
//                 <li
//                   key={notif.id}
//                   className={`notification-item ${notif.status === "unread" ? "unread" : "read"}`}
//                   onClick={() => handleNotificationClick(notif)}
//                 >
//                   <div className="notif-header">
//                     <strong>Admin</strong>
//                     {notif.status === "unread" && (
//                       <span className="badge">New 📣</span>
//                     )}
//                   </div>

//                   {expandedNotif === notif.id && (
//                     <div className="notif-details">
//                       <p><strong>Subject:</strong> {notif.subject}</p>
//                       <p dangerouslySetInnerHTML={{ __html: notif.message }} />
//                       <p className="timestamp">
//                         <strong>Posted:</strong> {notif.timestamp?.toDate().toLocaleString()}
//                       </p>
//                     </div>
//                   )}
//                 </li>
//               ))}
//           </>
//         )}
//       </>
//     ) : (
//       <li className="empty">No new notifications.</li>
//     )}
//   </ul>
// </div>

//       </div>
//     </div>
//   );
// };

// export default NotificationPanel;

// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebase";
// import { collection, getDocs, doc, query, updateDoc,getDoc } from "firebase/firestore";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles.css";


// const NotificationPanel = () => {
//   const [notifications, setNotifications] = useState({
//     news: [],
//     application: [],
//   });
//   const [activeTab, setActiveTab] = useState("news");
//   const [expandedNotif, setExpandedNotif] = useState(null);
//   const [userType, setUserType] = useState(null); // New state to track user role

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       if (!auth.currentUser) return;
  
//       try {
//         const uid = auth.currentUser.uid;
//         const applicantDoc = doc(db, "applicants", uid);
//         const employerDoc = doc(db, "employers", uid);
  
//         const employerDocSnap = await getDoc(employerDoc);
//         const isEmployer = employerDocSnap.exists();
//         setUserType(isEmployer ? "employer" : "applicant");
  
//         const notificationSnap = await getDocs(
//           collection(isEmployer ? employerDoc : applicantDoc, "notifications")
//         );
//         const applicationNotifications = notificationSnap.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
  
//         // Get all announcements
//         const announcementSnapshot = await getDocs(collection(db, "announcement"));
//         const allAnnouncements = announcementSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//           status: doc.data().status || "unread", // default in case missing
//         }));
  
//         // ✅ Only keep announcements for the current user type
//         const relevantAnnouncements = allAnnouncements.filter(
//           (doc) => doc.recipientType === (isEmployer ? "employer" : "applicant")
//         );
  
//         // Set notifications
//         setNotifications({
//           application: applicationNotifications.sort(
//             (a, b) => b.timestamp?.toDate() - a.timestamp?.toDate()
//           ),
//           news: relevantAnnouncements.sort(
//             (a, b) => b.timestamp?.toDate() - a.timestamp?.toDate()
//           ),
//         });
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     };
  
//     fetchNotifications();
//   }, []);
  

//   const handleNotificationClick = async (notif) => {
//     if (!auth.currentUser) return;

//     try {
//       let notifDocRef;
//       const tabKey = notif.recipientType ? "news" : "application";

//       if (notif.recipientType) {
//         notifDocRef = doc(db, "announcement", notif.id);
//       } else {
//         const path = userType === "employer" ? "employers" : "applicants";
//         notifDocRef = doc(db, path, auth.currentUser.uid, "notifications", notif.id);
//       }

//       await updateDoc(notifDocRef, { status: "read" });
//       setExpandedNotif(expandedNotif === notif.id ? null : notif.id);

//       setNotifications((prev) => ({
//         ...prev,
//         [tabKey]: prev[tabKey].map((n) =>
//           n.id === notif.id ? { ...n, status: "read" } : n
//         ),
//       }));
//     } catch (error) {
//       console.error("Error updating notification status:", error);
//     }
//   };
 
//   return (
//     <div className="notification-page">
//       <div className="notification-top">
//         <h2 style={{ margin: "25px" }}>Notifications</h2>

//         <div className="tabs">
//           {Object.keys(notifications).map((tab) => (
//             <button
//               key={tab}
//               className={`tab-button ${activeTab === tab ? "active" : ""}`}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>

//         <div className="notification-content">
//           <ul>
//             {notifications[activeTab].length > 0 ? (
//               <>
//                 {/* Personal Notifications */}
//                 {notifications[activeTab].some((notif) => !notif.recipientType) && (
//                   <>
//                     <li className="notif-section-title">📬 Your Notifications</li>
//                     {notifications[activeTab]
//                       .filter((notif) => !notif.recipientType)
//                       .map((notif) => (
//                         <li
//                           key={notif.id}
//                           className={`notification-item ${notif.status === "unread" ? "unread" : "read"}`}
//                           onClick={() => handleNotificationClick(notif)}
//                         >
//                           <div className="notif-header">
//                             <strong>{notif.companyName || "System"}</strong>
//                             {notif.status === "unread" && (
//                               <span className="badge">New 🔥</span>
//                             )}
//                           </div>

//                           {expandedNotif === notif.id && (
//                             <div className="notif-details">
//                               <p><strong>Subject:</strong> {notif.subject}</p>
//                               <p>{notif.message}</p>
//                               <p className="timestamp">
//                                 <strong>Received:</strong> {notif.timestamp?.toDate().toLocaleString()}
//                               </p>
//                             </div>
//                           )}
//                         </li>
//                       ))}
//                   </>
//                 )}

//                 {/* Announcements */}
//                 {notifications[activeTab].some((notif) => notif.recipientType) && (
//                   <>
//                     <li className="notif-section-title">📢 Announcements from Admin</li>
//                     {notifications[activeTab]
//                       .filter((notif) => notif.recipientType)
//                       .map((notif) => (
//                         <li
//                           key={notif.id}
//                           className={`notification-item ${notif.status === "unread" ? "unread" : "read"}`}
//                           onClick={() => handleNotificationClick(notif)}
//                         >
//                           <div className="notif-header">
//                             <strong>Admin</strong>
//                             {notif.status === "unread" && (
//                               <span className="badge">New 📣</span>
//                             )}
//                           </div>

//                           {expandedNotif === notif.id && (
//                             <div className="notif-details">
//                               <p><strong>Subject:</strong> {notif.subject}</p>
//                               <p dangerouslySetInnerHTML={{ __html: notif.message }} />
//                               <p className="timestamp">
//                                 <strong>Posted:</strong> {notif.timestamp?.toDate().toLocaleString()}
//                               </p>
//                             </div>
//                           )}
//                         </li>
//                       ))}
//                   </>
//                 )}
//               </>
//             ) : (
//               <li className="empty">No new notifications.</li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotificationPanel;

// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebase";
// import { collection, getDocs, doc, query, updateDoc,getDoc } from "firebase/firestore";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles.css";
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

// const NotificationPanel = () => {
//   const [notifications, setNotifications] = useState({
//     news: [],
//     application: [],
//   });
//   const [activeTab, setActiveTab] = useState("news");
//   const [expandedNotif, setExpandedNotif] = useState(null);
//   const [userType, setUserType] = useState(null); // New state to track user role
//   const [visibleCount, setVisibleCount] = useState(10); //New state to limit visible notif 


//   useEffect(() => {
//     setVisibleCount(10);
//   }, [activeTab]);


//   const slicedNotifications = notifications[activeTab].slice(0, visibleCount);


//   useEffect(() => {
//     const fetchNotifications = async () => {
//       if (!auth.currentUser) return;
  
//       try {
//         const uid = auth.currentUser.uid;
//         const applicantDoc = doc(db, "applicants", uid);
//         const employerDoc = doc(db, "employers", uid);
  
//         const employerDocSnap = await getDoc(employerDoc);
//         const isEmployer = employerDocSnap.exists();
//         setUserType(isEmployer ? "employer" : "applicant");
  
//         const notificationSnap = await getDocs(
//           collection(isEmployer ? employerDoc : applicantDoc, "notifications")
//         );
//         const applicationNotifications = notificationSnap.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
  
//         // Get all announcements
//         const announcementSnapshot = await getDocs(collection(db, "announcement"));
//         const allAnnouncements = announcementSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//           status: doc.data().status || "unread", // default in case missing
//         }));
  
//         // ✅ Only keep announcements for the current user type
//         const relevantAnnouncements = allAnnouncements.filter(
//           (doc) => doc.recipientType === (isEmployer ? "employer" : "applicant")
//         );
  
//         // Set notifications
//         setNotifications({
//           application: applicationNotifications.sort(
//             (a, b) => b.timestamp?.toDate() - a.timestamp?.toDate()
//           ),
//           news: relevantAnnouncements.sort(
//             (a, b) => b.timestamp?.toDate() - a.timestamp?.toDate()
//           ),
//         });
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     };
  
//     fetchNotifications();
//   }, []);
  


//   const handleNotificationClick = async (notif) => {
//     if (!auth.currentUser) return;


//     try {
//       let notifDocRef;
//       const tabKey = notif.recipientType ? "news" : "application";


//       if (notif.recipientType) {
//         notifDocRef = doc(db, "announcement", notif.id);
//       } else {
//         const path = userType === "employer" ? "employers" : "applicants";
//         notifDocRef = doc(db, path, auth.currentUser.uid, "notifications", notif.id);
//       }


//       await updateDoc(notifDocRef, { status: "read" });
//       setExpandedNotif(expandedNotif === notif.id ? null : notif.id);


//       setNotifications((prev) => ({
//         ...prev,
//         [tabKey]: prev[tabKey].map((n) =>
//           n.id === notif.id ? { ...n, status: "read" } : n
//         ),
//       }));
//     } catch (error) {
//       console.error("Error updating notification status:", error);
//     }
//   };
 
//   return (
    
// <AnimatedGroup 
//   className="notifications-container"
//   baseDelay={0.1}
//   delayIncrement={0.15}
// >
//   <div className="notifications-dashboard">
//     <div className="notifications-header">
//       <h2 className="notifications-title">Notifications</h2>
//       <div className="notifications-tabs">
//         {Object.keys(notifications).map((tab) => (
//           <button
//             key={tab}
//             className={`tab-btn ${activeTab === tab ? "active-tab" : ""}`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>
//       <div className="notifications-feed">
//         <ul className="notification-list">
//           {notifications[activeTab].length > 0 ? (
//             <>
//               {/* Personal Notifications */}
//               {slicedNotifications.some((notif) => !notif.recipientType) && (
//                 <>
//                   <li className="feed-section-heading">
//                     <span>📬</span> Your Notifications
//                   </li>
//                   {notifications[activeTab]
//                     .filter((notif) => !notif.recipientType)
//                     .slice(0, visibleCount)
//                     .map((notif) => (
//                       <li
//                         key={notif.id}
//                         className={`notification-card ${
//                           notif.status === "unread" 
//                             ? "unread-item" 
//                             : "read-item"
//                         }`}
//                         onClick={() => handleNotificationClick(notif)}
//                       >
//                         <div className="notification-card-header">
//                           <strong className="sender-name">{notif.companyName || "System"}</strong>
//                           {notif.status === "unread" && (
//                             <span className="status-badge personal">
//                               New <span>🔥</span>
//                             </span>
//                           )}
//                         </div>
//                         {expandedNotif === notif.id && (
//                           <div className="notification-card-body">
//                             <p><strong>Subject:</strong> {notif.subject}</p>
//                             <p className="message-content">{notif.message}</p>
//                             <p className="timestamp">
//                               <strong>Received:</strong> {notif.timestamp?.toDate().toLocaleString()}
//                             </p>
//                           </div>
//                         )}
//                       </li>
//                     ))}
//                   {notifications[activeTab].length > visibleCount && (
//                     <button className="load-more-btn" onClick={() => setVisibleCount(notifications[activeTab].length)}>
//                       See More
//                     </button>
//                   )}
//                 </>
//               )}
//               {/* Announcements */}
//               {slicedNotifications.some((notif) => notif.recipientType) && (
//                 <>
//                   <li className="feed-section-heading">
//                     <span>📢</span> Announcements from Admin
//                   </li>
//                   {notifications[activeTab]
//                     .filter((notif) => notif.recipientType)
//                     .slice(0, visibleCount)
//                     .map((notif) => (
//                       <li
//                         key={notif.id}
//                         className={`notification-card ${
//                           notif.status === "unread" 
//                             ? "unread-item admin" 
//                             : "read-item"
//                         }`}
//                         onClick={() => handleNotificationClick(notif)}
//                       >
//                         <div className="notification-card-header">
//                           <strong className="sender-name">Admin</strong>
//                           {notif.status === "unread" && (
//                             <span className="status-badge admin">
//                               New <span>📣</span>
//                             </span>
//                           )}
//                         </div>
//                         {expandedNotif === notif.id && (
//                           <div className="notification-card-body">
//                             <p><strong>Subject:</strong> {notif.subject}</p>
//                             <p className="message-content" dangerouslySetInnerHTML={{ __html: notif.message }} />
//                             <p className="timestamp">
//                               <strong>Posted:</strong> {notif.timestamp?.toDate().toLocaleString()}
//                             </p>
//                           </div>
//                         )}
//                       </li>
//                     ))}
//                   {notifications[activeTab].length > visibleCount && (
//                     <button className="load-more-btn" onClick={() => setVisibleCount(notifications[activeTab].length)}>
//                       See More
//                     </button>
//                   )}
//                 </>
//               )}
//             </>
//           ) : (
//             <li className="empty-state">
//               <div className="empty-icon">📭</div>
//               <p>No new notifications.</p>
//             </li>
//           )}
//         </ul>
//       </div>
//     </div>
//   </div>
//   <style jsx>{`
//       /* Notification Dashboard Styles */
// .notifications-container {
//   background-color: #ffffff;
//   border-radius: 1rem;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
//   padding: 2rem;
//   margin: 7rem auto;
//   max-width: 800px;
//   transition: all 0.3s ease;
// }

// .notifications-title {
//   color: #333;
//   font-size: 1.5rem;
//   font-weight: 600;
//   margin-bottom: 1.5rem;
// }

// /* Tabs Navigation */
// .notifications-tabs {
//   display: flex;
//   border-bottom: 1px solid #e5e7eb;
//   margin-bottom: 1.5rem;
//   gap: 1rem;
// }

// .tab-btn {
//   padding: 0.5rem 1rem;
//   font-weight: 500;
//   color: #6b7280;
//   border: none;
//   background: transparent;
//   cursor: pointer;
//   transition: all 0.2s ease;
//   position: relative;
// }

// .tab-btn:hover {
//   color: #4b5563;
// }

// .tab-btn.active-tab {
//   color: #2563eb;
//   font-weight: 600;
//   border-bottom: 2px solid #2563eb;
// }

// /* Notification Feed */
// .notifications-feed {
//   margin-top: 1.5rem;
// }

// .notification-list {
//   list-style: none;
//   padding: 0;
// }

// .feed-section-heading {
//   display: flex;
//   align-items: center;
//   color: #4b5563;
//   font-size: 0.9rem;
//   font-weight: 500;
//   padding: 0.5rem 0;
//   margin-top: 1.5rem;
//   margin-bottom: 0.5rem;
// }

// .feed-section-heading span {
//   margin-right: 0.5rem;
// }

// /* Notification Cards */
// .notification-card {
//   border-radius: 0.5rem;
//   padding: 1rem;
//   margin: 0.75rem 0;
//   cursor: pointer;
//   transition: all 0.2s ease;
// }

// .notification-card:hover {
//   transform: translateY(-2px);
// }

// .notification-card.unread-item {
//   background-color: #eff6ff;
//   border-left: 4px solid #3b82f6;
// }

// .notification-card.unread-item.admin {
//   background-color: #fffbeb;
//   border-left: 4px solid #d97706;
// }

// .notification-card.read-item {
//   background-color: #f9fafb;
// }

// .notification-card.read-item:hover {
//   background-color: #f3f4f6;
// }

// .notification-card-header {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }

// .sender-name {
//   font-weight: 600;
//   color: #111827;
// }

// .status-badge {
//   display: flex;
//   align-items: center;
//   font-size: 0.75rem;
//   font-weight: 500;
//   padding: 0.25rem 0.5rem;
//   border-radius: 9999px;
//   color: white;
// }

// .status-badge.personal {
//   background-color: #2563eb;
// }

// .status-badge.admin {
//   background-color: #d97706;
// }

// /* Notification Content */
// .notification-card-body {
//   margin-top: 0.75rem;
//   margin-left: 0.5rem;
//   color: #4b5563;
// }

// .message-content {
//   margin: 0.75rem 0;
//   line-height: 1.5;
// }

// .timestamp {
//   font-size: 0.75rem;
//   color: #9ca3af;
//   margin-top: 0.5rem;
// }

// /* Load More Button */
// .load-more-btn {
//   background: transparent;
//   border: none;
//   color: #2563eb;
//   font-weight: 500;
//   margin-top: 1rem;
//   cursor: pointer;
//   transition: color 0.2s ease;
// }

// .load-more-btn:hover {
//   color: #1d4ed8;
//   text-decoration: underline;
// }

// /* Empty State */
// .empty-state {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 3rem 1rem;
//   background-color: #f9fafb;
//   border-radius: 0.5rem;
//   color: #6b7280;
//   text-align: center;
// }

// .empty-icon {
//   font-size: 2.5rem;
//   margin-bottom: 1rem;
// }

// /* Animation Effects */
// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(10px); }
//   to { opacity: 1; transform: translateY(0); }
// }

// .notification-card {
//   animation: fadeIn 0.3s ease-out forwards;
// }

// /* Responsive Adjustments */
// @media (max-width: 640px) {
//   .notifications-container {
//     padding: 1rem;
//     margin: 1rem;
//   }
  
//   .notifications-tabs {
//     overflow-x: auto;
//     padding-bottom: 0.5rem;
//   }
  
//   .notification-card {
//     padding: 0.75rem;
//   }
// }
//    `}</style>
// </AnimatedGroup>
//   );
// };


// export default NotificationPanel;



import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, doc, query, updateDoc, getDoc, setDoc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
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

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState({
    news: [],
    application: [],
  });
  const [activeTab, setActiveTab] = useState("news");
  const [expandedNotif, setExpandedNotif] = useState(null);
  const [userType, setUserType] = useState(null); 
  const [visibleCount, setVisibleCount] = useState(10);
  
  useEffect(() => {
    setVisibleCount(10);
  }, [activeTab]);
  
  const slicedNotifications = notifications[activeTab].slice(0, visibleCount);
  
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!auth.currentUser) return;
  
      try {
        const uid = auth.currentUser.uid;
        
        // Check if user is employer or applicant
        const employerDocRef = doc(db, "employers", uid);
        const applicantDocRef = doc(db, "applicants", uid);
        
        const employerDocSnap = await getDoc(employerDocRef);
        const applicantDocSnap = await getDoc(applicantDocRef);
        
        const isEmployer = employerDocSnap.exists();
        const isApplicant = applicantDocSnap.exists();
        
        if (!isEmployer && !isApplicant) {
          console.error("User not found in either employers or applicants collection");
          return;
        }
        
        // Set user type
        setUserType(isEmployer ? "employer" : "applicant");
        
        // Reference to the user's document
        const userDocRef = isEmployer ? employerDocRef : applicantDocRef;
        
        // Fetch user's read status tracking document
        const userReadStatusRef = doc(userDocRef, "notificationStatus", "readStatus");
        const userReadStatusSnap = await getDoc(userReadStatusRef);
        
        // Get or initialize read status tracking
        const userReadStatus = userReadStatusSnap.exists() 
          ? userReadStatusSnap.data() 
          : { announcements: {}, notifications: {} };
        
        // Fetch application notifications
        const notificationSnap = await getDocs(
          collection(userDocRef, "notifications")
        );
        
        const applicationNotifications = notificationSnap.docs.map((notifDoc) => {
          const notifData = notifDoc.data();
          const notifId = notifDoc.id;
          
          // Use user-specific read status if available, otherwise use default from notification
          const status = userReadStatus.notifications[notifId] || notifData.status || "unread";
          
          return {
            id: notifId,
            ...notifData,
            status: status,
          };
        });
  
        // Get all announcements
        const announcementSnapshot = await getDocs(collection(db, "announcement"));
        const allAnnouncements = announcementSnapshot.docs.map((announcementDoc) => {
          const announcementData = announcementDoc.data();
          const announcementId = announcementDoc.id;
          
          // Use user-specific read status if available, otherwise mark as unread
          const status = userReadStatus.announcements[announcementId] || "unread";
          
          return {
            id: announcementId,
            ...announcementData,
            status: status,
          };
        });
  
        // Filter announcements for the current user type
        const relevantAnnouncements = allAnnouncements.filter(
          (doc) => doc.recipientType === (isEmployer ? "employer" : "applicant")
        );
  
        // Set notifications state
        setNotifications({
          application: applicationNotifications.sort(
            (a, b) => (b.timestamp?.toDate() || 0) - (a.timestamp?.toDate() || 0)
          ),
          news: relevantAnnouncements.sort(
            (a, b) => (b.timestamp?.toDate() || 0) - (a.timestamp?.toDate() || 0)
          ),
        });
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
  
    fetchNotifications();
  }, []);
  
  const handleNotificationClick = async (notif) => {
    if (!auth.currentUser) return;
    
    try {
      const uid = auth.currentUser.uid;
      const isAnnouncement = notif.recipientType ? true : false;
      const tabKey = isAnnouncement ? "news" : "application";
      
      // Determine user type and reference
      const userPath = userType === "employer" ? "employers" : "applicants";
      const userDocRef = doc(db, userPath, uid);
      
      // Reference to user's notification status tracking document
      const userReadStatusRef = doc(userDocRef, "notificationStatus", "readStatus");
      
      // Get current read status or create new structure
      const userReadStatusSnap = await getDoc(userReadStatusRef);
      const userReadStatus = userReadStatusSnap.exists() 
        ? userReadStatusSnap.data() 
        : { announcements: {}, notifications: {} };
      
      // Update the specific notification's read status in user's tracking
      if (isAnnouncement) {
        userReadStatus.announcements[notif.id] = "read";
      } else {
        userReadStatus.notifications[notif.id] = "read";
      }
      
      // Save the updated tracking document
      await setDoc(userReadStatusRef, userReadStatus, { merge: true });
      
      // Toggle expanded state
      setExpandedNotif(expandedNotif === notif.id ? null : notif.id);
      
      // Update local state
      setNotifications((prev) => ({
        ...prev,
        [tabKey]: prev[tabKey].map((n) =>
          n.id === notif.id ? { ...n, status: "read" } : n
        ),
      }));
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };
 
  return (
    <AnimatedGroup 
      className="notifications-container"
      baseDelay={0.1}
      delayIncrement={0.15}
    >
      <div className="notifications-dashboard">
        <div className="notifications-header">
          <h2 className="notifications-title">Notifications</h2>
          <div className="notifications-tabs">
            {Object.keys(notifications).map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? "active-tab" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="notifications-feed">
            <ul className="notification-list">
              {/* Personal Notifications - Only show on "application" tab */}
{activeTab === "application" &&
  slicedNotifications.some((notif) => !notif.recipientType) && (
    <>
      <li className="feed-section-heading">
        <span>📬</span> Your Notifications
      </li>
      {notifications[activeTab]
        .filter((notif) => !notif.recipientType)
        .slice(0, visibleCount)
        .map((notif) => (
          <li
            key={notif.id}
            className={`notification-card ${
              notif.status === "unread" ? "unread-item" : "read-item"
            }`}
            onClick={() => handleNotificationClick(notif)}
          >
            <div className="notification-card-header">
              <strong className="sender-name">
                {notif.companyName || "System"}
              </strong>
              {notif.status === "unread" && (
                <span className="status-badge personal">
                  New <span>🔥</span>
                </span>
              )}
            </div>
            {expandedNotif === notif.id && (
              <div className="notification-card-body">
                <p>
                  <strong>Subject:</strong> {notif.subject}
                </p>
                <p className="message-content">{notif.message}</p>
                <p className="timestamp">
                  <strong>Received:</strong>{" "}
                  {notif.timestamp?.toDate().toLocaleString()}
                </p>
              </div>
            )}
          </li>
        ))}
      {notifications[activeTab].length > visibleCount && (
        <button
          className="load-more-btn"
          onClick={() => setVisibleCount(notifications[activeTab].length)}
        >
          See More
        </button>
      )}
    </>
  )}

{/* Announcements - Only show on "news" tab */}
{activeTab === "news" &&
  slicedNotifications.some((notif) => notif.recipientType) && (
    <>
      <li className="feed-section-heading">
        <span>📢</span> Announcements from Admin
      </li>
      {notifications[activeTab]
        .filter((notif) => notif.recipientType)
        .slice(0, visibleCount)
        .map((notif) => (
          <li
            key={notif.id}
            className={`notification-card ${
              notif.status === "unread" ? "unread-item admin" : "read-item"
            }`}
            onClick={() => handleNotificationClick(notif)}
          >
            <div className="notification-card-header">
              <strong className="sender-name">Admin</strong>
              {notif.status === "unread" && (
                <span className="status-badge admin">
                  New <span>📣</span>
                </span>
              )}
            </div>
            {expandedNotif === notif.id && (
              <div className="notification-card-body">
                <p>
                  <strong>Subject:</strong> {notif.subject}
                </p>
                <p
                  className="message-content"
                  dangerouslySetInnerHTML={{ __html: notif.message }}
                />
                <p className="timestamp">
                  <strong>Posted:</strong>{" "}
                  {notif.timestamp?.toDate().toLocaleString()}
                </p>
              </div>
            )}
          </li>
        ))}
      {notifications[activeTab].length > visibleCount && (
        <button
          className="load-more-btn"
          onClick={() => setVisibleCount(notifications[activeTab].length)}
        >
          See More
        </button>
      )}
    </>
  )}

            </ul>
          </div>
        </div>
      </div>
      <style jsx>{`
        /* Notification Dashboard Styles */
        .notifications-container {
          background-color: #ffffff;
          border-radius: 1rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          padding: 2rem;
          margin: 7rem auto;
          max-width: 800px;
          transition: all 0.3s ease;
        }
        .notifications-title {
          color: #333;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }
        /* Tabs Navigation */
        .notifications-tabs {
          display: flex;
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 1.5rem;
          gap: 1rem;
        }
        .tab-btn {
          padding: 0.5rem 1rem;
          font-weight: 500;
          color: #6b7280;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }
        .tab-btn:hover {
          color: #4b5563;
        }
        .tab-btn.active-tab {
          color: #2563eb;
          font-weight: 600;
          border-bottom: 2px solid #2563eb;
        }
        /* Notification Feed */
        .notifications-feed {
          margin-top: 1.5rem;
        }
        .notification-list {
          list-style: none;
          padding: 0;
        }
        .feed-section-heading {
          display: flex;
          align-items: center;
          color: #4b5563;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 0.5rem 0;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .feed-section-heading span {
          margin-right: 0.5rem;
        }
        /* Notification Cards */
        .notification-card {
          border-radius: 0.5rem;
          padding: 1rem;
          margin: 0.75rem 0;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .notification-card:hover {
          transform: translateY(-2px);
        }
        .notification-card.unread-item {
          background-color: #eff6ff;
          border-left: 4px solid #3b82f6;
        }
        .notification-card.unread-item.admin {
          background-color: #fffbeb;
          border-left: 4px solid #d97706;
        }
        .notification-card.read-item {
          background-color: #f9fafb;
        }
        .notification-card.read-item:hover {
          background-color: #f3f4f6;
        }
        .notification-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .sender-name {
          font-weight: 600;
          color: #111827;
        }
        .status-badge {
          display: flex;
          align-items: center;
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          color: white;
        }
        .status-badge.personal {
          background-color: #2563eb;
        }
        .status-badge.admin {
          background-color: #d97706;
        }
        /* Notification Content */
        .notification-card-body {
          margin-top: 0.75rem;
          margin-left: 0.5rem;
          color: #4b5563;
        }
        .message-content {
          margin: 0.75rem 0;
          line-height: 1.5;
        }
        .timestamp {
          font-size: 0.75rem;
          color: #9ca3af;
          margin-top: 0.5rem;
        }
        /* Load More Button */
        .load-more-btn {
          background: transparent;
          border: none;
          color: #2563eb;
          font-weight: 500;
          margin-top: 1rem;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .load-more-btn:hover {
          color: #1d4ed8;
          text-decoration: underline;
        }
        /* Empty State */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 1rem;
          background-color: #f9fafb;
          border-radius: 0.5rem;
          color: #6b7280;
          text-align: center;
        }
        .empty-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        /* Animation Effects */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .notification-card {
          animation: fadeIn 0.3s ease-out forwards;
        }
        /* Responsive Adjustments */
        @media (max-width: 640px) {
          .notifications-container {
            padding: 1rem;
            margin: 1rem;
          }
          
          .notifications-tabs {
            overflow-x: auto;
            padding-bottom: 0.5rem;
          }
          
          .notification-card {
            padding: 0.75rem;
          }
        }
      `}</style>
    </AnimatedGroup>
  );
};

export default NotificationPanel;
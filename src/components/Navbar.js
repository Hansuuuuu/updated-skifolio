// // // // src/components/Navbar.js
// // // import React from 'react';
// // // import { Link } from 'react-router-dom';
// // // import { auth } from '../firebase';

// // // const Navbar = () => {
// // //     const handleLogout = async () => {
// // //         await auth.signOut();
// // //     };

// // //     return (
// // //         <nav>
// // //             <Link to="/">Home</Link>
// // //             <Link to="/job-board">Job Board</Link>
// // //             <Link to="/profile">Applicant Profile</Link>
// // //             <Link to="/employer-profile">Employer Profile</Link>
// // //             <button onClick={handleLogout}>Logout</button>
// // //         </nav>
// // //     );
// // // };

// // // export default Navbar;
// // // src/components/Navbar.js
// // import React, { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import "../styles.css"; // Custom CSS file for aesthetics

// // const Navbar = ({ userType, onLogout }) => {
// //   const [isMobile, setIsMobile] = useState(false); // Tracks if the viewport is mobile
// //   const [isNavOpen, setIsNavOpen] = useState(false); // Tracks menu state (mobile only)

// //   useEffect(() => {
// //     // Update isMobile based on window size
// //     const handleResize = () => {
// //       setIsMobile(window.innerWidth <= 992); // Bootstrap lg breakpoint
// //     };

// //     handleResize(); // Set initial state
// //     window.addEventListener("resize", handleResize); // Listen for window resizing

// //     return () => window.removeEventListener("resize", handleResize); // Cleanup
// //   }, []);

// //   const toggleNav = () => setIsNavOpen(!isNavOpen);

// //   return (
// //     <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
// //       <div className="container-fluid">
// //         <Link className="navbar-brand" to="/">
// //           Ski-Folio
// //         </Link>

// //         {/* Hamburger Icon (Mobile Only) */}
// //         {isMobile && (
// //           <button
// //             className={`navbar-toggler ${isNavOpen ? "open" : ""}`}
// //             type="button"
// //             onClick={toggleNav}
// //           >
// //             <div className="burger-icon">
// //               <span className="line"></span>
// //               <span className="line"></span>
// //               <span className="line"></span>
// //             </div>
// //           </button>
// //         )}

// //         {/* Navbar Links */}
// //         <div
// //           className={`navbar-collapse ${isMobile ? (isNavOpen ? "show" : "hide") : ""}`}
// //         >
// //           <ul className="navbar-nav ms-auto">
// //             {userType === "applicant" && (
// //               <>
// //                 <li className="nav-item">
// //                   <Link className="nav-link" to="/applicant/profile">
// //                     Profile
// //                   </Link>
// //                 </li>
// //                 <li className="nav-item">
// //                   <Link className="nav-link" to="/applicant/search-jobs">
// //                     Search Jobs
// //                   </Link>
// //                 </li>
// //                 <li className="nav-item">
// //                   <Link className="nav-link" to="/portfolio">
// //                     Portfolio
// //                   </Link>
// //                 </li>
// //               </>
// //             )}
// //             {userType === "employer" && (
// //               <>
// //                 <li className="nav-item">
// //                   <Link className="nav-link" to="/employer/profile">
// //                     Jobs
// //                   </Link>
// //                 </li>
// //                 <li className="nav-item">
// //                   <Link className="nav-link" to="/employer/post-job">
// //                     Post Job
// //                   </Link>
// //                 </li>
// //               </>
// //             )}
// //             <li className="nav-item">
// //               <Link className="nav-link" to="/" onClick={onLogout}>
// //                 Logout
// //               </Link>
// //             </li>
// //           </ul>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;

// // START OF NEW BURGER MENU STYLE NAVBAR

// // import React, { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";
// // import { FaUser, FaBriefcase, FaSearch, FaFileAlt, FaEye, FaBell, FaPlus, FaSignOutAlt } from "react-icons/fa";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import "../styles.css"; // Custom CSS

// // const Navbar = ({ userType, onLogout }) => {
// //   const [isMobile, setIsMobile] = useState(false);
// //   const [isNavOpen, setIsNavOpen] = useState(false);

// //   useEffect(() => {
// //     const handleResize = () => {
// //       setIsMobile(window.innerWidth <= 992);
// //       if (window.innerWidth > 992) {
// //         setIsNavOpen(false);
// //       }
// //     };

// //     handleResize();
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   const toggleNav = () => setIsNavOpen(!isNavOpen);

// //   return (
// //     <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
// //       <div className="container-fluid">
// //         <Link className="navbar-brand" to="/">
// //           Ski-Folio
// //         </Link>

// //         <button
// //           className={`navbar-toggler ${isNavOpen ? "open" : ""}`}
// //           type="button"
// //           onClick={toggleNav}
// //         >
// //           <div className="burger-icon">
// //             <span className="line"></span>
// //             <span className="line"></span>
// //             <span className="line"></span>
// //           </div>
// //         </button>

// //         <div
// //           className={`navbar-collapse ${
// //             isMobile ? (isNavOpen ? "show" : "hide") : "d-lg-flex"
// //           }`}
// //         >
// //           <ul className="navbar-nav ms-auto">
// //             {userType === "applicant" && (
// //               <>
// //                 <li className="nav-item">
// //                   <Link className="nav-link" to="/applicant/profile">
// //                     <FaUser />
// //                     <span>Profile</span>
// //                   </Link>
// //                 </li>
// //                 <li className="nav-item">
// //                   <Link className="nav-link" to="/applicant/search-jobs">
// //                     <FaSearch />
// //                     <span>Search Jobs</span>
// //                   </Link>
// //                 </li>
// //                 <li className="nav-item">
// //                   <Link className="nav-link" to="/portfolio">
// //                     <FaFileAlt />
// //                     <span>Portfolio</span>
// //                   </Link>
// //                 </li>
// //                 <li className="nav-item">
// //                   <Link className="nav-link" to="/discovered">
// //                     <FaEye />
// //                     <span>Get Discovered</span>
// //                   </Link>
// //                 </li>
// //                 <li className="nav-item">
// //                   <Link className="nav-link" to="/notifications">
// //                     <FaBell />
// //                     <span>Notifications</span>
// //                   </Link>
// //                 </li>
// //               </>
// //             )}
// //             {userType === "employer" && (
// //               <>
// //                 <li className="nav-item">
// //                   <Link className="nav-link" to="/employer/profile">
// //                     <FaUser />
// //                     <span>Profile</span>
// //                   </Link>
// //                 </li>
// //                 <li className="nav-item">
// //                   <Link className="nav-link" to="/employer/post-job">
// //                     <FaPlus />
// //                     <span>Post Job</span>
// //                   </Link>
// //                 </li>
// //                 <li className="nav-item">
// //                   <Link className="nav-link" to="/notifications">
// //                     <FaBell />
// //                     <span>Notifications</span>
// //                   </Link>
// //                 </li>
// //                 <li className="nav-item">
// //                   <Link className="nav-link" to="/filter">
// //                     <FaEye />
// //                     <span>Discover</span>
// //                   </Link>
// //                 </li>
// //               </>
// //             )}
// //             <li className="nav-item">
// //               <Link className="nav-link" to="/" onClick={onLogout}>
// //                 <FaSignOutAlt />
// //                 <span>Logout</span>
// //               </Link>
// //             </li>
// //           </ul>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;

// // // END OF CHANGING THE BURGER MENU



// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FaUser, FaSearch, FaFileAlt, FaEye, FaBell, FaPlus, FaSignOutAlt, FaQuestionCircle } from "react-icons/fa";
// import "../styles.css"; // Custom CSS

// const Navbar = ({ userType, onLogout }) => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [isNavOpen, setIsNavOpen] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 992);
//       if (window.innerWidth > 992) {
//         setIsNavOpen(false);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleNav = () => setIsNavOpen(!isNavOpen);

//   return (
//     <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">
//           Ski-Folio
//         </Link>

//         <button
//           className={`navbar-toggler ${isNavOpen ? "open" : ""}`}
//           type="button"
//           onClick={toggleNav}
//         >
//           <div className="burger-icon">
//             <span className="line"></span>
//             <span className="line"></span>
//             <span className="line"></span>
//           </div>
//         </button>

//         <div
//           className={`navbar-collapse ${
//             isMobile ? (isNavOpen ? "show" : "hide") : "d-lg-flex"
//           }`}
//         >
//           <ul className="navbar-nav ms-auto">
//           {userType === "applicant" && (
//             <>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/applicant/profile">
//                   <FaUser />
//                   <span>Profile</span>
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/applicant/search-jobs">
//                   <FaSearch />
//                   <span>Search Jobs</span>
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/portfolio">
//                   <FaFileAlt />
//                   <span>Portfolio</span>
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/discovered">
//                   <FaEye />
//                   <span>Get Discovered</span>
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/notifications">
//                   <FaBell />
//                   <span>Notifications</span>
//                 </Link>
//               </li>
//             </>
//           )}
//           {userType === "employer" && (
//             <>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/employer/profile">
//                   <FaUser />
//                   <span>Profile</span>
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/employer/post-job">
//                   <FaPlus />
//                   <span>Post Job</span>
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/notifications">
//                   <FaBell />
//                   <span>Notifications</span>
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/filter">
//                   <FaEye />
//                   <span>Discover</span>
//                 </Link>
//               </li>
//             </>
//           )}

//           {/* FAQ for all user types */}
//           <li className="nav-item">
//               <Link className="nav-link" to="/faq">
//                 <FaQuestionCircle />
//                 <span>FAQ</span>
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/" onClick={onLogout}>
//                 <FaSignOutAlt />
//                 <span>Logout</span>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// // END OF CHANGING THE BURGER MENU
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaSearch, FaFileAlt, FaEye, FaBell, FaPlus, FaSignOutAlt, FaQuestionCircle } from "react-icons/fa";
import "../styles.css"; // Custom CSS

const Navbar = ({ userType, onLogout }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
      if (window.innerWidth > 992) {
        setIsNavOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Ski-Folio
        </Link>
        <button
          className={`navbar-toggler ${isNavOpen ? "open" : ""}`}
          type="button"
          onClick={toggleNav}
        >
          <div className="burger-icon">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </button>
        <div
          className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
          {userType === "applicant" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/applicant/profile">
                  <FaUser />
                  <span>Profile</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/applicant/search-jobs">
                  <FaSearch />
                  <span>Search Jobs</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/portfolio">
                  <FaFileAlt />
                  <span>Portfolio</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/discovered">
                  <FaEye />
                  <span>Get Discovered</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/notifications">
                  <FaBell />
                  <span>Notifications</span>
                </Link>
              </li>
            </>
          )}
          {userType === "employer" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/employer/profile">
                  <FaUser />
                  <span>Profile</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/employer/post-job">
                  <FaPlus />
                  <span>Post Job</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/notifications">
                  <FaBell />
                  <span>Notifications</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/filter">
                  <FaEye />
                  <span>Discover</span>
                </Link>
              </li>
            </>
          )}
          {/* FAQ for all user types */}
          <li className="nav-item">
              <Link className="nav-link" to="/faq">
                <FaQuestionCircle />
                <span>FAQ</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={onLogout}>
                <FaSignOutAlt />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
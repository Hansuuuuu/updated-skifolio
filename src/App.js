
// // src/App.js
// import React, { useEffect, useState } from 'react';
// import { AnimatePresence } from "framer-motion";
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebase';
// import UserTypeSelection from './components/UserTypeSelection';
// import Auth from './components/Auth';
// import ApplicantProfile from './components/ApplicantProfile';
// import EmployerProfile from './components/EmployerProfile';
// import JobSearch from './components/JobSearch';
// import EmployerJobPost from './components/EmployerJobPost';
// import Navbar from './components/Navbar';
// import HomeFeed from './components/HomeFeed';
// import SignIn from './components/SignIn';
// import Portfolio from './components/Portfolio';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import AdminPage from './components/AdminPage';
// import NotificationPanel from './components/Notifications';
// import Homepage from './components/Homepage';
// import Scouting from './components/Scouting';
// import EmployerSkillFilter from './components/EmployerSkillFilter';
// import AboutUs from './components/AboutUs';
// import Terms from './components/Terms';
// import FAQ from './components/FAQ';
// const App = () => {
//     const [userType, setUserType] = useState(null);
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             setUser(user);
//         });

//         return () => unsubscribe();
//     }, []);
    
//     const handleLogout = () => {
//         auth.signOut().then(() => {
//             setUser(null);
//             setUserType(null);
//         }).catch((error) => {
//             console.error("Error signing out:", error);
//         });
//     };

//     return (
//         <Router>
//             {user && <Navbar userType={userType} onLogout={handleLogout} />}
//             <Routes>
//                 <Route path="/" element={<Homepage />} />
//                 <Route path="/faq" element={<FAQ/>} />
//                 <Route path="/select" element={<UserTypeSelection setUserType={setUserType} />} /> {/* Entry point */}
//                 <Route path="/signin" element={<SignIn userType={userType} />} />
//                 <Route path="/signup" element={<Auth userType={userType} setUser={setUser} />} />
//                 <Route path="/applicant/profile" element={<ApplicantProfile />} />
//                 <Route path="/applicant/search-jobs" element={<JobSearch />} />
//                 <Route path="/employer/profile" element={<EmployerProfile />} />
//                 <Route path="/employer/post-job" element={<EmployerJobPost />} />
//                 <Route path="/portfolio" element={<Portfolio />} />
//                 <Route path="/home" element={<HomeFeed />} />
//                 <Route path="/admin" element={<AdminPage />} />
//                 <Route path="/Notifications" element={<NotificationPanel />} />
//                 <Route path="/discovered" element={<Scouting />} />
//                 <Route path="/filter" element={<EmployerSkillFilter />} />
//                 <Route path="/about-us" element={<AboutUs/>} />
//                 <Route path="/terms" element={<Terms/>} />

//             </Routes>
//         </Router>
//     );
// };

// export default App;
// src/App.js
import React, { useEffect, useState } from 'react';
import { AnimatePresence } from "framer-motion";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import UserTypeSelection from './components/UserTypeSelection';
import Auth from './components/Auth';
import ApplicantProfile from './components/ApplicantProfile';
import EmployerProfile from './components/EmployerProfile';
import JobSearch from './components/JobSearch';
import EmployerJobPost from './components/EmployerJobPost';
import Navbar from './components/Navbar';
import HomeFeed from './components/HomeFeed';
import SignIn from './components/SignIn';
import Portfolio from './components/Portfolio';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AdminPage from './components/AdminPage';
import NotificationPanel from './components/Notifications';
import Homepage from './components/Homepage';
import Scouting from './components/Scouting';
import EmployerSkillFilter from './components/EmployerSkillFilter';
import AboutUs from './components/AboutUs';
import Terms from './components/Terms';
import TermsAndCondition from './components/TermsAndCondition';
import FAQ from './components/FAQ';
import FAQHOME from './components/FAQHOME';

// AnimatedRoutes component to handle transitions
const AnimatedRoutes = ({ userType, setUserType, user, setUser, handleLogout }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Homepage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/faqhome" element={<FAQHOME />} />
        <Route path="/select" element={<UserTypeSelection setUserType={setUserType} />} />
        <Route path="/signin" element={<SignIn userType={userType} />} />
        <Route path="/signup" element={<Auth userType={userType} setUser={setUser} />} />
        <Route path="/applicant/profile" element={<ApplicantProfile />} />
        <Route path="/applicant/search-jobs" element={<JobSearch />} />
        <Route path="/employer/profile" element={<EmployerProfile />} />
        <Route path="/employer/post-job" element={<EmployerJobPost />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/home" element={<HomeFeed />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/Notifications" element={<NotificationPanel />} />
        <Route path="/discovered" element={<Scouting />} />
        <Route path="/filter" element={<EmployerSkillFilter />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/condition" element={<TermsAndCondition />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
    const [userType, setUserType] = useState(null);
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);
    
    const handleLogout = () => {
        auth.signOut().then(() => {
            setUser(null);
            setUserType(null);
        }).catch((error) => {
            console.error("Error signing out:", error);
        });
    };
    
    return (
        <Router>
            {user && <Navbar userType={userType} onLogout={handleLogout} />}
            <AnimatedRoutes 
              userType={userType}
              setUserType={setUserType}
              user={user}
              setUser={setUser}
              handleLogout={handleLogout}
            />
        </Router>
    );
};

export default App;
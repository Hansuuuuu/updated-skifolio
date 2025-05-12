import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate from react-router-dom v6
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
const Home = ({ setUserType }) => {
    const [roleSelected, setRoleSelected] = useState(false);
    const [showAdminButton, setShowAdminButton] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSelectRole = (role) => {
        setUserType(role);
        setRoleSelected(true); // Set role as selected
    };

    const toggleAdminButton = () => {
        setShowAdminButton(true); // For example, you could set this based on a condition like user role
    };

    const handleChangeRole = () => {
        setUserType(null); // Reset user type
        setRoleSelected(false); // Reset role selection
    };

    const handleAdmit = () => {
        navigate("/admin"); // Route to AdminPage when Admit button is clicked
    };

    // Example: Show the Admin button when the component is mounted
    useEffect(() => {
        toggleAdminButton(); // Trigger the admin button visibility on page load
    }, []);

    return (
        <AnimatedGroup 
                className="my-12 space-y-6 bg-gray-50 p-6 rounded-lg shadow-md"
                baseDelay={0.2}  // Start delay (seconds)
                delayIncrement={0.15}  // Each child adds this much delay
              >
        <div className='hero'>
            <div className='Home'>
                <div className='choicecontainer'>
                    <h1 style={{fontFamily: "Times New Roman", color: "#ffffff",fontSize:"4rem"}}>Ski-Folio</h1>
                    <p style={{fontFamily: "Times New Roman", color: "#ffffff", fontSize:"1.2rem"}}>A website for our young and new frontend web developers</p>
                    {!roleSelected ? (
                        <>
                            <div className='Roles'>
                                <button onClick={() => handleSelectRole('applicant')}>
                                    <span>I am an Applicant</span>
                                </button>
                                <button onClick={() => handleSelectRole('employer')}>
                                    <span>I am an Employer</span>
                                </button>
                            </div>
                        </>
                    ) : (
                         <AnimatedGroup 
                className="my-12 space-y-6 bg-gray-50 p-6 rounded-lg shadow-md"
                baseDelay={0.2}  // Start delay (seconds)
                delayIncrement={0.15}  // Each child adds this much delay
              >
                        <div className='Home1'>
                            <Link to="/signin">
                                <button className="submit">Log In</button>
                            </Link>
                            <Link to="/signup">
                                <button className="submit">Sign Up</button>
                            </Link>
                            <button className="submit" onClick={handleChangeRole}>Change Role</button>
                        </div>
                        </AnimatedGroup>
                    )}
                </div>
            </div>
            {/* Footer with hidden Admin route */}
            <footer className="footer">
                <button className={`admin-btn ${showAdminButton ? 'show' : ''}`} onClick={handleAdmit}>Alrights Reserve 2024-2025</button>
            </footer>
        </div>
        </AnimatedGroup>
    );
};

export default Home;
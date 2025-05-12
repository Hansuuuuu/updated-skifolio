// import React from "react";
// import { Link } from "react-router-dom";
// import '../styles.css';

// const Homepage = () => {
//   return (
//     <div className="home-wrapper">
      
//       {/* Top Navigation */}
//       <header className="top-header">
//         <h1 className="site-logo">Ski-Folio</h1>

//         {/* <div className="action-btns">
//           <Link to="/select">
//             <button className="main-btn">Get Started</button>
//           </Link>
//         </div> */}
//       </header>

//       {/* Hero Section */}
//       <main className="hero-section1">
//         <h2 className="hero-title">Welcome to Ski-Folio</h2>
//         <p className="hero-description">
//           Your personalized platform for finding jobs and building your professional portfolio. 
//           Whether you're an applicant looking for opportunities or an employer seeking top talent, 
//           Ski-Folio connects you with the right match.
//         </p>

//         <div className="cta-container">
//           <Link to="/select">
//             <button className="main-btn">Get Started</button>
//           </Link>
//           <Link to="/about-us">
//             <button className="alt-btn">Learn More</button>
//           </Link>
//         </div>
//       </main>

//       {/* Features Section */}
//       <section className="features-section">
//         <div className="features-content">
//           <h3 className="features-title">Why Choose Ski-Folio?</h3>
//           <ul className="features-list">
//             <li> Showcase your skills with a dynamic portfolio.</li>
//             <li> Find and apply for jobs that match your expertise.</li>
//             <li> Employers can post jobs and connect with applicants.</li>
//             <li> Enhance your career with a professional, user-friendly platform.</li>
//           </ul>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="homepage-footer">
//         © {new Date().getFullYear()} Ski-Folio. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default Homepage;
import React from "react";
import { Link } from "react-router-dom";
import { Headset } from "lucide-react";
import { motion } from "framer-motion";
import '../styles.css';

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: -20
  }
};

// Transition timing
const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

// Element animation variants (staggered children)
const containerVariants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const Homepage = () => {
  return (
    <motion.div 
      className="home-wrapper"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      
      {/* Top Navigation */}
      <header className="top-header">
        <motion.h1 
          className="site-logo"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          Ski-Folio
        </motion.h1>
        <Link to="/faqhome">
            <motion.div
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer text-blue-600"
          >
            <Headset size={28} />
          </motion.div>
          </Link>
      </header>

      {/* Hero Section */}
      <main className="hero-section1">
        <motion.h2 
          className="hero-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Welcome to Ski-Folio
        </motion.h2>
        
        <motion.p 
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Your personalized platform for finding jobs and building your professional portfolio. 
          Whether you're an applicant looking for opportunities or an employer seeking top talent, 
          Ski-Folio connects you with the right match.
        </motion.p>
        
        <motion.div 
          className="cta-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link to="/select">
            <motion.button 
              className="main-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </Link>
          <Link to="/about-us">
            <motion.button 
              className="alt-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </Link>
          
        </motion.div>
      </main>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-content">
          <motion.h3 
            className="features-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Why Choose Ski-Folio?
          </motion.h3>
          
          <motion.ul 
            className="features-list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.li variants={itemVariants}>
              Showcase your skills with a dynamic portfolio.
            </motion.li>
            <motion.li variants={itemVariants}>
              Find and apply for jobs that match your expertise.
            </motion.li>
            <motion.li variants={itemVariants}>
              Employers can post jobs and connect with applicants.
            </motion.li>
            <motion.li variants={itemVariants}>
              Enhance your career with a professional, user-friendly platform.
            </motion.li>
          </motion.ul>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="homepage-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        © {new Date().getFullYear()} Ski-Folio. All rights reserved.
      </motion.footer>
    </motion.div>
  );
};

export default Homepage;
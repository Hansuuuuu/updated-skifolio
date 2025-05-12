// // import React, { useState } from "react";
// // import "../styles.css";
// // import { motion } from "framer-motion";
// // import { useNavigate } from "react-router-dom";
// // import { Bird } from "lucide-react";
// // import { useRef } from "react";

// // const FAQHOME = ({ userType }) => {
// //      const navigate = useNavigate();
// //   const isDragging = useRef(false);
// //   const applicantFaqs = [
// //     {
// //       question: "How do I create an account?",
// //       answer:
// //         "Click Sign Up and choose Applicant. Fill in your details to register.",
// //     },
// //     {
// //       question: "How do I apply for a job?",
// //       answer:
// //         "Use the 'Search Jobs' feature to browse listings and apply with your portfolio.",
// //     },
// //     {
// //       question: "How do I update my profile?",
// //       answer:
// //         "Go to the 'Profile' page from the navigation bar and click edit.",
// //     },
// //     {
// //       question: "What is 'Get Discovered'?",
// //       answer:
// //         "This feature boosts your visibility to employers based on your skills.",
// //     },
// //   ];

// //   const employerFaqs = [
// //     {
// //       question: "How do I register as an employer?",
// //       answer:
// //         "Click Sign Up and choose Employer. Fill out your company and contact info.",
// //     },
// //     {
// //       question: "How do I post a job?",
// //       answer:
// //         "Navigate to the 'Post Job' section and fill in the job posting form.",
// //     },
// //     {
// //       question: "How do I filter applicants?",
// //       answer:
// //         "Go to 'Discover' and use the skill-based filters to find ideal candidates.",
// //     },
// //     {
// //       question: "How do notifications work?",
// //       answer:
// //         "You'll be alerted when an applicant interacts with your job post.",
// //     },
// //   ];

// //   const [openIndex, setOpenIndex] = useState(null);

// //   const faqs = userType === "employer" ? employerFaqs : applicantFaqs;

// //   const toggleFaq = (index) => {
// //     setOpenIndex(openIndex === index ? null : index);
// //   };

// //   return (
// //     <div className="container mt-5 pt-5">
// //       <h2 className="mb-4">Frequently Asked Questions</h2>
// //       <div className="accordion">
// //         {faqs.map((faq, index) => (
// //           <div className="accordion-item" key={index}>
// //             <h2 className="accordion-header">
// //               <button
// //                 className={`accordion-button ${
// //                   openIndex === index ? "" : "collapsed"
// //                 }`}
// //                 type="button"
// //                 onClick={() => toggleFaq(index)}
// //               >
// //                 {faq.question}
// //               </button>
// //             </h2>
// //             <div
// //               className={`accordion-collapse collapse ${
// //                 openIndex === index ? "show" : ""
// //               }`}
// //             >
// //               <div className="accordion-body">{faq.answer}</div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     <motion.div
// //       drag
// //       onDragStart={() => (isDragging.current = true)}
// //       onDragEnd={() => setTimeout(() => (isDragging.current = false), 0)}
// //       onClick={() => {
// //         if (!isDragging.current) {
// //           navigate("/");
// //         }
// //       }}
// //     //   whileHover={{ scale: 1.2, rotate: 2 }}
// //       whileTap={{ scale: 0.95 }}
// //       className="cursor-pointer text-blue-600"
// //     >
// //       <Bird size={100} />
// //     </motion.div>

// //     </div>
   
// //   );
// // };

// // export default FAQHOME;
// // import React, { useState } from "react";
// // import "../styles.css";
// // import { motion } from "framer-motion";
// // import { useNavigate } from "react-router-dom";
// // import { Bird } from "lucide-react";
// // import { useRef } from "react";

// // const FAQHOME = ({ userType }) => {
// //      const navigate = useNavigate();
// //   const isDragging = useRef(false);
// //   const applicantFaqs = [
// //     {
// //       question: "How do I create an account?",
// //       answer:
// //         "Click Sign Up and choose Applicant. Fill in your details to register.",
// //     },
// //     {
// //       question: "How do I apply for a job?",
// //       answer:
// //         "Use the 'Search Jobs' feature to browse listings and apply with your portfolio.",
// //     },
// //     {
// //       question: "How do I update my profile?",
// //       answer:
// //         "Go to the 'Profile' page from the navigation bar and click edit.",
// //     },
// //     {
// //       question: "What is 'Get Discovered'?",
// //       answer:
// //         "This feature boosts your visibility to employers based on your skills.",
// //     },
// //   ];

// //   const employerFaqs = [
// //     {
// //       question: "How do I register as an employer?",
// //       answer:
// //         "Click Sign Up and choose Employer. Fill out your company and contact info.",
// //     },
// //     {
// //       question: "How do I post a job?",
// //       answer:
// //         "Navigate to the 'Post Job' section and fill in the job posting form.",
// //     },
// //     {
// //       question: "How do I filter applicants?",
// //       answer:
// //         "Go to 'Discover' and use the skill-based filters to find ideal candidates.",
// //     },
// //     {
// //       question: "How do notifications work?",
// //       answer:
// //         "You'll be alerted when an applicant interacts with your job post.",
// //     },
// //   ];

// //   const [openIndex, setOpenIndex] = useState(null);

// //   const faqs = userType === "employer" ? employerFaqs : applicantFaqs;

// //   const toggleFaq = (index) => {
// //     setOpenIndex(openIndex === index ? null : index);
// //   };

// //   return (
// //     <div className="container mt-5 pt-5">
// //       <h2 className="mb-4">Frequently Asked Questions</h2>
// //       <div className="accordion">
// //         {faqs.map((faq, index) => (
// //           <div className="accordion-item" key={index}>
// //             <h2 className="accordion-header">
// //               <button
// //                 className={`accordion-button ${
// //                   openIndex === index ? "" : "collapsed"
// //                 }`}
// //                 type="button"
// //                 onClick={() => toggleFaq(index)}
// //               >
// //                 {faq.question}
// //               </button>
// //             </h2>
// //             <div
// //               className={`accordion-collapse collapse ${
// //                 openIndex === index ? "show" : ""
// //               }`}
// //             >
// //               <div className="accordion-body">{faq.answer}</div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     <motion.div
// //       drag
// //       onDragStart={() => (isDragging.current = true)}
// //       onDragEnd={() => setTimeout(() => (isDragging.current = false), 0)}
// //       onClick={() => {
// //         if (!isDragging.current) {
// //           navigate("/");
// //         }
// //       }}
// //     //   whileHover={{ scale: 1.2, rotate: 2 }}
// //       whileTap={{ scale: 0.95 }}
// //       className="cursor-pointer text-blue-600"
// //     >
// //       <Bird size={100} />
// //     </motion.div>

// //     </div>
   
// //   );
// // };

// // export default FAQHOME;
// import React, { useState } from "react";
// import { Mail, Phone, HelpCircle, ChevronDown, Search } from "lucide-react";
// import "../styles.css";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { Bird } from "lucide-react";
// import { useRef } from "react";
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
// const FAQ = ({ userType = "applicant" }) => {
//     const navigate = useNavigate();
//   const isDragging = useRef(false);
//   const applicantFaqs = [
//     {
//       question: "How do I create an account?",
//       answer: "Click Sign Up and choose Applicant. Fill in your details to register.",
//       category: "Account"
//     },
//     {
//       question: "How do I apply for a job?",
//       answer: "Use the 'Search Jobs' feature to browse listings and apply with your portfolio.",
//       category: "Jobs"
//     },
//     {
//       question: "How do I update my profile?",
//       answer: "Go to the 'Profile' page from the navigation bar and click edit.",
//       category: "Account"
//     },
//     {
//       question: "What is 'Get Discovered'?",
//       answer: "This feature boosts your visibility to employers based on your skills.",
//       category: "Features"
//     },
//      {
//       question: "How do I register as an employer?",
//       answer: "Click Sign Up and choose Employer. Fill out your company and contact info.",
//       category: "Account"
//     },
//     {
//       question: "How do I post a job?",
//       answer: "Navigate to the 'Post Job' section and fill in the job posting form.",
//       category: "Jobs"
//     },
//     {
//       question: "How do I filter applicants?",
//       answer: "Go to 'Discover' and use the skill-based filters to find ideal candidates.",
//       category: "Features"
//     },
//     {
//       question: "How do notifications work?",
//       answer: "You'll be alerted when an applicant interacts with your job post.",
//       category: "Features"
//     },
//   ];

//   const employerFaqs = [
   
//   ];

//   const [openIndex, setOpenIndex] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeCategory, setActiveCategory] = useState("All");
  
//   const faqs = userType === "employer" ? employerFaqs : applicantFaqs;
  
//   // Get unique categories
//   const categories = ["All", ...new Set(faqs.map(faq => faq.category))];
  
//   // Filter FAQs based on search and category
//   const filteredFaqs = faqs.filter(faq => {
//     const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                           faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const toggleFaq = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <AnimatedGroup 
//       className="notifications-container"
//       baseDelay={0.1}
//       delayIncrement={0.15}
//     >
//     <div className="skifolio-faq-container">
//       <div className="skifolio-faq-header">
//         <h2 className="skifolio-faq-title">
//           <HelpCircle className="skifolio-faq-icon" />
//           Frequently Asked Questions
//         </h2>
//         <p className="skifolio-faq-subtitle">
//           Common questions for {userType === "employer" ? "employers" : "applicants"}.
//         </p>
//       </div>

//       {/* Search Bar */}
//       <div className="skifolio-search-wrapper">
//         <div className="skifolio-search-icon-wrapper">
//           <Search className="skifolio-search-icon" />
//         </div>
//         <input
//           type="text"
//           className="skifolio-search-input"
//           placeholder="Search questions..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Category Tabs */}
//       <div className="skifolio-category-container">
//         {categories.map((category) => (
//           <button
//             key={category}
//             onClick={() => setActiveCategory(category)}
//             className={`skifolio-category-button ${
//               activeCategory === category
//                 ? "skifolio-category-active"
//                 : "skifolio-category-inactive"
//             }`}
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       {/* FAQs */}
//       <div className="skifolio-faq-list">
//         {filteredFaqs.length > 0 ? (
//           filteredFaqs.map((faq, index) => (
//             <div 
//               key={index} 
//               className="skifolio-faq-item"
//             >
//               <button
//                 onClick={() => toggleFaq(index)}
//                 className="skifolio-faq-question"
//                 aria-expanded={openIndex === index}
//               >
//                 <span className="skifolio-faq-question-text">{faq.question}</span>
//                 <span className="skifolio-faq-toggle-icon">
//                   <ChevronDown 
//                     className={`skifolio-chevron ${openIndex === index ? 'skifolio-chevron-rotated' : ''}`} 
//                   />
//                 </span>
//               </button>
//               <div 
//                 className={`skifolio-faq-answer-wrapper ${
//                   openIndex === index ? 'skifolio-answer-expanded' : 'skifolio-answer-collapsed'
//                 }`}
//               >
//                 <div className="skifolio-faq-answer">
//                   <p>{faq.answer}</p>
//                   <div className="skifolio-category-tag-wrapper">
//                     <span className="skifolio-category-tag">
//                       {faq.category}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="skifolio-empty-state">
//             <p className="skifolio-empty-text">No matching questions found.</p>
//           </div>
//         )}
//       </div>

//       {/* Contact Info */}
//       <div className="skifolio-contact-section">
//         <h3 className="skifolio-contact-title">Still need help?</h3>
//         <div className="skifolio-contact-grid">
//           <a 
//             href="mailto:skifolio.help@gmail.com" 
//             className="skifolio-contact-card"
//           >
//             <div className="skifolio-contact-icon-wrapper">
//               <Mail className="skifolio-contact-icon" />
//             </div>
//             <div className="skifolio-contact-details">
//               <p className="skifolio-contact-type">Email Support</p>
//               <p className="skifolio-contact-value">skifolio.help@gmail.com</p>
//             </div>
//           </a>
//           <a 
//             href="tel:+639770960443" 
//             className="skifolio-contact-card"
//           >
//             <div className="skifolio-contact-icon-wrapper">
//               <Phone className="skifolio-contact-icon" />
//             </div>
//             <div className="skifolio-contact-details">
//               <p className="skifolio-contact-type">Phone Support</p>
//               <p className="skifolio-contact-value">(+63) 977 096 0443</p>
//             </div>
//           </a>
//            <motion.div
//       drag
//       onDragStart={() => (isDragging.current = true)}
//       onDragEnd={() => setTimeout(() => (isDragging.current = false), 0)}
//       onClick={() => {
//         if (!isDragging.current) {
//           navigate("/");
//         }
//       }}
//     //   whileHover={{ scale: 1.2, rotate: 2 }}
//       whileTap={{ scale: 0.95 }}
//       className="cursor-pointer text-blue-600"
//     >
//       <Bird size={100} />
//     </motion.div>
//         </div>
       
//       </div>
      
//       {/* Add custom CSS */}
//       <style jsx>{`
//         .skifolio-faq-container {
//           max-width: 768px;
//           margin: 0 auto;
//           padding: 2.5rem 1rem;
//           font-family: system-ui, -apple-system, sans-serif;
//         }
        
//         .skifolio-faq-header {
//           text-align: center;
//           margin-top:3rem;
//           margin-bottom: 2rem;
//         }
        
//         .skifolio-faq-title {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.5rem;
//           font-size: 1.875rem;
//           font-weight: 700;
//           color: #1f2937;
//           margin-bottom: 0.5rem;
//         }
        
//         .skifolio-faq-icon {
//           width: 2rem;
//           height: 2rem;
//           color: #4f46e5;
//         }
        
//         .skifolio-faq-subtitle {
//           color: #6b7280;
//           font-size: 1rem;
//         }
        
//         .skifolio-search-wrapper {
//           position: relative;
//           margin-bottom: 1.5rem;
//         }
        
//         .skifolio-search-icon-wrapper {
//           position: absolute;
//           left: 0.75rem;
//           top: 50%;
//           transform: translateY(-50%);
//           pointer-events: none;
//         }
        
//         .skifolio-search-icon {
//           width: 1.25rem;
//           height: 1.25rem;
//           color: #9ca3af;
//         }
        
//         .skifolio-search-input {
//           width: 100%;
//           padding: 0.625rem 1rem 0.625rem 2.5rem;
//           border: 1px solid #d1d5db;
//           border-radius: 0.5rem;
//           background-color: white;
//           box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
//           font-size: 0.875rem;
//           outline: none;
//         }
        
//         .skifolio-search-input:focus {
//           border-color: #4f46e5;
//           ring: 2px;
//           ring-color: #e0e7ff;
//         }
        
//         .skifolio-category-container {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 0.5rem;
//           margin-bottom: 1.5rem;
//         }
        
//         .skifolio-category-button {
//           padding: 0.5rem 1rem;
//           border-radius: 9999px;
//           font-size: 0.875rem;
//           font-weight: 500;
//           cursor: pointer;
//           border: none;
//           transition: all 0.2s ease;
//         }
        
//         .skifolio-category-active {
//           background-color: #4f46e5;
//           color: white;
//         }
        
//         .skifolio-category-inactive {
//           background-color: #f3f4f6;
//           color: #4b5563;
//         }
        
//         .skifolio-category-inactive:hover {
//           background-color: #e5e7eb;
//         }
        
//         .skifolio-faq-list {
//           display: flex;
//           flex-direction: column;
//           gap: 1rem;
//         }
        
//         .skifolio-faq-item {
//           border: 1px solid #e5e7eb;
//           border-radius: 0.5rem;
//           overflow: hidden;
//           box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
//           transition: all 0.2s ease;
//         }
        
//         .skifolio-faq-item:hover {
//           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
//         }
        
//         .skifolio-faq-question {
//           width: 100%;
//           text-align: left;
//           padding: 1rem;
//           background-color: white;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           cursor: pointer;
//           border: none;
//           transition: background-color 0.2s ease;
//         }
        
//         .skifolio-faq-question:hover {
//           background-color: #f9fafb;
//         }
        
//         .skifolio-faq-question-text {
//           font-weight: 500;
//           color: #1f2937;
//         }
        
//         .skifolio-faq-toggle-icon {
//           color: #4f46e5;
//         }
        
//         .skifolio-chevron {
//           width: 1.25rem;
//           height: 1.25rem;
//           transition: transform 0.2s ease;
//         }
        
//         .skifolio-chevron-rotated {
//           transform: rotate(180deg);
//         }
        
//         .skifolio-faq-answer-wrapper {
//           overflow: hidden;
//           transition: max-height 0.3s ease;
//         }
        
//         .skifolio-answer-expanded {
//           max-height: 24rem; /* Adjust as needed */
//         }
        
//         .skifolio-answer-collapsed {
//           max-height: 0;
//         }
        
//         .skifolio-faq-answer {
//           padding: 1rem;
//           background-color: #f9fafb;
//           border-top: 1px solid #e5e7eb;
//           color: #4b5563;
//         }
        
//         .skifolio-category-tag-wrapper {
//           display: flex;
//           justify-content: flex-end;
//           margin-top: 0.5rem;
//         }
        
//         .skifolio-category-tag {
//           display: inline-flex;
//           align-items: center;
//           padding: 0.25rem 0.625rem;
//           border-radius: 9999px;
//           font-size: 0.75rem;
//           font-weight: 500;
//           background-color: #e0e7ff;
//           color: #4338ca;
//         }
        
//         .skifolio-empty-state {
//           text-align: center;
//           padding: 2.5rem 1rem;
//           background-color: #f9fafb;
//           border-radius: 0.5rem;
//         }
        
//         .skifolio-empty-text {
//           color: #6b7280;
//         }
        
//         .skifolio-contact-section {
//           margin-top: 2.5rem;
//           padding: 1.5rem;
//           background-color: #f9fafb;
//           border: 1px solid #e5e7eb;
//           border-radius: 0.5rem;
//           box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
//         }
        
//         .skifolio-contact-title {
//           font-size: 1.25rem;
//           font-weight: 600;
//           color: #1f2937;
//           margin-bottom: 1rem;
//         }
        
//         .skifolio-contact-grid {
//           display: grid;
//           grid-template-columns: 1fr;
//           gap: 1rem;
//         }
        
//         @media (min-width: 640px) {
//           .skifolio-contact-grid {
//             grid-template-columns: 1fr 1fr;
//           }
//         }
        
//         .skifolio-contact-card {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           padding: 0.75rem;
//           background-color: white;
//           border: 1px solid #e5e7eb;
//           border-radius: 0.5rem;
//           text-decoration: none;
//           transition: all 0.2s ease;
//         }
        
//         .skifolio-contact-card:hover {
//           border-color: #a5b4fc;
//           box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
//         }
        
//         .skifolio-contact-icon-wrapper {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           width: 2.5rem;
//           height: 2.5rem;
//           background-color: #e0e7ff;
//           border-radius: 9999px;
//         }
        
//         .skifolio-contact-icon {
//           width: 1.25rem;
//           height: 1.25rem;
//           color: #4f46e5;
//         }
        
//         .skifolio-contact-details {
//           flex: 1;
//         }
        
//         .skifolio-contact-type {
//           font-size: 0.875rem;
//           font-weight: 500;
//           color: #1f2937;
//           margin: 0 0 0.25rem 0;
//         }
        
//         .skifolio-contact-value {
//           font-size: 0.75rem;
//           color: #6b7280;
//           margin: 0;
//         }
//       `}</style>
      
//     </div>
//     </AnimatedGroup>
//   );
// };

// export default FAQ;
import React, { useState, useEffect, useRef } from "react";
import { Mail, Phone, HelpCircle, ChevronDown, Search, Bird } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const BouncingBird = () => {
  const navigate = useNavigate();
  const birdRef = useRef(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [velocity, setVelocity] = useState({ x: 1, y: 1 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isDragging = useRef(false);
  const birdSize = 100; // Size of the bird in pixels
  
  // Set initial window dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  // Animation loop for bouncing
  useEffect(() => {
  const boundaryPadding = 20; // Padding from the window edge
  const frictionFactor = 0.98; // Friction to slow down the movement (0.98 = 2% reduction per frame)
  const stopThreshold = 0.1; // Velocity threshold to stop movement completely
    
  if (dimensions.width === 0 || dimensions.height === 0) return;
    
  const animationFrame = requestAnimationFrame(() => {
    let newX = position.x + velocity.x;
    let newY = position.y + velocity.y;
    let newVelocityX = velocity.x * frictionFactor;
    let newVelocityY = velocity.y * frictionFactor;
      
    // Bounce off right/left edges
    if (newX + birdSize > dimensions.width - boundaryPadding || newX < boundaryPadding) {
      newVelocityX = -newVelocityX;
    }
      
    // Bounce off bottom/top edges
    if (newY + birdSize > dimensions.height - boundaryPadding || newY < boundaryPadding) {
      newVelocityY = -newVelocityY;
    }
      
    // Make sure the bird stays within bounds
    newX = Math.max(boundaryPadding, Math.min(dimensions.width - birdSize - boundaryPadding, newX));
    newY = Math.max(boundaryPadding, Math.min(dimensions.height - birdSize - boundaryPadding, newY));
      
    // Stop movement if velocity becomes too small
    if (Math.abs(newVelocityX) < stopThreshold && Math.abs(newVelocityY) < stopThreshold) {
      newVelocityX = 0;
      newVelocityY = 0;
    }
      
    setPosition({ x: newX, y: newY });
    setVelocity({ x: newVelocityX, y: newVelocityY });
  });
    
  return () => cancelAnimationFrame(animationFrame);
}, [position, velocity, dimensions]);

return (
  <div
    ref={birdRef}
    style={{
      position: 'fixed',
      left: position.x,
      top: position.y,
      zIndex: 50,
      cursor: 'pointer',
      width: birdSize,
      height: birdSize,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.2s ease',
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'scale(1.2) rotate(5deg)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
    }}
    onMouseDown={(e) => {
      e.currentTarget.style.transform = 'scale(0.95)';
      isDragging.current = true;
            
      // Setup drag functionality
      const startX = e.clientX;
      const startY = e.clientY;
      const startPosX = position.x;
      const startPosY = position.y;
            
      const handleMouseMove = (moveEvent) => {
        const newX = startPosX + (moveEvent.clientX - startX);
        const newY = startPosY + (moveEvent.clientY - startY);
        setPosition({ x: newX, y: newY });
      };
            
      const handleMouseUp = (upEvent) => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
                
        // Calculate velocity based on movement
        const dragVelocityX = (upEvent.clientX - startX) * 0.05;
        const dragVelocityY = (upEvent.clientY - startY) * 0.05;
                
        // Only update velocity if there was significant movement
        if (Math.abs(dragVelocityX) > 0.5 || Math.abs(dragVelocityY) > 0.5) {
          setVelocity({ x: dragVelocityX, y: dragVelocityY });
        }
                
        setTimeout(() => {
          isDragging.current = false;
        }, 100);
      };
            
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }}
    onClick={() => {
      if (isDragging.current) {
        // Navigate home or perform another action when clicked
        
        console.log("Bird clicked!");
        window.location.href = "/";
      }
    }}
  >
           <motion.div
      
      
      whileHover={{ scale: 1.2, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer text-blue-600"
    >
      
      <Bird size={100}className="text-blue-600" />
  
    </motion.div>
  </div>
)
  
};

const FAQHOME = ({ userType = "applicant" }) => {
  const applicantFaqs = [
   {
    question: "What is Ski-Folio?",
    answer: "A Job Market website that connects you with opportunities.",
    category: "Account"
  },
  {
    question: "How do I apply for a job?",
    answer: "Use the 'Search Jobs' feature to browse listings and apply with your portfolio.",
    category: "Jobs"
  },
  {
    question: "How do I update my profile?",
    answer: "Go to the 'Profile' page from the navigation bar and click edit.",
    category: "Account"
  },
  {
    question: "What is 'Get Discovered'?",
    answer: "This feature boosts your visibility to employers based on your skills.",
    category: "Features"
  },
  {
    question: "How do I register as an employer?",
    answer: "Click Sign Up and choose Employer. Fill out your company and contact info.",
    category: "Account"
  },
  {
    question: "How do I post a job?",
    answer: "Navigate to the 'Post Job' section and fill in the job posting form.",
    category: "Jobs"
  },
  {
    question: "How do I filter applicants?",
    answer: "Go to 'Discover' and use the skill-based filters to find ideal candidates.",
    category: "Features"
  },
  {
    question: "How do notifications work?",
    answer: "You'll be alerted when an applicant interacts with your job post or an announcement had been posted by the admins",
    category: "Features"
  },
  {
    question: "What is the 'Highest Eligible Jobs' section?",
    answer: "It shows the top job matches based on your most relevant skills.",
    category: "Features"
  },
  {
    question: "How do I manage applications I receive?",
    answer: "Employers can view all applications under each job post in 'My Jobs'.",
    category: "Jobs"
  },
  {
    question: "How is my average score calculated?",
    answer: "It's a dynamic score showing how well you match posted job skills.",
    category: "Features"
  },
  {
    question: "How do I contact applicants?",
    answer: "Once someone applies, you'll see their details and can send an invite for a meeting.",
    category: "Jobs"
  },
  {
    question: "What skills should I add?",
    answer: "Add relevant, in-demand skills to boost your job match and discovery chances.",
    category: "Account"
  },
  {
    question: "Can employers view my entire portfolio?",
    answer: "Yes, once you apply, your full profile and attached portfolio become visible.",
    category: "Account"
  },
  ];

  const employerFaqs = [];

  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  const faqs = userType === "employer" ? employerFaqs : applicantFaqs;
  
  // Get unique categories
  const categories = ["All", ...new Set(faqs.map(faq => faq.category))];
  
  // Filter FAQs based on search and category
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <BouncingBird />
      
      <div className="skifolio-faq-container">
        <div className="skifolio-faq-header">
          <h2 className="skifolio-faq-title">
            <HelpCircle className="skifolio-faq-icon" />
            Frequently Asked Questions
          </h2>
          <p className="skifolio-faq-subtitle">
            Common questions for {userType === "employer" ? "employers" : "applicants"}.
          </p>
        </div>

        {/* Search Bar */}
        <div className="skifolio-search-wrapper">
          <div className="skifolio-search-icon-wrapper">
            <Search className="skifolio-search-icon" />
          </div>
          <input
            type="text"
            className="skifolio-search-input"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Tabs */}
        <div className="skifolio-category-container">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`skifolio-category-button ${
                activeCategory === category
                  ? "skifolio-category-active"
                  : "skifolio-category-inactive"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="skifolio-faq-list">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div 
                key={index} 
                className={`skifolio-faq-item ${openIndex === index ? "skifolio-faq-open" : ""}`}
              >
                <div 
                  className="skifolio-faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`skifolio-faq-arrow ${openIndex === index ? "rotate-180" : ""}`} />
                </div>
                {openIndex === index && (
                  <div className="skifolio-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="skifolio-no-results">
              <p>No questions match your search. Try different keywords or categories.</p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div className="skifolio-contact-container">
        <h3 className="skifolio-contact-title">Still have questions?</h3>
        <p className="skifolio-contact-text">Contact our support team for personalized assistance.</p>
        
        <div className="skifolio-contact-buttons">
          <a href="mailto:support@skifolio.com" className="skifolio-contact-button skifolio-email-button">
            <Mail className="skifolio-contact-icon" />
            <span>Email Us</span>
          </a>
          <a href="tel:+18005556789" className="skifolio-contact-button skifolio-phone-button">
            <Phone className="skifolio-contact-icon" />
            <span>Call Support</span>
          </a>
        </div>
      </div>

      {/* CSS */}
      <style jsx>{`
        .skifolio-faq-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: system-ui, -apple-system, sans-serif;
        }
        
        .skifolio-faq-header {
          text-align: center;
          margin-bottom: 32px;
        }
        
        .skifolio-faq-title {
          font-size: 2rem;
          font-weight: 700;
          color: #2d3748;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        
        .skifolio-faq-icon {
          color: #4299e1;
        }
        
        .skifolio-faq-subtitle {
          color: #718096;
          font-size: 1.1rem;
        }
        
        .skifolio-search-wrapper {
          position: relative;
          margin-bottom: 24px;
        }
        
        .skifolio-search-icon-wrapper {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #718096;
        }
        
        .skifolio-search-input {
          width: 100%;
          padding: 12px 12px 12px 44px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        
        .skifolio-search-input:focus {
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.3);
        }
        
        .skifolio-category-container {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }
        
        .skifolio-category-button {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .skifolio-category-active {
          background-color: #4299e1;
          color: white;
          font-weight: 600;
        }
        
        .skifolio-category-inactive {
          background-color: #edf2f7;
          color: #4a5568;
        }
        
        .skifolio-category-inactive:hover {
          background-color: #e2e8f0;
        }
        
        .skifolio-faq-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 40px;
        }
        
        .skifolio-faq-item {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s;
        }
        
        .skifolio-faq-open {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .skifolio-faq-question {
          padding: 16px 20px;
          background-color: #f8fafc;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-weight: 600;
          color: #2d3748;
        }
        
        .skifolio-faq-arrow {
          transition: transform 0.3s;
          color: #718096;
        }
        
        .skifolio-faq-answer {
          padding: 16px 20px;
          background-color: white;
          color: #4a5568;
          line-height: 1.6;
        }
        
        .skifolio-no-results {
          text-align: center;
          padding: 32px;
          background-color: #f8fafc;
          border-radius: 8px;
          color: #718096;
        }
        
        .skifolio-contact-container {
          max-width: 800px;
          margin: 0 auto 60px;
          padding: 32px;
          text-align: center;
          background-color: #f8fafc;
          border-radius: 12px;
        }
        
        .skifolio-contact-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 8px;
        }
        
        .skifolio-contact-text {
          color: #718096;
          margin-bottom: 24px;
        }
        
        .skifolio-contact-buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        
        .skifolio-contact-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s;
        }
        
        .skifolio-email-button {
          background-color: #4299e1;
          color: white;
        }
        
        .skifolio-email-button:hover {
          background-color: #3182ce;
        }
        
        .skifolio-phone-button {
          background-color: white;
          color: #4299e1;
          border: 1px solid #4299e1;
        }
        
        .skifolio-phone-button:hover {
          background-color: #ebf8ff;
        }
        
        .skifolio-contact-icon {
          width: 18px;
          height: 18px;
        }
      `}</style>
    </>
  );
};

export default FAQHOME;
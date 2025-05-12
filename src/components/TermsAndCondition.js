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
  import { BadgeInfoIcon } from "lucide-react";
  import { motion } from "framer-motion";
  import React, { useState,useEffect } from 'react';
  
  
  import { ChevronLeft, ChevronRight, Move, X, Check, Mail } from 'lucide-react';
  
  import { auth, db } from '../firebase';
  import { useNavigate, Link } from 'react-router-dom';
  import { 
      createUserWithEmailAndPassword, 
      signInWithEmailAndPassword, 
      signOut, 
      sendEmailVerification, 
      sendPasswordResetEmail
  } from 'firebase/auth';
  import { writeBatch, doc, setDoc, getDoc } from 'firebase/firestore';
  import { useRef } from 'react';
  
  // Updated Modal Component - Enhanced to match expandedJob style
  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <AnimatedGroup 
          className="my-12 space-y-6 bg-gray-50 p-6 rounded-lg shadow-md"
          baseDelay={0.2}  // Start delay (seconds)
          delayIncrement={0.15}  // Each child adds this much delay
        >
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop with click-to-close */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50" 
          onClick={onClose}
        ></div>
        
        {/* Modal content - Now using the expandedJob styling */}
        <div 
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            width: "80%",
            maxWidth: "800px",
            maxHeight: "80vh",
            padding: "24px",
            zIndex: 1000,
            overflowY: "auto",
            animation: "fadeIn 0.3s ease",
            fontFamily: "sans-serif",
          }}
        >
          {children}
        </div>
      </div>
      </AnimatedGroup>
    );
  };
  const TermsAndCondition = ({ onClose, onAgree }) => {
      const [currentSection, setCurrentSection] = useState(0);
      const effectiveDate = "November 15, 2024";
    
      // Terms sections content
      const sections = [
        {
          title: "1. Acceptance of Terms",
          content: "By accessing or using Skifolio, you agree to be bound by these Terms and Conditions. If you do not agree, please do not register, use, or access our services."
        },
        {
          title: "2. Account Eligibility",
          content: "You must be at least 13 years old to create an account. Employers must submit valid business documents to verify company identity."
        },
        {
          title: "3. Account Responsibilities",
          content: "You are responsible for maintaining the security of your account.",
          list: [
            "Keep your login credentials secure and confidential.",
            "Immediately report unauthorized access or breaches.",
            "You are responsible for all activities that occur under your account."
          ]
        },
        {
          title: "4. User Conduct",
          content: "You agree not to:",
          list: [
            "Upload false or misleading information.",
            "Use Skifolio for unlawful or abusive purposes.",
            "Violate intellectual property rights of others."
          ]
        },
        {
          title: "5. Content Ownership",
          content: "All content you upload remains your intellectual property. By submitting content to Skifolio, you grant us a license to display and share it within the scope of the platform's purpose."
        },
        {
          title: "6. Employer Verification",
          content: "Employers must upload valid business permits and company details. These documents are reviewed and stored securely for verification purposes."
        },
        {
          title: "7. Account Approval",
          content: "All accounts are subject to verification and approval. Skifolio reserves the right to reject or suspend accounts that do not meet platform standards or violate these terms."
        },
        {
          title: "8. Termination",
          content: "We may suspend or terminate your account for violations of these Terms, misuse of the platform, or at our discretion with or without prior notice."
        },
        {
          title: "9. Limitation of Liability",
          content: "Skifolio is provided \"as is\" and we make no warranties regarding its accuracy, security, or availability. We are not liable for any indirect or consequential damages arising from the use of our platform."
        },
        {
          title: "10. Changes to Terms",
          content: "We may revise these Terms at any time. Continued use of Skifolio constitutes acceptance of the updated terms. We encourage users to review this page regularly."
        },
        {
          title: "11. Contact Us",
          content: "For questions or concerns regarding these Terms, please contact us at support@skifolio.com.",
          hasEmail: true
        }
      ];
  
      // Check if on the final slide
      const isLastSection = currentSection === sections.length - 1;
      
      // Handle section navigation
      const nextSection = () => {
        if (currentSection < sections.length - 1) {
          setCurrentSection(currentSection + 1);
        }
      };
      
      const prevSection = () => {
        if (currentSection > 0) {
          setCurrentSection(currentSection - 1);
        }
      };
    
      // Keyboard navigation
      useEffect(() => {
        const handleKeyDown = (e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            nextSection();
          } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            prevSection();
          }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
      }, [currentSection]);
      
      return (
        <AnimatedGroup 
          className="my-12 space-y-6 bg-gray-50 p-6 rounded-lg shadow-md"
          baseDelay={0.2}  // Start delay (seconds)
          delayIncrement={0.15}  // Each child adds this much delay
        >
        <div className="w-full max-w-2xl bg-white border border-gray-300">
          {/* Header */}
          <div className="bg-gray-200 p-4">
            <div className="flex justify-between items-center">
              <AnimatedHeading className="text-xl font-bold">Terms and Conditions</AnimatedHeading>
              <div>
                <span>
                  {currentSection + 1} / {sections.length}
                </span>
              </div>
            </div>
            <p className="text-sm mt-2">
              Effective Date: {effectiveDate}
            </p>
          </div>
          
          {/* Progress bar */}
          <div className="w-full h-1 bg-gray-100">
            <div 
              className="h-full bg-gray-500"
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            />
          </div>
          
          {/* Content area */}
          <div className="p-4 border-t border-b border-gray-300">
            <div className="bg-white">
              <AnimatedHeading className="text-lg font-semibold mb-3 pb-2 border-b border-gray-200">
                {sections[currentSection].title}
              </AnimatedHeading>
              
              <div className="mb-4">
                {sections[currentSection].content}
              </div>
              
              {sections[currentSection].list && (
                <ul className="my-4 pl-5 list-disc">
                  {sections[currentSection].list.map((item, i) => (
                    <li key={i} className="mb-1">{item}</li>
                  ))}
                </ul>
              )}
              
              {sections[currentSection].hasEmail && (
                <div className="mt-4">
                  <a 
                    href="mailto:support@skifolio.com" 
                    className="text-blue-600"
                  >
                    support@skifolio.com
                  </a>
                </div>
              )}
            </div>
          </div>
          
          {/* Section navigation */}
          {/* <div className="p-2 bg-gray-100 flex justify-center">
            {sections.map((_, index) => (
              <AnimatedButton
                key={index}
                onClick={() => setCurrentSection(index)}
                className={`mx-1 px-2 py-1 ${
                  index === currentSection 
                    ? 'bg-gray-500 text-white' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              >
                {index + 1}
              </AnimatedButton>
            ))}
          </div> */}
          
          {/* Navigation buttons */}
          <div className="flex justify-between p-3 bg-gray-100 border-t border-gray-300">
            <button
              onClick={prevSection}
              disabled={currentSection === 0}
              className={`px-4 py-2 ${
                currentSection === 0 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            >
              Previous
            </button>
            
            <button
              onClick={nextSection}
              disabled={isLastSection}
              className={`px-4 py-2 ${
                isLastSection
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            >
              Next
            </button>
          </div>
          
          {/* Footer button area */}
          <div className="bg-gray-100 border-t border-gray-300 p-4 flex justify-between">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400"
            >
              Close
            </button>
            
            {isLastSection && (
  
              <Link className="nav-link" to="/employer/post-job">
                              
                                <button 
                
              >
                I Agree
              </button>
              </Link>
              
            )}
          </div>
          
          <div className="p-3 text-center text-xs text-gray-500 border-t border-gray-100">
            © 2025 Skifolio. All rights reserved.
          </div>
        </div>
        </AnimatedGroup>
      );
    };
    export default TermsAndCondition;
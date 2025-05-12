// import React, { useState } from "react";
// import "../styles.css";
// import { Mail, Phone } from 'lucide-react'
// const FAQ = ({ userType }) => {
//   const applicantFaqs = [
//     {
//       question: "How do I create an account?",
//       answer:
//         "Click Sign Up and choose Applicant. Fill in your details to register.",
//     },
//     {
//       question: "How do I apply for a job?",
//       answer:
//         "Use the 'Search Jobs' feature to browse listings and apply with your portfolio.",
//     },
//     {
//       question: "How do I update my profile?",
//       answer:
//         "Go to the 'Profile' page from the navigation bar and click edit.",
//     },
//     {
//       question: "What is 'Get Discovered'?",
//       answer:
//         "This feature boosts your visibility to employers based on your skills.",
//     },
//   ];

//   const employerFaqs = [
//     {
//       question: "How do I register as an employer?",
//       answer:
//         "Click Sign Up and choose Employer. Fill out your company and contact info.",
//     },
//     {
//       question: "How do I post a job?",
//       answer:
//         "Navigate to the 'Post Job' section and fill in the job posting form.",
//     },
//     {
//       question: "How do I filter applicants?",
//       answer:
//         "Go to 'Discover' and use the skill-based filters to find ideal candidates.",
//     },
//     {
//       question: "How do notifications work?",
//       answer:
//         "You'll be alerted when an applicant interacts with your job post.",
//     },
//   ];

//   const [openIndex, setOpenIndex] = useState(null);

//   const faqs = userType === "employer" ? employerFaqs : applicantFaqs;

//   const toggleFaq = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
// <div className="container mt-5 pt-5">
//   <h2 className="mb-4">Frequently Asked Questions</h2>
//   <div className="accordion">
//     {faqs.map((faq, index) => (
//       <div className="accordion-item" key={index}>
//         <h2 className="accordion-header">
//           <button
//             className={`accordion-button ${
//               openIndex === index ? '' : 'collapsed'
//             }`}
//             type="button"
//             onClick={() => toggleFaq(index)}
//           >
//             {faq.question}
//           </button>
//         </h2>
//         <div
//           className={`accordion-collapse collapse ${
//             openIndex === index ? 'show' : ''
//           }`}
//         >
//           <div className="accordion-body">{faq.answer}</div>
//         </div>
//       </div>
//     ))}
//   </div>

//   {/* Contact Information with Icons */}
//   <div className="mt-5">
//     <p className="text-muted flex items-center gap-2">
//       <Mail className="w-5 h-5" />
//       <a href="mailto:skifolio.help@gmail.com">skifolio.help@gmail.com</a>
//     </p>
//     <p className="text-muted flex items-center gap-2 mt-2">
//       <Phone className="w-5 h-5" />
//       <a href="tel:+639770960443">(+63) 977 096 0443</a>
//     </p>
//   </div>
// </div>

//   );
// };

// export default FAQ;
import React, { useState } from "react";
import { Mail, Phone, HelpCircle, ChevronDown, Search, Link ,TerminalSquare} from "lucide-react";
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
const FAQ = ({ userType = "applicant" }) => {
  const applicantFaqs = [
    {
      question: "How do I create an account?",
      answer: "If you are looking for a job, then choose Applicant. Fill in the details that are needed to create your account and wait for E-mail verification and for the admin to completely verify your account. Remember that having your own GitHub account and repository is needed for account creation",
      category: "Account"
    },
    {
      question: "How do I apply for a job?",
      answer: "Use the 'Search Jobs' feature to browse listings and apply with your portfolio. In order for us to recommend you jobs that are highly applicable, submit a live demo of your code so that our system will grade it based on the contents and the score will act as a guide for employers to see if you are fit for the job.",
      category: "Jobs"
    },
    {
      question: "How do I update my profile?",
      answer: "Go to the 'Profile' page from the navigation bar and click parts of your profile that you wanted to change. Visual indicators are added so that you can find what are the things you can change.",
      category: "Account"
    },
    {
      question: "What is 'Get Discovered'?",
      answer: "By allowing this feature, it allows you to be seen by an employer based on the roles that you have picked. This boosts your chances of having a job as they are looking for specific roles outside of job posts. Give it a try and let yourself be seen",
      category: "Features"
    },
     {
      question: "How do I register as an employer?",
      answer: " Click Sign Up and choose Employer. Fill out your company details and contact info. wait for E-mail verification and for the admin to completely verify your account",
      category: "Account"
    },
    {
      question: "How do I post a job?",
      answer: "Navigate to the 'Post Job' section and fill in the job posting form. For more detailed explanation of how the scoring works, read the description below.",
      category: "Jobs"
    },
    {
      question: "How do I filter applicants?",
      answer: "If you want to handpick applicants rather than posting a job, go to 'Discover' and use the skill-based filters to find ideal candidates.",
      category: "Features"
    },
    {
      question: "How do notifications work?",
      answer: "If you are an applicant, you will see if the employer accepted your application as the system will notify you about it. When an applicant applied to your job post, you will be alerted and will show what job post they have interacted in. Admin announcements will also be seen in the notification tab.",
      category: "Features"
    },
  
  ];

  const employerFaqs = [
    {
          question: "How do I update my profile?",
      answer: "Go to the 'Profile' page from the navigation bar and click parts of your profile that you wanted to change. Visual indicators are added so that you can find what are the things you can change.",
      category: "Account"
    },
    {
      question: "What is 'Discover'?",
      answer: "This feature allows you to look for potential applicants by selecting roles that you are looking for. You can use the filter function to properly search for applicants that you need.",
      category: "Features"
    },
     {
      question: "If we accepted an applicant are they already hired?",
      answer: "Ski-folio is only a job-matching website, it is still up to the management on how will they accept applicants through our website. It is still recommended for the applicants to go under screening to know if they are appropriate for your company",
      category: "Jobs"
    },
    {
      question: "How do I post a job?",
      answer: "Navigate to the 'Post Job' section and fill in the job posting form, from the job roles that you needed, title, proper job description, location, and average score that you are looking for. For more detailed explanation of how the scoring works, read the description below. Keep in mind to post appropriately as violators might be blacklisted in the website",
      category: "Jobs"
    },
    {
      question: "How do notifications work?",
      answer: "You will see if an applicant have submitted their application in your job post and the website will notify you about it. Admin announcements will also be seen as 'News' in the notification tab.",
      category: "Features"
    },
  ];

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
      <AnimatedGroup 
      className="sc-applicant-container"
      baseDelay={0.1}
      delayIncrement={0.15}
    >
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

      {/* FAQs */}
      <div className="skifolio-faq-list">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <div 
              key={index} 
              className="skifolio-faq-item"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="skifolio-faq-question"
                aria-expanded={openIndex === index}
              >
                <span className="skifolio-faq-question-text">{faq.question}</span>
                <span className="skifolio-faq-toggle-icon">
                  <ChevronDown 
                    className={`skifolio-chevron ${openIndex === index ? 'skifolio-chevron-rotated' : ''}`} 
                  />
                </span>
              </button>
              <div 
                className={`skifolio-faq-answer-wrapper ${
                  openIndex === index ? 'skifolio-answer-expanded' : 'skifolio-answer-collapsed'
                }`}
              >
                <div className="skifolio-faq-answer">
                  <p>{faq.answer}</p>
                  <div className="skifolio-category-tag-wrapper">
                    <span className="skifolio-category-tag">
                      {faq.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="skifolio-empty-state">
            <p className="skifolio-empty-text">No matching questions found.</p>
          </div>
        )}
      </div>

      {/* Contact Info */}
      <div className="skifolio-contact-section">
        <h3 className="skifolio-contact-title">Still need help?</h3>
        <div className="skifolio-contact-grid">
          <a 
            href="mailto:skifolio.help@gmail.com" 
            className="skifolio-contact-card"
          >
            <div className="skifolio-contact-icon-wrapper">
              <Mail className="skifolio-contact-icon" />
            </div>
            <div className="skifolio-contact-details">
              <p className="skifolio-contact-type">Email Support</p>
              <p className="skifolio-contact-value">skifolio.help@gmail.com</p>
            </div>
          </a>
          <a 
            href="tel:+639770960443" 
            className="skifolio-contact-card"
          >
            <div className="skifolio-contact-icon-wrapper">
              <Phone className="skifolio-contact-icon" />
            </div>
            <div className="skifolio-contact-details">
              <p className="skifolio-contact-type">Phone Support</p>
              <p className="skifolio-contact-value">(+63) 977 096 0443</p>
            </div>

          </a>

          <a
            className="folio-link-card"
            href="/Skifolio Terms and Conditions.pdf"
            download="Skifolio_Terms_and_Conditions.pdf"
          >
            <div className="folio-icon-container">
              <TerminalSquare className="folio-icon" />
            </div>
            <div className="folio-text-content">
              <p className="folio-title">Terms and Conditions</p>
              <p className="folio-subtext">Ski-folio's terms and conditions</p>
            </div>
          </a>

          

            
          
        </div>
      </div>
      
      {/* Add custom CSS */}
      <style jsx>{`
        .skifolio-faq-container {
          max-width: 768px;
          margin: 0 auto;
          padding: 2.5rem 1rem;
          font-family: system-ui, -apple-system, sans-serif;
        }
        
        .skifolio-faq-header {
          text-align: center;
          margin-top:3rem;
          margin-bottom: 2rem;
        }
        
        .skifolio-faq-title {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 1.875rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }
        
        .skifolio-faq-icon {
          width: 2rem;
          height: 2rem;
          color: #4f46e5;
        }
        
        .skifolio-faq-subtitle {
          color: #6b7280;
          font-size: 1rem;
        }
        
        .skifolio-search-wrapper {
          position: relative;
          margin-bottom: 1.5rem;
        }
        
        .skifolio-search-icon-wrapper {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }
        
        .skifolio-search-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: #9ca3af;
        }
        
        .skifolio-search-input {
          width: 100%;
          padding: 0.625rem 1rem 0.625rem 2.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          background-color: white;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          font-size: 0.875rem;
          outline: none;
        }
        
        .skifolio-search-input:focus {
          border-color: #4f46e5;
          ring: 2px;
          ring-color: #e0e7ff;
        }
        
        .skifolio-category-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        
        .skifolio-category-button {
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
        }
        
        .skifolio-category-active {
          background-color: #4f46e5;
          color: white;
        }
        
        .skifolio-category-inactive {
          background-color: #f3f4f6;
          color: #4b5563;
        }
        
        .skifolio-category-inactive:hover {
          background-color: #e5e7eb;
        }
        
        .skifolio-faq-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .skifolio-faq-item {
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          transition: all 0.2s ease;
        }
        
        .skifolio-faq-item:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .skifolio-faq-question {
          width: 100%;
          text-align: left;
          padding: 1rem;
          background-color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          border: none;
          transition: background-color 0.2s ease;
        }
        
        .skifolio-faq-question:hover {
          background-color: #f9fafb;
        }
        
        .skifolio-faq-question-text {
          font-weight: 500;
          color: #1f2937;
        }
        
        .skifolio-faq-toggle-icon {
          color: #4f46e5;
        }
        
        .skifolio-chevron {
          width: 1.25rem;
          height: 1.25rem;
          transition: transform 0.2s ease;
        }
        
        .skifolio-chevron-rotated {
          transform: rotate(180deg);
        }
        
        .skifolio-faq-answer-wrapper {
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        
        .skifolio-answer-expanded {
          max-height: 24rem; /* Adjust as needed */
        }
        
        .skifolio-answer-collapsed {
          max-height: 0;
        }
        
        .skifolio-faq-answer {
          padding: 1rem;
          background-color: #f9fafb;
          border-top: 1px solid #e5e7eb;
          color: #4b5563;
        }
        
        .skifolio-category-tag-wrapper {
          display: flex;
          justify-content: flex-end;
          margin-top: 0.5rem;
        }
        
        .skifolio-category-tag {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.625rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          background-color: #e0e7ff;
          color: #4338ca;
        }
        
        .skifolio-empty-state {
          text-align: center;
          padding: 2.5rem 1rem;
          background-color: #f9fafb;
          border-radius: 0.5rem;
        }
        
        .skifolio-empty-text {
          color: #6b7280;
        }
        
        .skifolio-contact-section {
          margin-top: 2.5rem;
          padding: 1.5rem;
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        
        .skifolio-contact-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
        }
        
        .skifolio-contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        
        @media (min-width: 640px) {
          .skifolio-contact-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        
        .skifolio-contact-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background-color: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        
        .skifolio-contact-card:hover {
          border-color: #a5b4fc;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .skifolio-contact-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          background-color: #e0e7ff;
          border-radius: 9999px;
        }
        
        .skifolio-contact-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: #4f46e5;
        }
        
        .skifolio-contact-details {
          flex: 1;
        }
        
        .skifolio-contact-type {
          font-size: 0.875rem;
          font-weight: 500;
          color: #1f2937;
          margin: 0 0 0.25rem 0;
        }
        
        .skifolio-contact-value {
          font-size: 0.75rem;
          color: #6b7280;
          margin: 0;
        }
          Link{
           display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem;
            background-color: white;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            text-decoration: none;
            transition: all 0.2s ease;
          }
          .folio-link-card {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem;
            background-color: white;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            text-decoration: none;
            transition: all 0.2s ease;
          }

          .folio-link-card:hover {
            border-color: #a5b4fc;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          }

          .folio-icon-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2.5rem;
            height: 2.5rem;
            background-color: #e0e7ff;
            border-radius: 9999px;
          }

          .folio-icon {
            width: 1.25rem;
            height: 1.25rem;
            color: #4f46e5;
          }

          .folio-text-content {
            flex: 1;
          }

          .folio-title {
            font-size: 0.875rem;
            font-weight: 500;
            color: #1f2937;
            margin: 0 0 0.25rem 0;
          }

.folio-subtext {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
}

      `}</style>
      
    </div>
    </AnimatedGroup>
  );
};

export default FAQ;
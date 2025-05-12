// import React, { useRef, useEffect } from "react";
// import { motion, useInView, useAnimation } from "framer-motion";
// import '../transition-styles.css';

// // Reusable page transition variants
// export const pageVariants = {
//   initial: {
//     opacity: 0,
//     y: 20
//   },
//   in: {
//     opacity: 1,
//     y: 0
//   },
//   out: {
//     opacity: 0,
//     y: -20
//   }
// };

// // Reusable transition timing
// export const pageTransition = {
//   type: "tween",
//   ease: "anticipate",
//   duration: 0.5
// };

// // Staggered children container
// export const containerVariants = {
//   hidden: {
//     opacity: 0
//   },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1
//     }
//   }
// };

// // Animation variants for different element types
// export const animations = {
//   // Heading animations (h1, h2, h3...)
//   heading: {
//     hidden: {
//       opacity: 0,
//       y: -30
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.7,
//         ease: "easeOut"
//       }
//     }
//   },
  
//   // Paragraph animations
//   paragraph: {
//     hidden: {
//       opacity: 0,
//       y: 20
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         ease: "easeInOut"
//       }
//     }
//   },
  
//   // Button animations
//   button: {
//     hidden: {
//       opacity: 0,
//       scale: 0.8
//     },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         duration: 0.4,
//         ease: "backOut"
//       }
//     },
//     hover: {
//       scale: 1.05,
//       transition: {
//         duration: 0.2
//       }
//     },
//     tap: {
//       scale: 0.95
//     }
//   },
  
//   // Anchor/Link animations
//   anchor: {
//     hidden: {
//       opacity: 0,
//       y: 5
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.3,
//         ease: "easeOut"
//       }
//     },
//     hover: {
//       scale: 1.03,
//       color: "#0284c7", // Tailwind sky-600
//       transition: {
//         duration: 0.2
//       }
//     },
//     tap: {
//       scale: 0.97
//     }
//   },
  
//   // Map container animations
//   map: {
//     hidden: {
//       opacity: 0,
//       scale: 0.95
//     },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut"
//       }
//     }
//   },
  
//   // Image animations
//   image: {
//     hidden: {
//       opacity: 0,
//       scale: 0.9
//     },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut"
//       }
//     }
//   },
  
//   // List item animations
//   listItem: {
//     hidden: {
//       opacity: 0,
//       x: -20
//     },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 0.4
//       }
//     }
//   },
  
//   // Card or section animations
//   card: {
//     hidden: {
//       opacity: 0,
//       y: 30
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6
//       }
//     }
//   },
  
//   // Default animation for other elements
//   default: {
//     hidden: {
//       opacity: 0
//     },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 0.5
//       }
//     }
//   }
// };

// /**
//  * Animated heading component (h1, h2, h3, etc.)
//  */
// export const AnimatedHeading = ({ as = "h1", children, className = "", delay = 0 }) => {
//   const controls = useAnimation();
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });
//   const HeadingTag = motion[as];
  
//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//     }
//   }, [controls, isInView]);
  
//   return (
//     <HeadingTag
//       ref={ref}
//       className={className}
//       initial="hidden"
//       animate={controls}
//       variants={animations.heading}
//       transition={{ delay }}
//     >
//       {children}
//     </HeadingTag>
//   );
// };

// /**
//  * Animated paragraph component
//  */
// export const AnimatedParagraph = ({ children, className = "", delay = 0 }) => {
//   const controls = useAnimation();
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });
  
//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//     }
//   }, [controls, isInView]);
  
//   return (
//     <motion.p
//       ref={ref}
//       className={className}
//       initial="hidden"
//       animate={controls}
//       variants={animations.paragraph}
//       transition={{ delay }}
//     >
//       {children}
//     </motion.p>
//   );
// };

// /**
//  * Animated button component
//  */
// export const AnimatedButton = ({ children, className = "", delay = 0, onClick, ...props }) => {
//   const controls = useAnimation();
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });
  
//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//     }
//   }, [controls, isInView]);
  
//   return (
//     <motion.button
//       ref={ref}
//       className={className}
//       initial="hidden"
//       animate={controls}
//       whileHover="hover"
//       whileTap="tap"
//       variants={animations.button}
//       transition={{ delay }}
//       onClick={onClick}
//       {...props}
//     >
//       {children}
//     </motion.button>
//   );
// };

// /**
//  * Animated image component
//  */
// export const AnimatedImage = ({ src, alt, className = "", delay = 0, ...props }) => {
//   const controls = useAnimation();
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });
  
//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//     }
//   }, [controls, isInView]);
  
//   return (
//     <motion.img
//       ref={ref}
//       src={src}
//       alt={alt}
//       className={className}
//       initial="hidden"
//       animate={controls}
//       variants={animations.image}
//       transition={{ delay }}
//       {...props}
//     />
//   );
// };

// /**
//  * Animated list container
//  */
// export const AnimatedList = ({ as = "ul", children, className = "", delay = 0 }) => {
//   const controls = useAnimation();
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });
//   const ListTag = motion[as];
  
//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//     }
//   }, [controls, isInView]);
  
//   return (
//     <ListTag
//       ref={ref}
//       className={className}
//       initial="hidden"
//       animate={controls}
//       variants={containerVariants}
//       transition={{ delay, staggerChildren: 0.1 }}
//     >
//       {children}
//     </ListTag>
//   );
// };

// /**
//  * Animated list item
//  */
// export const AnimatedListItem = ({ children, className = "" }) => {
//   return (
//     <motion.li
//       className={className}
//       variants={animations.listItem}
//     >
//       {children}
//     </motion.li>
//   );
// };

// /**
//  * Animated container for sections, cards, etc.
//  */
// export const AnimatedContainer = ({ as = "div", children, className = "", delay = 0, variants = animations.card }) => {
//   const controls = useAnimation();
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });
//   const ContainerTag = motion[as];
  
//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//     }
//   }, [controls, isInView]);
  
//   return (
//     <ContainerTag
//       ref={ref}
//       className={className}
//       initial="hidden"
//       animate={controls}
//       variants={variants}
//       transition={{ delay }}
//     >
//       {children}
//     </ContainerTag>
//   );
// };

// /**
//  * Template for creating pages with consistent transitions
//  * Provides context for animations
//  *  
//  * @param {Object} props
//  * @param {React.ReactNode} props.children - Page content
//  * @param {string} props.className - Additional class names
//  * @param {Object} props.customVariants - Custom animation variants (optional)
//  * @param {Object} props.customTransition - Custom transition timing (optional)
//  */
// const PageTemplate = ({
//   children,
//   className = "",
//   customVariants = pageVariants,
//   customTransition = pageTransition
// }) => {
//   return (
//     <motion.div
//       className={`page-transition ${className}`}
//       initial="initial"
//       animate="in"
//       exit="out"
//       variants={customVariants}
//       transition={customTransition}
//     >
//       {children}
//     </motion.div>
//   );
// };

// /**
//  * Animated anchor/link component
//  */
// export const AnimatedAnchor = ({ href, children, className = "", delay = 0, target, rel, ...props }) => {
//   const controls = useAnimation();
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });
  
//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//     }
//   }, [controls, isInView]);
  
//   // Set default rel for external links
//   const linkRel = target === "_blank" && !rel ? "noopener noreferrer" : rel;
  
//   return (
//     <motion.a
//       ref={ref}
//       href={href}
//       className={className}
//       target={target}
//       rel={linkRel}
//       initial="hidden"
//       animate={controls}
//       whileHover="hover"
//       whileTap="tap"
//       variants={animations.anchor}
//       transition={{ delay }}
//       {...props}
//     >
//       {children}
//     </motion.a>
//   );
// };

// /**
//  * Animated map container for embedded maps (Google Maps, Leaflet, etc.)
//  */
// export const AnimatedMap = ({ children, className = "", delay = 0, ...props }) => {
//   const controls = useAnimation();
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });
  
//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//     }
//   }, [controls, isInView]);
  
//   return (
//     <motion.div
//       ref={ref}
//       className={`map-container ${className}`}
//       initial="hidden"
//       animate={controls}
//       variants={animations.map}
//       transition={{ delay }}
//       {...props}
//     >
//       {children}
//     </motion.div>
//   );
// };



// export default PageTemplate;
/**
 * Animated container with auto-delayed children
 * Automatically adds incremental delays to direct children
 */
import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import '../transition-styles.css';

export const AnimatedGroup = ({ 
  as = "div", 
  children, 
  className = "", 
  baseDelay = 0.5, 
  delayIncrement = 0.15, 
  stagger = true,
  ...props 
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const ContainerTag = motion[as];
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  // Clone children with incremental delays
  const childrenWithDelays = React.Children.map(children, (child, index) => {
    // Skip non-element children like strings or null
    if (!React.isValidElement(child)) {
      return child;
    }
    
    // Calculate delay for this child
    const childDelay = stagger ? baseDelay + (index * delayIncrement) : baseDelay;
    
    // Clone the child with the delay prop
    return React.cloneElement(child, {
      ...child.props,
      delay: childDelay
    });
  });
  
  return (
    <ContainerTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={animations.card}
      {...props}
    >
      {childrenWithDelays}
    </ContainerTag>
  );
};
// Reusable page transition variants
export const pageVariants = {
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

// Reusable transition timing
export const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

// Staggered children container
export const containerVariants = {
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

// Animation variants for different element types
export const animations = {
  // Heading animations (h1, h2, h3...)
  heading: {
    hidden: {
      opacity: 0,
      y: -30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  },
  
  // Paragraph animations
  paragraph: {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  },
  
  // Button animations
  button: {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "backOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  },
  
  // Anchor/Link animations
  anchor: {
    hidden: {
      opacity: 0,
      y: 5
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.03,
      color: "#0284c7", // Tailwind sky-600
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.97
    }
  },
  
  // Map container animations
  map: {
    hidden: {
      opacity: 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  },
  
  // Image animations
  image: {
    hidden: {
      opacity: 0,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  },
  
  // List item animations
  listItem: {
    hidden: {
      opacity: 0,
      x: -20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4
      }
    }
  },
  
  // Card or section animations
  card: {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  },
  
  // Default animation for other elements
  default: {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }
};

/**
 * Animated heading component (h1, h2, h3, etc.)
 */
export const AnimatedHeading = ({ as = "h1", children, className = "", delay = 0 }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const HeadingTag = motion[as];
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return (
    <HeadingTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={animations.heading}
      transition={{ delay }}
    >
      {children}
    </HeadingTag>
  );
};

/**
 * Animated paragraph component
 */
export const AnimatedParagraph = ({ children, className = "", delay = 0 }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return (
    <motion.p
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={animations.paragraph}
      transition={{ delay }}
    >
      {children}
    </motion.p>
  );
};

/**
 * Animated button component
 */
export const AnimatedButton = ({ children, className = "", delay = 0, onClick, ...props }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return (
    <motion.button
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      whileHover="hover"
      whileTap="tap"
      variants={animations.button}
      transition={{ delay }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

/**
 * Animated image component
 */
export const AnimatedImage = ({ src, alt, className = "", delay = 0, ...props }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      initial="hidden"
      animate={controls}
      variants={animations.image}
      transition={{ delay }}
      {...props}
    />
  );
};

/**
 * Animated list container
 */
export const AnimatedList = ({ as = "ul", children, className = "", delay = 0 }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const ListTag = motion[as];
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return (
    <ListTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      transition={{ delay, staggerChildren: 0.1 }}
    >
      {children}
    </ListTag>
  );
};

/**
 * Animated list item
 */
export const AnimatedListItem = ({ children, className = "" }) => {
  return (
    <motion.li
      className={className}
      variants={animations.listItem}
    >
      {children}
    </motion.li>
  );
};

/**
 * Animated container for sections, cards, etc.
 */
export const AnimatedContainer = ({ as = "div", children, className = "", delay = 0, variants = animations.card }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const ContainerTag = motion[as];
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return (
    <ContainerTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </ContainerTag>
  );
};

/**
 * Template for creating pages with consistent transitions
 * Provides context for animations
 *  
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content
 * @param {string} props.className - Additional class names
 * @param {Object} props.customVariants - Custom animation variants (optional)
 * @param {Object} props.customTransition - Custom transition timing (optional)
 */
const PageTemplate = ({
  children,
  className = "",
  customVariants = pageVariants,
  customTransition = pageTransition
}) => {
  return (
    <motion.div
      className={`page-transition ${className}`}
      initial="initial"
      animate="in"
      exit="out"
      variants={customVariants}
      transition={customTransition}
    >
      {children}
    </motion.div>
  );
};

/**
 * Animated anchor/link component
 */
export const AnimatedAnchor = ({ href, children, className = "", delay = 0, target, rel, ...props }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  // Set default rel for external links
  const linkRel = target === "_blank" && !rel ? "noopener noreferrer" : rel;
  
  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      target={target}
      rel={linkRel}
      initial="hidden"
      animate={controls}
      whileHover="hover"
      whileTap="tap"
      variants={animations.anchor}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.a>
  );
};

/**
 * Animated map container for embedded maps (Google Maps, Leaflet, etc.)
 */
export const AnimatedMap = ({ children, className = "", delay = 0, ...props }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return (
    <motion.div
      ref={ref}
      className={`map-container ${className}`}
      initial="hidden"
      animate={controls}
      variants={animations.map}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default PageTemplate;
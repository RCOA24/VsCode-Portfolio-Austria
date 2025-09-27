// src/data/sections.jsx
import { useEffect, useRef, useCallback } from "react";

// ================== HOME (ELEVATOR PITCH) ==================
export const Home = ({ onNavigateToAbout }) => {
  const container = useRef(null);
  const backgroundRef = useRef(null);
  const animationFrameRef = useRef(null);
  const particlesRef = useRef([]);
  const isVisibleRef = useRef(true);

  // Optimized particle creation with device-specific counts
  const createParticles = useCallback(() => {
    const particleContainer = backgroundRef.current;
    if (!particleContainer || particlesRef.current.length > 0) return;

    const particleCount = window.innerWidth < 480 ? 3 : 
                         window.innerWidth < 768 ? 4 : 
                         window.innerWidth < 1024 ? 5 : 6;
    
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 2 + 1}px;
        height: ${Math.random() * 2 + 1}px;
        background: ${Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6'};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.3 + 0.1};
        will-change: transform;
        pointer-events: none;
        animation: float${i % 3} ${Math.random() * 20 + 15}s infinite linear;
      `;
      particlesRef.current.push(particle);
      fragment.appendChild(particle);
    }
    
    particleContainer.appendChild(fragment);
  }, []);

  // Optimized content animation with responsive timing
  const animateContent = useCallback(() => {
    if (!container.current || !isVisibleRef.current) return;

    const children = Array.from(container.current.children);
    const ctaSection = children.find(child => child.classList?.contains('cta-section'));
    const otherChildren = children.filter(child => !child.classList?.contains('cta-section'));

    const isMobile = window.innerWidth < 768;
    const staggerDelay = isMobile ? 150 : 200;

    otherChildren.forEach((child, i) => {
      child.style.opacity = '0';
      child.style.transform = isMobile ? 'translateY(20px)' : 'translateY(40px)';
      child.style.transition = isMobile ? 
        'opacity 0.6s ease-out, transform 0.6s ease-out' : 
        'opacity 0.8s ease-out, transform 0.8s ease-out';
      
      setTimeout(() => {
        if (isVisibleRef.current && child.isConnected) {
          child.style.opacity = '1';
          child.style.transform = 'translateY(0)';
        }
      }, i * staggerDelay);
    });
    
    if (ctaSection) {
      setTimeout(() => {
        if (isVisibleRef.current && ctaSection.isConnected) {
          ctaSection.style.opacity = '1';
          ctaSection.style.transform = 'translateY(0) scale(1)';
        }
      }, (otherChildren.length * staggerDelay) + (isMobile ? 200 : 400));
    }
  }, []);

  // Visibility observer
  const setupVisibilityObserver = useCallback(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          const animatedElements = document.querySelectorAll('.floating-particle');
          animatedElements.forEach(el => {
            el.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
          });
        });
      },
      { threshold: 0.1 }
    );

    if (container.current) {
      observer.observe(container.current);
    }

    return () => observer.disconnect();
  }, []);

  // Main useEffect
  useEffect(() => {
    let timeoutId;
    let cleanupVisibilityObserver;

    const initializeAnimations = () => {
      if (!isVisibleRef.current) return;
      animateContent();
      createParticles();
    };

    cleanupVisibilityObserver = setupVisibilityObserver();
    timeoutId = setTimeout(initializeAnimations, 100);
    
    return () => {
      isVisibleRef.current = false;
      if (timeoutId) clearTimeout(timeoutId);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (cleanupVisibilityObserver) cleanupVisibilityObserver();
      
      particlesRef.current.forEach(particle => {
        if (particle && particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
      particlesRef.current = [];
      
      if (backgroundRef.current) {
        const particles = backgroundRef.current.querySelectorAll('.floating-particle');
        particles.forEach(particle => particle.remove());
      }
    };
  }, [animateContent, createParticles, setupVisibilityObserver]);

  const handleLearnMore = useCallback(() => {
    if (onNavigateToAbout) {
      onNavigateToAbout();
    }
  }, [onNavigateToAbout]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-900">
      {/* Responsive Background with Appropriate Orbs */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      >
        {/* Mobile-optimized orbs [web:126] */}
        <div className="absolute top-1/4 left-1/6 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full filter blur-2xl sm:blur-3xl animate-pulse will-change-transform"></div>
        <div className="absolute bottom-1/4 right-1/6 w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 bg-gradient-to-r from-teal-500/8 to-cyan-500/8 rounded-full filter blur-2xl sm:blur-3xl animate-pulse will-change-transform" style={{animationDelay: '3s'}}></div>
      </div>

      {/* MOBILE-OPTIMIZED CONTENT THAT FILLS THE VIEWPORT */}
      <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 z-20">
        <div ref={container} className="space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl relative my-auto">
          
          {/* MOBILE-FRIENDLY DEVELOPER GIF [web:114][web:126] */}
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="relative group">
              <div className="backdrop-blur-sm bg-gradient-to-br from-gray-800/25 to-gray-700/15 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-gray-600/30 hover:border-purple-500/40 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/10">
                <img
                  src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnl4Nm9xcW1ydHdmbXY0aHQ3eTczYjYyMmQ5cXdkNmZ0eXk4c3o0MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUA7bdpLxQhsSQdyog/giphy.gif"
                  alt="Developer coding animation - Full-Stack Development"
                  className="w-32 sm:w-40 md:w-48 lg:w-52 xl:w-56 drop-shadow-lg sm:drop-shadow-xl rounded-lg sm:rounded-xl group-hover:scale-105 transition-transform duration-300"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* MOBILE-OPTIMIZED NAME & HOOK [web:114][web:127] */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-400 to-purple-500 drop-shadow-lg leading-tight">
              Rodney Charles O. Austria
            </h1>
            
            {/* Mobile-optimized elevator pitch [web:114] */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 font-medium leading-tight sm:leading-relaxed">
              <span className="text-purple-400">Full-Stack Developer</span> transforming business problems into 
              <span className="text-teal-400"> scalable solutions</span>
            </p>
          </div>

          

          {/* MOBILE-OPTIMIZED CREDIBILITY SECTION */}
          <div className="backdrop-blur-sm bg-gradient-to-r from-blue-500/12 to-purple-500/12 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-blue-500/20 w-full mx-auto hover:shadow-md hover:shadow-blue-500/15 transition-all duration-300">
            <p className="text-gray-200 font-medium text-sm sm:text-base md:text-lg leading-relaxed">
              🚀 <span className="text-yellow-400 font-bold">Ready to contribute immediately</span> with clean code and passion for solving business challenges.
            </p>
          </div>

          {/* MOBILE-PERFECT CTA BUTTON [web:104][web:114] */}
          <div className="cta-section opacity-0 transform translate-y-4 scale-95">
            <button 
              onClick={handleLearnMore}
              className="group relative w-full sm:w-auto px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white text-base sm:text-lg font-bold shadow-xl hover:shadow-blue-500/25 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-300 cursor-pointer backdrop-blur-sm border border-blue-500/25 will-change-transform focus:ring-4 focus:ring-blue-500/50 focus:outline-none overflow-hidden"
              aria-label="Learn more about my experience and projects"
            >
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative flex items-center justify-center gap-3">
                <span className="leading-none">Learn more about me</span>
                <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1 sm:group-hover:translate-x-2 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              
              {/* Subtle pulse effect */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white/10 scale-0 group-hover:scale-100 group-hover:opacity-0 transition-all duration-500 opacity-100"></div>
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE-OPTIMIZED CSS [web:122][web:126] */}
      <style jsx>{`
        @keyframes float0 {
          0%, 100% { transform: translate3d(0px, 0px, 0) rotate(0deg); }
          25% { transform: translate3d(4px, -6px, 0) rotate(30deg); }
          50% { transform: translate3d(8px, 0px, 0) rotate(60deg); }
          75% { transform: translate3d(4px, 6px, 0) rotate(30deg); }
        }

        @keyframes float1 {
          0%, 100% { transform: translate3d(0px, 0px, 0) rotate(0deg); }
          33% { transform: translate3d(-6px, -8px, 0) rotate(40deg); }
          66% { transform: translate3d(-12px, 4px, 0) rotate(80deg); }
        }

        @keyframes float2 {
          0%, 100% { transform: translate3d(0px, 0px, 0) rotate(0deg); }
          50% { transform: translate3d(10px, -10px, 0) rotate(60deg); }
        }

        .floating-particle {
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* Mobile-optimized hover animations */
        .group:hover img {
          animation: subtle-bounce 2s ease-in-out infinite;
        }

        @keyframes subtle-bounce {
          0%, 100% { transform: translateY(0px) scale(1.05); }
          50% { transform: translateY(-3px) scale(1.05); }
        }

        /* Mobile viewport optimization [web:122][web:125] */
        @media (max-width: 480px) {
          .floating-particle {
            animation-duration: 35s !important;
          }
        }

        @media (max-width: 640px) {
          .floating-particle {
            animation-duration: 30s !important;
          }
        }

        /* Enhanced mobile readability [web:114] */
        @media (max-width: 767px) {
          /* Ensure minimum touch target size of 44px */
          button {
            min-height: 44px;
          }
          
          /* Better mobile spacing */
          .space-y-5 > :not([hidden]) ~ :not([hidden]) {
            margin-top: 1.25rem;
          }
        }

        /* Performance optimization for larger screens */
        @media (min-width: 1024px) {
          .floating-particle {
            animation-duration: 25s !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .floating-particle,
          [class*="animate-"],
          .group:hover img {
            animation: none !important;
          }
          
          .will-change-transform {
            will-change: auto !important;
          }
        }

        /* High DPI displays optimization */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .floating-particle {
            transform: translate3d(0, 0, 0) scale(0.5);
          }
        }
      `}</style>
    </div>
  );
};



// ================== ABOUT ==================


// Programming language icons mapping
const techIcons = {
  "HTML5": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "CSS3": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "Tailwind CSS": "https://img.icons8.com/?size=100&id=x7XMNGh2vdqA&format=png&color=000000",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "PHP": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  "Laravel": "https://laravel.com/img/logomark.min.svg",
  "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "GIT": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "Bootstrap": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg"
};

export const About = ({ onNavigateToProjects }) => {
  const container = useRef(null);
  const techWrapper = useRef(null);
  const backgroundRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const isVisibleRef = useRef(true);

  const handleExploreProjects = useCallback(() => {
    if (onNavigateToProjects) onNavigateToProjects();
  }, [onNavigateToProjects]);

  useEffect(() => {
    if (!container.current) return;

    // Enhanced particle creation
    const createParticles = () => {
      const particleContainer = backgroundRef.current;
      if (!particleContainer || particlesRef.current.length > 0) return;

      const particleCount = window.innerWidth < 768 ? 8 : 12;
      const fragment = document.createDocumentFragment();
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 2.5 + 1}px;
          height: ${Math.random() * 2.5 + 1}px;
          background: ${Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6'};
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          opacity: ${Math.random() * 0.4 + 0.1};
          will-change: transform;
          pointer-events: none;
          backface-visibility: hidden;
          animation: float${i % 3} ${Math.random() * 22 + 18}s infinite linear;
        `;
        particlesRef.current.push(particle);
        fragment.appendChild(particle);
      }
      
      particleContainer.appendChild(fragment);
    };

    // Fade-in animation
    const elements = container.current.querySelectorAll(".fade-in");
    elements.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translate3d(0, 20px, 0)';
      el.style.willChange = 'transform, opacity';
      el.style.backfaceVisibility = 'hidden';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      
      setTimeout(() => {
        if (el.isConnected) {
          el.style.opacity = '1';
          el.style.transform = 'translate3d(0, 0, 0)';
          
          setTimeout(() => {
            el.style.willChange = 'auto';
          }, 600);
        }
      }, i * 80);
    });

    // Auto-scrolling tech icons
    if (techWrapper.current) {
      const totalWidth = techWrapper.current.scrollWidth / 2;
      let currentX = 0;
      
      const animate = () => {
        if (!techWrapper.current) return;
        
        currentX -= 0.25;
        if (Math.abs(currentX) >= totalWidth) {
          currentX = 0;
        }
        techWrapper.current.style.transform = `translate3d(${currentX}px, 0, 0)`;
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      
      animate();
    }

    createParticles();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      particlesRef.current.forEach(particle => {
        if (particle && particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
      particlesRef.current = [];
      
      if (backgroundRef.current) {
        const particles = backgroundRef.current.querySelectorAll('.floating-particle');
        particles.forEach(particle => particle.remove());
      }
    };
  }, []);

  // Duplicate icons for seamless looping
  const techArray = [...Object.entries(techIcons), ...Object.entries(techIcons)];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-3 sm:px-4 lg:px-6 overflow-y-hidden">
      {/* Animated Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      >
        {/* Gradient Orbs - Editor-optimized sizing [web:207] */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 bg-gradient-to-r from-blue-500/12 to-purple-500/12 rounded-full filter blur-xl sm:blur-2xl lg:blur-3xl smooth-pulse will-change-transform"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 xl:w-60 xl:h-60 bg-gradient-to-r from-teal-500/8 to-cyan-500/8 rounded-full filter blur-xl sm:blur-2xl lg:blur-3xl smooth-pulse will-change-transform" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-60 lg:h-60 xl:w-72 xl:h-72 bg-gradient-to-r from-pink-500/6 to-purple-500/6 rounded-full filter blur-xl sm:blur-2xl lg:blur-3xl smooth-pulse will-change-transform" style={{animationDelay: '4s'}}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-3 sm:opacity-5 lg:opacity-8">
          <div className="grid-pattern will-change-transform"></div>
        </div>
      </div>

      {/* Content Container - Fits within Editor viewport [web:217] */}
      <div ref={container} className="space-y-2 sm:space-y-3 md:space-y-4 w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-4xl relative z-20 py-1 sm:py-2 md:py-4 my-auto">
        
        {/* Compact Heading */}
        <div className="fade-in">
          <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-400 to-purple-500 pt-1 drop-shadow-lg">
            About Me
          </h1>
          <div className="w-10 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-0.5 rounded-full"></div>
        </div>

        {/* Compact Description */}
        <p className="fade-in text-gray-300 leading-relaxed text-xs sm:text-xs md:text-sm lg:text-base max-w-full mx-auto backdrop-blur-sm bg-gradient-to-br from-gray-800/15 to-gray-700/10 p-2 sm:p-3 md:p-4 rounded-lg border border-gray-700/30 hover:border-gray-600/40 transition-all duration-300">
          Hi, I'm <span className="font-semibold text-teal-400">Rodney Austria</span>, a{" "}
          <span className="text-purple-400 font-medium">Full-Stack Developer</span> and recent{" "}
          <span className="text-blue-400 font-medium">BSc IT Graduate</span> with a passion for crafting{" "}
          <span className="text-pink-400 font-medium">modern, responsive</span> web apps. I enjoy turning ideas into{" "}
          <span className="text-orange-400 font-medium">interactive experiences</span> that blend clean UI, seamless UX, and solid code architecture.
        </p>

        {/* Compact Tech Stack Section */}
        <div className="fade-in space-y-1 sm:space-y-2 md:space-y-3">
          <div className="text-center">
            <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-200">
              Technologies & Tools
            </h2>
            <p className="text-gray-500 text-xs hidden md:block">My toolkit for building exceptional web experiences</p>
          </div>
          
          {/* Editor-optimized Tech Stack Auto Scroll [web:208] */}
          <div className="overflow-hidden relative py-1 sm:py-2 md:py-3 lg:py-4 backdrop-blur-sm bg-gradient-to-r from-gray-800/8 to-gray-700/6 rounded-lg border border-gray-700/25 hover:border-gray-600/30 transition-all duration-300">
            <div
              ref={techWrapper}
              className="flex items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 justify-start will-change-transform"
              style={{ width: "max-content" }}
            >
              {techArray.map(([tech, iconUrl], i) => (
                <div
                  key={i}
                  className="flex flex-col items-center p-1 sm:p-1.5 md:p-2 lg:p-3 bg-gradient-to-br from-gray-800/30 to-gray-700/20 backdrop-blur-sm rounded-md border border-gray-600/30 hover:border-cyan-400/50 hover:bg-gradient-to-br hover:from-gray-700/40 hover:to-gray-600/30 transition-all duration-300 hover:scale-105 hover:shadow-sm hover:shadow-cyan-500/15 min-w-[40px] sm:min-w-[50px] md:min-w-[60px] lg:min-w-[70px] group will-change-transform"
                >
                  <img
                    src={iconUrl}
                    alt={tech}
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 mb-0.5 sm:mb-1 object-contain group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded items-center justify-center text-white text-xs font-bold mb-0.5 sm:mb-1">
                    {tech.charAt(0)}
                  </div>
                  <span className="text-xs sm:text-xs md:text-sm text-cyan-200 font-medium text-center px-0.5 group-hover:text-cyan-100 transition-colors duration-300 leading-tight">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Gradient edges */}
            <div className="absolute left-0 top-0 w-2 sm:w-3 md:w-4 lg:w-6 h-full bg-gradient-to-r from-gray-800 via-gray-800/60 to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-2 sm:w-3 md:w-4 lg:w-6 h-full bg-gradient-to-l from-gray-800 via-gray-800/60 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Compact Additional Skills */}
        <div className="fade-in space-y-1 sm:space-y-2 md:space-y-3">
          <div className="text-center">
            <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-200">
              Additional Skills
            </h2>
            <p className="text-gray-500 text-xs hidden md:block">Beyond coding - the skills that make me a complete developer</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5 md:gap-2 max-w-full mx-auto">
            {[
              "RESTful APIs", 
              "Open Source APIs", 
              "GSAP", 
              "Agile Methodologies", 
              "MVC Architecture", 
              "Backend Integration", 
              "UI/UX Design", 
              "Responsive Design"
            ].map((skill, i) => (
              <span
                key={i}
                className="px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-1.5 rounded-md bg-gradient-to-r from-gray-700/50 to-gray-600/40 backdrop-blur-sm text-xs sm:text-xs md:text-sm text-cyan-200 border border-gray-500/30 hover:border-cyan-400/50 hover:from-gray-600/60 hover:to-gray-500/50 hover:text-cyan-100 transition-all duration-200 hover:scale-105 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Compact Buttons */}
        <div className="fade-in flex flex-col sm:flex-row justify-center gap-1.5 sm:gap-2 md:gap-3 mt-1 sm:mt-2 md:mt-3 pb-1 sm:pb-2 md:pb-4">
          <button
            onClick={handleExploreProjects}
            className="group relative px-2 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-lg bg-gradient-to-r from-teal-600 to-blue-600 text-white text-xs sm:text-xs md:text-sm lg:text-base font-medium shadow-lg hover:shadow-teal-500/20 transition-all duration-300 backdrop-blur-sm border border-teal-500/15 overflow-hidden will-change-transform"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <span className="relative flex items-center justify-center gap-1 sm:gap-1.5">
              <span>View My Projects</span>
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 group-hover:scale-105 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </span>
            
            <div className="absolute inset-0 rounded-lg bg-white/10 scale-0 group-hover:scale-100 group-hover:opacity-0 transition-all duration-300 opacity-100"></div>
          </button>
          
          <a
            href="/RODNEY_AUSTRIA_curriculum_vitae_2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-2 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs sm:text-xs md:text-sm lg:text-base font-medium shadow-lg hover:shadow-purple-500/20 transition-all duration-300 backdrop-blur-sm border border-purple-500/15 overflow-hidden will-change-transform"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <span className="relative flex items-center justify-center gap-1 sm:gap-1.5">
              <span>View Resume</span>
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-y-0.5 group-hover:scale-105 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
            
            <div className="absolute inset-0 rounded-lg bg-white/10 scale-0 group-hover:scale-100 group-hover:opacity-0 transition-all duration-300 opacity-100"></div>
          </a>
        </div>
      </div>

      {/* Editor-optimized CSS Animations */}
      <style jsx>{`
        /* Grid pattern optimized for editor viewport */
        .grid-pattern {
          background-image: 
            linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
          width: 100%;
          height: 100%;
          animation: gridMove 18s linear infinite;
          transform: translateZ(0);
        }

        @media (min-width: 640px) {
          .grid-pattern {
            background-size: 25px 25px;
            animation-duration: 16s;
          }
        }

        @media (min-width: 1024px) {
          .grid-pattern {
            background-size: 30px 30px;
            animation-duration: 14s;
          }
        }

        @keyframes gridMove {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(30px, 30px, 0); }
        }

        /* Editor-optimized floating particle animations */
        @keyframes float0 {
          0%, 100% { 
            transform: translate3d(0px, 0px, 0) rotate(0deg); 
            opacity: 0.2;
          }
          25% { 
            transform: translate3d(5px, -6px, 0) rotate(90deg); 
            opacity: 0.35;
          }
          50% { 
            transform: translate3d(10px, 0px, 0) rotate(180deg); 
            opacity: 0.25;
          }
          75% { 
            transform: translate3d(5px, 6px, 0) rotate(270deg); 
            opacity: 0.4;
          }
        }

        @keyframes float1 {
          0%, 100% { 
            transform: translate3d(0px, 0px, 0) rotate(0deg); 
            opacity: 0.25;
          }
          33% { 
            transform: translate3d(-6px, -8px, 0) rotate(120deg); 
            opacity: 0.15;
          }
          66% { 
            transform: translate3d(-12px, 4px, 0) rotate(240deg); 
            opacity: 0.3;
          }
        }

        @keyframes float2 {
          0%, 100% { 
            transform: translate3d(0px, 0px, 0) rotate(0deg); 
            opacity: 0.22;
          }
          50% { 
            transform: translate3d(10px, -10px, 0) rotate(180deg); 
            opacity: 0.32;
          }
        }

        /* Smooth pulse animation for background orbs */
        @keyframes smooth-pulse {
          0%, 100% { 
            transform: translate3d(0, 0, 0) scale(1); 
            opacity: 0.6; 
          }
          50% { 
            transform: translate3d(0, 0, 0) scale(1.02); 
            opacity: 0.4; 
          }
        }

        .smooth-pulse {
          animation: smooth-pulse 5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }

        /* Hardware-accelerated floating particles */
        .floating-particle {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Force hardware acceleration */
        .will-change-transform {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .floating-particle {
            animation-duration: 35s !important;
          }
        }

        /* Tablet optimizations */
        @media (min-width: 641px) and (max-width: 1023px) {
          .floating-particle {
            animation-duration: 28s !important;
          }
        }

        /* Laptop optimizations - accounts for editor tabs [web:207] */
        @media (min-width: 1024px) and (max-width: 1440px) {
          .floating-particle {
            animation-duration: 25s !important;
          }
          
          .smooth-pulse {
            animation-duration: 6s;
          }
        }

        /* Desktop optimizations */
        @media (min-width: 1441px) {
          .floating-particle {
            animation-duration: 22s !important;
          }
          
          .smooth-pulse {
            animation-duration: 4s;
          }
        }

        /* Respect user motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .floating-particle,
          .smooth-pulse,
          .grid-pattern,
          [class*="animate-"] {
            animation: none !important;
          }
          
          .will-change-transform,
          [class*="will-change"] {
            will-change: auto !important;
          }
          
          * {
            transition-duration: 0.01ms !important;
          }
        }

        /* High DPI displays optimization */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .floating-particle {
            transform: translate3d(0, 0, 0) scale(0.5);
          }
        }

        /* Custom breakpoint for extra small screens */
        @media (min-width: 475px) {
          .xs\\:text-2xl { font-size: 1.5rem; }
          .xs\\:text-sm { font-size: 0.875rem; }
          .xs\\:text-base { font-size: 1rem; }
          .xs\\:max-w-sm { max-width: 24rem; }
          .xs\\:flex-row { flex-direction: row; }
          .xs\\:w-7 { width: 1.75rem; }
          .xs\\:h-7 { height: 1.75rem; }
          .xs\\:min-w-\\[70px\\] { min-width: 70px; }
          .xs\\:px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
          .xs\\:px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
          .xs\\:py-2\\.5 { padding-top: 0.625rem; padding-bottom: 0.625rem; }
          .xs\\:w-3\\.5 { width: 0.875rem; }
          .xs\\:h-3\\.5 { height: 0.875rem; }
        }
      `}</style>
    </div>
  );
};

// ================== PROJECTS ==================
const Projects = () => {
  const container = useRef(null);
  const backgroundRef = useRef(null);

  // Initialize floating particles from About component
  useEffect(() => {
    if (!backgroundRef.current) return;

    const createParticles = () => {
      const particleContainer = backgroundRef.current;
      const particleCount = window.innerWidth < 768 ? 10 : 15; // Fewer on mobile
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 3 + 1}px;
          height: ${Math.random() * 3 + 1}px;
          background: ${Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6'};
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          opacity: ${Math.random() * 0.4 + 0.1};
          animation: float${i % 3} ${Math.random() * 25 + 20}s infinite linear;
        `;
        particleContainer.appendChild(particle);
      }
    };

    createParticles();

    // Cleanup
    return () => {
      if (backgroundRef.current) {
        const particles = backgroundRef.current.querySelectorAll('.floating-particle');
        particles.forEach(particle => particle.remove());
      }
    };
  }, []);

  // GSAP animation for project cards
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      window.gsap.fromTo(
        container.current.children,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.2, duration: 0.8, ease: "back.out(1.7)" }
      );
    }
  }, []);

 

  const projects = [
    {
      title: "TyphoGuard 🌊",
      desc: "Tide monitoring tool with geolocation and real-time data.",
      img: "https://via.placeholder.com/250x150.png?text=TyphoGuard",
      tech: ["Laravel", "Leaflet.js", "Tailwind CSS"],
    },
    {
      title: "CodeCraft Studio ⚡",
      desc: "Full-stack development platform with AI integration.",
      img: "https://via.placeholder.com/250x150.png?text=CodeCraft",
      tech: ["React", "Node.js", "MongoDB", "OpenAI"],
    },
    {
      title: "DataViz Pro 📊",
      desc: "Interactive data visualization and analytics dashboard.",
      img: "https://via.placeholder.com/250x150.png?text=DataViz",
      tech: ["Vue.js", "D3.js", "Python", "FastAPI"],
    },
  ];

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Animated Background - Same as About component */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      >
        {/* Gradient Orbs - Same style as About */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full filter blur-2xl sm:blur-3xl animate-pulse">      </div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-full filter blur-2xl sm:blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-to-r from-pink-500/8 to-purple-500/8 rounded-full filter blur-2xl sm:blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Grid Pattern - Same as About */}
        <div className="absolute inset-0 opacity-5 sm:opacity-8 md:opacity-10">
          <div className="grid-pattern"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 sm:p-6 h-full overflow-y-auto">
        {/* Header with glass effect */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-3">
            Projects
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full"></div>
        </div>

        {/* Project Cards */}
        <div ref={container} className="flex flex-wrap gap-6 justify-center max-w-full">
          {projects.map((project, i) => (
            <div
              key={i}
              className="group relative bg-white/5 backdrop-blur-md rounded-xl p-4 w-72 border border-white/10 hover:border-white/20 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform"
            >
              {/* Card glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              
              <div className="relative z-10">
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-200 border border-purple-500/30 hover:border-purple-400/50 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 font-medium text-sm">
                    View Live
                  </button>
                  <button className="flex-1 px-3 py-2 border border-purple-500/50 text-purple-300 rounded-md hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 font-medium text-sm">
                    Source Code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     

      {/* CSS Animations - Same as About component */}
      <style jsx>{`
        .grid-pattern {
          background-image: 
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px);
          background-size: 30px 30px;
          width: 100%;
          height: 100%;
          animation: gridMove 25s linear infinite;
        }

        @media (min-width: 640px) {
          .grid-pattern {
            background-size: 40px 40px;
            animation: gridMove 22s linear infinite;
          }
        }

        @media (min-width: 768px) {
          .grid-pattern {
            background-size: 50px 50px;
            animation: gridMove 20s linear infinite;
          }
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes float0 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-15px) translateX(8px) rotate(90deg); }
          50% { transform: translateY(0px) translateX(15px) rotate(180deg); }
          75% { transform: translateY(15px) translateX(8px) rotate(270deg); }
        }

        @keyframes float1 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-20px) translateX(-10px) rotate(120deg); }
          66% { transform: translateY(10px) translateX(-20px) rotate(240deg); }
        }

        @keyframes float2 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          50% { transform: translateY(-25px) translateX(25px) rotate(180deg); }
        }

        .floating-particle {
          will-change: transform;
        }

        @media (max-width: 640px) {
          .floating-particle {
            animation-duration: 30s !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .floating-particle,
          .grid-pattern {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
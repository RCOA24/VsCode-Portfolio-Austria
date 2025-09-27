// src/data/sections.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

// ================== HOME ==================
export const Home = ({ onNavigateToAbout }) => {
  const container = useRef(null);
  const orbs = useRef([]);
  const icons = useRef([]);
  const backgroundRef = useRef(null);

  useEffect(() => {
    // Create floating particles
    const createParticles = () => {
      const particleContainer = backgroundRef.current;
      if (!particleContainer) return;

      const particleCount = window.innerWidth < 768 ? 8 : 12; // Fewer on mobile
      
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

    // Add delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Fade-in animation for content (excluding the CTA button)
      if (container.current && container.current.children.length > 0) {
        const children = Array.from(container.current.children);
        const ctaButton = children.find(child => child.tagName === 'BUTTON');
        const otherChildren = children.filter(child => child.tagName !== 'BUTTON');
        
        // Animate other children with stagger - using CSS transitions instead of GSAP
        otherChildren.forEach((child, i) => {
          child.style.opacity = '0';
          child.style.transform = 'translateY(40px)';
          child.style.transition = 'all 0.8s ease-out';
          
          setTimeout(() => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          }, i * 200);
        });
        
        // Show CTA button immediately
        if (ctaButton) {
          ctaButton.style.opacity = '1';
          ctaButton.style.transform = 'translateY(0)';
        }
      }

      // Floating animation for background orbs using CSS animations
      const validOrbs = orbs.current.filter(Boolean);
      validOrbs.forEach((orb, i) => {
        if (orb) {
          orb.style.animation = `floatOrb${i} ${6 + i * 2}s ease-in-out infinite alternate`;
        }
      });

      // Floating animation for tech icons
      const validIcons = icons.current.filter(Boolean);
      validIcons.forEach((icon, i) => {
        if (icon) {
          // Initial positioning animation
          icon.style.opacity = '0';
          icon.style.transform = 'scale(0) rotate(-180deg)';
          icon.style.transition = 'all 1s ease-out';
          
          setTimeout(() => {
            icon.style.opacity = '0.8';
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.animation = `floatIcon${i % 4} ${8 + Math.random() * 4}s ease-in-out infinite alternate`;
          }, i * 100);
        }
      });

      // Create particles
      createParticles();
    }, 100);
    
    // Cleanup function
    return () => {
      clearTimeout(timer);
      if (backgroundRef.current) {
        backgroundRef.current.innerHTML = '';
      }
    };
  }, []);

  // Tech stack icons data with real logos - scattered positions
  const techIcons = [
    { 
      name: "HTML5", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", 
      position: { top: "8%", left: "12%" } 
    },
    { 
      name: "CSS3", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", 
      position: { top: "18%", right: "8%" } 
    },
    { 
      name: "Tailwind CSS", 
      logo: "https://img.icons8.com/?size=100&id=x7XMNGh2vdqA&format=png&color=000000", 
      position: { top: "35%", left: "5%" } 
    },
    { 
      name: "JavaScript", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", 
      position: { top: "65%", right: "15%" } 
    },
    { 
      name: "Java", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", 
      position: { top: "12%", left: "78%" } 
    },
    { 
      name: "C#", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", 
      position: { top: "75%", left: "10%" } 
    },
    { 
      name: "React", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", 
      position: { top: "28%", right: "5%" } 
    },
    { 
      name: "PHP", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", 
      position: { top: "45%", left: "88%" } 
    },
    { 
      name: "Laravel", 
      logo: "https://laravel.com/img/logomark.min.svg", 
      position: { top: "85%", right: "25%" } 
    },
    { 
      name: "MySQL", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", 
      position: { top: "5%", right: "35%" } 
    },
    { 
      name: "Git", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", 
      position: { top: "42%", right: "25%" } 
    },
    { 
      name: "Bootstrap", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", 
      position: { top: "15%", left: "45%" } 
    },
  ];

  const handleExploreProjects = () => {
    if (onNavigateToAbout) {
      onNavigateToAbout();
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Animated Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      >
        {/* Enhanced Gradient Orbs */}
        <div className="absolute top-1/6 left-1/6 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full filter blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/6 right-1/6 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-full filter blur-2xl sm:blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-to-r from-pink-500/8 to-purple-500/8 rounded-full filter blur-2xl sm:blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5 sm:opacity-8 md:opacity-10">
          <div className="grid-pattern"></div>
        </div>

        {/* Original animated orbs - now with enhanced styling */}
        <div
          ref={(el) => (orbs.current[0] = el)}
          className="absolute w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-blue-500/15 rounded-full blur-3xl top-10 left-10 backdrop-blur-sm"
        ></div>
        <div
          ref={(el) => (orbs.current[1] = el)}
          className="absolute w-[120px] h-[120px] md:w-[180px] md:h-[180px] bg-purple-500/15 rounded-full blur-3xl bottom-20 right-10 backdrop-blur-sm"
        ></div>
        <div
          ref={(el) => (orbs.current[2] = el)}
          className="absolute w-[100px] h-[100px] md:w-[150px] md:h-[150px] bg-teal-400/15 rounded-full blur-3xl bottom-10 left-1/2 transform -translate-x-1/2 backdrop-blur-sm"
        ></div>
      </div>

      {/* Floating Tech Icons - enhanced with backdrop blur */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {techIcons.map((tech, index) => (
          <div
            key={tech.name}
            ref={(el) => (icons.current[index] = el)}
            className="absolute opacity-0 select-none will-change-transform"
            style={{
              top: tech.position.top,
              left: tech.position.left,
              right: tech.position.right,
            }}
            title={tech.name}
          >
            <div className="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 backdrop-blur-sm bg-gray-800/20 rounded-lg border border-gray-600/30">
              <img 
                src={tech.logo} 
                alt={tech.name}
                className="w-4/5 h-4/5 object-contain filter drop-shadow-lg"
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.2))'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 z-20">
        <div ref={container} className="space-y-4 sm:space-y-6 max-w-3xl relative my-auto">
          {/* Developer GIF */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="backdrop-blur-sm bg-gray-800/20 p-3 sm:p-4 rounded-xl border border-gray-600/30">
              <img
                src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnl4Nm9xcW1ydHdmbXY0aHQ3eTczYjYyMmQ5cXdkNmZ0eXk4c3o0MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUA7bdpLxQhsSQdyog/giphy.gif"
                alt="Developer Animation"
                className="w-32 sm:w-40 md:w-48 lg:w-56 drop-shadow-xl rounded-lg"
              />
            </div>
          </div>
          
          {/* Name */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-400 to-purple-500 drop-shadow-lg">
            Rodney Charles O. Austria
          </h1>
          
          {/* Role */}
          <p className="text-gray-300 text-sm sm:text-base md:text-lg backdrop-blur-sm bg-gray-800/20 px-4 py-2 rounded-lg inline-block border border-gray-600/30">
            <span className="font-semibold text-purple-400">Web Developer</span>
          </p>
          
          {/* Tagline */}
          <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-md mx-auto leading-relaxed backdrop-blur-sm bg-gray-800/15 p-3 sm:p-4 rounded-lg border border-gray-600/30">
            I create <span className="text-teal-400 font-medium">solutions</span> for
            real-world problems with clean code and modern design.
          </p>
          
          {/* CTA Button */}
          <button 
            onClick={handleExploreProjects}
            className="mt-6 sm:mt-8 inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm sm:text-base font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer group backdrop-blur-sm border border-blue-500/20"
          >
            <svg 
              className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Learn More About Me</span>
          </button>
        </div>
      </div>

      {/* CSS Animations */}
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

        /* Orb animations */
        @keyframes floatOrb0 {
          0% { transform: translateY(0px) translateX(0px); }
          100% { transform: translateY(-40px) translateX(30px); }
        }

        @keyframes floatOrb1 {
          0% { transform: translateY(0px) translateX(0px); }
          100% { transform: translateY(-30px) translateX(-40px); }
        }

        @keyframes floatOrb2 {
          0% { transform: translateY(0px) translateX(0px); }
          100% { transform: translateY(20px) translateX(20px); }
        }

        /* Icon animations */
        @keyframes floatIcon0 {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg) scale(1); }
          100% { transform: translateY(-20px) translateX(10px) rotate(10deg) scale(1.05); }
        }

        @keyframes floatIcon1 {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg) scale(1); }
          100% { transform: translateY(15px) translateX(-15px) rotate(-8deg) scale(1.03); }
        }

        @keyframes floatIcon2 {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg) scale(1); }
          100% { transform: translateY(-25px) translateX(20px) rotate(12deg) scale(1.04); }
        }

        @keyframes floatIcon3 {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg) scale(1); }
          100% { transform: translateY(10px) translateX(-5px) rotate(-5deg) scale(1.02); }
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
          .grid-pattern,
          [class^="floatOrb"],
          [class^="floatIcon"] {
            animation: none !important;
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

  const handleExploreProjects = () => {
    if (onNavigateToProjects) onNavigateToProjects();
  };

  useEffect(() => {
    if (!container.current) return;

    // Create floating particles (reduced for mobile)
    const createParticles = () => {
      const particleContainer = backgroundRef.current;
      if (!particleContainer) return;

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

    // Fade-in animation
    const elements = container.current.querySelectorAll(".fade-in");
    elements.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'all 0.6s ease-out';
      
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 100);
    });

    // Auto-scrolling tech icons
    if (techWrapper.current) {
      const totalWidth = techWrapper.current.scrollWidth / 2;
      let currentX = 0;
      
      const animate = () => {
        currentX -= 0.3; // Slower scroll speed
        if (Math.abs(currentX) >= totalWidth) {
          currentX = 0;
        }
        techWrapper.current.style.transform = `translateX(${currentX}px)`;
        requestAnimationFrame(animate);
      };
      
      animate();
    }

    createParticles();

    // Cleanup
    return () => {
      if (backgroundRef.current) {
        backgroundRef.current.innerHTML = '';
      }
    };
  }, []);

  // Duplicate icons for seamless looping
  const techArray = [...Object.entries(techIcons), ...Object.entries(techIcons)];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-y-hidden">
      {/* Animated Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      >
        {/* Gradient Orbs - Smaller and responsive */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full filter blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-full filter blur-2xl sm:blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-to-r from-pink-500/8 to-purple-500/8 rounded-full filter blur-2xl sm:blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5 sm:opacity-8 md:opacity-10">
          <div className="grid-pattern"></div>
        </div>
      </div>

      {/* Content */}
      <div ref={container} className="space-y-3 sm:space-y-4 md:space-y-6 max-w-4xl relative z-20 my-auto w-full">
        {/* Heading */}
        <h1 className="fade-in text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-400 pt-2 sm:pt-4">
          About Me
        </h1>

        {/* Description */}
        <p className="fade-in text-gray-300 leading-relaxed text-xs sm:text-sm md:text-base max-w-xs sm:max-w-md md:max-w-2xl mx-auto backdrop-blur-sm bg-gray-800/15 p-3 sm:p-4 rounded-lg border border-gray-700/40">
          Hi, I'm <span className="font-semibold text-teal-400">Rodney Austria</span>, a{" "}
          <span className="text-purple-400">Full-Stack Developer</span> with a passion for crafting{" "}
          <span className="text-pink-400">modern, responsive</span> web apps. I enjoy turning ideas into{" "}
          <span className="text-blue-300">interactive experiences</span> that blend clean UI, seamless UX, and solid code architecture.
        </p>

        {/* Tech Stack Section */}
        <div className="fade-in space-y-2 sm:space-y-3 md:space-y-4">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-200">
            Technologies & Tools
          </h2>
          
          {/* Tech Stack Auto Scroll */}
          <div className="overflow-hidden relative py-2 sm:py-3 md:py-4 lg:py-6 backdrop-blur-sm bg-gray-800/8 rounded-lg sm:rounded-xl border border-gray-700/25">
            <div
              ref={techWrapper}
              className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 justify-start"
              style={{ width: "max-content" }}
            >
              {techArray.map(([tech, iconUrl], i) => (
                <div
                  key={i}
                  className="flex flex-col items-center p-2 sm:p-3 md:p-4 bg-gray-800/30 backdrop-blur-sm rounded-md sm:rounded-lg border border-gray-600/40 hover:border-cyan-400 hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 min-w-[60px] xs:min-w-[70px] sm:min-w-[80px] md:min-w-[90px] group"
                >
                  <img
                    src={iconUrl}
                    alt={tech}
                    className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 mb-1 sm:mb-2 object-contain group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded items-center justify-center text-white text-xs font-bold mb-1 sm:mb-2">
                    {tech.charAt(0)}
                  </div>
                  <span className="text-xs sm:text-sm md:text-sm lg:text-base text-cyan-200 font-medium text-center px-1">{tech}</span>
                </div>
              ))}
            </div>
            
            {/* Gradient edges */}
            <div className="absolute left-0 top-0 w-4 sm:w-6 md:w-8 lg:w-12 h-full bg-gradient-to-r from-gray-800 to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-4 sm:w-6 md:w-8 lg:w-12 h-full bg-gradient-to-l from-gray-800 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Additional Skills */}
        <div className="fade-in space-y-2 sm:space-y-3 md:space-y-4">
          <h2 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-200">
            Additional Skills
          </h2>
          
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto">
            {["RESTful APIs", "Open Source APIs", "GSAP", "Agile Methodologies", "MVC Architecture", "Backend Integration", "UI/UX Design", "Responsive Design",].map(
              (skill, i) => (
                <span
                  key={i}
                  className="px-2 xs:px-3 sm:px-4 py-1 sm:py-1.5 md:py-2 rounded-md sm:rounded-lg bg-gradient-to-r from-gray-700/50 to-gray-600/50 backdrop-blur-sm text-xs sm:text-sm md:text-base text-cyan-200 border border-gray-500/40 hover:border-cyan-400 hover:from-gray-600/70 hover:to-gray-500/70 transition-all duration-200 hover:scale-105"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="fade-in flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 mt-3 sm:mt-4 pb-4 sm:pb-6">
          <button
            onClick={handleExploreProjects}
            className="group px-4 xs:px-5 sm:px-6 md:px-8 py-2 xs:py-2.5 sm:py-3 md:py-3.5 rounded-lg bg-gradient-to-r from-teal-600 to-blue-600 text-white text-xs xs:text-sm sm:text-base font-medium shadow-lg sm:shadow-xl md:shadow-2xl hover:shadow-teal-500/20 hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-teal-500/15"
          >
            <span className="flex items-center justify-center gap-1.5 sm:gap-2">
              View My Projects
              <svg className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </span>
          </button>
          <a
            href="/RODNEY_AUSTRIA_curriculum_vitae 2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-4 xs:px-5 sm:px-6 md:px-8 py-2 xs:py-2.5 sm:py-3 md:py-3.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs xs:text-sm sm:text-base font-medium shadow-lg sm:shadow-xl md:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-purple-500/15"
          >
            <span className="flex items-center justify-center gap-1.5 sm:gap-2">
              View Resume
              <svg className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* CSS Animations */}
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
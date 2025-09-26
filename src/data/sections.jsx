import { useEffect, useRef, useState } from "react";

export const Home = () => {
  const container = useRef(null);
  const textRef = useRef(null);
  const [currentRole, setCurrentRole] = useState(0);
  
  const roles = ["Web Developer", "Problem Solver", "Code Architect", "Digital Creator"];

  useEffect(() => {
    // Keep your original GSAP-style animation approach
    if (container.current?.children) {
      Array.from(container.current.children).forEach((element, index) => {
        element.style.transform = "translateY(40px)";
        element.style.opacity = "0";
        element.style.animation = `slideUp 0.8s ease-out ${index * 0.2}s forwards`;
      });
    }

    // Rotating roles animation
    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(roleInterval);
  }, []);

  useEffect(() => {
    // Animate role change
    if (textRef.current) {
      textRef.current.style.animation = "none";
      setTimeout(() => {
        textRef.current.style.animation = "fadeInScale 0.6s ease-out";
      }, 50);
    }
  }, [currentRole]);

  return (
    <div ref={container} className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900/50 via-gray-800/50 to-gray-900/50">
      <style>{`
        @keyframes slideUp {
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 35px rgba(59, 130, 246, 0.5); }
        }
        
        .floating { animation: float 5s ease-in-out infinite; }
        .glow-pulse { animation: glow 3s ease-in-out infinite; }
        .text-glow { text-shadow: 0 0 20px rgba(59, 130, 246, 0.6); }
        
        .gradient-border {
          background: linear-gradient(135deg, #1a1a2e, #16213e);
          border-radius: 1rem;
          padding: 3px;
          position: relative;
        }
        
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 3px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4, #10b981);
          border-radius: inherit;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          opacity: 0.9;
        }
        
        .glassmorphism {
          background: rgba(30, 30, 30, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        /* Mobile-first responsive design */
        .home-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: -0.5rem;
          padding: 1rem;
        }
        
        /* Responsive adjustments */
        @media (min-width: 640px) {
          .home-container {
            margin: -1rem;
            padding: 1.25rem;
          }
        }
        
        @media (min-width: 1024px) {
          .home-container {
            margin: -1.5rem;
            padding: 1.5rem;
          }
        }

        /* Mobile text scaling */
        @media (max-width: 390px) {
          .mobile-text-xs { font-size: 0.7rem; }
          .mobile-text-sm { font-size: 0.8rem; }
          .mobile-text-base { font-size: 0.9rem; }
          .mobile-text-lg { font-size: 1rem; }
          .mobile-text-xl { font-size: 1.1rem; }
          .mobile-text-2xl { font-size: 1.3rem; }
        }
        
        /* Enhanced mobile interactions */
        @media (max-width: 768px) {
          .mobile-touch-target {
            min-height: 44px;
            min-width: 44px;
          }
          
          .mobile-spacing {
            margin: 0.75rem 0;
          }
        }
      `}</style>
      
      {/* Full-page background overlay */}
      <div className="home-container">
        {/* Background Effects - Responsive sizes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Mobile: Smaller, fewer background elements */}
          <div className="absolute top-4 right-4 sm:top-8 lg:top-12 sm:right-8 lg:right-12 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 bg-blue-500/10 rounded-full blur-xl sm:blur-2xl lg:blur-3xl floating"></div>
          <div className="absolute bottom-4 left-4 sm:bottom-8 lg:bottom-12 sm:left-8 lg:left-12 w-20 sm:w-28 lg:w-36 h-20 sm:h-28 lg:h-36 bg-purple-500/10 rounded-full blur-xl sm:blur-2xl lg:blur-3xl floating" style={{animationDelay: '-2s'}}></div>
          <div className="hidden sm:block absolute top-1/2 left-1/3 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-teal-500/10 rounded-full blur-xl sm:blur-2xl floating" style={{animationDelay: '-3s'}}></div>
          <div className="hidden lg:block absolute top-1/4 right-1/4 w-20 h-20 bg-green-500/10 rounded-full blur-2xl floating" style={{animationDelay: '-4s'}}></div>
        </div>

        {/* Main Content - Fully responsive */}
        <div className="relative z-10 h-full flex items-center justify-center py-4 sm:py-6 lg:py-8">
          <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-center h-full">
              
              {/* Image Section - Mobile first, desktop second */}
              <div className="flex justify-center order-1 lg:order-2 mb-4 lg:mb-0">
                <div className="relative group w-full max-w-[280px] xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-teal-500/20 to-purple-500/20 rounded-xl sm:rounded-2xl blur-xl sm:blur-2xl group-hover:blur-lg sm:group-hover:blur-xl transition-all duration-300"></div>
                  
                  <div className="relative glassmorphism rounded-xl sm:rounded-2xl p-2 sm:p-3 lg:p-4 xl:p-6 transition-transform hover:scale-105 hover:-translate-y-2 duration-300">
                    <img
                      src="https://i.pinimg.com/originals/81/17/8b/81178b47a8598f0c81c4799f2cdd4057.gif"
                      alt="Young Developer Animation"
                      className="w-full h-auto rounded-lg sm:rounded-xl shadow-2xl"
                      style={{ 
                        maxHeight: '240px', 
                        minHeight: '160px',
                        objectFit: 'cover'
                      }}
                      loading="lazy"
                    />
                    
                    {/* Floating Tech Badges - Responsive positioning and sizing */}
                    <div className="absolute -top-2 -left-2 sm:-top-3 lg:-top-4 sm:-left-3 lg:-left-4 glassmorphism rounded-md sm:rounded-lg px-1.5 py-1 sm:px-2 lg:px-3 sm:py-1.5 lg:py-2 text-xs sm:text-sm text-green-400 font-mono floating shadow-lg sm:shadow-xl mobile-touch-target">
                      <span className="text-glow font-bold">React</span>
                    </div>
                    <div className="absolute -top-2 -right-2 sm:-top-3 lg:-top-4 sm:-right-3 lg:-right-4 glassmorphism rounded-md sm:rounded-lg px-1.5 py-1 sm:px-2 lg:px-3 sm:py-1.5 lg:py-2 text-xs sm:text-sm text-blue-400 font-mono floating shadow-lg sm:shadow-xl mobile-touch-target" style={{animationDelay: '-1s'}}>
                      <span className="text-glow font-bold">JS</span>
                    </div>
                    <div className="absolute -bottom-2 -left-2 sm:-bottom-3 lg:-bottom-4 sm:-left-3 lg:-left-4 glassmorphism rounded-md sm:rounded-lg px-1.5 py-1 sm:px-2 lg:px-3 sm:py-1.5 lg:py-2 text-xs sm:text-sm text-purple-400 font-mono floating shadow-lg sm:shadow-xl mobile-touch-target" style={{animationDelay: '-2s'}}>
                      <span className="text-glow font-bold">CSS</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 sm:-bottom-3 lg:-bottom-4 sm:-right-3 lg:-right-4 glassmorphism rounded-md sm:rounded-lg px-1.5 py-1 sm:px-2 lg:px-3 sm:py-1.5 lg:py-2 text-xs sm:text-sm text-teal-400 font-mono floating shadow-lg sm:shadow-xl mobile-touch-target" style={{animationDelay: '-3s'}}>
                      <span className="text-glow font-bold">Node</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section - Mobile optimized */}
              <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-center lg:text-left order-2 lg:order-1 px-2 sm:px-0">
                {/* Greeting */}
                <div className="space-y-1 sm:space-y-2 lg:space-y-3">
                  <div className="inline-block">
                    <span className="text-xs sm:text-sm text-gray-400 font-mono tracking-wider uppercase mobile-text-xs">
                      Hello World, I'm
                    </span>
                  </div>
                  <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mobile-text-2xl">
                    <span className="text-gray-100">Rodney</span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-400 to-purple-500 text-glow">
                      Charles
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-400 font-light tracking-wide mobile-text-sm">
                    Full Stack Developer 
                  </p>
                </div>

                {/* Dynamic Role */}
                <div className="flex justify-center lg:justify-start mobile-spacing">
                  <div className="gradient-border glow-pulse transition-transform hover:scale-105 shadow-lg sm:shadow-xl mobile-touch-target">
                    <div className="glassmorphism rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 lg:px-6 sm:py-2.5 lg:py-3">
                      <div className="flex items-center gap-2 lg:gap-3">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                        <h2 
                          ref={textRef}
                          className="text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 mobile-text-base"
                        >
                          {roles[currentRole]}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pitch */}
                <div className="space-y-2 sm:space-y-3 mobile-spacing">
                  <p className="text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-300 leading-relaxed mobile-text-base">
                    I craft 
                    <span className="text-blue-400 font-semibold text-glow"> digital experiences </span>
                    that solve
                  </p>
                  <p className="text-lg xs:text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-purple-500 leading-tight mobile-text-xl">
                    real-world problems
                  </p>
                  <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-gray-400 max-w-2xl lg:mx-0 mx-auto leading-relaxed px-2 sm:px-4 lg:px-0 mobile-text-sm">
                    Transforming complex challenges into elegant solutions through 
                    <span className="text-teal-400 font-semibold"> clean code</span>, 
                    <span className="text-blue-400 font-semibold"> modern design</span>, and 
                    <span className="text-purple-400 font-semibold"> innovative thinking</span>.
                  </p>
                </div>

                {/* Buttons - Enhanced mobile interaction */}
                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start pt-3 sm:pt-4 lg:pt-6 px-2 sm:px-4 lg:px-0 mobile-spacing">
                  <button className="group relative px-4 sm:px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 rounded-lg sm:rounded-xl font-bold text-white shadow-xl sm:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 overflow-hidden mobile-touch-target">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-teal-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center justify-center gap-2 lg:gap-3 text-sm sm:text-base lg:text-lg mobile-text-base">
                      <span>Explore My Work</span>
                      <span className="text-base sm:text-lg lg:text-xl group-hover:translate-x-1 transition-transform duration-300">🚀</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Code Elements - Responsive positioning */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 opacity-30 floating">
          <div className="glassmorphism rounded-md sm:rounded-lg px-2 py-1 sm:px-3 sm:py-2 text-xs text-green-400 font-mono shadow-lg sm:shadow-xl mobile-touch-target">
            <span className="text-glow font-bold">&lt;developer/&gt;</span>
          </div>
        </div>
        
        <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 opacity-30 floating" style={{animationDelay: '-2s'}}>
          <div className="glassmorphism rounded-md sm:rounded-lg px-2 py-1 sm:px-3 sm:py-2 text-xs text-blue-400 font-mono shadow-lg sm:shadow-xl mobile-touch-target">
            <span className="text-glow font-bold">{`{ code: "life" }`}</span>
          </div>
        </div>

        <div className="hidden sm:block absolute top-1/4 left-2 sm:left-4 opacity-20 floating" style={{animationDelay: '-4s'}}>
          <div className="glassmorphism rounded-md sm:rounded-lg px-2 py-1 sm:px-3 sm:py-2 text-xs text-purple-400 font-mono shadow-lg mobile-touch-target">
            <span className="text-glow font-bold">npm start</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ================== ABOUT ==================
export const About = () => {
  const container = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      container.current.children,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={container} className="max-w-3xl mx-auto text-center space-y-6 p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-400">About Me</h1>
      <p className="text-gray-300 leading-relaxed text-lg">
        I’m <span className="font-semibold text-teal-400">Rodney Austria</span>, a{" "}
        <span className="text-purple-400">Full-Stack Developer</span> passionate about building
        responsive, modern web apps with clean UI/UX and seamless integrations.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <span className="px-4 py-2 rounded-lg bg-[#252526] text-blue-300">React</span>
        <span className="px-4 py-2 rounded-lg bg-[#252526] text-teal-300">Laravel</span>
        <span className="px-4 py-2 rounded-lg bg-[#252526] text-purple-300">Tailwind CSS</span>
        <span className="px-4 py-2 rounded-lg bg-[#252526] text-pink-300">APIs</span>
      </div>
    </div>
  );
};

// ================== PROJECTS ==================
export const Projects = () => {
  const container = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      container.current.children,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, stagger: 0.2, duration: 0.8, ease: "back.out(1.7)" }
    );
  }, []);

  const projects = [
    {
      title: "TyphoGuard 🌊",
      desc: "Tide monitoring tool with geolocation and real-time data.",
      img: "https://via.placeholder.com/250x150.png?text=TyphoGuard",
      tech: ["Laravel", "Leaflet.js", "Tailwind CSS"],
    },
    {
      title: "CRM System 🗂️",
      desc: "Team-built CRM with Laravel & Blade. Responsive and API-integrated.",
      img: "https://via.placeholder.com/250x150.png?text=CRM",
      tech: ["Laravel", "Blade", "REST API"],
    },
    {
      title: "Portfolio 🚀",
      desc: "VS Code-inspired portfolio using React & Tailwind.",
      img: "https://via.placeholder.com/250x150.png?text=Portfolio",
      tech: ["React", "Tailwind", "GSAP"],
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-purple-400 mb-8">Projects</h1>
      <div ref={container} className="flex flex-wrap gap-6 justify-center">
        {projects.map((p, i) => (
          <div
            key={i}
            className="bg-[#252526] rounded-xl p-4 w-72 hover:scale-105 hover:shadow-xl transition transform"
          >
            <img src={p.img} alt={p.title} className="rounded-lg mb-3" />
            <h3 className="text-xl font-semibold text-blue-400">{p.title}</h3>
            <p className="text-gray-400 text-sm mb-3">{p.desc}</p>
            <div className="flex flex-wrap gap-2">
              {p.tech.map((t, i) => (
                <span key={i} className="px-2 py-1 text-xs rounded-md bg-[#1e1e1e] text-gray-300">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

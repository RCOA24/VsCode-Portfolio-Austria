// src/data/sections.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

// ================== HOME ==================
export const Home = ({ onNavigateToAbout }) => {
  const container = useRef(null);
  const orbs = useRef([]);
  const icons = useRef([]);

  useEffect(() => {
    // Add delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Fade-in animation for content (excluding the CTA button)
      if (container.current && container.current.children.length > 0) {
        const children = Array.from(container.current.children);
        const ctaButton = children.find(child => child.tagName === 'BUTTON');
        const otherChildren = children.filter(child => child.tagName !== 'BUTTON');
        
        // Animate other children with stagger
        gsap.fromTo(
          otherChildren,
          { y: 40, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            stagger: 0.2, 
            duration: 0.8, 
            ease: "power3.out"
          }
        );
        
        // Show CTA button immediately without animation
        if (ctaButton) {
          gsap.set(ctaButton, { opacity: 1, y: 0 });
        }
      }

      // Floating animation for background orbs
      const validOrbs = orbs.current.filter(Boolean);
      validOrbs.forEach((orb, i) => {
        if (orb) {
          gsap.to(orb, {
            y: "+=40",
            x: i % 2 === 0 ? "+=30" : "-=30",
            duration: 6 + i,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      });

      // Floating animation for tech icons
      const validIcons = icons.current.filter(Boolean);
      validIcons.forEach((icon, i) => {
        if (icon) {
          // Initial positioning animation
          gsap.fromTo(
            icon,
            { 
              opacity: 0, 
              scale: 0,
              rotation: -180 
            },
            { 
              opacity: 0.8, 
              scale: 1,
              rotation: 0,
              duration: 1,
              delay: i * 0.1,
              ease: "back.out(1.7)"
            }
          );

          // Continuous floating animation
          gsap.to(icon, {
            y: `+=${Math.random() * 60 + 20}`,
            x: `+=${Math.random() * 40 - 20}`,
            rotation: `+=${Math.random() * 360}`,
            duration: 8 + Math.random() * 4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: Math.random() * 2,
          });

          // Subtle pulsing effect
          gsap.to(icon, {
            scale: 1.1,
            duration: 3 + Math.random() * 2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: Math.random() * 3,
          });
        }
      });
    }, 100);
    
    return () => clearTimeout(timer);
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
    <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Animated gradient orbs background - positioned relative to this container */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={(el) => (orbs.current[0] = el)}
          className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-blue-500/20 rounded-full blur-3xl top-10 left-10"
        ></div>
        <div
          ref={(el) => (orbs.current[1] = el)}
          className="absolute w-[150px] h-[150px] md:w-[250px] md:h-[250px] bg-purple-500/20 rounded-full blur-3xl bottom-20 right-10"
        ></div>
        <div
          ref={(el) => (orbs.current[2] = el)}
          className="absolute w-[120px] h-[120px] md:w-[200px] md:h-[200px] bg-teal-400/20 rounded-full blur-3xl bottom-10 left-1/2 transform -translate-x-1/2"
        ></div>
      </div>

      {/* Floating Tech Icons - higher z-index */}
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
            <div className="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
              <img 
                src={tech.logo} 
                alt={tech.name}
                className="w-full h-full object-contain filter drop-shadow-lg"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div ref={container} className="space-y-6 max-w-3xl relative z-20 my-auto">
        {/* Developer GIF */}
        <div className="flex justify-center mb-6">
          <img
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnl4Nm9xcW1ydHdmbXY0aHQ3eTczYjYyMmQ5cXdkNmZ0eXk4c3o0MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUA7bdpLxQhsSQdyog/giphy.gif"
            alt="Developer Animation"
            className="w-40 md:w-56 lg:w-64 drop-shadow-xl rounded-lg"
          />
        </div>
        
        {/* Name */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-400 to-purple-500">
          Rodney Charles O. Austria
        </h1>
        
        {/* Role */}
        <p className="text-gray-300 text-base md:text-lg lg:text-xl">
          <span className="font-semibold text-purple-400">Web Developer</span>
        </p>
        
        {/* Tagline */}
        <p className="text-gray-400 text-sm md:text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
          I create <span className="text-teal-400 font-medium">solutions</span> for
          real-world problems with clean code and modern design.
        </p>
        
        {/* CTA Button */}
        <button 
          onClick={handleExploreProjects}
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-75 cursor-pointer group"
        >
          <svg 
            className="w-4 h-4 transition-transform duration-75 group-hover:scale-110" 
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
  );
};

// ================== ABOUT ==================
export const About = ({ onNavigateToProjects }) => {
  const container = useRef(null);
  
  const handleExploreProjects = () => {
    if (onNavigateToProjects) {
      onNavigateToProjects();
    }
  };

  useEffect(() => {
    if (container.current && container.current.children.length > 0) {
      const children = Array.from(container.current.children);
      const ctaButton = children.find(child => child.tagName === 'BUTTON');
      const otherChildren = children.filter(child => child.tagName !== 'BUTTON');
      
      // Animate other children with stagger
      gsap.fromTo(
        otherChildren,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power2.out" }
      );
      
      // Show CTA button immediately without animation
      if (ctaButton) {
        gsap.set(ctaButton, { opacity: 1, x: 0 });
      }
    }
  }, []);

  return (
    <div ref={container} className="max-w-3xl mx-auto text-center space-y-6 p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-400">About Me</h1>
      <p className="text-gray-300 leading-relaxed text-lg">
        I'm <span className="font-semibold text-teal-400">Rodney Austria</span>, a{" "}
        <span className="text-purple-400">Full-Stack Developer</span> passionate about building
        responsive, modern web apps with clean UI/UX and seamless integrations.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <span className="px-4 py-2 rounded-lg bg-[#252526] text-blue-300">React</span>
        <span className="px-4 py-2 rounded-lg bg-[#252526] text-teal-300">Laravel</span>
        <span className="px-4 py-2 rounded-lg bg-[#252526] text-purple-300">Tailwind CSS</span>
        <span className="px-4 py-2 rounded-lg bg-[#252526] text-pink-300">APIs</span>
      </div>
      
      {/* CTA Button */}
      <button 
        onClick={handleExploreProjects}
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-teal-600 to-blue-600 text-white font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-75 cursor-pointer group"
      >
        <span>View My Projects</span>
        <svg 
          className="w-4 h-4 transition-transform duration-75 group-hover:translate-x-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </button>
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
import { useState, useEffect, useRef } from "react";
import Silk from "./Silk";

export default function Intro({ onComplete }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const codeWindowRef = useRef(null);
  const terminalRef = useRef(null);
  
  const [currentStage, setCurrentStage] = useState('combined');
  const [showVSCode, setShowVSCode] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const message = "Hello! I'm Rodney, a Full-Stack Developer.";

  // Track screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Combined React Bits + Typewriter stage
  useEffect(() => {
    if (!textRef.current || currentStage !== 'combined') return;
    
    let currentIndex = 0;
    const cursorInterval = setInterval(() => {
      if (cursorRef.current)
        cursorRef.current.style.opacity =
          cursorRef.current.style.opacity === "0" ? "1" : "0";
    }, 530);

    const typeText = () => {
      if (currentIndex < message.length) {
        textRef.current.textContent = message.substring(0, currentIndex + 1);
        currentIndex++;
        let delay = 80;
        if (".!".includes(message[currentIndex - 1])) delay = 300;
        if (message[currentIndex - 1] === " ") delay = 60;
        setTimeout(typeText, delay);
      } else {
        clearInterval(cursorInterval);
        if (cursorRef.current) cursorRef.current.style.opacity = "0";

        setTimeout(() => {
          setCurrentStage('fadeout');
        }, 1000);
      }
    };

    setTimeout(typeText, 2000);
    return () => clearInterval(cursorInterval);
  }, [message, currentStage]);

  // Fade out stage
  useEffect(() => {
    if (currentStage !== 'fadeout') return;

    if (textRef.current) {
      textRef.current.style.transition = "opacity 1.5s ease";
      textRef.current.style.opacity = "0";
    }

    setTimeout(() => {
      const combinedStage = document.querySelector('.combined-stage');
      if (combinedStage) {
        combinedStage.style.transition = "opacity 2s ease";
        combinedStage.style.opacity = "0";
      }

      setTimeout(() => {
        setCurrentStage('vscode');
        setShowVSCode(true);
      }, 2000);
    }, 1500);
  }, [currentStage]);

  // VS Code GSAP Animation with responsive handling
  useEffect(() => {
    if (currentStage !== 'vscode') return;

    const vscodeStage = document.querySelector('.vscode-stage');
    if (vscodeStage) {
      vscodeStage.style.opacity = '0';
      setTimeout(() => {
        vscodeStage.style.transition = 'opacity 1.5s ease-in';
        vscodeStage.style.opacity = '1';
      }, 100);
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => {
      startVSCodeAnimation();
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [currentStage, screenSize]);

  const startVSCodeAnimation = () => {
    const { gsap } = window;
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          setCurrentStage('complete');
          if (onComplete) onComplete();
        }, 2000);
      }
    });

    gsap.set(".code-window", { scale: 1, opacity: 1, rotationY: 0 });
    gsap.set(".window-control", { scale: 1, opacity: 1 });
    gsap.set(".tab", { x: 0, opacity: 1 });
    gsap.set(".code-line", { x: 0, opacity: 1 });
    gsap.set(".terminal-line", { opacity: 1, y: 0 });
    gsap.set(".logo-container", { scale: 1, opacity: 1 });

    tl.to(".code-window", {
      boxShadow: "0 0 50px rgba(0, 122, 255, 0.3)",
      duration: 0.8,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1
    });
  };

  if (currentStage === 'complete') return null;

  const isMobile = screenSize < 768;
  const isTablet = screenSize >= 768 && screenSize < 1024;
  const isSmallMobile = screenSize < 480;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden"
      style={{
          height: 'calc(var(--vh, 1vh) * 100)'
        }}
    >
      {/* Stage 1: Combined React Bits + Typewriter */}
      {(currentStage === 'combined' || currentStage === 'fadeout') && (
        <div className="combined-stage absolute inset-0">
          <Silk
            speed={5}
            scale={1}
            color="#47487dba"
            noiseIntensity={1.5}
            rotation={0}
          />

          {/* Responsive Typewriter Text */}
          <div className="absolute z-10 inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8">
            <h1 className={`text-white font-bold font-mono tracking-wider drop-shadow-2xl inline-block text-center leading-tight ${
              isSmallMobile ? 'text-lg' : 
              isMobile ? 'text-xl' : 
              isTablet ? 'text-2xl md:text-3xl' : 
              'text-2xl md:text-3xl lg:text-4xl xl:text-5xl'
            }`}>
              <span
                ref={textRef}
                style={{ textShadow: "0 0 20px rgba(180,220,255,0.4)" }}
              />
              <span
                ref={cursorRef}
                className="text-white font-mono"
                style={{ textShadow: "0 0 20px rgba(200,240,255,0.9)" }}
              >
                |
              </span>
            </h1>
          </div>

          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-40 pointer-events-none" />
        </div>
      )}

      {/* Stage 3: Responsive VS Code Animation */}
      {currentStage === 'vscode' && showVSCode && (
        <div className="vscode-stage absolute inset-0 bg-gray-900 opacity-0">
          {/* Responsive background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: isMobile ? 15 : 30 }, (_, i) => (
              <div
                key={i}
                className={`absolute rounded-full opacity-10 animate-pulse ${
                  isMobile ? 'w-0.5 h-0.5' : 'w-1 h-1'
                } bg-blue-400`}
                style={{
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animationDelay: Math.random() * 3 + 's',
                  animationDuration: (2 + Math.random() * 3) + 's'
                }}
              />
            ))}
          </div>

          <div className={`relative z-10 w-full mx-auto flex items-center justify-center min-h-screen ${
            isMobile ? 'px-2' : isTablet ? 'px-4 max-w-4xl' : 'px-4 max-w-6xl'
          }`}>
            <div className="w-full">
              {/* Responsive Logo */}
              <div className="logo-container flex items-center justify-center mb-4 md:mb-8 opacity-100">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg"
                  alt="VS Code Logo"
                  className={`mb-2 md:mb-4 ${
                    isSmallMobile ? 'w-12 h-12' :
                    isMobile ? 'w-16 h-16' :
                    isTablet ? 'w-18 h-18' : 'w-20 h-20'
                  }`}
                />
              </div>

              {/* Responsive VS Code Window */}
              <div 
                ref={codeWindowRef}
                className="code-window bg-gray-800 rounded-lg shadow-2xl overflow-hidden opacity-100 scale-100"
              >
                {/* Responsive Window Header */}
                <div className={`window-header bg-gray-700 flex items-center px-2 sm:px-4 ${
                  isMobile ? 'h-8' : 'h-10'
                }`}>
                  <div className="flex space-x-1 sm:space-x-2">
                    <div className={`window-control rounded-full bg-red-500 ${
                      isMobile ? 'w-2 h-2' : 'w-3 h-3'
                    }`}></div>
                    <div className={`window-control rounded-full bg-yellow-500 ${
                      isMobile ? 'w-2 h-2' : 'w-3 h-3'
                    }`}></div>
                    <div className={`window-control rounded-full bg-green-500 ${
                      isMobile ? 'w-2 h-2' : 'w-3 h-3'
                    }`}></div>
                  </div>
                  <div className={`flex-1 text-center text-gray-300 font-medium ${
                    isSmallMobile ? 'text-xs' : isMobile ? 'text-xs' : 'text-sm'
                  }`}>
                    {isMobile ? 'Portfolio' : 'Portfolio - Visual Studio Code'}
                  </div>
                </div>

                {/* Responsive Tabs */}
                <div className="bg-gray-700 border-b border-gray-600 flex overflow-x-auto">
                  <div className={`tab bg-gray-800 px-2 sm:px-4 py-1 sm:py-2 text-white border-r border-gray-600 flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ${
                    isMobile ? 'text-xs' : 'text-sm'
                  }`}>
                    <span className={`rounded-full bg-blue-400 ${
                      isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'
                    }`}></span>
                    <span className="whitespace-nowrap">{isMobile ? 'portfolio.jsx' : 'portfolio.jsx'}</span>
                  </div>
                  <div className={`tab bg-gray-700 px-2 sm:px-4 py-1 sm:py-2 text-gray-400 border-r border-gray-600 flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ${
                    isMobile ? 'text-xs' : 'text-sm'
                  }`}>
                    <span className={`rounded-full bg-green-400 ${
                      isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'
                    }`}></span>
                    <span className="whitespace-nowrap">{isMobile ? 'about.jsx' : 'about.jsx'}</span>
                  </div>
                  {!isSmallMobile && (
                    <div className={`tab bg-gray-700 px-2 sm:px-4 py-1 sm:py-2 text-gray-400 flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ${
                      isMobile ? 'text-xs' : 'text-sm'
                    }`}>
                      <span className={`rounded-full bg-purple-400 ${
                        isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'
                      }`}></span>
                      <span className="whitespace-nowrap">projects.jsx</span>
                    </div>
                  )}
                </div>

                {/* Responsive Code Editor */}
                <div className={`bg-gray-900 p-2 sm:p-4 md:p-6 font-mono overflow-x-auto ${
                  isSmallMobile ? 'h-40 text-xs' :
                  isMobile ? 'h-48 text-xs' :
                  isTablet ? 'h-56 text-sm' : 'h-64 text-sm'
                }`}>
                  <div className="code-line flex items-center mb-1 sm:mb-2 whitespace-nowrap">
                    <span className={`text-gray-500 ${isMobile ? 'w-6' : 'w-8'}`}>1</span>
                    <span className="text-purple-400">import</span>
                    <span className="text-white ml-1 sm:ml-2">{'{ useState, useEffect }'}</span>
                    <span className="text-purple-400 ml-1 sm:ml-2">from</span>
                    <span className="text-green-400 ml-1 sm:ml-2">'react'</span>
                  </div>
                  
                  <div className="code-line flex items-center mb-1 sm:mb-2 whitespace-nowrap">
                    <span className={`text-gray-500 ${isMobile ? 'w-6' : 'w-8'}`}>2</span>
                    <span className="text-purple-400">import</span>
                    <span className="text-white ml-1 sm:ml-2">Portfolio</span>
                    <span className="text-purple-400 ml-1 sm:ml-2">from</span>
                    <span className="text-green-400 ml-1 sm:ml-2">'./components/Portfolio'</span>
                  </div>

                  <div className="code-line flex items-center mb-1 sm:mb-2">
                    <span className={`text-gray-500 ${isMobile ? 'w-6' : 'w-8'}`}>3</span>
                  </div>

                  <div className="code-line flex items-center mb-1 sm:mb-2 whitespace-nowrap">
                    <span className={`text-gray-500 ${isMobile ? 'w-6' : 'w-8'}`}>4</span>
                    <span className="text-purple-400">function</span>
                    <span className="text-blue-400 ml-1 sm:ml-2">App</span>
                    <span className="text-white ml-1">()</span>
                    <span className="text-white ml-1 sm:ml-2">{'{'}</span>
                  </div>

                  <div className="code-line flex items-center mb-1 sm:mb-2 whitespace-nowrap">
                    <span className={`text-gray-500 ${isMobile ? 'w-6' : 'w-8'}`}>5</span>
                    <span className="text-purple-400 ml-2 sm:ml-4">return</span>
                    <span className="text-white ml-1 sm:ml-2">(</span>
                  </div>

                  <div className="code-line flex items-center mb-1 sm:mb-2 whitespace-nowrap">
                    <span className={`text-gray-500 ${isMobile ? 'w-6' : 'w-8'}`}>6</span>
                    <span className="text-blue-400 ml-4 sm:ml-8">&lt;Portfolio</span>
                    <span className="text-yellow-400 ml-1 sm:ml-2">developer</span>
                    <span className="text-white">=</span>
                    <span className="text-green-400">"Rodney Austria"</span>
                    <span className="text-blue-400 ml-1 sm:ml-2">/&gt;</span>
                  </div>

                  <div className="code-line flex items-center mb-1 sm:mb-2">
                    <span className={`text-gray-500 ${isMobile ? 'w-6' : 'w-8'}`}>7</span>
                    <span className="text-white ml-2 sm:ml-4">)</span>
                  </div>

                  <div className="code-line flex items-center">
                    <span className={`text-gray-500 ${isMobile ? 'w-6' : 'w-8'}`}>8</span>
                    <span className="text-white">{'}'}</span>
                  </div>
                </div>

                {/* Responsive Terminal */}
                <div 
                  ref={terminalRef}
                  className={`bg-black p-2 sm:p-4 font-mono border-t border-gray-600 overflow-x-auto ${
                    isSmallMobile ? 'h-32 text-xs' :
                    isMobile ? 'h-36 text-xs' :
                    isTablet ? 'h-40 text-sm' : 'h-44 text-sm'
                  }`}
                >
                  <div className="terminal-line text-green-400 mb-1 whitespace-nowrap">
                    <span className="text-white">➜</span> <span className="text-blue-400">
                      {isMobile ? 'portfolio' : 'PS S:\\VSCodeProjects\\vscode-portfolio-austria'}
                    </span> npm run dev
                  </div>
                  <div className="terminal-line text-white mb-1 whitespace-nowrap">
                    ➜ vscode-portfolio-austria@0.0.0 dev
                  </div>
                  <div className="terminal-line text-white mb-1 whitespace-nowrap">
                    ➜ vite
                  </div>
                  <br />
                  <div className="terminal-line text-green-400 mb-1 ml-2 sm:ml-4 whitespace-nowrap">
                    VITE v7.1.6 <span className="text-gray-400">ready in</span> <span className="text-white">304 ms</span>
                  </div>
                  <div className="terminal-line text-green-400 ml-1 sm:ml-3 whitespace-nowrap">
                    ➜ Server running at http://localhost:5173/
                  </div>
                </div>
              </div>

              {/* Responsive Loading text */}
              <div className="text-center mt-4 sm:mt-6 md:mt-8">
                <div className={`font-bold text-white mb-2 ${
                  isSmallMobile ? 'text-lg' :
                  isMobile ? 'text-xl' :
                  isTablet ? 'text-xl' : 'text-2xl'
                }`}>
                  {isMobile ? 'Loading...' : 'Initializing Portfolio...'}
                </div>
                <div className="flex justify-center items-center space-x-1">
                  <div className={`bg-blue-400 rounded-full animate-bounce ${
                    isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'
                  }`}></div>
                  <div className={`bg-blue-400 rounded-full animate-bounce ${
                    isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'
                  }`} style={{animationDelay: '0.1s'}}></div>
                  <div className={`bg-blue-400 rounded-full animate-bounce ${
                    isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'
                  }`} style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-gray-900 opacity-50 pointer-events-none" />
        </div>
      )}

      {/* Global responsive styles */}
      <style jsx>{`
        @media screen and (max-width: 479px) {
          .code-window {
            margin: 0.5rem;
          }
        }
        
        @media screen and (orientation: landscape) and (max-height: 500px) {
          .logo-container {
            margin-bottom: 0.5rem;
          }
          .code-window .bg-gray-900 {
            height: 8rem;
          }
          .code-window .bg-black {
            height: 6rem;
          }
        }

        .terminal-line, .code-line {
          min-width: max-content;
        }
      `}</style>
    </div>
  );
}
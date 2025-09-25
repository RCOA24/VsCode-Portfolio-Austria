import { useState, useEffect, useRef } from "react";
import Silk from "./Silk"; // <- updated import

export default function Intro({ onComplete }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const codeWindowRef = useRef(null);
  const terminalRef = useRef(null);
  
  const [currentStage, setCurrentStage] = useState('combined'); // 'combined' | 'fadeout' | 'vscode' | 'complete'
  const [showVSCode, setShowVSCode] = useState(false);

  const message = "Hello! Welcome to my World.";

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

        // Wait a moment, then start fade out process
        setTimeout(() => {
          setCurrentStage('fadeout');
        }, 1000);
      }
    };

    // Start typewriter after a delay to let React Bits animation run first
    setTimeout(typeText, 2000);
    return () => clearInterval(cursorInterval);
  }, [message, currentStage]);

  // Fade out stage
  useEffect(() => {
    if (currentStage !== 'fadeout') return;

    // Fade out text first
    if (textRef.current) {
      textRef.current.style.transition = "opacity 1.5s ease";
      textRef.current.style.opacity = "0";
    }

    // Then fade out the entire combined stage including Silk background
    setTimeout(() => {
      const combinedStage = document.querySelector('.combined-stage');
      if (combinedStage) {
        combinedStage.style.transition = "opacity 2s ease";
        combinedStage.style.opacity = "0";
      }

      // After fade out completes, transition to VS Code
      setTimeout(() => {
        setCurrentStage('vscode');
        setShowVSCode(true);
      }, 2000);
    }, 1500);
  }, [currentStage]);

  // VS Code GSAP Animation with smooth fade-in
  useEffect(() => {
    if (currentStage !== 'vscode') return;

    // Ensure VS Code stage starts invisible, then fade in smoothly
    const vscodeStage = document.querySelector('.vscode-stage');
    if (vscodeStage) {
      vscodeStage.style.opacity = '0';
      // Smooth fade-in first
      setTimeout(() => {
        vscodeStage.style.transition = 'opacity 1.5s ease-in';
        vscodeStage.style.opacity = '1';
      }, 100);
    }

    // Import GSAP and start animations immediately after stage is visible
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => {
      // Start GSAP animations immediately, no additional delay
      startVSCodeAnimation();
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [currentStage]);

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

    // Set initial positions but make elements visible immediately
    gsap.set(".code-window", { scale: 1, opacity: 1, rotationY: 0 });
    gsap.set(".window-control", { scale: 1, opacity: 1 });
    gsap.set(".tab", { x: 0, opacity: 1 });
    gsap.set(".code-line", { x: 0, opacity: 1 });
    gsap.set(".terminal-line", { opacity: 1, y: 0 });
    gsap.set(".logo-container", { scale: 1, opacity: 1 });

    // Simple completion animation - just the glow effect
    tl.to(".code-window", {
      boxShadow: "0 0 50px rgba(0, 122, 255, 0.3)",
      duration: 0.8,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1
    });
  };

  if (currentStage === 'complete') return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden"
    >
      {/* Stage 1: Combined React Bits + Typewriter */}
      {(currentStage === 'combined' || currentStage === 'fadeout') && (
        <div className="combined-stage absolute inset-0">
          {/* Silk Background */}
          <Silk
            speed={5}
            scale={1}
            color="#47487dba"
            noiseIntensity={1.5}
            rotation={0}
          />

          {/* Typewriter Text */}
          <div className="absolute z-10 inset-0 flex items-center justify-center px-4">
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-mono tracking-wider drop-shadow-2xl inline-block text-center">
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

          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-40 pointer-events-none" />
        </div>
      )}

      {/* Stage 3: VS Code Animation */}
      {currentStage === 'vscode' && showVSCode && (
        <div className="vscode-stage absolute inset-0 bg-gray-900 opacity-0">
          {/* Background particles effect */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-10 animate-pulse"
                style={{
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animationDelay: Math.random() * 3 + 's',
                  animationDuration: (2 + Math.random() * 3) + 's'
                }}
              />
            ))}
          </div>

          <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex items-center justify-center min-h-screen">
            <div className="w-full">
              {/* Logo */}
              <div className="logo-container flex items-center justify-center mb-8 opacity-100">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg"
                  alt="VS Code Logo"
                  className="w-20 h-20 mb-4"
                />
              </div>

              {/* VS Code Window */}
              <div 
                ref={codeWindowRef}
                className="code-window bg-gray-800 rounded-lg shadow-2xl overflow-hidden opacity-100 scale-100"
              >
                {/* Window Header */}
                <div className="window-header bg-gray-700 h-10 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="window-control w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="window-control w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="window-control w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center text-sm text-gray-300 font-medium">
                    Portfolio - Visual Studio Code
                  </div>
                </div>

                {/* Tabs */}
                <div className="bg-gray-700 border-b border-gray-600 flex">
                  <div className="tab bg-gray-800 px-4 py-2 text-sm text-white border-r border-gray-600 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    <span>portfolio.jsx</span>
                  </div>
                  <div className="tab bg-gray-700 px-4 py-2 text-sm text-gray-400 border-r border-gray-600 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                    <span>about.jsx</span>
                  </div>
                  <div className="tab bg-gray-700 px-4 py-2 text-sm text-gray-400 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    <span>projects.jsx</span>
                  </div>
                </div>

                {/* Code Editor */}
                <div className="bg-gray-900 p-6 h-64 font-mono text-sm">
                  <div className="code-line flex items-center mb-2">
                    <span className="text-gray-500 w-8">1</span>
                    <span className="text-purple-400">import</span>
                    <span className="text-white ml-2">{'{ useState, useEffect }'}</span>
                    <span className="text-purple-400 ml-2">from</span>
                    <span className="text-green-400 ml-2">'react'</span>
                  </div>
                  
                  <div className="code-line flex items-center mb-2">
                    <span className="text-gray-500 w-8">2</span>
                    <span className="text-purple-400">import</span>
                    <span className="text-white ml-2">Portfolio</span>
                    <span className="text-purple-400 ml-2">from</span>
                    <span className="text-green-400 ml-2">'./components/Portfolio'</span>
                  </div>

                  <div className="code-line flex items-center mb-2">
                    <span className="text-gray-500 w-8">3</span>
                  </div>

                  <div className="code-line flex items-center mb-2">
                    <span className="text-gray-500 w-8">4</span>
                    <span className="text-purple-400">function</span>
                    <span className="text-blue-400 ml-2">App</span>
                    <span className="text-white ml-1">()</span>
                    <span className="text-white ml-2">{'{'}</span>
                  </div>

                  <div className="code-line flex items-center mb-2">
                    <span className="text-gray-500 w-8">5</span>
                    <span className="text-purple-400 ml-4">return</span>
                    <span className="text-white ml-2">(</span>
                  </div>

                  <div className="code-line flex items-center mb-2">
                    <span className="text-gray-500 w-8">6</span>
                    <span className="text-blue-400 ml-8">&lt;Portfolio</span>
                    <span className="text-yellow-400 ml-2">developer</span>
                    <span className="text-white">=</span>
                    <span className="text-green-400">"Rodney Austria"</span>
                    <span className="text-blue-400 ml-2">/&gt;</span>
                  </div>

                  <div className="code-line flex items-center mb-2">
                    <span className="text-gray-500 w-8">7</span>
                    <span className="text-white ml-4">)</span>
                  </div>

                  <div className="code-line flex items-center">
                    <span className="text-gray-500 w-8">8</span>
                    <span className="text-white">{'}'}</span>
                  </div>
                </div>

                {/* Terminal */}
                <div 
                  ref={terminalRef}
                  className="bg-black p-4 h-44 font-mono text-sm border-t border-gray-600"
                >
                  <div className="terminal-line text-green-400 mb-1">
                  <span className="text-white">➜</span>  <span className="text-blue-400">PS S:\VSCodeProjects\vscode-portfolio-austria</span> npm run dev
                  </div>
                  <div className="terminal-line text-white mb-1">
                   ➜ vscode-portfolio-austria@0.0.0 dev
                  </div>
                  <div className="terminal-line text-white mb-1">
                   ➜ vite
                  </div>
                  <br></br>
                  <div className="terminal-line text-green-400 mb-1 ml-4">
                   VITE v7.1.6 <span className="text-gray-400">ready in</span> <span className="text-white">304 ms</span>
                  </div>
                  <div className="terminal-line text-green-400 ml-3">
                   ➜ Server running at http://localhost:5173/
                  </div>
                </div>
              </div>

              {/* Loading text */}
              <div className="text-center mt-8">
                <div className="text-2xl font-bold text-white mb-2">
                  Initializing Portfolio...
                </div>
                <div className="flex justify-center items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Vignette for VS Code stage */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-gray-900 opacity-50 pointer-events-none" />
        </div>
      )}
    </div>
  );
}
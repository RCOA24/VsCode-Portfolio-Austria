// src/components/Editor.jsx
import { useState, useEffect } from "react";
import { Home, About, Projects } from "../data/sections";

export default function Editor({ activeFile, onFileChange, openTabs, setOpenTabs }) {
  const [displayedLine1, setDisplayedLine1] = useState("");
  const [displayedLine2, setDisplayedLine2] = useState("");
  const [fadeIn, setFadeIn] = useState(false);

  const line1 = "Welcome to my portfolio,";
  const line2 = "A modern VS Code-inspired Portfolio";

  // Navigation functions
  const handleNavigateToAbout = () => {
    const aboutFile = { type: "section", file: "About" };
    if (onFileChange) {
      onFileChange(aboutFile);
    }
    // Add to tabs if not already open
    if (setOpenTabs && !openTabs.some(tab => tab.file === "About" && tab.type === "section")) {
      setOpenTabs(prev => [...prev, aboutFile]);
    }
  };

  const handleNavigateToProjects = () => {
    const projectsFile = { type: "section", file: "Projects" };
    if (onFileChange) {
      onFileChange(projectsFile);
    }
    // Add to tabs if not already open
    if (setOpenTabs && !openTabs.some(tab => tab.file === "Projects" && tab.type === "section")) {
      setOpenTabs(prev => [...prev, projectsFile]);
    }
  };

  useEffect(() => {
    // Fade-in trigger
    setTimeout(() => setFadeIn(true), 100);

    // Typewriter for line1 then line2
    let index = 0;
    const interval1 = setInterval(() => {
      setDisplayedLine1(line1.slice(0, index + 1));
      index++;
      if (index === line1.length) {
        clearInterval(interval1);

        // Start line2 after line1 finishes
        let index2 = 0;
        const interval2 = setInterval(() => {
          setDisplayedLine2(line2.slice(0, index2 + 1));
          index2++;
          if (index2 === line2.length) {
            clearInterval(interval2);
          }
        }, 50);
      }
    }, 50);

    return () => {
      clearInterval(interval1);
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col min-w-0">
      {/* Editor Content */}
      <div className="flex-1 bg-[#1e1e1e] p-4 sm:p-6 overflow-y-auto text-[#ccc] transition-all duration-300 min-h-0">
        {!activeFile ? (
          // Welcome screen with glow typewriter
          <div
            className={`flex flex-col items-center justify-center h-full text-center px-4 transform transition-opacity duration-1000 ${
              fadeIn ? "opacity-100" : "opacity-0"
            }`}
          >
           <div className="logo-container flex items-center justify-center mb-8 opacity-100">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg"
                  alt="VS Code Logo"
                  className="w-20 h-20 mb-4"
                />
              </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-mono text-white whitespace-pre-line">
              <span className="text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]">
                {displayedLine1}
              </span>
              {displayedLine1.length === line1.length && (
                <span className="animate-pulse">|</span>
              )}
            </h1>
            <h1 className="text-lg sm:text-xl md:text-2xl font-mono text-white whitespace-pre-line mt-2">
              <span className="text-purple-400 drop-shadow-[0_0_6px_rgba(192,132,252,0.8)]">
                {displayedLine2}
              </span>
              {displayedLine2.length < line2.length && (
                <span className="animate-pulse">|</span>
              )}
            </h1>
          </div>
        ) : activeFile.type === "section" ? (
          // Render React components for each section
          <>
            {activeFile.file === "Home" && <Home onNavigateToAbout={handleNavigateToAbout} />}
            {activeFile.file === "About" && <About onNavigateToProjects={handleNavigateToProjects} />}
            {activeFile.file === "Projects" && <Projects />}
          </>
        ) : activeFile.type === "img" ? (
          // Render certificate images
          <div className="flex items-center justify-center h-full px-2">
            <img
              src={activeFile.file}
              alt="certificate"
              className="max-h-[80vh] max-w-full rounded shadow-lg object-contain"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
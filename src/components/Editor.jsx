// src/components/Editor.jsx
import { Home, About, Projects } from "../data/sections";

export default function Editor({ activeFile }) {
  return (
    <div className="flex flex-1 flex-col min-w-0">
      {/* Editor Content */}
      <div className="flex-1 bg-[#1e1e1e] p-4 sm:p-6 overflow-y-auto text-[#ccc] transition-all duration-300 min-h-0">
        {!activeFile ? (
          // Default welcome screen
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="text-6xl mb-4">⚡</div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-white mb-2">
              Welcome to My Portfolio
            </h1>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg">
              A modern VS Code-inspired portfolio
            </p>
          </div>
        ) : activeFile.type === "section" ? (
          // Render React components for each section
          <>
            {activeFile.file === "Home" && <Home />}
            {activeFile.file === "About" && <About />}
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

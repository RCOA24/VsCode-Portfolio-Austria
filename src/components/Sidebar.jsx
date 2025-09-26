import { useState, useEffect } from "react";
import { images } from "../data/images";
import { SiHtml5, SiTailwindcss, SiJavascript } from "react-icons/si";

export default function Sidebar({
  activeFile,
  setActiveFile,
  openTabs,
  setOpenTabs,
  setLightboxImg,
  sidebarWidth,
  setSidebarWidth,
  isMobileOpen,
  setIsMobileOpen,
}) {
  const [certsOpen, setCertsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Properly track screen size changes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openFile = (file, type) => {
    if (!openTabs.find((t) => t.file === file)) {
      setOpenTabs([...openTabs, { file, type }]);
    }
    setActiveFile({ file, type });

    if (isMobile) setIsMobileOpen(false); // Auto-close on mobile
  };

  const isActive = (file) =>
    activeFile?.file === file
      ? "bg-[#094771] border-l-2 border-[#007ACC] text-white"
      : "text-gray-300";

  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const handleMouseMove = (e) => {
      const newWidth = Math.min(500, Math.max(150, startWidth + (e.clientX - startX)));
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const files = [
    { file: "Home", icon: <SiHtml5 className="text-red-500" />, type: "section", ext: "html" },
    { file: "About", icon: <SiTailwindcss className="text-sky-400" />, type: "section", ext: "css" },
    { file: "Projects", icon: <SiJavascript className="text-yellow-400" />, type: "section", ext: "js" },
  ];

  return (
    <div
      className={`
        bg-[#252526] border-r border-[#3e3e42] flex flex-col 
        transform transition-transform duration-300 ease-in-out
        ${isMobile 
          ? `fixed top-0 left-0 h-full shadow-2xl ${
              isMobileOpen ? "translate-x-0 z-[200]" : "-translate-x-full z-[200]"
            }`
          : "static z-40"
        }
      `}
      style={{ 
        width: sidebarWidth, 
        minWidth: isMobile ? 250 : 150, 
        maxWidth: isMobile ? Math.min(window.innerWidth * 0.85, 350) : 500 
      }}
    >
      {/* Mobile Header - only show on mobile */}
      {isMobile && (
        <div className="p-3 border-b border-[#3e3e42] flex items-center justify-between bg-[#2d2d30]">
          <div className="flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg"
              alt="VS Code"
              className="h-5 w-5 mr-2"
            />
            <span className="text-sm font-medium text-white">Explorer</span>
          </div>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1 rounded hover:bg-[#3e3e42] text-gray-300 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      {/* Desktop Header - only show on desktop */}
      {!isMobile && (
        <div className="p-2 text-xs font-bold uppercase text-gray-300 flex-shrink-0">
          Explorer
        </div>
      )}

      {/* File List */}
      <div className="flex-1 overflow-y-auto text-sm flex flex-col min-h-0">
        {files.map(({ file, icon, type, ext }) => (
          <div
            key={file}
            className={`${isMobile ? 'p-3' : 'p-2'} cursor-pointer hover:bg-[#2a2d2e] flex items-center truncate transition-colors duration-150 ${isActive(file)}`}
            onClick={() => openFile(file, type)}
          >
            <span className={`${isMobile ? 'mr-3 text-lg' : 'mr-2 text-base'} flex-shrink-0`}>
              {icon}
            </span>
            <span className={`truncate ${isMobile ? 'text-base' : 'text-sm'}`}>
              {file}.{ext}
            </span>
          </div>
        ))}

        {/* Certificates Folder */}
        <div
          className={`${isMobile ? 'p-3' : 'p-2'} font-semibold text-gray-400 flex items-center cursor-pointer hover:bg-[#2a2d2e] select-none transition-colors duration-150`}
          onClick={() => setCertsOpen(!certsOpen)}
        >
          <span className={`${isMobile ? 'mr-3 text-lg' : 'mr-2 text-base'} flex-shrink-0`}>
            {certsOpen ? "📂" : "📁"}
          </span>
          <span className={`truncate ${isMobile ? 'text-base' : 'text-sm'}`}>
            Certificates
          </span>
        </div>

        {/* Certificate Images */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            certsOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {Object.keys(images).map((img) => (
            <div
              key={img}
              className={`${isMobile ? 'pl-8 p-3' : 'pl-6 p-2'} cursor-pointer hover:bg-[#2a2d2e] flex items-center truncate transition-colors duration-150 ${isActive(img)}`}
              onClick={() => {
                setLightboxImg(images[img]);
                openFile(img, "img");
              }}
            >
              <span className={`${isMobile ? 'mr-3 text-lg' : 'mr-2 text-base'} flex-shrink-0`}>
                🖼️
              </span>
              <span className={`truncate ${isMobile ? 'text-base' : 'text-sm'}`}>
                {img}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile footer with stats */}
      {isMobile && (
        <div className="p-3 border-t border-[#3e3e42] bg-[#2d2d30] text-xs text-gray-400">
          {files.length} files, {Object.keys(images).length} certificates
        </div>
      )}

      {/* Resize handle (only desktop) */}
      {!isMobile && (
        <div
          className="w-[5px] bg-[#2d2d30] cursor-col-resize absolute right-0 top-0 h-full hover:bg-[#404040] transition-colors"
          onMouseDown={handleMouseDown}
        />
      )}
    </div>
  );
}
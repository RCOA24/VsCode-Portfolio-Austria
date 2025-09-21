import { useState } from "react";
import { images } from "../data/files";

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

  // ✅ File open handler
  const openFile = (file, type) => {
    if (!openTabs.find((t) => t.file === file)) {
      setOpenTabs([...openTabs, { file, type }]);
    }
    setActiveFile({ file, type });

    // ✅ Auto-close on mobile
    if (window.innerWidth < 768) {
      setIsMobileOpen(false);
    }
  };

  // ✅ Highlight checker (blue active state like VS Code)
  const isActive = (file) =>
    activeFile?.file === file
      ? "bg-[#094771] border-l-2 border-[#007ACC] text-white"
      : "text-gray-300";

  // ✅ Sidebar resize
  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const handleMouseMove = (e) => {
      const newWidth = Math.min(
        500,
        Math.max(150, startWidth + (e.clientX - startX))
      );
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className={`bg-[#252526] border-r border-[#3e3e42] flex flex-col absolute md:static top-0 left-0 h-full transition-transform duration-300 z-50 ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
      style={{ width: sidebarWidth }}
    >
      {/* Sidebar header */}
      <div className="p-2 text-xs font-bold uppercase text-gray-300">
        Explorer
      </div>

      {/* File tree */}
      <div className="flex-1 overflow-y-auto text-sm">
        {[
          { file: "Home", icon: "🏠", type: "section", ext: "html" },
          { file: "About", icon: "👤", type: "section", ext: "css" },
          { file: "Projects", icon: "💼", type: "section", ext: "js" },
        ].map(({ file, icon, type, ext }) => (
          <div
            key={file}
            className={`p-2 cursor-pointer hover:bg-[#2a2d2e] flex items-center ${isActive(
              file
            )}`}
            onClick={() => openFile(file, type)}
          >
            <span className="mr-2">{icon}</span> {file}.{ext}
          </div>
        ))}

        {/* Certificates folder */}
        <div
          className="p-2 font-semibold text-gray-400 flex items-center cursor-pointer hover:bg-[#2a2d2e]"
          onClick={() => setCertsOpen(!certsOpen)}
        >
          <span className="mr-2">{certsOpen ? "📂" : "📁"}</span>
          Certificates
        </div>

        {/* Certificate files */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            certsOpen ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          {Object.keys(images).map((img) => (
            <div
              key={img}
              className={`pl-6 p-2 cursor-pointer hover:bg-[#2a2d2e] flex items-center ${isActive(
                img
              )}`}
              onClick={() => {
                setLightboxImg(images[img]);
                openFile(img, "img");
              }}
            >
              <span className="mr-2">🖼️</span> {img}
            </div>
          ))}
        </div>
      </div>

      {/* Resizer (desktop only) */}
      <div
        className="hidden md:block w-[5px] bg-[#2d2d30] cursor-col-resize absolute right-0 top-0 h-full"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}

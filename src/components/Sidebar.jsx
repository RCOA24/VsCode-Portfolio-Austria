import { useState } from "react";
import { images } from "../data/files";
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

  const openFile = (file, type) => {
    if (!openTabs.find((t) => t.file === file)) {
      setOpenTabs([...openTabs, { file, type }]);
    }
    setActiveFile({ file, type });

    if (window.innerWidth < 768) setIsMobileOpen(false); // Auto-close on mobile
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
        bg-[#252526] border-r border-[#3e3e42] flex flex-col fixed md:static top-0 left-0 h-full z-50
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      style={{ width: sidebarWidth, minWidth: 150, maxWidth: 500 }}
    >
      {/* Header */}
      <div className="p-2 text-xs font-bold uppercase text-gray-300 flex-shrink-0">
        Explorer
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto text-sm flex flex-col min-h-0">
        {files.map(({ file, icon, type, ext }) => (
          <div
            key={file}
            className={`p-2 cursor-pointer hover:bg-[#2a2d2e] flex items-center truncate ${isActive(file)}`}
            onClick={() => openFile(file, type)}
          >
            <span className="mr-2 flex-shrink-0">{icon}</span>
            <span className="truncate">{file}.{ext}</span>
          </div>
        ))}

        {/* Certificates Folder */}
        <div
          className="p-2 font-semibold text-gray-400 flex items-center cursor-pointer hover:bg-[#2a2d2e] select-none"
          onClick={() => setCertsOpen(!certsOpen)}
        >
          <span className="mr-2 flex-shrink-0">{certsOpen ? "📂" : "📁"}</span>
          <span className="truncate">Certificates</span>
        </div>

        {/* Certificate Images */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            certsOpen ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          {Object.keys(images).map((img) => (
            <div
              key={img}
              className={`pl-6 p-2 cursor-pointer hover:bg-[#2a2d2e] flex items-center truncate ${isActive(img)}`}
              onClick={() => {
                setLightboxImg(images[img]);
                openFile(img, "img");
              }}
            >
              <span className="mr-2 flex-shrink-0">🖼️</span>
              <span className="truncate">{img}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Resize handle (only desktop) */}
      <div
        className="hidden md:block w-[5px] bg-[#2d2d30] cursor-col-resize absolute right-0 top-0 h-full"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}

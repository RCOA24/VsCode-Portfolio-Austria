import { useState, useRef } from "react";
import Intro from "./components/Intro";
import MenuBar from "./components/MenuBar";
import ActivityBar from "./components/ActivityBar";
import Sidebar from "./components/Sidebar";
import Tabs from "./components/Tabs";
import Editor from "./components/Editor";
import Lightbox from "./components/Lightbox";
import StatusBar from "./components/StatusBar";


function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeFile, setActiveFile] = useState(null);
  const [openTabs, setOpenTabs] = useState([]);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const rafRef = useRef(null);

  const startResizing = (e) => {
    const startX = e.clientX;
    const startWidth = sidebarWidth;
    setIsDragging(true);

    const handleMouseMove = (e) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const newWidth = Math.min(500, Math.max(150, startWidth + (e.clientX - startX)));
        setSidebarWidth(newWidth);
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      {showIntro && <Intro onComplete={() => setShowIntro(false)} />}

      {!showIntro && (
        <div
          className={`flex flex-col h-screen transition-colors duration-300 ${
            isDragging ? "select-none" : ""
          } bg-white dark:bg-[#1e1e1e] text-black dark:text-white`}
        >
          {/* Menu */}
          <MenuBar toggleMobile={() => setIsMobileOpen(!isMobileOpen)} />

          <div className="flex flex-1 overflow-hidden relative">
            {/* Activity Bar */}
            <ActivityBar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

            {/* Sidebar */}
            <div
              className={`bg-gray-200 dark:bg-[#252526] border-r border-gray-400 dark:border-[#3e3e42] flex flex-col fixed md:static top-0 left-0 h-full transition-transform duration-300 z-40 ${
                isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
              }`}
              style={{ width: sidebarWidth }}
            >
              <Sidebar
                activeFile={activeFile}
                setActiveFile={setActiveFile}
                openTabs={openTabs}
                setOpenTabs={setOpenTabs}
                setLightboxImg={setLightboxImg}
                sidebarWidth={sidebarWidth}
                setSidebarWidth={setSidebarWidth}
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
              />
              <div
                className="hidden md:block w-[5px] bg-gray-300 dark:bg-[#37373d] cursor-col-resize absolute right-0 top-0 h-full z-50"
                onMouseDown={startResizing}
              />
            </div>

            {/* Main Content */}
            <div className="flex flex-col flex-1 overflow-hidden">
              <Tabs
                openTabs={openTabs}
                setOpenTabs={setOpenTabs}
                activeFile={activeFile}
                setActiveFile={setActiveFile}
              />
              <Editor
                activeFile={activeFile}
                onFileChange={setActiveFile}
                openTabs={openTabs}
                setOpenTabs={setOpenTabs}
              />
            </div>
          </div>

          {/* Status Bar */}
          <StatusBar />

          {/* Lightbox */}
          {lightboxImg && <Lightbox img={lightboxImg} setLightboxImg={setLightboxImg} />}

          {isDragging && (
            <div className="hidden md:block fixed inset-0 cursor-col-resize z-[9999]" />
          )}
          {isMobileOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
          )}
        </div>
      )}
    </>
  );
}

export default App;
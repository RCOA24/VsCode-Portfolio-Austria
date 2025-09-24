import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react"; // Lucide icon

const menus = {
  File: ["New File", "Open File...", "Save", "Exit"],
  Edit: ["Undo", "Redo", "Cut", "Copy", "Paste"],
  View: ["Explorer", "Search", "Extensions"],
  Go: ["Back", "Forward", "Go to File..."],
  Run: ["Run Without Debugging", "Start Debugging"],
  Terminal: ["New Terminal", "Split Terminal"],
  Help: ["Documentation", "About"],
};

export default function MenuBar({ toggleMobile }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={menuRef}
      className="bg-[#2d2d30] h-[30px] flex items-center justify-between px-2 text-sm border-b border-[#3e3e42] w-full z-50 relative"
    >
      {/* Left side (Logo + Menus) */}
      <div className="flex items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg"
          alt="VS Code"
          className="h-4 w-4 mr-2 flex-shrink-0"
        />

        {Object.keys(menus).map((item) => (
          <div
            key={item}
            className={`px-2 py-1 cursor-pointer rounded hover:bg-[#3e3e42] relative ${
              activeMenu === item ? "bg-[#3e3e42]" : ""
            }`}
            onClick={() => setActiveMenu(activeMenu === item ? null : item)}
          >
            {item}

            {/* Dropdown (absolute overlay, not pushing content) */}
            {activeMenu === item && (
              <div className="absolute top-full left-0 bg-[#252526] border border-[#3e3e42] rounded shadow-lg z-50 min-w-max animate-fadeIn">
                {menus[item].map((subItem) => (
                  <div
                    key={subItem}
                    className="px-4 py-1 hover:bg-[#094771] hover:text-white cursor-pointer whitespace-nowrap"
                    onClick={() => setActiveMenu(null)}
                  >
                    {subItem}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right side (Mobile toggle) */}
      <div
        className="md:hidden cursor-pointer text-[#ccc]"
        onClick={toggleMobile}
      >
        <Menu size={18} />
      </div>
    </div>
  );
}

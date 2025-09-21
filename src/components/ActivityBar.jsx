import { useState } from "react";
import { FaFolder, FaSearch, FaBug } from "react-icons/fa";

export default function ActivityBar() {
  const icons = [
    { icon: <FaFolder />, label: "Portfolio" },
    { icon: <FaSearch />, label: "Search" },
    { icon: <FaBug />, label: "Debug" },
  ];

  const [active, setActive] = useState(0);

  return (
    <div className="w-[50px] bg-gray-800 dark:bg-[#1e1e1e] flex flex-col items-center pt-2 relative">
      {icons.map((item, i) => (
        <div
          key={i}
          onClick={() => setActive(i)}
          className={`w-10 h-10 flex items-center justify-center cursor-pointer rounded mb-1 transition-all duration-200
            hover:bg-gray-700 dark:hover:bg-[#37373d]
            ${active === i ? "border-l-2 border-[#007acc] bg-gray-700 dark:bg-[#37373d]" : ""}`}
          title={item.label}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
}

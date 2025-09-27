import { X } from "lucide-react";

export default function Tabs({ openTabs, setOpenTabs, activeFile, setActiveFile }) {
  const closeTab = (file) => {
    const newTabs = openTabs.filter((t) => t.file !== file);
    setOpenTabs(newTabs);

    // If closing the active tab, switch to the last opened one
    if (activeFile?.file === file) {
      setActiveFile(newTabs.length > 0 ? newTabs[newTabs.length - 1] : null);
    }
  };

  // Function to get icon based on file name/extension
  const getFileIcon = (fileName) => {
    const name = fileName.toLowerCase();
    
    // Check for specific file names first
    if (name === 'home' || name.includes('home')) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg";
    }
    if (name === 'about' || name.includes('about')) {
      return "https://img.icons8.com/?size=100&id=x7XMNGh2vdqA&format=png&color=000000"; // Tailwind CSS
    }
    if (name === 'projects' || name.includes('project')) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
    }
    
    // Check for file extensions
    if (name.endsWith('.html')) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg";
    }
    if (name.endsWith('.css')) {
      return "https://img.icons8.com/?size=100&id=x7XMNGh2vdqA&format=png&color=000000"; // Tailwind CSS
    }
    if (name.endsWith('.js') || name.endsWith('.jsx')) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
    }
    if (name.endsWith('.ts') || name.endsWith('.tsx')) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg";
    }
    if (name.endsWith('.php')) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg";
    }
    if (name.endsWith('.py')) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg";
    }
    if (name.endsWith('.java')) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg";
    }
    if (name.endsWith('.cs')) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg";
    }
    if (name.endsWith('.json')) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg";
    }
    if (name.endsWith('.md')) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg";
    }
    if (name.endsWith('.vue')) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg";
    }
    if (name.endsWith('.svg')) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svg/svg-original.svg";
    }
    if (name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.gif')) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"; // Generic image icon
    }
    
    // Default icon for unknown files
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg";
  };

  return (
    <div className="flex bg-[#252526] border-b border-[#3e3e42] text-sm overflow-x-auto">
      {openTabs.map((tab) => (
        <div
          key={tab.file}
          className={`flex items-center px-3 py-2 border-r border-[#3e3e42] cursor-pointer whitespace-nowrap min-w-fit
            ${
              activeFile?.file === tab.file
                ? "bg-[#1e1e1e] text-white border-t-2 border-[#007ACC]" // active tab styling
                : "bg-[#2d2d2d] text-gray-400 hover:bg-[#333333]"
            }`}
          onClick={() => setActiveFile(tab)} // clicking switches content
        >
          {/* File Icon */}
          <img 
            src={getFileIcon(tab.file)} 
            alt="" 
            className="w-4 h-4 mr-2 object-contain"
            onError={(e) => {
              // Fallback to VS Code icon if image fails to load
              e.target.src = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg";
            }}
          />
          
          {/* File Name */}
          <span className="mr-2">{tab.file}</span>
          
          {/* Close Button */}
          <X
            size={14}
            className="ml-1 text-gray-400 hover:text-white transition-colors duration-150"
            onClick={(e) => {
              e.stopPropagation(); // prevents accidental tab activation when closing
              closeTab(tab.file);
            }}
          />
        </div>
      ))}
    </div>
  );
}
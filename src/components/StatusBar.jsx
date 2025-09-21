import { Github, AlertCircle, GitBranch, Bell, Code2 } from "lucide-react";

export default function StatusBar({ theme }) {
  return (
    <div className="bg-[#007acc] h-7 flex items-center justify-between text-white px-2 sm:px-3 text-[10px] sm:text-[12px] select-none">

      {/* Left section */}
      <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-shrink overflow-hidden">
        <div className="flex items-center gap-1 truncate">
          <GitBranch size={12} className="sm:size-[14px]" /> 
          <span className="truncate">main</span>
        </div>
        <div className="flex items-center gap-1 truncate">
          <AlertCircle size={12} className="sm:size-[14px]" /> 
          <span className="truncate">0 Problems</span>
        </div>
        <div className="flex items-center gap-1 truncate">
          <Bell size={12} className="sm:size-[14px]" /> 
          <span className="truncate">Notifications</span>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-shrink overflow-hidden justify-end">
        <div className="flex items-center gap-1 truncate">
          <Code2 size={12} className="sm:size-[14px]" /> 
          <span className="truncate">Prettier</span>
        </div>
        {/* Gradually hide items on smaller screens */}
        <span className="hidden sm:inline truncate">UTF-8</span>
        <span className="hidden sm:inline md:hidden truncate">LF</span>
        <span className="hidden md:inline truncate">LF</span>
        <span className="hidden md:inline lg:inline truncate">JavaScript React</span>
        <a
          href="https://github.com/your-username"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 truncate"
        >
          <Github size={12} className="sm:size-[14px]" /> 
          <span className="truncate">GitHub</span>
        </a>
      </div>

    </div>
  );
}

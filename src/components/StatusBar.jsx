import { Github, AlertCircle, GitBranch, Bell, Code2 } from "lucide-react";

export default function StatusBar({ theme }) {
  return (
    <div className="bg-[#007acc] h-7 flex items-center justify-between text-[12px] text-white px-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1"><GitBranch size={14} /> main</div>
        <div className="flex items-center gap-1"><AlertCircle size={14} /> 0 Problems</div>
        <div className="flex items-center gap-1"><Bell size={14} /> Notifications</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1"><Code2 size={14} /> Prettier</div>
        <span className="hidden sm:inline">UTF-8</span>
        <span className="hidden sm:inline">LF</span>
        <span className="hidden md:inline">JavaScript React</span>
        <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1"><Github size={14} /> GitHub</a>
      </div>
    </div>
  );
}

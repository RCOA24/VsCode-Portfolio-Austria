import { X } from "lucide-react";

export default function Tabs({ openTabs, setOpenTabs, activeFile, setActiveFile }) {
  const closeTab = (file) => {
    const newTabs = openTabs.filter((t) => t.file !== file);
    setOpenTabs(newTabs);

    // ✅ If closing the active tab, switch to the last opened one
    if (activeFile?.file === file) {
      setActiveFile(newTabs.length > 0 ? newTabs[newTabs.length - 1] : null);
    }
  };

  return (
    <div className="flex bg-[#252526] border-b border-[#3e3e42] text-sm overflow-x-auto">
      {openTabs.map((tab) => (
        <div
          key={tab.file}
          className={`flex items-center px-4 py-2 border-r border-[#3e3e42] cursor-pointer whitespace-nowrap
            ${
              activeFile?.file === tab.file
                ? "bg-[#1e1e1e] text-white border-t-2 border-[#007ACC]" // ✅ active tab styling (blue line on top)
                : "bg-[#2d2d2d] text-gray-400 hover:bg-[#333333]"
            }`}
          onClick={() => setActiveFile(tab)} // ✅ clicking switches content
        >
          <span className="mr-2">{tab.file}</span>
          <X
            size={14}
            className="ml-1 text-gray-400 hover:text-white"
            onClick={(e) => {
              e.stopPropagation(); // ✅ prevents accidental tab activation when closing
              closeTab(tab.file);
            }}
          />
        </div>
      ))}
    </div>
  );
}

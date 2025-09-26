import { useState, useEffect, useRef } from "react";

// Custom animated hamburger component
const AnimatedHamburger = ({ isOpen, size = 20 }) => (
  <div className="flex flex-col justify-center items-center" style={{ width: size, height: size }}>
    <span
      className={`bg-current block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${
        isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
      }`}
    />
    <span
      className={`bg-current block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm my-0.5 ${
        isOpen ? 'opacity-0' : 'opacity-100'
      }`}
    />
    <span
      className={`bg-current block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${
        isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
      }`}
    />
  </div>
);

export default function MenuBar({ toggleMobile, isMobileOpen }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const menuRef = useRef(null);

  // Track screen width for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      // No mobile menu to close anymore
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [screenWidth]);

  const handleMobileToggle = () => {
    toggleMobile();
  };

  const isMobile = screenWidth < 768;

  return (
    <div
      ref={menuRef}
      className={`bg-[#2d2d30] flex items-center justify-between px-2 text-sm border-b border-[#3e3e42] w-full z-50 relative transition-all duration-300 ${
        isMobile ? 'h-12 shadow-lg' : 'h-[30px]'
      }`}
    >
      {/* Left side - Logo and Title */}
      <div className="flex items-center flex-1 min-w-0">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg"
          alt="VS Code"
          className={`flex-shrink-0 mr-2 ${isMobile ? 'h-6 w-6' : 'h-4 w-4'}`}
        />
        
        {/* App title - responsive sizing */}
        <div className={`font-medium text-white truncate ${
          isMobile ? 'text-base' : 'text-sm'
        }`}>
          {isMobile ? 'VS Code Editor' : 'Visual Studio Code'}
        </div>
      </div>

      {/* Right side - Only hamburger menu for sidebar toggle */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {/* Sidebar toggle - animated hamburger menu */}
        <button
          className={`cursor-pointer text-[#ccc] hover:text-white transition-colors duration-200 rounded-md hover:bg-[#3e3e42] ${
            isMobile ? 'p-2' : 'p-1'
          } md:hidden`}
          onClick={handleMobileToggle}
          aria-label="Toggle sidebar"
        >
          <AnimatedHamburger isOpen={isMobileOpen} size={isMobile ? 20 : 18} />
        </button>
      </div>



      {/* Custom animations and mobile optimizations */}
      <style jsx>{`
        /* Mobile-specific touch improvements */
        @media (max-width: 767px) {
          button:active {
            transform: scale(0.95);
          }
          
          .cursor-pointer:active {
            transform: scale(0.98);
          }
        }

        /* Safe area support for mobile devices */
        @supports (padding: max(0px)) {
          @media (max-width: 767px) {
            .px-2 {
              padding-left: max(8px, env(safe-area-inset-left));
              padding-right: max(8px, env(safe-area-inset-right));
            }
          }
        }

        /* Smooth transitions */
        .transition-all {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}
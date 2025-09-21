// Intro.jsx
import { useRef, useEffect } from "react";
import Silk from "./Silk"; // <- updated import

export default function Intro({ onComplete }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const cursorRef = useRef(null);

  const message = "Hello! Welcome to my World.";

  // Typewriter effect
  useEffect(() => {
    if (!textRef.current) return;
    let currentIndex = 0;
    const cursorInterval = setInterval(() => {
      if (cursorRef.current)
        cursorRef.current.style.opacity =
          cursorRef.current.style.opacity === "0" ? "1" : "0";
    }, 530);

    const typeText = () => {
      if (currentIndex < message.length) {
        textRef.current.textContent = message.substring(0, currentIndex + 1);
        currentIndex++;
        let delay = 80;
        if (".!".includes(message[currentIndex - 1])) delay = 300;
        if (message[currentIndex - 1] === " ") delay = 60;
        setTimeout(typeText, delay);
      } else {
        clearInterval(cursorInterval);
        if (cursorRef.current) cursorRef.current.style.opacity = "0";

        // Fade-out text smoothly
        if (textRef.current) {
          textRef.current.style.transition = "opacity 1s ease";
          textRef.current.style.opacity = "0";
        }

        // Fade-out container smoothly
        if (containerRef.current) {
          containerRef.current.style.transition = "opacity 1.5s ease";
          containerRef.current.style.opacity = "0";
        }

        setTimeout(() => onComplete && onComplete(), 1500);
      }
    };

    setTimeout(typeText, 500);
    return () => clearInterval(cursorInterval);
  }, [message, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden"
    >
      {/* Silk (swirling gradient) background */}
      <Silk
        speed={5}
        scale={1}
        color="#47487dba"
        noiseIntensity={1.5}
        rotation={0}
      />

      {/* Text */}
      <div className="absolute z-10 text-center px-4">
        <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold font-mono tracking-wider drop-shadow-2xl inline-block">
          <span
            ref={textRef}
            style={{ textShadow: "0 0 20px rgba(180,220,255,0.4)" }}
          />
          <span
            ref={cursorRef}
            className="text-white font-mono"
            style={{ textShadow: "0 0 20px rgba(200,240,255,0.9)" }}
          >
            |
          </span>
        </h1>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-40 pointer-events-none" />
    </div>
  );
}

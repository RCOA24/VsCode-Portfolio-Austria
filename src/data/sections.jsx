// src/data/sections.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

// ================== HOME ==================
export const Home = () => {
  const container = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      container.current.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <div ref={container} className="text-center space-y-6 p-6">
      <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-400 to-purple-500">
        Welcome!
      </h1>
      <p className="text-gray-300 text-lg md:text-xl">
        This is my modern <span className="text-blue-400">VS Code-inspired</span> portfolio.
      </p>
      <button className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition">
        Explore Projects 🚀
      </button>
    </div>
  );
};

// ================== ABOUT ==================
export const About = () => {
  const container = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      container.current.children,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={container} className="max-w-3xl mx-auto text-center space-y-6 p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-400">About Me</h1>
      <p className="text-gray-300 leading-relaxed text-lg">
        I’m <span className="font-semibold text-teal-400">Rodney Austria</span>, a{" "}
        <span className="text-purple-400">Full-Stack Developer</span> passionate about building
        responsive, modern web apps with clean UI/UX and seamless integrations.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <span className="px-4 py-2 rounded-lg bg-[#252526] text-blue-300">React</span>
        <span className="px-4 py-2 rounded-lg bg-[#252526] text-teal-300">Laravel</span>
        <span className="px-4 py-2 rounded-lg bg-[#252526] text-purple-300">Tailwind CSS</span>
        <span className="px-4 py-2 rounded-lg bg-[#252526] text-pink-300">APIs</span>
      </div>
    </div>
  );
};

// ================== PROJECTS ==================
export const Projects = () => {
  const container = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      container.current.children,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, stagger: 0.2, duration: 0.8, ease: "back.out(1.7)" }
    );
  }, []);

  const projects = [
    {
      title: "TyphoGuard 🌊",
      desc: "Tide monitoring tool with geolocation and real-time data.",
      img: "https://via.placeholder.com/250x150.png?text=TyphoGuard",
      tech: ["Laravel", "Leaflet.js", "Tailwind CSS"],
    },
    {
      title: "CRM System 🗂️",
      desc: "Team-built CRM with Laravel & Blade. Responsive and API-integrated.",
      img: "https://via.placeholder.com/250x150.png?text=CRM",
      tech: ["Laravel", "Blade", "REST API"],
    },
    {
      title: "Portfolio 🚀",
      desc: "VS Code-inspired portfolio using React & Tailwind.",
      img: "https://via.placeholder.com/250x150.png?text=Portfolio",
      tech: ["React", "Tailwind", "GSAP"],
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-purple-400 mb-8">Projects</h1>
      <div ref={container} className="flex flex-wrap gap-6 justify-center">
        {projects.map((p, i) => (
          <div
            key={i}
            className="bg-[#252526] rounded-xl p-4 w-72 hover:scale-105 hover:shadow-xl transition transform"
          >
            <img src={p.img} alt={p.title} className="rounded-lg mb-3" />
            <h3 className="text-xl font-semibold text-blue-400">{p.title}</h3>
            <p className="text-gray-400 text-sm mb-3">{p.desc}</p>
            <div className="flex flex-wrap gap-2">
              {p.tech.map((t, i) => (
                <span key={i} className="px-2 py-1 text-xs rounded-md bg-[#1e1e1e] text-gray-300">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

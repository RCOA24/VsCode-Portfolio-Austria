import { useEffect } from "react";

export default function Lightbox({ img, setLightboxImg }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setLightboxImg(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setLightboxImg]);

  if (!img) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
      onClick={() => setLightboxImg(null)}
    >
      <img
        src={img}
        alt="Certificate"
        className="max-w-[80%] max-h-[80%] rounded shadow-lg transition-transform duration-300 scale-100 hover:scale-105"
      />
    </div>
  );
}

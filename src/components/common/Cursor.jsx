import { useEffect, useState } from "react";
import "../../assets/styles/component_import_styles/Cursor.scss"

const Cursor = () => {
  const [footprints, setFootprints] = useState([]);
  let lastFootprintTime = 0;
  const footprintDelay = 150;

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastFootprintTime < footprintDelay) return;
      lastFootprintTime = now;
    
      const offsetX = Math.random() * 10 + 5;
      const offsetY = Math.random() * 10 + 5;
      const id = Math.random();
    
      setFootprints((prev) => [
        ...prev,
        { id, x: e.pageX + offsetX, y: e.pageY + offsetY }
      ]);

      setTimeout(() => {
        setFootprints((prev) =>
          prev.map((fp) =>
            fp.id === id ? { ...fp, shrinking: true } : fp
          )
        );
      }, 50);
    
      setTimeout(() => {
        setFootprints((prev) => prev.filter((fp) => fp.id !== id));
      }, 500);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {footprints.map((fp) => (
        <div
          key={fp.id}
          className={`cursor-footprint ${fp.shrinking ? "shrinking" : ""}`}
          style={{ left: fp.x, top: fp.y }}
        />
      ))}
    </>
  );
};

export default Cursor;

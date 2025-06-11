import React, { useEffect, useRef } from "react";

export function Gallery() {
  const images = [
    "./img/couple2.jpg",
    "./img/couple3.jpg",
    "./img/couple7.jpg",
    "./img/couple6.jpg",
    "./img/coulpe4.jpg",
    "./img/couple5.jpg",
    "./img/couple8.jpg",
  ];

  const galleryRef = useRef(null);
  const speed = 40; // pixels per second

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    let start;
    let x = 0;
    const totalWidth = gallery.scrollWidth / 2;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = (timestamp - start) / 1000; // seconds
      start = timestamp;

      x -= speed * elapsed;
      if (Math.abs(x) >= totalWidth) x = 0;

      gallery.style.transform = `translateX(${x}px)`;

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  const duplicatedImages = [...images, ...images];

  return (
    <section id="gallery">
      <div
        className="gallery-container"
        style={{
          overflow: "hidden",
          width: "100%",
        }}
      >
        <div
          className="gallery"
          ref={galleryRef}
          style={{
            display: "flex",
            gap: "1.5rem",
            padding: "1rem 2rem",
            willChange: "transform",
          }}
        >
          {duplicatedImages.map((src, idx) => (
            <div
              key={idx}
              className="gallery-item"
              style={{
                flex: "0 0 auto",
                width: "250px",
                height: "300px",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 6px 10px rgba(121, 81, 170, 0.3)",
              }}
            >
              <img
                src={src}
                alt={`Couple ${idx + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "20px",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;

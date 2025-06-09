import React, { useRef, useEffect } from "react";

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

  const galleryWrapperRef = useRef(null);
  const scrollSpeed = 1.0; // pixels per frame

  useEffect(() => {
    const galleryWrapper = galleryWrapperRef.current;
    if (!galleryWrapper) return;

    let animationFrameId;
    let lastTimestamp;

    const totalScrollWidth = galleryWrapper.scrollWidth / 2; // since we duplicate images

    const step = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // Move scrollLeft by speed * elapsed time (scaled)
      // We use elapsed to make speed framerate independent
      galleryWrapper.scrollLeft += scrollSpeed * elapsed * 0.1;

      // Reset scrollLeft to 0 when we've scrolled past the first half (original images)
      if (galleryWrapper.scrollLeft >= totalScrollWidth) {
        galleryWrapper.scrollLeft = galleryWrapper.scrollLeft - totalScrollWidth;
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Duplicate images array to create seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <section id="gallery">
      <div className="gallery-container">
        <div
          className="gallery-wrapper"
          ref={galleryWrapperRef}
          style={{ overflow: "hidden", whiteSpace: "nowrap" }}
        >
          <div
            className="gallery"
            style={{
              display: "inline-flex",
              gap: "1.5rem",
              padding: "1rem 2rem",
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
                  cursor: "pointer",
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
                    transition: "transform 0.4s ease, filter 0.4s ease",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;

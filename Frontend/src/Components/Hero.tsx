import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const imgRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const imgEl = imgRef.current;
    if (!imgEl) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1; // -1 to 1
      const y = (e.clientY / innerHeight) * 2 - 1; // -1 to 1

      // small translate based on cursor position
      const tx = x * 12; // px
      const ty = y * 8; // px

      imgEl.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(-8deg)`;
    };

    const handleLeave = () => {
      if (!imgEl) return;
      imgEl.style.transform = `translate3d(0px, 0px, 0) rotate(-8deg)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const handleAddBookClick = () => {
    navigate("/create-book");
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-grid">
          {/* Left Text */}
          <div className="hero-text">
            <h1 className="hero-title">Start your Literary Journey</h1>
            <p className="hero-subtitle">Beyond Reviews, Books</p>

            <div className="hero-achievements">
              <div className="hero-achievement">
                <div className="hero-achievement-value">+4</div>
                <div className="hero-achievement-label">Home layouts</div>
              </div>
              <div className="hero-achievement">
                <div className="hero-achievement-value">100%</div>
                <div className="hero-achievement-label">Review widgets</div>
              </div>
              <div className="hero-achievement">
                <div className="hero-achievement-value">$130</div>
                <div className="hero-achievement-label">Saved</div>
              </div>
            </div>

            <div className="hero-cta">
              <button
                className="hero-btn-secondary"
                onClick={handleAddBookClick}
              >
                Add Book
              </button>
              <button className="hero-btn-primary">Review Book</button>
            </div>
          </div>

          {/* Right Image */}
          <div className="hero-image-col">
            <div
              ref={imgRef}
              style={{ transform: "rotate(-8deg)" }}
              className="hero-image-outer"
            >
              <img src="/hero_bg.png" alt="hero" className="hero-image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const navbarRef = useRef<HTMLElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/auth");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const navbarHeight = navbarRef.current?.offsetHeight || 0;

      if (currentScrollY < navbarHeight) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (
        currentScrollY > lastScrollY.current &&
        currentScrollY > navbarHeight
      ) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      ref={navbarRef}
      className={`navbar ${!isVisible ? "navbar-hidden" : ""}`}
    >
      <div className="navbar-container">
        <div className="mobile-menu-toggle" onClick={toggleMenu}>
          <div className={`hamburger ${isMenuOpen ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="navbar-desktop">
          <div className="nav-left">
            <Link to="/" className="nav-item dropdown">
              <span>HOMES</span>
            </Link>
            <div className="nav-item dropdown">
              <span>FEATURES</span>
            </div>
            <div className="nav-item dropdown">
              <span>PAGES</span>
            </div>
          </div>

          <div className="logo">
            <h1>BOOK MELA</h1>
            <p>AUTHOR & WRITER</p>
          </div>

          <div className="nav-right">
            <div className="nav-item dropdown">
              <span>SHOP</span>
            </div>
            <div className="nav-item">
              <span>EVENT</span>
            </div>
            <div className="nav-item dropdown">
              <span>BLOG</span>
            </div>

              {user ? (
                <div className="nav-utilities">
                    <div className="utility-icon">
                        <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
              ) : (
                <Link to="/auth" className="login-btn">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="navbar-mobile-logo">
          <div className="logo">
            <h1>Book Mela</h1>
            <p>AUTHOR & WRITER</p>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-items">
              <button className="mobile-menu-item">HOMES</button>
              <button className="mobile-menu-item">FEATURES</button>
              <button className="mobile-menu-item">PAGES</button>
              <button className="mobile-menu-item">SHOP</button>
              <button className="mobile-menu-item">EVENT</button>
              <button className="mobile-menu-item">BLOG</button>
              {user ? (
                <button onClick={handleLogout} className="mobile-menu-item">
                  Logout
                </button>
              ) : (
                <Link to="/auth" className="mobile-menu-item">
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
    </nav>
  );
};

export default Navbar;

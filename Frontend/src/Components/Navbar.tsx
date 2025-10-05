import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../Context/UserContext";
import "./Navbar.css";

const genres = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Romance",
  "Biography",
  "History",
  "Horror",
];

const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const navbarRef = useRef<HTMLElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/auth");
  };

  const handleGenreClick = (genre: string) => {
    navigate("/books", { state: { genre } });
    setIsGenresOpen(false);
    setIsMenuOpen(false);
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
            <Link to="/" className="nav-item">
              HOME
            </Link>
            <Link to="/books" className="nav-item">
              ALL BOOKS
            </Link>
            <div className="nav-item dropdown">
              <span>GENRES</span>
              <div className="dropdown-menu">
                {genres.map((genre) => (
                  <div
                    key={genre}
                    className="dropdown-item"
                    onClick={() => handleGenreClick(genre)}
                  >
                    {genre}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="logo" onClick={() => navigate("/")}>
            <h1>BOOK MELA</h1>
            <p>AUTHOR & WRITER</p>
          </div>

          <div className="nav-right">
            {user ? (
              <div className="nav-utilities">
                <div
                  className="utility-icon"
                  onClick={() => navigate("/profile")}
                >
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

        <div className="navbar-mobile-logo">
          <div className="logo" onClick={() => navigate("/")}>
            <h1>Book Mela</h1>
            <p>AUTHOR & WRITER</p>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-items">
              <Link to="/" className="mobile-menu-item" onClick={toggleMenu}>
                HOME
              </Link>
              <Link
                to="/books"
                className="mobile-menu-item"
                onClick={toggleMenu}
              >
                ALL BOOKS
              </Link>
              <div
                className="mobile-menu-item"
                onClick={() => setIsGenresOpen(!isGenresOpen)}
              >
                GENRES
              </div>
              {isGenresOpen && (
                <div className="mobile-submenu">
                  {genres.map((genre) => (
                    <div
                      key={genre}
                      className="mobile-submenu-item"
                      onClick={() => handleGenreClick(genre)}
                    >
                      {genre}
                    </div>
                  ))}
                </div>
              )}
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="mobile-menu-item"
                    onClick={toggleMenu}
                  >
                    PROFILE
                  </Link>
                  <button onClick={handleLogout} className="mobile-menu-item">
                    LOGOUT
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="mobile-menu-item"
                  onClick={toggleMenu}
                >
                  LOGIN
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

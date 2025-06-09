import React, { useEffect, useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home"); // Track active nav

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  // Update active nav and close menu on nav click
  const handleNavClick = (id) => {
    setActiveNav(id);
    closeMenu();
  };

  // Add or remove blur class to main content
  useEffect(() => {
    const content = document.getElementById("main-content");
    if (content) {
      if (menuOpen) {
        content.classList.add("blurred");
      } else {
        content.classList.remove("blurred");
      }
    }
  }, [menuOpen]);

  return (
    <header>
      <div className="logo">
        <h2>A&S</h2>
      </div>
      <nav>
        <div
          id="menu-icon"
          onClick={toggleMenu}
          dangerouslySetInnerHTML={{ __html: menuOpen ? "&times;" : "&#9776;" }}
          style={{ cursor: "pointer" }}
        />
        <ul id="mobile-menu" className={menuOpen ? "show" : ""}>
          {["home", "timeline", "gallery", "guestbook", "loveletters", "locker"].map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={activeNav === id ? "active" : ""}
                onClick={() => handleNavClick(id)}
              >
                {id === "home"
                  ? "Home"
                  : id === "timeline"
                  ? "Our Story"
                  : id === "gallery"
                  ? "Our Memories"
                  : id === "guestbook"
                  ? "Guestbook"
                  : id === "loveletters"
                  ? "Love Letter"
                  : id === "locker"
                  ? "Secret Message"
                  : ""}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <style>{`
        .blurred {
          filter: blur(5px);
          pointer-events: none;
          user-select: none;
        }
        a.active {
          color: #f00; /* Example active style */
          font-weight: bold;
        }
      `}</style>
    </header>
  );
}

export default Header;

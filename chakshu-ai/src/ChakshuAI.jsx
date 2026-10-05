import React, { useState, useEffect, useRef } from "react";

const astronomyQuotes = [
  "The cosmos is within us. We are made of star-stuff. – Carl Sagan",
  "To confine our attention to terrestrial matters would be to limit the human spirit. – Stephen Hawking",
  "Somewhere, something incredible is waiting to be known. – Carl Sagan",
  "Across the sea of space, the stars are other suns. – Carl Sagan",
  "Equipped with his five senses, man explores the universe around him and calls the adventure Science. – Edwin Hubble",
  "The nitrogen in our DNA, the calcium in our teeth, the iron in our blood, the carbon in our apple pies were made in the interiors of collapsing stars. – Carl Sagan",
  "We are all in the gutter, but some of us are looking at the stars. – Oscar Wilde",
  "The universe is under no obligation to make sense to you. – Neil deGrasse Tyson",
  "Look up at the stars and not down at your feet. – Stephen Hawking",
  "For small creatures such as we, the vastness is bearable only through love. – Carl Sagan",
  "Not only do we live among the stars, the stars live within us. – Neil deGrasse Tyson",
  "Astronomy compels the soul to look upwards and leads us from this world to another. – Plato",
  "The sky calls to us. If we do not destroy ourselves, we will one day venture to the stars. – Carl Sagan",
  "The universe is a pretty big place. If it's just us, seems like an awful waste of space. – Carl Sagan",
  "Every one of us is, in the cosmic perspective, precious. – Carl Sagan",
];

function TypewriterQuotes({
  quotes,
  typingSpeed = 30,      // Fast typing
  pause = 700,           // Short pause after typing
  eraseSpeed = 16,       // Fast erasing
  erasePause = 250,      // Short pause before next quote
  transitionDuration = 250, // Fast fade transition
}) {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isErasing, setIsErasing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [fade, setFade] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;

    const currentQuote = quotes[quoteIdx];
    if (!isErasing) {
      if (displayed.length < currentQuote.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(currentQuote.slice(0, displayed.length + 1));
        }, typingSpeed);
      } else {
        setIsPaused(true);
        timeoutRef.current = setTimeout(() => {
          setIsPaused(false);
          setIsErasing(true);
        }, pause);
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(currentQuote.slice(0, displayed.length - 1));
        }, eraseSpeed);
      } else {
        setFade(false);
        setIsPaused(true);
        timeoutRef.current = setTimeout(() => {
          setQuoteIdx((idx) => (idx + 1) % quotes.length);
          setFade(true);
          setIsPaused(false);
          setIsErasing(false);
        }, erasePause);
      }
    }
    return () => clearTimeout(timeoutRef.current);
  }, [
    displayed,
    isErasing,
    isPaused,
    quoteIdx,
    quotes,
    typingSpeed,
    pause,
    eraseSpeed,
    erasePause,
    transitionDuration,
  ]);

  useEffect(() => {
    setDisplayed("");
  }, [quoteIdx]);

  return (
    <div
      style={{
        marginTop: "48px",
        minHeight: "48px",
        fontSize: "1.25em",
        color: "#aad4ff",
        fontFamily: "Consolas, 'Courier New', monospace",
        textAlign: "center",
        letterSpacing: "0.5px",
        fontWeight: 500,
        position: "relative",
        transition: "color 0.5s",
        userSelect: "none",
      }}
    >
      <span
        style={{
          display: "inline-block",
          transition: `opacity ${transitionDuration}ms cubic-bezier(.4,0,.2,1)`,
          opacity: fade ? 1 : 0,
        }}
      >
        {displayed}
      </span>
      <span
        style={{
          display: "inline-block",
          width: "1ch",
          background: "none",
          color: "#fff",
          fontWeight: "bold",
          animation: "blink-cursor 1.1s steps(1) infinite",
        }}
      >
        |
      </span>
      <style>{`
        @keyframes blink-cursor {
          0% { opacity: 1; }
          49% { opacity: 1; }
          50% { opacity: 0; }
          99% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function ChakshuAI() {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [stars, setStars] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [visibleSection, setVisibleSection] = useState("main-section");
  const [hoveredNav, setHoveredNav] = useState(null);

  // Smooth scroll handler for navigation links
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Show scroll-to-top button and animate sections on scroll
  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 200);

      // Section reveal logic
      const sections = ["main-section", "mission-section", "about-section"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight / 2) {
            setVisibleSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Create stars once on mount
  useEffect(() => {
    const starCount = 100;
    const generatedStars = [];
    for (let i = 0; i < starCount; i++) {
      generatedStars.push({
        id: i,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2,
        duration: 10 + Math.random() * 15,
        delay: Math.random() * 15,
      });
    }
    setStars(generatedStars);
  }, []);

  // Helper for nav active section
  const navSectionMap = {
    Home: "main-section",
    Mission: "mission-section",
    About: "about-section",
  };

  // Redirect handler for Start button
  const handleStartClick = () => {
    const targetUrl = process.env.REACT_APP_MODEL_URL || "http://127.0.0.1:8051/";
    window.location.href = targetUrl;
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
        }}
        src="/mylivewallpapers.com-Earth.mp4"
      />

      {/* Overlay Gradient */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))",
          zIndex: -1,
        }}
      ></div>

      {/* Stars Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        {stars.map(({ id, left, size, duration, delay }) => (
          <div
            key={id}
            style={{
              position: "absolute",
              top: "-5px",
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: "white",
              borderRadius: "50%",
              opacity: 0.8,
              animation: `fallDown ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
              filter: "drop-shadow(0 0 2px white)",
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h2 style={{ fontSize: "1.8em", letterSpacing: "1px", cursor: "default" }}>
          Chakshu.AI
        </h2>
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "32px",
            listStyle: "none",
            margin: 0,
            padding: 0,
            cursor: "pointer",
          }}
        >
          {["Home", "Mission", "About"].map((item) => {
            const isActive =
              visibleSection === navSectionMap[item];
            const isHovered = hoveredNav === item;
            return (
              <li
                key={item}
                className={`nav-link${isActive ? " active" : ""}${isHovered ? " hovered" : ""}`}
                style={{
                  position: "relative",
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "#fff" : "#aad4ff",
                  pointerEvents: "auto",
                  cursor: "pointer",
                  fontSize: isActive || isHovered ? "1.18em" : "1em",
                  transition:
                    "color 0.3s, opacity 0.3s, transform 0.3s, font-size 0.3s",
                  opacity: isActive ? 1 : 0.7,
                  transform: isActive || isHovered ? "scale(1.12)" : "scale(1)",
                  display: "inline-block",
                  padding: "2px 0",
                  minWidth: "60px",
                  textAlign: "center",
                }}
                onMouseOver={() => setHoveredNav(item)}
                onMouseOut={() => setHoveredNav(null)}
                onClick={() =>
                  item === "Home"
                    ? handleScroll("main-section")
                    : item === "About"
                    ? handleScroll("about-section")
                    : item === "Mission"
                    ? handleScroll("mission-section")
                    : null
                }
              >
                {item}
                <span
                  className="nav-underline"
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: -4,
                    width: isActive || isHovered ? "100%" : "0%",
                    height: "2px",
                    background: "#fff",
                    transition: "width 0.3s",
                    borderRadius: "2px",
                  }}
                ></span>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Hero Section */}
      <header
        id="main-section"
        className={`section ${visibleSection === "main-section" ? "visible" : ""}`}
        style={{
          textAlign: "center",
          marginTop: "80px",
          zIndex: 2,
          position: "relative",
          opacity: visibleSection === "main-section" ? 1 : 0,
          transform:
            visibleSection === "main-section"
              ? "translateY(0)"
              : "translateY(40px)",
          transition: "opacity 0.7s, transform 0.7s",
        }}
      >
        <h1
          style={{
            fontSize: "4em",
            margin: 0,
            textShadow: "0 0 20px rgba(255,255,255,0.5)",
            transition: "0.4s",
          }}
          onMouseOver={(e) =>
            (e.target.style.textShadow = "0 0 30px rgba(255,255,255,0.9)")
          }
          onMouseOut={(e) =>
            (e.target.style.textShadow = "0 0 20px rgba(255,255,255,0.5)")
          }
        >
          Hunting for Exoplanets with AI
        </h1>
        <p style={{ marginTop: 10, fontSize: "1.5em", opacity: 0.8 }}>
          An eye that can see beyond IMAGINATION
        </p>
      </header>

      {/* Main Section */}
      <main
        id="main-section-content"
        className={`section ${visibleSection === "main-section" ? "visible" : ""}`}
        style={{
          textAlign: "center",
          padding: "60px 20px",
          zIndex: 2,
          position: "relative",
          opacity: visibleSection === "main-section" ? 1 : 0,
          transform:
            visibleSection === "main-section"
              ? "translateY(0)"
              : "translateY(40px)",
          transition: "opacity 0.7s, transform 0.7s",
        }}
      >
        <p
          style={{
            maxWidth: 700,
            margin: "0 auto",
            lineHeight: 1.7,
            fontSize: "1.2em",
            opacity: 0.9,
          }}
        >
          Chakshu.AI – Where Technology Meets the Endless Cosmos Discovering
          Hidden Worlds That Have Never Been Seen Before
        </p>

        {/* Buttons */}
        <div style={{ marginTop: 40 }}>
          <button
            onClick={handleStartClick}
            onMouseEnter={() => setHoveredButton("start")}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              backgroundColor: hoveredButton === "start" ? "#ddd" : "white",
              color: "black",
              border: "none",
              borderRadius: "25px",
              padding: "15px 40px",
              fontSize: "1.3em",
              cursor: "pointer",
              boxShadow: hoveredButton === "start" ? "0 0 15px white" : "none",
              transition:
                "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
              transform: hoveredButton === "start" ? "scale(1.05)" : "scale(1)",
            }}
          >
            Start
          </button>
        </div>

        {/* Typewriter Quotes Below Start Button */}
        <TypewriterQuotes quotes={astronomyQuotes} />
      </main>

      {/* Mission Section */}
      <section
        id="mission-section"
        className={`section ${visibleSection === "mission-section" ? "visible" : ""}`}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.07)",
          marginTop: "150px",
          padding: "40px 20px",
          textAlign: "justify",
          zIndex: 2,
          position: "relative",
          opacity: visibleSection === "mission-section" ? 1 : 0,
          transform:
            visibleSection === "mission-section"
              ? "translateY(0)"
              : "translateY(40px)",
          transition: "opacity 0.7s, transform 0.7s",
        }}
      >
        <h2
          style={{
            marginBottom: 20,
            fontSize: "2em",
            letterSpacing: "1px",
            textShadow: "0 0 10px rgba(255,255,255,0.4)",
            textAlign: "center",
          }}
        >
          Mission
        </h2>
        <center style={{
            maxWidth: 700,
            margin: "0 auto",
            lineHeight: 1.7,
            fontSize: "1.1em",
            opacity: 0.9,
            textAlign: "center",
          }}>Our Mission: A World Away — Hunting for Exoplanets with AI</center>
        <p
          style={{
            maxWidth: 700,
            margin: "0 auto",
            lineHeight: 1.7,
            fontSize: "1.1em",
            opacity: 0.9,
            textAlign: "justify",
          }}
        >
          The search for worlds beyond our solar system has fascinated scientists and dreamers alike for centuries. With data from space missions like Kepler, K2, and TESS, humanity has already identified thousands of exoplanets — distant worlds orbiting other stars. Yet, many more remain hidden in the vast sea of data collected by these missions. At A World Away, our mission is to revolutionize how we discover new planets by harnessing the power of Artificial Intelligence (AI) and Machine Learning (ML). Instead of relying solely on manual analysis by astronomers, our AI models are designed to automatically scan, learn from, and interpret massive datasets from NASA’s open-source exoplanet archives. Using the transit method, these missions detect tiny dips in starlight when a planet passes in front of its star. Our AI system analyzes these light patterns — along with features like orbital period, transit duration, and planetary radius — to distinguish between confirmed exoplanets, planetary candidates, and false positives with remarkable accuracy.

But our mission doesn’t stop there. We aim to make exoplanet discovery more interactive and accessible through a user-friendly web interface where scientists, students, and enthusiasts can:

Upload or input new data for analysis

Explore how AI classifies potential exoplanets

Visualize key insights and predictions in real time

By combining space science and intelligent automation, we hope to uncover new worlds that have yet to be found — and inspire a new generation of explorers to look a world away for the answers to our biggest cosmic questions.
        </p>
      </section>

      {/* About / Developers Section */}
      <section
        id="about-section"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          marginTop: "150px",
          padding: "40px 20px",
          textAlign: "center",
          zIndex: 2,
          position: "relative",
        }}
      >
        <h2
          style={{
            marginBottom: 30,
            fontSize: "2em",
            letterSpacing: "1px",
            textShadow: "0 0 10px rgba(255,255,255,0.4)",
          }}
        >
          Developers
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "25px",
            fontSize: "1.1em",
            opacity: 0.9,
          }}
        >
          <a
            href="https://www.linkedin.com/in/ujjwal-chaudhary-3796b8377"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Ujjwal Chaudhary
          </a>
          <a
            href="https://www.linkedin.com/in/sachin-bhawala"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Sachin Bhawala
          </a>
          <a
            href="https://www.linkedin.com/in/shivam-sharma-6756962b0/"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Shivam Sharma
          </a>
          <a
            href="https://www.linkedin.com/in/gaurav-chandola-228498283/"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Gaurav Chandola
          </a>
          <a
            href="https://www.linkedin.com/in/sugandha-gumber-0366a9378/"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Sugandha Gumber
          </a>
          <a
            href="https://www.linkedin.com/in/sugandha-gumber-0366a9378/"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Ronak Mehta
          </a>
        </div>
      </section>

      {/* Scroll-to-top Arrow Button */}
      {showScrollTop && (
        <button
          aria-label="Scroll to top"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          style={{
            position: "fixed",
            bottom: "32px",
            right: "32px",
            zIndex: 100,
            background: "rgba(255,255,255,0.85)",
            color: "#222",
            border: "none",
            borderRadius: "50%",
            width: "48px",
            height: "48px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.3s, transform 0.3s",
            fontSize: "2em",
            outline: "none",
          }}
        >
          <span style={{ display: "block", transform: "translateY(2px)" }}>
            ▲
          </span>
        </button>
      )}

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          opacity: 0.7,
          fontSize: "0.9em",
          position: "relative",
          bottom: 0,
          width: "100%",
          zIndex: 2,
        }}
      >
        © {new Date().getFullYear()} Chakshu-AI — Exploring Space Intelligently
      </footer>

      {/* Styles including star animation and nav underline */}
      <style>{`
        body { margin: 0; background: black; scroll-behavior: smooth; }
        .nav-link {
          position: relative;
          transition: color 0.3s, opacity 0.3s, transform 0.3s, font-size 0.3s;
          display: inline-block;
          vertical-align: middle;
        }
        .nav-link .nav-underline {
          position: absolute;
          left: 0;
          bottom: -4px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: width 0.3s;
          width: 0%;
        }
        .nav-link.active .nav-underline,
        .nav-link.hovered .nav-underline {
          width: 100%;
        }
        .nav-link:hover {
          color: #fff;
          font-size: 1.18em;
          transform: scale(1.12);
        }
        .nav-link:hover .nav-underline {
          width: 100%;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        a {
          color: #aad4ff;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        a:hover {
          color: #fff;
          text-decoration: underline;
        }
        .section {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s, transform 0.7s;
        }
        .section.visible {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes fallDown {
          0% {
            transform: translateY(-10px);
            opacity: 0.8;
          }
          100% {
            transform: translateY(110vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

const linkStyle = {
  cursor: "pointer",
  padding: "6px 12px",
  borderRadius: "20px",
  border: "1px solid rgba(255,255,255,0.3)",
  boxShadow: "0 0 10px rgba(255,255,255,0.2)",
  transition: "all 0.3s ease",
  display: "inline-block",
  color: "inherit",
};




import "./LandingPage.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MouseTrail from "../MouseTrail/MouseTrail"
function LandingPage() {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const phrases = [
    "Full-Stack Software Engineer...",
    "Digital Marketer...",
    "Financial Educator...",
    "Game Developer...",
    "Music Producer...",
    "The Man, The Myth, The Legend..."
  ];

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentIndex < currentPhrase.length) {
          setDisplayText(currentPhrase.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentIndex > 0) {
          setDisplayText(currentPhrase.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          setIsDeleting(false);
          setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, currentPhraseIndex, phrases]);

  return (
    <div className="landing-container">
      <MouseTrail/>
      <div className="hero-section">
        <div className="hero-content">



            <div className="profile-section">

              <div className="profile-wrapper">
                 <div className="profile-inner">
                  <img
                    className="hero-profile-image"
                    src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1748132663/486354092_9289268864455853_8457108257314763719_n_nrrd2m.jpg"
                    alt="Profile"
                  />
                </div>
                {/* <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1748132663/486354092_9289268864455853_8457108257314763719_n_nrrd2m.jpg" alt="Profile" class="hero-profile-image" /> */}
              </div>

          

          </div>

          <div className="hero-text">
            <h1 className="hero-name">Dustin Bovee</h1>
            <div className="typewriter-container">
              <span className="typewriter-text">{displayText}</span>
              <span className="cursor">|</span>
            </div>
            <br/>
            <p className="hero-subtitle">
              Passionately creating innovative solutions
            </p>

            <div className="hero-buttons">
              <Link to="/portfolio" className="btn btn-primary">View My Work</Link>
              <Link to="/contact" className="btn btn-secondary">Get In Touch</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="quick-stats">
        <div className="stat-item">
          <h3>4+</h3>
          <p>Active Apps</p>
        </div>
        <div className="stat-item">
          <h3>12+</h3>
          <p>Extremely Satisfied Clients </p>
        </div>
        <div className="stat-item">
          <h3>50+</h3>
          <p>Technologies</p>
        </div>

      </div>


    </div>
  );
}

export default LandingPage;

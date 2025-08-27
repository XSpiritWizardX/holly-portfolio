



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
    "Film Enthusiast...",
    "TV Star...",
    "Fashion Fan...",
    "Animal Lover...",
    "Social Media Talent..."
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
                    src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1752268509/IMG_6061_hoeepp.jpg"
                    alt="Profile"
                  />
                </div>
                {/* <img src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1748132663/486354092_9289268864455853_8457108257314763719_n_nrrd2m.jpg" alt="Profile" class="hero-profile-image" /> */}
              </div>



          </div>

          <div className="hero-text">
            <h1 className="hero-name">Holly Bovee </h1>
            <div className="typewriter-container">
              <span className="typewriter-text">Actress / Model and {displayText}</span>
              <span className="cursor">|</span>
            </div>
            <br/>
            <p className="hero-subtitle">
              Working Hard For A Brighter Future
            </p>

            <div className="hero-buttons">
              <Link to="/portfolio" className="btn btn-primary">View My Work</Link>
              <Link to="/contact" className="btn btn-secondary">Get In Touch</Link>
            </div>
          </div>
        </div>
      </div>





    </div>
  );
}

export default LandingPage;

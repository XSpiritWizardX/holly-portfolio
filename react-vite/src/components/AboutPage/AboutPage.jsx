import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-content">
          <div className="about-text">
            <h1>About Dustin Bovee</h1>
            <p className="about-subtitle">Full-Stack Developer • Music Producer • Father of Five</p>
          </div>
          <div className="about-image">
            <img
              src="https://res.cloudinary.com/dl6ls3rgu/image/upload/e_background_removal/e_dropshadow:azimuth_220;elevation_60;spread_20/b_rgb:FFFFFF/f_png/v1747963856/472684932_8842676349115109_2028848718984112102_n_xm2fqm.jpg"
              alt="Dustin Bovee"
            />
          </div>
        </div>
      </div>

      <div className="about-sections">
        <section className="about-section">
          <h2>My Story</h2>
          <p>
            I'm a passionate full-stack developer with 888+ hours of intensive bootcamp training and a unique blend of technical and creative skills.
            As a proud husband and father of five incredible kids, family is my biggest inspiration and motivation for everything I do.
          </p>
          <p>
            My journey combines the logical world of software development with the creative realm of music production.
            I believe this unique perspective allows me to approach problems with both analytical precision and creative innovation.
          </p>
        </section>

        <section className="about-section">
          <h2>Education & Certifications</h2>
          <div className="education-grid">
            <div className="education-item">
              <h3>App Academy</h3>
              <p>Full Stack Software Engineering Bootcamp</p>
              <span>2025 • 888+ hours • less than 3% acceptance rate</span>
            </div>
            <div className="education-item">
              <h3>Google Certifications</h3>
              <p>Digital Marketing & E-commerce</p>
              <span>2023 • 7 courses • 7 certifications</span>
            </div>
            <div className="education-item">
              <h3>Glen Oaks Community College</h3>
              <p>Associates of General Studies</p>
              <span>2023</span>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>What Drives Me</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">👨‍👩‍👧‍👦</div>
              <h3>Family First</h3>
              <p>My wife and five kids are my biggest motivation and inspiration for everything I create.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🚀</div>
              <h3>Continuous Learning</h3>
              <p>I'm passionate about staying current with new technologies and constantly improving my skills.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🎨</div>
              <h3>Creative Problem Solving</h3>
              <p>I bring a unique creative perspective to technical challenges, finding innovative solutions.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🤝</div>
              <h3>Collaboration</h3>
              <p>I thrive in team environments where diverse perspectives lead to breakthrough solutions.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Beyond Coding</h2>
          <div className="hobbies-grid">
            <div className="hobby-item">
              <h3>🎵 Music Production</h3>
              <p>Creating original music in my home studio with Pro-Tools and Studio One</p>
            </div>
            <div className="hobby-item">
              <h3>🎮 Game Development</h3>
              <p>Building "The Dark Musician" - an epic 2D platformer with Unity Engine</p>
            </div>
            <div className="hobby-item">
              <h3>🌍 Travel</h3>
              <p>Exploring new cultures and dreaming of retirement in the Caribbean</p>
            </div>
            <div className="hobby-item">
              <h3>⚽ Sports</h3>
              <p>Playing and watching sports, especially soccer and fantasy leagues</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Fun Facts</h2>
          <div className="facts-list">
            <div className="fact-item">I can MIG, TIG, and STICK weld Aluminum, Steel, and Stainless Steel</div>
            <div className="fact-item">I play guitar, drums, piano, and many other instruments</div>
            <div className="fact-item">I've been married for 10 amazing years</div>
            <div className="fact-item">I love fantasy RPGs and worldbuilding</div>
            <div className="fact-item">I do 2D/3D modeling and animations</div>
            <div className="fact-item">I'm 35 years young and always learning</div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;

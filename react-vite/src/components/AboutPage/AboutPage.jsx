import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-content">
          <div className="about-text">
            <h1>About Dustin Bovee</h1>
            <p className="about-subtitle">Creative Visionary — Innovative Thinker</p>
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
  I&apos;m a dedicated full-stack software engineer with 888+ hours of intensive bootcamp training, specializing in modern web technologies including React, Python, Flask, and JavaScript. My comprehensive technical foundation spans both frontend and backend development, with hands-on experience building scalable applications, implementing RESTful APIs, and working with databases. As a committed professional and father of five, I bring exceptional time management skills, attention to detail, and the ability to thrive under pressure while maintaining high-quality code standards.
</p>

<p>
  My experience in video editing, photo manipulation, and creating claymation and stop-motion videos has developed my proficiency with various software tools and my understanding of frame-by-frame precision skills that translate beautifully to frontend animation libraries and performance optimization. The meticulous attention to detail required for stop-motion work mirrors the careful consideration needed for writing efficient, bug-free code. These multimedia skills also make me particularly valuable for teams working on content-rich applications or those requiring custom animations and interactive elements.
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
              <h3>Michigan Department of Insurance and Financial Services</h3>
              <p>MI Life Health and Accident producer</p>
              <span>2023 • Life, Accident, Health • <a className="anchorsaway" href="https://difs.state.mi.us/locators?searchtype=InsAgent" >20620121</a> </span>
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
             <div className="education-item">
              <h3>Glen Oaks Community College</h3>
              <p>Certified Emergency Nurse Aide</p>
              <span>2017 • C.E.N.A. • Basic Life Support • CPR • First Responder</span>
            </div>
             <div className="education-item">
              <h3>Full Sail University</h3>
              <p>Bachelors of Music</p>
              <span>2013 </span>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>What Drives Me</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">👨‍👩‍👧‍👦</div>
              <h3>Family First</h3>
              <p>My wife and five kids are my biggest motivation and inspiration for everything I create and work for.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🚀</div>
              <h3>Continuous Learning</h3>
              <p>I&apos;m passionate about staying current with new technologies and constantly improving my skills.</p>
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
              <h3>Music Production</h3>
              <p>Creating original music in my home studio with Pro-Tools. Over 100+ songs written... You probably heard one of mine and you didn&apos;t even know it.</p>
            </div>
            <div className="hobby-item">
              <h3>Film Making</h3>
              <p>Creating visually stunning works of art in videos. Studying Film theory, video editing tips and tricks, and Directing.</p>
            </div>
            <div className="hobby-item">
              <h3>Travel</h3>
              <p>Exploring new cultures and dreaming of retirement in the Caribbean. I love being out in nature and exploring the earth.</p>
            </div>
            <div className="hobby-item">
              <h3>Sports</h3>
              <p>Playing and watching sports, especially Football and Hockey. </p>
            </div>
          </div>
        </section>


      </div>
    </div>
  );
}

export default AboutPage;

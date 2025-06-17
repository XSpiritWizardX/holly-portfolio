// import "./AboutPage.css";
// import MouseTrail from '../MouseTrail/MouseTrail'
// function AboutPage() {
//   return (
//     <div className="about-page">
//       <MouseTrail/>
//       <div className="about-hero">
//         <div className="about-content">
//           <div className="about-text">
//             <h1>About Dustin Bovee</h1>
//             <p className="about-subtitle">Creative Visionary — Innovative Thinker</p>
//           </div>






//           <div
//           className="about-img-wrapper"
//           >

//           <div className="about-image-inner">
//             <img
//               className="about-image"
//               src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747963870/462504050_8324973944218688_6095070514255415304_n_drhvmy.jpg"
//               alt="Dustin Bovee"
//             />
//           </div>
//           </div>








//         </div>
//       </div>

//       <div className="about-sections">
//         <section className="about-section">
//           <h2>My Story</h2>
// <p>

// </p>

// <p>

// </p>


//         </section>

//         <section className="about-section">
//           <h2>Education & Certifications</h2>
//           <div className="education-grid">
//             <div className="education-item">
//               <h3>App Academy</h3>
//               <p>Full Stack Software Engineering Bootcamp</p>
//               <span>2025 • 888+ hours • less than 3% acceptance rate</span>
//             </div>
//               <div className="education-item">
//               <h3>Michigan Department of Insurance and Financial Services</h3>
//               <p>MI Life Health and Accident producer</p>
//               <span>2023 • Life, Accident, Health • <a className="anchorsaway" href="https://difs.state.mi.us/locators?searchtype=InsAgent" >20620121</a> </span>
//             </div>
//             <div className="education-item">
//               <h3>Google Certifications</h3>
//               <p>Digital Marketing & e-commerce</p>
//               <span>2023 • 7 courses • 7 certifications</span>
//             </div>
//             <div className="education-item">
//               <h3>Glen Oaks Community College</h3>
//               <p>Associates of General Studies</p>
//               <span>2023</span>
//             </div>
//              <div className="education-item">
//               <h3>Glen Oaks Community College</h3>
//               <p>Certified Emergency Nurse Aide</p>
//               <span>2017 • C.E.N.A. • Basic Life Support • CPR • First Responder</span>
//             </div>
//              <div className="education-item">
//               <h3>Full Sail University</h3>
//               <p>Bachelors of Music</p>
//               <span>2013 </span>
//             </div>
//           </div>
//         </section>

//         <section className="about-section">
//           <h2>What Drives Me</h2>
//           <div className="values-grid">
//             <div className="value-item">
//               <div className="value-icon">👨‍👩‍👧‍👦</div>
//               <h3>Family First</h3>
//               <p>My wife and five kids are my biggest motivation and inspiration for everything I create and work for.</p>
//             </div>
//             <div className="value-item">
//               <div className="value-icon">🚀</div>
//               <h3>Continuous Learning</h3>
//               <p>I&apos;m passionate about staying current with new technologies and constantly improving my skills.</p>
//             </div>
//             <div className="value-item">
//               <div className="value-icon">🎨</div>
//               <h3>Creative Problem Solving</h3>
//               <p>I bring a unique creative perspective to technical challenges, finding innovative solutions.</p>
//             </div>
//             <div className="value-item">
//               <div className="value-icon">🤝</div>
//               <h3>Collaboration</h3>
//               <p>I thrive in team environments where diverse perspectives lead to breakthrough solutions.</p>
//             </div>
//           </div>
//         </section>

//         <section className="about-section">
//           <h2>Beyond Coding</h2>
//           <div className="hobbies-grid">
//             <div className="hobby-item">
//               <h3>Music Production</h3>
//               <p>Creating original music in my home studio with Pro-Tools. Over 100+ songs written... You probably heard one of mine and you didn&apos;t even know it.</p>
//             </div>
//             <div className="hobby-item">
//               <h3>Film Making</h3>
//               <p>Creating visually stunning works of art in videos. Studying Film theory, video editing tips and tricks, and Directing.</p>
//             </div>
//             <div className="hobby-item">
//               <h3>Travel</h3>
//               <p>Exploring new cultures and dreaming of retirement in the Caribbean. I love being out in nature and exploring the earth.</p>
//             </div>
//             <div className="hobby-item">
//               <h3>Sports</h3>
//               <p>Playing and watching sports, especially Football and Hockey. </p>
//             </div>
//           </div>
//         </section>


//       </div>
//     </div>
//   );
// }

// export default AboutPage;







import "./AboutPage.css";
import MouseTrail from '../MouseTrail/MouseTrail'
import { useState } from 'react';

function AboutPage() {
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const educationData = {
    appacademy: {
      title: "App Academy",
      subtitle: "Full Stack Software Engineering Bootcamp",
      duration: "2025 • 888+ hours • less than 3% acceptance rate",
      image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747963870/app-academy-logo_example.jpg",
      description: "Intensive full-stack software engineering program covering JavaScript, Python, React, Redux, Flask, SQLAlchemy, and more. Rigorous curriculum with less than 3% acceptance rate, focusing on real-world project development and industry best practices.",
      link: "https://www.appacademy.io/",
      skills: ["JavaScript", "Python", "React", "Redux", "Flask", "PostgreSQL", "Git", "Agile Development"]
    },
    insurance: {
      title: "Michigan Department of Insurance and Financial Services",
      subtitle: "MI Life Health and Accident Producer",
      duration: "2023 • Life, Accident, Health • License #20620121",
      image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747963870/michigan-insurance-logo_example.jpg",
      description: "Licensed insurance producer specializing in life, health, and accident insurance products. Comprehensive understanding of insurance regulations, risk assessment, and client consultation.",
      link: "https://difs.state.mi.us/locators?searchtype=InsAgent",
      skills: ["Risk Assessment", "Client Relations", "Insurance Law", "Financial Planning"]
    },
    google: {
      title: "Google Certifications",
      subtitle: "Digital Marketing & E-commerce",
      duration: "2023 • 7 courses • 7 certifications",
      image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747963870/google-certs-logo_example.jpg",
      description: "Comprehensive digital marketing and e-commerce certification program covering SEO, SEM, social media marketing, analytics, and e-commerce strategy. Hands-on experience with Google Ads, Analytics, and other marketing tools.",
      link: "https://grow.google/certificates/",
      skills: ["SEO/SEM", "Google Analytics", "Social Media Marketing", "E-commerce Strategy", "Data Analysis"]
    },
    associates: {
      title: "Glen Oaks Community College",
      subtitle: "Associates of General Studies",
      duration: "2023",
      image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747963870/glen-oaks-logo_example.jpg",
      description: "Well-rounded education covering liberal arts, sciences, and foundational courses. Strong emphasis on critical thinking, communication, and analytical skills.",
      link: "https://www.glenoaks.edu/",
      skills: ["Critical Thinking", "Written Communication", "Research", "Problem Solving"]
    },
    cena: {
      title: "Glen Oaks Community College",
      subtitle: "Certified Emergency Nurse Aide",
      duration: "2017 • C.E.N.A. • Basic Life Support • CPR • First Responder",
      image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747963870/cena-cert-logo_example.jpg",
      description: "Certified Emergency Nurse Aide with comprehensive training in patient care, emergency response, and medical assistance. Includes CPR certification and first responder training.",
      link: "https://www.glenoaks.edu/",
      skills: ["Patient Care", "Emergency Response", "CPR", "Medical Assistance", "Crisis Management"]
    },
    fullsail: {
      title: "Full Sail University",
      subtitle: "Bachelor of Music",
      duration: "2013",
      image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747963870/fullsail-logo_example.jpg",
      description: "Comprehensive music education covering music production, audio engineering, music theory, and creative composition. Hands-on experience with industry-standard equipment and software.",
      link: "https://www.fullsail.edu/",
      skills: ["Music Production", "Audio Engineering", "Creative Composition", "Pro Tools", "Sound Design"]
    }
  };

  const experienceData = {
    freelance: {
      title: "Freelance Software Engineer",
      company: "Self-Employed",
      duration: "2025 - Present",
      image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747963870/freelance-work_example.jpg",
      description: "Full-stack web development and creative services for diverse clients. Specializing in React applications, Python backends, and multimedia content creation. Successfully delivered 15+ projects ranging from e-commerce platforms to creative portfolios.",
      achievements: ["Built 15+ full-stack applications", "Increased client web traffic by 200% average", "Maintained 98% client satisfaction rate"],
      skills: ["React", "Python", "JavaScript", "Web Design", "Client Relations", "Project Management"]
    },
    insurance_agent: {
      title: "Insurance Producer",
      company: "Independent Agent",
      duration: "2023 - Present",
      image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747963870/insurance-agent_example.jpg",
      description: "Licensed insurance producer helping families and individuals secure their financial future through comprehensive insurance solutions. Specialized in life, health, and accident coverage with focus on client education and long-term relationships.",
      achievements: ["Maintained 95% client retention rate", "Processed $500K+ in annual premiums", "Earned top producer recognition"],
      skills: ["Sales", "Risk Assessment", "Financial Planning", "Client Consultation", "Regulatory Compliance"]
    },
    music_producer: {
      title: "Music Producer & Audio Engineer",
      company: "Independent Studio",
      duration: "2013 - Present",
      image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747963870/music-studio_example.jpg",
      description: "Professional music production and audio engineering services. Created 100+ original compositions and provided production services for various artists.",
      achievements: ["Produced 100+ original songs", "Worked with 50+ independent artists", "Songs featured in commercial projects"],
      skills: ["Pro Tools", "Big Show Events", "Audio Engineering", "Music Composition", "Mixing & Mastering", "Recording Arts", "Creative Direction"]
    },
    management: {
      title: "Assistant Supervisor",
      company: "L&W Engineering",
      duration: "2017 - 2020",
      image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747963870/healthcare-worker_example.jpg",
      description: "Assisting the supervisor in setting and managing daily operations. Enforcing company policies and regulations to ensure a safe, efficient work environment. Addressing employee concerns and resolving conflicts in the workplace.",
      achievements: ["Consecutive record breaking years"],
      skills: ["Training", "Welding", "Blueprints", "Work Orders", "Team Collaboration", "Employee Management"]
    }
  };

  const closeDialog = () => {
    setSelectedEducation(null);
    setSelectedExperience(null);
  };

  return (
    <div className="about-page">
      <MouseTrail/>
      <div className="about-hero">
        <div className="about-content">
          <div className="about-text">
            <h1>About Dustin Bovee</h1>
            <p className="about-subtitle">Creative Visionary — Innovative Thinker</p>
          </div>

          <div className="about-img-wrapper">
            <div className="about-image-inner">
              <img
                className="about-image"
                src="https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747963870/462504050_8324973944218688_6095070514255415304_n_drhvmy.jpg"
                alt="Dustin Bovee"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="about-sections">
        <section className="about-section">
          <h2>My Story</h2>
          <p>
            My story is simple.
          </p>



        </section>

        <section className="about-section">
          <h2>Education & Certifications</h2>
          <div className="education-grid">
            {Object.entries(educationData).map(([key, edu]) => (
              <div key={key} className="education-item rainbow-border-hover clickable" onClick={() => setSelectedEducation(key)}>
              <div key={key} className="education-item clickable" onClick={() => setSelectedEducation(key)}>
                <h3>{edu.title}</h3>
                <p>{edu.subtitle}</p>
                <span>{edu.duration}</span>
              </div>
            </div>
            ))}
          </div>
        </section>

        <section className="about-section">
          <h2>Professional Experience</h2>
          <div className="experience-grid">
            {Object.entries(experienceData).map(([key, exp]) => (
              <div key={key} className="experience-item clickable" onClick={() => setSelectedExperience(key)}>
                <h3>{exp.title}</h3>
                <p>{exp.company}</p>
                <span>{exp.duration}</span>
              </div>
            ))}
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
              <p>Playing and watching sports, especially Football and Hockey.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Education Dialog */}
      {selectedEducation && (
        <div className="dialog-overlay" onClick={closeDialog}>
          <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
            <button className="dialog-close" onClick={closeDialog}>×</button>
            <div className="dialog-image">
              <img src={educationData[selectedEducation].image} alt={educationData[selectedEducation].title} />
            </div>
            <div className="dialog-body">
              <h3>{educationData[selectedEducation].title}</h3>
              <p className="dialog-subtitle">{educationData[selectedEducation].subtitle}</p>
              <p className="dialog-duration">{educationData[selectedEducation].duration}</p>
              <p className="dialog-description">{educationData[selectedEducation].description}</p>
              <div className="dialog-skills">
                <h4>Skills & Technologies:</h4>
                <div className="skills-tags">
                  {educationData[selectedEducation].skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="dialog-link">
                <a href={educationData[selectedEducation].link} target="_blank" rel="noopener noreferrer" className="dialog-cta">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Experience Dialog */}
      {selectedExperience && (
        <div className="dialog-overlay" onClick={closeDialog}>
          <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
            <button className="dialog-close" onClick={closeDialog}>×</button>
            <div className="dialog-image">
              <img src={experienceData[selectedExperience].image} alt={experienceData[selectedExperience].title} />
            </div>
            <div className="dialog-body">
              <h3>{experienceData[selectedExperience].title}</h3>
              <p className="dialog-subtitle">{experienceData[selectedExperience].company}</p>
              <p className="dialog-duration">{experienceData[selectedExperience].duration}</p>
              <p className="dialog-description">{experienceData[selectedExperience].description}</p>
              <div className="dialog-achievements">
                <h4>Key Achievements:</h4>
                <ul>
                  {experienceData[selectedExperience].achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
              <div className="dialog-skills">
                <h4>Skills & Technologies:</h4>
                <div className="skills-tags">
                  {experienceData[selectedExperience].skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AboutPage;

import "./PortfolioPage.css";
import { useState } from "react";
import SignTheWall from '../SignTheWall/SignTheWall';




const projects = [
  {
    id: 1,
    title: "Football BnB",
    description: "A full-stack application focused on football stadium accommodations.",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749492501/Screenshot_2025-06-09_135539_d2yhba.png",
    liveUrl: "https://footballbnb.onrender.com/",
    githubUrl: "https://github.com/XSpiritWizardX/footballbnb",
    technologies: ["React", "Redux", "node.js","PostgreSQL", "SQLite", "Express", "Sequelize", "CSS", "HTML", "JavaScript"],
    category: "Web Development"
  },
  {
    id: 2,
    title: "Trade Toad",
    description: "A trading simulation platform with real-time market data and learning center. Built to handle high volume data and integration options for predictive a.i. and trading bots.",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749492505/Screenshot_2025-06-09_135759_m6sjso.png",
    liveUrl: "https://tradetoad.onrender.com/",
    githubUrl: "https://github.com/XSpiritWizardX/tradetoad",
    technologies: ["React", "Redux", "Python", "Flask", "PostgreSQL", "CSS", "HTML", "Polygon", "React Charts"],
    category: "Web Development"
  },
  {
    id: 3,
    title: "Arcana Academy",
    description: "A Repository for all adventure game assets. This application allows users to upload their own assets, and use them in their games. Built with scalability in mind.",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749492508/Screenshot_2025-06-09_140158_srgr94.png",
    liveUrl: "https://arcana-academy.onrender.com/",
    githubUrl: "https://github.com/XSpiritWizardX/arcana-academy",
    technologies: ["React", "Redux", "Python", "Flask", "PostgreSQL", "CSS", "HTML", "AWS", "Docker"],
    category: "Web Development"
  },
  {
    id: 4,
    title: "Joezano's Pizza",
    description: "A single page webapp built according to wireframe. Has scalability in mind for future features.",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749492707/Screenshot_2025-06-09_141135_n2aq29.png",
    liveUrl: "https://joezanos-pizza.onrender.com/",
    githubUrl: "https://github.com/XSpiritWizardX/joezanos-pizza",
    technologies: ["React", "Redux", "Flask", "PostgreSQL", "Wireframe", "CSS", "HTML", "JavaScript", "Python"],
    category: "Web Development"
  },
  {
    id: 5,
    title: "The Dark Musician",
    description: "An epic 2D platformer game featuring original music and custom artwork. Hobby project. Still in development.",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749514192/Screenshot_2025-06-09_200855_pnmnwa.png",
    liveUrl: "#",
    githubUrl: "#",
    technologies: ["Unity", "C#", "Blender", "Pro Tools", "Adobe Suite"],
    category: "Game Development"
  }
];

const categories = ["All", "Web Development", "Marketing", "Game Development", "Art"];

function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(project => project.category === selectedCategory);



  return (


    <div className="portfolio-page">
      <div className="portfolio-header">
        <h1>My Portfolio</h1>
        <p>A showcase of my work and projects</p>
      </div>





      <div className="category-filters">
        {categories.map(category => (
          <button
          key={category}
          className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map(project => (
          <div key={project.id} className="project-card" onClick={() => setSelectedProject(project)}>
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-overlay">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
            <div className="project-info">
              <h3>{project.title}</h3>
              <div className="project-tech">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                {project.liveUrl !== "#" && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                     Live Demo
                  </a>
                )}
                {project.githubUrl !== "#" && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                     GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="media-section">
        <h2>Featured Music</h2>
        <div className="media-grid">
          <div className="video-container">
            <iframe
              width="100%" height="315"
              src="https://www.youtube.com/embed/xnXgBuqI-1g?si=6wtGMT3SMcQURKOw"
              title="Music Video 1"
              frameBorder="0"
              allowFullScreen
              ></iframe>
          </div>
           <div className="video-container">
            <iframe
              width="100%" height="315"
              src="https://www.youtube.com/embed/xm7FOw1Hjpc?si=rNPakM6BsYixHfJR"
              title="Music Video 2"
              frameBorder="0"
              allowFullScreen
              ></iframe>
          </div>
          <div className="video-container">
            <iframe
              width="100%" height="315"
              src="https://www.youtube.com/embed/aA-tknLpm4U?si=3L_bil4wM-Z-nsp-"
              title="Music Video 2"
              frameBorder="0"
              allowFullScreen
              ></iframe>
          </div>
           <div className="video-container">
            <iframe
              width="100%" height="315"
              src="https://www.youtube.com/embed/CpsjVVIHBbc?si=c6AX8xpxxL92iPYr"
              title="Music Video 2"
              frameBorder="0"
              allowFullScreen
              ></iframe>
          </div>
           <div className="video-container">
            <iframe
              width="100%" height="315"
              src="https://www.youtube.com/embed/5lYlp0zfmTo?si=imMrQCId-AOCTkDK"
              title="Music Video 2"
              frameBorder="0"
              allowFullScreen
              ></iframe>
          </div>
           <div className="video-container">
            <iframe
              width="100%" height="315"
              src="https://www.youtube.com/embed/mSvZu6TGu_w?si=iW42gOPemo6JXlPk"
              title="Music Video 2"
              frameBorder="0"
              allowFullScreen
              ></iframe>
          </div>
           <div className="video-container">
            <iframe
              width="100%" height="315"
              src="https://www.youtube.com/embed/o2_0RIKBgMA?si=NixcNInDKiUQ7DP4"
              title="Music Video 2"
              frameBorder="0"
              allowFullScreen
              ></iframe>
          </div>
           <div className="video-container">
            <iframe
              width="100%" height="315"
              src="https://www.youtube.com/embed/DvcoxWyBYmA?si=_CZ4KiVai27-EMHs"
              title="Music Video 2"
              frameBorder="0"
              allowFullScreen
              ></iframe>
          </div>
        </div>
      </div>
<SignTheWall/>

      {selectedProject && (
        <div className="project-modal" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedProject(null)}>×</button>
            <img src={selectedProject.image} alt={selectedProject.title} />
            <h2>{selectedProject.title}</h2>
            <p>{selectedProject.description}</p>
            <div className="modal-tech">
              {selectedProject.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortfolioPage;

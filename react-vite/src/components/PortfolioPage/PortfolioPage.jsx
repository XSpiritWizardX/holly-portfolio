import "./PortfolioPage.css";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Football BnB",
    description: "A full-stack Airbnb clone focused on football stadium accommodations. Built with React, Flask, and PostgreSQL.",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747963870/462504050_8324973944218688_6095070514255415304_n_drhvmy.jpg",
    liveUrl: "https://footballbnb.onrender.com/",
    githubUrl: "https://github.com/XSpiritWizardX/footballbnb",
    technologies: ["React", "Flask", "PostgreSQL", "SQLAlchemy", "CSS"],
    category: "Web Development"
  },
  {
    id: 2,
    title: "Trade Toad",
    description: "A trading platform application with real-time features and user authentication.",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747963870/485761821_9289269257789147_3271802936818663508_n_v9keh4.jpg",
    liveUrl: "https://tradetoad.onrender.com/",
    githubUrl: "https://github.com/XSpiritWizardX/tradetoad",
    technologies: ["React", "Express", "Node.js", "Redux", "WebSocket"],
    category: "Web Development"
  },
  {
    id: 3,
    title: "Arcana Academy",
    description: "A magical learning platform with interactive features and user progress tracking.",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1748132681/485807983_9289284137787659_7415467271367767227_n_vytilr.jpg",
    liveUrl: "https://arcana-academy.onrender.com/",
    githubUrl: "https://github.com/XSpiritWizardX/arcana-academy",
    technologies: ["React", "Python", "Flask", "PostgreSQL", "Redux"],
    category: "Web Development"
  },
  {
    id: 4,
    title: "Joezano's Pizza",
    description: "A restaurant ordering system with menu management and order tracking.",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1748132663/486354092_9289268864455853_8457108257314763719_n_nrrd2m.jpg",
    liveUrl: "https://joezanos-pizza.onrender.com/",
    githubUrl: "https://github.com/XSpiritWizardX/joezanos-pizza",
    technologies: ["React", "Express", "MongoDB", "Node.js", "Stripe"],
    category: "Web Development"
  },
  {
    id: 5,
    title: "The Dark Musician",
    description: "An epic 2D platformer game featuring original music and custom artwork.",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1747867182/melody_mih8nb.png",
    liveUrl: "#",
    githubUrl: "#",
    technologies: ["Unity", "C#", "Blender", "Pro Tools", "Adobe Suite"],
    category: "Game Development"
  }
];

const categories = ["All", "Web Development", "Game Development", "Music"];

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
                    🌐 Live Demo
                  </a>
                )}
                {project.githubUrl !== "#" && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                    📁 GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="media-section">
        <h2>Featured Media</h2>
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
              src="https://www.youtube.com/embed/aA-tknLpm4U?si=3L_bil4wM-Z-nsp-"
              title="Music Video 2"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

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

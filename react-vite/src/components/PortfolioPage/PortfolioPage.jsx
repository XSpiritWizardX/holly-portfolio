import "./PortfolioPage.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import MouseTrail from '../MouseTrail/MouseTrail'




const projects = [





  {
    id: 1,
    title: "Makeup Artist Clicker Game Consultant",
    description: "A makeup clicker game designed to test your makeup knowledge.",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749614962/Screenshot_2025-06-11_000857_lz9nfu.png",
    liveUrl: "/clicker",
    githubUrl: "#",
    skills: ["Makeup Experience", "Consulting"],
    category: "Games",
    isInternal: true
  },
  {
    id: 2,
    title: "Maze Hunter Sound Effects",
    description: "A maze game to get to know me better.",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749601690/Screenshot_2025-06-10_202436_t5yu4h.png",
    liveUrl: "/maze-game",
    githubUrl: "#",
    skills: ["Voice Acting", "Studio Recording"],
    category: "Voice Acting",
    isInternal: true
  },

];

const categories = ["All", "Acting", "Modeling", "Voice Acting", "Monologues", "Charity","Games"];








function PortfolioPage() {


  const [selectedCategory, setSelectedCategory] = useState("Photos");
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const handleLiveUrlClick = (e, project) => {
    if (project.liveUrl !== "#") {
      if (project.isInternal) {
        return;
      } else {
        e.preventDefault();
        window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const ProjectCard = ({ project }) => {
    const isHovered = hoveredProject === project.id;
    const showVideo = project.video && isHovered;

      return (

        <div
        className="project-card-outti"
        >

      <div
        className="project-card"
        onMouseEnter={() => setHoveredProject(project.id)}
        onMouseLeave={() => setHoveredProject(null)}
        onClick={() => setSelectedProject(project)}
      >

        <div className="project-card-inner">
          <div className="project-image">
            {showVideo ? (
              <video
                className="project-video"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={project.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={project.image} alt={project.title} />
            )}

            {project.video && (
              <div className="video-indicator">
                <span className="play-icon">▶</span>
              </div>
            )}

            <div className="project-overlay">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>




          </div>

          <div className="project-info">
            <h3>{project.title}</h3>
            <div className="project-tech">
              {project.skills.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
            <div className="project-links">
              {project.liveUrl !== "#" && (
                project.isInternal ? (
                  <Link
                    to={project.liveUrl}
                    className="project-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Play Game
                  </Link>
                ) : (
                  <button
                    className="project-link"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLiveUrlClick(e, project);
                    }}
                  >
                    Live Demo
                  </button>
                )
              )}
              {project.githubUrl !== "#" && (
                <button
                  className="project-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                  }}
                >
                  GitHub
                </button>
              )}
            </div>
          </div>
        </div>

            </div>

      </div>




    );
  };

  return (
    <div className="portfolio-page">
      <MouseTrail/>
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
            <ProjectCard key={project.id} project={project}/>
        ))}
      </div>






      {selectedProject && (
        <div className="project-modal" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedProject(null)}>×</button>



            <h2>{selectedProject.title}</h2>
            <p>{selectedProject.description}</p>

            <div className="modal-tech">
              {selectedProject.skills.map((skill, index) => (
                <span key={index} className="tech-tag">{skill}</span>
              ))}
            </div>

            <div className="modal-links">
              {selectedProject.liveUrl !== "#" && (
                selectedProject.isInternal ? (
                  <Link
                    to={selectedProject.liveUrl}
                    className="modal-link"
                    onClick={() => setSelectedProject(null)}
                  >
                    Play Game
                  </Link>
                ) : (
                  <button
                    className="modal-link"
                    onClick={() => window.open(selectedProject.liveUrl, '_blank', 'noopener,noreferrer')}
                  >
                    Live Demo
                  </button>
                )
              )}
              {selectedProject.githubUrl !== "#" && (
                <button
                  className="modal-link"
                  onClick={() => window.open(selectedProject.githubUrl, '_blank', 'noopener,noreferrer')}
                >
                  GitHub
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortfolioPage;

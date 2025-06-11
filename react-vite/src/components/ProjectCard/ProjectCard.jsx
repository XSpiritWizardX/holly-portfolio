import { useState } from 'react'
import { Link } from 'react-router-dom'
import './ProjectCard.css'

const ProjectCard = ({ project }) => {
  const [mediaLoaded, setMediaLoaded] = useState(false)

  const handleLiveUrlClick = (e, project) => {
    if (project.liveUrl !== "#") {
      if (project.liveUrl.startsWith('/')) {
        return
      } else {
        e.preventDefault()
        window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
      }
    }
  }

  return (
    <div className="project-card">
      <div className="project-media-container">
        <img
          src={project.image}
          alt={project.title}
          className={`project-image ${mediaLoaded ? 'loaded' : ''}`}
          onLoad={() => setMediaLoaded(true)}
        />

        <div className="project-overlay">
          <div className="project-links">
            {project.liveUrl && project.liveUrl !== "#" && project.liveUrl.startsWith('/') ? (
              <Link
                to={project.liveUrl}
                className="project-link live-link"
              >
                Play Game
              </Link>
            ) : project.liveUrl && project.liveUrl !== "#" ? (
              <button
                className="project-link live-link"
                onClick={(e) => handleLiveUrlClick(e, project)}
              >
                Live Demo
              </button>
            ) : null}

            {project.githubUrl && project.githubUrl !== "#" && (
              <button
                className="project-link github-link"
                onClick={(e) => {
                  e.preventDefault()
                  window.open(project.githubUrl, '_blank', 'noopener,noreferrer')
                }}
              >
                GitHub
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        <div className="project-technologies">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>

        <div className="project-category">
          <span className="category-tag">{project.category}</span>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard

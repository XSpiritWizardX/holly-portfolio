import "./PortfolioPage.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import SignTheWall from '../SignTheWall/SignTheWall';
import MouseTrail from '../MouseTrail/MouseTrail'
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
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749492504/Screenshot_2025-06-09_135837_mmp9y1.png",
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
    description: "An epic metroidvania style hack and slash game featuring original music and custom artwork. Hobby project. Still in development.",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749514192/Screenshot_2025-06-09_200855_pnmnwa.png",
    liveUrl: "#",
    githubUrl: "#",
    technologies: ["Unity", "C#", "Blender", "Pro Tools", "Adobe Suite"],
    category: "Game Development"
  },
  {
    id: 6,
    title: "Platform Editor",
    description: "A 2D platformer editing tool built to make 2d platformer development easier.",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749601691/Screenshot_2025-06-10_201154_jvax3i.png",
    liveUrl: "/platform-editor",
    githubUrl: "#",
    technologies: ["React", "Canvas API", "WebGL"],
    category: "Game Development",
    isInternal: true
  },
  {
    id: 7,
    title: "Space Flight Simulator",
    description: "An epic 3D space flight simulator. Planning to template and expand on this later.",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749601692/Screenshot_2025-06-10_202642_bqwfoj.png",
    liveUrl: "/space-game",
    githubUrl: "#",
    technologies: ["React", "Three.js","WebGL"],
    category: "Game Development",
    isInternal: true
  },
  {
    id: 8,
    title: "Maze Hunter",
    description: "A maze game built with react aimed to let users get to know me better.",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749601690/Screenshot_2025-06-10_202436_t5yu4h.png",
    liveUrl: "/maze-game",
    githubUrl: "#",
    technologies: ["React", "CSS"],
    category: "Game Development",
    isInternal: true
  },
  {
    id: 9,
    title: "Code Clicker",
    description: "A clicker game where you can also answer coding problems to advance. Built to help students to focus on coding while also taking some time to rest.",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749614962/Screenshot_2025-06-11_000857_lz9nfu.png",
    liveUrl: "/clicker",
    githubUrl: "#",
    technologies: ["React", "CSS"],
    category: "Game Development",
    isInternal: true
  },
  {
    id: 13,
    title: "Tra Riverz Album",
    description: "Event Marketing New album release campaign",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749604847/tra_riverz_ist_quarter_pressure_rmwvcc.jpg",
    liveUrl: "#",
    githubUrl: "#",
    technologies: ["Google Ads", "Canva", "CapCut","YouTube"],
    category: "Marketing"
  },
  {
    id: 14,
    title: "Kevin Gates Event",
    description: "Event Marketing campaign for concert promotion",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749604847/tra_riverz_kevin_gates_upcoming_show_wqga68.jpg",
    liveUrl: "#",
    githubUrl: "#",
    technologies: ["Google Ads", "Canva", "CapCut","YouTube"],
    category: "Marketing"
  },
  {
    id: 15,
    title: "The Goat Campaign",
    description: "Brand Awareness Campaign to increase impressions and community.",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749608702/Screenshot_2025-06-10_222434_p0pvhw.png",
    video: "https://res.cloudinary.com/dl6ls3rgu/video/upload/v1749604773/The_Goat__Long_Form_PROMO__txka7g.mp4",
    liveUrl: "#",
    githubUrl: "#",
    technologies: ["Google Ads", "Canva", "CapCut","YouTube"],
    category: "Marketing"
  },
  {
    id: 16,
    title: "CZ's Thrift Store",
    description: "Holiday Advertisement to encourage increase in-store visits.",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749608701/Screenshot_2025-06-10_222312_dyugzg.png",
    video: "https://res.cloudinary.com/dl6ls3rgu/video/upload/v1749604588/czs_ad_2_k8ygvg.mp4",
    liveUrl: "#",
    githubUrl: "#",
    technologies: ["Google Ads", "Canva", "CapCut","YouTube"],
    category: "Marketing"
  },
  {
    id: 17,
    title: "Concept Art",
    description: "Art",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749601691/Screenshot_2025-06-09_201756_z5i0yl.png",
    liveUrl: "#",
    githubUrl: "#",
    technologies: ["Blender", "Adobe Suite", "gimp"],
    category: "Art"
  },
  {
    id: 18,
    title: "Concept Art",
    description: "Art",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749603643/Zhe6NXQ0n29V6fcfh1xu--1--ap4p1-removebg-preview_qqblch.png",
    liveUrl: "#",
    githubUrl: "#",
    technologies: ["Blender", "Adobe Suite", "gimp"],
    category: "Art"
  },
  {
    id: 19,
    title: "Concept Art",
    description: "Art",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749603642/tu1Cy1TPqCCD32HIx2sQ--1--1sipg-removebg-preview_j6l3ze.png",
    liveUrl: "#",
    githubUrl: "#",
    technologies: ["Blender", "Adobe Suite", "gimp"],
    category: "Art"
  },
  {
    id: 20,
    title: "Concept Art",
    description: "Art",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749603633/frwr1lZIxoRyvNGGl3Dk--1--7a0i8-removebg-preview_xvd1tk.png",
    liveUrl: "#",
    githubUrl: "#",
    technologies: ["Blender", "Adobe Suite", "gimp"],
    category: "Art"
  },
  {
    id: 21,
    title: "Concept Art",
    description: "Art",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749603633/fj2ECSAhOa96TO14MCLV--1--ra4jt-removebg-preview_iqvfvq.png",
    liveUrl: "#",
    githubUrl: "#",
    technologies: ["Blender", "Adobe Suite", "gimp"],
    category: "Art"
  },
  {
    id: 22,
    title: "Concept Art",
    description: "ART",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749603632/0HBSocJ2b6Urg7vSO4sh--1--n9oel-removebg-preview_gdghqp.png",
    liveUrl: "#",
    githubUrl: "#",
    technologies: ["Blender", "Adobe Suite", "gimp"],
    category: "Art"
  },
  {
    id: 23,
    title: "Concept Art",
    description: "ART",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749603633/e2zU3VqY1qS6Nc45UaLL--1--nfvne-removebg-preview_avpqih.png",
    liveUrl: "#",
    githubUrl: "#",
    technologies: ["Blender", "Adobe Suite", "gimp"],
    category: "Art"
  },
  {
    id: 24,
    title: "Concept Art",
    description: "ART",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749603632/9eM8hpH9dherSlG3SC6M--1--zy0rk-removebg-preview_ivuju0.png",
    liveUrl: "#",
    githubUrl: "#",
    technologies: ["Blender", "Adobe Suite", "gimp"],
    category: "Art"
  },
  {
    id: 25,
    title: "Concept Art",
    description: "ART",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749603632/Bh9BOmTD0ISRbkam8wqJ--1--nm1vv-removebg-preview_mimmgt.png",
    liveUrl: "#",
    githubUrl: "#",
    technologies: ["Blender", "Adobe Suite", "gimp"],
    category: "Art"
  },
  {
    id: 26,
    title: "Concept Art",
    description: "ART",
    image: "https://res.cloudinary.com/dl6ls3rgu/image/upload/v1749603632/5nfiq5aP8W9XUGrzbyxG--1--t09e8-removebg-preview_lnvp0x.png",
    liveUrl: "#",
    githubUrl: "#",
    technologies: ["Blender", "Adobe Suite", "gimp"],
    category: "Art"
  },
];

const categories = ["All", "Web Development", "Marketing", "Game Development", "Art"];

function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
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
              {project.technologies.map((tech, index) => (
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


          < div
          className="outside-project-card" key={project.id}
           >
            <ProjectCard key={project.id} project={project}/>
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
              title="Music Video 3"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>

          <div className="video-container">
            <iframe
              width="100%" height="315"
              src="https://www.youtube.com/embed/CpsjVVIHBbc?si=c6AX8xpxxL92iPYr"
              title="Music Video 4"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>

          <div className="video-container">
            <iframe
              width="100%" height="315"
              src="https://www.youtube.com/embed/5lYlp0zfmTo?si=imMrQCId-AOCTkDK"
              title="Music Video 5"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>

          <div className="video-container">
            <iframe
              width="100%" height="315"
              src="https://www.youtube.com/embed/mSvZu6TGu_w?si=iW42gOPemo6JXlPk"
              title="Music Video 6"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>

          <div className="video-container">
            <iframe
              width="100%" height="315"
              src="https://www.youtube.com/embed/o2_0RIKBgMA?si=NixcNInDKiUQ7DP4"
              title="Music Video 7"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>

          <div className="video-container">
            <iframe
              width="100%" height="315"
              src="https://www.youtube.com/embed/DvcoxWyBYmA?si=_CZ4KiVai27-EMHs"
              title="Music Video 8"
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

            {selectedProject.video ? (
              <video
                className="modal-video"
                controls
                autoPlay
                muted
                loop
              >
                <source src={selectedProject.video} type="video/mp4" />
                <img src={selectedProject.image} alt={selectedProject.title} />
              </video>
            ) : (
              <img src={selectedProject.image} alt={selectedProject.title} />
            )}

            <h2>{selectedProject.title}</h2>
            <p>{selectedProject.description}</p>

            <div className="modal-tech">
              {selectedProject.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
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

import "./ServicesPage.css";
import { useEffect, useState } from "react";

const skillsData = [
  { name: "JavaScript", level: 95, category: "Frontend" },
  { name: "React", level: 90, category: "Frontend" },
  { name: "Python", level: 88, category: "Backend" },
  { name: "Node.js", level: 85, category: "Backend" },
  { name: "CSS/HTML", level: 92, category: "Frontend" },
  { name: "SQL", level: 80, category: "Database" },
  { name: "Flask", level: 85, category: "Backend" },
  { name: "Express", level: 82, category: "Backend" },
  { name: "Redux", level: 78, category: "Frontend" },
  { name: "PostgreSQL", level: 75, category: "Database" },
  { name: "Git", level: 88, category: "Tools" },
  { name: "AWS", level: 70, category: "Cloud" },
  { name: "Docker", level: 65, category: "DevOps" },
  { name: "Music Production", level: 95, category: "Creative" },
  { name: "Game Development", level: 80, category: "Creative" },
  { name: "Video Editing", level: 85, category: "Creative" },
  { name: "3D Modeling", level: 75, category: "Creative" },
  { name: "Digital Marketing", level: 90, category: "Business" }
];

const services = [
  {
    title: "Full-Stack Web Development",
    description: "Complete web applications from concept to deployment",
    icon: "💻",
    features: ["React Applications", "API Development", "Database Design", "Responsive Design"]
  },
  {
    title: "Music Production & Audio",
    description: "Professional music creation and audio engineering",
    icon: "🎵",
    features: ["Original Compositions", "Mixing & Mastering", "Sound Design", "Audio Editing"]
  },
  {
    title: "Game Development",
    description: "Interactive games and entertainment applications",
    icon: "🎮",
    features: ["2D Platformers", "Unity Development", "Game Design", "Character Creation"]
  },
  {
    title: "Digital Marketing",
    description: "Strategic online presence and marketing solutions",
    icon: "📈",
    features: ["SEO Optimization", "Content Strategy", "Analytics", "Brand Development"]
  }
];

function ServicesPage() {
  const [animatedSkills, setAnimatedSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Frontend", "Backend", "Database", "Tools", "Cloud", "DevOps", "Creative", "Business"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedSkills(skillsData);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredSkills = selectedCategory === "All"
    ? animatedSkills
    : animatedSkills.filter(skill => skill.category === selectedCategory);

  const getSkillColor = (level) => {
    if (level >= 90) return "#00ff88";
    if (level >= 80) return "#ffd700";
    if (level >= 70) return "#ff8c00";
    return "#ff6b6b";
  };

  return (
    <div className="services-page">
      <div className="services-header">
        <h1>Services & Skills</h1>
        <p>What I can do for you</p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <ul className="service-features">
              {service.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="skills-section">
        <h2>Technical Skills</h2>

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

        <div className="skills-container">
          {filteredSkills.map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div
                  className="skill-progress"
                  style={{
                    width: `${skill.level}%`,
                    backgroundColor: getSkillColor(skill.level),
                    animation: `fillBar 2s ease-in-out ${index * 0.1}s both`
                  }}
                ></div>
              </div>
              <div className="skill-category">{skill.category}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;

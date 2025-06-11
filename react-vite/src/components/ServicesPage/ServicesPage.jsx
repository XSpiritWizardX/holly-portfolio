import "./ServicesPage.css";
import { useEffect, useState } from "react";

const skillsData = [
  { name: "JavaScript", level: 95, category: "Languages" },
  { name: "React", level: 95, category: "Frontend" },
  { name: "Python", level: 90, category: "Languages" },
  { name: "Node.js", level: 95, category: "Backend" },
  { name: "CSS/HTML", level: 92, category: "Frontend" },
  { name: "Flask", level: 90, category: "Backend" },
  { name: "Express", level: 92, category: "Backend" },
  { name: "Redux", level: 95, category: "Frontend" },
  { name: "PostgreSQL", level: 95, category: "Backend" },
  { name: "Git", level: 90, category: "Tools" },
  { name: "AWS", level: 70, category: "Cloud" },
  { name: "Docker", level: 80, category: "DevOps" },
  { name: "Music Production", level: 95, category: "Creative" },
  { name: "Game Development", level: 80, category: "Creative" },
  { name: "Video Editing", level: 85, category: "Creative" },
  { name: "2D / 3D Modeling", level: 75, category: "Creative" },
  { name: "Digital Marketing", level: 90, category: "Business" },
  { name: "Microsoft Suite", level: 70, category: "Business" },
  { name: "Adobe Suite", level: 75, category: "Creative" },
  { name: "Visual Studio Code", level: 90, category: "Tools" },
  { name: "Linux", level: 82, category: "DevOps" },
  { name: "HTML", level: 90, category: "Languages" },
  { name: "CSS", level: 90, category: "Languages" },
  { name: "SQL", level: 90, category: "Languages" },
  { name: "C#", level: 72, category: "Languages" },
  { name: "C++", level: 68, category: "Languages" },
  { name: "Go", level: 60, category: "Languages" },
  { name: "PHP", level: 70, category: "Languages" },
  { name: "Gsap", level: 90, category: "Frontend" },
  { name: "React Charts", level: 80, category: "Frontend" },
  { name: "Vite", level: 90, category: "Frontend" },
  { name: "Typescript", level: 60, category: "Languages" },
  { name: "Ember", level: 60, category: "Frontend" },
  { name: "jQuery", level: 90, category: "Frontend" },
  { name: "Sequelize", level: 90, category: "Backend" },
  { name: "Postman", level: 90, category: "Tools" },
  { name: "Cloudinary", level: 90, category: "Cloud" },
  { name: "Kubernetes", level: 60, category: "DevOps" },
  { name: "Render", level: 90, category: "Tools" },
  { name: "Figma", level: 90, category: "Business" },
  { name: "SQLite3", level: 90, category: "Backend" },
  { name: "MySQL", level: 80, category: "Backend" },
  { name: "Browser Dev Tools", level: 90, category: "Tools" },
  { name: "Google", level: 95, category: "Cloud" },
  { name: "Azure", level: 60, category: "Cloud" },
  { name: "Ollama", level: 70, category: "Machine Learning" },
  { name: "Gemma 3", level: 70, category: "Machine Learning" },
  { name: "Pandas", level: 65, category: "Machine Learning" },
  { name: "PyTorch", level: 74, category: "Machine Learning" },
  { name: "TensorFlow", level: 80, category: "Machine Learning" },
  { name: "Numpy", level: 60, category: "Machine Learning" },
  { name: "Jupyter", level: 70, category: "Machine Learning" },
  { name: "Three.js", level: 77, category: "Frontend" },
  // { name: "Digital Marketing", level: 90, category: "Business" },
  // { name: "Digital Marketing", level: 90, category: "Business" },
  // { name: "Digital Marketing", level: 90, category: "Business" },
  // { name: "Digital Marketing", level: 90, category: "Business" },
  // { name: "Digital Marketing", level: 90, category: "Business" },
  // { name: "Digital Marketing", level: 90, category: "Business" },
  // { name: "Digital Marketing", level: 90, category: "Business" },

];

const services = [
  {
    title: "Full-Stack Web Development",
    description: "Complete web applications from concept to deployment",
    icon: "💻",
    features: [
      "Software Engineering",
      "Data Structures & Algorithms",
      "Object Oriented Programming",
      "API Development",
      "Database Design",
      "Test Driven Development",
      "Servers",
      "Custom Forms and Validations",
      "Software Development Life Cycle",
      "Encryption & Cryptography",
      "Virtualization",
      "Agile / Scrum",
      "MVP & Rapid Prototyping",
      "Debugging",
      "CRUD Operations",
      "Micro Services",
      "Web App Security",
      "Web Accessibility",
      "Responsive Design",
      "React Applications",
      "Data Visualization",
      "Web App Deployment",
      "Web Development Consulting"
    ]
  },
  {
    title: "Digital Marketing",
    description: "Strategic online presence and marketing solutions",
    icon: "📈",
    features: [
      "SEO & SEM",
      "Copywriting",
      "Content Strategy",
      "Analytics",
      "Brand Development",
      "A/B Testing",
      "KPI Reporting",
      "Multi-Media Marketing",
      "Social Media Management",
      "Photography & Videography",
      "Graphic Design",
      "Lead Generation Pipelines",
      "Influencer Marketing",
      "Google Ads Dev Tools",
      "Marketing Automation",
      "Marketing Consulting"
    ]
  },
  {
  title: "Financial Planning",
  description: "Comprehensive financial planning with life insurance solutions and advanced market analysis",
  icon: "💰",
  features: [
    "Retirement Planning",
    "Policy Needs Analysis",
    "Premium Calculations",
    "Beneficiary Planning",
    "Term vs Whole Life Comparison",
    "Indexed Universal Life Strategies",
    "Cash Value Projections",
    "Chart Pattern Recognition",
    "Technical Analysis On Multiple Timeframes",
    "Trend Analysis",
    "Portfolio Optimization",
    "Tax Implications Analysis",
    "Market Sentiment Analysis",
    "Regulatory Compliance",
    "Financial Consulting"
  ]
},
  {
    title: "Music Production & Audio",
    description: "Professional music creation and audio engineering",
    icon: "🎵",
    features: [
      "Original Compositions",
      "Mixing & Mastering",
      "Sound Engineering",
      "Multi Artist Collaboration",
      "Recording",
      "Song Writing",
      "Sound Texturing",
      "Music Theory",
      "Live Sound",
      "Music Publishing",
      "Copyrights & Licensing",
      "Touring Band Management",
      "Music Business Consulting"
    ]
  },
  {
    title: "Game Development",
    description: "Interactive games and entertainment applications",
    icon: "🎮",
    features: [
      "Concept Art",
      "Unity Development",
      "Game Design Documentation",
      "Character Creation",
      "Unreal Engine 5 Development",
      "Animations",
      "UI/UX",
      "Game Logic & Physics",
      "Level Design",
      "World Building and Environment Design",
      "Flash Games",
      "Game Monetization",
      "Game Testing",
      "Game Publishing",
      "Game Development Consulting"
    ]
  },
];

function ServicesPage() {
  const [animatedSkills, setAnimatedSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All","Languages", "Frontend", "Backend", "Machine Learning",  "Tools", "Cloud", "DevOps", "Creative", "Business"];

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

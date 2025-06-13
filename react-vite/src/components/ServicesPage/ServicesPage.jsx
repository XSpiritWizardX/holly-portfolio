import "./ServicesPage.css";
import SkillMeter from "../SkillMeter/SkillMeter";
import MouseTrail from '../MouseTrail/MouseTrail'

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


  return (
    <div className="services-page">
      <MouseTrail />
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




            <SkillMeter />



      </div>


    </div>
  );
}

export default ServicesPage;

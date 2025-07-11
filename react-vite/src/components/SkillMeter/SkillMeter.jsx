


// WITH SKILL BARS AND PERCENTAGES


// import  { useState } from "react";
// import "./SkillMeter.css";
// import MouseTrail from '../MouseTrail/MouseTrail'



// const skillsData = [
//   { name: "JavaScript", level: 95, category: "Languages" },
//   { name: "React", level: 95, category: "Frontend" },
//   { name: "Python", level: 90, category: "Languages" },
//   { name: "Node.js", level: 95, category: "Backend" },
//   { name: "Flask", level: 90, category: "Backend" },
//   { name: "Express", level: 92, category: "Backend" },
//   { name: "Redux", level: 95, category: "Frontend" },
//   { name: "PostgreSQL", level: 95, category: "Backend" },
//   { name: "Git", level: 90, category: "Tools" },
//   { name: "AWS", level: 70, category: "Cloud" },
//   { name: "Docker", level: 80, category: "DevOps" },
//   { name: "Linux", level: 82, category: "DevOps" },
//   { name: "HTML", level: 90, category: "Languages" },
//   { name: "CSS", level: 90, category: "Languages" },
//   { name: "SQL", level: 90, category: "Languages" },
//   { name: "C#", level: 72, category: "Languages" },
//   { name: "C++", level: 68, category: "Languages" },
//   { name: "Go", level: 60, category: "Languages" },
//   { name: "PHP", level: 70, category: "Languages" },
//   { name: "Gsap", level: 90, category: "Frontend" },
//   { name: "React Charts", level: 80, category: "Frontend" },
//   { name: "Vite", level: 90, category: "Frontend" },
//   { name: "Typescript", level: 60, category: "Languages" },
//   { name: "Ember", level: 60, category: "Frontend" },
//   { name: "jQuery", level: 90, category: "Frontend" },
//   { name: "Sequelize", level: 90, category: "Backend" },
//   { name: "Postman", level: 90, category: "Tools" },
//   { name: "Cloudinary", level: 90, category: "Cloud" },
//   { name: "Kubernetes", level: 60, category: "DevOps" },
//   { name: "Render", level: 90, category: "Tools" },
//   { name: "Figma", level: 90, category: "Business" },
//   { name: "SQLite3", level: 90, category: "Backend" },
//   { name: "MySQL", level: 80, category: "Backend" },
//   { name: "Browser Dev Tools", level: 90, category: "Tools" },
//   { name: "Google", level: 95, category: "Cloud" },
//   { name: "Azure", level: 60, category: "Cloud" },
//   { name: "Ollama", level: 70, category: "Machine Learning" },
//   { name: "Gemma 3", level: 70, category: "Machine Learning" },
//   { name: "Pandas", level: 65, category: "Machine Learning" },
//   { name: "Music Production", level: 95, category: "Creative" },
//   { name: "Game Development", level: 80, category: "Creative" },
//   { name: "Video Editing", level: 85, category: "Creative" },
//   { name: "2D / 3D Modeling", level: 75, category: "Creative" },
//   { name: "Digital Marketing", level: 90, category: "Business" },
//   { name: "Microsoft Suite", level: 70, category: "Business" },
//   { name: "Adobe Suite", level: 75, category: "Creative" },
//   { name: "Visual Studio Code", level: 90, category: "Tools" },
//   { name: "PyTorch", level: 74, category: "Machine Learning" },
//   { name: "TensorFlow", level: 80, category: "Machine Learning" },
//   { name: "Numpy", level: 60, category: "Machine Learning" },
//   { name: "Jupyter", level: 70, category: "Machine Learning" },
//   { name: "Three.js", level: 77, category: "Frontend" },
//   { name: "ProTools", level: 87, category: "Creative" },
// ];


// const categories = [
//   "All",
//   "Languages",
//   "Frontend",
//   "Backend",
//   "Tools",
//   "Machine Learning",
//   "Cloud",
//   "DevOps",
//   "Creative",
//   "Business",
// ];



// const SkillBlock = ({ name, level }) => {
//   const totalBlocks = 20;
//   const filledBlocks = Math.round((level / 100) * totalBlocks);

//   return (

//     <div className="skill-block-container">
//       <div className="skill-block-header">
//         <span>{name}</span>
//         <span>{level}%</span>
//       </div>
//       <div className="skill-block-bar">
//         {Array.from({ length: totalBlocks }).map((_, i) => (
//           <div
//             key={i}
//             className={`block ${i < filledBlocks ? "active" : ""}`}
//           ></div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const SkillMeter = () => {
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const filteredSkills =
//     selectedCategory === "All"
//       ? skillsData
//       : skillsData.filter(skill => skill.category === selectedCategory);

//   return (
//     <div className="skill-meter">
//       <MouseTrail/>
//       <h2 className="skills-title">Technical Skills</h2>



//       <div className="category-buttons">
//         {categories.map(cat => (
//           <button
//             key={cat}
//             className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
//             onClick={() => setSelectedCategory(cat)}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>




//       <div className="skill-meter-grid">
//         {filteredSkills.length === 0 ? (
//           <p style={{ color: "#777", textAlign: "center" }}>
//             No skills to display.
//           </p>
//         ) : (
//           filteredSkills.map((skill, idx) => (
//             <SkillBlock key={idx} name={skill.name} level={skill.level} />
//           ))
//         )}
//       </div>



//     </div>
//   );
// };

// export default SkillMeter;














// SkillMeter.jsx
// WITHOUT SKILL BLOCKS AND PERCENTAGES
import { useState } from "react";
import "./SkillMeter.css";
import MouseTrail from '../MouseTrail/MouseTrail'

const skillsData = [
  { name: "2D / 3D Modeling", level: 75, category: "Creative" },
  { name: "Accounting Basics", level: 70, category: "Business" },
  { name: "Adobe Suite", level: 75, category: "Creative" },
  { name: "AI Content Tools", level: 70, category: "Creative" },
  { name: "Agile Development", level: 85, category: "Business" },
  { name: "Ansible", level: 65, category: "DevOps" },
  { name: "Angular", level: 70, category: "Frontend" },
  { name: "APIs (REST & GraphQL)", level: 88, category: "Backend" },
  { name: "Audio Engineering", level: 75, category: "Creative" },
  { name: "AWS", level: 70, category: "Cloud" },
  { name: "Azure", level: 60, category: "Cloud" },
  { name: "Bash", level: 75, category: "DevOps" },
  { name: "Blender", level: 75, category: "Creative" },
  { name: "Browser Dev Tools", level: 90, category: "Tools" },
  { name: "C#", level: 72, category: "Languages" },
  { name: "C++", level: 68, category: "Languages" },
  { name: "CI/CD Pipelines", level: 80, category: "DevOps" },
  { name: "Cloudinary", level: 90, category: "Cloud" },
  { name: "Contentful", level: 70, category: "Backend" },
  { name: "Customer Relationship Management", level: 70, category: "Business" },
  { name: "CSS", level: 90, category: "Languages" },
  { name: "D3.js", level: 70, category: "Frontend" },
  { name: "Data Visualization", level: 80, category: "Creative" },
  { name: "Digital Marketing", level: 90, category: "Business" },
  { name: "Docker", level: 80, category: "DevOps" },
  { name: "Django", level: 75, category: "Backend" },
  { name: "Ember", level: 60, category: "Frontend" },
  { name: "ESLint", level: 80, category: "Tools" },
  { name: "Express", level: 92, category: "Backend" },
  { name: "Figma", level: 90, category: "Business" },
  { name: "Firebase", level: 78, category: "Cloud" },
  { name: "Flask", level: 90, category: "Backend" },
  { name: "Game Development", level: 80, category: "Creative" },
  { name: "Gemma 3", level: 70, category: "Machine Learning" },
  { name: "Git", level: 90, category: "Tools" },
  { name: "GitHub Actions", level: 78, category: "DevOps" },
  { name: "Go", level: 60, category: "Languages" },
  { name: "Google", level: 95, category: "Cloud" },
  { name: "Graphic Design", level: 75, category: "Creative" },
  { name: "Gsap", level: 90, category: "Frontend" },
  { name: "HTML", level: 90, category: "Languages" },
  { name: "Illustrator", level: 75, category: "Creative" },
  { name: "Java", level: 72, category: "Languages" },
  { name: "JavaScript", level: 95, category: "Languages" },
  { name: "Jest", level: 80, category: "Tools" },
  { name: "Jupyter", level: 70, category: "Machine Learning" },
  { name: "Kubernetes", level: 60, category: "DevOps" },
  { name: "Linux", level: 82, category: "DevOps" },
  { name: "Market Research", level: 70, category: "Business" },
  { name: "Material UI", level: 85, category: "Frontend" },
  { name: "Microsoft Suite", level: 70, category: "Business" },
  { name: "MongoDB", level: 85, category: "Backend" },
  { name: "Motion Graphics", level: 75, category: "Creative" },
  { name: "MySQL", level: 80, category: "Backend" },
  { name: "Next.js", level: 75, category: "Frontend" },
  { name: "Node.js", level: 95, category: "Backend" },
  { name: "Numpy", level: 60, category: "Machine Learning" },
  { name: "Ollama", level: 70, category: "Machine Learning" },
  { name: "Photoshop", level: 75, category: "Creative" },
  { name: "PHP", level: 70, category: "Languages" },
  { name: "PostgreSQL", level: 95, category: "Backend" },
  { name: "Postman", level: 90, category: "Tools" },
  { name: "Process Optimization", level: 70, category: "Business" },
  { name: "Project Management", level: 70, category: "Business" },
  { name: "Prompt Engineering", level: 75, category: "Creative" },
  { name: "ProTools", level: 87, category: "Creative" },
  { name: "Public Speaking", level: 70, category: "Business" },
  { name: "Pandas", level: 65, category: "Machine Learning" },
  { name: "Python", level: 90, category: "Languages" },
  { name: "PyTorch", level: 74, category: "Machine Learning" },
  { name: "Quality Control", level: 70, category: "Business" },
  { name: "React", level: 95, category: "Frontend" },
  { name: "React Charts", level: 80, category: "Frontend" },
  { name: "Redis", level: 75, category: "Backend" },
  { name: "Render", level: 90, category: "Tools" },
  { name: "Redux", level: 95, category: "Frontend" },
  { name: "Responsive Design", level: 85, category: "Frontend" },
  { name: "Sass", level: 80, category: "Frontend" },
  { name: "Sequelize", level: 90, category: "Backend" },
  { name: "SQL", level: 90, category: "Languages" },
  { name: "SQLite3", level: 90, category: "Backend" },
  { name: "Tailwind CSS", level: 88, category: "Frontend" },
  { name: "TensorFlow", level: 80, category: "Machine Learning" },
  { name: "Three.js", level: 77, category: "Frontend" },
  { name: "TypeORM", level: 78, category: "Backend" },
  { name: "Typography", level: 75, category: "Creative" },
  { name: "Typescript", level: 60, category: "Languages" },
  { name: "UI/UX Design", level: 75, category: "Creative" },
  { name: "Unity", level: 72, category: "Creative" },
  { name: "Unreal Engine", level: 72, category: "Creative" },
  { name: "UV", level: 87, category: "DevOps" },
  { name: "Video Editing", level: 85, category: "Creative" },
  { name: "Virtual Production", level: 75, category: "Creative" },
  { name: "Visual Studio Code", level: 90, category: "Tools" },
  { name: "Vite", level: 90, category: "Frontend" },
  { name: "Vue.js", level: 70, category: "Frontend" },
  { name: "Webpack", level: 78, category: "Frontend" },
  { name: "jQuery", level: 90, category: "Frontend" }
];


const categories = [
  "All",
  "Languages",
  "Frontend",
  "Backend",
  "Tools",
  "Machine Learning",
  "Cloud",
  "DevOps",
  "Creative",
  "Business",
];

const SkillBlock = ({ name }) => {
  return (
    <div className="skill-block-container">
      <div className="skill-name">
        {name}
      </div>
    </div>
  );
};

const SkillMeter = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSkills =
    selectedCategory === "All"
      ? skillsData
      : skillsData.filter(skill => skill.category === selectedCategory);

  return (
    <div className="skill-meter">
      <MouseTrail/>
      <h2 className="skills-title">Technical Skills</h2>

      <div className="category-buttons">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="skill-meter-grid">
        {filteredSkills.length === 0 ? (
          <p style={{ color: "#777", textAlign: "center" }}>
            No skills to display.
          </p>
        ) : (
          filteredSkills.map((skill, idx) => (
            <SkillBlock key={idx} name={skill.name} />
          ))
        )}
      </div>
    </div>
  );
};

export default SkillMeter;

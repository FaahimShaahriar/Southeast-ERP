import React from 'react';
import "../Style/projectCard.css";

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <img src={`${process.env.PUBLIC_URL}/assets/image/Projects/${project.image}`} alt={project.name} />
      <h2>{project.name}</h2>
      <p>{project.description}</p>
    </div>
  );
}

export default ProjectCard;

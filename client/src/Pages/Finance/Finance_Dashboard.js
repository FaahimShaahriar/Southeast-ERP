import React from "react";
import MainLayout from "../../Layout/MainLayout";
import Sidebar2 from "../../Components/sidebar2";
import ProjectCard from "../../Components/ProjectCard";
import "../../Style/accounting.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Slider from "react-slick";
export const FinanceDashboard = () => {
  const projects = [
    {
      id: 1,
      name: "Project One",
      image: "p-1.png",
      description: "Description of Project One",
    },
    {
      id: 2,
      name: "Project Two",
      image: "p-2.jpg",
      description: "Description of Project Two",
    },
    {
      id: 3,
      name: "Project Two",
      image: "p-3.jpg",
      description: "Description of Project Two",
    },
    // Add more projects as needed
  ];

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setModalIsOpen(false);
  };

  return (
    <div>
      <MainLayout>
        <div className="content">
          <Sidebar2></Sidebar2>
          <div>
            <div className="home-page">
              <h1>Running Projects</h1>
              <div className="project-list">
                {projects.map((project) => (
                  <Link key={project.id} onClick={() => openModal(project)}>
                    <ProjectCard project={project} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <ProjectModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            project={selectedProject}
          />
        </div>
      </MainLayout>
    </div>
  );
};

const ProjectModal = ({ isOpen, onRequestClose, project }) => {
  if (!project) return null;

  // const { name, image, description } = project;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Project Details"
      className="project-modal"
      overlayClassName="project-modal-overlay"
    >
      <h2>{project.name}</h2>
      {/* <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={`/images/${image}`} alt={`${name} - ${index + 1}`} />
          </div>
        ))}
      </Slider> */}
      <p>{project.description}</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

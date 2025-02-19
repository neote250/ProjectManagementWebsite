import { createContext, useState, useContext } from 'react';

const ProjectContext = createContext();

// eslint-disable-next-line react/prop-types
export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]); // Ensure it's initialized as an empty array

  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);

export default ProjectContext;

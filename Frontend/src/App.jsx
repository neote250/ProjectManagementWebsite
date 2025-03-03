import Header from './components/layout/Header';
import ProjectList from './components/projects/ProjectList';
import ProjectDashboard from './components/layout/ProjectDashboard';
import { ProjectProvider } from './context/ProjectContext';
import { useState } from 'react';
import './styles/globals.css';

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <ProjectProvider>
      <div className="min-h-screen bg-blue-100">
        <Header />
        <main className="max-w-7xl mx-auto">
          {selectedProject ? (
            <ProjectDashboard />
          ) : (
            <div className="p-6">
              <ProjectList onSelectProject={setSelectedProject} />
            </div>
          )}
        </main>
      </div>
    </ProjectProvider>
  );
};

export default App;
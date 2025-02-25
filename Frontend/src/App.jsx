import Header from './components/layout/Header';
import ProjectList from './components/projects/ProjectList';
import { ProjectProvider } from './context/ProjectContext';
import './styles/globals.css';

const App = () => {
  return (
    <ProjectProvider>
      <div className="min-h-screen bg-blue-100">
        <Header />
        <main className="max-w-7xl mx-auto p-6">
          <ProjectList />
        </main>
      </div>
    </ProjectProvider>
  );
};


export default App;
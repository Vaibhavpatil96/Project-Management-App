import NewProject from "./components/NewProject";
import { useState } from "react";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from './components/SelectedProject';

function App() {
  const [projectsState, setProjectsState]= useState({
    selectedProjectID: undefined,
    projects: [],
    tasks: []
  });

  const handleAddTask =(text)=>{
    setProjectsState(prevState=>{
      const taskID = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectID,
        id: taskID
      };
      return{
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      }
    })
  }

  const handleDeleteTask = (id)=>{
    setProjectsState(prevState=>{
      return{
        ...prevState,
        tasks: prevState.tasks.filter((task)=>task.id !== id
      ),
      };
    });
  }

  const handleStartNewProject = ()=>{
    setProjectsState(prevState=>{
      return{
        ...prevState,
        selectedProjectID: null,
      };
    });
  }

  const handleCancelAddProject = ()=>{
    setProjectsState(prevState=>{
      return{
        ...prevState,
        selectedProjectID: undefined,
      };
    });
  }

  const handleSelectProject = (id)=>{
    setProjectsState(prevState=>{
      return{
        ...prevState,
        selectedProjectID: id,
      };
    });
  }

  const handleAddProject = (projectData)=>{
    setProjectsState(prevState=>{
      const projectID = Math.random();
      const newProject = {
        ...projectData,
        id: projectID
      };
      return{
        ...prevState,
        selectedProjectID: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  const handleDeleteProject = ()=>{
    setProjectsState(prevState=>{
      return{
        ...prevState,
        selectedProjectID: undefined,
        projects: prevState.projects.filter((project)=>project.id !== prevState.selectedProjectID
      ),
      };
    });
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectID);

  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectsState.tasks}/>;
  if(projectsState.selectedProjectID === null){
    content = <NewProject onAdd={handleAddProject} onCancle={handleCancelAddProject} />;
  }
  else if(projectsState.selectedProjectID === undefined){
    content= <NoProjectSelected onStartAddProject={handleStartNewProject}/>;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartNewProject} projects={projectsState.projects} onSelect={handleSelectProject} selectedProjectID={projectsState.selectedProjectID}/>
      {content}
    </main>
  );
}

export default App;

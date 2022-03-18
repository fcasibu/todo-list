import tasks from "./tasks";
import { setLocalStorage, getLocalStorage } from "./localStorage";

const projects = (() => {
  const projectList = JSON.parse(getLocalStorage("projects")) || [
    { projectTitle: "Todolist project", projectIndex: 0 },
    { projectTitle: "Tic Tac Toe Project", projectIndex: 1 },
  ];
  class Projects {
    constructor(title, index) {
      this.projectTitle = title;
      this.projectIndex = index;
    }
  }

  const getProjectList = () => {
    return projectList;
  };

  const addProject = (title, index) => {
    const project = new Projects(title, index);

    projectList.push(project);
    setLocalStorage("projects", projectList);
  };

  const findTask = (taskList, projectIndex) => {
    const indexArray = [];
    taskList.forEach((task) => {
      if (task.projectIndex === projectIndex) {
        indexArray.push(taskList.indexOf(task));
      }
    });

    return indexArray;
  };

  const findProject = (value, propName) => {
    for (let i = 0; i < projectList.length; i++) {
      if (projectList[i][propName] === value) {
        return projectList.indexOf(projectList[i]);
      }
    }
  };

  const removeProjectTasks = (projectIndex) => {
    const { getTaskList } = tasks;
    const taskList = getTaskList();
    const indexArr = findTask(taskList, projectIndex);
    for (let i = indexArr.length; i > 0; i--) {
      taskList.splice(indexArr.pop(), 1);
    }
    setLocalStorage("tasks", taskList);
  };

  const removeProject = (projectIndex) => {
    const indexOfProject = findProject(projectIndex, "projectIndex");
    removeProjectTasks(projectIndex);
    projectList.splice(indexOfProject, 1);
    setLocalStorage("projects", projectList);
  };

  const editProject = (title, value) => {
    const indexOfProject = findProject(title, "projectTitle");
    projectList[indexOfProject].projectTitle = value;
    setLocalStorage("projects", projectList);
  };

  return { addProject, removeProject, getProjectList, editProject };
})();

export default projects;

import dom from "./dom";
import tasks from "./tasks";

const projects = (() => {
  let projectList = [];

  const projectStorage = JSON.parse(localStorage.getItem("projects"));
  if (projectStorage === null || !projectStorage.length) {
    projectList.push({ name: "test" });
  } else {
    const parsedItem = projectStorage;
    projectList = parsedItem;
  }

  class Project {
    constructor(name) {
      this.name = name;
    }
  }

  const addProject = () => {
    const { projectTitle } = dom;
    const project = new Project(projectTitle.value);
    projectList.push(project);
    localStorage.setItem("projects", JSON.stringify(projectList));
  };

  const checkValidity = () => {
    let isValid = false;
    const { projectTitle } = dom;
    if (!projectTitle.value.length) {
      isValid = false;
    } else {
      addProject();
      isValid = true;
    }
    return isValid;
  };

  return { addProject, checkValidity, projectList };
})();

export default projects;

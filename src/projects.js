import dom from "./dom";
import storage from "./localStorage";
import tasks from "./tasks";

const projects = (() => {
  let projectList = [];

  if (localStorage.getItem("projects") === null) {
    projectList = [{ name: "gym" }];
    localStorage.setItem("projects", JSON.stringify(projectList));
  } else {
    const parsedItem = JSON.parse(localStorage.getItem("projects"));
    projectList = parsedItem;
  }

  console.log(projectList);
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

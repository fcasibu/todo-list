import dom from "./dom";

const projects = (() => {
  const projectList = [];

  class Project {
    constructor(name) {
      this.name = name;
    }
  }

  const addProject = () => {
    const { projectTitle } = dom;
    const project = new Project(projectTitle.value);

    projectList.push(project);
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

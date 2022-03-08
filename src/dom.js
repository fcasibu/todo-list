import projects from "./projects";
import tasks from "./tasks";

const dom = (() => {
  const menuIcon = document.querySelector(".menu-burger");
  const sideBar = document.querySelector(".sidebar");
  const addTaskModal = document.querySelector(".add-task-modal");
  const addProjectModal = document.querySelector(".add-project-modal");
  const container = document.querySelector(".container");
  const mainContentContainer = document.querySelector(
    ".main-content-container"
  );
  const projectList = document.querySelector(".projects");
  const projectCount = document.querySelector(".projects-count");

  const taskTitle = document.getElementById("task-title");
  const taskDescription = document.getElementById("task-description");
  const taskDueDate = document.getElementById("task-date");
  const taskPriority = document.getElementById("task-priority");
  const taskProjects = document.getElementById("task-projects");

  const projectTitle = document.getElementById("project-title");

  const taskAll = document.querySelectorAll(".task");

  const hideResize = () => {
    menuIcon.classList.remove("toggle-menu");
    sideBar.classList.add("hide-sidebar");
  };

  const showResize = () => {
    menuIcon.classList.add("toggle-menu");
    sideBar.classList.remove("hide-sidebar");
  };

  const hideSideBar = () => {
    if (sideBar.classList.contains("hide-sidebar")) {
      sideBar.classList.remove("hide-sidebar");
      sideBar.classList.add("show-sidebar");
    } else {
      sideBar.classList.remove("show-sidebar");
      sideBar.classList.add("hide-sidebar");
    }
  };

  const toggleMenu = () => {
    if (menuIcon.classList.contains("toggle-menu")) {
      menuIcon.classList.remove("toggle-menu");
    } else {
      menuIcon.classList.add("toggle-menu");
    }
    hideSideBar();
  };

  const clearInputValues = () => {
    taskTitle.value = "";
    taskDescription.value = "";
    taskDueDate.value = "";
    taskPriority.value = "Not Important";

    projectTitle.value = "";
  };

  const showModal = (e) => {
    if (e.classList.contains("addtask")) {
      addTaskModal.style.display = "block";
    } else if (e.classList.contains("addproject")) {
      addProjectModal.style.display = "flex";
    }
    document.body.classList.add("overflow");

    clearInputValues();
  };

  const hideModal = () => {
    addTaskModal.style.display = "none";
    addProjectModal.style.display = "none";
    document.body.classList.remove("overflow");
  };

  const createMainContent = (index, title) => {
    const mainContent = document.createElement("div");
    mainContent.classList.add("main-content");
    mainContent.setAttribute("data-project-index", index);

    const mTitle = document.createElement("h1");
    mTitle.classList.add("task-title");
    mTitle.textContent = `${title}`;

    const mListHeader = document.createElement("div");
    mListHeader.classList.add("task-list-header", "flex");
    mListHeader.innerHTML = `Tasks <i class="fa-regular fa-plus tooltip addtask show-modal"></i>`;

    const mTaskList = document.createElement("ul");
    mTaskList.classList.add("task-list");

    mainContent.appendChild(mTitle);
    mainContent.appendChild(mListHeader);
    mainContent.appendChild(mTaskList);

    return mainContent;
  };

  const removeSelected = () => {
    taskAll.forEach((item) => item.classList.remove("selected"));
  };

  const createProject = (index, title) => {
    const project = document.createElement("div");
    project.classList.add("project", "task");
    project.setAttribute("data-project-index", index);
    removeSelected();
    project.classList.add("selected");

    const pTitle = document.createElement("p");
    pTitle.classList.add("project__title");
    pTitle.textContent = `${title}`;

    const pUtilities = document.createElement("div");
    pUtilities.classList.add("project__utilities");
    pUtilities.innerHTML = `
    <div class="project__utilities">
    <i class="fa-solid fa-pen-to-square project-edit project-btn"></i>
    <i class="fa-solid fa-trash project-delete project-btn"></i>
  </div>`;

    project.appendChild(pTitle);
    project.appendChild(pUtilities);

    return project;
  };

  const createTaskOption = (value, text) => {
    const taskProject = document.createElement("option");
    taskProject.value = value;
    taskProject.textContent = `${text}`;

    return taskProject;
  };

  const displayProjects = () => {
    projectList.textContent = "";
    mainContentContainer.textContent = "";
    taskProjects.textContent = "";

    for (let i = 0; i < projects.projectList.length; i++) {
      const { name } = projects.projectList[i];
      projectList.appendChild(createProject(i, name));
      taskProjects.appendChild(createTaskOption(i, name));
    }

    console.log(taskProjects.children);
    projectCount.textContent = `(${projects.projectList.length})`;
  };

  const createTask = (index, title, dueDate) => {
    const task = document.createElement("li");
    task.classList.add("task-list__task");
    task.setAttribute("data-index", index);

    const taskLeft = document.createElement("div");
    taskLeft.classList.add("task-left", "flex");

    taskLeft.innerHTML = `
    <input type="checkbox" name="checkbox" id="checkbox" />
    <p class="task-left__title">${title}</p>`;

    const taskRight = document.createElement("div");
    taskRight.classList.add("task-right", "flex");

    taskRight.innerHTML = `
    <p class="task-right__date">${dueDate}</p>
    <i class="fa-solid fa-pen-to-square task-edit task-btn"></i>
    <i class="fa-solid fa-circle-info task-info task-btn"></i>
    <i class="fa-solid fa-trash task-delete task-btn"></i>`;

    task.appendChild(taskLeft);
    task.appendChild(taskRight);
    return task;
  };

  const checkStatus = (status, i) => {
    const taskStatus = document.querySelectorAll("#checkbox");
    const taskLeftTitle = document.querySelectorAll(".task-left__title");
    const task = document.querySelectorAll(".task-list__task");

    if (status === true) {
      taskStatus[i].checked = true;
      taskLeftTitle[i].style.textDecoration = "line-through";
      taskLeftTitle[i].style.opacity = 0.6;
      task[i].style.backgroundColor = "#eee";
      task[i].style.opacity = 0.8;
    }
  };

  const displayTasks = () => {
    mainContentContainer.textContent = "";

    for (let j = 0; j < projects.projectList.length; j++) {
      const { name } = projects.projectList[j];
      mainContentContainer.appendChild(createMainContent(j, name));
    }

    const taskList = document.querySelector(".task-list");

    for (let i = 0; i < tasks.taskList.length; i++) {
      const { title, dueDate, status } = tasks.taskList[i];
      taskList.appendChild(createTask(i, title, dueDate));

      checkStatus(status, i);
    }
  };

  const removeTask = (index) => {
    tasks.taskList.splice(index, 1);
    displayTasks();
  };

  return {
    toggleMenu,
    hideResize,
    showResize,
    showModal,
    hideModal,
    displayTasks,
    removeTask,
    displayProjects,
    container,
    taskTitle,
    taskDescription,
    taskDueDate,
    taskPriority,
    taskProjects,
    projectTitle,
    addTaskModal,
  };
})();

export default dom;

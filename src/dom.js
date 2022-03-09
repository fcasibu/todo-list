import projects from "./projects";
import tasks from "./tasks";
import storage from "./localStorage";

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
  };

  const changeTaskValue = () => {
    const mainContent = document.querySelector(".main-content");
    if (mainContent !== null) {
      const index = mainContent.getAttribute("data-project-index");
      taskProjects.value = index;
    }
  };

  const showModal = (e) => {
    if (e.classList.contains("addtask")) {
      addTaskModal.style.display = "block";
    } else if (e.classList.contains("addproject")) {
      addProjectModal.style.display = "flex";
      projectTitle.value = "";
    }
    document.body.classList.add("overflow");

    clearInputValues();
    changeTaskValue();
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

    const pTitle = document.createElement("p");
    pTitle.classList.add("project__title");
    pTitle.textContent = `${title}`;

    const pUtilities = document.createElement("div");
    pUtilities.classList.add("project__utilities");
    pUtilities.innerHTML = `
    <div class="project__utilities">
    <i class="fa-solid fa-pen-to-square project-edit project-btn" style="pointer-events:auto"></i>
    <i class="fa-solid fa-trash project-delete project-btn" style="pointer-events:auto"></i>
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
    projectCount.textContent = `(${projects.projectList.length})`;
  };

  const createTask = (index, title, dueDate, projectIndex, name) => {
    const task = document.createElement("li");
    task.classList.add("task-list__task");
    task.setAttribute("data-index", index);
    task.setAttribute("data-project-index", projectIndex);

    const taskLeft = document.createElement("div");
    taskLeft.classList.add("task-left", "flex");

    taskLeft.innerHTML = `
    <label for="checkbox-${index}" class="checkbox-circle"></label>
    <input type="checkbox" name="checkbox" id="checkbox-${index}" />
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
    const taskStatus = document.querySelectorAll(`input[type="checkbox"]`);
    const taskCheck = document.querySelectorAll(".checkbox-circle");
    const taskLeftTitle = document.querySelectorAll(".task-left__title");
    const task = document.querySelectorAll(".task-list__task");
    if (status === true) {
      taskStatus[i].checked = true;
      console.log(taskStatus[i].checked);
      taskLeftTitle[i].style.textDecoration = "line-through";
      taskLeftTitle[i].style.opacity = 0.6;
      task[i].style.backgroundColor = "#eee";
      task[i].style.opacity = 0.8;
      taskCheck[i].style.backgroundColor = "var(--main-color)";
    }
  };

  const displayTasks = () => {
    mainContentContainer.textContent = "";

    const selected = document.querySelector(".selected");
    const project = document.querySelectorAll(".project");
    for (let j = 0; j < projects.projectList.length; j++) {
      const { name } = projects.projectList[j];
      const projectName = project[j].children[0].textContent;
      if (projectName === name && project[j].classList.contains("selected")) {
        mainContentContainer.textContent = "";
        mainContentContainer.appendChild(createMainContent(j, name));
      } else if (selected.classList.contains("tasks__all")) {
        mainContentContainer.textContent = "";
        mainContentContainer.appendChild(createMainContent(j, "All"));
        const addTaskBtn = document.querySelector(".addtask");
        addTaskBtn.style.display = "none";
      } else if (selected.classList.contains("tasks__completed")) {
        mainContentContainer.textContent = "";
        mainContentContainer.appendChild(createMainContent(j, "Completed"));
        const addTaskBtn = document.querySelector(".addtask");
        addTaskBtn.style.display = "none";
      }
    }

    const taskList = document.querySelector(".task-list");
    const mainContent = document.querySelector(".main-content");
    const projectIndex = mainContent.getAttribute("data-project-index");

    const filteredList = tasks.taskList.filter((item) => {
      if (selected.classList.contains("project")) {
        return item.projectIndex === projectIndex;
      }
      if (selected.classList.contains("tasks__completed")) {
        return item.status === true;
      }
      if (selected.classList.contains("tasks__all")) {
        return item;
      }
    });

    console.log(filteredList);
    for (let i = 0; i < filteredList.length; i++) {
      const { title, dueDate, status } = filteredList[i];
      taskList.appendChild(createTask(i, title, dueDate, projectIndex));

      checkStatus(status, i);
    }
  };

  const removeTask = (title) => {
    const x = tasks.taskList.find((el) => {
      return el.title === title.toLowerCase();
    });
    const indexOfTask = tasks.taskList.indexOf(x);
    console.log(tasks.taskList.splice(indexOfTask, 1));
    localStorage.setItem("tasks", JSON.stringify(tasks.taskList));
    displayTasks();
  };

  const removeProject = (index) => {
    projects.projectList.splice(index, 1);
    localStorage.setItem("projects", JSON.stringify(projects.projectList));
    displayProjects();
    const project = document.querySelectorAll(".project");
    project[0].classList.add("selected");
    console.log("hey");
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
    removeSelected,
    removeProject,
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

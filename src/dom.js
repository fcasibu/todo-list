import projects from "./projects";
import tasks from "./tasks";

const dom = (() => {
  const menuIcon = document.querySelector(".menu-burger");
  const sideBar = document.querySelector(".sidebar");
  const container = document.querySelector(".container");
  const mainContentContainer = document.querySelector(
    ".main-content-container"
  );
  const projectContainer = document.querySelector(".projects");
  const modal = document.querySelector(".modal");
  const infoModal = document.querySelector(".info-modal__body");
  const formContainer = document.querySelector("form");
  const arrowDown = document.querySelector(".arrow-down");

  const generateForm = (
    className,
    formBtn,
    formBtnName,
    isRequired,
    dueDate,
    title = ""
  ) => {
    formContainer.innerHTML = `
    <form>
        <div class="title-box">
          <label for="${className}">Title</label>
          <input type="text" id="${className}" value="${title}" name="${title}" required="" autocomplete="off">
        </div>
        ${
          isRequired === true
            ? `<div class="date-box">
          <label for="task-date">Due Date</label>
          <input type="date" name="Task Due Date" id="task-date" value="${dueDate}" required="">
        </div>
        <div class="priority-box">
          <label for="task-priority">Priority</label>
          <select name="Task Priority" id="task-priority">
            <option value="Not Important">Not Important</option>
            <option value="Important">Important</option>
            <option value="Very Important">Very Important</option>
          </select>
        </div>`
            : ""
        }
        <button type="submit" class="${formBtn}">${formBtnName}</button>
      </form>`;
  };

  const generateModal = (
    headerTitle,
    className,
    formBtnClass,
    formBtnName,
    isRequired,
    dueDate,
    formInputValue
  ) => {
    const modalTitle = modal.children[0].children[0];
    modalTitle.textContent = headerTitle;
    generateForm(
      className,
      formBtnClass,
      formBtnName,
      isRequired,
      dueDate,
      formInputValue
    );
    modal.style.display = "flex";
    document.body.classList.add("overflow");
  };

  const showInfoModal = (title, status, priority, dueDate) => {
    infoModal.innerHTML = `<h3>Task Title: <span class="body-title">${title}</span></h3>
     <h3>Status: <span class="body-status">${
       status === false ? "Ongoing" : "Completed"
     }</span></h3>
     <h3>Priority: <span class="body-priority">${priority}</span></h3>
     <h3>Due Date: <span class="body-duedate">${dueDate}</span></h3>`;
    infoModal.parentElement.style.display = "flex";
    document.body.classList.add("overflow");
  };

  const hideModal = () => {
    infoModal.parentElement.style.display = "none";
    modal.style.display = "none";
    document.body.classList.remove("overflow");
  };

  const createProject = (title, index) => {
    const project = document.createElement("div");
    project.classList.add("project", "task");
    project.setAttribute("data-project-index", index);

    const pTitle = document.createElement("p");
    pTitle.classList.add("project__title");
    pTitle.textContent = `${title}`;

    const pUtilities = document.createElement("div");
    pUtilities.classList.add("project__utilities");
    pUtilities.innerHTML = `
    <i class="fa-solid fa-pen-to-square project-edit show-modal project-btn" style="pointer-events:auto"></i>
    <i class="fa-solid fa-trash project-delete project-btn" style="pointer-events:auto"></i>
`;

    project.appendChild(pTitle);
    project.appendChild(pUtilities);

    return project;
  };

  const createMainContent = (title, index = "") => {
    const mainContent = document.createElement("div");
    mainContent.classList.add("main-content");
    mainContent.dataset.projectIndex = index;

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

  const addMainContent = (title, index, isRequired = false) => {
    mainContentContainer.textContent = "";
    mainContentContainer.appendChild(createMainContent(title, index));
    if (!isRequired) {
      const addTaskBtn = document.querySelector(".addtask");
      addTaskBtn.style.display = "none";
    }
  };

  const displayMainContent = () => {
    const { getProjectList } = projects;
    const projectList = getProjectList();
    const selected = document.querySelector(".selected");
    const project = document.querySelectorAll(".project");

    if (selected.classList.contains("tasks__all")) {
      addMainContent("All");
    } else if (selected.classList.contains("tasks__completed")) {
      addMainContent("Completed");
    }

    for (let i = 0; i < projectList.length; i++) {
      const { projectTitle, projectIndex } = projectList[i];
      if (project[i].classList.contains("selected")) {
        addMainContent(projectTitle, projectIndex, true);
      }
    }
  };

  const displayProjects = () => {
    const { getProjectList } = projects;
    const projectList = getProjectList();
    projectContainer.textContent = "";

    for (let i = 0; i < projectList.length; i++) {
      const { projectTitle, projectIndex } = projectList[i];
      projectContainer.appendChild(createProject(projectTitle, projectIndex));
    }
  };

  const addPriorityTextColor = (priority, taskTitle) => {
    switch (priority) {
      case "Important":
        taskTitle.style.color = "var(--warning)";
        break;
      case "Very Important":
        taskTitle.style.color = "var(--danger)";
        break;
      default:
        break;
    }
  };

  const createTask = (title, dueDate, projectIndex, index, priority) => {
    const task = document.createElement("li");
    task.classList.add("task-list__task");
    task.dataset.index = index;
    task.dataset.projectIndex = projectIndex;

    const taskLeft = document.createElement("div");
    taskLeft.classList.add("task-left", "flex");
    addPriorityTextColor(priority, taskLeft);

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

  const getFilteredTaskList = () => {
    const { getTaskList } = tasks;
    const taskList = getTaskList();
    const selected = document.querySelector(".selected");
    const mainContent = document.querySelector(".main-content");
    const { projectIndex } = mainContent.dataset;

    const filteredList = taskList.filter((item) => {
      if (selected.classList.contains("project")) {
        return item.projectIndex === +projectIndex;
      }
      if (selected.classList.contains("tasks__completed")) {
        return item.status === true;
      }
      return item;
    });
    return filteredList;
  };

  const checkStatus = (status, i) => {
    const taskStatus = document.querySelectorAll(`input[type="checkbox"]`);
    const taskCheck = document.querySelectorAll(".checkbox-circle");
    const taskLeftTitle = document.querySelectorAll(".task-left__title");
    const task = document.querySelectorAll(".task-list__task");
    if (status === true) {
      taskStatus[i].checked = true;
      taskLeftTitle[i].style.textDecoration = "line-through";
      taskLeftTitle[i].style.opacity = 0.6;
      task[i].style.backgroundColor = "#eee";
      task[i].style.opacity = 0.8;
      taskCheck[i].style.backgroundColor = "var(--main-color)";
    }
  };

  const displayTasks = () => {
    displayMainContent();
    const taskListContainer = document.querySelector(".task-list");
    taskListContainer.textContent = "";

    const filteredList = getFilteredTaskList();
    for (let i = 0; i < filteredList.length; i++) {
      const { taskTitle, dueDate, projectIndex, status, priority } =
        filteredList[i];
      taskListContainer.appendChild(
        createTask(taskTitle, dueDate, projectIndex, i, priority)
      );
      checkStatus(status, i);
    }
  };

  const removeSelected = () => {
    const projectAll = document.querySelectorAll(".selected");
    projectAll.forEach((item) => item.classList.remove("selected"));
  };

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

  const hideProjects = () => {
    projectContainer.classList.remove("show-projects");
    arrowDown.classList.remove("rotate-arrow");
  };

  const showProjects = () => {
    projectContainer.classList.add("show-projects");
    arrowDown.classList.add("rotate-arrow");
  };

  return {
    container,
    generateModal,
    showInfoModal,
    hideModal,
    displayProjects,
    displayTasks,
    displayMainContent,
    removeSelected,
    toggleMenu,
    hideResize,
    showResize,
    hideProjects,
    showProjects,
  };
})();

export default dom;

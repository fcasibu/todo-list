/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");



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
    const { getProjectList } = _projects__WEBPACK_IMPORTED_MODULE_0__["default"];
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
    const { getProjectList } = _projects__WEBPACK_IMPORTED_MODULE_0__["default"];
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
    const { getTaskList } = _tasks__WEBPACK_IMPORTED_MODULE_1__["default"];
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
      if (selected.classList.contains("tasks__all")) {
        return item;
      }
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
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);


/***/ }),

/***/ "./src/eventHandlers.js":
/*!******************************!*\
  !*** ./src/eventHandlers.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");




const eventHandlers = (() => {
  const resizeHandler = () => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 1100) {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].hideResize();
      } else {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].showResize();
      }
    });
  };

  const clickHandler = () => {
    const {
      container,
      generateModal,
      showInfoModal,
      hideModal,
      displayProjects,
      displayTasks,
      removeSelected,
      toggleMenu,
    } = _dom__WEBPACK_IMPORTED_MODULE_0__["default"];
    const { addProject, removeProject, getProjectList, editProject } = _projects__WEBPACK_IMPORTED_MODULE_1__["default"];
    const { addTask, removeTask, getTaskInfo, changeTaskStatus } = _tasks__WEBPACK_IMPORTED_MODULE_2__["default"];

    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-burger")) {
        toggleMenu();
      }

      if (e.target.classList.contains("addproject")) {
        generateModal(
          "New Project",
          "project-title",
          "add-project-btn",
          "Add Project",
          false
        );

        container.addEventListener("click", hideModal);
      }

      if (e.target.classList.contains("addtask")) {
        generateModal(
          "New Task",
          "task-title",
          "add-task-btn",
          "Add Task",
          true
        );

        container.addEventListener("click", hideModal);
      }

      if (e.target.classList.contains("close-modal")) {
        hideModal();

        container.addEventListener("click", hideModal);
      }

      if (e.target.classList.contains("add-project-btn")) {
        e.preventDefault();
        const projectTitle = document.querySelector("#project-title");
        const index = _projects__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectList().length;

        addProject(projectTitle.value, index);
        displayProjects();
        const project = document.querySelectorAll(".project");

        removeSelected();
        project[project.length - 1].classList.add("selected");
        displayTasks();
      }

      if (e.target.classList.contains("add-task-btn")) {
        e.preventDefault();
        const taskTitle = document.querySelector("#task-title");
        const taskDate = document.querySelector("#task-date");
        const taskPriority = document.querySelector("#task-priority");
        const projectIndex =
          +document.querySelector(".main-content").dataset.projectIndex;
        if (!taskTitle.length && !taskDate.checkValidity()) return;
        addTask(
          taskTitle.value,
          taskDate.value,
          taskPriority.value,
          projectIndex
        );
        displayTasks();
        hideModal();
      }

      if (e.target.classList.contains("project")) {
        removeSelected();
        e.target.classList.add("selected");
        displayTasks();
      }

      if (e.target.classList.contains("tasks__all")) {
        removeSelected();
        e.target.classList.add("selected");
        displayTasks();
      }

      if (e.target.classList.contains("task-delete")) {
        const taskName =
          e.target.parentElement.previousElementSibling.children[2].textContent;
        const { projectIndex } = e.target.parentElement.parentElement.dataset;
        removeTask(taskName, +projectIndex);
        displayTasks();
      }

      if (e.target.classList.contains("project-delete")) {
        const { projectIndex } = e.target.parentElement.parentElement.dataset;
        const tasksAll = document.querySelector(".tasks__all");
        removeProject(+projectIndex);
        displayProjects();
        if (getProjectList().length === 0) {
          tasksAll.classList.add("selected");
          displayTasks();
        }
      }

      if (e.target.classList.contains("project-edit")) {
        const projectTitle =
          e.target.parentElement.previousElementSibling.textContent;
        generateModal(
          `Edit Project`,
          "project-title",
          "edit-project-btn",
          "Edit Project",
          false,
          "",
          projectTitle
        );

        container.addEventListener("click", hideModal);
      }

      if (e.target.classList.contains("edit-project-btn")) {
        e.preventDefault();
        const getTitleValue = document.querySelector("#project-title");
        const { value } = getTitleValue;
        const title = getTitleValue.name;
        if (!value.length) return;

        editProject(title, value);
        displayProjects();
        hideModal();
      }

      if (e.target.classList.contains("task-info")) {
        const index = e.target.parentElement.parentElement.dataset.projectIndex;
        const title =
          e.target.parentElement.previousElementSibling.children[2].textContent;
        const { taskTitle, priority, status, dueDate } = getTaskInfo(
          title,
          +index
        );
        showInfoModal(taskTitle, status, priority, dueDate);
        container.addEventListener("click", hideModal);
      }

      if (e.target.classList.contains("task-edit")) {
        const index = e.target.parentElement.parentElement.dataset.projectIndex;
        const title =
          e.target.parentElement.previousElementSibling.children[2].textContent;

        const arr = getTaskInfo(title, +index);
        generateModal(
          "Edit Task",
          "task-title",
          "edit-task-btn",
          "Edit Task",
          true,
          arr.dueDate,
          title
        );
        const taskPriority = document.querySelector("#task-priority");
        const taskTitle = document.querySelector("#task-title");
        const taskDueDate = document.querySelector("#task-date");
        taskPriority.value = arr.priority;

        const editTaskBtn = document.querySelector(".edit-task-btn");

        editTaskBtn.addEventListener("click", (e) => {
          e.preventDefault();
          _tasks__WEBPACK_IMPORTED_MODULE_2__["default"].editTask(
            arr,
            taskTitle.value,
            taskPriority.value,
            taskDueDate.value
          );

          displayTasks();
          hideModal();
        });

        container.addEventListener("click", hideModal);
      }

      if (e.target.classList.contains("tasks__completed")) {
        removeSelected();
        e.target.classList.add("selected");
        displayTasks();
      }

      if (e.target.type === "checkbox") {
        const index = e.target.parentElement.parentElement.dataset.projectIndex;
        const title = e.target.parentElement.children[2].textContent;
        let status = false;
        const arr = getTaskInfo(title, +index);

        if (e.target.checked) {
          status = true;
        }
        changeTaskStatus(arr, status);
        displayTasks();
      }
    });
  };

  return { clickHandler, resizeHandler };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (eventHandlers);


/***/ }),

/***/ "./src/localStorage.js":
/*!*****************************!*\
  !*** ./src/localStorage.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLocalStorage": () => (/* binding */ getLocalStorage),
/* harmony export */   "setLocalStorage": () => (/* binding */ setLocalStorage)
/* harmony export */ });
const setLocalStorage = (itemName, array) => {
  localStorage.setItem(itemName, JSON.stringify(array));
};

const getLocalStorage = (itemName) => {
  return localStorage.getItem(itemName);
};




/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./localStorage */ "./src/localStorage.js");



const projects = (() => {
  const projectList = JSON.parse((0,_localStorage__WEBPACK_IMPORTED_MODULE_1__.getLocalStorage)("projects")) || [
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
    (0,_localStorage__WEBPACK_IMPORTED_MODULE_1__.setLocalStorage)("projects", projectList);
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
    const { getTaskList } = _tasks__WEBPACK_IMPORTED_MODULE_0__["default"];
    const taskList = getTaskList();
    const indexArr = findTask(taskList, projectIndex);
    for (let i = indexArr.length; i > 0; i--) {
      taskList.splice(indexArr.pop(), 1);
    }
    (0,_localStorage__WEBPACK_IMPORTED_MODULE_1__.setLocalStorage)("tasks", taskList);
  };

  const removeProject = (projectIndex) => {
    const indexOfProject = findProject(projectIndex, "projectIndex");
    removeProjectTasks(projectIndex);
    projectList.splice(indexOfProject, 1);
    (0,_localStorage__WEBPACK_IMPORTED_MODULE_1__.setLocalStorage)("projects", projectList);
  };

  const editProject = (title, value) => {
    const indexOfProject = findProject(title, "projectTitle");
    projectList[indexOfProject].projectTitle = value;
    (0,_localStorage__WEBPACK_IMPORTED_MODULE_1__.setLocalStorage)("projects", projectList);
  };

  return { addProject, removeProject, getProjectList, editProject };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projects);


/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./localStorage */ "./src/localStorage.js");


const tasks = (() => {
  const taskList = JSON.parse((0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.getLocalStorage)("tasks")) || [
    {
      taskTitle: "Improve UI Design",
      dueDate: "2022-03-21",
      priority: "Very Important",
      projectIndex: 0,
      status: true,
    },
    {
      taskTitle: "Implement nav animation",
      dueDate: "2022-03-18",
      priority: "Not Important",
      projectIndex: 0,
      status: true,
    },
    {
      taskTitle: "Implement localstorage",
      dueDate: "2022-03-18",
      priority: "Important",
      projectIndex: 0,
      status: true,
    },
    {
      taskTitle: "Add description for tasks",
      dueDate: "2022-03-30",
      priority: "Not Important",
      projectIndex: 0,
      status: false,
    },
    {
      taskTitle: "Implement date-fns",
      dueDate: "2022-03-31",
      priority: "Important",
      projectIndex: 0,
      status: false,
    },
    {
      taskTitle: "Create logic for winning condition and tie",
      dueDate: "2022-03-15",
      priority: "Very Important",
      projectIndex: 1,
      status: true,
    },
    {
      taskTitle: "Improve UI Design",
      dueDate: "2022-03-15",
      priority: "Very Important",
      projectIndex: 1,
      status: true,
    },
    {
      taskTitle: "Implement minimax algorithm",
      dueDate: "2022-03-31",
      priority: "Not Important",
      projectIndex: 1,
      status: false,
    },
    {
      taskTitle: "Change task  title color based on priority",
      dueDate: "2022-03-29",
      priority: "Very Important",
      projectIndex: 0,
      status: false,
    },
    {
      taskTitle: "Implement dark mode",
      dueDate: "2025-04-23",
      priority: "Not Important",
      projectIndex: 0,
      status: false,
    },
    {
      taskTitle: "Code refactor",
      dueDate: "2022-04-01",
      priority: "Very Important",
      projectIndex: 0,
      status: false,
    },
  ];
  class Task {
    constructor(title, dueDate, priority, projectIndex, status) {
      this.taskTitle = title;
      this.dueDate = dueDate;
      this.priority = priority;
      this.projectIndex = projectIndex;
      this.status = status;
    }
  }

  const getTaskList = () => {
    return taskList;
  };

  const addTask = (title, dueDate, priority, projectIndex) => {
    const task = new Task(title, dueDate, priority, projectIndex, false);

    taskList.push(task);
    (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.setLocalStorage)("tasks", taskList);
  };

  const findTask = (taskTitle, projectIndex) => {
    for (const task of taskList) {
      if (task.taskTitle === taskTitle && task.projectIndex === projectIndex) {
        return taskList.indexOf(task);
      }
    }
  };

  const removeTask = (taskTitle, projectIndex) => {
    const index = findTask(taskTitle, projectIndex);
    taskList.splice(index, 1);
    (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.setLocalStorage)("tasks", taskList);
  };

  const getTaskInfo = (taskTitle, projectIndex) => {
    const index = findTask(taskTitle, projectIndex);
    return taskList[index];
  };

  const editTask = (arr, title, priority, dueDate) => {
    arr.taskTitle = title;
    arr.priority = priority;
    arr.dueDate = dueDate;
    (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.setLocalStorage)("tasks", taskList);
  };

  const changeTaskStatus = (arr, status) => {
    arr.status = status;
    (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.setLocalStorage)("tasks", taskList);
  };

  return {
    getTaskList,
    addTask,
    removeTask,
    getTaskInfo,
    editTask,
    changeTaskStatus,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tasks);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _eventHandlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventHandlers */ "./src/eventHandlers.js");



_eventHandlers__WEBPACK_IMPORTED_MODULE_1__["default"].clickHandler();
_eventHandlers__WEBPACK_IMPORTED_MODULE_1__["default"].resizeHandler();

_dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayProjects();
_dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayTasks();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQSxJQUFJLDhEQUFlO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUksOERBQWU7QUFDbkI7O0FBRUEsV0FBVztBQUNYLENBQUM7O0FBRUQsaUVBQWUsUUFBUSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDdkUwQzs7QUFFbEU7QUFDQSw4QkFBOEIsOERBQWU7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLElBQUksOERBQWU7QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSw4REFBZTtBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksOERBQWU7QUFDbkI7O0FBRUE7QUFDQTtBQUNBLElBQUksOERBQWU7QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsaUVBQWUsS0FBSyxFQUFDOzs7Ozs7O1VDaEpyQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ053QjtBQUNvQjs7QUFFNUMsbUVBQTBCO0FBQzFCLG9FQUEyQjs7QUFFM0IsNERBQW1CO0FBQ25CLHlEQUFnQiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvZXZlbnRIYW5kbGVycy5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2xvY2FsU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2plY3RzIGZyb20gXCIuL3Byb2plY3RzXCI7XG5pbXBvcnQgdGFza3MgZnJvbSBcIi4vdGFza3NcIjtcblxuY29uc3QgZG9tID0gKCgpID0+IHtcbiAgY29uc3QgbWVudUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lbnUtYnVyZ2VyXCIpO1xuICBjb25zdCBzaWRlQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyXCIpO1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lclwiKTtcbiAgY29uc3QgbWFpbkNvbnRlbnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiLm1haW4tY29udGVudC1jb250YWluZXJcIlxuICApO1xuICBjb25zdCBwcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0c1wiKTtcbiAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsXCIpO1xuICBjb25zdCBpbmZvTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm8tbW9kYWxfX2JvZHlcIik7XG4gIGNvbnN0IGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKTtcblxuICBjb25zdCBnZW5lcmF0ZUZvcm0gPSAoXG4gICAgY2xhc3NOYW1lLFxuICAgIGZvcm1CdG4sXG4gICAgZm9ybUJ0bk5hbWUsXG4gICAgaXNSZXF1aXJlZCxcbiAgICBkdWVEYXRlLFxuICAgIHRpdGxlID0gXCJcIlxuICApID0+IHtcbiAgICBmb3JtQ29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICA8Zm9ybT5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlLWJveFwiPlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2NsYXNzTmFtZX1cIj5UaXRsZTwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCIke2NsYXNzTmFtZX1cIiB2YWx1ZT1cIiR7dGl0bGV9XCIgbmFtZT1cIiR7dGl0bGV9XCIgcmVxdWlyZWQ9XCJcIiBhdXRvY29tcGxldGU9XCJvZmZcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgICR7XG4gICAgICAgICAgaXNSZXF1aXJlZCA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyBgPGRpdiBjbGFzcz1cImRhdGUtYm94XCI+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cInRhc2stZGF0ZVwiPkR1ZSBEYXRlPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cImRhdGVcIiBuYW1lPVwiVGFzayBEdWUgRGF0ZVwiIGlkPVwidGFzay1kYXRlXCIgdmFsdWU9XCIke2R1ZURhdGV9XCIgcmVxdWlyZWQ9XCJcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcmlvcml0eS1ib3hcIj5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwidGFzay1wcmlvcml0eVwiPlByaW9yaXR5PC9sYWJlbD5cbiAgICAgICAgICA8c2VsZWN0IG5hbWU9XCJUYXNrIFByaW9yaXR5XCIgaWQ9XCJ0YXNrLXByaW9yaXR5XCI+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTm90IEltcG9ydGFudFwiPk5vdCBJbXBvcnRhbnQ8L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJJbXBvcnRhbnRcIj5JbXBvcnRhbnQ8L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJWZXJ5IEltcG9ydGFudFwiPlZlcnkgSW1wb3J0YW50PC9vcHRpb24+XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvZGl2PmBcbiAgICAgICAgICAgIDogXCJcIlxuICAgICAgICB9XG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiJHtmb3JtQnRufVwiPiR7Zm9ybUJ0bk5hbWV9PC9idXR0b24+XG4gICAgICA8L2Zvcm0+YDtcbiAgfTtcblxuICBjb25zdCBnZW5lcmF0ZU1vZGFsID0gKFxuICAgIGhlYWRlclRpdGxlLFxuICAgIGNsYXNzTmFtZSxcbiAgICBmb3JtQnRuQ2xhc3MsXG4gICAgZm9ybUJ0bk5hbWUsXG4gICAgaXNSZXF1aXJlZCxcbiAgICBkdWVEYXRlLFxuICAgIGZvcm1JbnB1dFZhbHVlXG4gICkgPT4ge1xuICAgIGNvbnN0IG1vZGFsVGl0bGUgPSBtb2RhbC5jaGlsZHJlblswXS5jaGlsZHJlblswXTtcbiAgICBtb2RhbFRpdGxlLnRleHRDb250ZW50ID0gaGVhZGVyVGl0bGU7XG4gICAgZ2VuZXJhdGVGb3JtKFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgZm9ybUJ0bkNsYXNzLFxuICAgICAgZm9ybUJ0bk5hbWUsXG4gICAgICBpc1JlcXVpcmVkLFxuICAgICAgZHVlRGF0ZSxcbiAgICAgIGZvcm1JbnB1dFZhbHVlXG4gICAgKTtcbiAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwib3ZlcmZsb3dcIik7XG4gIH07XG5cbiAgY29uc3Qgc2hvd0luZm9Nb2RhbCA9ICh0aXRsZSwgc3RhdHVzLCBwcmlvcml0eSwgZHVlRGF0ZSkgPT4ge1xuICAgIGluZm9Nb2RhbC5pbm5lckhUTUwgPSBgPGgzPlRhc2sgVGl0bGU6IDxzcGFuIGNsYXNzPVwiYm9keS10aXRsZVwiPiR7dGl0bGV9PC9zcGFuPjwvaDM+XG4gICAgIDxoMz5TdGF0dXM6IDxzcGFuIGNsYXNzPVwiYm9keS1zdGF0dXNcIj4ke1xuICAgICAgIHN0YXR1cyA9PT0gZmFsc2UgPyBcIk9uZ29pbmdcIiA6IFwiQ29tcGxldGVkXCJcbiAgICAgfTwvc3Bhbj48L2gzPlxuICAgICA8aDM+UHJpb3JpdHk6IDxzcGFuIGNsYXNzPVwiYm9keS1wcmlvcml0eVwiPiR7cHJpb3JpdHl9PC9zcGFuPjwvaDM+XG4gICAgIDxoMz5EdWUgRGF0ZTogPHNwYW4gY2xhc3M9XCJib2R5LWR1ZWRhdGVcIj4ke2R1ZURhdGV9PC9zcGFuPjwvaDM+YDtcbiAgICBpbmZvTW9kYWwucGFyZW50RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwib3ZlcmZsb3dcIik7XG4gIH07XG5cbiAgY29uc3QgaGlkZU1vZGFsID0gKCkgPT4ge1xuICAgIGluZm9Nb2RhbC5wYXJlbnRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwib3ZlcmZsb3dcIik7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlUHJvamVjdCA9ICh0aXRsZSwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIsIFwidGFza1wiKTtcbiAgICBwcm9qZWN0LnNldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdC1pbmRleFwiLCBpbmRleCk7XG5cbiAgICBjb25zdCBwVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBwVGl0bGUuY2xhc3NMaXN0LmFkZChcInByb2plY3RfX3RpdGxlXCIpO1xuICAgIHBUaXRsZS50ZXh0Q29udGVudCA9IGAke3RpdGxlfWA7XG5cbiAgICBjb25zdCBwVXRpbGl0aWVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwVXRpbGl0aWVzLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0X191dGlsaXRpZXNcIik7XG4gICAgcFV0aWxpdGllcy5pbm5lckhUTUwgPSBgXG4gICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1wZW4tdG8tc3F1YXJlIHByb2plY3QtZWRpdCBzaG93LW1vZGFsIHByb2plY3QtYnRuXCIgc3R5bGU9XCJwb2ludGVyLWV2ZW50czphdXRvXCI+PC9pPlxuICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtdHJhc2ggcHJvamVjdC1kZWxldGUgcHJvamVjdC1idG5cIiBzdHlsZT1cInBvaW50ZXItZXZlbnRzOmF1dG9cIj48L2k+XG5gO1xuXG4gICAgcHJvamVjdC5hcHBlbmRDaGlsZChwVGl0bGUpO1xuICAgIHByb2plY3QuYXBwZW5kQ2hpbGQocFV0aWxpdGllcyk7XG5cbiAgICByZXR1cm4gcHJvamVjdDtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVNYWluQ29udGVudCA9ICh0aXRsZSwgaW5kZXggPSBcIlwiKSA9PiB7XG4gICAgY29uc3QgbWFpbkNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5hZGQoXCJtYWluLWNvbnRlbnRcIik7XG4gICAgbWFpbkNvbnRlbnQuZGF0YXNldC5wcm9qZWN0SW5kZXggPSBpbmRleDtcblxuICAgIGNvbnN0IG1UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICBtVGl0bGUuY2xhc3NMaXN0LmFkZChcInRhc2stdGl0bGVcIik7XG4gICAgbVRpdGxlLnRleHRDb250ZW50ID0gYCR7dGl0bGV9YDtcblxuICAgIGNvbnN0IG1MaXN0SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBtTGlzdEhlYWRlci5jbGFzc0xpc3QuYWRkKFwidGFzay1saXN0LWhlYWRlclwiLCBcImZsZXhcIik7XG4gICAgbUxpc3RIZWFkZXIuaW5uZXJIVE1MID0gYFRhc2tzIDxpIGNsYXNzPVwiZmEtcmVndWxhciBmYS1wbHVzIHRvb2x0aXAgYWRkdGFzayBzaG93LW1vZGFsXCI+PC9pPmA7XG5cbiAgICBjb25zdCBtVGFza0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gICAgbVRhc2tMaXN0LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWxpc3RcIik7XG5cbiAgICBtYWluQ29udGVudC5hcHBlbmRDaGlsZChtVGl0bGUpO1xuICAgIG1haW5Db250ZW50LmFwcGVuZENoaWxkKG1MaXN0SGVhZGVyKTtcbiAgICBtYWluQ29udGVudC5hcHBlbmRDaGlsZChtVGFza0xpc3QpO1xuXG4gICAgcmV0dXJuIG1haW5Db250ZW50O1xuICB9O1xuXG4gIGNvbnN0IGFkZE1haW5Db250ZW50ID0gKHRpdGxlLCBpbmRleCwgaXNSZXF1aXJlZCA9IGZhbHNlKSA9PiB7XG4gICAgbWFpbkNvbnRlbnRDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIG1haW5Db250ZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZU1haW5Db250ZW50KHRpdGxlLCBpbmRleCkpO1xuICAgIGlmICghaXNSZXF1aXJlZCkge1xuICAgICAgY29uc3QgYWRkVGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkdGFza1wiKTtcbiAgICAgIGFkZFRhc2tCdG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBkaXNwbGF5TWFpbkNvbnRlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBnZXRQcm9qZWN0TGlzdCB9ID0gcHJvamVjdHM7XG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBnZXRQcm9qZWN0TGlzdCgpO1xuICAgIGNvbnN0IHNlbGVjdGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RlZFwiKTtcbiAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0XCIpO1xuXG4gICAgaWYgKHNlbGVjdGVkLmNsYXNzTGlzdC5jb250YWlucyhcInRhc2tzX19hbGxcIikpIHtcbiAgICAgIGFkZE1haW5Db250ZW50KFwiQWxsXCIpO1xuICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGFza3NfX2NvbXBsZXRlZFwiKSkge1xuICAgICAgYWRkTWFpbkNvbnRlbnQoXCJDb21wbGV0ZWRcIik7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgeyBwcm9qZWN0VGl0bGUsIHByb2plY3RJbmRleCB9ID0gcHJvamVjdExpc3RbaV07XG4gICAgICBpZiAocHJvamVjdFtpXS5jbGFzc0xpc3QuY29udGFpbnMoXCJzZWxlY3RlZFwiKSkge1xuICAgICAgICBhZGRNYWluQ29udGVudChwcm9qZWN0VGl0bGUsIHByb2plY3RJbmRleCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlQcm9qZWN0cyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGdldFByb2plY3RMaXN0IH0gPSBwcm9qZWN0cztcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGdldFByb2plY3RMaXN0KCk7XG4gICAgcHJvamVjdENvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB7IHByb2plY3RUaXRsZSwgcHJvamVjdEluZGV4IH0gPSBwcm9qZWN0TGlzdFtpXTtcbiAgICAgIHByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlUHJvamVjdChwcm9qZWN0VGl0bGUsIHByb2plY3RJbmRleCkpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhZGRQcmlvcml0eVRleHRDb2xvciA9IChwcmlvcml0eSwgdGFza1RpdGxlKSA9PiB7XG4gICAgc3dpdGNoIChwcmlvcml0eSkge1xuICAgICAgY2FzZSBcIkltcG9ydGFudFwiOlxuICAgICAgICB0YXNrVGl0bGUuc3R5bGUuY29sb3IgPSBcInZhcigtLXdhcm5pbmcpXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlZlcnkgSW1wb3J0YW50XCI6XG4gICAgICAgIHRhc2tUaXRsZS5zdHlsZS5jb2xvciA9IFwidmFyKC0tZGFuZ2VyKVwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjcmVhdGVUYXNrID0gKHRpdGxlLCBkdWVEYXRlLCBwcm9qZWN0SW5kZXgsIGluZGV4LCBwcmlvcml0eSkgPT4ge1xuICAgIGNvbnN0IHRhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgdGFzay5jbGFzc0xpc3QuYWRkKFwidGFzay1saXN0X190YXNrXCIpO1xuICAgIHRhc2suZGF0YXNldC5pbmRleCA9IGluZGV4O1xuICAgIHRhc2suZGF0YXNldC5wcm9qZWN0SW5kZXggPSBwcm9qZWN0SW5kZXg7XG5cbiAgICBjb25zdCB0YXNrTGVmdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGFza0xlZnQuY2xhc3NMaXN0LmFkZChcInRhc2stbGVmdFwiLCBcImZsZXhcIik7XG4gICAgYWRkUHJpb3JpdHlUZXh0Q29sb3IocHJpb3JpdHksIHRhc2tMZWZ0KTtcblxuICAgIHRhc2tMZWZ0LmlubmVySFRNTCA9IGBcbiAgICA8bGFiZWwgZm9yPVwiY2hlY2tib3gtJHtpbmRleH1cIiBjbGFzcz1cImNoZWNrYm94LWNpcmNsZVwiPjwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJjaGVja2JveFwiIGlkPVwiY2hlY2tib3gtJHtpbmRleH1cIiAvPlxuICAgIDxwIGNsYXNzPVwidGFzay1sZWZ0X190aXRsZVwiPiR7dGl0bGV9PC9wPmA7XG5cbiAgICBjb25zdCB0YXNrUmlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRhc2tSaWdodC5jbGFzc0xpc3QuYWRkKFwidGFzay1yaWdodFwiLCBcImZsZXhcIik7XG5cbiAgICB0YXNrUmlnaHQuaW5uZXJIVE1MID0gYFxuICAgIDxwIGNsYXNzPVwidGFzay1yaWdodF9fZGF0ZVwiPiR7ZHVlRGF0ZX08L3A+XG4gICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1wZW4tdG8tc3F1YXJlIHRhc2stZWRpdCB0YXNrLWJ0blwiPjwvaT5cbiAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNpcmNsZS1pbmZvIHRhc2staW5mbyB0YXNrLWJ0blwiPjwvaT5cbiAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXRyYXNoIHRhc2stZGVsZXRlIHRhc2stYnRuXCI+PC9pPmA7XG5cbiAgICB0YXNrLmFwcGVuZENoaWxkKHRhc2tMZWZ0KTtcbiAgICB0YXNrLmFwcGVuZENoaWxkKHRhc2tSaWdodCk7XG4gICAgcmV0dXJuIHRhc2s7XG4gIH07XG5cbiAgY29uc3QgZ2V0RmlsdGVyZWRUYXNrTGlzdCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGdldFRhc2tMaXN0IH0gPSB0YXNrcztcbiAgICBjb25zdCB0YXNrTGlzdCA9IGdldFRhc2tMaXN0KCk7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdGVkXCIpO1xuICAgIGNvbnN0IG1haW5Db250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLWNvbnRlbnRcIik7XG4gICAgY29uc3QgeyBwcm9qZWN0SW5kZXggfSA9IG1haW5Db250ZW50LmRhdGFzZXQ7XG5cbiAgICBjb25zdCBmaWx0ZXJlZExpc3QgPSB0YXNrTGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgIGlmIChzZWxlY3RlZC5jbGFzc0xpc3QuY29udGFpbnMoXCJwcm9qZWN0XCIpKSB7XG4gICAgICAgIHJldHVybiBpdGVtLnByb2plY3RJbmRleCA9PT0gK3Byb2plY3RJbmRleDtcbiAgICAgIH1cbiAgICAgIGlmIChzZWxlY3RlZC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0YXNrc19fY29tcGxldGVkXCIpKSB7XG4gICAgICAgIHJldHVybiBpdGVtLnN0YXR1cyA9PT0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChzZWxlY3RlZC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0YXNrc19fYWxsXCIpKSB7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmaWx0ZXJlZExpc3Q7XG4gIH07XG5cbiAgY29uc3QgY2hlY2tTdGF0dXMgPSAoc3RhdHVzLCBpKSA9PiB7XG4gICAgY29uc3QgdGFza1N0YXR1cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYGlucHV0W3R5cGU9XCJjaGVja2JveFwiXWApO1xuICAgIGNvbnN0IHRhc2tDaGVjayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2hlY2tib3gtY2lyY2xlXCIpO1xuICAgIGNvbnN0IHRhc2tMZWZ0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhc2stbGVmdF9fdGl0bGVcIik7XG4gICAgY29uc3QgdGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFzay1saXN0X190YXNrXCIpO1xuICAgIGlmIChzdGF0dXMgPT09IHRydWUpIHtcbiAgICAgIHRhc2tTdGF0dXNbaV0uY2hlY2tlZCA9IHRydWU7XG4gICAgICB0YXNrTGVmdFRpdGxlW2ldLnN0eWxlLnRleHREZWNvcmF0aW9uID0gXCJsaW5lLXRocm91Z2hcIjtcbiAgICAgIHRhc2tMZWZ0VGl0bGVbaV0uc3R5bGUub3BhY2l0eSA9IDAuNjtcbiAgICAgIHRhc2tbaV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjZWVlXCI7XG4gICAgICB0YXNrW2ldLnN0eWxlLm9wYWNpdHkgPSAwLjg7XG4gICAgICB0YXNrQ2hlY2tbaV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1tYWluLWNvbG9yKVwiO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBkaXNwbGF5VGFza3MgPSAoKSA9PiB7XG4gICAgZGlzcGxheU1haW5Db250ZW50KCk7XG4gICAgY29uc3QgdGFza0xpc3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbGlzdFwiKTtcbiAgICB0YXNrTGlzdENvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICBjb25zdCBmaWx0ZXJlZExpc3QgPSBnZXRGaWx0ZXJlZFRhc2tMaXN0KCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWx0ZXJlZExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHsgdGFza1RpdGxlLCBkdWVEYXRlLCBwcm9qZWN0SW5kZXgsIHN0YXR1cywgcHJpb3JpdHkgfSA9XG4gICAgICAgIGZpbHRlcmVkTGlzdFtpXTtcbiAgICAgIHRhc2tMaXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgICBjcmVhdGVUYXNrKHRhc2tUaXRsZSwgZHVlRGF0ZSwgcHJvamVjdEluZGV4LCBpLCBwcmlvcml0eSlcbiAgICAgICk7XG4gICAgICBjaGVja1N0YXR1cyhzdGF0dXMsIGkpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZW1vdmVTZWxlY3RlZCA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0QWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3RlZFwiKTtcbiAgICBwcm9qZWN0QWxsLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpKTtcbiAgfTtcblxuICBjb25zdCBoaWRlUmVzaXplID0gKCkgPT4ge1xuICAgIG1lbnVJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b2dnbGUtbWVudVwiKTtcbiAgICBzaWRlQmFyLmNsYXNzTGlzdC5hZGQoXCJoaWRlLXNpZGViYXJcIik7XG4gIH07XG5cbiAgY29uc3Qgc2hvd1Jlc2l6ZSA9ICgpID0+IHtcbiAgICBtZW51SWNvbi5jbGFzc0xpc3QuYWRkKFwidG9nZ2xlLW1lbnVcIik7XG4gICAgc2lkZUJhci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZS1zaWRlYmFyXCIpO1xuICB9O1xuXG4gIGNvbnN0IGhpZGVTaWRlQmFyID0gKCkgPT4ge1xuICAgIGlmIChzaWRlQmFyLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGUtc2lkZWJhclwiKSkge1xuICAgICAgc2lkZUJhci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZS1zaWRlYmFyXCIpO1xuICAgICAgc2lkZUJhci5jbGFzc0xpc3QuYWRkKFwic2hvdy1zaWRlYmFyXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaWRlQmFyLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93LXNpZGViYXJcIik7XG4gICAgICBzaWRlQmFyLmNsYXNzTGlzdC5hZGQoXCJoaWRlLXNpZGViYXJcIik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHRvZ2dsZU1lbnUgPSAoKSA9PiB7XG4gICAgaWYgKG1lbnVJY29uLmNsYXNzTGlzdC5jb250YWlucyhcInRvZ2dsZS1tZW51XCIpKSB7XG4gICAgICBtZW51SWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwidG9nZ2xlLW1lbnVcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lbnVJY29uLmNsYXNzTGlzdC5hZGQoXCJ0b2dnbGUtbWVudVwiKTtcbiAgICB9XG4gICAgaGlkZVNpZGVCYXIoKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGNvbnRhaW5lcixcbiAgICBnZW5lcmF0ZU1vZGFsLFxuICAgIHNob3dJbmZvTW9kYWwsXG4gICAgaGlkZU1vZGFsLFxuICAgIGRpc3BsYXlQcm9qZWN0cyxcbiAgICBkaXNwbGF5VGFza3MsXG4gICAgZGlzcGxheU1haW5Db250ZW50LFxuICAgIHJlbW92ZVNlbGVjdGVkLFxuICAgIHRvZ2dsZU1lbnUsXG4gICAgaGlkZVJlc2l6ZSxcbiAgICBzaG93UmVzaXplLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tO1xuIiwiaW1wb3J0IGRvbSBmcm9tIFwiLi9kb21cIjtcbmltcG9ydCBwcm9qZWN0cyBmcm9tIFwiLi9wcm9qZWN0c1wiO1xuaW1wb3J0IHRhc2tzIGZyb20gXCIuL3Rhc2tzXCI7XG5cbmNvbnN0IGV2ZW50SGFuZGxlcnMgPSAoKCkgPT4ge1xuICBjb25zdCByZXNpemVIYW5kbGVyID0gKCkgPT4ge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSAxMTAwKSB7XG4gICAgICAgIGRvbS5oaWRlUmVzaXplKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb20uc2hvd1Jlc2l6ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGNsaWNrSGFuZGxlciA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjb250YWluZXIsXG4gICAgICBnZW5lcmF0ZU1vZGFsLFxuICAgICAgc2hvd0luZm9Nb2RhbCxcbiAgICAgIGhpZGVNb2RhbCxcbiAgICAgIGRpc3BsYXlQcm9qZWN0cyxcbiAgICAgIGRpc3BsYXlUYXNrcyxcbiAgICAgIHJlbW92ZVNlbGVjdGVkLFxuICAgICAgdG9nZ2xlTWVudSxcbiAgICB9ID0gZG9tO1xuICAgIGNvbnN0IHsgYWRkUHJvamVjdCwgcmVtb3ZlUHJvamVjdCwgZ2V0UHJvamVjdExpc3QsIGVkaXRQcm9qZWN0IH0gPSBwcm9qZWN0cztcbiAgICBjb25zdCB7IGFkZFRhc2ssIHJlbW92ZVRhc2ssIGdldFRhc2tJbmZvLCBjaGFuZ2VUYXNrU3RhdHVzIH0gPSB0YXNrcztcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1lbnUtYnVyZ2VyXCIpKSB7XG4gICAgICAgIHRvZ2dsZU1lbnUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImFkZHByb2plY3RcIikpIHtcbiAgICAgICAgZ2VuZXJhdGVNb2RhbChcbiAgICAgICAgICBcIk5ldyBQcm9qZWN0XCIsXG4gICAgICAgICAgXCJwcm9qZWN0LXRpdGxlXCIsXG4gICAgICAgICAgXCJhZGQtcHJvamVjdC1idG5cIixcbiAgICAgICAgICBcIkFkZCBQcm9qZWN0XCIsXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcblxuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhpZGVNb2RhbCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJhZGR0YXNrXCIpKSB7XG4gICAgICAgIGdlbmVyYXRlTW9kYWwoXG4gICAgICAgICAgXCJOZXcgVGFza1wiLFxuICAgICAgICAgIFwidGFzay10aXRsZVwiLFxuICAgICAgICAgIFwiYWRkLXRhc2stYnRuXCIsXG4gICAgICAgICAgXCJBZGQgVGFza1wiLFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcblxuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhpZGVNb2RhbCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjbG9zZS1tb2RhbFwiKSkge1xuICAgICAgICBoaWRlTW9kYWwoKTtcblxuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhpZGVNb2RhbCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJhZGQtcHJvamVjdC1idG5cIikpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtdGl0bGVcIik7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gcHJvamVjdHMuZ2V0UHJvamVjdExpc3QoKS5sZW5ndGg7XG5cbiAgICAgICAgYWRkUHJvamVjdChwcm9qZWN0VGl0bGUudmFsdWUsIGluZGV4KTtcbiAgICAgICAgZGlzcGxheVByb2plY3RzKCk7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3RcIik7XG5cbiAgICAgICAgcmVtb3ZlU2VsZWN0ZWQoKTtcbiAgICAgICAgcHJvamVjdFtwcm9qZWN0Lmxlbmd0aCAtIDFdLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgZGlzcGxheVRhc2tzKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJhZGQtdGFzay1idG5cIikpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stdGl0bGVcIik7XG4gICAgICAgIGNvbnN0IHRhc2tEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWRhdGVcIik7XG4gICAgICAgIGNvbnN0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1wcmlvcml0eVwiKTtcbiAgICAgICAgY29uc3QgcHJvamVjdEluZGV4ID1cbiAgICAgICAgICArZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLWNvbnRlbnRcIikuZGF0YXNldC5wcm9qZWN0SW5kZXg7XG4gICAgICAgIGlmICghdGFza1RpdGxlLmxlbmd0aCAmJiAhdGFza0RhdGUuY2hlY2tWYWxpZGl0eSgpKSByZXR1cm47XG4gICAgICAgIGFkZFRhc2soXG4gICAgICAgICAgdGFza1RpdGxlLnZhbHVlLFxuICAgICAgICAgIHRhc2tEYXRlLnZhbHVlLFxuICAgICAgICAgIHRhc2tQcmlvcml0eS52YWx1ZSxcbiAgICAgICAgICBwcm9qZWN0SW5kZXhcbiAgICAgICAgKTtcbiAgICAgICAgZGlzcGxheVRhc2tzKCk7XG4gICAgICAgIGhpZGVNb2RhbCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicHJvamVjdFwiKSkge1xuICAgICAgICByZW1vdmVTZWxlY3RlZCgpO1xuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgICAgIGRpc3BsYXlUYXNrcygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGFza3NfX2FsbFwiKSkge1xuICAgICAgICByZW1vdmVTZWxlY3RlZCgpO1xuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgICAgIGRpc3BsYXlUYXNrcygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGFzay1kZWxldGVcIikpIHtcbiAgICAgICAgY29uc3QgdGFza05hbWUgPVxuICAgICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy5jaGlsZHJlblsyXS50ZXh0Q29udGVudDtcbiAgICAgICAgY29uc3QgeyBwcm9qZWN0SW5kZXggfSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0O1xuICAgICAgICByZW1vdmVUYXNrKHRhc2tOYW1lLCArcHJvamVjdEluZGV4KTtcbiAgICAgICAgZGlzcGxheVRhc2tzKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwcm9qZWN0LWRlbGV0ZVwiKSkge1xuICAgICAgICBjb25zdCB7IHByb2plY3RJbmRleCB9ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXQ7XG4gICAgICAgIGNvbnN0IHRhc2tzQWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrc19fYWxsXCIpO1xuICAgICAgICByZW1vdmVQcm9qZWN0KCtwcm9qZWN0SW5kZXgpO1xuICAgICAgICBkaXNwbGF5UHJvamVjdHMoKTtcbiAgICAgICAgaWYgKGdldFByb2plY3RMaXN0KCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGFza3NBbGwuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xuICAgICAgICAgIGRpc3BsYXlUYXNrcygpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwcm9qZWN0LWVkaXRcIikpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID1cbiAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQ7XG4gICAgICAgIGdlbmVyYXRlTW9kYWwoXG4gICAgICAgICAgYEVkaXQgUHJvamVjdGAsXG4gICAgICAgICAgXCJwcm9qZWN0LXRpdGxlXCIsXG4gICAgICAgICAgXCJlZGl0LXByb2plY3QtYnRuXCIsXG4gICAgICAgICAgXCJFZGl0IFByb2plY3RcIixcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICBcIlwiLFxuICAgICAgICAgIHByb2plY3RUaXRsZVxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGlkZU1vZGFsKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXQtcHJvamVjdC1idG5cIikpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBnZXRUaXRsZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LXRpdGxlXCIpO1xuICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSBnZXRUaXRsZVZhbHVlO1xuICAgICAgICBjb25zdCB0aXRsZSA9IGdldFRpdGxlVmFsdWUubmFtZTtcbiAgICAgICAgaWYgKCF2YWx1ZS5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBlZGl0UHJvamVjdCh0aXRsZSwgdmFsdWUpO1xuICAgICAgICBkaXNwbGF5UHJvamVjdHMoKTtcbiAgICAgICAgaGlkZU1vZGFsKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0YXNrLWluZm9cIikpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZGF0YXNldC5wcm9qZWN0SW5kZXg7XG4gICAgICAgIGNvbnN0IHRpdGxlID1cbiAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2hpbGRyZW5bMl0udGV4dENvbnRlbnQ7XG4gICAgICAgIGNvbnN0IHsgdGFza1RpdGxlLCBwcmlvcml0eSwgc3RhdHVzLCBkdWVEYXRlIH0gPSBnZXRUYXNrSW5mbyhcbiAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAraW5kZXhcbiAgICAgICAgKTtcbiAgICAgICAgc2hvd0luZm9Nb2RhbCh0YXNrVGl0bGUsIHN0YXR1cywgcHJpb3JpdHksIGR1ZURhdGUpO1xuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhpZGVNb2RhbCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0YXNrLWVkaXRcIikpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZGF0YXNldC5wcm9qZWN0SW5kZXg7XG4gICAgICAgIGNvbnN0IHRpdGxlID1cbiAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2hpbGRyZW5bMl0udGV4dENvbnRlbnQ7XG5cbiAgICAgICAgY29uc3QgYXJyID0gZ2V0VGFza0luZm8odGl0bGUsICtpbmRleCk7XG4gICAgICAgIGdlbmVyYXRlTW9kYWwoXG4gICAgICAgICAgXCJFZGl0IFRhc2tcIixcbiAgICAgICAgICBcInRhc2stdGl0bGVcIixcbiAgICAgICAgICBcImVkaXQtdGFzay1idG5cIixcbiAgICAgICAgICBcIkVkaXQgVGFza1wiLFxuICAgICAgICAgIHRydWUsXG4gICAgICAgICAgYXJyLmR1ZURhdGUsXG4gICAgICAgICAgdGl0bGVcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLXByaW9yaXR5XCIpO1xuICAgICAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stdGl0bGVcIik7XG4gICAgICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWRhdGVcIik7XG4gICAgICAgIHRhc2tQcmlvcml0eS52YWx1ZSA9IGFyci5wcmlvcml0eTtcblxuICAgICAgICBjb25zdCBlZGl0VGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZWRpdC10YXNrLWJ0blwiKTtcblxuICAgICAgICBlZGl0VGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGFza3MuZWRpdFRhc2soXG4gICAgICAgICAgICBhcnIsXG4gICAgICAgICAgICB0YXNrVGl0bGUudmFsdWUsXG4gICAgICAgICAgICB0YXNrUHJpb3JpdHkudmFsdWUsXG4gICAgICAgICAgICB0YXNrRHVlRGF0ZS52YWx1ZVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBkaXNwbGF5VGFza3MoKTtcbiAgICAgICAgICBoaWRlTW9kYWwoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoaWRlTW9kYWwpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGFza3NfX2NvbXBsZXRlZFwiKSkge1xuICAgICAgICByZW1vdmVTZWxlY3RlZCgpO1xuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgICAgIGRpc3BsYXlUYXNrcygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZS50YXJnZXQudHlwZSA9PT0gXCJjaGVja2JveFwiKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXQucHJvamVjdEluZGV4O1xuICAgICAgICBjb25zdCB0aXRsZSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMl0udGV4dENvbnRlbnQ7XG4gICAgICAgIGxldCBzdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgYXJyID0gZ2V0VGFza0luZm8odGl0bGUsICtpbmRleCk7XG5cbiAgICAgICAgaWYgKGUudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgICBzdGF0dXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNoYW5nZVRhc2tTdGF0dXMoYXJyLCBzdGF0dXMpO1xuICAgICAgICBkaXNwbGF5VGFza3MoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4geyBjbGlja0hhbmRsZXIsIHJlc2l6ZUhhbmRsZXIgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGV2ZW50SGFuZGxlcnM7XG4iLCJjb25zdCBzZXRMb2NhbFN0b3JhZ2UgPSAoaXRlbU5hbWUsIGFycmF5KSA9PiB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGl0ZW1OYW1lLCBKU09OLnN0cmluZ2lmeShhcnJheSkpO1xufTtcblxuY29uc3QgZ2V0TG9jYWxTdG9yYWdlID0gKGl0ZW1OYW1lKSA9PiB7XG4gIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShpdGVtTmFtZSk7XG59O1xuXG5leHBvcnQgeyBzZXRMb2NhbFN0b3JhZ2UsIGdldExvY2FsU3RvcmFnZSB9O1xuIiwiaW1wb3J0IHRhc2tzIGZyb20gXCIuL3Rhc2tzXCI7XG5pbXBvcnQgeyBzZXRMb2NhbFN0b3JhZ2UsIGdldExvY2FsU3RvcmFnZSB9IGZyb20gXCIuL2xvY2FsU3RvcmFnZVwiO1xuXG5jb25zdCBwcm9qZWN0cyA9ICgoKSA9PiB7XG4gIGNvbnN0IHByb2plY3RMaXN0ID0gSlNPTi5wYXJzZShnZXRMb2NhbFN0b3JhZ2UoXCJwcm9qZWN0c1wiKSkgfHwgW1xuICAgIHsgcHJvamVjdFRpdGxlOiBcIlRvZG9saXN0IHByb2plY3RcIiwgcHJvamVjdEluZGV4OiAwIH0sXG4gICAgeyBwcm9qZWN0VGl0bGU6IFwiVGljIFRhYyBUb2UgUHJvamVjdFwiLCBwcm9qZWN0SW5kZXg6IDEgfSxcbiAgXTtcbiAgY2xhc3MgUHJvamVjdHMge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBpbmRleCkge1xuICAgICAgdGhpcy5wcm9qZWN0VGl0bGUgPSB0aXRsZTtcbiAgICAgIHRoaXMucHJvamVjdEluZGV4ID0gaW5kZXg7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZ2V0UHJvamVjdExpc3QgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHByb2plY3RMaXN0O1xuICB9O1xuXG4gIGNvbnN0IGFkZFByb2plY3QgPSAodGl0bGUsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0cyh0aXRsZSwgaW5kZXgpO1xuXG4gICAgcHJvamVjdExpc3QucHVzaChwcm9qZWN0KTtcbiAgICBzZXRMb2NhbFN0b3JhZ2UoXCJwcm9qZWN0c1wiLCBwcm9qZWN0TGlzdCk7XG4gIH07XG5cbiAgY29uc3QgZmluZFRhc2sgPSAodGFza0xpc3QsIHByb2plY3RJbmRleCkgPT4ge1xuICAgIGNvbnN0IGluZGV4QXJyYXkgPSBbXTtcbiAgICB0YXNrTGlzdC5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICBpZiAodGFzay5wcm9qZWN0SW5kZXggPT09IHByb2plY3RJbmRleCkge1xuICAgICAgICBpbmRleEFycmF5LnB1c2godGFza0xpc3QuaW5kZXhPZih0YXNrKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW5kZXhBcnJheTtcbiAgfTtcblxuICBjb25zdCBmaW5kUHJvamVjdCA9ICh2YWx1ZSwgcHJvcE5hbWUpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocHJvamVjdExpc3RbaV1bcHJvcE5hbWVdID09PSB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gcHJvamVjdExpc3QuaW5kZXhPZihwcm9qZWN0TGlzdFtpXSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlbW92ZVByb2plY3RUYXNrcyA9IChwcm9qZWN0SW5kZXgpID0+IHtcbiAgICBjb25zdCB7IGdldFRhc2tMaXN0IH0gPSB0YXNrcztcbiAgICBjb25zdCB0YXNrTGlzdCA9IGdldFRhc2tMaXN0KCk7XG4gICAgY29uc3QgaW5kZXhBcnIgPSBmaW5kVGFzayh0YXNrTGlzdCwgcHJvamVjdEluZGV4KTtcbiAgICBmb3IgKGxldCBpID0gaW5kZXhBcnIubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICB0YXNrTGlzdC5zcGxpY2UoaW5kZXhBcnIucG9wKCksIDEpO1xuICAgIH1cbiAgICBzZXRMb2NhbFN0b3JhZ2UoXCJ0YXNrc1wiLCB0YXNrTGlzdCk7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlUHJvamVjdCA9IChwcm9qZWN0SW5kZXgpID0+IHtcbiAgICBjb25zdCBpbmRleE9mUHJvamVjdCA9IGZpbmRQcm9qZWN0KHByb2plY3RJbmRleCwgXCJwcm9qZWN0SW5kZXhcIik7XG4gICAgcmVtb3ZlUHJvamVjdFRhc2tzKHByb2plY3RJbmRleCk7XG4gICAgcHJvamVjdExpc3Quc3BsaWNlKGluZGV4T2ZQcm9qZWN0LCAxKTtcbiAgICBzZXRMb2NhbFN0b3JhZ2UoXCJwcm9qZWN0c1wiLCBwcm9qZWN0TGlzdCk7XG4gIH07XG5cbiAgY29uc3QgZWRpdFByb2plY3QgPSAodGl0bGUsIHZhbHVlKSA9PiB7XG4gICAgY29uc3QgaW5kZXhPZlByb2plY3QgPSBmaW5kUHJvamVjdCh0aXRsZSwgXCJwcm9qZWN0VGl0bGVcIik7XG4gICAgcHJvamVjdExpc3RbaW5kZXhPZlByb2plY3RdLnByb2plY3RUaXRsZSA9IHZhbHVlO1xuICAgIHNldExvY2FsU3RvcmFnZShcInByb2plY3RzXCIsIHByb2plY3RMaXN0KTtcbiAgfTtcblxuICByZXR1cm4geyBhZGRQcm9qZWN0LCByZW1vdmVQcm9qZWN0LCBnZXRQcm9qZWN0TGlzdCwgZWRpdFByb2plY3QgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHByb2plY3RzO1xuIiwiaW1wb3J0IHsgZ2V0TG9jYWxTdG9yYWdlLCBzZXRMb2NhbFN0b3JhZ2UgfSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2VcIjtcblxuY29uc3QgdGFza3MgPSAoKCkgPT4ge1xuICBjb25zdCB0YXNrTGlzdCA9IEpTT04ucGFyc2UoZ2V0TG9jYWxTdG9yYWdlKFwidGFza3NcIikpIHx8IFtcbiAgICB7XG4gICAgICB0YXNrVGl0bGU6IFwiSW1wcm92ZSBVSSBEZXNpZ25cIixcbiAgICAgIGR1ZURhdGU6IFwiMjAyMi0wMy0yMVwiLFxuICAgICAgcHJpb3JpdHk6IFwiVmVyeSBJbXBvcnRhbnRcIixcbiAgICAgIHByb2plY3RJbmRleDogMCxcbiAgICAgIHN0YXR1czogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRhc2tUaXRsZTogXCJJbXBsZW1lbnQgbmF2IGFuaW1hdGlvblwiLFxuICAgICAgZHVlRGF0ZTogXCIyMDIyLTAzLTE4XCIsXG4gICAgICBwcmlvcml0eTogXCJOb3QgSW1wb3J0YW50XCIsXG4gICAgICBwcm9qZWN0SW5kZXg6IDAsXG4gICAgICBzdGF0dXM6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICB0YXNrVGl0bGU6IFwiSW1wbGVtZW50IGxvY2Fsc3RvcmFnZVwiLFxuICAgICAgZHVlRGF0ZTogXCIyMDIyLTAzLTE4XCIsXG4gICAgICBwcmlvcml0eTogXCJJbXBvcnRhbnRcIixcbiAgICAgIHByb2plY3RJbmRleDogMCxcbiAgICAgIHN0YXR1czogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRhc2tUaXRsZTogXCJBZGQgZGVzY3JpcHRpb24gZm9yIHRhc2tzXCIsXG4gICAgICBkdWVEYXRlOiBcIjIwMjItMDMtMzBcIixcbiAgICAgIHByaW9yaXR5OiBcIk5vdCBJbXBvcnRhbnRcIixcbiAgICAgIHByb2plY3RJbmRleDogMCxcbiAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgfSxcbiAgICB7XG4gICAgICB0YXNrVGl0bGU6IFwiSW1wbGVtZW50IGRhdGUtZm5zXCIsXG4gICAgICBkdWVEYXRlOiBcIjIwMjItMDMtMzFcIixcbiAgICAgIHByaW9yaXR5OiBcIkltcG9ydGFudFwiLFxuICAgICAgcHJvamVjdEluZGV4OiAwLFxuICAgICAgc3RhdHVzOiBmYWxzZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRhc2tUaXRsZTogXCJDcmVhdGUgbG9naWMgZm9yIHdpbm5pbmcgY29uZGl0aW9uIGFuZCB0aWVcIixcbiAgICAgIGR1ZURhdGU6IFwiMjAyMi0wMy0xNVwiLFxuICAgICAgcHJpb3JpdHk6IFwiVmVyeSBJbXBvcnRhbnRcIixcbiAgICAgIHByb2plY3RJbmRleDogMSxcbiAgICAgIHN0YXR1czogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRhc2tUaXRsZTogXCJJbXByb3ZlIFVJIERlc2lnblwiLFxuICAgICAgZHVlRGF0ZTogXCIyMDIyLTAzLTE1XCIsXG4gICAgICBwcmlvcml0eTogXCJWZXJ5IEltcG9ydGFudFwiLFxuICAgICAgcHJvamVjdEluZGV4OiAxLFxuICAgICAgc3RhdHVzOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgdGFza1RpdGxlOiBcIkltcGxlbWVudCBtaW5pbWF4IGFsZ29yaXRobVwiLFxuICAgICAgZHVlRGF0ZTogXCIyMDIyLTAzLTMxXCIsXG4gICAgICBwcmlvcml0eTogXCJOb3QgSW1wb3J0YW50XCIsXG4gICAgICBwcm9qZWN0SW5kZXg6IDEsXG4gICAgICBzdGF0dXM6IGZhbHNlLFxuICAgIH0sXG4gICAge1xuICAgICAgdGFza1RpdGxlOiBcIkNoYW5nZSB0YXNrICB0aXRsZSBjb2xvciBiYXNlZCBvbiBwcmlvcml0eVwiLFxuICAgICAgZHVlRGF0ZTogXCIyMDIyLTAzLTI5XCIsXG4gICAgICBwcmlvcml0eTogXCJWZXJ5IEltcG9ydGFudFwiLFxuICAgICAgcHJvamVjdEluZGV4OiAwLFxuICAgICAgc3RhdHVzOiBmYWxzZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRhc2tUaXRsZTogXCJJbXBsZW1lbnQgZGFyayBtb2RlXCIsXG4gICAgICBkdWVEYXRlOiBcIjIwMjUtMDQtMjNcIixcbiAgICAgIHByaW9yaXR5OiBcIk5vdCBJbXBvcnRhbnRcIixcbiAgICAgIHByb2plY3RJbmRleDogMCxcbiAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgfSxcbiAgICB7XG4gICAgICB0YXNrVGl0bGU6IFwiQ29kZSByZWZhY3RvclwiLFxuICAgICAgZHVlRGF0ZTogXCIyMDIyLTA0LTAxXCIsXG4gICAgICBwcmlvcml0eTogXCJWZXJ5IEltcG9ydGFudFwiLFxuICAgICAgcHJvamVjdEluZGV4OiAwLFxuICAgICAgc3RhdHVzOiBmYWxzZSxcbiAgICB9LFxuICBdO1xuICBjbGFzcyBUYXNrIHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3RJbmRleCwgc3RhdHVzKSB7XG4gICAgICB0aGlzLnRhc2tUaXRsZSA9IHRpdGxlO1xuICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgIHRoaXMucHJvamVjdEluZGV4ID0gcHJvamVjdEluZGV4O1xuICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZ2V0VGFza0xpc3QgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRhc2tMaXN0O1xuICB9O1xuXG4gIGNvbnN0IGFkZFRhc2sgPSAodGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0SW5kZXgpID0+IHtcbiAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sodGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0SW5kZXgsIGZhbHNlKTtcblxuICAgIHRhc2tMaXN0LnB1c2godGFzayk7XG4gICAgc2V0TG9jYWxTdG9yYWdlKFwidGFza3NcIiwgdGFza0xpc3QpO1xuICB9O1xuXG4gIGNvbnN0IGZpbmRUYXNrID0gKHRhc2tUaXRsZSwgcHJvamVjdEluZGV4KSA9PiB7XG4gICAgZm9yIChjb25zdCB0YXNrIG9mIHRhc2tMaXN0KSB7XG4gICAgICBpZiAodGFzay50YXNrVGl0bGUgPT09IHRhc2tUaXRsZSAmJiB0YXNrLnByb2plY3RJbmRleCA9PT0gcHJvamVjdEluZGV4KSB7XG4gICAgICAgIHJldHVybiB0YXNrTGlzdC5pbmRleE9mKHRhc2spO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCByZW1vdmVUYXNrID0gKHRhc2tUaXRsZSwgcHJvamVjdEluZGV4KSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSBmaW5kVGFzayh0YXNrVGl0bGUsIHByb2plY3RJbmRleCk7XG4gICAgdGFza0xpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICBzZXRMb2NhbFN0b3JhZ2UoXCJ0YXNrc1wiLCB0YXNrTGlzdCk7XG4gIH07XG5cbiAgY29uc3QgZ2V0VGFza0luZm8gPSAodGFza1RpdGxlLCBwcm9qZWN0SW5kZXgpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IGZpbmRUYXNrKHRhc2tUaXRsZSwgcHJvamVjdEluZGV4KTtcbiAgICByZXR1cm4gdGFza0xpc3RbaW5kZXhdO1xuICB9O1xuXG4gIGNvbnN0IGVkaXRUYXNrID0gKGFyciwgdGl0bGUsIHByaW9yaXR5LCBkdWVEYXRlKSA9PiB7XG4gICAgYXJyLnRhc2tUaXRsZSA9IHRpdGxlO1xuICAgIGFyci5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIGFyci5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICBzZXRMb2NhbFN0b3JhZ2UoXCJ0YXNrc1wiLCB0YXNrTGlzdCk7XG4gIH07XG5cbiAgY29uc3QgY2hhbmdlVGFza1N0YXR1cyA9IChhcnIsIHN0YXR1cykgPT4ge1xuICAgIGFyci5zdGF0dXMgPSBzdGF0dXM7XG4gICAgc2V0TG9jYWxTdG9yYWdlKFwidGFza3NcIiwgdGFza0xpc3QpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZ2V0VGFza0xpc3QsXG4gICAgYWRkVGFzayxcbiAgICByZW1vdmVUYXNrLFxuICAgIGdldFRhc2tJbmZvLFxuICAgIGVkaXRUYXNrLFxuICAgIGNoYW5nZVRhc2tTdGF0dXMsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCB0YXNrcztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGRvbSBmcm9tIFwiLi9kb21cIjtcbmltcG9ydCBldmVudEhhbmRsZXJzIGZyb20gXCIuL2V2ZW50SGFuZGxlcnNcIjtcblxuZXZlbnRIYW5kbGVycy5jbGlja0hhbmRsZXIoKTtcbmV2ZW50SGFuZGxlcnMucmVzaXplSGFuZGxlcigpO1xuXG5kb20uZGlzcGxheVByb2plY3RzKCk7XG5kb20uZGlzcGxheVRhc2tzKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
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
        const index = getProjectList().length;

        if (!projectTitle.value.length) return;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsQ0FBQzs7QUFFRCxpRUFBZSxLQUFLLEVBQUM7Ozs7Ozs7VUNoSnJCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTndCO0FBQ29COztBQUU1QyxtRUFBMEI7QUFDMUIsb0VBQTJCOztBQUUzQiw0REFBbUI7QUFDbkIseURBQWdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9ldmVudEhhbmRsZXJzLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvbG9jYWxTdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvamVjdHMgZnJvbSBcIi4vcHJvamVjdHNcIjtcbmltcG9ydCB0YXNrcyBmcm9tIFwiLi90YXNrc1wiO1xuXG5jb25zdCBkb20gPSAoKCkgPT4ge1xuICBjb25zdCBtZW51SWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVudS1idXJnZXJcIik7XG4gIGNvbnN0IHNpZGVCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXJcIik7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyXCIpO1xuICBjb25zdCBtYWluQ29udGVudENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIubWFpbi1jb250ZW50LWNvbnRhaW5lclwiXG4gICk7XG4gIGNvbnN0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3RzXCIpO1xuICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxcIik7XG4gIGNvbnN0IGluZm9Nb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5mby1tb2RhbF9fYm9keVwiKTtcbiAgY29uc3QgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpO1xuXG4gIGNvbnN0IGdlbmVyYXRlRm9ybSA9IChcbiAgICBjbGFzc05hbWUsXG4gICAgZm9ybUJ0bixcbiAgICBmb3JtQnRuTmFtZSxcbiAgICBpc1JlcXVpcmVkLFxuICAgIGR1ZURhdGUsXG4gICAgdGl0bGUgPSBcIlwiXG4gICkgPT4ge1xuICAgIGZvcm1Db250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgIDxmb3JtPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGUtYm94XCI+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cIiR7Y2xhc3NOYW1lfVwiPlRpdGxlPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cIiR7Y2xhc3NOYW1lfVwiIHZhbHVlPVwiJHt0aXRsZX1cIiBuYW1lPVwiJHt0aXRsZX1cIiByZXF1aXJlZD1cIlwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgJHtcbiAgICAgICAgICBpc1JlcXVpcmVkID09PSB0cnVlXG4gICAgICAgICAgICA/IGA8ZGl2IGNsYXNzPVwiZGF0ZS1ib3hcIj5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwidGFzay1kYXRlXCI+RHVlIERhdGU8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIG5hbWU9XCJUYXNrIER1ZSBEYXRlXCIgaWQ9XCJ0YXNrLWRhdGVcIiB2YWx1ZT1cIiR7ZHVlRGF0ZX1cIiByZXF1aXJlZD1cIlwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInByaW9yaXR5LWJveFwiPlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0YXNrLXByaW9yaXR5XCI+UHJpb3JpdHk8L2xhYmVsPlxuICAgICAgICAgIDxzZWxlY3QgbmFtZT1cIlRhc2sgUHJpb3JpdHlcIiBpZD1cInRhc2stcHJpb3JpdHlcIj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJOb3QgSW1wb3J0YW50XCI+Tm90IEltcG9ydGFudDwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkltcG9ydGFudFwiPkltcG9ydGFudDwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlZlcnkgSW1wb3J0YW50XCI+VmVyeSBJbXBvcnRhbnQ8L29wdGlvbj5cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPC9kaXY+YFxuICAgICAgICAgICAgOiBcIlwiXG4gICAgICAgIH1cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCIke2Zvcm1CdG59XCI+JHtmb3JtQnRuTmFtZX08L2J1dHRvbj5cbiAgICAgIDwvZm9ybT5gO1xuICB9O1xuXG4gIGNvbnN0IGdlbmVyYXRlTW9kYWwgPSAoXG4gICAgaGVhZGVyVGl0bGUsXG4gICAgY2xhc3NOYW1lLFxuICAgIGZvcm1CdG5DbGFzcyxcbiAgICBmb3JtQnRuTmFtZSxcbiAgICBpc1JlcXVpcmVkLFxuICAgIGR1ZURhdGUsXG4gICAgZm9ybUlucHV0VmFsdWVcbiAgKSA9PiB7XG4gICAgY29uc3QgbW9kYWxUaXRsZSA9IG1vZGFsLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdO1xuICAgIG1vZGFsVGl0bGUudGV4dENvbnRlbnQgPSBoZWFkZXJUaXRsZTtcbiAgICBnZW5lcmF0ZUZvcm0oXG4gICAgICBjbGFzc05hbWUsXG4gICAgICBmb3JtQnRuQ2xhc3MsXG4gICAgICBmb3JtQnRuTmFtZSxcbiAgICAgIGlzUmVxdWlyZWQsXG4gICAgICBkdWVEYXRlLFxuICAgICAgZm9ybUlucHV0VmFsdWVcbiAgICApO1xuICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJvdmVyZmxvd1wiKTtcbiAgfTtcblxuICBjb25zdCBzaG93SW5mb01vZGFsID0gKHRpdGxlLCBzdGF0dXMsIHByaW9yaXR5LCBkdWVEYXRlKSA9PiB7XG4gICAgaW5mb01vZGFsLmlubmVySFRNTCA9IGA8aDM+VGFzayBUaXRsZTogPHNwYW4gY2xhc3M9XCJib2R5LXRpdGxlXCI+JHt0aXRsZX08L3NwYW4+PC9oMz5cbiAgICAgPGgzPlN0YXR1czogPHNwYW4gY2xhc3M9XCJib2R5LXN0YXR1c1wiPiR7XG4gICAgICAgc3RhdHVzID09PSBmYWxzZSA/IFwiT25nb2luZ1wiIDogXCJDb21wbGV0ZWRcIlxuICAgICB9PC9zcGFuPjwvaDM+XG4gICAgIDxoMz5Qcmlvcml0eTogPHNwYW4gY2xhc3M9XCJib2R5LXByaW9yaXR5XCI+JHtwcmlvcml0eX08L3NwYW4+PC9oMz5cbiAgICAgPGgzPkR1ZSBEYXRlOiA8c3BhbiBjbGFzcz1cImJvZHktZHVlZGF0ZVwiPiR7ZHVlRGF0ZX08L3NwYW4+PC9oMz5gO1xuICAgIGluZm9Nb2RhbC5wYXJlbnRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJvdmVyZmxvd1wiKTtcbiAgfTtcblxuICBjb25zdCBoaWRlTW9kYWwgPSAoKSA9PiB7XG4gICAgaW5mb01vZGFsLnBhcmVudEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJvdmVyZmxvd1wiKTtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVQcm9qZWN0ID0gKHRpdGxlLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByb2plY3QuY2xhc3NMaXN0LmFkZChcInByb2plY3RcIiwgXCJ0YXNrXCIpO1xuICAgIHByb2plY3Quc2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0LWluZGV4XCIsIGluZGV4KTtcblxuICAgIGNvbnN0IHBUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHBUaXRsZS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdF9fdGl0bGVcIik7XG4gICAgcFRpdGxlLnRleHRDb250ZW50ID0gYCR7dGl0bGV9YDtcblxuICAgIGNvbnN0IHBVdGlsaXRpZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHBVdGlsaXRpZXMuY2xhc3NMaXN0LmFkZChcInByb2plY3RfX3V0aWxpdGllc1wiKTtcbiAgICBwVXRpbGl0aWVzLmlubmVySFRNTCA9IGBcbiAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXBlbi10by1zcXVhcmUgcHJvamVjdC1lZGl0IHNob3ctbW9kYWwgcHJvamVjdC1idG5cIiBzdHlsZT1cInBvaW50ZXItZXZlbnRzOmF1dG9cIj48L2k+XG4gICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS10cmFzaCBwcm9qZWN0LWRlbGV0ZSBwcm9qZWN0LWJ0blwiIHN0eWxlPVwicG9pbnRlci1ldmVudHM6YXV0b1wiPjwvaT5cbmA7XG5cbiAgICBwcm9qZWN0LmFwcGVuZENoaWxkKHBUaXRsZSk7XG4gICAgcHJvamVjdC5hcHBlbmRDaGlsZChwVXRpbGl0aWVzKTtcblxuICAgIHJldHVybiBwcm9qZWN0O1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZU1haW5Db250ZW50ID0gKHRpdGxlLCBpbmRleCA9IFwiXCIpID0+IHtcbiAgICBjb25zdCBtYWluQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LmFkZChcIm1haW4tY29udGVudFwiKTtcbiAgICBtYWluQ29udGVudC5kYXRhc2V0LnByb2plY3RJbmRleCA9IGluZGV4O1xuXG4gICAgY29uc3QgbVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgIG1UaXRsZS5jbGFzc0xpc3QuYWRkKFwidGFzay10aXRsZVwiKTtcbiAgICBtVGl0bGUudGV4dENvbnRlbnQgPSBgJHt0aXRsZX1gO1xuXG4gICAgY29uc3QgbUxpc3RIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIG1MaXN0SGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWxpc3QtaGVhZGVyXCIsIFwiZmxleFwiKTtcbiAgICBtTGlzdEhlYWRlci5pbm5lckhUTUwgPSBgVGFza3MgPGkgY2xhc3M9XCJmYS1yZWd1bGFyIGZhLXBsdXMgdG9vbHRpcCBhZGR0YXNrIHNob3ctbW9kYWxcIj48L2k+YDtcblxuICAgIGNvbnN0IG1UYXNrTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcbiAgICBtVGFza0xpc3QuY2xhc3NMaXN0LmFkZChcInRhc2stbGlzdFwiKTtcblxuICAgIG1haW5Db250ZW50LmFwcGVuZENoaWxkKG1UaXRsZSk7XG4gICAgbWFpbkNvbnRlbnQuYXBwZW5kQ2hpbGQobUxpc3RIZWFkZXIpO1xuICAgIG1haW5Db250ZW50LmFwcGVuZENoaWxkKG1UYXNrTGlzdCk7XG5cbiAgICByZXR1cm4gbWFpbkNvbnRlbnQ7XG4gIH07XG5cbiAgY29uc3QgYWRkTWFpbkNvbnRlbnQgPSAodGl0bGUsIGluZGV4LCBpc1JlcXVpcmVkID0gZmFsc2UpID0+IHtcbiAgICBtYWluQ29udGVudENvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgbWFpbkNvbnRlbnRDb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlTWFpbkNvbnRlbnQodGl0bGUsIGluZGV4KSk7XG4gICAgaWYgKCFpc1JlcXVpcmVkKSB7XG4gICAgICBjb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGR0YXNrXCIpO1xuICAgICAgYWRkVGFza0J0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlNYWluQ29udGVudCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGdldFByb2plY3RMaXN0IH0gPSBwcm9qZWN0cztcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGdldFByb2plY3RMaXN0KCk7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdGVkXCIpO1xuICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3RcIik7XG5cbiAgICBpZiAoc2VsZWN0ZWQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGFza3NfX2FsbFwiKSkge1xuICAgICAgYWRkTWFpbkNvbnRlbnQoXCJBbGxcIik7XG4gICAgfSBlbHNlIGlmIChzZWxlY3RlZC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0YXNrc19fY29tcGxldGVkXCIpKSB7XG4gICAgICBhZGRNYWluQ29udGVudChcIkNvbXBsZXRlZFwiKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB7IHByb2plY3RUaXRsZSwgcHJvamVjdEluZGV4IH0gPSBwcm9qZWN0TGlzdFtpXTtcbiAgICAgIGlmIChwcm9qZWN0W2ldLmNsYXNzTGlzdC5jb250YWlucyhcInNlbGVjdGVkXCIpKSB7XG4gICAgICAgIGFkZE1haW5Db250ZW50KHByb2plY3RUaXRsZSwgcHJvamVjdEluZGV4LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVByb2plY3RzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZ2V0UHJvamVjdExpc3QgfSA9IHByb2plY3RzO1xuICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZ2V0UHJvamVjdExpc3QoKTtcbiAgICBwcm9qZWN0Q29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHsgcHJvamVjdFRpdGxlLCBwcm9qZWN0SW5kZXggfSA9IHByb2plY3RMaXN0W2ldO1xuICAgICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVQcm9qZWN0KHByb2plY3RUaXRsZSwgcHJvamVjdEluZGV4KSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGFkZFByaW9yaXR5VGV4dENvbG9yID0gKHByaW9yaXR5LCB0YXNrVGl0bGUpID0+IHtcbiAgICBzd2l0Y2ggKHByaW9yaXR5KSB7XG4gICAgICBjYXNlIFwiSW1wb3J0YW50XCI6XG4gICAgICAgIHRhc2tUaXRsZS5zdHlsZS5jb2xvciA9IFwidmFyKC0td2FybmluZylcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiVmVyeSBJbXBvcnRhbnRcIjpcbiAgICAgICAgdGFza1RpdGxlLnN0eWxlLmNvbG9yID0gXCJ2YXIoLS1kYW5nZXIpXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZVRhc2sgPSAodGl0bGUsIGR1ZURhdGUsIHByb2plY3RJbmRleCwgaW5kZXgsIHByaW9yaXR5KSA9PiB7XG4gICAgY29uc3QgdGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICB0YXNrLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWxpc3RfX3Rhc2tcIik7XG4gICAgdGFzay5kYXRhc2V0LmluZGV4ID0gaW5kZXg7XG4gICAgdGFzay5kYXRhc2V0LnByb2plY3RJbmRleCA9IHByb2plY3RJbmRleDtcblxuICAgIGNvbnN0IHRhc2tMZWZ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YXNrTGVmdC5jbGFzc0xpc3QuYWRkKFwidGFzay1sZWZ0XCIsIFwiZmxleFwiKTtcbiAgICBhZGRQcmlvcml0eVRleHRDb2xvcihwcmlvcml0eSwgdGFza0xlZnQpO1xuXG4gICAgdGFza0xlZnQuaW5uZXJIVE1MID0gYFxuICAgIDxsYWJlbCBmb3I9XCJjaGVja2JveC0ke2luZGV4fVwiIGNsYXNzPVwiY2hlY2tib3gtY2lyY2xlXCI+PC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cImNoZWNrYm94XCIgaWQ9XCJjaGVja2JveC0ke2luZGV4fVwiIC8+XG4gICAgPHAgY2xhc3M9XCJ0YXNrLWxlZnRfX3RpdGxlXCI+JHt0aXRsZX08L3A+YDtcblxuICAgIGNvbnN0IHRhc2tSaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGFza1JpZ2h0LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLXJpZ2h0XCIsIFwiZmxleFwiKTtcblxuICAgIHRhc2tSaWdodC5pbm5lckhUTUwgPSBgXG4gICAgPHAgY2xhc3M9XCJ0YXNrLXJpZ2h0X19kYXRlXCI+JHtkdWVEYXRlfTwvcD5cbiAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXBlbi10by1zcXVhcmUgdGFzay1lZGl0IHRhc2stYnRuXCI+PC9pPlxuICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2lyY2xlLWluZm8gdGFzay1pbmZvIHRhc2stYnRuXCI+PC9pPlxuICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtdHJhc2ggdGFzay1kZWxldGUgdGFzay1idG5cIj48L2k+YDtcblxuICAgIHRhc2suYXBwZW5kQ2hpbGQodGFza0xlZnQpO1xuICAgIHRhc2suYXBwZW5kQ2hpbGQodGFza1JpZ2h0KTtcbiAgICByZXR1cm4gdGFzaztcbiAgfTtcblxuICBjb25zdCBnZXRGaWx0ZXJlZFRhc2tMaXN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZ2V0VGFza0xpc3QgfSA9IHRhc2tzO1xuICAgIGNvbnN0IHRhc2tMaXN0ID0gZ2V0VGFza0xpc3QoKTtcbiAgICBjb25zdCBzZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0ZWRcIik7XG4gICAgY29uc3QgbWFpbkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tY29udGVudFwiKTtcbiAgICBjb25zdCB7IHByb2plY3RJbmRleCB9ID0gbWFpbkNvbnRlbnQuZGF0YXNldDtcblxuICAgIGNvbnN0IGZpbHRlcmVkTGlzdCA9IHRhc2tMaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgaWYgKHNlbGVjdGVkLmNsYXNzTGlzdC5jb250YWlucyhcInByb2plY3RcIikpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ucHJvamVjdEluZGV4ID09PSArcHJvamVjdEluZGV4O1xuICAgICAgfVxuICAgICAgaWYgKHNlbGVjdGVkLmNsYXNzTGlzdC5jb250YWlucyhcInRhc2tzX19jb21wbGV0ZWRcIikpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uc3RhdHVzID09PSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHNlbGVjdGVkLmNsYXNzTGlzdC5jb250YWlucyhcInRhc2tzX19hbGxcIikpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbHRlcmVkTGlzdDtcbiAgfTtcblxuICBjb25zdCBjaGVja1N0YXR1cyA9IChzdGF0dXMsIGkpID0+IHtcbiAgICBjb25zdCB0YXNrU3RhdHVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdYCk7XG4gICAgY29uc3QgdGFza0NoZWNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jaGVja2JveC1jaXJjbGVcIik7XG4gICAgY29uc3QgdGFza0xlZnRUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFzay1sZWZ0X190aXRsZVwiKTtcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrLWxpc3RfX3Rhc2tcIik7XG4gICAgaWYgKHN0YXR1cyA9PT0gdHJ1ZSkge1xuICAgICAgdGFza1N0YXR1c1tpXS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIHRhc2tMZWZ0VGl0bGVbaV0uc3R5bGUudGV4dERlY29yYXRpb24gPSBcImxpbmUtdGhyb3VnaFwiO1xuICAgICAgdGFza0xlZnRUaXRsZVtpXS5zdHlsZS5vcGFjaXR5ID0gMC42O1xuICAgICAgdGFza1tpXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNlZWVcIjtcbiAgICAgIHRhc2tbaV0uc3R5bGUub3BhY2l0eSA9IDAuODtcbiAgICAgIHRhc2tDaGVja1tpXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLW1haW4tY29sb3IpXCI7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlUYXNrcyA9ICgpID0+IHtcbiAgICBkaXNwbGF5TWFpbkNvbnRlbnQoKTtcbiAgICBjb25zdCB0YXNrTGlzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1saXN0XCIpO1xuICAgIHRhc2tMaXN0Q29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgIGNvbnN0IGZpbHRlcmVkTGlzdCA9IGdldEZpbHRlcmVkVGFza0xpc3QoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbHRlcmVkTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgeyB0YXNrVGl0bGUsIGR1ZURhdGUsIHByb2plY3RJbmRleCwgc3RhdHVzLCBwcmlvcml0eSB9ID1cbiAgICAgICAgZmlsdGVyZWRMaXN0W2ldO1xuICAgICAgdGFza0xpc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGNyZWF0ZVRhc2sodGFza1RpdGxlLCBkdWVEYXRlLCBwcm9qZWN0SW5kZXgsIGksIHByaW9yaXR5KVxuICAgICAgKTtcbiAgICAgIGNoZWNrU3RhdHVzKHN0YXR1cywgaSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlbW92ZVNlbGVjdGVkID0gKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RBbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdGVkXCIpO1xuICAgIHByb2plY3RBbGwuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIikpO1xuICB9O1xuXG4gIGNvbnN0IGhpZGVSZXNpemUgPSAoKSA9PiB7XG4gICAgbWVudUljb24uY2xhc3NMaXN0LnJlbW92ZShcInRvZ2dsZS1tZW51XCIpO1xuICAgIHNpZGVCYXIuY2xhc3NMaXN0LmFkZChcImhpZGUtc2lkZWJhclwiKTtcbiAgfTtcblxuICBjb25zdCBzaG93UmVzaXplID0gKCkgPT4ge1xuICAgIG1lbnVJY29uLmNsYXNzTGlzdC5hZGQoXCJ0b2dnbGUtbWVudVwiKTtcbiAgICBzaWRlQmFyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlLXNpZGViYXJcIik7XG4gIH07XG5cbiAgY29uc3QgaGlkZVNpZGVCYXIgPSAoKSA9PiB7XG4gICAgaWYgKHNpZGVCYXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZS1zaWRlYmFyXCIpKSB7XG4gICAgICBzaWRlQmFyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlLXNpZGViYXJcIik7XG4gICAgICBzaWRlQmFyLmNsYXNzTGlzdC5hZGQoXCJzaG93LXNpZGViYXJcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNpZGVCYXIuY2xhc3NMaXN0LnJlbW92ZShcInNob3ctc2lkZWJhclwiKTtcbiAgICAgIHNpZGVCYXIuY2xhc3NMaXN0LmFkZChcImhpZGUtc2lkZWJhclwiKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdG9nZ2xlTWVudSA9ICgpID0+IHtcbiAgICBpZiAobWVudUljb24uY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9nZ2xlLW1lbnVcIikpIHtcbiAgICAgIG1lbnVJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b2dnbGUtbWVudVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVudUljb24uY2xhc3NMaXN0LmFkZChcInRvZ2dsZS1tZW51XCIpO1xuICAgIH1cbiAgICBoaWRlU2lkZUJhcigpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgY29udGFpbmVyLFxuICAgIGdlbmVyYXRlTW9kYWwsXG4gICAgc2hvd0luZm9Nb2RhbCxcbiAgICBoaWRlTW9kYWwsXG4gICAgZGlzcGxheVByb2plY3RzLFxuICAgIGRpc3BsYXlUYXNrcyxcbiAgICBkaXNwbGF5TWFpbkNvbnRlbnQsXG4gICAgcmVtb3ZlU2VsZWN0ZWQsXG4gICAgdG9nZ2xlTWVudSxcbiAgICBoaWRlUmVzaXplLFxuICAgIHNob3dSZXNpemUsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBkb207XG4iLCJpbXBvcnQgZG9tIGZyb20gXCIuL2RvbVwiO1xuaW1wb3J0IHByb2plY3RzIGZyb20gXCIuL3Byb2plY3RzXCI7XG5pbXBvcnQgdGFza3MgZnJvbSBcIi4vdGFza3NcIjtcblxuY29uc3QgZXZlbnRIYW5kbGVycyA9ICgoKSA9PiB7XG4gIGNvbnN0IHJlc2l6ZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IDExMDApIHtcbiAgICAgICAgZG9tLmhpZGVSZXNpemUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvbS5zaG93UmVzaXplKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgY2xpY2tIYW5kbGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbnRhaW5lcixcbiAgICAgIGdlbmVyYXRlTW9kYWwsXG4gICAgICBzaG93SW5mb01vZGFsLFxuICAgICAgaGlkZU1vZGFsLFxuICAgICAgZGlzcGxheVByb2plY3RzLFxuICAgICAgZGlzcGxheVRhc2tzLFxuICAgICAgcmVtb3ZlU2VsZWN0ZWQsXG4gICAgICB0b2dnbGVNZW51LFxuICAgIH0gPSBkb207XG4gICAgY29uc3QgeyBhZGRQcm9qZWN0LCByZW1vdmVQcm9qZWN0LCBnZXRQcm9qZWN0TGlzdCwgZWRpdFByb2plY3QgfSA9IHByb2plY3RzO1xuICAgIGNvbnN0IHsgYWRkVGFzaywgcmVtb3ZlVGFzaywgZ2V0VGFza0luZm8sIGNoYW5nZVRhc2tTdGF0dXMgfSA9IHRhc2tzO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibWVudS1idXJnZXJcIikpIHtcbiAgICAgICAgdG9nZ2xlTWVudSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWRkcHJvamVjdFwiKSkge1xuICAgICAgICBnZW5lcmF0ZU1vZGFsKFxuICAgICAgICAgIFwiTmV3IFByb2plY3RcIixcbiAgICAgICAgICBcInByb2plY3QtdGl0bGVcIixcbiAgICAgICAgICBcImFkZC1wcm9qZWN0LWJ0blwiLFxuICAgICAgICAgIFwiQWRkIFByb2plY3RcIixcbiAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGlkZU1vZGFsKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImFkZHRhc2tcIikpIHtcbiAgICAgICAgZ2VuZXJhdGVNb2RhbChcbiAgICAgICAgICBcIk5ldyBUYXNrXCIsXG4gICAgICAgICAgXCJ0YXNrLXRpdGxlXCIsXG4gICAgICAgICAgXCJhZGQtdGFzay1idG5cIixcbiAgICAgICAgICBcIkFkZCBUYXNrXCIsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGlkZU1vZGFsKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNsb3NlLW1vZGFsXCIpKSB7XG4gICAgICAgIGhpZGVNb2RhbCgpO1xuXG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGlkZU1vZGFsKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImFkZC1wcm9qZWN0LWJ0blwiKSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC10aXRsZVwiKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBnZXRQcm9qZWN0TGlzdCgpLmxlbmd0aDtcblxuICAgICAgICBpZiAoIXByb2plY3RUaXRsZS52YWx1ZS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgYWRkUHJvamVjdChwcm9qZWN0VGl0bGUudmFsdWUsIGluZGV4KTtcbiAgICAgICAgZGlzcGxheVByb2plY3RzKCk7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3RcIik7XG5cbiAgICAgICAgcmVtb3ZlU2VsZWN0ZWQoKTtcbiAgICAgICAgcHJvamVjdFtwcm9qZWN0Lmxlbmd0aCAtIDFdLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgZGlzcGxheVRhc2tzKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJhZGQtdGFzay1idG5cIikpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stdGl0bGVcIik7XG4gICAgICAgIGNvbnN0IHRhc2tEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWRhdGVcIik7XG4gICAgICAgIGNvbnN0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1wcmlvcml0eVwiKTtcbiAgICAgICAgY29uc3QgcHJvamVjdEluZGV4ID1cbiAgICAgICAgICArZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLWNvbnRlbnRcIikuZGF0YXNldC5wcm9qZWN0SW5kZXg7XG4gICAgICAgIGlmICghdGFza1RpdGxlLmxlbmd0aCAmJiAhdGFza0RhdGUuY2hlY2tWYWxpZGl0eSgpKSByZXR1cm47XG4gICAgICAgIGFkZFRhc2soXG4gICAgICAgICAgdGFza1RpdGxlLnZhbHVlLFxuICAgICAgICAgIHRhc2tEYXRlLnZhbHVlLFxuICAgICAgICAgIHRhc2tQcmlvcml0eS52YWx1ZSxcbiAgICAgICAgICBwcm9qZWN0SW5kZXhcbiAgICAgICAgKTtcbiAgICAgICAgZGlzcGxheVRhc2tzKCk7XG4gICAgICAgIGhpZGVNb2RhbCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicHJvamVjdFwiKSkge1xuICAgICAgICByZW1vdmVTZWxlY3RlZCgpO1xuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgICAgIGRpc3BsYXlUYXNrcygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGFza3NfX2FsbFwiKSkge1xuICAgICAgICByZW1vdmVTZWxlY3RlZCgpO1xuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgICAgIGRpc3BsYXlUYXNrcygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGFzay1kZWxldGVcIikpIHtcbiAgICAgICAgY29uc3QgdGFza05hbWUgPVxuICAgICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy5jaGlsZHJlblsyXS50ZXh0Q29udGVudDtcbiAgICAgICAgY29uc3QgeyBwcm9qZWN0SW5kZXggfSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0O1xuICAgICAgICByZW1vdmVUYXNrKHRhc2tOYW1lLCArcHJvamVjdEluZGV4KTtcbiAgICAgICAgZGlzcGxheVRhc2tzKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwcm9qZWN0LWRlbGV0ZVwiKSkge1xuICAgICAgICBjb25zdCB7IHByb2plY3RJbmRleCB9ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXQ7XG4gICAgICAgIGNvbnN0IHRhc2tzQWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrc19fYWxsXCIpO1xuICAgICAgICByZW1vdmVQcm9qZWN0KCtwcm9qZWN0SW5kZXgpO1xuICAgICAgICBkaXNwbGF5UHJvamVjdHMoKTtcbiAgICAgICAgaWYgKGdldFByb2plY3RMaXN0KCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGFza3NBbGwuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xuICAgICAgICAgIGRpc3BsYXlUYXNrcygpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwcm9qZWN0LWVkaXRcIikpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID1cbiAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQ7XG4gICAgICAgIGdlbmVyYXRlTW9kYWwoXG4gICAgICAgICAgYEVkaXQgUHJvamVjdGAsXG4gICAgICAgICAgXCJwcm9qZWN0LXRpdGxlXCIsXG4gICAgICAgICAgXCJlZGl0LXByb2plY3QtYnRuXCIsXG4gICAgICAgICAgXCJFZGl0IFByb2plY3RcIixcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICBcIlwiLFxuICAgICAgICAgIHByb2plY3RUaXRsZVxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGlkZU1vZGFsKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXQtcHJvamVjdC1idG5cIikpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBnZXRUaXRsZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LXRpdGxlXCIpO1xuICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSBnZXRUaXRsZVZhbHVlO1xuICAgICAgICBjb25zdCB0aXRsZSA9IGdldFRpdGxlVmFsdWUubmFtZTtcbiAgICAgICAgaWYgKCF2YWx1ZS5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBlZGl0UHJvamVjdCh0aXRsZSwgdmFsdWUpO1xuICAgICAgICBkaXNwbGF5UHJvamVjdHMoKTtcbiAgICAgICAgaGlkZU1vZGFsKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0YXNrLWluZm9cIikpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZGF0YXNldC5wcm9qZWN0SW5kZXg7XG4gICAgICAgIGNvbnN0IHRpdGxlID1cbiAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2hpbGRyZW5bMl0udGV4dENvbnRlbnQ7XG4gICAgICAgIGNvbnN0IHsgdGFza1RpdGxlLCBwcmlvcml0eSwgc3RhdHVzLCBkdWVEYXRlIH0gPSBnZXRUYXNrSW5mbyhcbiAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAraW5kZXhcbiAgICAgICAgKTtcbiAgICAgICAgc2hvd0luZm9Nb2RhbCh0YXNrVGl0bGUsIHN0YXR1cywgcHJpb3JpdHksIGR1ZURhdGUpO1xuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhpZGVNb2RhbCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0YXNrLWVkaXRcIikpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZGF0YXNldC5wcm9qZWN0SW5kZXg7XG4gICAgICAgIGNvbnN0IHRpdGxlID1cbiAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2hpbGRyZW5bMl0udGV4dENvbnRlbnQ7XG5cbiAgICAgICAgY29uc3QgYXJyID0gZ2V0VGFza0luZm8odGl0bGUsICtpbmRleCk7XG4gICAgICAgIGdlbmVyYXRlTW9kYWwoXG4gICAgICAgICAgXCJFZGl0IFRhc2tcIixcbiAgICAgICAgICBcInRhc2stdGl0bGVcIixcbiAgICAgICAgICBcImVkaXQtdGFzay1idG5cIixcbiAgICAgICAgICBcIkVkaXQgVGFza1wiLFxuICAgICAgICAgIHRydWUsXG4gICAgICAgICAgYXJyLmR1ZURhdGUsXG4gICAgICAgICAgdGl0bGVcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLXByaW9yaXR5XCIpO1xuICAgICAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stdGl0bGVcIik7XG4gICAgICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWRhdGVcIik7XG4gICAgICAgIHRhc2tQcmlvcml0eS52YWx1ZSA9IGFyci5wcmlvcml0eTtcblxuICAgICAgICBjb25zdCBlZGl0VGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZWRpdC10YXNrLWJ0blwiKTtcblxuICAgICAgICBlZGl0VGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGFza3MuZWRpdFRhc2soXG4gICAgICAgICAgICBhcnIsXG4gICAgICAgICAgICB0YXNrVGl0bGUudmFsdWUsXG4gICAgICAgICAgICB0YXNrUHJpb3JpdHkudmFsdWUsXG4gICAgICAgICAgICB0YXNrRHVlRGF0ZS52YWx1ZVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBkaXNwbGF5VGFza3MoKTtcbiAgICAgICAgICBoaWRlTW9kYWwoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoaWRlTW9kYWwpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGFza3NfX2NvbXBsZXRlZFwiKSkge1xuICAgICAgICByZW1vdmVTZWxlY3RlZCgpO1xuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgICAgIGRpc3BsYXlUYXNrcygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZS50YXJnZXQudHlwZSA9PT0gXCJjaGVja2JveFwiKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXQucHJvamVjdEluZGV4O1xuICAgICAgICBjb25zdCB0aXRsZSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMl0udGV4dENvbnRlbnQ7XG4gICAgICAgIGxldCBzdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgYXJyID0gZ2V0VGFza0luZm8odGl0bGUsICtpbmRleCk7XG5cbiAgICAgICAgaWYgKGUudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgICBzdGF0dXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNoYW5nZVRhc2tTdGF0dXMoYXJyLCBzdGF0dXMpO1xuICAgICAgICBkaXNwbGF5VGFza3MoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4geyBjbGlja0hhbmRsZXIsIHJlc2l6ZUhhbmRsZXIgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGV2ZW50SGFuZGxlcnM7XG4iLCJjb25zdCBzZXRMb2NhbFN0b3JhZ2UgPSAoaXRlbU5hbWUsIGFycmF5KSA9PiB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGl0ZW1OYW1lLCBKU09OLnN0cmluZ2lmeShhcnJheSkpO1xufTtcblxuY29uc3QgZ2V0TG9jYWxTdG9yYWdlID0gKGl0ZW1OYW1lKSA9PiB7XG4gIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShpdGVtTmFtZSk7XG59O1xuXG5leHBvcnQgeyBzZXRMb2NhbFN0b3JhZ2UsIGdldExvY2FsU3RvcmFnZSB9O1xuIiwiaW1wb3J0IHRhc2tzIGZyb20gXCIuL3Rhc2tzXCI7XG5pbXBvcnQgeyBzZXRMb2NhbFN0b3JhZ2UsIGdldExvY2FsU3RvcmFnZSB9IGZyb20gXCIuL2xvY2FsU3RvcmFnZVwiO1xuXG5jb25zdCBwcm9qZWN0cyA9ICgoKSA9PiB7XG4gIGNvbnN0IHByb2plY3RMaXN0ID0gSlNPTi5wYXJzZShnZXRMb2NhbFN0b3JhZ2UoXCJwcm9qZWN0c1wiKSkgfHwgW1xuICAgIHsgcHJvamVjdFRpdGxlOiBcIlRvZG9saXN0IHByb2plY3RcIiwgcHJvamVjdEluZGV4OiAwIH0sXG4gICAgeyBwcm9qZWN0VGl0bGU6IFwiVGljIFRhYyBUb2UgUHJvamVjdFwiLCBwcm9qZWN0SW5kZXg6IDEgfSxcbiAgXTtcbiAgY2xhc3MgUHJvamVjdHMge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBpbmRleCkge1xuICAgICAgdGhpcy5wcm9qZWN0VGl0bGUgPSB0aXRsZTtcbiAgICAgIHRoaXMucHJvamVjdEluZGV4ID0gaW5kZXg7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZ2V0UHJvamVjdExpc3QgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHByb2plY3RMaXN0O1xuICB9O1xuXG4gIGNvbnN0IGFkZFByb2plY3QgPSAodGl0bGUsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0cyh0aXRsZSwgaW5kZXgpO1xuXG4gICAgcHJvamVjdExpc3QucHVzaChwcm9qZWN0KTtcbiAgICBzZXRMb2NhbFN0b3JhZ2UoXCJwcm9qZWN0c1wiLCBwcm9qZWN0TGlzdCk7XG4gIH07XG5cbiAgY29uc3QgZmluZFRhc2sgPSAodGFza0xpc3QsIHByb2plY3RJbmRleCkgPT4ge1xuICAgIGNvbnN0IGluZGV4QXJyYXkgPSBbXTtcbiAgICB0YXNrTGlzdC5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICBpZiAodGFzay5wcm9qZWN0SW5kZXggPT09IHByb2plY3RJbmRleCkge1xuICAgICAgICBpbmRleEFycmF5LnB1c2godGFza0xpc3QuaW5kZXhPZih0YXNrKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW5kZXhBcnJheTtcbiAgfTtcblxuICBjb25zdCBmaW5kUHJvamVjdCA9ICh2YWx1ZSwgcHJvcE5hbWUpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocHJvamVjdExpc3RbaV1bcHJvcE5hbWVdID09PSB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gcHJvamVjdExpc3QuaW5kZXhPZihwcm9qZWN0TGlzdFtpXSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlbW92ZVByb2plY3RUYXNrcyA9IChwcm9qZWN0SW5kZXgpID0+IHtcbiAgICBjb25zdCB7IGdldFRhc2tMaXN0IH0gPSB0YXNrcztcbiAgICBjb25zdCB0YXNrTGlzdCA9IGdldFRhc2tMaXN0KCk7XG4gICAgY29uc3QgaW5kZXhBcnIgPSBmaW5kVGFzayh0YXNrTGlzdCwgcHJvamVjdEluZGV4KTtcbiAgICBmb3IgKGxldCBpID0gaW5kZXhBcnIubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICB0YXNrTGlzdC5zcGxpY2UoaW5kZXhBcnIucG9wKCksIDEpO1xuICAgIH1cbiAgICBzZXRMb2NhbFN0b3JhZ2UoXCJ0YXNrc1wiLCB0YXNrTGlzdCk7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlUHJvamVjdCA9IChwcm9qZWN0SW5kZXgpID0+IHtcbiAgICBjb25zdCBpbmRleE9mUHJvamVjdCA9IGZpbmRQcm9qZWN0KHByb2plY3RJbmRleCwgXCJwcm9qZWN0SW5kZXhcIik7XG4gICAgcmVtb3ZlUHJvamVjdFRhc2tzKHByb2plY3RJbmRleCk7XG4gICAgcHJvamVjdExpc3Quc3BsaWNlKGluZGV4T2ZQcm9qZWN0LCAxKTtcbiAgICBzZXRMb2NhbFN0b3JhZ2UoXCJwcm9qZWN0c1wiLCBwcm9qZWN0TGlzdCk7XG4gIH07XG5cbiAgY29uc3QgZWRpdFByb2plY3QgPSAodGl0bGUsIHZhbHVlKSA9PiB7XG4gICAgY29uc3QgaW5kZXhPZlByb2plY3QgPSBmaW5kUHJvamVjdCh0aXRsZSwgXCJwcm9qZWN0VGl0bGVcIik7XG4gICAgcHJvamVjdExpc3RbaW5kZXhPZlByb2plY3RdLnByb2plY3RUaXRsZSA9IHZhbHVlO1xuICAgIHNldExvY2FsU3RvcmFnZShcInByb2plY3RzXCIsIHByb2plY3RMaXN0KTtcbiAgfTtcblxuICByZXR1cm4geyBhZGRQcm9qZWN0LCByZW1vdmVQcm9qZWN0LCBnZXRQcm9qZWN0TGlzdCwgZWRpdFByb2plY3QgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHByb2plY3RzO1xuIiwiaW1wb3J0IHsgZ2V0TG9jYWxTdG9yYWdlLCBzZXRMb2NhbFN0b3JhZ2UgfSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2VcIjtcblxuY29uc3QgdGFza3MgPSAoKCkgPT4ge1xuICBjb25zdCB0YXNrTGlzdCA9IEpTT04ucGFyc2UoZ2V0TG9jYWxTdG9yYWdlKFwidGFza3NcIikpIHx8IFtcbiAgICB7XG4gICAgICB0YXNrVGl0bGU6IFwiSW1wcm92ZSBVSSBEZXNpZ25cIixcbiAgICAgIGR1ZURhdGU6IFwiMjAyMi0wMy0yMVwiLFxuICAgICAgcHJpb3JpdHk6IFwiVmVyeSBJbXBvcnRhbnRcIixcbiAgICAgIHByb2plY3RJbmRleDogMCxcbiAgICAgIHN0YXR1czogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRhc2tUaXRsZTogXCJJbXBsZW1lbnQgbmF2IGFuaW1hdGlvblwiLFxuICAgICAgZHVlRGF0ZTogXCIyMDIyLTAzLTE4XCIsXG4gICAgICBwcmlvcml0eTogXCJOb3QgSW1wb3J0YW50XCIsXG4gICAgICBwcm9qZWN0SW5kZXg6IDAsXG4gICAgICBzdGF0dXM6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICB0YXNrVGl0bGU6IFwiSW1wbGVtZW50IGxvY2Fsc3RvcmFnZVwiLFxuICAgICAgZHVlRGF0ZTogXCIyMDIyLTAzLTE4XCIsXG4gICAgICBwcmlvcml0eTogXCJJbXBvcnRhbnRcIixcbiAgICAgIHByb2plY3RJbmRleDogMCxcbiAgICAgIHN0YXR1czogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRhc2tUaXRsZTogXCJBZGQgZGVzY3JpcHRpb24gZm9yIHRhc2tzXCIsXG4gICAgICBkdWVEYXRlOiBcIjIwMjItMDMtMzBcIixcbiAgICAgIHByaW9yaXR5OiBcIk5vdCBJbXBvcnRhbnRcIixcbiAgICAgIHByb2plY3RJbmRleDogMCxcbiAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgfSxcbiAgICB7XG4gICAgICB0YXNrVGl0bGU6IFwiSW1wbGVtZW50IGRhdGUtZm5zXCIsXG4gICAgICBkdWVEYXRlOiBcIjIwMjItMDMtMzFcIixcbiAgICAgIHByaW9yaXR5OiBcIkltcG9ydGFudFwiLFxuICAgICAgcHJvamVjdEluZGV4OiAwLFxuICAgICAgc3RhdHVzOiBmYWxzZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRhc2tUaXRsZTogXCJDcmVhdGUgbG9naWMgZm9yIHdpbm5pbmcgY29uZGl0aW9uIGFuZCB0aWVcIixcbiAgICAgIGR1ZURhdGU6IFwiMjAyMi0wMy0xNVwiLFxuICAgICAgcHJpb3JpdHk6IFwiVmVyeSBJbXBvcnRhbnRcIixcbiAgICAgIHByb2plY3RJbmRleDogMSxcbiAgICAgIHN0YXR1czogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRhc2tUaXRsZTogXCJJbXByb3ZlIFVJIERlc2lnblwiLFxuICAgICAgZHVlRGF0ZTogXCIyMDIyLTAzLTE1XCIsXG4gICAgICBwcmlvcml0eTogXCJWZXJ5IEltcG9ydGFudFwiLFxuICAgICAgcHJvamVjdEluZGV4OiAxLFxuICAgICAgc3RhdHVzOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgdGFza1RpdGxlOiBcIkltcGxlbWVudCBtaW5pbWF4IGFsZ29yaXRobVwiLFxuICAgICAgZHVlRGF0ZTogXCIyMDIyLTAzLTMxXCIsXG4gICAgICBwcmlvcml0eTogXCJOb3QgSW1wb3J0YW50XCIsXG4gICAgICBwcm9qZWN0SW5kZXg6IDEsXG4gICAgICBzdGF0dXM6IGZhbHNlLFxuICAgIH0sXG4gICAge1xuICAgICAgdGFza1RpdGxlOiBcIkNoYW5nZSB0YXNrICB0aXRsZSBjb2xvciBiYXNlZCBvbiBwcmlvcml0eVwiLFxuICAgICAgZHVlRGF0ZTogXCIyMDIyLTAzLTI5XCIsXG4gICAgICBwcmlvcml0eTogXCJWZXJ5IEltcG9ydGFudFwiLFxuICAgICAgcHJvamVjdEluZGV4OiAwLFxuICAgICAgc3RhdHVzOiBmYWxzZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRhc2tUaXRsZTogXCJJbXBsZW1lbnQgZGFyayBtb2RlXCIsXG4gICAgICBkdWVEYXRlOiBcIjIwMjUtMDQtMjNcIixcbiAgICAgIHByaW9yaXR5OiBcIk5vdCBJbXBvcnRhbnRcIixcbiAgICAgIHByb2plY3RJbmRleDogMCxcbiAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgfSxcbiAgICB7XG4gICAgICB0YXNrVGl0bGU6IFwiQ29kZSByZWZhY3RvclwiLFxuICAgICAgZHVlRGF0ZTogXCIyMDIyLTA0LTAxXCIsXG4gICAgICBwcmlvcml0eTogXCJWZXJ5IEltcG9ydGFudFwiLFxuICAgICAgcHJvamVjdEluZGV4OiAwLFxuICAgICAgc3RhdHVzOiBmYWxzZSxcbiAgICB9LFxuICBdO1xuICBjbGFzcyBUYXNrIHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3RJbmRleCwgc3RhdHVzKSB7XG4gICAgICB0aGlzLnRhc2tUaXRsZSA9IHRpdGxlO1xuICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgIHRoaXMucHJvamVjdEluZGV4ID0gcHJvamVjdEluZGV4O1xuICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZ2V0VGFza0xpc3QgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRhc2tMaXN0O1xuICB9O1xuXG4gIGNvbnN0IGFkZFRhc2sgPSAodGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0SW5kZXgpID0+IHtcbiAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sodGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0SW5kZXgsIGZhbHNlKTtcblxuICAgIHRhc2tMaXN0LnB1c2godGFzayk7XG4gICAgc2V0TG9jYWxTdG9yYWdlKFwidGFza3NcIiwgdGFza0xpc3QpO1xuICB9O1xuXG4gIGNvbnN0IGZpbmRUYXNrID0gKHRhc2tUaXRsZSwgcHJvamVjdEluZGV4KSA9PiB7XG4gICAgZm9yIChjb25zdCB0YXNrIG9mIHRhc2tMaXN0KSB7XG4gICAgICBpZiAodGFzay50YXNrVGl0bGUgPT09IHRhc2tUaXRsZSAmJiB0YXNrLnByb2plY3RJbmRleCA9PT0gcHJvamVjdEluZGV4KSB7XG4gICAgICAgIHJldHVybiB0YXNrTGlzdC5pbmRleE9mKHRhc2spO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCByZW1vdmVUYXNrID0gKHRhc2tUaXRsZSwgcHJvamVjdEluZGV4KSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSBmaW5kVGFzayh0YXNrVGl0bGUsIHByb2plY3RJbmRleCk7XG4gICAgdGFza0xpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICBzZXRMb2NhbFN0b3JhZ2UoXCJ0YXNrc1wiLCB0YXNrTGlzdCk7XG4gIH07XG5cbiAgY29uc3QgZ2V0VGFza0luZm8gPSAodGFza1RpdGxlLCBwcm9qZWN0SW5kZXgpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IGZpbmRUYXNrKHRhc2tUaXRsZSwgcHJvamVjdEluZGV4KTtcbiAgICByZXR1cm4gdGFza0xpc3RbaW5kZXhdO1xuICB9O1xuXG4gIGNvbnN0IGVkaXRUYXNrID0gKGFyciwgdGl0bGUsIHByaW9yaXR5LCBkdWVEYXRlKSA9PiB7XG4gICAgYXJyLnRhc2tUaXRsZSA9IHRpdGxlO1xuICAgIGFyci5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIGFyci5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICBzZXRMb2NhbFN0b3JhZ2UoXCJ0YXNrc1wiLCB0YXNrTGlzdCk7XG4gIH07XG5cbiAgY29uc3QgY2hhbmdlVGFza1N0YXR1cyA9IChhcnIsIHN0YXR1cykgPT4ge1xuICAgIGFyci5zdGF0dXMgPSBzdGF0dXM7XG4gICAgc2V0TG9jYWxTdG9yYWdlKFwidGFza3NcIiwgdGFza0xpc3QpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZ2V0VGFza0xpc3QsXG4gICAgYWRkVGFzayxcbiAgICByZW1vdmVUYXNrLFxuICAgIGdldFRhc2tJbmZvLFxuICAgIGVkaXRUYXNrLFxuICAgIGNoYW5nZVRhc2tTdGF0dXMsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCB0YXNrcztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGRvbSBmcm9tIFwiLi9kb21cIjtcbmltcG9ydCBldmVudEhhbmRsZXJzIGZyb20gXCIuL2V2ZW50SGFuZGxlcnNcIjtcblxuZXZlbnRIYW5kbGVycy5jbGlja0hhbmRsZXIoKTtcbmV2ZW50SGFuZGxlcnMucmVzaXplSGFuZGxlcigpO1xuXG5kb20uZGlzcGxheVByb2plY3RzKCk7XG5kb20uZGlzcGxheVRhc2tzKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
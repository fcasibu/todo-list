/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./localStorage */ "./src/localStorage.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_localStorage__WEBPACK_IMPORTED_MODULE_2__);




const dom = (() => {
  const menuIcon = document.querySelector(".menu-burger");
  const sideBar = document.querySelector(".sidebar");
  const addTaskModal = document.querySelector(".add-task-modal");
  const addProjectModal = document.querySelector(".add-project-modal");
  const editProjectModal = document.querySelector(".edit-project-modal");
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
  const editProjectTitle = document.getElementById("edit-project-title");

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
    } else if (e.classList.contains("project-edit")) {
      editProjectModal.style.display = "flex";
      editProjectTitle.value =
        e.parentElement.previousElementSibling.textContent;
    }
    document.body.classList.add("overflow");

    clearInputValues();
    changeTaskValue();
  };

  const hideModal = () => {
    addTaskModal.style.display = "none";
    addProjectModal.style.display = "none";
    editProjectModal.style.display = "none";
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
    <i class="fa-solid fa-pen-to-square project-edit show-modal project-btn" style="pointer-events:auto"></i>
    <i class="fa-solid fa-trash project-delete project-btn" style="pointer-events:auto"></i>
`;

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

    for (let i = 0; i < _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectList.length; i++) {
      const { name } = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectList[i];
      console.log(_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectList);
      projectList.appendChild(createProject(i, name));
      taskProjects.appendChild(createTaskOption(i, name));
    }
    projectCount.textContent = `(${_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectList.length})`;
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
    for (let j = 0; j < _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectList.length; j++) {
      const { name } = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectList[j];
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
    if (mainContent !== null) {
      const projectIndex = mainContent.getAttribute("data-project-index");
      const filteredList = _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList.filter((item) => {
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

      for (let i = 0; i < filteredList.length; i++) {
        const { title, dueDate, status } = filteredList[i];
        taskList.appendChild(createTask(i, title, dueDate, projectIndex));

        checkStatus(status, i);
      }
    }
  };

  const removeTask = (title) => {
    const x = _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList.find((el) => {
      return el.title.toLowerCase() === title.toLowerCase();
    });
    const indexOfTask = _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList.indexOf(x);
    _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList.splice(indexOfTask, 1);
    localStorage.setItem("tasks", JSON.stringify(_tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList));
    displayTasks();
  };

  const removeProject = (index) => {
    _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList.slice(0).forEach((item) => {
      if (item.projectIndex === index) {
        if (_tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList.includes(item)) {
          const taskIndex = _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList.indexOf(item);
          _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList.splice(taskIndex, 1);
        }
      }
    });

    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectList.splice(index, 1);

    localStorage.setItem("projects", JSON.stringify(_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectList));
    localStorage.setItem("tasks", JSON.stringify(_tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList));
    displayProjects();
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
    editProjectTitle,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);


/***/ }),

/***/ "./src/eventHandlers.js":
/*!******************************!*\
  !*** ./src/eventHandlers.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./localStorage */ "./src/localStorage.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_localStorage__WEBPACK_IMPORTED_MODULE_3__);





const eventHandlers = (() => {
  const windowResize = () => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 900) {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].hideResize();
      } else {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].showResize();
      }
    });
  };

  const arr = [];
  const clickListener = () => {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-burger")) {
        e.preventDefault();
        e.stopPropagation();
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].toggleMenu();
      }
      if (e.target.classList.contains("show-modal")) {
        const { target } = e;
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].showModal(target);
        console.log(target.parentElement.parentElement);
        const index =
          target.parentElement.parentElement.getAttribute("data-project-index");
        arr.push(+index);

        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].container.addEventListener("click", () => {
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].hideModal();
        });
      }

      if (e.target.classList.contains("close-modal")) {
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].hideModal();
      }

      if (e.target.classList.contains("add-project-btn")) {
        e.preventDefault();
        e.stopPropagation();

        const validCheck = _projects__WEBPACK_IMPORTED_MODULE_2__["default"].checkValidity();
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayProjects();
        const projectAll = document.querySelectorAll(".selected");
        projectAll.forEach((item) => item.classList.remove("selected"));

        const project = document.querySelectorAll(".project");
        project.forEach((item) => item.classList.remove("selected"));

        project[project.length - 1].classList.add("selected");

        const taskProject = document.querySelector(".tasks__projects");
        taskProject.children[0].children[1].classList.add("rotate-arrow");
        taskProject.children[2].classList.add("hide-projects");
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayTasks();
        if (validCheck === true) {
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].hideModal();
        }
      }

      if (e.target.classList.contains("add-task-btn")) {
        e.preventDefault();

        const validCheck = _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].checkValidity();
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayTasks();
        if (validCheck === true) {
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].hideModal();
        }
      }

      if (e.target.classList.contains("task-delete")) {
        const title = e.target.parentElement.previousElementSibling.children[2];

        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].removeTask(title.textContent);
      }

      if (e.target.type === "checkbox") {
        const index =
          e.target.parentElement.parentElement.getAttribute(
            "data-project-index"
          );
        const title = e.target.parentElement.children[2].textContent;
        const x = _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList.find((el) => {
          return el.title.toLowerCase() === title.toLowerCase();
        });
        const indexOfTask = _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList.indexOf(x);
        const getArrayItem = _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList[indexOfTask];

        if (e.target.checked) {
          getArrayItem.status = true;
        } else {
          getArrayItem.status = false;
        }
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayTasks();
      }

      if (e.target.classList.contains("project")) {
        const projectAll = document.querySelectorAll(".selected");
        projectAll.forEach((item) => item.classList.remove("selected"));
        e.target.classList.add("selected");
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayTasks();
      }

      if (e.target.classList.contains("tasks__completed")) {
        const projectAll = document.querySelectorAll(".selected");
        projectAll.forEach((item) => item.classList.remove("selected"));
        e.target.classList.add("selected");
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayTasks();
      }

      if (e.target.classList.contains("tasks__all")) {
        const projectAll = document.querySelectorAll(".selected");
        projectAll.forEach((item) => item.classList.remove("selected"));
        e.target.classList.add("selected");
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayTasks();
      }

      if (e.target.classList.contains("projects-header")) {
        const taskProject = document.querySelector(".tasks__projects");
        taskProject.children[0].children[1].classList.toggle("rotate-arrow");
        taskProject.children[2].classList.toggle("hide-projects");
      }

      if (e.target.classList.contains("project-delete")) {
        const index =
          e.target.parentElement.parentElement.getAttribute(
            "data-project-index"
          );

        _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList.slice(0).forEach((item) => {
          if (item.projectIndex === index) {
            if (_tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList.includes(item)) {
              const taskIndex = _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList.indexOf(item);
              _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList.splice(taskIndex, 1);
            }
          }
        });

        _projects__WEBPACK_IMPORTED_MODULE_2__["default"].projectList.splice(index, 1);
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayProjects();
        const projectAll = document.querySelectorAll(".selected");
        projectAll.forEach((item) => item.classList.remove("selected"));

        const project = document.querySelectorAll(".project");
        project.forEach((item) => item.classList.remove("selected"));

        project[0].classList.add("selected");

        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayTasks();
        localStorage.setItem("projects", JSON.stringify(_projects__WEBPACK_IMPORTED_MODULE_2__["default"].projectList));
        localStorage.setItem("tasks", JSON.stringify(_tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList));
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].hideModal();
      }

      if (e.target.classList.contains("edit-project-btn")) {
        e.preventDefault();
        e.stopPropagation();
        const poppedVal = arr.pop();
        _projects__WEBPACK_IMPORTED_MODULE_2__["default"].projectList[poppedVal] = {
          name: `${_dom__WEBPACK_IMPORTED_MODULE_0__["default"].editProjectTitle.value}`,
        };

        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayProjects();
        const projectAll = document.querySelectorAll(".selected");
        projectAll.forEach((item) => item.classList.remove("selected"));

        const project = document.querySelectorAll(".project");
        project.forEach((item) => item.classList.remove("selected"));

        project[poppedVal].classList.add("selected");

        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayTasks();
        localStorage.setItem("projects", JSON.stringify(_projects__WEBPACK_IMPORTED_MODULE_2__["default"].projectList));
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].hideModal();
      }
    });
  };

  return { clickListener, windowResize };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (eventHandlers);


/***/ }),

/***/ "./src/localStorage.js":
/*!*****************************!*\
  !*** ./src/localStorage.js ***!
  \*****************************/
/***/ (() => {



/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./localStorage */ "./src/localStorage.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_localStorage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");




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
    const { projectTitle } = _dom__WEBPACK_IMPORTED_MODULE_0__["default"];
    const project = new Project(projectTitle.value);
    projectList.push(project);
    localStorage.setItem("projects", JSON.stringify(projectList));
  };

  const checkValidity = () => {
    let isValid = false;
    const { projectTitle } = _dom__WEBPACK_IMPORTED_MODULE_0__["default"];
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projects);


/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./localStorage */ "./src/localStorage.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_localStorage__WEBPACK_IMPORTED_MODULE_2__);




const tasks = (() => {
  let taskList = [];

  const tasksStorage = JSON.parse(localStorage.getItem("tasks"));
  if (tasksStorage === null || !tasksStorage.length) {
    taskList.push({
      title: "Test",
      description: "Test",
      dueDate: "2022-04-8",
      priority: "Not Important",
      projectIndex: "0",
      status: false,
    });
  } else {
    const parsedItem = tasksStorage;
    taskList = parsedItem;
  }

  class Task {
    constructor(title, description, dueDate, priority, projectIndex, status) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.projectIndex = projectIndex;
      this.status = status;
    }
  }

  const addTask = () => {
    const {
      taskTitle,
      taskDescription,
      taskDueDate,
      taskPriority,
      taskProjects,
    } = _dom__WEBPACK_IMPORTED_MODULE_0__["default"];
    const status = false;
    const task = new Task(
      taskTitle.value,
      taskDescription.value,
      taskDueDate.value,
      taskPriority.value,
      taskProjects.value,
      status
    );
    taskList.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskList));
  };
  const checkValidity = () => {
    let isValid = false;
    const { taskTitle, taskDueDate } = _dom__WEBPACK_IMPORTED_MODULE_0__["default"];
    if (!taskTitle.value.length || !taskDueDate.value.length) {
      console.log("test");
      isValid = false;
    } else {
      addTask();
      isValid = true;
    }
    return isValid;
  };

  return { checkValidity, taskList };
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _eventHandlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventHandlers */ "./src/eventHandlers.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./localStorage */ "./src/localStorage.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_localStorage__WEBPACK_IMPORTED_MODULE_2__);




_dom__WEBPACK_IMPORTED_MODULE_1__["default"].displayProjects();
_dom__WEBPACK_IMPORTED_MODULE_1__["default"].displayTasks();

_eventHandlers__WEBPACK_IMPORTED_MODULE_0__["default"].clickListener();
_eventHandlers__WEBPACK_IMPORTED_MODULE_0__["default"].windowResize();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YWNrOi8vdG9kby8uL3NyYy9ldmVudEhhbmRsZXJzLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwcm9qZWN0cyBmcm9tIFwiLi9wcm9qZWN0c1wiO1xuaW1wb3J0IHRhc2tzIGZyb20gXCIuL3Rhc2tzXCI7XG5pbXBvcnQgc3RvcmFnZSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2VcIjtcblxuY29uc3QgZG9tID0gKCgpID0+IHtcbiAgY29uc3QgbWVudUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lbnUtYnVyZ2VyXCIpO1xuICBjb25zdCBzaWRlQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyXCIpO1xuICBjb25zdCBhZGRUYXNrTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrLW1vZGFsXCIpO1xuICBjb25zdCBhZGRQcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0LW1vZGFsXCIpO1xuICBjb25zdCBlZGl0UHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lZGl0LXByb2plY3QtbW9kYWxcIik7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyXCIpO1xuICBjb25zdCBtYWluQ29udGVudENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIubWFpbi1jb250ZW50LWNvbnRhaW5lclwiXG4gICk7XG4gIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0c1wiKTtcbiAgY29uc3QgcHJvamVjdENvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0cy1jb3VudFwiKTtcblxuICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stdGl0bGVcIik7XG4gIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1kZXNjcmlwdGlvblwiKTtcbiAgY29uc3QgdGFza0R1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZGF0ZVwiKTtcbiAgY29uc3QgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXByaW9yaXR5XCIpO1xuICBjb25zdCB0YXNrUHJvamVjdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stcHJvamVjdHNcIik7XG5cbiAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LXRpdGxlXCIpO1xuICBjb25zdCBlZGl0UHJvamVjdFRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0LXByb2plY3QtdGl0bGVcIik7XG5cbiAgY29uc3QgdGFza0FsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFza1wiKTtcblxuICBjb25zdCBoaWRlUmVzaXplID0gKCkgPT4ge1xuICAgIG1lbnVJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b2dnbGUtbWVudVwiKTtcbiAgICBzaWRlQmFyLmNsYXNzTGlzdC5hZGQoXCJoaWRlLXNpZGViYXJcIik7XG4gIH07XG5cbiAgY29uc3Qgc2hvd1Jlc2l6ZSA9ICgpID0+IHtcbiAgICBtZW51SWNvbi5jbGFzc0xpc3QuYWRkKFwidG9nZ2xlLW1lbnVcIik7XG4gICAgc2lkZUJhci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZS1zaWRlYmFyXCIpO1xuICB9O1xuXG4gIGNvbnN0IGhpZGVTaWRlQmFyID0gKCkgPT4ge1xuICAgIGlmIChzaWRlQmFyLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGUtc2lkZWJhclwiKSkge1xuICAgICAgc2lkZUJhci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZS1zaWRlYmFyXCIpO1xuICAgICAgc2lkZUJhci5jbGFzc0xpc3QuYWRkKFwic2hvdy1zaWRlYmFyXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaWRlQmFyLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93LXNpZGViYXJcIik7XG4gICAgICBzaWRlQmFyLmNsYXNzTGlzdC5hZGQoXCJoaWRlLXNpZGViYXJcIik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHRvZ2dsZU1lbnUgPSAoKSA9PiB7XG4gICAgaWYgKG1lbnVJY29uLmNsYXNzTGlzdC5jb250YWlucyhcInRvZ2dsZS1tZW51XCIpKSB7XG4gICAgICBtZW51SWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwidG9nZ2xlLW1lbnVcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lbnVJY29uLmNsYXNzTGlzdC5hZGQoXCJ0b2dnbGUtbWVudVwiKTtcbiAgICB9XG4gICAgaGlkZVNpZGVCYXIoKTtcbiAgfTtcblxuICBjb25zdCBjbGVhcklucHV0VmFsdWVzID0gKCkgPT4ge1xuICAgIHRhc2tUaXRsZS52YWx1ZSA9IFwiXCI7XG4gICAgdGFza0Rlc2NyaXB0aW9uLnZhbHVlID0gXCJcIjtcbiAgICB0YXNrRHVlRGF0ZS52YWx1ZSA9IFwiXCI7XG4gICAgdGFza1ByaW9yaXR5LnZhbHVlID0gXCJOb3QgSW1wb3J0YW50XCI7XG4gIH07XG5cbiAgY29uc3QgY2hhbmdlVGFza1ZhbHVlID0gKCkgPT4ge1xuICAgIGNvbnN0IG1haW5Db250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLWNvbnRlbnRcIik7XG4gICAgaWYgKG1haW5Db250ZW50ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBpbmRleCA9IG1haW5Db250ZW50LmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdC1pbmRleFwiKTtcbiAgICAgIHRhc2tQcm9qZWN0cy52YWx1ZSA9IGluZGV4O1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzaG93TW9kYWwgPSAoZSkgPT4ge1xuICAgIGlmIChlLmNsYXNzTGlzdC5jb250YWlucyhcImFkZHRhc2tcIikpIHtcbiAgICAgIGFkZFRhc2tNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH0gZWxzZSBpZiAoZS5jbGFzc0xpc3QuY29udGFpbnMoXCJhZGRwcm9qZWN0XCIpKSB7XG4gICAgICBhZGRQcm9qZWN0TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgcHJvamVjdFRpdGxlLnZhbHVlID0gXCJcIjtcbiAgICB9IGVsc2UgaWYgKGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwicHJvamVjdC1lZGl0XCIpKSB7XG4gICAgICBlZGl0UHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgIGVkaXRQcm9qZWN0VGl0bGUudmFsdWUgPVxuICAgICAgICBlLnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy50ZXh0Q29udGVudDtcbiAgICB9XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwib3ZlcmZsb3dcIik7XG5cbiAgICBjbGVhcklucHV0VmFsdWVzKCk7XG4gICAgY2hhbmdlVGFza1ZhbHVlKCk7XG4gIH07XG5cbiAgY29uc3QgaGlkZU1vZGFsID0gKCkgPT4ge1xuICAgIGFkZFRhc2tNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgYWRkUHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBlZGl0UHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJvdmVyZmxvd1wiKTtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVNYWluQ29udGVudCA9IChpbmRleCwgdGl0bGUpID0+IHtcbiAgICBjb25zdCBtYWluQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LmFkZChcIm1haW4tY29udGVudFwiKTtcbiAgICBtYWluQ29udGVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3QtaW5kZXhcIiwgaW5kZXgpO1xuXG4gICAgY29uc3QgbVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgIG1UaXRsZS5jbGFzc0xpc3QuYWRkKFwidGFzay10aXRsZVwiKTtcbiAgICBtVGl0bGUudGV4dENvbnRlbnQgPSBgJHt0aXRsZX1gO1xuXG4gICAgY29uc3QgbUxpc3RIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIG1MaXN0SGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWxpc3QtaGVhZGVyXCIsIFwiZmxleFwiKTtcbiAgICBtTGlzdEhlYWRlci5pbm5lckhUTUwgPSBgVGFza3MgPGkgY2xhc3M9XCJmYS1yZWd1bGFyIGZhLXBsdXMgdG9vbHRpcCBhZGR0YXNrIHNob3ctbW9kYWxcIj48L2k+YDtcblxuICAgIGNvbnN0IG1UYXNrTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcbiAgICBtVGFza0xpc3QuY2xhc3NMaXN0LmFkZChcInRhc2stbGlzdFwiKTtcblxuICAgIG1haW5Db250ZW50LmFwcGVuZENoaWxkKG1UaXRsZSk7XG4gICAgbWFpbkNvbnRlbnQuYXBwZW5kQ2hpbGQobUxpc3RIZWFkZXIpO1xuICAgIG1haW5Db250ZW50LmFwcGVuZENoaWxkKG1UYXNrTGlzdCk7XG5cbiAgICByZXR1cm4gbWFpbkNvbnRlbnQ7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlU2VsZWN0ZWQgPSAoKSA9PiB7XG4gICAgdGFza0FsbC5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKSk7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlUHJvamVjdCA9IChpbmRleCwgdGl0bGUpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIsIFwidGFza1wiKTtcbiAgICBwcm9qZWN0LnNldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdC1pbmRleFwiLCBpbmRleCk7XG5cbiAgICBjb25zdCBwVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBwVGl0bGUuY2xhc3NMaXN0LmFkZChcInByb2plY3RfX3RpdGxlXCIpO1xuICAgIHBUaXRsZS50ZXh0Q29udGVudCA9IGAke3RpdGxlfWA7XG5cbiAgICBjb25zdCBwVXRpbGl0aWVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwVXRpbGl0aWVzLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0X191dGlsaXRpZXNcIik7XG4gICAgcFV0aWxpdGllcy5pbm5lckhUTUwgPSBgXG4gICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1wZW4tdG8tc3F1YXJlIHByb2plY3QtZWRpdCBzaG93LW1vZGFsIHByb2plY3QtYnRuXCIgc3R5bGU9XCJwb2ludGVyLWV2ZW50czphdXRvXCI+PC9pPlxuICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtdHJhc2ggcHJvamVjdC1kZWxldGUgcHJvamVjdC1idG5cIiBzdHlsZT1cInBvaW50ZXItZXZlbnRzOmF1dG9cIj48L2k+XG5gO1xuXG4gICAgcHJvamVjdC5hcHBlbmRDaGlsZChwVGl0bGUpO1xuICAgIHByb2plY3QuYXBwZW5kQ2hpbGQocFV0aWxpdGllcyk7XG5cbiAgICByZXR1cm4gcHJvamVjdDtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVUYXNrT3B0aW9uID0gKHZhbHVlLCB0ZXh0KSA9PiB7XG4gICAgY29uc3QgdGFza1Byb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIHRhc2tQcm9qZWN0LnZhbHVlID0gdmFsdWU7XG4gICAgdGFza1Byb2plY3QudGV4dENvbnRlbnQgPSBgJHt0ZXh0fWA7XG5cbiAgICByZXR1cm4gdGFza1Byb2plY3Q7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVByb2plY3RzID0gKCkgPT4ge1xuICAgIHByb2plY3RMaXN0LnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBtYWluQ29udGVudENvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgdGFza1Byb2plY3RzLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHMucHJvamVjdExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHsgbmFtZSB9ID0gcHJvamVjdHMucHJvamVjdExpc3RbaV07XG4gICAgICBjb25zb2xlLmxvZyhwcm9qZWN0cy5wcm9qZWN0TGlzdCk7XG4gICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChjcmVhdGVQcm9qZWN0KGksIG5hbWUpKTtcbiAgICAgIHRhc2tQcm9qZWN0cy5hcHBlbmRDaGlsZChjcmVhdGVUYXNrT3B0aW9uKGksIG5hbWUpKTtcbiAgICB9XG4gICAgcHJvamVjdENvdW50LnRleHRDb250ZW50ID0gYCgke3Byb2plY3RzLnByb2plY3RMaXN0Lmxlbmd0aH0pYDtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVUYXNrID0gKGluZGV4LCB0aXRsZSwgZHVlRGF0ZSwgcHJvamVjdEluZGV4LCBuYW1lKSA9PiB7XG4gICAgY29uc3QgdGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICB0YXNrLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWxpc3RfX3Rhc2tcIik7XG4gICAgdGFzay5zZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIsIGluZGV4KTtcbiAgICB0YXNrLnNldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdC1pbmRleFwiLCBwcm9qZWN0SW5kZXgpO1xuXG4gICAgY29uc3QgdGFza0xlZnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRhc2tMZWZ0LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWxlZnRcIiwgXCJmbGV4XCIpO1xuXG4gICAgdGFza0xlZnQuaW5uZXJIVE1MID0gYFxuICAgIDxsYWJlbCBmb3I9XCJjaGVja2JveC0ke2luZGV4fVwiIGNsYXNzPVwiY2hlY2tib3gtY2lyY2xlXCI+PC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cImNoZWNrYm94XCIgaWQ9XCJjaGVja2JveC0ke2luZGV4fVwiIC8+XG4gICAgPHAgY2xhc3M9XCJ0YXNrLWxlZnRfX3RpdGxlXCI+JHt0aXRsZX08L3A+YDtcblxuICAgIGNvbnN0IHRhc2tSaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGFza1JpZ2h0LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLXJpZ2h0XCIsIFwiZmxleFwiKTtcblxuICAgIHRhc2tSaWdodC5pbm5lckhUTUwgPSBgXG4gICAgPHAgY2xhc3M9XCJ0YXNrLXJpZ2h0X19kYXRlXCI+JHtkdWVEYXRlfTwvcD5cbiAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXBlbi10by1zcXVhcmUgdGFzay1lZGl0IHRhc2stYnRuXCI+PC9pPlxuICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2lyY2xlLWluZm8gdGFzay1pbmZvIHRhc2stYnRuXCI+PC9pPlxuICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtdHJhc2ggdGFzay1kZWxldGUgdGFzay1idG5cIj48L2k+YDtcblxuICAgIHRhc2suYXBwZW5kQ2hpbGQodGFza0xlZnQpO1xuICAgIHRhc2suYXBwZW5kQ2hpbGQodGFza1JpZ2h0KTtcbiAgICByZXR1cm4gdGFzaztcbiAgfTtcblxuICBjb25zdCBjaGVja1N0YXR1cyA9IChzdGF0dXMsIGkpID0+IHtcbiAgICBjb25zdCB0YXNrU3RhdHVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdYCk7XG4gICAgY29uc3QgdGFza0NoZWNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jaGVja2JveC1jaXJjbGVcIik7XG4gICAgY29uc3QgdGFza0xlZnRUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFzay1sZWZ0X190aXRsZVwiKTtcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrLWxpc3RfX3Rhc2tcIik7XG4gICAgaWYgKHN0YXR1cyA9PT0gdHJ1ZSkge1xuICAgICAgdGFza1N0YXR1c1tpXS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIHRhc2tMZWZ0VGl0bGVbaV0uc3R5bGUudGV4dERlY29yYXRpb24gPSBcImxpbmUtdGhyb3VnaFwiO1xuICAgICAgdGFza0xlZnRUaXRsZVtpXS5zdHlsZS5vcGFjaXR5ID0gMC42O1xuICAgICAgdGFza1tpXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNlZWVcIjtcbiAgICAgIHRhc2tbaV0uc3R5bGUub3BhY2l0eSA9IDAuODtcbiAgICAgIHRhc2tDaGVja1tpXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLW1haW4tY29sb3IpXCI7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlUYXNrcyA9ICgpID0+IHtcbiAgICBtYWluQ29udGVudENvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICBjb25zdCBzZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0ZWRcIik7XG4gICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdFwiKTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHByb2plY3RzLnByb2plY3RMaXN0Lmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCB7IG5hbWUgfSA9IHByb2plY3RzLnByb2plY3RMaXN0W2pdO1xuICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBwcm9qZWN0W2pdLmNoaWxkcmVuWzBdLnRleHRDb250ZW50O1xuICAgICAgaWYgKHByb2plY3ROYW1lID09PSBuYW1lICYmIHByb2plY3Rbal0uY2xhc3NMaXN0LmNvbnRhaW5zKFwic2VsZWN0ZWRcIikpIHtcbiAgICAgICAgbWFpbkNvbnRlbnRDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICBtYWluQ29udGVudENvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVNYWluQ29udGVudChqLCBuYW1lKSk7XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkLmNsYXNzTGlzdC5jb250YWlucyhcInRhc2tzX19hbGxcIikpIHtcbiAgICAgICAgbWFpbkNvbnRlbnRDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICBtYWluQ29udGVudENvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVNYWluQ29udGVudChqLCBcIkFsbFwiKSk7XG4gICAgICAgIGNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZHRhc2tcIik7XG4gICAgICAgIGFkZFRhc2tCdG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0YXNrc19fY29tcGxldGVkXCIpKSB7XG4gICAgICAgIG1haW5Db250ZW50Q29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgbWFpbkNvbnRlbnRDb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlTWFpbkNvbnRlbnQoaiwgXCJDb21wbGV0ZWRcIikpO1xuICAgICAgICBjb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGR0YXNrXCIpO1xuICAgICAgICBhZGRUYXNrQnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB0YXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1saXN0XCIpO1xuICAgIGNvbnN0IG1haW5Db250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLWNvbnRlbnRcIik7XG4gICAgaWYgKG1haW5Db250ZW50ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBwcm9qZWN0SW5kZXggPSBtYWluQ29udGVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3QtaW5kZXhcIik7XG4gICAgICBjb25zdCBmaWx0ZXJlZExpc3QgPSB0YXNrcy50YXNrTGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKHNlbGVjdGVkLmNsYXNzTGlzdC5jb250YWlucyhcInByb2plY3RcIikpIHtcbiAgICAgICAgICByZXR1cm4gaXRlbS5wcm9qZWN0SW5kZXggPT09IHByb2plY3RJbmRleDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZWN0ZWQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGFza3NfX2NvbXBsZXRlZFwiKSkge1xuICAgICAgICAgIHJldHVybiBpdGVtLnN0YXR1cyA9PT0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZWN0ZWQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGFza3NfX2FsbFwiKSkge1xuICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWx0ZXJlZExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgeyB0aXRsZSwgZHVlRGF0ZSwgc3RhdHVzIH0gPSBmaWx0ZXJlZExpc3RbaV07XG4gICAgICAgIHRhc2tMaXN0LmFwcGVuZENoaWxkKGNyZWF0ZVRhc2soaSwgdGl0bGUsIGR1ZURhdGUsIHByb2plY3RJbmRleCkpO1xuXG4gICAgICAgIGNoZWNrU3RhdHVzKHN0YXR1cywgaSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlbW92ZVRhc2sgPSAodGl0bGUpID0+IHtcbiAgICBjb25zdCB4ID0gdGFza3MudGFza0xpc3QuZmluZCgoZWwpID0+IHtcbiAgICAgIHJldHVybiBlbC50aXRsZS50b0xvd2VyQ2FzZSgpID09PSB0aXRsZS50b0xvd2VyQ2FzZSgpO1xuICAgIH0pO1xuICAgIGNvbnN0IGluZGV4T2ZUYXNrID0gdGFza3MudGFza0xpc3QuaW5kZXhPZih4KTtcbiAgICB0YXNrcy50YXNrTGlzdC5zcGxpY2UoaW5kZXhPZlRhc2ssIDEpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidGFza3NcIiwgSlNPTi5zdHJpbmdpZnkodGFza3MudGFza0xpc3QpKTtcbiAgICBkaXNwbGF5VGFza3MoKTtcbiAgfTtcblxuICBjb25zdCByZW1vdmVQcm9qZWN0ID0gKGluZGV4KSA9PiB7XG4gICAgdGFza3MudGFza0xpc3Quc2xpY2UoMCkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0ucHJvamVjdEluZGV4ID09PSBpbmRleCkge1xuICAgICAgICBpZiAodGFza3MudGFza0xpc3QuaW5jbHVkZXMoaXRlbSkpIHtcbiAgICAgICAgICBjb25zdCB0YXNrSW5kZXggPSB0YXNrcy50YXNrTGlzdC5pbmRleE9mKGl0ZW0pO1xuICAgICAgICAgIHRhc2tzLnRhc2tMaXN0LnNwbGljZSh0YXNrSW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBwcm9qZWN0cy5wcm9qZWN0TGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cy5wcm9qZWN0TGlzdCkpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidGFza3NcIiwgSlNPTi5zdHJpbmdpZnkodGFza3MudGFza0xpc3QpKTtcbiAgICBkaXNwbGF5UHJvamVjdHMoKTtcbiAgICBkaXNwbGF5VGFza3MoKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHRvZ2dsZU1lbnUsXG4gICAgaGlkZVJlc2l6ZSxcbiAgICBzaG93UmVzaXplLFxuICAgIHNob3dNb2RhbCxcbiAgICBoaWRlTW9kYWwsXG4gICAgZGlzcGxheVRhc2tzLFxuICAgIHJlbW92ZVRhc2ssXG4gICAgZGlzcGxheVByb2plY3RzLFxuICAgIHJlbW92ZVNlbGVjdGVkLFxuICAgIHJlbW92ZVByb2plY3QsXG4gICAgY29udGFpbmVyLFxuICAgIHRhc2tUaXRsZSxcbiAgICB0YXNrRGVzY3JpcHRpb24sXG4gICAgdGFza0R1ZURhdGUsXG4gICAgdGFza1ByaW9yaXR5LFxuICAgIHRhc2tQcm9qZWN0cyxcbiAgICBwcm9qZWN0VGl0bGUsXG4gICAgYWRkVGFza01vZGFsLFxuICAgIGVkaXRQcm9qZWN0VGl0bGUsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBkb207XG4iLCJpbXBvcnQgZG9tIGZyb20gXCIuL2RvbVwiO1xuaW1wb3J0IHRhc2tzIGZyb20gXCIuL3Rhc2tzXCI7XG5pbXBvcnQgcHJvamVjdHMgZnJvbSBcIi4vcHJvamVjdHNcIjtcbmltcG9ydCBzdG9yYWdlIGZyb20gXCIuL2xvY2FsU3RvcmFnZVwiO1xuXG5jb25zdCBldmVudEhhbmRsZXJzID0gKCgpID0+IHtcbiAgY29uc3Qgd2luZG93UmVzaXplID0gKCkgPT4ge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSA5MDApIHtcbiAgICAgICAgZG9tLmhpZGVSZXNpemUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvbS5zaG93UmVzaXplKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgYXJyID0gW107XG4gIGNvbnN0IGNsaWNrTGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibWVudS1idXJnZXJcIikpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBkb20udG9nZ2xlTWVudSgpO1xuICAgICAgfVxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNob3ctbW9kYWxcIikpIHtcbiAgICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGU7XG4gICAgICAgIGRvbS5zaG93TW9kYWwodGFyZ2V0KTtcbiAgICAgICAgY29uc29sZS5sb2codGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGluZGV4ID1cbiAgICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdC1pbmRleFwiKTtcbiAgICAgICAgYXJyLnB1c2goK2luZGV4KTtcblxuICAgICAgICBkb20uY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgZG9tLmhpZGVNb2RhbCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNsb3NlLW1vZGFsXCIpKSB7XG4gICAgICAgIGRvbS5oaWRlTW9kYWwoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImFkZC1wcm9qZWN0LWJ0blwiKSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgdmFsaWRDaGVjayA9IHByb2plY3RzLmNoZWNrVmFsaWRpdHkoKTtcbiAgICAgICAgZG9tLmRpc3BsYXlQcm9qZWN0cygpO1xuICAgICAgICBjb25zdCBwcm9qZWN0QWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3RlZFwiKTtcbiAgICAgICAgcHJvamVjdEFsbC5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKSk7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdFwiKTtcbiAgICAgICAgcHJvamVjdC5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKSk7XG5cbiAgICAgICAgcHJvamVjdFtwcm9qZWN0Lmxlbmd0aCAtIDFdLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcblxuICAgICAgICBjb25zdCB0YXNrUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFza3NfX3Byb2plY3RzXCIpO1xuICAgICAgICB0YXNrUHJvamVjdC5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5jbGFzc0xpc3QuYWRkKFwicm90YXRlLWFycm93XCIpO1xuICAgICAgICB0YXNrUHJvamVjdC5jaGlsZHJlblsyXS5jbGFzc0xpc3QuYWRkKFwiaGlkZS1wcm9qZWN0c1wiKTtcbiAgICAgICAgZG9tLmRpc3BsYXlUYXNrcygpO1xuICAgICAgICBpZiAodmFsaWRDaGVjayA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGRvbS5oaWRlTW9kYWwoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWRkLXRhc2stYnRuXCIpKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCB2YWxpZENoZWNrID0gdGFza3MuY2hlY2tWYWxpZGl0eSgpO1xuICAgICAgICBkb20uZGlzcGxheVRhc2tzKCk7XG4gICAgICAgIGlmICh2YWxpZENoZWNrID09PSB0cnVlKSB7XG4gICAgICAgICAgZG9tLmhpZGVNb2RhbCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0YXNrLWRlbGV0ZVwiKSkge1xuICAgICAgICBjb25zdCB0aXRsZSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy5jaGlsZHJlblsyXTtcblxuICAgICAgICBkb20ucmVtb3ZlVGFzayh0aXRsZS50ZXh0Q29udGVudCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC50eXBlID09PSBcImNoZWNrYm94XCIpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPVxuICAgICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICBcImRhdGEtcHJvamVjdC1pbmRleFwiXG4gICAgICAgICAgKTtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzJdLnRleHRDb250ZW50O1xuICAgICAgICBjb25zdCB4ID0gdGFza3MudGFza0xpc3QuZmluZCgoZWwpID0+IHtcbiAgICAgICAgICByZXR1cm4gZWwudGl0bGUudG9Mb3dlckNhc2UoKSA9PT0gdGl0bGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGluZGV4T2ZUYXNrID0gdGFza3MudGFza0xpc3QuaW5kZXhPZih4KTtcbiAgICAgICAgY29uc3QgZ2V0QXJyYXlJdGVtID0gdGFza3MudGFza0xpc3RbaW5kZXhPZlRhc2tdO1xuXG4gICAgICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgZ2V0QXJyYXlJdGVtLnN0YXR1cyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2V0QXJyYXlJdGVtLnN0YXR1cyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGRvbS5kaXNwbGF5VGFza3MoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInByb2plY3RcIikpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdEFsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0ZWRcIik7XG4gICAgICAgIHByb2plY3RBbGwuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIikpO1xuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgICAgIGRvbS5kaXNwbGF5VGFza3MoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInRhc2tzX19jb21wbGV0ZWRcIikpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdEFsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0ZWRcIik7XG4gICAgICAgIHByb2plY3RBbGwuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIikpO1xuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgICAgIGRvbS5kaXNwbGF5VGFza3MoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInRhc2tzX19hbGxcIikpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdEFsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0ZWRcIik7XG4gICAgICAgIHByb2plY3RBbGwuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIikpO1xuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgICAgIGRvbS5kaXNwbGF5VGFza3MoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInByb2plY3RzLWhlYWRlclwiKSkge1xuICAgICAgICBjb25zdCB0YXNrUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFza3NfX3Byb2plY3RzXCIpO1xuICAgICAgICB0YXNrUHJvamVjdC5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5jbGFzc0xpc3QudG9nZ2xlKFwicm90YXRlLWFycm93XCIpO1xuICAgICAgICB0YXNrUHJvamVjdC5jaGlsZHJlblsyXS5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZS1wcm9qZWN0c1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInByb2plY3QtZGVsZXRlXCIpKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID1cbiAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgXCJkYXRhLXByb2plY3QtaW5kZXhcIlxuICAgICAgICAgICk7XG5cbiAgICAgICAgdGFza3MudGFza0xpc3Quc2xpY2UoMCkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGlmIChpdGVtLnByb2plY3RJbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgIGlmICh0YXNrcy50YXNrTGlzdC5pbmNsdWRlcyhpdGVtKSkge1xuICAgICAgICAgICAgICBjb25zdCB0YXNrSW5kZXggPSB0YXNrcy50YXNrTGlzdC5pbmRleE9mKGl0ZW0pO1xuICAgICAgICAgICAgICB0YXNrcy50YXNrTGlzdC5zcGxpY2UodGFza0luZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHByb2plY3RzLnByb2plY3RMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGRvbS5kaXNwbGF5UHJvamVjdHMoKTtcbiAgICAgICAgY29uc3QgcHJvamVjdEFsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0ZWRcIik7XG4gICAgICAgIHByb2plY3RBbGwuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIikpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3RcIik7XG4gICAgICAgIHByb2plY3QuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIikpO1xuXG4gICAgICAgIHByb2plY3RbMF0uY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xuXG4gICAgICAgIGRvbS5kaXNwbGF5VGFza3MoKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cy5wcm9qZWN0TGlzdCkpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRhc2tzXCIsIEpTT04uc3RyaW5naWZ5KHRhc2tzLnRhc2tMaXN0KSk7XG4gICAgICAgIGRvbS5oaWRlTW9kYWwoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXQtcHJvamVjdC1idG5cIikpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBjb25zdCBwb3BwZWRWYWwgPSBhcnIucG9wKCk7XG4gICAgICAgIHByb2plY3RzLnByb2plY3RMaXN0W3BvcHBlZFZhbF0gPSB7XG4gICAgICAgICAgbmFtZTogYCR7ZG9tLmVkaXRQcm9qZWN0VGl0bGUudmFsdWV9YCxcbiAgICAgICAgfTtcblxuICAgICAgICBkb20uZGlzcGxheVByb2plY3RzKCk7XG4gICAgICAgIGNvbnN0IHByb2plY3RBbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdGVkXCIpO1xuICAgICAgICBwcm9qZWN0QWxsLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpKTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0XCIpO1xuICAgICAgICBwcm9qZWN0LmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpKTtcblxuICAgICAgICBwcm9qZWN0W3BvcHBlZFZhbF0uY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xuXG4gICAgICAgIGRvbS5kaXNwbGF5VGFza3MoKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cy5wcm9qZWN0TGlzdCkpO1xuICAgICAgICBkb20uaGlkZU1vZGFsKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHsgY2xpY2tMaXN0ZW5lciwgd2luZG93UmVzaXplIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBldmVudEhhbmRsZXJzO1xuIiwiaW1wb3J0IGRvbSBmcm9tIFwiLi9kb21cIjtcbmltcG9ydCBzdG9yYWdlIGZyb20gXCIuL2xvY2FsU3RvcmFnZVwiO1xuaW1wb3J0IHRhc2tzIGZyb20gXCIuL3Rhc2tzXCI7XG5cbmNvbnN0IHByb2plY3RzID0gKCgpID0+IHtcbiAgbGV0IHByb2plY3RMaXN0ID0gW107XG5cbiAgY29uc3QgcHJvamVjdFN0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpO1xuICBpZiAocHJvamVjdFN0b3JhZ2UgPT09IG51bGwgfHwgIXByb2plY3RTdG9yYWdlLmxlbmd0aCkge1xuICAgIHByb2plY3RMaXN0LnB1c2goeyBuYW1lOiBcInRlc3RcIiB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBwYXJzZWRJdGVtID0gcHJvamVjdFN0b3JhZ2U7XG4gICAgcHJvamVjdExpc3QgPSBwYXJzZWRJdGVtO1xuICB9XG5cbiAgY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBhZGRQcm9qZWN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgcHJvamVjdFRpdGxlIH0gPSBkb207XG4gICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3RUaXRsZS52YWx1ZSk7XG4gICAgcHJvamVjdExpc3QucHVzaChwcm9qZWN0KTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RMaXN0KSk7XG4gIH07XG5cbiAgY29uc3QgY2hlY2tWYWxpZGl0eSA9ICgpID0+IHtcbiAgICBsZXQgaXNWYWxpZCA9IGZhbHNlO1xuICAgIGNvbnN0IHsgcHJvamVjdFRpdGxlIH0gPSBkb207XG4gICAgaWYgKCFwcm9qZWN0VGl0bGUudmFsdWUubGVuZ3RoKSB7XG4gICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZFByb2plY3QoKTtcbiAgICAgIGlzVmFsaWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gaXNWYWxpZDtcbiAgfTtcblxuICByZXR1cm4geyBhZGRQcm9qZWN0LCBjaGVja1ZhbGlkaXR5LCBwcm9qZWN0TGlzdCB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgcHJvamVjdHM7XG4iLCJpbXBvcnQgZG9tIGZyb20gXCIuL2RvbVwiO1xuaW1wb3J0IHByb2plY3RzIGZyb20gXCIuL3Byb2plY3RzXCI7XG5pbXBvcnQgc3RvcmFnZSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2VcIjtcblxuY29uc3QgdGFza3MgPSAoKCkgPT4ge1xuICBsZXQgdGFza0xpc3QgPSBbXTtcblxuICBjb25zdCB0YXNrc1N0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGFza3NcIikpO1xuICBpZiAodGFza3NTdG9yYWdlID09PSBudWxsIHx8ICF0YXNrc1N0b3JhZ2UubGVuZ3RoKSB7XG4gICAgdGFza0xpc3QucHVzaCh7XG4gICAgICB0aXRsZTogXCJUZXN0XCIsXG4gICAgICBkZXNjcmlwdGlvbjogXCJUZXN0XCIsXG4gICAgICBkdWVEYXRlOiBcIjIwMjItMDQtOFwiLFxuICAgICAgcHJpb3JpdHk6IFwiTm90IEltcG9ydGFudFwiLFxuICAgICAgcHJvamVjdEluZGV4OiBcIjBcIixcbiAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgcGFyc2VkSXRlbSA9IHRhc2tzU3RvcmFnZTtcbiAgICB0YXNrTGlzdCA9IHBhcnNlZEl0ZW07XG4gIH1cblxuICBjbGFzcyBUYXNrIHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0SW5kZXgsIHN0YXR1cykge1xuICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgIHRoaXMucHJvamVjdEluZGV4ID0gcHJvamVjdEluZGV4O1xuICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgYWRkVGFzayA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICB0YXNrVGl0bGUsXG4gICAgICB0YXNrRGVzY3JpcHRpb24sXG4gICAgICB0YXNrRHVlRGF0ZSxcbiAgICAgIHRhc2tQcmlvcml0eSxcbiAgICAgIHRhc2tQcm9qZWN0cyxcbiAgICB9ID0gZG9tO1xuICAgIGNvbnN0IHN0YXR1cyA9IGZhbHNlO1xuICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzayhcbiAgICAgIHRhc2tUaXRsZS52YWx1ZSxcbiAgICAgIHRhc2tEZXNjcmlwdGlvbi52YWx1ZSxcbiAgICAgIHRhc2tEdWVEYXRlLnZhbHVlLFxuICAgICAgdGFza1ByaW9yaXR5LnZhbHVlLFxuICAgICAgdGFza1Byb2plY3RzLnZhbHVlLFxuICAgICAgc3RhdHVzXG4gICAgKTtcbiAgICB0YXNrTGlzdC5wdXNoKHRhc2spO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidGFza3NcIiwgSlNPTi5zdHJpbmdpZnkodGFza0xpc3QpKTtcbiAgfTtcbiAgY29uc3QgY2hlY2tWYWxpZGl0eSA9ICgpID0+IHtcbiAgICBsZXQgaXNWYWxpZCA9IGZhbHNlO1xuICAgIGNvbnN0IHsgdGFza1RpdGxlLCB0YXNrRHVlRGF0ZSB9ID0gZG9tO1xuICAgIGlmICghdGFza1RpdGxlLnZhbHVlLmxlbmd0aCB8fCAhdGFza0R1ZURhdGUudmFsdWUubGVuZ3RoKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInRlc3RcIik7XG4gICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZFRhc2soKTtcbiAgICAgIGlzVmFsaWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gaXNWYWxpZDtcbiAgfTtcblxuICByZXR1cm4geyBjaGVja1ZhbGlkaXR5LCB0YXNrTGlzdCB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdGFza3M7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGV2ZW50SGFuZGxlcnMgZnJvbSBcIi4vZXZlbnRIYW5kbGVyc1wiO1xuaW1wb3J0IGRvbSBmcm9tIFwiLi9kb21cIjtcbmltcG9ydCBzdG9yYWdlIGZyb20gXCIuL2xvY2FsU3RvcmFnZVwiO1xuXG5kb20uZGlzcGxheVByb2plY3RzKCk7XG5kb20uZGlzcGxheVRhc2tzKCk7XG5cbmV2ZW50SGFuZGxlcnMuY2xpY2tMaXN0ZW5lcigpO1xuZXZlbnRIYW5kbGVycy53aW5kb3dSZXNpemUoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
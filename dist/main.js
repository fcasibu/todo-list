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
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./localStorage */ "./src/localStorage.js");




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

    for (let i = 0; i < _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectList.length; i++) {
      const { name } = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectList[i];
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

    console.log(filteredList);
    for (let i = 0; i < filteredList.length; i++) {
      const { title, dueDate, status } = filteredList[i];
      taskList.appendChild(createTask(i, title, dueDate, projectIndex));

      checkStatus(status, i);
    }
  };

  const removeTask = (title) => {
    const x = _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList.find((el) => {
      return el.title === title.toLowerCase();
    });
    const indexOfTask = _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList.indexOf(x);
    console.log(_tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList.splice(indexOfTask, 1));
    localStorage.setItem("tasks", JSON.stringify(_tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList));
    displayTasks();
  };

  const removeProject = (index) => {
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectList.splice(index, 1);
    localStorage.setItem("projects", JSON.stringify(_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectList));
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
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./localStorage */ "./src/localStorage.js");





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
          return el.title === title.toLowerCase();
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
          e.target.parentElement.parentElement.parentElement.getAttribute(
            "data-project-index"
          );
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].removeProject(index);
      }

      if (e.target.classList.contains("project-edit")) {
        const index =
          e.target.parentElement.parentElement.parentElement.getAttribute(
            "data-project-index"
          );
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ "./src/dom.js");




const storage = (() => {
  const setProjectStorage = (arr) => {
    localStorage.setItem("projects", JSON.stringify(arr));
  };

  const setTaskStorage = (arr) => {
    localStorage.setItem("tasks", JSON.stringify(arr));
  };

  const getLocalStorage = (item, storageName) => {
    const parsedItem = JSON.parse(localStorage.getItem(storageName));
    if (item === "projects") {
      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectList = parsedItem;
    } else {
      _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList = parsedItem;
    }
  };

  const checkEmptyStorage = () => {
    _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList = [
      {
        title: "gym",
        description: "go to the gym",
        dueDate: 2022 - 4 - 17,
        priority: "Not Important",
        projectIndex: 0,
        status: false,
      },
    ];
  };

  return {
    setProjectStorage,
    setTaskStorage,
    getLocalStorage,
    checkEmptyStorage,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (storage);


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
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./localStorage */ "./src/localStorage.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");




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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./localStorage */ "./src/localStorage.js");




const tasks = (() => {
  let taskList = [];

  if (localStorage.getItem("projects") === null) {
    taskList = [
      {
        title: "test",
        description: "test",
        dueDate: `2022-4-17`,
        priority: "Not Important",
        projectIndex: 0,
        status: false,
      },
    ];
    localStorage.setItem("tasks", JSON.stringify(taskList));
  } else {
    const parsedItem = JSON.parse(localStorage.getItem("tasks"));
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
/* harmony import */ var _eventHandlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventHandlers */ "./src/eventHandlers.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./localStorage */ "./src/localStorage.js");




_dom__WEBPACK_IMPORTED_MODULE_1__["default"].displayProjects();
_dom__WEBPACK_IMPORTED_MODULE_1__["default"].displayTasks();

_eventHandlers__WEBPACK_IMPORTED_MODULE_0__["default"].clickListener();
_eventHandlers__WEBPACK_IMPORTED_MODULE_0__["default"].windowResize();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVkseUJBQXlCLEVBQUUsNENBQUc7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYLENBQUM7O0FBRUQsaUVBQWUsS0FBSyxFQUFDOzs7Ozs7O1VDdEVyQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNONEM7QUFDcEI7QUFDYTs7QUFFckMsNERBQW1CO0FBQ25CLHlEQUFnQjs7QUFFaEIsb0VBQTJCO0FBQzNCLG1FQUEwQiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvZXZlbnRIYW5kbGVycy5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2xvY2FsU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2plY3RzIGZyb20gXCIuL3Byb2plY3RzXCI7XG5pbXBvcnQgdGFza3MgZnJvbSBcIi4vdGFza3NcIjtcbmltcG9ydCBzdG9yYWdlIGZyb20gXCIuL2xvY2FsU3RvcmFnZVwiO1xuXG5jb25zdCBkb20gPSAoKCkgPT4ge1xuICBjb25zdCBtZW51SWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVudS1idXJnZXJcIik7XG4gIGNvbnN0IHNpZGVCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXJcIik7XG4gIGNvbnN0IGFkZFRhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stbW9kYWxcIik7XG4gIGNvbnN0IGFkZFByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3QtbW9kYWxcIik7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyXCIpO1xuICBjb25zdCBtYWluQ29udGVudENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIubWFpbi1jb250ZW50LWNvbnRhaW5lclwiXG4gICk7XG4gIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0c1wiKTtcbiAgY29uc3QgcHJvamVjdENvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0cy1jb3VudFwiKTtcblxuICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stdGl0bGVcIik7XG4gIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1kZXNjcmlwdGlvblwiKTtcbiAgY29uc3QgdGFza0R1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZGF0ZVwiKTtcbiAgY29uc3QgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXByaW9yaXR5XCIpO1xuICBjb25zdCB0YXNrUHJvamVjdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stcHJvamVjdHNcIik7XG5cbiAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LXRpdGxlXCIpO1xuXG4gIGNvbnN0IHRhc2tBbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhc2tcIik7XG5cbiAgY29uc3QgaGlkZVJlc2l6ZSA9ICgpID0+IHtcbiAgICBtZW51SWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwidG9nZ2xlLW1lbnVcIik7XG4gICAgc2lkZUJhci5jbGFzc0xpc3QuYWRkKFwiaGlkZS1zaWRlYmFyXCIpO1xuICB9O1xuXG4gIGNvbnN0IHNob3dSZXNpemUgPSAoKSA9PiB7XG4gICAgbWVudUljb24uY2xhc3NMaXN0LmFkZChcInRvZ2dsZS1tZW51XCIpO1xuICAgIHNpZGVCYXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGUtc2lkZWJhclwiKTtcbiAgfTtcblxuICBjb25zdCBoaWRlU2lkZUJhciA9ICgpID0+IHtcbiAgICBpZiAoc2lkZUJhci5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRlLXNpZGViYXJcIikpIHtcbiAgICAgIHNpZGVCYXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGUtc2lkZWJhclwiKTtcbiAgICAgIHNpZGVCYXIuY2xhc3NMaXN0LmFkZChcInNob3ctc2lkZWJhclwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2lkZUJhci5jbGFzc0xpc3QucmVtb3ZlKFwic2hvdy1zaWRlYmFyXCIpO1xuICAgICAgc2lkZUJhci5jbGFzc0xpc3QuYWRkKFwiaGlkZS1zaWRlYmFyXCIpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCB0b2dnbGVNZW51ID0gKCkgPT4ge1xuICAgIGlmIChtZW51SWNvbi5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b2dnbGUtbWVudVwiKSkge1xuICAgICAgbWVudUljb24uY2xhc3NMaXN0LnJlbW92ZShcInRvZ2dsZS1tZW51XCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZW51SWNvbi5jbGFzc0xpc3QuYWRkKFwidG9nZ2xlLW1lbnVcIik7XG4gICAgfVxuICAgIGhpZGVTaWRlQmFyKCk7XG4gIH07XG5cbiAgY29uc3QgY2xlYXJJbnB1dFZhbHVlcyA9ICgpID0+IHtcbiAgICB0YXNrVGl0bGUudmFsdWUgPSBcIlwiO1xuICAgIHRhc2tEZXNjcmlwdGlvbi52YWx1ZSA9IFwiXCI7XG4gICAgdGFza0R1ZURhdGUudmFsdWUgPSBcIlwiO1xuICAgIHRhc2tQcmlvcml0eS52YWx1ZSA9IFwiTm90IEltcG9ydGFudFwiO1xuICB9O1xuXG4gIGNvbnN0IGNoYW5nZVRhc2tWYWx1ZSA9ICgpID0+IHtcbiAgICBjb25zdCBtYWluQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1jb250ZW50XCIpO1xuICAgIGlmIChtYWluQ29udGVudCAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgaW5kZXggPSBtYWluQ29udGVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3QtaW5kZXhcIik7XG4gICAgICB0YXNrUHJvamVjdHMudmFsdWUgPSBpbmRleDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2hvd01vZGFsID0gKGUpID0+IHtcbiAgICBpZiAoZS5jbGFzc0xpc3QuY29udGFpbnMoXCJhZGR0YXNrXCIpKSB7XG4gICAgICBhZGRUYXNrTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9IGVsc2UgaWYgKGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWRkcHJvamVjdFwiKSkge1xuICAgICAgYWRkUHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgIHByb2plY3RUaXRsZS52YWx1ZSA9IFwiXCI7XG4gICAgfVxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIm92ZXJmbG93XCIpO1xuXG4gICAgY2xlYXJJbnB1dFZhbHVlcygpO1xuICAgIGNoYW5nZVRhc2tWYWx1ZSgpO1xuICB9O1xuXG4gIGNvbnN0IGhpZGVNb2RhbCA9ICgpID0+IHtcbiAgICBhZGRUYXNrTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGFkZFByb2plY3RNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwib3ZlcmZsb3dcIik7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlTWFpbkNvbnRlbnQgPSAoaW5kZXgsIHRpdGxlKSA9PiB7XG4gICAgY29uc3QgbWFpbkNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC5hZGQoXCJtYWluLWNvbnRlbnRcIik7XG4gICAgbWFpbkNvbnRlbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0LWluZGV4XCIsIGluZGV4KTtcblxuICAgIGNvbnN0IG1UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICBtVGl0bGUuY2xhc3NMaXN0LmFkZChcInRhc2stdGl0bGVcIik7XG4gICAgbVRpdGxlLnRleHRDb250ZW50ID0gYCR7dGl0bGV9YDtcblxuICAgIGNvbnN0IG1MaXN0SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBtTGlzdEhlYWRlci5jbGFzc0xpc3QuYWRkKFwidGFzay1saXN0LWhlYWRlclwiLCBcImZsZXhcIik7XG4gICAgbUxpc3RIZWFkZXIuaW5uZXJIVE1MID0gYFRhc2tzIDxpIGNsYXNzPVwiZmEtcmVndWxhciBmYS1wbHVzIHRvb2x0aXAgYWRkdGFzayBzaG93LW1vZGFsXCI+PC9pPmA7XG5cbiAgICBjb25zdCBtVGFza0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gICAgbVRhc2tMaXN0LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWxpc3RcIik7XG5cbiAgICBtYWluQ29udGVudC5hcHBlbmRDaGlsZChtVGl0bGUpO1xuICAgIG1haW5Db250ZW50LmFwcGVuZENoaWxkKG1MaXN0SGVhZGVyKTtcbiAgICBtYWluQ29udGVudC5hcHBlbmRDaGlsZChtVGFza0xpc3QpO1xuXG4gICAgcmV0dXJuIG1haW5Db250ZW50O1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZVNlbGVjdGVkID0gKCkgPT4ge1xuICAgIHRhc2tBbGwuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIikpO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZVByb2plY3QgPSAoaW5kZXgsIHRpdGxlKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJvamVjdC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiLCBcInRhc2tcIik7XG4gICAgcHJvamVjdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3QtaW5kZXhcIiwgaW5kZXgpO1xuXG4gICAgY29uc3QgcFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgcFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0X190aXRsZVwiKTtcbiAgICBwVGl0bGUudGV4dENvbnRlbnQgPSBgJHt0aXRsZX1gO1xuXG4gICAgY29uc3QgcFV0aWxpdGllcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcFV0aWxpdGllcy5jbGFzc0xpc3QuYWRkKFwicHJvamVjdF9fdXRpbGl0aWVzXCIpO1xuICAgIHBVdGlsaXRpZXMuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJwcm9qZWN0X191dGlsaXRpZXNcIj5cbiAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXBlbi10by1zcXVhcmUgcHJvamVjdC1lZGl0IHByb2plY3QtYnRuXCIgc3R5bGU9XCJwb2ludGVyLWV2ZW50czphdXRvXCI+PC9pPlxuICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtdHJhc2ggcHJvamVjdC1kZWxldGUgcHJvamVjdC1idG5cIiBzdHlsZT1cInBvaW50ZXItZXZlbnRzOmF1dG9cIj48L2k+XG4gIDwvZGl2PmA7XG5cbiAgICBwcm9qZWN0LmFwcGVuZENoaWxkKHBUaXRsZSk7XG4gICAgcHJvamVjdC5hcHBlbmRDaGlsZChwVXRpbGl0aWVzKTtcblxuICAgIHJldHVybiBwcm9qZWN0O1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZVRhc2tPcHRpb24gPSAodmFsdWUsIHRleHQpID0+IHtcbiAgICBjb25zdCB0YXNrUHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgdGFza1Byb2plY3QudmFsdWUgPSB2YWx1ZTtcbiAgICB0YXNrUHJvamVjdC50ZXh0Q29udGVudCA9IGAke3RleHR9YDtcblxuICAgIHJldHVybiB0YXNrUHJvamVjdDtcbiAgfTtcblxuICBjb25zdCBkaXNwbGF5UHJvamVjdHMgPSAoKSA9PiB7XG4gICAgcHJvamVjdExpc3QudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIG1haW5Db250ZW50Q29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICB0YXNrUHJvamVjdHMudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5wcm9qZWN0TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgeyBuYW1lIH0gPSBwcm9qZWN0cy5wcm9qZWN0TGlzdFtpXTtcbiAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKGNyZWF0ZVByb2plY3QoaSwgbmFtZSkpO1xuICAgICAgdGFza1Byb2plY3RzLmFwcGVuZENoaWxkKGNyZWF0ZVRhc2tPcHRpb24oaSwgbmFtZSkpO1xuICAgIH1cbiAgICBwcm9qZWN0Q291bnQudGV4dENvbnRlbnQgPSBgKCR7cHJvamVjdHMucHJvamVjdExpc3QubGVuZ3RofSlgO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZVRhc2sgPSAoaW5kZXgsIHRpdGxlLCBkdWVEYXRlLCBwcm9qZWN0SW5kZXgsIG5hbWUpID0+IHtcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgIHRhc2suY2xhc3NMaXN0LmFkZChcInRhc2stbGlzdF9fdGFza1wiKTtcbiAgICB0YXNrLnNldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIiwgaW5kZXgpO1xuICAgIHRhc2suc2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0LWluZGV4XCIsIHByb2plY3RJbmRleCk7XG5cbiAgICBjb25zdCB0YXNrTGVmdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGFza0xlZnQuY2xhc3NMaXN0LmFkZChcInRhc2stbGVmdFwiLCBcImZsZXhcIik7XG5cbiAgICB0YXNrTGVmdC5pbm5lckhUTUwgPSBgXG4gICAgPGxhYmVsIGZvcj1cImNoZWNrYm94LSR7aW5kZXh9XCIgY2xhc3M9XCJjaGVja2JveC1jaXJjbGVcIj48L2xhYmVsPlxuICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwiY2hlY2tib3hcIiBpZD1cImNoZWNrYm94LSR7aW5kZXh9XCIgLz5cbiAgICA8cCBjbGFzcz1cInRhc2stbGVmdF9fdGl0bGVcIj4ke3RpdGxlfTwvcD5gO1xuXG4gICAgY29uc3QgdGFza1JpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YXNrUmlnaHQuY2xhc3NMaXN0LmFkZChcInRhc2stcmlnaHRcIiwgXCJmbGV4XCIpO1xuXG4gICAgdGFza1JpZ2h0LmlubmVySFRNTCA9IGBcbiAgICA8cCBjbGFzcz1cInRhc2stcmlnaHRfX2RhdGVcIj4ke2R1ZURhdGV9PC9wPlxuICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtcGVuLXRvLXNxdWFyZSB0YXNrLWVkaXQgdGFzay1idG5cIj48L2k+XG4gICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jaXJjbGUtaW5mbyB0YXNrLWluZm8gdGFzay1idG5cIj48L2k+XG4gICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS10cmFzaCB0YXNrLWRlbGV0ZSB0YXNrLWJ0blwiPjwvaT5gO1xuXG4gICAgdGFzay5hcHBlbmRDaGlsZCh0YXNrTGVmdCk7XG4gICAgdGFzay5hcHBlbmRDaGlsZCh0YXNrUmlnaHQpO1xuICAgIHJldHVybiB0YXNrO1xuICB9O1xuXG4gIGNvbnN0IGNoZWNrU3RhdHVzID0gKHN0YXR1cywgaSkgPT4ge1xuICAgIGNvbnN0IHRhc2tTdGF0dXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl1gKTtcbiAgICBjb25zdCB0YXNrQ2hlY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNoZWNrYm94LWNpcmNsZVwiKTtcbiAgICBjb25zdCB0YXNrTGVmdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrLWxlZnRfX3RpdGxlXCIpO1xuICAgIGNvbnN0IHRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhc2stbGlzdF9fdGFza1wiKTtcbiAgICBpZiAoc3RhdHVzID09PSB0cnVlKSB7XG4gICAgICB0YXNrU3RhdHVzW2ldLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5sb2codGFza1N0YXR1c1tpXS5jaGVja2VkKTtcbiAgICAgIHRhc2tMZWZ0VGl0bGVbaV0uc3R5bGUudGV4dERlY29yYXRpb24gPSBcImxpbmUtdGhyb3VnaFwiO1xuICAgICAgdGFza0xlZnRUaXRsZVtpXS5zdHlsZS5vcGFjaXR5ID0gMC42O1xuICAgICAgdGFza1tpXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNlZWVcIjtcbiAgICAgIHRhc2tbaV0uc3R5bGUub3BhY2l0eSA9IDAuODtcbiAgICAgIHRhc2tDaGVja1tpXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLW1haW4tY29sb3IpXCI7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlUYXNrcyA9ICgpID0+IHtcbiAgICBtYWluQ29udGVudENvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICBjb25zdCBzZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0ZWRcIik7XG4gICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdFwiKTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHByb2plY3RzLnByb2plY3RMaXN0Lmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCB7IG5hbWUgfSA9IHByb2plY3RzLnByb2plY3RMaXN0W2pdO1xuICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBwcm9qZWN0W2pdLmNoaWxkcmVuWzBdLnRleHRDb250ZW50O1xuICAgICAgaWYgKHByb2plY3ROYW1lID09PSBuYW1lICYmIHByb2plY3Rbal0uY2xhc3NMaXN0LmNvbnRhaW5zKFwic2VsZWN0ZWRcIikpIHtcbiAgICAgICAgbWFpbkNvbnRlbnRDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICBtYWluQ29udGVudENvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVNYWluQ29udGVudChqLCBuYW1lKSk7XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkLmNsYXNzTGlzdC5jb250YWlucyhcInRhc2tzX19hbGxcIikpIHtcbiAgICAgICAgbWFpbkNvbnRlbnRDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICBtYWluQ29udGVudENvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVNYWluQ29udGVudChqLCBcIkFsbFwiKSk7XG4gICAgICAgIGNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZHRhc2tcIik7XG4gICAgICAgIGFkZFRhc2tCdG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0YXNrc19fY29tcGxldGVkXCIpKSB7XG4gICAgICAgIG1haW5Db250ZW50Q29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgbWFpbkNvbnRlbnRDb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlTWFpbkNvbnRlbnQoaiwgXCJDb21wbGV0ZWRcIikpO1xuICAgICAgICBjb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGR0YXNrXCIpO1xuICAgICAgICBhZGRUYXNrQnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB0YXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1saXN0XCIpO1xuICAgIGNvbnN0IG1haW5Db250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLWNvbnRlbnRcIik7XG4gICAgY29uc3QgcHJvamVjdEluZGV4ID0gbWFpbkNvbnRlbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0LWluZGV4XCIpO1xuXG4gICAgY29uc3QgZmlsdGVyZWRMaXN0ID0gdGFza3MudGFza0xpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICBpZiAoc2VsZWN0ZWQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicHJvamVjdFwiKSkge1xuICAgICAgICByZXR1cm4gaXRlbS5wcm9qZWN0SW5kZXggPT09IHByb2plY3RJbmRleDtcbiAgICAgIH1cbiAgICAgIGlmIChzZWxlY3RlZC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0YXNrc19fY29tcGxldGVkXCIpKSB7XG4gICAgICAgIHJldHVybiBpdGVtLnN0YXR1cyA9PT0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChzZWxlY3RlZC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0YXNrc19fYWxsXCIpKSB7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2coZmlsdGVyZWRMaXN0KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbHRlcmVkTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgeyB0aXRsZSwgZHVlRGF0ZSwgc3RhdHVzIH0gPSBmaWx0ZXJlZExpc3RbaV07XG4gICAgICB0YXNrTGlzdC5hcHBlbmRDaGlsZChjcmVhdGVUYXNrKGksIHRpdGxlLCBkdWVEYXRlLCBwcm9qZWN0SW5kZXgpKTtcblxuICAgICAgY2hlY2tTdGF0dXMoc3RhdHVzLCBpKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlVGFzayA9ICh0aXRsZSkgPT4ge1xuICAgIGNvbnN0IHggPSB0YXNrcy50YXNrTGlzdC5maW5kKChlbCkgPT4ge1xuICAgICAgcmV0dXJuIGVsLnRpdGxlID09PSB0aXRsZS50b0xvd2VyQ2FzZSgpO1xuICAgIH0pO1xuICAgIGNvbnN0IGluZGV4T2ZUYXNrID0gdGFza3MudGFza0xpc3QuaW5kZXhPZih4KTtcbiAgICBjb25zb2xlLmxvZyh0YXNrcy50YXNrTGlzdC5zcGxpY2UoaW5kZXhPZlRhc2ssIDEpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRhc2tzXCIsIEpTT04uc3RyaW5naWZ5KHRhc2tzLnRhc2tMaXN0KSk7XG4gICAgZGlzcGxheVRhc2tzKCk7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlUHJvamVjdCA9IChpbmRleCkgPT4ge1xuICAgIHByb2plY3RzLnByb2plY3RMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cy5wcm9qZWN0TGlzdCkpO1xuICAgIGRpc3BsYXlQcm9qZWN0cygpO1xuICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3RcIik7XG4gICAgcHJvamVjdFswXS5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgY29uc29sZS5sb2coXCJoZXlcIik7XG4gICAgZGlzcGxheVRhc2tzKCk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICB0b2dnbGVNZW51LFxuICAgIGhpZGVSZXNpemUsXG4gICAgc2hvd1Jlc2l6ZSxcbiAgICBzaG93TW9kYWwsXG4gICAgaGlkZU1vZGFsLFxuICAgIGRpc3BsYXlUYXNrcyxcbiAgICByZW1vdmVUYXNrLFxuICAgIGRpc3BsYXlQcm9qZWN0cyxcbiAgICByZW1vdmVTZWxlY3RlZCxcbiAgICByZW1vdmVQcm9qZWN0LFxuICAgIGNvbnRhaW5lcixcbiAgICB0YXNrVGl0bGUsXG4gICAgdGFza0Rlc2NyaXB0aW9uLFxuICAgIHRhc2tEdWVEYXRlLFxuICAgIHRhc2tQcmlvcml0eSxcbiAgICB0YXNrUHJvamVjdHMsXG4gICAgcHJvamVjdFRpdGxlLFxuICAgIGFkZFRhc2tNb2RhbCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRvbTtcbiIsImltcG9ydCBkb20gZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQgdGFza3MgZnJvbSBcIi4vdGFza3NcIjtcbmltcG9ydCBwcm9qZWN0cyBmcm9tIFwiLi9wcm9qZWN0c1wiO1xuaW1wb3J0IHN0b3JhZ2UgZnJvbSBcIi4vbG9jYWxTdG9yYWdlXCI7XG5cbmNvbnN0IGV2ZW50SGFuZGxlcnMgPSAoKCkgPT4ge1xuICBjb25zdCB3aW5kb3dSZXNpemUgPSAoKSA9PiB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IDkwMCkge1xuICAgICAgICBkb20uaGlkZVJlc2l6ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9tLnNob3dSZXNpemUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBjbGlja0xpc3RlbmVyID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1lbnUtYnVyZ2VyXCIpKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZG9tLnRvZ2dsZU1lbnUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNob3ctbW9kYWxcIikpIHtcbiAgICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGU7XG4gICAgICAgIGRvbS5zaG93TW9kYWwodGFyZ2V0KTtcblxuICAgICAgICBkb20uY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgZG9tLmhpZGVNb2RhbCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNsb3NlLW1vZGFsXCIpKSB7XG4gICAgICAgIGRvbS5oaWRlTW9kYWwoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImFkZC1wcm9qZWN0LWJ0blwiKSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgdmFsaWRDaGVjayA9IHByb2plY3RzLmNoZWNrVmFsaWRpdHkoKTtcbiAgICAgICAgZG9tLmRpc3BsYXlQcm9qZWN0cygpO1xuICAgICAgICBjb25zdCBwcm9qZWN0QWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3RlZFwiKTtcbiAgICAgICAgcHJvamVjdEFsbC5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKSk7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdFwiKTtcbiAgICAgICAgcHJvamVjdC5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKSk7XG5cbiAgICAgICAgcHJvamVjdFtwcm9qZWN0Lmxlbmd0aCAtIDFdLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcblxuICAgICAgICBjb25zdCB0YXNrUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFza3NfX3Byb2plY3RzXCIpO1xuICAgICAgICB0YXNrUHJvamVjdC5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5jbGFzc0xpc3QuYWRkKFwicm90YXRlLWFycm93XCIpO1xuICAgICAgICB0YXNrUHJvamVjdC5jaGlsZHJlblsyXS5jbGFzc0xpc3QuYWRkKFwiaGlkZS1wcm9qZWN0c1wiKTtcbiAgICAgICAgZG9tLmRpc3BsYXlUYXNrcygpO1xuICAgICAgICBpZiAodmFsaWRDaGVjayA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGRvbS5oaWRlTW9kYWwoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWRkLXRhc2stYnRuXCIpKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCB2YWxpZENoZWNrID0gdGFza3MuY2hlY2tWYWxpZGl0eSgpO1xuICAgICAgICBkb20uZGlzcGxheVRhc2tzKCk7XG4gICAgICAgIGlmICh2YWxpZENoZWNrID09PSB0cnVlKSB7XG4gICAgICAgICAgZG9tLmhpZGVNb2RhbCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0YXNrLWRlbGV0ZVwiKSkge1xuICAgICAgICBjb25zdCB0aXRsZSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy5jaGlsZHJlblsyXTtcblxuICAgICAgICBkb20ucmVtb3ZlVGFzayh0aXRsZS50ZXh0Q29udGVudCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC50eXBlID09PSBcImNoZWNrYm94XCIpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPVxuICAgICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICBcImRhdGEtcHJvamVjdC1pbmRleFwiXG4gICAgICAgICAgKTtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzJdLnRleHRDb250ZW50O1xuICAgICAgICBjb25zdCB4ID0gdGFza3MudGFza0xpc3QuZmluZCgoZWwpID0+IHtcbiAgICAgICAgICByZXR1cm4gZWwudGl0bGUgPT09IHRpdGxlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBpbmRleE9mVGFzayA9IHRhc2tzLnRhc2tMaXN0LmluZGV4T2YoeCk7XG4gICAgICAgIGNvbnN0IGdldEFycmF5SXRlbSA9IHRhc2tzLnRhc2tMaXN0W2luZGV4T2ZUYXNrXTtcblxuICAgICAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgIGdldEFycmF5SXRlbS5zdGF0dXMgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdldEFycmF5SXRlbS5zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBkb20uZGlzcGxheVRhc2tzKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwcm9qZWN0XCIpKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RBbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdGVkXCIpO1xuICAgICAgICBwcm9qZWN0QWxsLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpKTtcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xuICAgICAgICBkb20uZGlzcGxheVRhc2tzKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0YXNrc19fY29tcGxldGVkXCIpKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RBbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdGVkXCIpO1xuICAgICAgICBwcm9qZWN0QWxsLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpKTtcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xuICAgICAgICBkb20uZGlzcGxheVRhc2tzKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0YXNrc19fYWxsXCIpKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RBbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdGVkXCIpO1xuICAgICAgICBwcm9qZWN0QWxsLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpKTtcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xuICAgICAgICBkb20uZGlzcGxheVRhc2tzKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwcm9qZWN0cy1oZWFkZXJcIikpIHtcbiAgICAgICAgY29uc3QgdGFza1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2tzX19wcm9qZWN0c1wiKTtcbiAgICAgICAgdGFza1Byb2plY3QuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uY2xhc3NMaXN0LnRvZ2dsZShcInJvdGF0ZS1hcnJvd1wiKTtcbiAgICAgICAgdGFza1Byb2plY3QuY2hpbGRyZW5bMl0uY2xhc3NMaXN0LnRvZ2dsZShcImhpZGUtcHJvamVjdHNcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwcm9qZWN0LWRlbGV0ZVwiKSkge1xuICAgICAgICBjb25zdCBpbmRleCA9XG4gICAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgXCJkYXRhLXByb2plY3QtaW5kZXhcIlxuICAgICAgICAgICk7XG4gICAgICAgIGRvbS5yZW1vdmVQcm9qZWN0KGluZGV4KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInByb2plY3QtZWRpdFwiKSkge1xuICAgICAgICBjb25zdCBpbmRleCA9XG4gICAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgXCJkYXRhLXByb2plY3QtaW5kZXhcIlxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHsgY2xpY2tMaXN0ZW5lciwgd2luZG93UmVzaXplIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBldmVudEhhbmRsZXJzO1xuIiwiaW1wb3J0IHByb2plY3RzIGZyb20gXCIuL3Byb2plY3RzXCI7XG5pbXBvcnQgdGFza3MgZnJvbSBcIi4vdGFza3NcIjtcbmltcG9ydCBkb20gZnJvbSBcIi4vZG9tXCI7XG5cbmNvbnN0IHN0b3JhZ2UgPSAoKCkgPT4ge1xuICBjb25zdCBzZXRQcm9qZWN0U3RvcmFnZSA9IChhcnIpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KGFycikpO1xuICB9O1xuXG4gIGNvbnN0IHNldFRhc2tTdG9yYWdlID0gKGFycikgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidGFza3NcIiwgSlNPTi5zdHJpbmdpZnkoYXJyKSk7XG4gIH07XG5cbiAgY29uc3QgZ2V0TG9jYWxTdG9yYWdlID0gKGl0ZW0sIHN0b3JhZ2VOYW1lKSA9PiB7XG4gICAgY29uc3QgcGFyc2VkSXRlbSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oc3RvcmFnZU5hbWUpKTtcbiAgICBpZiAoaXRlbSA9PT0gXCJwcm9qZWN0c1wiKSB7XG4gICAgICBwcm9qZWN0cy5wcm9qZWN0TGlzdCA9IHBhcnNlZEl0ZW07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhc2tzLnRhc2tMaXN0ID0gcGFyc2VkSXRlbTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2hlY2tFbXB0eVN0b3JhZ2UgPSAoKSA9PiB7XG4gICAgdGFza3MudGFza0xpc3QgPSBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiBcImd5bVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJnbyB0byB0aGUgZ3ltXCIsXG4gICAgICAgIGR1ZURhdGU6IDIwMjIgLSA0IC0gMTcsXG4gICAgICAgIHByaW9yaXR5OiBcIk5vdCBJbXBvcnRhbnRcIixcbiAgICAgICAgcHJvamVjdEluZGV4OiAwLFxuICAgICAgICBzdGF0dXM6IGZhbHNlLFxuICAgICAgfSxcbiAgICBdO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgc2V0UHJvamVjdFN0b3JhZ2UsXG4gICAgc2V0VGFza1N0b3JhZ2UsXG4gICAgZ2V0TG9jYWxTdG9yYWdlLFxuICAgIGNoZWNrRW1wdHlTdG9yYWdlLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgc3RvcmFnZTtcbiIsImltcG9ydCBkb20gZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQgc3RvcmFnZSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2VcIjtcbmltcG9ydCB0YXNrcyBmcm9tIFwiLi90YXNrc1wiO1xuXG5jb25zdCBwcm9qZWN0cyA9ICgoKSA9PiB7XG4gIGxldCBwcm9qZWN0TGlzdCA9IFtdO1xuXG4gIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpID09PSBudWxsKSB7XG4gICAgcHJvamVjdExpc3QgPSBbeyBuYW1lOiBcImd5bVwiIH1dO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkocHJvamVjdExpc3QpKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBwYXJzZWRJdGVtID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpKTtcbiAgICBwcm9qZWN0TGlzdCA9IHBhcnNlZEl0ZW07XG4gIH1cblxuICBjb25zb2xlLmxvZyhwcm9qZWN0TGlzdCk7XG4gIGNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgYWRkUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHByb2plY3RUaXRsZSB9ID0gZG9tO1xuICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChwcm9qZWN0VGl0bGUudmFsdWUpO1xuICAgIHByb2plY3RMaXN0LnB1c2gocHJvamVjdCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0TGlzdCkpO1xuICB9O1xuXG4gIGNvbnN0IGNoZWNrVmFsaWRpdHkgPSAoKSA9PiB7XG4gICAgbGV0IGlzVmFsaWQgPSBmYWxzZTtcbiAgICBjb25zdCB7IHByb2plY3RUaXRsZSB9ID0gZG9tO1xuICAgIGlmICghcHJvamVjdFRpdGxlLnZhbHVlLmxlbmd0aCkge1xuICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBhZGRQcm9qZWN0KCk7XG4gICAgICBpc1ZhbGlkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzVmFsaWQ7XG4gIH07XG5cbiAgcmV0dXJuIHsgYWRkUHJvamVjdCwgY2hlY2tWYWxpZGl0eSwgcHJvamVjdExpc3QgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHByb2plY3RzO1xuIiwiaW1wb3J0IGRvbSBmcm9tIFwiLi9kb21cIjtcbmltcG9ydCBwcm9qZWN0cyBmcm9tIFwiLi9wcm9qZWN0c1wiO1xuaW1wb3J0IHN0b3JhZ2UgZnJvbSBcIi4vbG9jYWxTdG9yYWdlXCI7XG5cbmNvbnN0IHRhc2tzID0gKCgpID0+IHtcbiAgbGV0IHRhc2tMaXN0ID0gW107XG5cbiAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikgPT09IG51bGwpIHtcbiAgICB0YXNrTGlzdCA9IFtcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6IFwidGVzdFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJ0ZXN0XCIsXG4gICAgICAgIGR1ZURhdGU6IGAyMDIyLTQtMTdgLFxuICAgICAgICBwcmlvcml0eTogXCJOb3QgSW1wb3J0YW50XCIsXG4gICAgICAgIHByb2plY3RJbmRleDogMCxcbiAgICAgICAgc3RhdHVzOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgXTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRhc2tzXCIsIEpTT04uc3RyaW5naWZ5KHRhc2tMaXN0KSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgcGFyc2VkSXRlbSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0YXNrc1wiKSk7XG4gICAgdGFza0xpc3QgPSBwYXJzZWRJdGVtO1xuICB9XG4gIGNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3RJbmRleCwgc3RhdHVzKSB7XG4gICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgdGhpcy5wcm9qZWN0SW5kZXggPSBwcm9qZWN0SW5kZXg7XG4gICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICB9XG4gIH1cblxuICBjb25zdCBhZGRUYXNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHRhc2tUaXRsZSxcbiAgICAgIHRhc2tEZXNjcmlwdGlvbixcbiAgICAgIHRhc2tEdWVEYXRlLFxuICAgICAgdGFza1ByaW9yaXR5LFxuICAgICAgdGFza1Byb2plY3RzLFxuICAgIH0gPSBkb207XG4gICAgY29uc3Qgc3RhdHVzID0gZmFsc2U7XG4gICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKFxuICAgICAgdGFza1RpdGxlLnZhbHVlLFxuICAgICAgdGFza0Rlc2NyaXB0aW9uLnZhbHVlLFxuICAgICAgdGFza0R1ZURhdGUudmFsdWUsXG4gICAgICB0YXNrUHJpb3JpdHkudmFsdWUsXG4gICAgICB0YXNrUHJvamVjdHMudmFsdWUsXG4gICAgICBzdGF0dXNcbiAgICApO1xuICAgIHRhc2tMaXN0LnB1c2godGFzayk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0YXNrc1wiLCBKU09OLnN0cmluZ2lmeSh0YXNrTGlzdCkpO1xuICB9O1xuICBjb25zdCBjaGVja1ZhbGlkaXR5ID0gKCkgPT4ge1xuICAgIGxldCBpc1ZhbGlkID0gZmFsc2U7XG4gICAgY29uc3QgeyB0YXNrVGl0bGUsIHRhc2tEdWVEYXRlIH0gPSBkb207XG4gICAgaWYgKCF0YXNrVGl0bGUudmFsdWUubGVuZ3RoIHx8ICF0YXNrRHVlRGF0ZS52YWx1ZS5sZW5ndGgpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwidGVzdFwiKTtcbiAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWRkVGFzaygpO1xuICAgICAgaXNWYWxpZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBpc1ZhbGlkO1xuICB9O1xuXG4gIHJldHVybiB7IGNoZWNrVmFsaWRpdHksIHRhc2tMaXN0IH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCB0YXNrcztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGV2ZW50SGFuZGxlcnMgZnJvbSBcIi4vZXZlbnRIYW5kbGVyc1wiO1xuaW1wb3J0IGRvbSBmcm9tIFwiLi9kb21cIjtcbmltcG9ydCBzdG9yYWdlIGZyb20gXCIuL2xvY2FsU3RvcmFnZVwiO1xuXG5kb20uZGlzcGxheVByb2plY3RzKCk7XG5kb20uZGlzcGxheVRhc2tzKCk7XG5cbmV2ZW50SGFuZGxlcnMuY2xpY2tMaXN0ZW5lcigpO1xuZXZlbnRIYW5kbGVycy53aW5kb3dSZXNpemUoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
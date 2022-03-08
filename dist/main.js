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

    for (let i = 0; i < _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectList.length; i++) {
      const { name } = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectList[i];
      projectList.appendChild(createProject(i, name));
      taskProjects.appendChild(createTaskOption(i, name));
    }

    console.log(taskProjects.children);
    projectCount.textContent = `(${_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectList.length})`;
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

    for (let j = 0; j < _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectList.length; j++) {
      const { name } = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectList[j];
      mainContentContainer.appendChild(createMainContent(j, name));
    }

    const taskList = document.querySelector(".task-list");

    for (let i = 0; i < _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList.length; i++) {
      const { title, dueDate, status } = _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList[i];
      taskList.appendChild(createTask(i, title, dueDate));

      checkStatus(status, i);
    }
  };

  const removeTask = (index) => {
    _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList.splice(index, 1);
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
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayTasks();
        if (validCheck === true) {
          _dom__WEBPACK_IMPORTED_MODULE_0__["default"].hideModal();
        }
        const project = document.querySelectorAll(".project");
        project.forEach((item) => item.classList.remove("selected"));

        project[project.length - 1].classList.add("selected");
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
        const { index } = e.target.parentElement.parentElement.dataset;
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].removeTask(index);
      }

      if (e.target.id === "checkbox") {
        const index =
          e.target.parentElement.parentElement.getAttribute("data-index");
        const getArrayItem = _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList[index];

        if (e.target.checked) {
          getArrayItem.status = true;
        } else {
          getArrayItem.status = false;
        }

        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayTasks();
        console.log(_tasks__WEBPACK_IMPORTED_MODULE_1__["default"].taskList);
      }
    });
  };

  return { clickListener, windowResize };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (eventHandlers);


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


const projects = (() => {
  const projectList = [];

  class Project {
    constructor(name) {
      this.name = name;
    }
  }

  const addProject = () => {
    const { projectTitle } = _dom__WEBPACK_IMPORTED_MODULE_0__["default"];
    const project = new Project(projectTitle.value);

    projectList.push(project);
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



const tasks = (() => {
  const taskList = [];

  class Task {
    constructor(title, description, dueDate, priority, status) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.status = status;
    }
  }

  const addTask = () => {
    console.log(_projects__WEBPACK_IMPORTED_MODULE_1__["default"].projectList.name);
    const { taskTitle, taskDescription, taskDueDate, taskPriority } = _dom__WEBPACK_IMPORTED_MODULE_0__["default"];
    const taskStatus = false;
    const task = new Task(
      taskTitle.value,
      taskDescription.value,
      taskDueDate.value,
      taskPriority.value,
      taskStatus
    );
    taskList.push(task);
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
    console.log(taskList);
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



_eventHandlers__WEBPACK_IMPORTED_MODULE_0__["default"].clickListener();
_eventHandlers__WEBPACK_IMPORTED_MODULE_0__["default"].windowResize();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ040QztBQUNwQjs7QUFFeEIsb0VBQTJCO0FBQzNCLG1FQUEwQiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvZXZlbnRIYW5kbGVycy5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2plY3RzIGZyb20gXCIuL3Byb2plY3RzXCI7XG5pbXBvcnQgdGFza3MgZnJvbSBcIi4vdGFza3NcIjtcblxuY29uc3QgZG9tID0gKCgpID0+IHtcbiAgY29uc3QgbWVudUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lbnUtYnVyZ2VyXCIpO1xuICBjb25zdCBzaWRlQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyXCIpO1xuICBjb25zdCBhZGRUYXNrTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrLW1vZGFsXCIpO1xuICBjb25zdCBhZGRQcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0LW1vZGFsXCIpO1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lclwiKTtcbiAgY29uc3QgbWFpbkNvbnRlbnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiLm1haW4tY29udGVudC1jb250YWluZXJcIlxuICApO1xuICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdHNcIik7XG4gIGNvbnN0IHByb2plY3RDb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdHMtY291bnRcIik7XG5cbiAgY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXRpdGxlXCIpO1xuICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZGVzY3JpcHRpb25cIik7XG4gIGNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWRhdGVcIik7XG4gIGNvbnN0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1wcmlvcml0eVwiKTtcbiAgY29uc3QgdGFza1Byb2plY3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXByb2plY3RzXCIpO1xuXG4gIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC10aXRsZVwiKTtcblxuICBjb25zdCB0YXNrQWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrXCIpO1xuXG4gIGNvbnN0IGhpZGVSZXNpemUgPSAoKSA9PiB7XG4gICAgbWVudUljb24uY2xhc3NMaXN0LnJlbW92ZShcInRvZ2dsZS1tZW51XCIpO1xuICAgIHNpZGVCYXIuY2xhc3NMaXN0LmFkZChcImhpZGUtc2lkZWJhclwiKTtcbiAgfTtcblxuICBjb25zdCBzaG93UmVzaXplID0gKCkgPT4ge1xuICAgIG1lbnVJY29uLmNsYXNzTGlzdC5hZGQoXCJ0b2dnbGUtbWVudVwiKTtcbiAgICBzaWRlQmFyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlLXNpZGViYXJcIik7XG4gIH07XG5cbiAgY29uc3QgaGlkZVNpZGVCYXIgPSAoKSA9PiB7XG4gICAgaWYgKHNpZGVCYXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZS1zaWRlYmFyXCIpKSB7XG4gICAgICBzaWRlQmFyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlLXNpZGViYXJcIik7XG4gICAgICBzaWRlQmFyLmNsYXNzTGlzdC5hZGQoXCJzaG93LXNpZGViYXJcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNpZGVCYXIuY2xhc3NMaXN0LnJlbW92ZShcInNob3ctc2lkZWJhclwiKTtcbiAgICAgIHNpZGVCYXIuY2xhc3NMaXN0LmFkZChcImhpZGUtc2lkZWJhclwiKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdG9nZ2xlTWVudSA9ICgpID0+IHtcbiAgICBpZiAobWVudUljb24uY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9nZ2xlLW1lbnVcIikpIHtcbiAgICAgIG1lbnVJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b2dnbGUtbWVudVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVudUljb24uY2xhc3NMaXN0LmFkZChcInRvZ2dsZS1tZW51XCIpO1xuICAgIH1cbiAgICBoaWRlU2lkZUJhcigpO1xuICB9O1xuXG4gIGNvbnN0IGNsZWFySW5wdXRWYWx1ZXMgPSAoKSA9PiB7XG4gICAgdGFza1RpdGxlLnZhbHVlID0gXCJcIjtcbiAgICB0YXNrRGVzY3JpcHRpb24udmFsdWUgPSBcIlwiO1xuICAgIHRhc2tEdWVEYXRlLnZhbHVlID0gXCJcIjtcbiAgICB0YXNrUHJpb3JpdHkudmFsdWUgPSBcIk5vdCBJbXBvcnRhbnRcIjtcblxuICAgIHByb2plY3RUaXRsZS52YWx1ZSA9IFwiXCI7XG4gIH07XG5cbiAgY29uc3Qgc2hvd01vZGFsID0gKGUpID0+IHtcbiAgICBpZiAoZS5jbGFzc0xpc3QuY29udGFpbnMoXCJhZGR0YXNrXCIpKSB7XG4gICAgICBhZGRUYXNrTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9IGVsc2UgaWYgKGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWRkcHJvamVjdFwiKSkge1xuICAgICAgYWRkUHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICB9XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwib3ZlcmZsb3dcIik7XG5cbiAgICBjbGVhcklucHV0VmFsdWVzKCk7XG4gIH07XG5cbiAgY29uc3QgaGlkZU1vZGFsID0gKCkgPT4ge1xuICAgIGFkZFRhc2tNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgYWRkUHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJvdmVyZmxvd1wiKTtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVNYWluQ29udGVudCA9IChpbmRleCwgdGl0bGUpID0+IHtcbiAgICBjb25zdCBtYWluQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbWFpbkNvbnRlbnQuY2xhc3NMaXN0LmFkZChcIm1haW4tY29udGVudFwiKTtcbiAgICBtYWluQ29udGVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3QtaW5kZXhcIiwgaW5kZXgpO1xuXG4gICAgY29uc3QgbVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgIG1UaXRsZS5jbGFzc0xpc3QuYWRkKFwidGFzay10aXRsZVwiKTtcbiAgICBtVGl0bGUudGV4dENvbnRlbnQgPSBgJHt0aXRsZX1gO1xuXG4gICAgY29uc3QgbUxpc3RIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIG1MaXN0SGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWxpc3QtaGVhZGVyXCIsIFwiZmxleFwiKTtcbiAgICBtTGlzdEhlYWRlci5pbm5lckhUTUwgPSBgVGFza3MgPGkgY2xhc3M9XCJmYS1yZWd1bGFyIGZhLXBsdXMgdG9vbHRpcCBhZGR0YXNrIHNob3ctbW9kYWxcIj48L2k+YDtcblxuICAgIGNvbnN0IG1UYXNrTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcbiAgICBtVGFza0xpc3QuY2xhc3NMaXN0LmFkZChcInRhc2stbGlzdFwiKTtcblxuICAgIG1haW5Db250ZW50LmFwcGVuZENoaWxkKG1UaXRsZSk7XG4gICAgbWFpbkNvbnRlbnQuYXBwZW5kQ2hpbGQobUxpc3RIZWFkZXIpO1xuICAgIG1haW5Db250ZW50LmFwcGVuZENoaWxkKG1UYXNrTGlzdCk7XG5cbiAgICByZXR1cm4gbWFpbkNvbnRlbnQ7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlU2VsZWN0ZWQgPSAoKSA9PiB7XG4gICAgdGFza0FsbC5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKSk7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlUHJvamVjdCA9IChpbmRleCwgdGl0bGUpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIsIFwidGFza1wiKTtcbiAgICBwcm9qZWN0LnNldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdC1pbmRleFwiLCBpbmRleCk7XG4gICAgcmVtb3ZlU2VsZWN0ZWQoKTtcbiAgICBwcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcblxuICAgIGNvbnN0IHBUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHBUaXRsZS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdF9fdGl0bGVcIik7XG4gICAgcFRpdGxlLnRleHRDb250ZW50ID0gYCR7dGl0bGV9YDtcblxuICAgIGNvbnN0IHBVdGlsaXRpZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHBVdGlsaXRpZXMuY2xhc3NMaXN0LmFkZChcInByb2plY3RfX3V0aWxpdGllc1wiKTtcbiAgICBwVXRpbGl0aWVzLmlubmVySFRNTCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwicHJvamVjdF9fdXRpbGl0aWVzXCI+XG4gICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1wZW4tdG8tc3F1YXJlIHByb2plY3QtZWRpdCBwcm9qZWN0LWJ0blwiPjwvaT5cbiAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXRyYXNoIHByb2plY3QtZGVsZXRlIHByb2plY3QtYnRuXCI+PC9pPlxuICA8L2Rpdj5gO1xuXG4gICAgcHJvamVjdC5hcHBlbmRDaGlsZChwVGl0bGUpO1xuICAgIHByb2plY3QuYXBwZW5kQ2hpbGQocFV0aWxpdGllcyk7XG5cbiAgICByZXR1cm4gcHJvamVjdDtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVUYXNrT3B0aW9uID0gKHZhbHVlLCB0ZXh0KSA9PiB7XG4gICAgY29uc3QgdGFza1Byb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIHRhc2tQcm9qZWN0LnZhbHVlID0gdmFsdWU7XG4gICAgdGFza1Byb2plY3QudGV4dENvbnRlbnQgPSBgJHt0ZXh0fWA7XG5cbiAgICByZXR1cm4gdGFza1Byb2plY3Q7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVByb2plY3RzID0gKCkgPT4ge1xuICAgIHByb2plY3RMaXN0LnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBtYWluQ29udGVudENvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgdGFza1Byb2plY3RzLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHMucHJvamVjdExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHsgbmFtZSB9ID0gcHJvamVjdHMucHJvamVjdExpc3RbaV07XG4gICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChjcmVhdGVQcm9qZWN0KGksIG5hbWUpKTtcbiAgICAgIHRhc2tQcm9qZWN0cy5hcHBlbmRDaGlsZChjcmVhdGVUYXNrT3B0aW9uKGksIG5hbWUpKTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyh0YXNrUHJvamVjdHMuY2hpbGRyZW4pO1xuICAgIHByb2plY3RDb3VudC50ZXh0Q29udGVudCA9IGAoJHtwcm9qZWN0cy5wcm9qZWN0TGlzdC5sZW5ndGh9KWA7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlVGFzayA9IChpbmRleCwgdGl0bGUsIGR1ZURhdGUpID0+IHtcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgIHRhc2suY2xhc3NMaXN0LmFkZChcInRhc2stbGlzdF9fdGFza1wiKTtcbiAgICB0YXNrLnNldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIiwgaW5kZXgpO1xuXG4gICAgY29uc3QgdGFza0xlZnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRhc2tMZWZ0LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWxlZnRcIiwgXCJmbGV4XCIpO1xuXG4gICAgdGFza0xlZnQuaW5uZXJIVE1MID0gYFxuICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwiY2hlY2tib3hcIiBpZD1cImNoZWNrYm94XCIgLz5cbiAgICA8cCBjbGFzcz1cInRhc2stbGVmdF9fdGl0bGVcIj4ke3RpdGxlfTwvcD5gO1xuXG4gICAgY29uc3QgdGFza1JpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YXNrUmlnaHQuY2xhc3NMaXN0LmFkZChcInRhc2stcmlnaHRcIiwgXCJmbGV4XCIpO1xuXG4gICAgdGFza1JpZ2h0LmlubmVySFRNTCA9IGBcbiAgICA8cCBjbGFzcz1cInRhc2stcmlnaHRfX2RhdGVcIj4ke2R1ZURhdGV9PC9wPlxuICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtcGVuLXRvLXNxdWFyZSB0YXNrLWVkaXQgdGFzay1idG5cIj48L2k+XG4gICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jaXJjbGUtaW5mbyB0YXNrLWluZm8gdGFzay1idG5cIj48L2k+XG4gICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS10cmFzaCB0YXNrLWRlbGV0ZSB0YXNrLWJ0blwiPjwvaT5gO1xuXG4gICAgdGFzay5hcHBlbmRDaGlsZCh0YXNrTGVmdCk7XG4gICAgdGFzay5hcHBlbmRDaGlsZCh0YXNrUmlnaHQpO1xuICAgIHJldHVybiB0YXNrO1xuICB9O1xuXG4gIGNvbnN0IGNoZWNrU3RhdHVzID0gKHN0YXR1cywgaSkgPT4ge1xuICAgIGNvbnN0IHRhc2tTdGF0dXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2NoZWNrYm94XCIpO1xuICAgIGNvbnN0IHRhc2tMZWZ0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhc2stbGVmdF9fdGl0bGVcIik7XG4gICAgY29uc3QgdGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFzay1saXN0X190YXNrXCIpO1xuXG4gICAgaWYgKHN0YXR1cyA9PT0gdHJ1ZSkge1xuICAgICAgdGFza1N0YXR1c1tpXS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIHRhc2tMZWZ0VGl0bGVbaV0uc3R5bGUudGV4dERlY29yYXRpb24gPSBcImxpbmUtdGhyb3VnaFwiO1xuICAgICAgdGFza0xlZnRUaXRsZVtpXS5zdHlsZS5vcGFjaXR5ID0gMC42O1xuICAgICAgdGFza1tpXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNlZWVcIjtcbiAgICAgIHRhc2tbaV0uc3R5bGUub3BhY2l0eSA9IDAuODtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVRhc2tzID0gKCkgPT4ge1xuICAgIG1haW5Db250ZW50Q29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgcHJvamVjdHMucHJvamVjdExpc3QubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IHsgbmFtZSB9ID0gcHJvamVjdHMucHJvamVjdExpc3Rbal07XG4gICAgICBtYWluQ29udGVudENvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVNYWluQ29udGVudChqLCBuYW1lKSk7XG4gICAgfVxuXG4gICAgY29uc3QgdGFza0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbGlzdFwiKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFza3MudGFza0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHsgdGl0bGUsIGR1ZURhdGUsIHN0YXR1cyB9ID0gdGFza3MudGFza0xpc3RbaV07XG4gICAgICB0YXNrTGlzdC5hcHBlbmRDaGlsZChjcmVhdGVUYXNrKGksIHRpdGxlLCBkdWVEYXRlKSk7XG5cbiAgICAgIGNoZWNrU3RhdHVzKHN0YXR1cywgaSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlbW92ZVRhc2sgPSAoaW5kZXgpID0+IHtcbiAgICB0YXNrcy50YXNrTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGRpc3BsYXlUYXNrcygpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgdG9nZ2xlTWVudSxcbiAgICBoaWRlUmVzaXplLFxuICAgIHNob3dSZXNpemUsXG4gICAgc2hvd01vZGFsLFxuICAgIGhpZGVNb2RhbCxcbiAgICBkaXNwbGF5VGFza3MsXG4gICAgcmVtb3ZlVGFzayxcbiAgICBkaXNwbGF5UHJvamVjdHMsXG4gICAgY29udGFpbmVyLFxuICAgIHRhc2tUaXRsZSxcbiAgICB0YXNrRGVzY3JpcHRpb24sXG4gICAgdGFza0R1ZURhdGUsXG4gICAgdGFza1ByaW9yaXR5LFxuICAgIHRhc2tQcm9qZWN0cyxcbiAgICBwcm9qZWN0VGl0bGUsXG4gICAgYWRkVGFza01vZGFsLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tO1xuIiwiaW1wb3J0IGRvbSBmcm9tIFwiLi9kb21cIjtcbmltcG9ydCB0YXNrcyBmcm9tIFwiLi90YXNrc1wiO1xuaW1wb3J0IHByb2plY3RzIGZyb20gXCIuL3Byb2plY3RzXCI7XG5cbmNvbnN0IGV2ZW50SGFuZGxlcnMgPSAoKCkgPT4ge1xuICBjb25zdCB3aW5kb3dSZXNpemUgPSAoKSA9PiB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IDkwMCkge1xuICAgICAgICBkb20uaGlkZVJlc2l6ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9tLnNob3dSZXNpemUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBjbGlja0xpc3RlbmVyID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1lbnUtYnVyZ2VyXCIpKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZG9tLnRvZ2dsZU1lbnUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNob3ctbW9kYWxcIikpIHtcbiAgICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGU7XG4gICAgICAgIGRvbS5zaG93TW9kYWwodGFyZ2V0KTtcblxuICAgICAgICBkb20uY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgZG9tLmhpZGVNb2RhbCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNsb3NlLW1vZGFsXCIpKSB7XG4gICAgICAgIGRvbS5oaWRlTW9kYWwoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImFkZC1wcm9qZWN0LWJ0blwiKSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgdmFsaWRDaGVjayA9IHByb2plY3RzLmNoZWNrVmFsaWRpdHkoKTtcbiAgICAgICAgZG9tLmRpc3BsYXlQcm9qZWN0cygpO1xuICAgICAgICBkb20uZGlzcGxheVRhc2tzKCk7XG4gICAgICAgIGlmICh2YWxpZENoZWNrID09PSB0cnVlKSB7XG4gICAgICAgICAgZG9tLmhpZGVNb2RhbCgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3RcIik7XG4gICAgICAgIHByb2plY3QuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIikpO1xuXG4gICAgICAgIHByb2plY3RbcHJvamVjdC5sZW5ndGggLSAxXS5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJhZGQtdGFzay1idG5cIikpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHZhbGlkQ2hlY2sgPSB0YXNrcy5jaGVja1ZhbGlkaXR5KCk7XG4gICAgICAgIGRvbS5kaXNwbGF5VGFza3MoKTtcbiAgICAgICAgaWYgKHZhbGlkQ2hlY2sgPT09IHRydWUpIHtcbiAgICAgICAgICBkb20uaGlkZU1vZGFsKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInRhc2stZGVsZXRlXCIpKSB7XG4gICAgICAgIGNvbnN0IHsgaW5kZXggfSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0O1xuICAgICAgICBkb20ucmVtb3ZlVGFzayhpbmRleCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldC5pZCA9PT0gXCJjaGVja2JveFwiKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID1cbiAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pbmRleFwiKTtcbiAgICAgICAgY29uc3QgZ2V0QXJyYXlJdGVtID0gdGFza3MudGFza0xpc3RbaW5kZXhdO1xuXG4gICAgICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgZ2V0QXJyYXlJdGVtLnN0YXR1cyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2V0QXJyYXlJdGVtLnN0YXR1cyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9tLmRpc3BsYXlUYXNrcygpO1xuICAgICAgICBjb25zb2xlLmxvZyh0YXNrcy50YXNrTGlzdCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHsgY2xpY2tMaXN0ZW5lciwgd2luZG93UmVzaXplIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBldmVudEhhbmRsZXJzO1xuIiwiaW1wb3J0IGRvbSBmcm9tIFwiLi9kb21cIjtcblxuY29uc3QgcHJvamVjdHMgPSAoKCkgPT4ge1xuICBjb25zdCBwcm9qZWN0TGlzdCA9IFtdO1xuXG4gIGNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgYWRkUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHByb2plY3RUaXRsZSB9ID0gZG9tO1xuICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChwcm9qZWN0VGl0bGUudmFsdWUpO1xuXG4gICAgcHJvamVjdExpc3QucHVzaChwcm9qZWN0KTtcbiAgfTtcblxuICBjb25zdCBjaGVja1ZhbGlkaXR5ID0gKCkgPT4ge1xuICAgIGxldCBpc1ZhbGlkID0gZmFsc2U7XG4gICAgY29uc3QgeyBwcm9qZWN0VGl0bGUgfSA9IGRvbTtcbiAgICBpZiAoIXByb2plY3RUaXRsZS52YWx1ZS5sZW5ndGgpIHtcbiAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWRkUHJvamVjdCgpO1xuICAgICAgaXNWYWxpZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBpc1ZhbGlkO1xuICB9O1xuXG4gIHJldHVybiB7IGFkZFByb2plY3QsIGNoZWNrVmFsaWRpdHksIHByb2plY3RMaXN0IH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0cztcbiIsImltcG9ydCBkb20gZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQgcHJvamVjdHMgZnJvbSBcIi4vcHJvamVjdHNcIjtcblxuY29uc3QgdGFza3MgPSAoKCkgPT4ge1xuICBjb25zdCB0YXNrTGlzdCA9IFtdO1xuXG4gIGNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHN0YXR1cykge1xuICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGFkZFRhc2sgPSAoKSA9PiB7XG4gICAgY29uc29sZS5sb2cocHJvamVjdHMucHJvamVjdExpc3QubmFtZSk7XG4gICAgY29uc3QgeyB0YXNrVGl0bGUsIHRhc2tEZXNjcmlwdGlvbiwgdGFza0R1ZURhdGUsIHRhc2tQcmlvcml0eSB9ID0gZG9tO1xuICAgIGNvbnN0IHRhc2tTdGF0dXMgPSBmYWxzZTtcbiAgICBjb25zdCB0YXNrID0gbmV3IFRhc2soXG4gICAgICB0YXNrVGl0bGUudmFsdWUsXG4gICAgICB0YXNrRGVzY3JpcHRpb24udmFsdWUsXG4gICAgICB0YXNrRHVlRGF0ZS52YWx1ZSxcbiAgICAgIHRhc2tQcmlvcml0eS52YWx1ZSxcbiAgICAgIHRhc2tTdGF0dXNcbiAgICApO1xuICAgIHRhc2tMaXN0LnB1c2godGFzayk7XG4gIH07XG4gIGNvbnN0IGNoZWNrVmFsaWRpdHkgPSAoKSA9PiB7XG4gICAgbGV0IGlzVmFsaWQgPSBmYWxzZTtcbiAgICBjb25zdCB7IHRhc2tUaXRsZSwgdGFza0R1ZURhdGUgfSA9IGRvbTtcbiAgICBpZiAoIXRhc2tUaXRsZS52YWx1ZS5sZW5ndGggfHwgIXRhc2tEdWVEYXRlLnZhbHVlLmxlbmd0aCkge1xuICAgICAgY29uc29sZS5sb2coXCJ0ZXN0XCIpO1xuICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBhZGRUYXNrKCk7XG4gICAgICBpc1ZhbGlkID0gdHJ1ZTtcbiAgICB9XG4gICAgY29uc29sZS5sb2codGFza0xpc3QpO1xuICAgIHJldHVybiBpc1ZhbGlkO1xuICB9O1xuXG4gIHJldHVybiB7IGNoZWNrVmFsaWRpdHksIHRhc2tMaXN0IH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCB0YXNrcztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGV2ZW50SGFuZGxlcnMgZnJvbSBcIi4vZXZlbnRIYW5kbGVyc1wiO1xuaW1wb3J0IGRvbSBmcm9tIFwiLi9kb21cIjtcblxuZXZlbnRIYW5kbGVycy5jbGlja0xpc3RlbmVyKCk7XG5ldmVudEhhbmRsZXJzLndpbmRvd1Jlc2l6ZSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
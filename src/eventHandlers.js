import dom from "./dom";
import projects from "./projects";
import tasks from "./tasks";

const eventHandlers = (() => {
  const resizeHandler = () => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 1100) {
        dom.hideResize();
      } else {
        dom.showResize();
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
    } = dom;
    const { addProject, removeProject, getProjectList, editProject } = projects;
    const { addTask, removeTask, getTaskInfo, changeTaskStatus } = tasks;

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
        const index = projects.getProjectList().length;

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
          tasks.editTask(
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

export default eventHandlers;

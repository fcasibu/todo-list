import dom from "./dom";
import tasks from "./tasks";
import projects from "./projects";
import storage from "./localStorage";

const eventHandlers = (() => {
  const windowResize = () => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 900) {
        dom.hideResize();
      } else {
        dom.showResize();
      }
    });
  };

  const clickListener = () => {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-burger")) {
        e.preventDefault();
        e.stopPropagation();
        dom.toggleMenu();
      }

      if (e.target.classList.contains("show-modal")) {
        const { target } = e;
        dom.showModal(target);

        dom.container.addEventListener("click", () => {
          dom.hideModal();
        });
      }

      if (e.target.classList.contains("close-modal")) {
        dom.hideModal();
      }

      if (e.target.classList.contains("add-project-btn")) {
        e.preventDefault();
        e.stopPropagation();

        const validCheck = projects.checkValidity();
        dom.displayProjects();
        const projectAll = document.querySelectorAll(".selected");
        projectAll.forEach((item) => item.classList.remove("selected"));

        const project = document.querySelectorAll(".project");
        project.forEach((item) => item.classList.remove("selected"));

        project[project.length - 1].classList.add("selected");

        const taskProject = document.querySelector(".tasks__projects");
        taskProject.children[0].children[1].classList.add("rotate-arrow");
        taskProject.children[2].classList.add("hide-projects");
        dom.displayTasks();
        if (validCheck === true) {
          dom.hideModal();
        }
      }

      if (e.target.classList.contains("add-task-btn")) {
        e.preventDefault();

        const validCheck = tasks.checkValidity();
        dom.displayTasks();
        if (validCheck === true) {
          dom.hideModal();
        }
      }

      if (e.target.classList.contains("task-delete")) {
        const title = e.target.parentElement.previousElementSibling.children[2];

        dom.removeTask(title.textContent);
      }

      if (e.target.type === "checkbox") {
        const index =
          e.target.parentElement.parentElement.getAttribute(
            "data-project-index"
          );
        const title = e.target.parentElement.children[2].textContent;
        const x = tasks.taskList.find((el) => {
          return el.title === title.toLowerCase();
        });
        const indexOfTask = tasks.taskList.indexOf(x);
        const getArrayItem = tasks.taskList[indexOfTask];

        if (e.target.checked) {
          getArrayItem.status = true;
        } else {
          getArrayItem.status = false;
        }
        dom.displayTasks();
      }

      if (e.target.classList.contains("project")) {
        const projectAll = document.querySelectorAll(".selected");
        projectAll.forEach((item) => item.classList.remove("selected"));
        e.target.classList.add("selected");
        dom.displayTasks();
      }

      if (e.target.classList.contains("tasks__completed")) {
        const projectAll = document.querySelectorAll(".selected");
        projectAll.forEach((item) => item.classList.remove("selected"));
        e.target.classList.add("selected");
        dom.displayTasks();
      }

      if (e.target.classList.contains("tasks__all")) {
        const projectAll = document.querySelectorAll(".selected");
        projectAll.forEach((item) => item.classList.remove("selected"));
        e.target.classList.add("selected");
        dom.displayTasks();
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
        dom.removeProject(index);
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

export default eventHandlers;

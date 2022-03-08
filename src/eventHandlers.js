import dom from "./dom";
import tasks from "./tasks";
import projects from "./projects";

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
        dom.displayTasks();
        if (validCheck === true) {
          dom.hideModal();
        }
        const project = document.querySelectorAll(".project");
        project.forEach((item) => item.classList.remove("selected"));

        project[project.length - 1].classList.add("selected");
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
        const { index } = e.target.parentElement.parentElement.dataset;
        dom.removeTask(index);
      }

      if (e.target.id === "checkbox") {
        const index =
          e.target.parentElement.parentElement.getAttribute("data-index");
        const getArrayItem = tasks.taskList[index];

        if (e.target.checked) {
          getArrayItem.status = true;
        } else {
          getArrayItem.status = false;
        }

        dom.displayTasks();
        console.log(tasks.taskList);
      }
    });
  };

  return { clickListener, windowResize };
})();

export default eventHandlers;

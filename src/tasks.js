import dom from "./dom";
import projects from "./projects";
import storage from "./localStorage";

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
    } = dom;
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
    const { taskTitle, taskDueDate } = dom;
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

export default tasks;

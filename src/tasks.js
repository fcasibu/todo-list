import dom from "./dom";
import projects from "./projects";

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
    console.log(projects.projectList.name);
    const { taskTitle, taskDescription, taskDueDate, taskPriority } = dom;
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
    const { taskTitle, taskDueDate } = dom;
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

export default tasks;

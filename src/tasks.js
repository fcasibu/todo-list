import dom from "./dom";
import projects from "./projects";

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

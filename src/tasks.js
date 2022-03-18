import { getLocalStorage, setLocalStorage } from "./localStorage";

const tasks = (() => {
  const taskList = JSON.parse(getLocalStorage("tasks")) || [
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
    setLocalStorage("tasks", taskList);
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
    setLocalStorage("tasks", taskList);
  };

  const getTaskInfo = (taskTitle, projectIndex) => {
    const index = findTask(taskTitle, projectIndex);
    return taskList[index];
  };

  const editTask = (arr, title, priority, dueDate) => {
    arr.taskTitle = title;
    arr.priority = priority;
    arr.dueDate = dueDate;
    setLocalStorage("tasks", taskList);
  };

  const changeTaskStatus = (arr, status) => {
    arr.status = status;
    setLocalStorage("tasks", taskList);
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

export default tasks;

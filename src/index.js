import eventHandlers from "./eventHandlers";
import dom from "./dom";
import storage from "./localStorage";

dom.displayProjects();
dom.displayTasks();

eventHandlers.clickListener();
eventHandlers.windowResize();

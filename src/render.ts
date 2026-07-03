import { type Task, type EventListener } from "./types.js";
import { saveTasks } from "./storage.js";

function renderTasks(tasks: Task[], eventListeners: EventListener[]): void {
  const app = document.querySelector("#app");
  if(!app){
    throw new Error("app element not found")
  }
  removeEventListeners(eventListeners);
  app.innerHTML = "";
  for(const task of tasks){
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.textContent = `${task.name} | ${task.status} | ${task.priority}`;

    const toggleStatusButton = document.createElement("button");
    toggleStatusButton.textContent = task.status === "pending" ? "Set task as completed" : "Set task as pending";
    const toggleTaskStatus = () => {
        task.status = task.status === "pending" ? "completed" : "pending";
        saveTasks(tasks);
        renderTasks(tasks, eventListeners);
    }
    toggleStatusButton.addEventListener("click", toggleTaskStatus);
    eventListeners.push({element: toggleStatusButton,event:"click", eventListener: toggleTaskStatus});	

    const deleteButton = document.createElement("button");
    const deleteTask = () => {
        const taskIndex = tasks.findIndex(t => t.name === task.name);
        tasks.splice(taskIndex,1);
        saveTasks(tasks);
        renderTasks(tasks, eventListeners);
    }
    deleteButton.textContent = "Delete task";
    deleteButton.addEventListener("click", deleteTask)
    eventListeners.push({element: deleteButton, event:"click", eventListener: deleteTask});

    div.append(p);
    div.classList.add("task");
    div.append(toggleStatusButton);
    div.append(deleteButton);
    app.append(div);
  }
}

function removeEventListeners(eventListeners: EventListener[]){ 
  eventListeners.forEach((obj) => {
        const element = obj.element;
        element.removeEventListener(obj.event, obj.eventListener);
  });
  eventListeners.splice(0,eventListeners.length);
}

export {
    renderTasks
}
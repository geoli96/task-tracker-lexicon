import type { Task } from "./types.js";

const saveTasks = (tasks: Task[]) => {
    localStorage.setItem("my-tasks", JSON.stringify(tasks));
}

function loadTasks(){
    return JSON.parse(localStorage.getItem("my-tasks") || "");
}

export {
    saveTasks,
    loadTasks
}

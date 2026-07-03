import type { Task } from "./types.js";

const saveTasks = (tasks: Task[]) => {
    localStorage.setItem("my-tasks", JSON.stringify(tasks));
}

function loadTasks(){
    const tasksItem = localStorage.getItem("my-tasks")
    return tasksItem ? JSON.parse(tasksItem) : []
}

export {
    saveTasks,
    loadTasks
}

import { type Task } from "./types.js";

const addTask = (tasks:Task[], taskToAdd:Pick<Task,"name" | "priority">) => {
    const task:Task = {...taskToAdd,status:"pending"}
    tasks.push(task);
    console.log("Added task\n" + "Name: "+ task.name+"\nCompleted: " + (task.status === "completed" ? "true " :"false")+"\nPriority: " + task.priority);
}

export {
    addTask
}
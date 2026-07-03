import { type Task, type EventListener } from "./types.js";
import { renderTasks } from "./render.js";
import { addTask } from "./tasks.js";
import { loadTasks,saveTasks } from "./storage.js";

const tasks: Task[] = loadTasks();
const eventListeners: EventListener[] = [];

renderTasks(tasks,eventListeners);

const handleFormSubmit = (event:SubmitEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const formObject = Object.fromEntries(formData.entries());
    const taskName = formObject.name as string;
    const taskPriority = formObject.priority as "high" | "medium" | "low";
    const task = {name: taskName, priority: taskPriority};
    addTask(tasks, task);
    saveTasks(tasks);
    renderTasks(tasks,eventListeners);
    clearForm(form);
    const priorityElement = document.getElementById("priority-input") as HTMLInputElement;
    priorityElement.value = "medium";
}

const clearForm = (form:HTMLFormElement) => {
    form.reset();
}

const trimInput = (event:Event) => {
  const target = event.target as HTMLInputElement;
  target.value = target.value.trim();
}

const validateTask = (event:FocusEvent) => {
    const errorElement = document.getElementById("error-message") as HTMLInputElement;
const target = event.target as HTMLInputElement;
  const value = target.value;
  if(value.length > 40){
    errorElement.innerText = "Task name longer than 40 characters"
  }else if(value.length < 2 && value.length){
    errorElement.innerText = "Task name less than 2 characters"
  }else{
    errorElement.innerText = ""
  }
}

const form = document.getElementById("task-submit-form") as HTMLFormElement;
form?.addEventListener("submit", handleFormSubmit);

const textInput = document.getElementById("task-input") as HTMLInputElement;
textInput.addEventListener("change", trimInput);

textInput.addEventListener("focusout", validateTask);

function showHeader() {
    console.log(`================================\n\nTask Tracker\n\n===============================`)
}

function showTasks(tasks:Task[]) {
    const str = tasks.reduce((p,task,i) => p+(i+1).toString()+ " " + task.name+"\nCompleted: " + (task.status === "completed" ? "true " :"false")+"\nPriority: " + task.priority+"\n","");
    console.log("Tasks\n" + str);
}

function showCompletedTasks(tasks:Task[]){
    const str = tasks.filter(t => t.status === "completed").reduce((p,task,i) => p+(i+1).toString()+ " " + task.name+"\nCompleted: " +(task.status === "completed" ? "true " :"false")+"\nPriority: " + task.priority+ "\n","");
    console.log("Completed tasks\n" + str);
}

function showPendingTasks(tasks:Task[]){
    const str = tasks.filter(t => t.status === "pending").reduce((p,task,i) => p+(i+1).toString()+ " " + task.name+"\nCompleted: " + (task.status === "completed" ? "true " :"false")+"\nPriority: " + task.priority+ "\n","");
    console.log("Pending tasks\n" + str);
}

function showTasksWithChosenPriority(priority: Task["priority"]){
    const str = tasks.filter(t => t.priority === priority).reduce((p,task,i) => p+(i+1).toString()+ " " + task.name+"\nCompleted: " + (task.status === "completed" ? "true " :"false")+"\nPriority: " + task.priority+ "\n","");
    console.log(`Tasks with priority "${priority}"\n` + str);
}

function completeTask(tasks:Task[], taskName:string){
    const task = tasks.find(t => t.name === taskName);
    if(!task){ 
        console.log("Task \""+taskName+"\" not found");
        return;
    }
    task.status = "completed"
    console.log("Task \""+taskName+"\" completed");
}

function showStatistics(tasks:Task[]){
    console.log("Statistics:\n" + "Number of tasks: " + tasks.length + "\nNumber of completed tasks:", tasks.filter(t => t.status === "completed").length + "\nNumber of incomplete tasks:", tasks.filter(t => t.status === "pending").length);
}

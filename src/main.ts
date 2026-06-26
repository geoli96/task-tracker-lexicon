type Task = {
  name: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
};

let tasks: Task[] = [];

function renderTasks(): void {
  const app = document.querySelector("#app");
  if(!app){
    throw new Error("app element not found")
  }
  app.innerHTML = "";
  for(const task of tasks){
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.textContent = `${task.name} | ${task.status} | ${task.priority}`;

    const toggleStatusButton = document.createElement("button");
    toggleStatusButton.textContent = task.status === "pending" ? "Set task as completed" : "Set task as pending";
    toggleStatusButton.addEventListener("click", () => { 
        task.status = task.status === "pending" ? "completed" : "pending";
        renderTasks();
    })

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete task";
    deleteButton.addEventListener("click", () => {
        const filteredTasks = tasks.filter(t => t.name !== task.name);
	    tasks = filteredTasks;
        renderTasks();
    })
    
    div.append(p);
	div.classList.add("task");
    div.append(toggleStatusButton);
    div.append(deleteButton);
    app.append(div);
  }
}



renderTasks();

const showHeader = (): void => {
    console.log(`================================\n\nTask Tracker\n\n===============================`)
}

const addTask = (tasks:Task[], taskToAdd:Pick<Task,"name" | "priority">): void => {
    const task:Task = {...taskToAdd,status:"pending"}
    tasks.push(task);
    console.log("Added task\n" + "Name: "+ task.name+"\nCompleted: " + (task.status === "completed" ? "true " :"false")+"\nPriority: " + task.priority);
}

const showTasks = (tasks:Task[]): void => {
    const str = tasks.reduce((p,task,i) => p+(i+1).toString()+ " " + task.name+"\nCompleted: " + (task.status === "completed" ? "true " :"false")+"\nPriority: " + task.priority+"\n","");
    console.log("Tasks\n" + str);
}

const showCompletedTasks = (tasks:Task[]): void => {
    const str = tasks.filter(t => t.status === "completed").reduce((p,task,i) => p+(i+1).toString()+ " " + task.name+"\nCompleted: " +(task.status === "completed" ? "true " :"false")+"\nPriority: " + task.priority+ "\n","");
    console.log("Completed tasks\n" + str);
}

const showPendingTasks = (tasks:Task[]): void => {
    const str = tasks.filter(t => t.status === "pending").reduce((p,task,i) => p+(i+1).toString()+ " " + task.name+"\nCompleted: " + (task.status === "completed" ? "true " :"false")+"\nPriority: " + task.priority+ "\n","");
    console.log("Pending tasks\n" + str);
}

const showTasksWithChosenPriority = (priority: Task["priority"]): void => {
    const str = tasks.filter(t => t.priority === priority).reduce((p,task,i) => p+(i+1).toString()+ " " + task.name+"\nCompleted: " + (task.status === "completed" ? "true " :"false")+"\nPriority: " + task.priority+ "\n","");
    console.log(`Tasks with priority "${priority}"\n` + str);
}

const completeTask = (tasks:Task[], taskName:string): void => {
    const task = tasks.find(t => t.name === taskName);
    if(!task){ 
        console.log("Task \""+taskName+"\" not found");
        return;
    }
    task.status = "completed"
    console.log("Task \""+taskName+"\" completed");
}

const showStatistics = (tasks:Task[]): void => {
    console.log("Statistics:\n" + "Number of tasks: " + tasks.length + "\nNumber of completed tasks:", tasks.filter(t => t.status === "completed").length + "\nNumber of incomplete tasks:", tasks.filter(t => t.status === "pending").length);
}

//const tasks = ["Lära mig TS", "Träna", "Handla", "Tvätta", "Plugga"];

showHeader();
//addTask(tasks,{name:"Lära mig TS",priority:"high"});
showTasks(tasks);
//addTask(tasks,{name:"Träna",priority:"medium"});
//addTask(tasks,{name:"Handla",priority:"medium"});
showTasks(tasks);
completeTask(tasks,"Handla");
showTasks(tasks);
showTasksWithChosenPriority("high");
showStatistics(tasks);
//addTask(tasks,{name:"Tvätta",priority:"medium"});
//addTask(tasks,{name:"Plugga",priority:"low"});
completeTask(tasks,"Tvätta");
showCompletedTasks(tasks);
showPendingTasks(tasks);
showStatistics(tasks)

const form = document.getElementById("task-submit-form") as HTMLFormElement;
form?.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const formObject = Object.fromEntries(formData.entries());
        const taskName = formObject.name as string;
        const taskPriority = formObject.priority as "high" | "medium" | "low";
        const task = {name: taskName, priority: taskPriority};
        addTask(tasks, task);
        renderTasks();
        form.reset();
});

const textInput = document.getElementById("task-input") as HTMLInputElement;
textInput.addEventListener("change", (event) => {
  const target = event.target as HTMLInputElement;
  target.value = target.value.trim();
});

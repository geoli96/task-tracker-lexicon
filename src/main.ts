/*
    Skriv ut vår header.
    Skriv ut lista på alla tasks.
    Skriv ut hur många tasks vi har.
    Lägg till en ny task.
    Skriv ut en ny lista på alla tasks.
    Skriv ut hur många tasks vi har nu.
*/

const printHeader = (): void => {
    console.log(`================================\n\nTask Tracker\n\n===============================`)
}

const printTasks = (tasks:string[]): void => {
    const str = tasks.reduce((p,task,i) => p+(i+1).toString()+ " " + task + "\n","");
    console.log("Tasks\n" + str);
}

const printNrOfTasks = (tasks:string[]): void => {
    const len = tasks.length;
    console.log(`Antal uppgifter: ${len}`);
}

const addTask = (tasks:string[], taskToAdd:string): void => {
    tasks.push(taskToAdd);
    console.log("Added task:",taskToAdd);
}

const tasks = ["Lära mig TS", "Träna", "Handla", "Tvätta", "Plugga"];

printHeader();
printTasks(tasks);
printNrOfTasks(tasks);
addTask(tasks,"Laga mat");
printTasks(tasks);
printNrOfTasks(tasks);
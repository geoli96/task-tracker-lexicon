type Task = {
  name: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
};

type EventListener = {element: HTMLButtonElement,event:string, eventListener: () => void};

export {
    type Task,
    type EventListener
}
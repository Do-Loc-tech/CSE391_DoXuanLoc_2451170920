import { useState } from "react";
import data from "./data/data.json";

import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState(data);

  const addTask = (task) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        ...task
      }
    ]);
  };

  const deleteTask = (id) => {
    setTasks(
      tasks.filter((task) => task.id !== id)
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Task List</h2>

      <AddTask addTask={addTask} />

      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
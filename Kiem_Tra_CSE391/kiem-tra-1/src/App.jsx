import { useState } from "react";
import data from "./data/data.json";

import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState(data);
  const [showAdd, setShowAdd] = useState(false);

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

      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="m-0">Task List</h2>
        <button
          className="btn btn-outline-primary"
          onClick={() => setShowAdd(true)}
        >
          + Add Task
        </button>
      </div>

      <AddTask addTask={addTask} modal={true} show={showAdd} onClose={() => setShowAdd(false)} />

      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
import { useState } from "react";

function AddTask({ addTask }) {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("Low");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Task name is required");
      return;
    }

    if (name.length > 100) {
      setError("Task name cannot exceed 100 characters");
      return;
    }

    addTask({
      name,
      priority,
      status: "To Do"
    });

    setName("");
    setPriority("Low");
    setError("");
  };

  return (
    <div className="card p-3 mb-3">
      <h5>Add Task</h5>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter task name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {error && (
          <div className="text-danger mb-2">
            {error}
          </div>
        )}

        <select
          className="form-select mb-2"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;
import { useState, useEffect } from "react";

function AddTask({ addTask, modal = false, show = false, onClose }) {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("Low");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!show) {
      setName("");
      setPriority("Low");
      setError("");
    }
  }, [show]);

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

    if (modal && onClose) onClose();
  };

  const content = (
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
          <div className="text-danger mb-2">{error}</div>
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

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
          {modal && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );

  if (!modal) return content;

  // Modal rendering
  if (!show) return null;

  return (
    <>
      <div className="modal d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">{content}</div>
          </div>
        </div>
      </div>
      <div
        className="modal-backdrop show"
        onClick={onClose}
        style={{ cursor: "pointer" }}
      />
    </>
  );
}

export default AddTask;
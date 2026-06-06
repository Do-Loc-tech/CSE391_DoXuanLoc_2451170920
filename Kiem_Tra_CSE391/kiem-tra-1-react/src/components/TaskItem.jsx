function TaskItem({ task, deleteTask }) {
  const getBadgeColor = () => {
    switch (task.priority) {
      case "High":
        return "danger";
      case "Medium":
        return "warning";
      default:
        return "success";
    }
  };

  return (
    <tr>
      <td>{task.name}</td>

      <td>
        <span className={`badge bg-${getBadgeColor()}`}>
          {task.priority}
        </span>
      </td>

      <td>{task.status}</td>

      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TaskItem;
import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask }) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Task Name</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TaskList;
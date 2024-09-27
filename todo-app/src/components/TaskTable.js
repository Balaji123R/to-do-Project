import React from "react";

const TaskTable = ({
  tasks,
  updateTask,
  handleEditClick,
  confirmDeleteTask,
}) => {
  const handleCheckboxChange = (task) => {
    const updatedTask = {
      ...task,
      status: task.status === "Completed" ? "Not Started" : "Completed",
    };
    updateTask(updatedTask); 
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Assigned To</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Comments</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>
              <input
                type="checkbox"
                checked={task.status === "Completed"}
                onChange={() => handleCheckboxChange(task)}
              />
            </td>
            <td style={{color: "blue"}}>{task.assignee}</td>
            <td>{task.status}</td>
            <td>{task.dueDate}</td>
            <td>{task.priority}</td>
            <td>
              <div className="d-flex justify-content-between align-items-center">
                <span>{task.Comments}</span>
                <div className="dropdown ">
                  <button
                    className="btn btn-light dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-three-dots-vertical "></i>
                  </button>
                  <ul
                    className="dropdown-menu "
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleEditClick(task)}
                      >
                        Edit
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => confirmDeleteTask(task)}
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
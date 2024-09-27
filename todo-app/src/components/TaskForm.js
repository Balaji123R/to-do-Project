import React from 'react';

const TaskForm = ({ task, handleInputChange }) => {
  return (
    <form>
      <div className="form-group">
        <label>Assigned To</label>
        <input
          type="text"
          className="form-control"
          name="assignee"
          value={task.assignee}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Status</label>
        <select
          className="form-control"
          name="status"
          value={task.status}
          onChange={handleInputChange}
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="form-group">
        <label>Due Date</label>
        <input
          type="date"
          className="form-control"
          name="dueDate"
          value={task.dueDate}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Priority</label>
        <select
          className="form-control"
          name="priority"
          value={task.priority}
          onChange={handleInputChange}
        >
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="form-group">
        <label>Comments</label>
        <textarea
          className="form-control"
          name="Comments"
          value={task.Comments}
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
};

export default TaskForm;
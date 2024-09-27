import React, { useState, useEffect } from "react";
import TaskTable from "./components/TaskTable";
import TaskForm from "./components/TaskForm";

import { Modal, Button, Dropdown } from "react-bootstrap";

const App = () => {
  const loadTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  };
  


const [tasks, setTasks] = useState(loadTasksFromLocalStorage());

  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [newTask, setNewTask] = useState({
    assignee: "",
    status: "Not Started",
    dueDate: "",
    priority: "Low",
    Comments: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(5);

  const filteredTasks = tasks.filter(
    (task) =>
      task.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.Comments.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const handleChangePage = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleTasksPerPageChange = (event) => {
    setTasksPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const addOrUpdateTask = () => {
    if (currentTask) {
      setTasks(
        tasks.map((task) => (task.id === currentTask.id ? newTask : task))
      );
    } else {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
    }
    setShowModal(false);
    setCurrentTask(null);
  };

  const confirmDeleteTask = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmation = () => {
    setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleEditClick = (task) => {
    setCurrentTask(task);
    setNewTask(task);
    setShowModal(true);
  };

  // Update task function
  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  useEffect(() => {
    const initialTasks = [
      { id: 1, assignee: "User 1", status: "Completed", dueDate: "2024-10-12", priority: "Low", Comments: "This task is good" },
      { id: 2, assignee: "User 2", status: "In Progress", dueDate: "2024-09-14", priority: "High", Comments: "This task is important" },
      { id: 3, assignee: "User 3", status: "Not Started", dueDate: "2024-08-18", priority: "Low", Comments: "This task needs attention" },
      { id: 4, assignee: "User 4", status: "In Progress", dueDate: "2024-06-12", priority: "Normal", Comments: "This task is ongoing" },
      { id: 5, assignee: "User 5", status: "Completed", dueDate: "2024-05-10", priority: "High", Comments: "Finished the report" },
    ];

    
    if (!localStorage.getItem("tasks")) {
      localStorage.setItem("tasks", JSON.stringify(initialTasks));
      setTasks(initialTasks); 
    }
  }, []); 
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="">Tasks</h1>
        <div className="pb-3 d-flex w-25">
          <button
            className="btn btn-light w-100"
            style={{ borderRadius: "0", border: "1px solid black" }}
            onClick={() => {
              setCurrentTask(null);
              setShowModal(true);
            }}
          >
            New Task
          </button>
          <button
            className="btn btn-light w-100"
            style={{
              borderRadius: "0",
              border: "1px solid black",
              borderLeft: "none",
            }}
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
      </div>

  
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="d-inline mb-0">{filteredTasks.length} records found</p>
        <div className="input-group w-25">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            style={{ borderRadius: "0", padding: "0.3rem 0.7rem" }}
          />
          <span
            className="input-group-text"
            style={{ borderRadius: "0", cursor: "pointer" }}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
        </div>
      </div>

      <TaskTable
        tasks={currentTasks}
        updateTask={updateTask}
        confirmDeleteTask={confirmDeleteTask}
        handleEditClick={handleEditClick}
      />

      
      <div className="d-flex justify-content-between mt-4">
        <div>
          <select
            className="form-select"
            style={{ width: "70px", borderRadius: "0" }}
            value={tasksPerPage}
            onChange={handleTasksPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
        <div>
          <Button
            className="me-2"
            variant="light"
            onClick={() => handleChangePage(1)}
          >
            First
          </Button>
          <Button
            className="me-2"
            variant="light"
            onClick={() => handleChangePage(currentPage - 1)}
          >
            Prev
          </Button>
          <span>{currentPage}</span>
          <Button
            className="me-2 ms-2"
            variant="light"
            onClick={() => handleChangePage(currentPage + 1)}
          >
            Next
          </Button>
          <Button variant="light" onClick={() => handleChangePage(totalPages)}>
            Last
          </Button>
        </div>
      </div>

      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentTask ? "Edit Task" : "New Task"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TaskForm task={newTask} handleInputChange={handleInputChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addOrUpdateTask}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  {taskToDelete
    ? `Do you want to delete this task: "${taskToDelete.assignee}"?`
    : "No task selected"}
</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirmation}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;
import React, { useContext } from 'react';
import { TaskContext } from '../../contexts/TaskContext';
import FilterSortBar from '../FilterSortBar';
import './index.css'

const TaskList = () => {
  const { tasks, deleteTask, editExistingTask } = useContext(TaskContext);

  return (
    <div className="task-list">
        <div className="list">
        <h2>List of tasks:</h2>
        <FilterSortBar/>
        </div>
      {tasks.length > 0 ? (
        <table className='table'>
          <thead>
            <tr className="tr">
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.dueDate}</td>
                <td>{task.status}</td>
                <td>
                  <button className="btn btn-info btn-sm" onClick={() => editExistingTask(task)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>Delete</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks available. Add a new task!</p>
      )}
    </div>
  );
};

export default TaskList;

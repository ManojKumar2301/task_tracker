import React, { useState, useEffect, useContext } from 'react';
import { TaskContext } from '../../contexts/TaskContext';
import './index.css'

const TaskForm = () => {
  const { addOrUpdateTask, editTask } = useContext(TaskContext);
  const [formData, setFormData] = useState({ title: '', description: '', dueDate: '', status: 'Pending' });

  useEffect(() => {
    if (editTask) {
      setFormData(editTask);
    }
  }, [editTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrUpdateTask(formData);
    setFormData({ title: '', description: '', dueDate: '', status: 'Pending' });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Task Title"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Task Description"
      ></textarea>
      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        required
      />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <div>
      <button type="submit" className='btn btn-primary'>{editTask ? 'Update Task' : 'Add Task'}</button>
      </div>
    </form>
  );
};

export default TaskForm;

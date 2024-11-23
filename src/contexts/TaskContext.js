import React, { createContext, useState, useEffect } from 'react';
import { saveTasksToLocalStorage, getTasksFromLocalStorage } from '../utils';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [originalTasks, setOriginalTasks] = useState(getTasksFromLocalStorage());
  const [tasks, setTasks] = useState(originalTasks);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    saveTasksToLocalStorage(originalTasks);
  }, [originalTasks]);

  const addOrUpdateTask = (task) => {
    if (editTask) {
      const updatedTasks = originalTasks.map((t) => (t.id === editTask.id ? task : t));
      setOriginalTasks(updatedTasks);
      setTasks(updatedTasks);
      setEditTask(null);
    } else {
      const newTasks = [...originalTasks, { ...task, id: Date.now() }];
      setOriginalTasks(newTasks);
      setTasks(newTasks);
    }
  };

  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const updatedTasks = originalTasks.filter((task) => task.id !== id);
      setOriginalTasks(updatedTasks);
      setTasks(updatedTasks);
    }
  };

  const editExistingTask = (task) => {
    setEditTask(task);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        originalTasks,
        addOrUpdateTask,
        deleteTask,
        editTask,
        editExistingTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

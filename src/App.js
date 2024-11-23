import React from 'react';
import { TaskProvider } from './contexts/TaskContext';
import TaskForm from './components/TaskForm/index';
import TaskList from './components/TaskList/index';
import './App.css';

const App = () => {
  return (
    <TaskProvider>
      <div className="app-container">
        <h1>Task Tracker</h1>
        <TaskForm />
        <TaskList />
      </div>
    </TaskProvider>
  );
};

export default App;

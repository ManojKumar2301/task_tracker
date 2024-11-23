import React, { useContext, useState } from 'react';
import { TaskContext } from '../../contexts/TaskContext';
import "./index.css"

const FilterSortBar = () => {
  const { originalTasks, setTasks } = useContext(TaskContext);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortByDate, setSortByDate] = useState('Newest');

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilterStatus(selectedFilter);
    applyFilters(selectedFilter, sortByDate);
  };

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortByDate(selectedSort);
    applyFilters(filterStatus, selectedSort);
  };

  const applyFilters = (status, sortType) => {
    let filteredTasks = originalTasks;

    // Apply the filter based on the status
    if (status !== 'All') {
      filteredTasks = filteredTasks.filter((task) => task.status === status);
    }

    // Apply the sorting based on due date
    if (sortType === 'Newest') {
      filteredTasks = filteredTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    } else if (sortType === 'Oldest') {
      filteredTasks = filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    // Update the state with the filtered/sorted tasks
    setTasks([...filteredTasks]);
  };

  return (

    <div className="filter-sort-bar">
      <div>
        <label className='filter' for="filter">Filter: </label>
        <select id="filter" value={filterStatus} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div>
      <label className="sort" for="sort">Sort: </label>
        <select id="sort" value={sortByDate} onChange={handleSortChange}>
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSortBar;

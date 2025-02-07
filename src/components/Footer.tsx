/* eslint-disable no-console */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

enum FilterStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

interface FooterProps {
  todos: Todo[];
  filterStatus: FilterStatus;
  setFilterStatus: (status: FilterStatus) => void;
}

export const Footer: React.FC<FooterProps> = ({
  todos,
  filterStatus,
  setFilterStatus,
}) => {
  const activeTodoCount = todos.filter(todo => !todo.completed).length;

  const filterLinks = Object.values(FilterStatus).map(status => (
    <a
      key={status}
      href={`#/${status}`}
      className={classNames('filter__link', {
        selected: filterStatus === status,
      })}
      data-cy={`FilterLink${status.charAt(0).toUpperCase() + status.slice(1)}`}
      onClick={() => setFilterStatus(status)}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </a>
  ));

  const handleClearCompleted = () => {
    // Add logic to clear completed todos here
    // This will likely involve calling an API and updating the todos state
    // For now, let's just log a message
    console.log('Clear completed todos');
  };

  const clearCompletedButton = (
    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      onClick={handleClearCompleted}
      disabled={!todos.some(todo => todo.completed)} // Disable if no completed todos
    >
      Clear completed
    </button>
  );

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodoCount} items left
      </span>
      <nav className="filter" data-cy="Filter">
        {filterLinks}
      </nav>
      {clearCompletedButton}
    </footer>
  );
};

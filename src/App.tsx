/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable padding-line-between-statements */
import React, { useState, useEffect } from 'react';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { UserWarning } from './UserWarning';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
// Replace this with your actual user ID
const USER_ID = 123;
export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'active' | 'completed'
  >('all');
  useEffect(() => {
    if (USER_ID) {
      loadTodos();
    } else {
      setShowError(true);
    }
    return () => {
      setErrorMessage(''); // Clear error message on unmount
    };
  }, []);
  const loadTodos = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setShowError(false);
    try {
      const loadedTodos = await getTodos();
      setTodos(loadedTodos);
    } catch (error) {
      setErrorMessage('Unable to load todos');
      // Set a timeout to show the error after a delay
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const filteredTodos = todos.filter(todo => {
    switch (filterStatus) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });
  if (!USER_ID) {
    setShowError(true);
    return <UserWarning />;
  }
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={`todoapp__toggle-all ${todos.every(todo => todo.completed) ? 'active' : ''}`}
              data-cy="ToggleAllButton"
            />
          )}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        <section className="todoapp__main" data-cy="TodoList">
          {isLoading ? <Loader /> : <TodoList todos={filteredTodos} />}
        </section>
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filterStatus === 'all' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={() => setFilterStatus('all')}
              >
                All
              </a>
              <a
                href="#/active"
                className={`filter__link ${filterStatus === 'active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={() => setFilterStatus('active')}
              >
                Active
              </a>
              <a
                href="#/completed"
                className={`filter__link ${filterStatus === 'completed' ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilterStatus('completed')}
              >
                Completed
              </a>
            </nav>
            {todos.some(todo => todo.completed) && (
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${showError ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => {
            setErrorMessage('');
            setShowError(false);
          }}
        />
        {errorMessage}
      </div>
    </div>
  );
};

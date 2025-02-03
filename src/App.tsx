/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable padding-line-between-statements */
/* eslint-disable curly */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// /* eslint-disable jsx-a11y/label-has-associated-control */
// /* eslint-disable jsx-a11y/control-has-associated-label */
// import React from 'react';
// import { UserWarning } from './UserWarning';
// import { USER_ID } from './api/todos';

// export const App: React.FC = () => {
//   if (!USER_ID) {
//     return <UserWarning />;
//   }

//   return (
//     <div className="todoapp">
//       <h1 className="todoapp__title">todos</h1>

//       <div className="todoapp__content">
//         <header className="todoapp__header">
//           {/* this button should have `active` class only if all todos are completed */}
//           <button
//             type="button"
//             className="todoapp__toggle-all active"
//             data-cy="ToggleAllButton"
//           />

//           {/* Add a todo on form submit */}
//           <form>
//             <input
//               data-cy="NewTodoField"
//               type="text"
//               className="todoapp__new-todo"
//               placeholder="What needs to be done?"
//             />
//           </form>
//         </header>

//         <section className="todoapp__main" data-cy="TodoList">
//           {/* This is a completed todo */}
//           <div data-cy="Todo" className="todo completed">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//                 checked
//               />
//             </label>

//             <span data-cy="TodoTitle" className="todo__title">
//               Completed Todo
//             </span>

//             {/* Remove button appears only on hover */}
//             <button type="button" className="todo__remove" data-cy="TodoDelete">
//               ×
//             </button>

//             {/* overlay will cover the todo while it is being deleted or updated */}
//             <div data-cy="TodoLoader" className="modal overlay">
//               <div className="modal-background has-background-white-ter" />
//               <div className="loader" />
//             </div>
//           </div>

//           {/* This todo is an active todo */}
//           <div data-cy="Todo" className="todo">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//               />
//             </label>

//             <span data-cy="TodoTitle" className="todo__title">
//               Not Completed Todo
//             </span>
//             <button type="button" className="todo__remove" data-cy="TodoDelete">
//               ×
//             </button>

//             <div data-cy="TodoLoader" className="modal overlay">
//               <div className="modal-background has-background-white-ter" />
//               <div className="loader" />
//             </div>
//           </div>

//           {/* This todo is being edited */}
//           <div data-cy="Todo" className="todo">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//               />
//             </label>

//             {/* This form is shown instead of the title and remove button */}
//             <form>
//               <input
//                 data-cy="TodoTitleField"
//                 type="text"
//                 className="todo__title-field"
//                 placeholder="Empty todo will be deleted"
//                 value="Todo is being edited now"
//               />
//             </form>

//             <div data-cy="TodoLoader" className="modal overlay">
//               <div className="modal-background has-background-white-ter" />
//               <div className="loader" />
//             </div>
//           </div>

//           {/* This todo is in loadind state */}
//           <div data-cy="Todo" className="todo">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//               />
//             </label>

//             <span data-cy="TodoTitle" className="todo__title">
//               Todo is being saved now
//             </span>

//             <button type="button" className="todo__remove" data-cy="TodoDelete">
//               ×
//             </button>

//             {/* 'is-active' class puts this modal on top of the todo */}
//             <div data-cy="TodoLoader" className="modal overlay is-active">
//               <div className="modal-background has-background-white-ter" />
//               <div className="loader" />
//             </div>
//           </div>
//         </section>

//         {/* Hide the footer if there are no todos */}
//         <footer className="todoapp__footer" data-cy="Footer">
//           <span className="todo-count" data-cy="TodosCounter">
//             3 items left
//           </span>

//           {/* Active link should have the 'selected' class */}
//           <nav className="filter" data-cy="Filter">
//             <a
//               href="#/"
//               className="filter__link selected"
//               data-cy="FilterLinkAll"
//             >
//               All
//             </a>

//             <a
//               href="#/active"
//               className="filter__link"
//               data-cy="FilterLinkActive"
//             >
//               Active
//             </a>

//             <a
//               href="#/completed"
//               className="filter__link"
//               data-cy="FilterLinkCompleted"
//             >
//               Completed
//             </a>
//           </nav>

//           {/* this button should be disabled if there are no completed todos */}
//           <button
//             type="button"
//             className="todoapp__clear-completed"
//             data-cy="ClearCompletedButton"
//           >
//             Clear completed
//           </button>
//         </footer>
//       </div>

//       {/* DON'T use conditional rendering to hide the notification */}
//       {/* Add the 'hidden' class to hide the message smoothly */}
//       <div
//         data-cy="ErrorNotification"
//         className="notification is-danger is-light has-text-weight-normal"
//       >
//         <button data-cy="HideErrorButton" type="button" className="delete" />
//         {/* show only one message at a time */}
//         Unable to load todos
//         <br />
//         Title should not be empty
//         <br />
//         Unable to add a todo
//         <br />
//         Unable to delete a todo
//         <br />
//         Unable to update a todo
//       </div>
//     </div>
//   );
// };
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
      setTimeout(() => setShowError(true), 3000);
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

      {errorMessage && showError && (
  <div
    data-cy="ErrorNotification"
    className="notification is-danger is-light has-text-weight-normal"
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
)}

    </div>
  );
};

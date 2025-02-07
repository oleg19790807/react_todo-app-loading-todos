/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <>
    {todos.map(({ id, completed, title }) => (
      <div
        key={id}
        data-cy="Todo"
        className={classNames('todo', { completed })}
      >
        <label className="todo__status-label" htmlFor={`todo-${id}`}>
          <input
            id={`todo-${id}`}
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={completed}
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          {title}
        </span>

        <button type="button" className="todo__remove" data-cy="TodoDelete">
          ×
        </button>
      </div>
    ))}
  </>
);

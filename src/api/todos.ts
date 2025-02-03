// import { Todo } from '../types/Todo';
// import { client } from '../utils/fetchClient';

// export const USER_ID = 0;

// export const getTodos = () => {
//   return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
// };

// // Add more methods here
import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = () => {
  return client.get<Todo[]>('/todos?userId=123'); // Replace `123` with your actual user ID.
};

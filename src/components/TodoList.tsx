import { useState } from 'react';
import type { Todo } from '../types';

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false
    };
    
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-list">
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
          className="todo-input"
        />
        <button type="submit" className="add-button">
          Add Task
        </button>
      </form>

      <ul className="todos">
        {todos.length === 0 ? (
          <li className="todo-item" style={{ justifyContent: 'center', color: 'var(--text-light)' }}>
            No tasks yet. Add one above!
          </li>
        ) : (
          todos.map(todo => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
              />
              <span>{todo.text}</span>
              <button 
                onClick={() => deleteTodo(todo.id)} 
                className="delete-button"
                aria-label={`Delete "${todo.text}"`}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

import { useState } from 'react';
import type { Todo } from '../types';

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

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

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.length - activeTodos;

  return (
    <div className="todo-list">
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
          className="todo-input"
          aria-label="New todo input"
        />
        <button 
          type="submit" 
          className="add-button"
          aria-label="Add new task"
        >
          Add Task
        </button>
      </form>

      <div className="todo-filters">
        <div className="filter-buttons">
          <button 
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
            aria-pressed={filter === 'all'}
          >
            All ({todos.length})
          </button>
          <button 
            className={`filter-button ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
            aria-pressed={filter === 'active'}
          >
            Active ({activeTodos})
          </button>
          <button 
            className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
            aria-pressed={filter === 'completed'}
          >
            Completed ({completedTodos})
          </button>
        </div>
        {completedTodos > 0 && (
          <button 
            onClick={clearCompleted} 
            className="clear-completed"
            aria-label="Clear completed tasks"
          >
            Clear completed
          </button>
        )}
      </div>

      <div className="todo-stats">
        <span>{activeTodos} {activeTodos === 1 ? 'task' : 'tasks'} remaining</span>
      </div>

      <ul className="todos" role="list">
        {filteredTodos.length === 0 ? (
          <li className="todo-item empty" role="listitem">
            {filter === 'all' 
              ? 'No tasks yet. Add one above!' 
              : `No ${filter} tasks`}
          </li>
        ) : (
          filteredTodos.map(todo => (
            <li 
              key={todo.id} 
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
              role="listitem"
            >
              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                  className="todo-checkbox"
                />
                <span className="todo-text">{todo.text}</span>
              </div>
              <button 
                onClick={() => deleteTodo(todo.id)} 
                className="delete-button"
                aria-label={`Delete "${todo.text}"`}
              >
                <span aria-hidden="true">×</span>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

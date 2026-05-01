import React, { useState } from 'react';
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoList/TodoList';

const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (title) => {
    setTodos([...todos, { id: Date.now(), title, completed: false }]);
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => (
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todos={todos}
        onToggleComplete={toggleComplete}
        onDelete={deleteTodo}
      />
    </div>
  );
};

export default App;
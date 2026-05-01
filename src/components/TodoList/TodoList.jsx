import React from 'react'

const TodoList = ({ todos, onToggleComplete, onDelete }) => {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleComplete(todo.id)}
          />
          {todo.title}
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}

export default TodoList

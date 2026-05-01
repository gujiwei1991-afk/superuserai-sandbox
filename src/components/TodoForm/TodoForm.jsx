import React, { useState } from 'react'

const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAddTodo(trimmed)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo"
        maxLength={200}
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default TodoForm

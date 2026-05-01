import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TodoList from './TodoList.jsx'

const mockTodos = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Write tests', completed: true },
]

describe('TodoList', () => {
  it('renders all todos', () => {
    render(<TodoList todos={mockTodos} onToggleComplete={() => {}} onDelete={() => {}} />)
    expect(screen.getByText('Buy groceries')).toBeInTheDocument()
    expect(screen.getByText('Write tests')).toBeInTheDocument()
  })

  it('renders an empty list when no todos', () => {
    const { container } = render(<TodoList todos={[]} onToggleComplete={() => {}} onDelete={() => {}} />)
    expect(container.querySelector('li')).toBeNull()
  })

  it('reflects completed state via checkbox', () => {
    render(<TodoList todos={mockTodos} onToggleComplete={() => {}} onDelete={() => {}} />)
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes[0]).not.toBeChecked()
    expect(checkboxes[1]).toBeChecked()
  })

  it('calls onToggleComplete with the correct id when checkbox is clicked', () => {
    const onToggleComplete = vi.fn()
    render(<TodoList todos={mockTodos} onToggleComplete={onToggleComplete} onDelete={() => {}} />)
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])
    expect(onToggleComplete).toHaveBeenCalledWith(1)
  })

  it('calls onDelete with the correct id when delete button is clicked', () => {
    const onDelete = vi.fn()
    render(<TodoList todos={mockTodos} onToggleComplete={() => {}} onDelete={onDelete} />)
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    fireEvent.click(deleteButtons[1])
    expect(onDelete).toHaveBeenCalledWith(2)
  })
})

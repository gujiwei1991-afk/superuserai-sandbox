import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

const mockTodos = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Walk the dog', completed: true },
];

describe('TodoList', () => {
  let onToggleComplete;
  let onDelete;

  beforeEach(() => {
    onToggleComplete = vi.fn();
    onDelete = vi.fn();
  });

  it('renders all todo titles', () => {
    render(<TodoList todos={mockTodos} onToggleComplete={onToggleComplete} onDelete={onDelete} />);
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.getByText('Walk the dog')).toBeInTheDocument();
  });

  it('renders an empty list when todos is empty', () => {
    render(<TodoList todos={[]} onToggleComplete={onToggleComplete} onDelete={onDelete} />);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('reflects the completed state via checkbox', () => {
    render(<TodoList todos={mockTodos} onToggleComplete={onToggleComplete} onDelete={onDelete} />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).toBeChecked();
  });

  it('calls onToggleComplete with the correct id when a checkbox is clicked', () => {
    render(<TodoList todos={mockTodos} onToggleComplete={onToggleComplete} onDelete={onDelete} />);
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    expect(onToggleComplete).toHaveBeenCalledWith(1);
  });

  it('calls onDelete with the correct id when the delete button is clicked', () => {
    render(<TodoList todos={mockTodos} onToggleComplete={onToggleComplete} onDelete={onDelete} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[1]);
    expect(onDelete).toHaveBeenCalledWith(2);
  });
});

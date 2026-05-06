import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

const mockTodos = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Walk the dog', completed: true },
];

describe('TodoList', () => {
  let onToggleComplete;
  let onDelete;
  let onClearCompleted;

  beforeEach(() => {
    onToggleComplete = vi.fn();
    onDelete = vi.fn();
    onClearCompleted = vi.fn();
  });

  const renderList = (todos = mockTodos) =>
    render(
      <TodoList
        todos={todos}
        onToggleComplete={onToggleComplete}
        onDelete={onDelete}
        onClearCompleted={onClearCompleted}
      />,
    );

  it('renders all todo titles', () => {
    renderList();
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.getByText('Walk the dog')).toBeInTheDocument();
  });

  it('renders an empty list when todos is empty', () => {
    renderList([]);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('reflects the completed state via checkbox', () => {
    renderList();
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).toBeChecked();
  });

  it('calls onToggleComplete with the correct id when a checkbox is clicked', () => {
    renderList();
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    expect(onToggleComplete).toHaveBeenCalledWith(1);
  });

  it('calls onDelete with the correct id when the delete button is clicked', () => {
    renderList();
    fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[1]);
    expect(onDelete).toHaveBeenCalledWith(2);
  });

  describe('清空已完成 button', () => {
    it('hides the button when no completed todos exist', () => {
      renderList([
        { id: 1, title: 'Buy groceries', completed: false },
        { id: 2, title: 'Walk the dog', completed: false },
      ]);
      expect(
        screen.queryByRole('button', { name: /清空已完成/ }),
      ).not.toBeInTheDocument();
    });

    it('hides the button when the todo list is empty', () => {
      renderList([]);
      expect(
        screen.queryByRole('button', { name: /清空已完成/ }),
      ).not.toBeInTheDocument();
    });

    it('shows the button with the completed count when at least one is completed', () => {
      renderList([
        { id: 1, title: 'Buy groceries', completed: false },
        { id: 2, title: 'Walk the dog', completed: true },
        { id: 3, title: 'Read book', completed: true },
      ]);
      expect(
        screen.getByRole('button', { name: '清空已完成（2）' }),
      ).toBeInTheDocument();
    });

    it('opens the confirm dialog when the clear button is clicked', () => {
      renderList();
      fireEvent.click(screen.getByRole('button', { name: '清空已完成（1）' }));
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('确认清空已完成事项？')).toBeInTheDocument();
      expect(
        screen.getByText('将删除 1 条已完成事项，删除后不可恢复。'),
      ).toBeInTheDocument();
    });

    it('does not call onClearCompleted when cancelled', () => {
      renderList();
      fireEvent.click(screen.getByRole('button', { name: '清空已完成（1）' }));
      fireEvent.click(screen.getByRole('button', { name: '取消' }));
      expect(onClearCompleted).not.toHaveBeenCalled();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('does not call onClearCompleted when Escape is pressed', () => {
      renderList();
      fireEvent.click(screen.getByRole('button', { name: '清空已完成（1）' }));
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClearCompleted).not.toHaveBeenCalled();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('calls onClearCompleted and closes the dialog on confirm', () => {
      renderList();
      fireEvent.click(screen.getByRole('button', { name: '清空已完成（1）' }));
      fireEvent.click(screen.getByRole('button', { name: '确认清空' }));
      expect(onClearCompleted).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});

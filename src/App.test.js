import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

const addTodo = (title) => {
  const input = screen.getByPlaceholderText('Add a new todo');
  fireEvent.change(input, { target: { value: title } });
  fireEvent.click(screen.getByRole('button', { name: 'Add' }));
};

const completeTodo = (title) => {
  const item = screen.getByText(title).closest('li');
  fireEvent.click(item.querySelector('input[type="checkbox"]'));
};

describe('App — clear completed flow', () => {
  it('does not show the clear button when no completed todos exist', () => {
    render(<App />);
    addTodo('Task A');
    expect(
      screen.queryByRole('button', { name: /清空已完成/ }),
    ).not.toBeInTheDocument();
  });

  it('updates the count as todos are completed and uncompleted', () => {
    render(<App />);
    addTodo('Task A');
    addTodo('Task B');

    completeTodo('Task A');
    expect(
      screen.getByRole('button', { name: '清空已完成（1）' }),
    ).toBeInTheDocument();

    completeTodo('Task B');
    expect(
      screen.getByRole('button', { name: '清空已完成（2）' }),
    ).toBeInTheDocument();

    completeTodo('Task A');
    expect(
      screen.getByRole('button', { name: '清空已完成（1）' }),
    ).toBeInTheDocument();
  });

  it('clears all completed todos on confirm and hides the button', () => {
    render(<App />);
    addTodo('Active task');
    addTodo('Done task 1');
    addTodo('Done task 2');
    completeTodo('Done task 1');
    completeTodo('Done task 2');

    fireEvent.click(screen.getByRole('button', { name: '清空已完成（2）' }));
    fireEvent.click(screen.getByRole('button', { name: '确认清空' }));

    expect(screen.queryByText('Done task 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Done task 2')).not.toBeInTheDocument();
    expect(screen.getByText('Active task')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /清空已完成/ }),
    ).not.toBeInTheDocument();
  });

  it('keeps todos intact when the dialog is cancelled', () => {
    render(<App />);
    addTodo('Task A');
    completeTodo('Task A');

    fireEvent.click(screen.getByRole('button', { name: '清空已完成（1）' }));
    fireEvent.click(screen.getByRole('button', { name: '取消' }));

    expect(screen.getByText('Task A')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '清空已完成（1）' }),
    ).toBeInTheDocument();
  });

  it('does not regress per-item delete', () => {
    render(<App />);
    addTodo('Task A');
    addTodo('Task B');

    const taskA = screen.getByText('Task A').closest('li');
    fireEvent.click(taskA.querySelector('button'));

    expect(screen.queryByText('Task A')).not.toBeInTheDocument();
    expect(screen.getByText('Task B')).toBeInTheDocument();
  });
});

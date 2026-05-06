import { useState } from 'react';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

const TodoList = ({ todos, onToggleComplete, onDelete, onClearCompleted }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const completedCount = todos.filter(todo => todo.completed).length;

  const openConfirm = () => setIsConfirmOpen(true);
  const closeConfirm = () => setIsConfirmOpen(false);

  const handleConfirmClear = () => {
    if (completedCount > 0) {
      onClearCompleted();
    }
    setIsConfirmOpen(false);
  };

  return (
    <>
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
      {completedCount > 0 && (
        <div className="todo-list-footer">
          <button
            type="button"
            className="clear-completed-button"
            onClick={openConfirm}
          >
            {`清空已完成（${completedCount}）`}
          </button>
        </div>
      )}
      <ConfirmDialog
        open={isConfirmOpen}
        title="确认清空已完成事项？"
        message={`将删除 ${completedCount} 条已完成事项，删除后不可恢复。`}
        cancelLabel="取消"
        confirmLabel="确认清空"
        onCancel={closeConfirm}
        onConfirm={handleConfirmClear}
      />
    </>
  );
};

export default TodoList;

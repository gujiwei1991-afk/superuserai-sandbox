import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmDialog from './ConfirmDialog';

describe('ConfirmDialog', () => {
  let onCancel;
  let onConfirm;

  beforeEach(() => {
    onCancel = vi.fn();
    onConfirm = vi.fn();
  });

  const baseProps = {
    title: '确认清空已完成事项？',
    message: '将删除 3 条已完成事项，删除后不可恢复。',
    confirmLabel: '确认清空',
    cancelLabel: '取消',
  };

  it('renders nothing when closed', () => {
    render(
      <ConfirmDialog
        {...baseProps}
        open={false}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders title, message and buttons when open', () => {
    render(
      <ConfirmDialog
        {...baseProps}
        open
        onCancel={onCancel}
        onConfirm={onConfirm}
      />,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('确认清空已完成事项？')).toBeInTheDocument();
    expect(
      screen.getByText('将删除 3 条已完成事项，删除后不可恢复。'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '取消' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '确认清空' })).toBeInTheDocument();
  });

  it('calls onCancel when the cancel button is clicked', () => {
    render(
      <ConfirmDialog
        {...baseProps}
        open
        onCancel={onCancel}
        onConfirm={onConfirm}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: '取消' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('calls onConfirm when the confirm button is clicked', () => {
    render(
      <ConfirmDialog
        {...baseProps}
        open
        onCancel={onCancel}
        onConfirm={onConfirm}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: '确认清空' }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onCancel).not.toHaveBeenCalled();
  });

  it('calls onCancel when Escape is pressed', () => {
    render(
      <ConfirmDialog
        {...baseProps}
        open
        onCancel={onCancel}
        onConfirm={onConfirm}
      />,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when the backdrop is clicked', () => {
    render(
      <ConfirmDialog
        {...baseProps}
        open
        onCancel={onCancel}
        onConfirm={onConfirm}
      />,
    );
    const backdrop = screen.getByRole('presentation');
    fireEvent.mouseDown(backdrop);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('does not call onCancel when clicking inside the dialog', () => {
    render(
      <ConfirmDialog
        {...baseProps}
        open
        onCancel={onCancel}
        onConfirm={onConfirm}
      />,
    );
    fireEvent.mouseDown(screen.getByRole('dialog'));
    expect(onCancel).not.toHaveBeenCalled();
  });

  it('focuses the confirm button when opened', () => {
    render(
      <ConfirmDialog
        {...baseProps}
        open
        onCancel={onCancel}
        onConfirm={onConfirm}
      />,
    );
    expect(screen.getByRole('button', { name: '确认清空' })).toHaveFocus();
  });
});

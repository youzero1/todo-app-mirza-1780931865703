import { useState } from 'react';
import { Todo } from '@/types';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const priorityBadge: Record<string, string> = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
};

const priorityDot: Record<string, string> = {
  low: 'bg-green-400',
  medium: 'bg-yellow-400',
  high: 'bg-red-400',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleEditSave() {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    }
    setEditing(false);
  }

  function handleEditCancel() {
    setEditText(todo.text);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleEditSave();
    if (e.key === 'Escape') handleEditCancel();
  }

  return (
    <li
      className={clsx(
        'bg-white border rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm transition group',
        todo.completed ? 'border-gray-100 opacity-70' : 'border-gray-200 hover:border-indigo-200 hover:shadow-md'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition',
          todo.completed
            ? 'bg-indigo-500 border-indigo-500 text-white'
            : 'border-gray-300 hover:border-indigo-400'
        )}
        aria-label="Toggle complete"
      >
        {todo.completed && <Check size={13} strokeWidth={3} />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            autoFocus
            value={editText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full border border-indigo-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        ) : (
          <span
            className={clsx(
              'block text-gray-800 text-sm font-medium truncate',
              todo.completed && 'line-through text-gray-400'
            )}
          >
            {todo.text}
          </span>
        )}
        <div className="flex items-center gap-2 mt-1">
          <span className={clsx('text-xs px-2 py-0.5 rounded-full font-medium', priorityBadge[todo.priority])}>
            <span className={clsx('inline-block w-1.5 h-1.5 rounded-full mr-1 align-middle', priorityDot[todo.priority])} />
            {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(todo.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
        {editing ? (
          <>
            <button
              onClick={handleEditSave}
              className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition"
              aria-label="Save edit"
            >
              <Check size={15} />
            </button>
            <button
              onClick={handleEditCancel}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition"
              aria-label="Cancel edit"
            >
              <X size={15} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => { setEditing(true); setEditText(todo.text); }}
              className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition"
              aria-label="Edit todo"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
              aria-label="Delete todo"
            >
              <Trash2 size={15} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}

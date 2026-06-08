import { useState } from 'react';
import { Priority } from '@/types';
import { Plus } from 'lucide-react';
import clsx from 'clsx';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const priorityOptions: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-700 border-green-300' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  { value: 'high', label: 'High', color: 'bg-red-100 text-red-700 border-red-300' },
];

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAdd(text, priority);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2 transition"
        >
          <Plus size={18} />
          Add
        </button>
      </div>
      <div className="flex gap-2">
        <span className="text-sm text-gray-500 self-center mr-1">Priority:</span>
        {priorityOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setPriority(opt.value)}
            className={clsx(
              'text-xs px-3 py-1.5 rounded-lg border font-medium transition',
              opt.color,
              priority === opt.value ? 'ring-2 ring-offset-1 ring-red-400 scale-105' : 'opacity-60 hover:opacity-100'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </form>
  );
}

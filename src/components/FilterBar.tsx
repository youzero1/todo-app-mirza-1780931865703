import { FilterType } from '@/types';
import clsx from 'clsx';

type FilterBarProps = {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  onClearCompleted: () => void;
  completedCount: number;
};

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function FilterBar({ filter, setFilter, onClearCompleted, completedCount }: FilterBarProps) {
  return (
    <div className="flex items-center justify-between mb-4 px-1">
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={clsx(
              'px-4 py-1.5 rounded-lg text-sm font-medium transition',
              filter === f.value
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-sm text-red-400 hover:text-red-600 transition font-medium"
        >
          Clear completed ({completedCount})
        </button>
      )}
    </div>
  );
}

type StatsBarProps = {
  activeCount: number;
  completedCount: number;
};

export default function StatsBar({ activeCount, completedCount }: StatsBarProps) {
  const total = activeCount + completedCount;
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div className="grid grid-cols-3 gap-3 mb-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
        <p className="text-2xl font-bold text-gray-800">{total}</p>
        <p className="text-xs text-gray-500 mt-0.5">Total</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
        <p className="text-2xl font-bold text-indigo-600">{activeCount}</p>
        <p className="text-xs text-gray-500 mt-0.5">Active</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
        <p className="text-2xl font-bold text-green-600">{completedCount}</p>
        <p className="text-xs text-gray-500 mt-0.5">Done ({percent}%)</p>
      </div>
    </div>
  );
}

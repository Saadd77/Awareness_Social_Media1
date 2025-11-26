interface ReportStatBarProps {
  label: string;
  value: number;
  previousValue?: number;
  color: string;
}

export default function ReportStatBar({ label, value, previousValue, color }: ReportStatBarProps) {
  const change = previousValue !== undefined ? value - previousValue : 0;
  const changeDirection = change > 0 ? 'increased' : change < 0 ? 'decreased' : 'stable';

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-200">{label}</h3>
        <div className="text-right">
          <div className="text-3xl font-bold text-white">{value}%</div>
          {previousValue !== undefined && change !== 0 && (
            <div className={`text-sm font-medium ${change > 0 ? 'text-red-400' : 'text-green-400'}`}>
              {change > 0 ? '+' : ''}{change}%
            </div>
          )}
        </div>
      </div>

      <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-1000`}
          style={{ width: `${value}%` }}
        />
      </div>

      {previousValue !== undefined && changeDirection !== 'stable' && (
        <p className="text-sm text-gray-400 mt-2">
          {changeDirection === 'increased' ? '↑' : '↓'} {label} {changeDirection} by {Math.abs(change)}%
        </p>
      )}
    </div>
  );
}

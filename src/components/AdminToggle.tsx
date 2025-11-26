interface AdminToggleProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function AdminToggle({ label, value, onChange }: AdminToggleProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-colors">
      <span className="text-gray-200 font-medium">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-14 h-7 rounded-full transition-colors ${
          value ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gray-600'
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
            value ? 'transform translate-x-7' : ''
          }`}
        />
      </button>
    </div>
  );
}

interface AdminSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function AdminSlider({ label, value, onChange, min = 0, max = 100 }: AdminSliderProps) {
  return (
    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-pink-500/50 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-200 font-medium">{label}</span>
        <span className="text-2xl font-bold text-pink-400">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${value}%, #374151 ${value}%, #374151 100%)`,
        }}
      />
    </div>
  );
}

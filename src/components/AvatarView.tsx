interface AvatarViewProps {
  emoji: string;
  borderColor: string;
  filterClass: string;
  label: string;
}

export default function AvatarView({ emoji, borderColor, filterClass, label }: AvatarViewProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-48 h-48 rounded-full border-8 ${borderColor} bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-8xl ${filterClass} shadow-2xl`}
      >
        {emoji}
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Algorithmic Identity</h3>
        <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 font-semibold">
          {label}
        </p>
      </div>
    </div>
  );
}

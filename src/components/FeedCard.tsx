interface FeedCardProps {
  title: string;
  description: string;
  thumbnail: string;
  day: number;
  directive: string;
}

export default function FeedCard({ title, description, thumbnail, day, directive }: FeedCardProps) {
  return (
    <div className="bg-gray-800/70 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden hover:border-pink-500/50 transition-all">
      <div className="relative h-64 bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center">
        <div className="text-6xl">{thumbnail}</div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>

        <div className="flex items-center justify-between text-sm">
          <span className="text-cyan-400">Day {day}</span>
          <span className="text-pink-400 text-xs">Influenced by: {directive}</span>
        </div>
      </div>
    </div>
  );
}

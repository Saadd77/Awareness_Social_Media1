import { useNavigate } from 'react-router-dom';
import { useSimulation } from '../context/SimulationContext';
import { calculateUserIdentity, getActiveDirective } from '../utils/identityCalculator';
import { generateFeed } from '../utils/feedGenerator';
import FeedCard from '../components/FeedCard';
import IdentityPanel from '../components/IdentityPanel';
import { Home, FileText } from 'lucide-react';

export default function UserFeed() {
  const navigate = useNavigate();
  const { adminState, advanceDay } = useSimulation();

  const identity = calculateUserIdentity(adminState);
  const directive = getActiveDirective(adminState);
  const feed = generateFeed(adminState);

  const handleNextDay = () => {
    advanceDay();
    navigate('/report');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <nav className="bg-gray-900/80 backdrop-blur-sm border-b border-purple-500/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
            User Feed
          </h1>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <Home className="w-5 h-5" />
            Home
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {feed.map((post) => (
              <FeedCard
                key={post.id}
                title={post.title}
                description={post.description}
                thumbnail={post.thumbnail}
                day={adminState.currentDay}
                directive={directive}
              />
            ))}
          </div>

          <div className="lg:col-span-1">
            <IdentityPanel identity={identity} />
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={handleNextDay}
            className="group bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-pink-500/50 inline-flex items-center gap-3"
          >
            <FileText className="w-6 h-6" />
            Simulate Next Day → View Report
          </button>
        </div>
      </div>
    </div>
  );
}

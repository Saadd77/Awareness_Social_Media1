import { useNavigate } from 'react-router-dom';
import { useSimulation } from '../context/SimulationContext';
import { calculateUserIdentity } from '../utils/identityCalculator';
import { generateIdentityLabel, getAvatarStyle, calculateOppositionVisibility } from '../utils/reportGenerator';
import ReportStatBar from '../components/ReportStatBar';
import AvatarView from '../components/AvatarView';
import { Home, Users, Settings } from 'lucide-react';

export default function DailyReport() {
  const navigate = useNavigate();
  const { adminState } = useSimulation();

  const identity = calculateUserIdentity(adminState);
  const identityLabel = generateIdentityLabel(identity, adminState);
  const avatarStyle = getAvatarStyle(identity);
  const oppositionVisibility = calculateOppositionVisibility(adminState);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900">
      <nav className="bg-gray-900/80 backdrop-blur-sm border-b border-purple-500/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Daily Identity Report
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
        <div className="mb-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Day {adminState.currentDay} Complete</h2>
              <p className="text-gray-300">Algorithmic identity evolution summary</p>
            </div>
            <div className="text-6xl">📊</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800/70 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6">Identity Evolution Summary</h2>

            <div className="space-y-4">
              <ReportStatBar
                label="Radicalization"
                value={identity.radicalization}
                color="bg-gradient-to-r from-red-500 to-orange-500"
              />
              <ReportStatBar
                label="Nationalism"
                value={identity.nationalism}
                color="bg-gradient-to-r from-blue-500 to-cyan-500"
              />
              <ReportStatBar
                label="Consumerism"
                value={identity.consumerism}
                color="bg-gradient-to-r from-green-500 to-emerald-500"
              />
              <ReportStatBar
                label="Anxiety"
                value={identity.anxiety}
                color="bg-gradient-to-r from-yellow-500 to-orange-500"
              />
              <ReportStatBar
                label="Screen-time Addiction"
                value={identity.screenTimeAddiction}
                color="bg-gradient-to-r from-purple-500 to-pink-500"
              />
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Opposition Content Visibility</span>
                <span className="text-xl font-bold text-cyan-400">{oppositionVisibility}%</span>
              </div>
              <div className="h-3 bg-gray-700 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000"
                  style={{ width: `${oppositionVisibility}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/70 backdrop-blur-sm border border-pink-500/30 rounded-xl p-8 flex items-center justify-center">
            <AvatarView
              emoji={avatarStyle.emoji}
              borderColor={avatarStyle.borderColor}
              filterClass={avatarStyle.filterClass}
              label={identityLabel}
            />
          </div>
        </div>

        <div className="bg-gray-800/70 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">Analysis</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              After Day {adminState.currentDay}, the algorithmic directives have shaped this user's digital identity
              into: <span className="text-white font-bold">{identityLabel}</span>.
            </p>
            <p>
              Current settings have resulted in a {identity.radicalization}% radicalization level
              {identity.radicalization > 60 && ' (significantly elevated)'}
              {identity.radicalization <= 60 && identity.radicalization > 30 && ' (moderately elevated)'}
              {identity.radicalization <= 30 && ' (baseline)'}.
            </p>
            <p>
              Screen-time addiction stands at {identity.screenTimeAddiction}%, while anxiety levels
              are at {identity.anxiety}%. The user's exposure to opposing viewpoints is currently
              at {oppositionVisibility}%.
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/user')}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
          >
            <Users className="w-6 h-6" />
            Back to User Feed
          </button>

          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
          >
            <Settings className="w-6 h-6" />
            Back to Control Room
          </button>
        </div>
      </div>
    </div>
  );
}

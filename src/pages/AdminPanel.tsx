import { useNavigate } from 'react-router-dom';
import { useSimulation } from '../context/SimulationContext';
import { useAuth } from '../context/AuthContext';
import AdminToggle from '../components/AdminToggle';
import AdminSlider from '../components/AdminSlider';
import { Home, FileText, LogOut } from 'lucide-react';

export default function AdminPanel() {
  const navigate = useNavigate();
  const { adminState, updateAdminState, advanceDay } = useSimulation();
  const { user, signOut, sessionId } = useAuth();

  const handleNextDay = () => {
    advanceDay();
    navigate('/report');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <nav className="bg-gray-900/80 backdrop-blur-sm border-b border-cyan-500/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-2xl">
              👔
            </div>
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Algorithm Control Room
              </h1>
              {sessionId && (
                <p className="text-xs text-cyan-300">Session Code: {sessionId}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-gray-400 text-sm">{user.email}</span>
            )}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Home className="w-5 h-5" />
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6">
          <p className="text-gray-300 text-lg">
            Adjust directives and watch the population's feed change. Every control shapes what people see, think, and become.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-gray-800/70 backdrop-blur-sm border border-red-500/30 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-3">
              <span className="text-3xl">🇺🇸</span>
              Political Directives
            </h2>

            <div className="space-y-4">
              <AdminToggle
                label="Boost Pro-American Content"
                value={adminState.proAmericanContent}
                onChange={(value) => updateAdminState({ proAmericanContent: value })}
              />
              <AdminToggle
                label="Reduce Foreign Platform Content"
                value={adminState.antiForeignPlatforms}
                onChange={(value) => updateAdminState({ antiForeignPlatforms: value })}
              />
              <AdminToggle
                label="Promote 'Strong Leader' Clips"
                value={adminState.strongLeaderContent}
                onChange={(value) => updateAdminState({ strongLeaderContent: value })}
              />
              <AdminSlider
                label="Censorship Level"
                value={adminState.censorshipLevel}
                onChange={(value) => updateAdminState({ censorshipLevel: value })}
              />
              <AdminSlider
                label="Anti-TikTok Rhetoric Intensity"
                value={adminState.nationalismLevel}
                onChange={(value) => updateAdminState({ nationalismLevel: value })}
              />
            </div>
          </div>

          <div className="bg-gray-800/70 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <span className="text-3xl">🎭</span>
              Sociological Directives
            </h2>

            <div className="space-y-4">
              <AdminSlider
                label="Celebrity/Influencer Obsession"
                value={adminState.influencerObsession}
                onChange={(value) => updateAdminState({ influencerObsession: value })}
              />
              <AdminSlider
                label="Amplify Outrage Content"
                value={adminState.outrageBoost}
                onChange={(value) => updateAdminState({ outrageBoost: value })}
              />
              <AdminToggle
                label="Promote 'Success' & Wealth Flexing"
                value={adminState.wealthFlexing}
                onChange={(value) => updateAdminState({ wealthFlexing: value })}
              />
              <AdminToggle
                label="Increase National Pride Clips"
                value={adminState.nationalPride}
                onChange={(value) => updateAdminState({ nationalPride: value })}
              />
            </div>
          </div>

          <div className="bg-gray-800/70 backdrop-blur-sm border border-pink-500/30 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-3">
              <span className="text-3xl">📊</span>
              Engagement Directives
            </h2>

            <div className="space-y-4">
              <AdminSlider
                label="Maximize Screen Time"
                value={adminState.screenTimeBoost}
                onChange={(value) => updateAdminState({ screenTimeBoost: value })}
              />
              <AdminToggle
                label="Prioritize Short, Addictive Clips"
                value={adminState.shortClipPriority}
                onChange={(value) => updateAdminState({ shortClipPriority: value })}
              />
              <AdminSlider
                label="Emotional Manipulation Strength"
                value={adminState.emotionalManipulation}
                onChange={(value) => updateAdminState({ emotionalManipulation: value })}
              />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={handleNextDay}
            className="group bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50 inline-flex items-center gap-3"
          >
            <FileText className="w-6 h-6" />
            Simulate Next Day → Identity Report
          </button>
        </div>
      </div>
    </div>
  );
}

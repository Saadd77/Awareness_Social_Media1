import { useNavigate } from 'react-router-dom';
import { Eye, Shield, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LandingPageMultiDevice() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-4">
            Recommended-For-You
          </h1>
          <h2 className="text-4xl font-bold text-white mb-6">Identity Engine</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-pink-500 to-cyan-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A multi-device simulation of how algorithmic control shapes identity.
          </p>
        </div>

        {user ? (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 mb-8">
            <p className="text-green-400 font-semibold mb-2">Logged in as:</p>
            <p className="text-white mb-4">{user.email}</p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/role-select')}
                className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-2 rounded-lg font-bold transition-all"
              >
                Continue to Session
              </button>
              <button
                onClick={handleSignOut}
                className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-6 py-2 rounded-lg font-bold transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 mb-8">
            <p className="text-gray-300 text-lg leading-relaxed">
              Connect multiple devices and experience how one admin's algorithmic controls shape what users see across all their phones, tablets, and computers.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/70 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <Eye className="w-8 h-8 text-pink-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">User Experience</h3>
            <p className="text-gray-400 text-sm">See how directives reshape the feed in real-time</p>
          </div>

          <div className="bg-gray-800/70 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <Shield className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Live Synchronization</h3>
            <p className="text-gray-400 text-sm">All connected devices sync instantly with admin changes</p>
          </div>

          <div className="bg-gray-800/70 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <LogIn className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Multi-Session</h3>
            <p className="text-gray-400 text-sm">Create or join sessions to connect with others</p>
          </div>
        </div>

        {user ? (
          <div className="text-center">
            <button
              onClick={() => navigate('/role-select')}
              className="group relative bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-12 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50 font-bold text-lg"
            >
              Get Started
            </button>
          </div>
        ) : (
          <div className="text-center">
            <button
              onClick={() => navigate('/login')}
              className="group relative bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-12 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-pink-500/50 font-bold text-lg inline-flex items-center gap-3"
            >
              <LogIn className="w-5 h-5" />
              Sign In to Begin
            </button>
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            A satirical simulation • No real data collection • Multi-device enabled
          </p>
        </div>
      </div>
    </div>
  );
}

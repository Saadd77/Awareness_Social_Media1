import { useNavigate } from 'react-router-dom';
import { Eye, Shield } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

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
            A simulation of how political power can control your algorithmic identity.
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 mb-8">
          <p className="text-gray-300 text-lg leading-relaxed">
            You can experience the feed as a normal user, or step behind the scenes into President Trump's control room
            and change what the algorithm does to people over time. Watch as daily directives reshape
            personalities, beliefs, and behaviors through carefully curated content.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => navigate('/user')}
            className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white p-8 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-pink-500/50"
          >
            <Eye className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Enter as User</h3>
            <p className="text-purple-100">Experience the algorithmic feed</p>
          </button>

          <button
            onClick={() => navigate('/admin')}
            className="group relative bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white p-8 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50"
          >
            <Shield className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Enter Control Room</h3>
            <p className="text-cyan-100">President Trump's Algorithm Panel</p>
          </button>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            A satirical simulation • No real data collection
          </p>
        </div>
      </div>
    </div>
  );
}

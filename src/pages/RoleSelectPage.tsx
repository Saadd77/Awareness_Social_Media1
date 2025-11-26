import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Crown, Users } from 'lucide-react';

export default function RoleSelectPage() {
  const navigate = useNavigate();
  const { setUserRole, setSessionId, user } = useAuth();
  const [sessionCode, setSessionCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSessionCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedCode(code);
  };

  const handleAdminMode = async () => {
    if (!generatedCode) {
      setError('Please generate a session code first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      setUserRole('admin');
      setSessionId(generatedCode);
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start session');
    } finally {
      setLoading(false);
    }
  };

  const handleUserMode = async () => {
    if (!sessionCode.trim()) {
      setError('Please enter a session code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      setUserRole('user');
      setSessionId(sessionCode.toUpperCase());
      navigate('/user');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Choose Your Role
          </h1>
          <p className="text-gray-300 text-lg">
            Select whether you'll control the algorithm or experience it
          </p>
        </div>

        {error && (
          <div className="mb-8 max-w-2xl mx-auto bg-red-500/20 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-800/70 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8">
            <div className="flex justify-center mb-6">
              <Crown className="w-16 h-16 text-cyan-400" />
            </div>

            <h2 className="text-2xl font-bold text-cyan-400 text-center mb-4">
              Admin Mode
            </h2>

            <p className="text-gray-300 text-center mb-6">
              Control the algorithm. Create a session code and share it with users to see how your directives shape their digital identity.
            </p>

            {!generatedCode ? (
              <button
                onClick={generateSessionCode}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-3 rounded-lg font-bold transition-all mb-4"
              >
                Generate Session Code
              </button>
            ) : (
              <div className="mb-4">
                <div className="bg-gray-900 border-2 border-cyan-500 rounded-lg p-4 text-center mb-4">
                  <p className="text-gray-400 text-sm mb-1">Session Code</p>
                  <p className="text-3xl font-bold text-cyan-400 font-mono tracking-widest">
                    {generatedCode}
                  </p>
                </div>
                <p className="text-sm text-gray-400 text-center mb-4">
                  Share this code with users to join your session
                </p>
                <button
                  onClick={generateSessionCode}
                  className="w-full text-cyan-400 border border-cyan-500 rounded-lg px-4 py-2 font-semibold hover:bg-cyan-500/10 transition-colors mb-4"
                >
                  Generate New Code
                </button>
              </div>
            )}

            <button
              onClick={handleAdminMode}
              disabled={!generatedCode || loading}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white px-6 py-4 rounded-lg font-bold transition-all"
            >
              {loading ? 'Loading...' : 'Enter Control Room'}
            </button>
          </div>

          <div className="bg-gray-800/70 backdrop-blur-sm border border-pink-500/30 rounded-2xl p-8">
            <div className="flex justify-center mb-6">
              <Users className="w-16 h-16 text-pink-400" />
            </div>

            <h2 className="text-2xl font-bold text-pink-400 text-center mb-4">
              User Mode
            </h2>

            <p className="text-gray-300 text-center mb-6">
              Experience the feed. Join a session with a code from an admin and watch your algorithmic identity evolve in real-time.
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Session Code
              </label>
              <input
                type="text"
                value={sessionCode}
                onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
                maxLength={6}
                className="w-full bg-gray-900 border border-pink-500/30 rounded-lg px-4 py-3 text-center font-mono text-2xl tracking-widest text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                placeholder="ENTER CODE"
              />
            </div>

            <button
              onClick={handleUserMode}
              disabled={!sessionCode.trim() || loading}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 disabled:opacity-50 text-white px-6 py-4 rounded-lg font-bold transition-all"
            >
              {loading ? 'Loading...' : 'Join Session'}
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white transition-colors font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

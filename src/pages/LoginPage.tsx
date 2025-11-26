import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

type AuthMode = 'login' | 'signup';

export default function LoginPage() {
  const navigate = useNavigate();
  const { signUp, signIn, error: authError } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      navigate('/role-select');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <LogIn className="w-16 h-16 mx-auto mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400" />
          <h1 className="text-3xl font-bold text-white mb-2">
            Identity Engine
          </h1>
          <p className="text-gray-400">
            {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {(error || authError) && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-300 text-sm">{error || authError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 disabled:opacity-50 text-white px-4 py-3 rounded-lg font-bold transition-all"
          >
            {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm mb-3">
            {mode === 'login'
              ? "Don't have an account?"
              : 'Already have an account?'}
          </p>
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setError('');
            }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 font-semibold hover:underline"
          >
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </div>

        <div className="mt-8 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <p className="text-cyan-300 text-sm">
            Demo credentials:
            <br />
            Email: demo@example.com
            <br />
            Password: demo123456
          </p>
        </div>
      </div>
    </div>
  );
}

import { UserIdentity } from '../utils/identityCalculator';

interface IdentityPanelProps {
  identity: UserIdentity;
}

export default function IdentityPanel({ identity }: IdentityPanelProps) {
  const metrics = [
    { label: 'Radicalization', value: identity.radicalization, color: 'from-red-500 to-orange-500' },
    { label: 'Nationalism', value: identity.nationalism, color: 'from-blue-500 to-cyan-500' },
    { label: 'Consumerism', value: identity.consumerism, color: 'from-green-500 to-emerald-500' },
    { label: 'Anxiety', value: identity.anxiety, color: 'from-yellow-500 to-orange-500' },
    { label: 'Screen-time Addiction', value: identity.screenTimeAddiction, color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="bg-gray-800/90 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 sticky top-6">
      <h3 className="text-2xl font-bold text-cyan-400 mb-6">User Identity</h3>

      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300 text-sm font-medium">{metric.label}</span>
              <span className="text-white font-bold">{metric.value}</span>
            </div>
            <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${metric.color} transition-all duration-500`}
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <p className="text-gray-400 text-xs text-center">
          Your algorithmic identity is being shaped by current directives
        </p>
      </div>
    </div>
  );
}

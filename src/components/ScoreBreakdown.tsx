import { Candidate } from '../types';

const ScoreCircle = ({ percentage, label }: { percentage: number; label: string }) => (
  <div className="relative w-32 h-32">
    <svg className="w-full h-full" viewBox="0 0 36 36">
      <path
        className="text-gray-200"
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="text-indigo-600"
        strokeDasharray={`${percentage}, 100`}
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        transform="rotate(90 18 18)"
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="text-3xl font-bold text-gray-800">{percentage}</span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  </div>
);

interface ScoreBreakdownProps {
  candidate: Candidate | null;
}

export default function ScoreBreakdown({ candidate }: ScoreBreakdownProps) {
  if (!candidate) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm h-full flex items-center justify-center">
        <p className="text-gray-500">Select a candidate to see their score breakdown.</p>
      </div>
    );
  }

    const breakdown = [
    { label: 'Skills', value: candidate.breakdown.Skills },
    { label: 'Experience', value: candidate.breakdown.Experience },
    { label: 'Education', value: candidate.breakdown.Education },
    { label: 'Keywords', value: candidate.breakdown.Keywords },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Score Breakdown ({candidate.name})</h2>
      <div className="flex items-center justify-center mb-6">
        <ScoreCircle percentage={candidate.score} label="Overall Score" />
      </div>
      <div className="space-y-3">
        {breakdown.map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="w-24 text-sm text-gray-600">{item.label}</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2.5">
              <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${(item.value / (breakdown.reduce((acc, item) => acc + item.value, 0))) * 100}%` }}></div>
            </div>
            <span className="w-10 text-right text-sm font-semibold text-gray-800">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

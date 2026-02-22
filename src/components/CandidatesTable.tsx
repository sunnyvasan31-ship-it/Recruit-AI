import { Candidate } from '../types';

const statusColors: { [key: string]: string } = {
  'Top Match': 'bg-green-100 text-green-800',
  'Strong': 'bg-blue-100 text-blue-800',
  'Review': 'bg-yellow-100 text-yellow-800',
  'Reject': 'bg-red-100 text-red-800',
};

interface CandidatesTableProps {
  candidates: Candidate[];
  selectedCandidate: Candidate | null;
  onSelectCandidate: (candidate: Candidate) => void;
}

export default function CandidatesTable({ candidates, selectedCandidate, onSelectCandidate }: CandidatesTableProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mt-6">
      <h2 className="text-lg font-semibold mb-4">Candidate Results</h2>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Candidate Name</th>
            <th scope="col" className="px-6 py-3">Score</th>
            <th scope="col" className="px-6 py-3">Summary</th>
            <th scope="col" className="px-6 py-3">Status</th>
          </tr>
        </thead>
                  <tbody>
            {candidates.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-500">
                  No candidates have been screened yet.
                </td>
              </tr>
            ) : (
              candidates.map((candidate, index) => (
            <tr 
              key={index} 
              onClick={() => onSelectCandidate(candidate)}
              className={`bg-white border-b hover:bg-gray-100 cursor-pointer ${selectedCandidate?.name === candidate.name ? 'bg-indigo-50' : ''}`}>

              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {candidate.name}
              </th>
              <td className="px-6 py-4 font-semibold text-gray-800">{candidate.score}</td>
              <td className="px-6 py-4">{candidate.summary}</td>
              <td className="px-6 py-4">
                <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${statusColors[candidate.status]}`}>
                  {candidate.status}
                </span>
                            </td>
            </tr>
          )))
          }
        </tbody>
      </table>
    </div>
  );
}

import { InterviewEvent } from '../types';
import { Calendar as CalendarIcon } from 'lucide-react';

interface CalendarProps {
  interviews: InterviewEvent[];
}

export default function Calendar({ interviews }: CalendarProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <CalendarIcon className="w-6 h-6 mr-3 text-indigo-600" />
        Upcoming Interviews
      </h2>
      {interviews.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No interviews scheduled yet.</p>
      ) : (
        <ul className="space-y-4">
          {interviews.map((interview, index) => (
            <li key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="font-semibold text-gray-800">{interview.candidateName}</p>
              <p className="text-sm text-gray-600">{interview.date} at {interview.time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

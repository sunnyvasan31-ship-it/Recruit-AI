import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import JobDescription from './JobDescription';
import ResumeUpload from './ResumeUpload';
import CandidatesTable from './CandidatesTable';
import ScoreBreakdown from './ScoreBreakdown';
import Analytics from './Analytics';
import Calendar from './Calendar';
import Settings from './Settings';
import { Candidate, CandidateStatus, InterviewEvent } from '../types';

export default function Dashboard() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
      const [isScreening, setIsScreening] = useState(false);
  const [screeningStage, setScreeningStage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [activePage, setActivePage] = useState('Dashboard');
    const [scheduledInterviews, setScheduledInterviews] = useState<InterviewEvent[]>([]);
  const [jobTitle, setJobTitle] = useState('Software Engineer');
  const [jobDescription, setJobDescription] = useState('');

      const handleRunScreening = () => {
    setIsScreening(true);
    setScreeningStage('Parsing Resumes...');

    setTimeout(() => {
      setScreeningStage('Scoring Candidates...');
      const newCandidates = uploadedFiles.map((file) => ({
        name: file.name.replace(/\.[^/.]+$/, ""),
                role: jobTitle,
        score: 0,
        status: 'Pending',
        avatarUrl: `https://i.pravatar.cc/150?u=${file.name}`,
        summary: 'Awaiting screening results...',
        breakdown: {
          'Experience': 0,
          'Skills': 0,
          'Education': 0,
          'Keywords': 0,
        }
      }));

      setTimeout(() => {
        setScreeningStage('Ranking Candidates...');
                const scoredCandidates = newCandidates.map(c => {
          const score = Math.floor(Math.random() * 40) + 60; // 60-99
          let status: CandidateStatus;
          if (score > 90) {
            status = 'Top Match';
          } else if (score > 80) {
            status = 'Strong';
          } else if (score > 70) {
            status = 'Review';
          } else {
            status = 'Reject';
          }

          return {
            ...c,
            score: score,
            status: status,
            summary: `This candidate shows strong potential with a score of ${score}. Key skills match the job description well.`,
            breakdown: {
              'Experience': Math.floor(Math.random() * 25) + 5,
              'Skills': Math.floor(Math.random() * 25) + 5,
              'Education': Math.floor(Math.random() * 25) + 5,
              'Keywords': Math.floor(Math.random() * 25) + 5,
            }
          }
        });

        setTimeout(() => {
          const rankedCandidates = scoredCandidates.sort((a, b) => b.score - a.score);
          setCandidates(rankedCandidates);
          setSelectedCandidate(rankedCandidates[0]);

          setTimeout(() => {
            setScreeningStage('Scheduling Interviews...');
                                                const finalCandidates = rankedCandidates.map(c => {
              if (c.status === 'Top Match' || c.status === 'Strong') {
                return { ...c, status: 'Interviewing' as CandidateStatus };
              }
              return c;
            });

            const newInterviews = finalCandidates
              .filter(c => c.status === 'Interviewing')
              .map((c, index) => {
                const interviewDate = new Date();
                interviewDate.setDate(interviewDate.getDate() + index + 1); // Schedule for upcoming days
                return {
                  candidateName: c.name,
                  date: interviewDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
                  time: `${9 + index}:00 AM`,
                };
              });
            
            setScheduledInterviews(prev => [...prev, ...newInterviews]);
            setCandidates(finalCandidates);
            setIsScreening(false);
            setScreeningStage('');
            setUploadedFiles([]);
          }, 1000);
        }, 1500);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 py-8 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {activePage === 'Dashboard' && (
              <>
                <div className="lg:col-span-2 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <JobDescription 
                      jobTitle={jobTitle} 
                      setJobTitle={setJobTitle} 
                      jobDescription={jobDescription} 
                      setJobDescription={setJobDescription} 
                    />
                    <ResumeUpload files={uploadedFiles} onFilesChange={setUploadedFiles} />
                  </div>
                  <div className="text-center">
                    <button
                      onClick={handleRunScreening}
                      disabled={isScreening || uploadedFiles.length === 0}
                      className="w-full max-w-xs px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-transform disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isScreening ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {screeningStage}
                        </>
                      ) : (
                        'Run Screening'
                      )}
                    </button>
                  </div>
                  <CandidatesTable 
                    candidates={candidates}
                    selectedCandidate={selectedCandidate}
                    onSelectCandidate={setSelectedCandidate}
                  />
                </div>
                <div className="lg:col-span-1">
                  <ScoreBreakdown candidate={selectedCandidate} />
                </div>
              </>
            )}
                        {activePage === 'Job Description' && <div className="lg:col-span-3"><JobDescription jobTitle={jobTitle} setJobTitle={setJobTitle} jobDescription={jobDescription} setJobDescription={setJobDescription} /></div>}
                        {activePage === 'Resume Upload' && <div className="lg:col-span-3"><ResumeUpload files={uploadedFiles} onFilesChange={setUploadedFiles} /></div>}
            {activePage === 'Candidates' && <div className="lg:col-span-3"><CandidatesTable candidates={candidates} selectedCandidate={selectedCandidate} onSelectCandidate={setSelectedCandidate} /></div>}
            {activePage === 'Analytics' && <div className="lg:col-span-3"><Analytics /></div>}
                        {activePage === 'Calendar' && <div className="lg:col-span-3"><Calendar interviews={scheduledInterviews} /></div>}
            {activePage === 'Settings' && <div className="lg:col-span-3"><Settings /></div>}
          </div>
        </main>
      </div>
    </div>
  );
}
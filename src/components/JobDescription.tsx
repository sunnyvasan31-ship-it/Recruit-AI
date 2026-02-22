interface JobDescriptionProps {
  jobTitle: string;
  setJobTitle: (title: string) => void;
  jobDescription: string;
  setJobDescription: (description: string) => void;
}

export default function JobDescription({ jobTitle, setJobTitle, jobDescription, setJobDescription }: JobDescriptionProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Job Description</h2>
      <div className="space-y-4">
                <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input 
            type="text" 
            id="role" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" 
            placeholder="e.g., Senior Product Manager" 
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
                <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
          <textarea 
            id="description" 
            rows={8}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" 
            placeholder="Describe the role, responsibilities, and qualifications..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">Skills & Criteria</label>
          <div className="flex flex-wrap gap-2">
            {['Product Management', 'UX/UI', 'SaaS', 'Agile', 'JIRA', '+ Add'].map((skill, i) => (
              <span key={i} className={`px-3 py-1 text-sm rounded-full cursor-pointer ${skill === '+ Add' ? 'bg-gray-200 text-gray-700' : 'bg-indigo-100 text-indigo-700'}`}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 text-right">
        <button 
          onClick={() => alert('Job description saved!')}
          className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">

          Save Description
        </button>
      </div>
    </div>
  );
}

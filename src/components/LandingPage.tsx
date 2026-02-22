import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
      <header className="mb-12">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900">
          Welcome to <span className="text-indigo-600">Recruit-AI</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          The intelligent platform that streamlines your hiring process, from resume screening to candidate ranking.
        </p>
      </header>
      
      <main className="mb-12">
        <Link to="/login">
          <button className="px-10 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-transform flex items-center mx-auto">
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </Link>
      </main>

      <footer className="text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Recruit-AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

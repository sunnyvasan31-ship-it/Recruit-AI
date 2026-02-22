import { useState } from 'react';
import { Briefcase, Home, Settings, Users, BarChart2, Calendar, FileUp } from 'lucide-react';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Sidebar({ activePage, setActivePage }: SidebarProps) {
  const navItems = [
    { icon: Home, label: 'Dashboard' },
    { icon: Briefcase, label: 'Job Description' },
    { icon: FileUp, label: 'Resume Upload' },
    { icon: Users, label: 'Candidates' },
    { icon: BarChart2, label: 'Analytics' },
    { icon: Calendar, label: 'Calendar' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-900 text-gray-200 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-gray-700">
        <h1 className="text-xl font-semibold text-white">Recruit-AI</h1>
      </div>
      <nav className="flex-1 px-4 py-4">
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <a 
                href="#" 
                onClick={() => setActivePage(item.label)}
                className={`flex items-center px-4 py-2.5 text-sm rounded-lg transition-colors ${activePage === item.label ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'}`}>
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="px-4 py-4 border-t border-gray-700">
        <a href="#" className="flex items-center px-4 py-2.5 text-sm rounded-lg hover:bg-gray-800">
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </a>
      </div>
    </aside>
  );
}

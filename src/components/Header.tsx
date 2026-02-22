import { ChevronDown } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white h-16 flex items-center justify-end px-6 shadow-sm">
      <button onClick={() => alert('User profile clicked!')} className="flex items-center text-left">
        <img
          src="https://i.pravatar.cc/40?u=sarah"
          alt="Sarah's Avatar"
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <p className="font-semibold text-sm">Sarah</p>
          <p className="text-xs text-gray-500">Talent Manager</p>
        </div>
        <ChevronDown className="w-4 h-4 ml-2 text-gray-400 cursor-pointer" />
      </button>
    </header>
  );
}

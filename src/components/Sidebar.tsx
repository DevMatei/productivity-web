import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, Calendar, CheckSquare, FileText, 
  Settings, Timer, Brain, Activity 
} from 'lucide-react';

export const Sidebar = () => {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: FileText, label: 'Notes', path: '/notes' },
    { icon: Timer, label: 'Pomodoro', path: '/pomodoro' },
    { icon: Brain, label: 'AI Assistant', path: '/ai' },
    { icon: Activity, label: 'Habits', path: '/habits' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">ProductivityHub</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors
                    ${isActive
                      ? 'bg-indigo-500 text-white'
                      : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </aside>
  );
};
import React from 'react';
import { Clock, Calendar as CalendarIcon, CheckSquare, FileText } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Dashboard = () => {
  const user = useAuthStore((state) => state.user);

  const stats = [
    { name: 'Tasks Due Today', value: '5', icon: CheckSquare },
    { name: 'Upcoming Events', value: '3', icon: CalendarIcon },
    { name: 'Recent Notes', value: '12', icon: FileText },
    { name: 'Focus Time', value: '2.5h', icon: Clock },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Welcome back, {user?.name}!
        </h1>
        
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.name}
                className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <item.icon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                          {item.name}
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {item.value}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Recent Activity
              </h3>
              <div className="mt-5">
                <div className="flow-root">
                  <ul className="-mb-8">
                    <li className="relative pb-8">
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white dark:ring-gray-800">
                            <CheckSquare className="h-5 w-5 text-white" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Completed task <span className="font-medium text-gray-900 dark:text-white">Project Review</span>
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                            2h ago
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Upcoming Tasks
              </h3>
              <div className="mt-5">
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-900 dark:text-white">
                          Important Task {index + 1}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Due in {index + 1}d
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
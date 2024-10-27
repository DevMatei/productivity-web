import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { useCalendarStore } from '../../store/calendarStore';

export const CalendarHeader = () => {
  const { selectedDate, setSelectedDate, view, setView } = useCalendarStore();

  const handlePrevious = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 7)));
  };

  const handleNext = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 7)));
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
          <Calendar className="h-6 w-6 mr-2" />
          Calendar
        </h1>
        <div className="ml-6 flex items-center space-x-2">
          <button
            onClick={() => setView('day')}
            className={`px-3 py-1 rounded-md ${
              view === 'day'
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Day
          </button>
          <button
            onClick={() => setView('week')}
            className={`px-3 py-1 rounded-md ${
              view === 'week'
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setView('month')}
            className={`px-3 py-1 rounded-md ${
              view === 'month'
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Month
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevious}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          <span className="text-lg font-medium text-gray-900 dark:text-white">
            {format(selectedDate, 'MMMM yyyy')}
          </span>
          <button
            onClick={handleNext}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <button
          onClick={() => setSelectedDate(new Date())}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Today
        </button>
      </div>
    </header>
  );
};
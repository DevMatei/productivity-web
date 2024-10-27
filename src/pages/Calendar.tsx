import React, { useEffect } from 'react';
import { CalendarHeader } from '../components/calendar/CalendarHeader';
import { WeekView } from '../components/calendar/WeekView';
import { useCalendarStore } from '../store/calendarStore';
import { Sync } from 'lucide-react';

export const Calendar = () => {
  const { syncWithOutlook } = useCalendarStore();

  useEffect(() => {
    // Initial sync with Outlook
    syncWithOutlook().catch(console.error);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <CalendarHeader />
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => syncWithOutlook()}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Sync className="h-5 w-5 mr-2" />
            Sync with Outlook
          </button>
        </div>
        <WeekView />
      </div>
    </div>
  );
};
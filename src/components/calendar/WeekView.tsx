import React, { useState } from 'react';
import { format, addDays, startOfWeek, isSameDay, isToday } from 'date-fns';
import { useCalendarStore, Event } from '../../store/calendarStore';
import { EventModal } from './EventModal';
import { Plus } from 'lucide-react';

export const WeekView = () => {
  const { selectedDate, events } = useCalendarStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();
  const [clickedDate, setClickedDate] = useState<Date | undefined>();

  const weekStart = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));

  const getEventsForDay = (date: Date): Event[] => {
    return events.filter((event) => isSameDay(new Date(event.start), date));
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleDayClick = (date: Date) => {
    setClickedDate(date);
    setSelectedEvent(undefined);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
          {weekDays.map((day) => (
            <div
              key={day.toISOString()}
              className="px-2 py-3 text-center border-r border-gray-200 dark:border-gray-700 last:border-r-0"
            >
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {format(day, 'EEE')}
              </div>
              <div
                className={`text-lg mt-1 font-semibold ${
                  isToday(day)
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-900 dark:text-white'
                }`}
              >
                {format(day, 'd')}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 h-full min-h-[600px]">
          {weekDays.map((day) => (
            <div
              key={day.toISOString()}
              className="border-r border-gray-200 dark:border-gray-700 last:border-r-0"
            >
              <div
                className="p-2 space-y-2 min-h-full relative"
                onClick={() => handleDayClick(day)}
              >
                {getEventsForDay(day).map((event) => (
                  <div
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEventClick(event);
                    }}
                    className={`p-2 rounded-lg text-sm cursor-pointer transition-all duration-200 hover:shadow-md ${
                      event.isOutlookEvent
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                    }`}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-xs">
                      {format(new Date(event.start), 'HH:mm')} -{' '}
                      {format(new Date(event.end), 'HH:mm')}
                    </div>
                    {event.location && (
                      <div className="text-xs mt-1 truncate">{event.location}</div>
                    )}
                  </div>
                ))}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDayClick(day);
                  }}
                  className="absolute bottom-2 right-2 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(undefined);
          setClickedDate(undefined);
        }}
        event={selectedEvent}
        selectedDate={clickedDate}
      />
    </>
  );
};
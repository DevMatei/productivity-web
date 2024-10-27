import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addDays, startOfWeek, endOfWeek } from 'date-fns';
import { outlookService } from '../services/outlookService';

export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  location?: string;
  isOutlookEvent?: boolean;
}

interface CalendarState {
  events: Event[];
  selectedDate: Date;
  view: 'day' | 'week' | 'month';
  isOutlookConnected: boolean;
  setSelectedDate: (date: Date) => void;
  setView: (view: 'day' | 'week' | 'month') => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  syncWithOutlook: () => Promise<void>;
  setOutlookConnected: (connected: boolean) => void;
}

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set, get) => ({
      events: [],
      selectedDate: new Date(),
      view: 'week',
      isOutlookConnected: false,
      setSelectedDate: (date) => set({ selectedDate: date }),
      setView: (view) => set({ view }),
      addEvent: (event) =>
        set((state) => ({
          events: [
            ...state.events,
            { ...event, id: Math.random().toString(36).substr(2, 9) },
          ],
        })),
      updateEvent: (id, event) =>
        set((state) => ({
          events: state.events.map((e) =>
            e.id === id ? { ...e, ...event } : e
          ),
        })),
      deleteEvent: (id) =>
        set((state) => ({
          events: state.events.filter((e) => e.id !== id),
        })),
      syncWithOutlook: async () => {
        try {
          if (!get().isOutlookConnected) {
            await outlookService.login();
            set({ isOutlookConnected: true });
          }

          const start = startOfWeek(get().selectedDate);
          const end = endOfWeek(get().selectedDate);
          const outlookEvents = await outlookService.getEvents(start, end);

          set((state) => ({
            events: [
              ...state.events.filter((e) => !e.isOutlookEvent),
              ...outlookEvents,
            ],
          }));
        } catch (error) {
          console.error('Failed to sync with Outlook:', error);
          throw error;
        }
      },
      setOutlookConnected: (connected) => set({ isOutlookConnected: connected }),
    }),
    {
      name: 'calendar-storage',
    }
  )
);
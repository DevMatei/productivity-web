import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Home } from '../pages/Home';
import { Calendar } from '../pages/Calendar';
import { Tasks } from '../pages/Tasks';
import { Notes } from '../pages/Notes';
import { Settings } from '../pages/Settings';
import { Dashboard } from '../pages/Dashboard';
import { useTheme } from '../hooks/useTheme';

export const Layout = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};
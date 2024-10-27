import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AppProvider } from './context/AppContext';
import { useAuthStore } from './store/authStore';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginForm />
          } />
          <Route path="/signup" element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignupForm />
          } />
          <Route path="/*" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          } />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
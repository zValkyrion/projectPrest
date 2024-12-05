import React from 'react';
import { useAuth } from './context/AuthContext';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';
import { AuthProvider } from './context/AuthContext';
import { LoanProvider } from './context/LoanContext';
import { ClientProvider } from './context/ClientContext';

function AppContent() {
  const { user } = useAuth();

  return user ? <Dashboard /> : <LoginForm />;
}

function App() {
  return (
    <AuthProvider>
      <ClientProvider>
        <LoanProvider>
          <AppContent />
        </LoanProvider>
      </ClientProvider>
    </AuthProvider>
  );
}

export default App;
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { LoanList } from './LoanList';
import { ClientList } from './ClientList';
import { RegisterLoan } from './RegisterLoan';
import { AddClientModal } from './AddClientModal';
import { Menu } from 'lucide-react';

type View = 'loans' | 'clients' | 'registerLoan';

export function Dashboard() {
  const [currentView, setCurrentView] = useState<View>('loans');
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'loans':
        return <LoanList />;
      case 'clients':
        return <ClientList />;
      case 'registerLoan':
        return <RegisterLoan />;
      default:
        return <LoanList />;
    }
  };

  return (
    <div className="flex h-screen relative">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
      >
        <Menu size={24} />
      </button>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Sidebar
          onAddClient={() => {
            setIsAddClientOpen(true);
            setIsSidebarOpen(false);
          }}
          onViewClients={() => {
            setCurrentView('clients');
            setIsSidebarOpen(false);
          }}
          onViewLoans={() => {
            setCurrentView('loans');
            setIsSidebarOpen(false);
          }}
          onRegisterLoan={() => {
            setCurrentView('registerLoan');
            setIsSidebarOpen(false);
          }}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-gray-100 w-full lg:w-auto">
        <div className="pt-16 lg:pt-0">
          {renderView()}
        </div>
      </main>

      <AddClientModal
        isOpen={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
      />
    </div>
  );
}
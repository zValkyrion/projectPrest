import React from 'react';

type TabOption = 'all' | 'current' | 'pending';

interface LoanStatusTabsProps {
  currentTab: TabOption;
  onTabChange: (tab: TabOption) => void;
}

export function LoanStatusTabs({ currentTab, onTabChange }: LoanStatusTabsProps) {
  return (
    <div className="flex space-x-2 mb-4 overflow-x-auto">
      <button
        onClick={() => onTabChange('all')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
          ${currentTab === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
      >
        Todos
      </button>
      <button
        onClick={() => onTabChange('current')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
          ${currentTab === 'current'
            ? 'bg-green-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
      >
        Al Corriente
      </button>
      <button
        onClick={() => onTabChange('pending')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
          ${currentTab === 'pending'
            ? 'bg-red-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
      >
        Pago Pendiente
      </button>
    </div>
  );
}
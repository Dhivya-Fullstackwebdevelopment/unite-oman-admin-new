import React from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F8FA]">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;
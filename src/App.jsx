import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header1';
import Sidebar from './components/Sidebar';
import TaskContent from './components/TaskContent';
import SettingsContent from './components/SettingsContent';

const App = () => {
  const [tasks, setTasks] = useState([]);

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar tasks={tasks} />
          <Routes>
            <Route path="/tasks" element={<TaskContent tasks={tasks} setTasks={setTasks} />} />
            <Route path="/settings" element={<SettingsContent />} />
            <Route path="/" element={<TaskContent tasks={tasks} setTasks={setTasks} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

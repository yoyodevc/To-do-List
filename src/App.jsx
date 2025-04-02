import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header1';
import Sidebar from './components/Sidebar';
import TaskContent from './components/TaskContent';
import SettingsContent from './components/SettingsContent';
import TrashContent from './components/TrashContent';
import useTasks from './hooks/useTasks';

const App = () => {
  const {
    tasks,
    deletedTasks,
    toggleTaskCompletion,
    moveToTrash,
    restoreFromTrash,
    permanentlyDeleteTask,
    emptyTrash,
    clearCompletedTasks,
    updateTask,
    addTask,
    getTaskStats
  } = useTasks();

  return (
    <Router>
      <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
        <Header taskStats={getTaskStats()} />
        <div className="flex flex-1 overflow-hidden relative">
          {/* sidebar */}
          <Sidebar tasks={tasks} deletedTasks={deletedTasks} />
          {/* main */}
          <Routes>
            <Route 
              path="/tasks" 
              element={
                <TaskContent 
                  tasks={tasks} 
                  addTask={addTask}
                  updateTask={updateTask}
                  toggleTaskCompletion={toggleTaskCompletion}
                  moveToTrash={moveToTrash}
                  clearCompletedTasks={clearCompletedTasks}
                />
              } 
            />
            <Route 
              path="/trash" 
              element={
                <TrashContent 
                  deletedTasks={deletedTasks} 
                  restoreFromTrash={restoreFromTrash} 
                  permanentlyDeleteTask={permanentlyDeleteTask}
                  emptyTrash={emptyTrash}
                />
              } 
            />
            <Route path="/settings" element={<SettingsContent />} />
            <Route path="/" element={<Navigate to="/tasks" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
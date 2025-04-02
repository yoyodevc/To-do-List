import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ taskStats = {} }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  const notifications = [
    { id: 1, text: 'You have 3 tasks due today', time: '15 minutes ago', isRead: false },
    { id: 2, text: 'Task "Prepare presentation" was completed', time: '2 hours ago', isRead: true },
    { id: 3, text: 'Welcome to Task Manager', time: '1 day ago', isRead: true }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        setShowNotifications(false);
        setShowProfile(false);
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 w-full">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        <div className="flex items-center pl-0 md:pl-4">
          <Link to="/" className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="w-8 h-8 text-gray-800" viewBox="0 0 16 16">
              <path d="M4 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4m2.625.547a3 3 0 0 0-5.584.953H.5a.5.5 0 0 0 0 1h.541A3 3 0 0 0 7 8a1 1 0 0 1 2 0 3 3 0 0 0 5.959.5h.541a.5.5 0 0 0 0-1h-.541a3 3 0 0 0-5.584-.953A2 2 0 0 0 8 6c-.532 0-1.016.208-1.375.547M14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/>
            </svg>
            <span className="text-xl font-semibold text-gray-800 hidden sm:inline-block">To-Do List</span>
            <span className="text-xl font-semibold text-gray-800 sm:hidden">Tasks</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative" ref={notificationsRef}>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"onClick={() => setShowNotifications(!showNotifications)}aria-label="Notifications">
              <svg className="w-6 h-6 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.193-.538 1.193H5.538c-.538 0-.538-.6-.538-1.193 0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365Z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.578 18.07A3.48 3.48 0 0 0 12 19.978a3.48 3.48 0 0 0 3.422-1.908" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-gray-800 rounded-full">{unreadCount}</span>
              )}
            </button>
            <AnimatePresence>
              {showNotifications && (
                <motion.div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-10 border border-gray-200"initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}transition={{ duration: 0.2 }}>
                  <div className="py-2 px-3 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
                      <button className="text-xs text-gray-800 hover:text-gray-900">Mark all as read</button>
                    </div>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div key={notification.id} className={`py-3 px-4 border-b border-gray-100 hover:bg-gray-50 ${notification.isRead ? '' : 'bg-blue-50'}`}>
                          <p className="text-sm text-gray-800">{notification.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))
                    ) : (
                      <div className="py-6 px-4 text-center text-gray-500">
                        <p>No notifications</p>
                      </div>
                    )}
                  </div>
                  <div className="py-2 px-3 bg-gray-50 border-t border-gray-200 text-center">
                    <button className="text-xs text-gray-800 hover:text-gray-900">View all notifications</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="relative" ref={profileRef}>
            <button onClick={() => setShowProfile(!showProfile)}className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition-colors"aria-label="User menu">
              <div className="h-8 w-8 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center">
                <span className="text-sm font-medium">JFL</span>
              </div>
            </button>
            <AnimatePresence>
              {showProfile && (
                <motion.div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 border border-gray-200"initial={{ opacity: 0, y: -10 }}animate={{ opacity: 1, y: 0 }}exit={{ opacity: 0, y: -10 }}transition={{ duration: 0.2 }}>
                  <div className="py-2 px-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">John Doe</p>
                    <p className="text-xs text-gray-500 truncate">john.doe@example.com</p>
                  </div>
                  <div>
                    <Link to="/settings"className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"onClick={() => setShowProfile(false)}>Settings</Link>
                    <div className="border-t border-gray-100">
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Sign out</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
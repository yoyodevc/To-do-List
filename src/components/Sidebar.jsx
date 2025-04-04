import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ tasks, deletedTasks = [] }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get("category");

  const isActive = (path) => location.pathname === path;
  const isActiveCategoryFilter = (category) => selectedCategory === category;
  const isTasksPage = location.pathname === '/tasks';

  const categoryCounts = Array.isArray(tasks) ? tasks.reduce((acc, task) => {
    const category = task.category || 'uncategorized';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {}) : {};

  const totalTasks = tasks.length;
  const activeTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalDeletedTasks = deletedTasks.length;

  const categories = [
    { id: 'work', name: 'Work', count: categoryCounts.work || 0, icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
      </svg>
    )},
    { id: 'personal', name: 'Personal', count: categoryCounts.personal || 0, icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    )},
    { id: 'shopping', name: 'Shopping', count: categoryCounts.shopping || 0, icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
    )},
  ];

  const activeCategories = categories.filter(category => category.count > 0);

  return (
    <>
      <button aria-label="Toggle sidebar"className="md:hidden fixed bottom-6 right-6 z-40 p-3 rounded-full bg-gray-800 text-white shadow-lg sidebar-toggle transition-transform"onClick={() => setIsMobileOpen(!isMobileOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">{isMobileOpen ? (<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />) : (<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />)}</svg>
      </button>
      <div className={`fixed inset-y-0 left-0 z-20 transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <aside className="w-64 h-full bg-white border-r border-gray-200 overflow-y-auto pt-16">
          <div className="py-5 px-3 h-full flex flex-col">
            <div className="flex items-center space-x-3 mb-6 md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="w-8 h-8 text-gray-800" viewBox="0 0 16 16">
                <path d="M4 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4m2.625.547a3 3 0 0 0-5.584.953H.5a.5.5 0 0 0 0 1h.541A3 3 0 0 0 7 8a1 1 0 0 1 2 0 3 3 0 0 0 5.959.5h.541a.5.5 0 0 0 0-1h-.541a3 3 0 0 0-5.584-.953A2 2 0 0 0 8 6c-.532 0-1.016.208-1.375.547M14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/>
              </svg>
              <h1 className="text-xl font-semibold text-gray-800">To-Do List nina Lim & Brillantes</h1>
            </div>
            <div className="px-2 py-2 mb-2">
              <h2 className="text-xs font-medium text-gray-600 uppercase tracking-wider">MAIN MENU</h2>
            </div>
            <ul className="space-y-2">
              <li>
                <div className="flex items-center p-2 text-base font-normal text-gray-500 rounded-lg cursor-not-allowed">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 stroke-current opacity-70">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                  </svg>
                  <span className="ml-3 font-semibold">Dashboard</span>
                </div>
              </li>
              <li>
                <Link to="/tasks" className={`flex items-center justify-between p-2 text-base font-normal rounded-lg hover:bg-gray-100 ${isActive('/tasks') && !selectedCategory ? 'bg-gray-100 text-gray-900' : 'text-gray-900'}`}onClick={() => setIsMobileOpen(false)}> 
                  <div className="flex items-center">
                    <svg className="w-6 h-6 stroke-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 7 2 2 4-4m-5-9v4h4V3h-4Z"/>
                    </svg>
                    <span className="ml-3 font-semibold">Tasks</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">{totalTasks}</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/trash" className={`flex items-center justify-between p-2 text-base font-normal rounded-lg hover:bg-gray-100 ${isActive('/trash') ? 'bg-gray-100 text-gray-900' : 'text-gray-900'}`}onClick={() => setIsMobileOpen(false)}>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    <span className="ml-3 font-semibold">Trash</span>
                  </div>
                  {totalDeletedTasks > 0 && (
                    <span className="bg-gray-800 text-white text-xs font-medium px-2 py-0.5 rounded-full">{totalDeletedTasks}</span>
                  )}
                </Link>
              </li>
              <li>
                <Link to="/settings"  className={`flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-100 ${isActive('/settings') ? 'bg-gray-100 text-gray-900' : 'text-gray-900'}`} onClick={() => setIsMobileOpen(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  <span className="ml-3 font-semibold">Settings</span>
                </Link>
              </li>
            </ul>
            <div className="px-2 py-0.5 mt-5 mb-3">
              <h2 className="text-xs font-medium  text-gray-600 uppercase tracking-wider">TASK CATEGORIES</h2>
            </div>
            <ul className="space-y-2">
              <li>
                <Link to="/tasks" className={`flex items-center justify-between p-2 text-base font-normal rounded-lg hover:bg-gray-100 ${isTasksPage && !selectedCategory ? "bg-gray-100 text-gray-900" : "text-gray-900"}`}onClick={() => setIsMobileOpen(false)}>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 stroke-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"/>
                    </svg>
                    <span className="ml-3 font-semibold">All Tasks</span>
                  </div>
                  <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">{totalTasks}</span>
                </Link>
              </li>
              <li>
                <Link to="/tasks?filter=active" className={`flex items-center justify-between p-2 text-base font-normal rounded-lg hover:bg-gray-100 ${location.search === '?filter=active' ? "bg-gray-800 text-white" : "text-gray-900"}`}onClick={() => setIsMobileOpen(false)}>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 stroke-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6h6m-9 6a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z"/>
                    </svg>
                    <span className="ml-3 font-semibold">Active</span>
                  </div>
                  <span className={`${location.search === '?filter=active' ? "bg-gray-700" : "bg-gray-200 text-gray-800"} text-xs font-medium px-2 py-0.5 rounded-full`}>{activeTasks}</span>
                </Link>
              </li>
              <li>
                <Link to="/tasks?filter=completed" className={`flex items-center justify-between p-2 text-base font-normal rounded-lg hover:bg-gray-100 ${location.search === '?filter=completed' ? "bg-gray-800 text-white" : "text-gray-900"}`}onClick={() => setIsMobileOpen(false)}>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 stroke-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 12 4.7 4.5 9.3-9"/>
                    </svg>
                    <span className="ml-3 font-semibold">Completed</span>
                  </div>
                  <span className={`${location.search === '?filter=completed' ? "bg-gray-700" : "bg-gray-200 text-gray-800"} text-xs font-medium px-2 py-0.5 rounded-full`}>{completedTasks}</span>
                </Link>
              </li>
              {activeCategories.map((category) => (
                <li key={category.id}>
                  <Link to={`/tasks?category=${category.id}`} className={`flex items-center justify-between p-2 text-base font-normal rounded-lg hover:bg-gray-100 ${isActiveCategoryFilter(category.id) ? 'bg-gray-800 text-white' : 'text-gray-900'}`}onClick={() => setIsMobileOpen(false)}>
                    <div className="flex items-center">{category.icon}<span className="ml-3 font-semibold">{category.name}</span></div>
                    <span className={`${isActiveCategoryFilter(category.id) ? "bg-gray-700" : "bg-gray-200 text-gray-800"} text-xs font-medium px-2 py-0.5 rounded-full`}>{category.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-4 px-2 text-xs text-gray-500">
              <p>Task Manager v1.2</p>
            </div>
          </div>
        </aside>
      </div>
      {isMobileOpen && (
        <div className="fixed inset-0 backdrop-blur-sm z-10 md:hidden"onClick={() => setIsMobileOpen(false)}/>
      )}
    </>
  );
};

export default Sidebar;
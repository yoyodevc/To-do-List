import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getTimeUntilDue } from "../../utils/dateUtils";

const CustomCheckbox = ({ checked, onChange, label }) => {
  return (
    <motion.div className="relative flex items-center justify-center"whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <div className={`w-5 h-5 flex items-center justify-center rounded border ${checked ? 'bg-gray-800 border-gray-800' : 'border-gray-300'} cursor-pointer`} onClick={onChange} role="checkbox"aria-checked={checked}tabIndex={0}aria-label={label}onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onChange();
          }
        }}>
        {checked && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <input type="checkbox"checked={checked}onChange={onChange}className="absolute opacity-0"aria-hidden="true"tabIndex={-1}/>
    </motion.div>
  );
};

const ViewTask = ({ 
  activeFilter, 
  setActiveFilter, 
  tasks, 
  allTasks,
  clearCompleted,
  toggleTaskCompletion,
  handleEditTask,
  handleDeleteTask
}) => {
  const [sortOrder, setSortOrder] = useState("nearest");
  const [confirmingClear, setConfirmingClear] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get("category");
  
  const activeCount = allTasks ? allTasks.filter((task) => !task.completed).length : 0;
  const completedCount = allTasks ? allTasks.filter((task) => task.completed).length : 0;

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortOrder === "nearest") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortOrder === "farthest") {
      return new Date(b.dueDate) - new Date(a.dueDate);
    } else if (sortOrder === "newest") {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    } else if (sortOrder === "oldest") {
      return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
    }
    return 0;
  });

  const handleClearConfirm = () => {
    clearCompleted();
    setConfirmingClear(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOptionsOpen && !event.target.closest('.options-dropdown')) {
        setIsOptionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOptionsOpen]);

  return (
    <motion.div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 min-h-[70vh] flex flex-col"initial={{ opacity: 0, y: 20 }}animate={{ opacity: 1, y: 0 }}transition={{ duration: 0.4 }}>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="grid grid-cols-3 gap-2 w-full sm:w-auto sm:min-w-[300px] lg:min-w-[400px]">
            <motion.button onClick={() => setActiveFilter("all")}className={`w-full px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-md ${activeFilter === "all" ? "bg-gray-800 text-white font-bold" : "bg-gray-100 font-semibold hover:bg-gray-200"}`}whileHover={{ scale: 1.03 }}whileTap={{ scale: 0.97 }}>
              <span className="flex items-center justify-center">All <span className="whitespace-nowrap ml-1">({allTasks ? allTasks.length : 0})</span></span>
            </motion.button>
            <motion.button onClick={() => setActiveFilter("active")}className={`w-full px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-md ${activeFilter === "active" ? "bg-gray-800 text-white font-bold" : "bg-gray-100 font-semibold hover:bg-gray-200"}`}whileHover={{ scale: 1.03 }}whileTap={{ scale: 0.97 }}>
              <span className="flex items-center justify-center">Active <span className="whitespace-nowrap ml-1">({activeCount})</span></span>
            </motion.button>
            <motion.button onClick={() => setActiveFilter("completed")}className={`w-full px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-md ${activeFilter === "completed" ? "bg-gray-800 text-white font-bold" : "bg-gray-100 font-semibold hover:bg-gray-200"}`}whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <span className="flex items-center justify-center">Completed <span className="whitespace-nowrap ml-1">({completedCount})</span></span>
            </motion.button>
          </div>
          {activeFilter === "completed" && completedCount > 0 && (
            <motion.div className="mt-3 sm:mt-4 ml-auto"initial={{ opacity: 0, y: -10 }}animate={{ opacity: 1, y: 0 }}exit={{ opacity: 0 }}transition={{ duration: 0.2 }}>
              <motion.button onClick={() => setConfirmingClear(true)}className="flex items-center bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-md shadow-sm"whileHover={{ scale: 1.03 }}whileTap={{ scale: 0.95 }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear All Completed
              </motion.button>
            </motion.div>
          )}
        </div> 
      </div>
      <AnimatePresence>
        {confirmingClear && (
          <motion.div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50"initial={{ opacity: 0 }}animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-lg max-w-md w-full p-4 sm:p-6 shadow-xl"initial={{ scale: 0.9, y: 20 }}animate={{ scale: 1, y: 0 }}exit={{ scale: 0.9, y: 20 }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Clear Completed Tasks?</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to move all completed tasks to trash? You can restore them from the trash later if needed.</p>
              <div className="flex justify-end gap-3">
                <motion.button onClick={() => setConfirmingClear(false)}className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"whileHover={{ scale: 1.05 }}whileTap={{ scale: 0.95 }}>Cancel</motion.button>
                <motion.button onClick={handleClearConfirm}className="px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"whileHover={{ scale: 1.05 }}whileTap={{ scale: 0.95 }}>Clear</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex-1 overflow-auto">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="min-w-full divide-y divide-gray-200 table-fixed sm:table-auto">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="w-12 sm:w-[8%] px-2 sm:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="sr-only">Status</span>
                </th>
                <th className="w-auto sm:w-[40%] lg:w-[30%] px-2 sm:px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task
                </th>
                <th className="hidden md:table-cell w-[25%] lg:w-[30%] px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="hidden lg:table-cell w-[20%] px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="w-20 sm:w-[15%] lg:w-[10%] px-2 sm:px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedTasks.length > 0 ? (
                <AnimatePresence mode="popLayout">
                  {sortedTasks.map((task, index) => {
                    const timeUntilDue = getTimeUntilDue(task.dueDate);
                    
                    return (
                      <motion.tr key={task.id} className="hover:bg-gray-50"initial={{ opacity: 0, y: 15 }}animate={{ opacity: 1, y: 0 }}exit={{ opacity: 0, y: -10, height: 0, overflow: 'hidden' }} transition={{ duration: 0.3, delay: index * 0.05 }}layout>
                        <td className="px-2 sm:px-3 py-3 whitespace-nowrap">
                          <CustomCheckbox checked={task.completed}onChange={() => toggleTaskCompletion(task.id)}label={`Mark "${task.name}" as ${task.completed ? 'incomplete' : 'complete'}`}/>
                        </td>
                        <td className="px-2 sm:px-3 py-3">
                          <div className="flex flex-col">
                            <div className={`text-sm sm:text-base font-medium ${task.completed ? "line-through text-gray-400" : "text-gray-900"}`}>{task.name}</div>
                            {task.description && (<div className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">{task.description}</div>)}
                            <div className="mt-1 md:hidden">
                              <span className={`inline-flex items-center justify-center text-xs leading-4 font-semibold rounded-full px-2 py-0.5 min-w-[70px] text-center
                                  ${task.category === "work" ? "bg-blue-100 text-blue-800" :
                                    task.category === "personal" ? "bg-purple-100 text-purple-800":
                                    task.category === "shopping" ? "bg-green-100 text-green-800" :
                                    task.category === "active" ? "bg-emerald-800 text-white" :
                                    task.category === "completed" ? "bg-gray-400 text-white" :
                                    "bg-gray-100 text-gray-800"}`}>
                                {task.category || "uncategorized"}
                              </span>
                            </div>
                            <div className="text-xs mt-1 md:hidden">
                              <span className={timeUntilDue.className}>{timeUntilDue.text}</span>
                            </div>
                          </div>
                        </td>
                        <td className="hidden md:table-cell px-3 py-3">
                          <div className="flex flex-col space-y-1">
                            <div className="text-xs sm:text-sm text-gray-500 flex flex-wrap items-center">
                              <span className="inline-block">Due: {new Date(task.dueDate).toLocaleDateString()} at{" "}{new Date(task.dueDate).toLocaleTimeString([], {hour: "numeric", minute: "2-digit"})}</span>
                              <span className={`ml-2 ${timeUntilDue.className}`}>({timeUntilDue.text})</span>
                            </div>
                            <div className="mt-1 lg:hidden">
                              <span className={`inline-flex items-center justify-center text-xs leading-4 font-semibold rounded-full px-2 py-0.5 min-w-[170px] text-center
                                  ${task.category === "work" ? "bg-blue-100 text-blue-800" :
                                    task.category === "personal" ? "bg-purple-100 text-purple-800":
                                    task.category === "shopping" ? "bg-green-100 text-green-800" :
                                    task.category === "active" ? "bg-emerald-800 text-white" :
                                    task.category === "completed" ? "bg-gray-400 text-white" :
                                    "bg-gray-100 text-gray-800"}`}>
                                {task.category || "uncategorized"}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="hidden lg:table-cell px-3 py-3">
                          <span className={`inline-flex items-center justify-center text-xs leading-4 font-semibold rounded-full px-2 py-0.5 min-w-[100px] text-center
                              ${task.category === "work" ? "bg-blue-100 text-blue-800" :
                                task.category === "personal" ? "bg-purple-100 text-purple-800":
                                task.category === "shopping" ? "bg-green-100 text-green-800" :
                                task.category === "active" ? "bg-emerald-800 text-white" :
                                task.category === "completed" ? "bg-gray-400 text-white" :
                                "bg-gray-100 text-gray-800"}`}>
                            {task.category || "uncategorized"}
                          </span>
                        </td>
                        <td className="px-2 sm:px-5 py-3 whitespace-nowrap text-right">
                          <div className="flex justify-end space-x-1 sm:space-x-3">
                            <motion.button onClick={() => handleEditTask(task)}className="text-gray-800 hover:text-blue-900 p-1 rounded-full" aria-label="Edit task" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                              </svg>
                            </motion.button>
                            <motion.button onClick={() => handleDeleteTask(task.id)}className="text-gray-800 hover:text-red-900 p-1 rounded-full"aria-label="Delete task"whileHover={{ scale: 1.2 }}whileTap={{ scale: 0.9 }}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              ) : (
                <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}transition={{ duration: 0.5 }}>
                  <td colSpan="5" className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center mt-10">
                      <motion.svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"  stroke="currentColor" className="w-16 h-16 text-green-500" initial={{ scale: 0.8, opacity: 0 }}animate={{ scale: 1, opacity: 1 }}transition={{ duration: 0.5, delay: 0.2 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </motion.svg>
                      <motion.p className="mt-6 text-lg font-semibold text-gray-800"initial={{ y: 10, opacity: 0 }}animate={{ y: 0, opacity: 1 }}transition={{ duration: 0.5, delay: 0.4 }}>You're all set!</motion.p>
                      <motion.p className="text-sm text-gray-500 mt-2"initial={{ y: 10, opacity: 0 }}animate={{ y: 0, opacity: 1 }}transition={{ duration: 0.5, delay: 0.6 }}>No tasks remaining in this {selectedCategory ? `${selectedCategory} category` : 'filter'}.</motion.p>
                    </div>
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default ViewTask;

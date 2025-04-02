import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AddModal = ({
  showModal,
  setShowModal,
  taskName,
  setTaskName,
  taskDescription,
  setTaskDescription,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  selectedCategory,
  setSelectedCategory,
  handleConfirmTask,
  handleCancel,  
  isEditing,
  modalError,
  setModalError
}) => {
  const modalRef = useRef(null);
  const nameInputRef = useRef(null);

  const categories = [
    { id: 'work', name: 'Work', icon: '💼', color: 'bg-blue-100 text-blue-800' },
    { id: 'personal', name: 'Personal', icon: '👤', color: 'bg-purple-100 text-purple-800' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️', color: 'bg-green-100 text-green-800' },

  ];

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && showModal) {
        handleCancel();
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showModal, handleCancel]);

  useEffect(() => {
    if (showModal && nameInputRef.current) {
      setTimeout(() => {
        nameInputRef.current.focus();
      }, 100);
    }
  }, [showModal]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target) && showModal) {
        handleCancel();
      }
    };
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal, handleCancel]);

  const handleSubmit = () => {
    if ((isEditing && !taskName.trim()) || (!isEditing && !taskName.trim())) {
      setModalError('Please enter a task name');
      return;
    }
    if (selectedTime && !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(selectedTime)) {
      setModalError('Please enter a valid time in HH:MM format');
      return;
    }
    setModalError('');
    handleConfirmTask();
  };

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-40 transition-opacity"initial={{ opacity: 0 }} animate={{ opacity: 1 }}exit={{ opacity: 0 }}transition={{ duration: 0.2 }}onClick={handleCancel}/>
            <div className="fixed inset-0 flex items-center justify-center z-50 p-3 sm:p-4 md:p-6">
              <motion.div ref={modalRef}className="bg-white rounded-2xl w-4/5 max-w-xxs sm:max-w-xs md:max-w-sm overflow-hidden shadow-2xl border border-gray-200"initial={{ opacity: 0, scale: 0.8, y: 20 }}animate={{ opacity: 1, scale: 1, y: 0 }}exit={{ opacity: 0, scale: 0.8, y: 20 }}transition={{ type: "spring", damping: 25, stiffness: 300 }}>
                <div className="p-3 border-b border-gray-200">
                  <h3 className="text-base font-semibold text-gray-900">{isEditing ? 'Edit Task Details' : 'Add Task Details'}</h3>
                  {!isEditing && <p className="text-sm text-gray-700">{taskName}</p>}
                </div>
                <div className="p-3 space-y-4">
                  {modalError && (
                    <motion.div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm"initial={{ opacity: 0, y: -10 }}animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>{modalError}</motion.div>)}
                  <div>
                    <label htmlFor="task-name" className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
                    <input id="task-name"ref={nameInputRef}type="text"value={taskName}onChange={(e) => setTaskName(e.target.value)}className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"placeholder="Enter task name"/>
                  </div>
                  <div>
                    <label htmlFor="task-description" className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                      <span>Description</span>
                      <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <textarea id="task-description"value={taskDescription}onChange={(e) => setTaskDescription(e.target.value)}className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"rows={3}placeholder="Add details..."/>
                  </div>
                  <div>
                    <label htmlFor="task-date" className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                      <span>Date</span>
                      <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <input id="task-date"type="date"value={selectedDate instanceof Date && !isNaN(selectedDate.getTime()) ? selectedDate.toISOString().split('T')[0]: new Date().toISOString().split('T')[0]}onChange={(e) => {const date = new Date(e.target.value);date.setHours(12, 0, 0, 0);setSelectedDate(date);}}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" min={new Date().toISOString().split('T')[0]}/>
                  </div>
                  <div>
                    <label htmlFor="task-time" className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                      <span>Time</span>
                      <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <input id="task-time" type="time"value={selectedTime}onChange={(e) => setSelectedTime(e.target.value)}className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"step="300"/>
                  </div>
                  <div>
                    <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                      <span>Category</span>
                      <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {categories.map((category) => (
                        <motion.button key={category.id}type="button"onClick={() => setSelectedCategory(category.id)}className={`flex items-center justify-center px-2 sm:px-3 py-2 rounded-full border text-xs sm:text-sm transition-colors
                            ${selectedCategory === category.id? `${category.color} border-transparent font-medium`: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`} whileHover={{ scale: 1.05 }}whileTap={{ scale: 0.95 }}>
                          <span className="mr-1">{category.icon}</span>
                          {category.name}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t border-gray-200 flex justify-end space-x-2">
                  <motion.button type="button"onClick={handleCancel}className="px-3 py-1.5 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"whileHover={{ scale: 1.05 }}whileTap={{ scale: 0.95 }}>Cancel</motion.button>
                  <motion.button type="button"onClick={handleSubmit}className="px-3 py-1.5 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"whileHover={{ scale: 1.05 }}whileTap={{ scale: 0.95 }}>{isEditing ? 'Update Task' : 'Save Task'}</motion.button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddModal;
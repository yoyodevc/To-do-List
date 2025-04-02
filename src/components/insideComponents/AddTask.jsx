import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const AddTask = ({
  taskName,
  setTaskName,
  error,
  setError,
  handleAddTask,
  handleQuickAdd
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleQuickAdd ? handleQuickAdd(taskName) : handleAddTask();
    }
  };

  const handleChange = (e) => {
    setTaskName(e.target.value);
    if (error) {
      setError('');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.03,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.97,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 mb-4 transition-all hover:shadow-md"variants={containerVariants}initial="hidden"animate="visible">
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-grow">
            <input ref={inputRef}type="text"value={taskName}onChange={handleChange}onKeyDown={handleKeyDown}placeholder="What needs to be done? (Press Enter to add quickly)"
            className={`w-full pl-4 pr-10 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-gray-500'} focus:border-transparent text-gray-800`}aria-label="Task name"aria-invalid={error ? "true" : "false"}/>
            {taskName && (
              <button type="button"onClick={() => setTaskName('')}className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"aria-label="Clear input">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
          <div className="flex flex-row w-full sm:w-auto gap-2">
            <motion.button onClick={() => handleQuickAdd(taskName)}whileHover="hover"whileTap="tap"variants={buttonVariants}className="flex-1 sm:flex-initial px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="hidden xs:inline">Add Now</span>
            </motion.button>
            <motion.button onClick={handleAddTask}whileHover="hover"whileTap="tap"variants={buttonVariants}className="flex-1 sm:flex-initial px-4 py-2 bg-white border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span className="hidden xs:inline">Details</span>
            </motion.button>
          </div>
        </div>
        {error && (<motion.p className="text-red-500 text-sm pl-1" role="alert"initial={{ opacity: 0, height: 0 }}animate={{ opacity: 1, height: 'auto' }}exit={{ opacity: 0, height: 0 }}>{error}</motion.p>)}
      </div>
    </motion.div>
  );
};

export default AddTask;
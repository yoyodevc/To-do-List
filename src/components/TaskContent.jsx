import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AddModal from './insideComponents/AddModal';
import AddTask from './insideComponents/AddTask';
import ViewTask from './insideComponents/ViewTask';
import { getDefaultTime } from '../utils/dateUtils';

const TaskContent = ({ 
  tasks, 
  addTask, 
  updateTask, 
  toggleTaskCompletion, 
  moveToTrash, 
  clearCompletedTasks 
}) => {
  const [taskName, setTaskName] = useState('');
  const [error, setError] = useState('');
  const [modalError, setModalError] = useState(''); 
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(getDefaultTime());
  const [selectedCategory, setSelectedCategory] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState(''); 
  const [filteredTasks, setFilteredTasks] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryFilter = searchParams.get("category");
  const statusFilter = searchParams.get("filter");

  useEffect(() => {
    if (statusFilter === 'active') {
      setActiveFilter('active');
    } else if (statusFilter === 'completed') {
      setActiveFilter('completed');
    } else if (!statusFilter) {
      setActiveFilter('all');
    }
  }, [statusFilter]);

  useEffect(() => {
    if (!Array.isArray(tasks)) {
      setFilteredTasks([]);
      return;
    }
    let result = [...tasks];
    if (categoryFilter) {
      result = result.filter(task => task.category === categoryFilter);
    }
    if (activeFilter === 'active' || statusFilter === 'active') {
      result = result.filter(task => !task.completed);
    } else if (activeFilter === 'completed' || statusFilter === 'completed') {
      result = result.filter(task => task.completed);
    }
    
    setFilteredTasks(result);
  }, [tasks, categoryFilter, statusFilter, activeFilter]);

  const handleQuickAdd = (name) => {
    if (!name.trim()) {
      setError('Please enter a task name');
      return;
    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(12, 0, 0, 0);
    
    const newTask = {
      name: name.trim(),
      description: '',
      dueDate: tomorrow,
      time: getDefaultTime(),
      category: 'uncategorized',
      completed: false
    };
    
    addTask(newTask);
    setTaskName('');
    setError('');
  };
  
  const handleAddTask = () => {
    if (!taskName.trim()) {
      setError('Please enter a task name');
      return;
    }
    setSelectedTime(getDefaultTime());
    setShowModal(true);
  };

  const handleConfirmTask = () => {
    let hours = 0, minutes = 0;
    try {
      const timeParts = selectedTime.split(':');
      if (timeParts.length === 2) {
        hours = parseInt(timeParts[0], 10);
        minutes = parseInt(timeParts[1], 10);
        if (isNaN(hours) || isNaN(minutes)) {
          hours = 0;
          minutes = 0;
        }
      }
    } catch (e) {
      console.error("Time parsing error:", e);
      hours = new Date().getHours() + 1;
      minutes = 0;
    }
    
    let dueDate;
    try {
      if (selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
        dueDate = new Date(selectedDate);
      } else {
        dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 1);
      }
      dueDate.setHours(hours, minutes, 0, 0);
    } catch (e) {
      console.error("Date handling error:", e);
      dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 1);
    }
    if (editingTask) {
      updateTask(editingTask.id, {
        name: editingTaskName,
        description: taskDescription,
        dueDate: dueDate,
        time: selectedTime,
        category: selectedCategory || 'uncategorized'
      });
    } else {
      const newTask = {
        name: taskName,
        description: taskDescription,
        dueDate: dueDate, 
        time: selectedTime, 
        category: selectedCategory || 'uncategorized',
        completed: false
      };
      addTask(newTask);
    }
    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    const now = new Date();
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    now.setHours(now.getHours() + 1);
  
    setTaskName('');
    setEditingTaskName('');
    setTaskDescription('');
    setSelectedDate(new Date()); 
    setSelectedTime(now.toTimeString().slice(0, 5)); 
    setSelectedCategory('');
    setError('');
    setEditingTask(null);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setEditingTaskName(task.name);
    setTaskDescription(task.description || '');
    let taskDate;
    try {
      taskDate = new Date(task.dueDate);
      taskDate.setHours(12, 0, 0, 0);
      if (isNaN(taskDate.getTime())) {
        taskDate = new Date();
      }
    } catch (e) {
      taskDate = new Date();
    }
    setSelectedDate(taskDate);
    setSelectedTime(task.time || getDefaultTime());
    setSelectedCategory(task.category || '');
    setShowModal(true);
  };

  const handleCancel = () => {
    resetForm();
    setEditingTask(null);
    setShowModal(false);
  };

  const handleDeleteTask = (taskId) => {
    moveToTrash(taskId);
  };

  const activeCount = filteredTasks.filter(task => !task.completed).length;
  const completedCount = filteredTasks.filter(task => task.completed).length;

  return (
    <motion.main className="flex-1 overflow-y-auto bg-gray-50 min-h-screen transition-all duration-300 ml-0 md:ml-64"initial={{ opacity: 0 }}animate={{ opacity: 1 }}transition={{ duration: 0.4 }}>
      <div className="p-3 sm:p-6 mx-auto max-w-6xl">
        <motion.div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6"initial={{ y: -20, opacity: 0 }}animate={{ y: 0, opacity: 1 }}transition={{ delay: 0.1, duration: 0.4 }}>
          <div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-1">
              {categoryFilter ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Tasks` : statusFilter? `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} Tasks`: 'All Tasks'}</h2>
            <p className="text-xs sm:text-sm text-gray-500">{tasks && tasks.filter(task => !task.completed).length} active, {tasks && tasks.filter(task => task.completed).length} completed</p>
          </div>
          <div className="w-full sm:w-1/2 lg:w-2/5">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs sm:text-sm font-medium text-gray-800">Progress</span>
              <span className="text-xs sm:text-sm font-medium text-gray-800">{Array.isArray(tasks) && tasks.length > 0 ? Math.round((tasks.filter(task => task.completed).length / tasks.length) * 100) : 0}%</span>
            </div>
            <div className="relative w-full h-2 sm:h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div className="absolute top-0 left-0 h-full bg-green-600 rounded-full"initial={{ width: "0%" }}animate={{ width: `${Array.isArray(tasks) && 
                tasks.length > 0 ? (tasks.filter(task => task.completed).length / tasks.length) * 100 : 0}%` }}transition={{ duration: 0.8, ease: "easeOut" }}style={{ minWidth: '0.5rem' }}/>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <AddTask
            taskName={taskName} 
            setTaskName={setTaskName}
            error={error}
            setError={setError}
            handleAddTask={handleAddTask}
            handleQuickAdd={handleQuickAdd}
          />
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.4 }} className="pb-16 sm:pb-0">

         <ViewTask
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            tasks={filteredTasks}
            allTasks={tasks}
            toggleTaskCompletion={toggleTaskCompletion}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
            clearCompleted={clearCompletedTasks}
          />
        </motion.div>
        
        <AnimatePresence>
          {showModal && (
            <AddModal
              showModal={showModal}
              setShowModal={setShowModal}
              taskName={editingTask ? editingTaskName : taskName}
              setTaskName={editingTask ? setEditingTaskName : setTaskName}
              taskDescription={taskDescription}
              setTaskDescription={setTaskDescription}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              handleConfirmTask={handleConfirmTask}
              isEditing={!!editingTask}
              handleCancel={handleCancel}
              modalError={modalError} 
              setModalError={setModalError}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
};

export default TaskContent;
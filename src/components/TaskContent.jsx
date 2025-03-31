import React, { useState } from 'react';
import AddModal from './insideComponents/AddModal';
import AddTask from './insideComponents/AddTask';
import ViewTask from './insideComponents/ViewTask';

const getDefaultTime = () => {
  const now = new Date();
  now.setHours(now.getHours() + 1, 0, 0, 0); 
  return now.toTimeString().slice(0, 5);
};

const Content = ({ tasks, setTasks }) => {
  const [taskName, setTaskName] = useState('');
  const [error, setError] = useState('');
  const [modalError, setModalError] = useState(''); 
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(getDefaultTime());
  const [selectedCategory, setSelectedCategory] = useState('null');
  const [taskDescription, setTaskDescription] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState(''); 

  const handleAddTask = () => {
    if (!taskName.trim()) {
      setError('Please enter a task name');
      return;
    }
    setSelectedTime(getDefaultTime());
    setShowModal(true);
  };

  const handleConfirmTask = () => {
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const dueDate = new Date(selectedDate);
    dueDate.setHours(hours, minutes, 0, 0);
  
    if (editingTask) {
      setTasks(tasks.map(task => 
        task.id === editingTask.id ? {
          ...task,
          name: editingTaskName,
          description: taskDescription,
          dueDate: dueDate,
          time: selectedTime,
          category: selectedCategory
        } : task
      ));
    } else {
      const newTask = {
        id: Date.now(),
        name: taskName,
        description: taskDescription,
        dueDate: dueDate, 
        time: selectedTime, 
        category: selectedCategory,
        completed: false
      };
      setTasks([...tasks, newTask]);
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
    setSelectedCategory('null');
    setError('');
    setEditingTask(null);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setEditingTaskName(task.name);
    setTaskDescription(task.description || '');
    setSelectedDate(new Date(task.dueDate));
    setSelectedTime(task.time);
    setSelectedCategory(task.category);
    setShowModal(true);
  };

  const handleCancel = () => {
    resetForm();
    setEditingTask(null);
    setShowModal(false);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'active') return !task.completed;
    if (activeFilter === 'completed') return task.completed;
    return true; 
  });

  const activeCount = tasks.filter(task => !task.completed).length;
  const completedCount = tasks.filter(task => task.completed).length;

  return (
      <main className="flex-1 overflow-y-auto bg-gray-50 pl-0 sm:pl-64 min-h-screen">
        <div className="p-6 ml-[5%] mr-[8%] h-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">Tasks</h2>
              <p className="text-sm text-gray-500">{activeCount} active, {completedCount} completed</p>
            </div>
            <div className="w-full sm:w-[60%] md:w-[55%] lg:w-[50%] xl:w-[45%]">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium text-gray-800">Progress</span>
                <span className="text-sm font-medium text-gray-800">{tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0}%</span>
              </div>
              <div className="relative w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-green-600 rounded-full transition-all duration-500 ease-out"style={{width: `${tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0}%`,minWidth: '0.5rem'}}/>
              </div>
            </div>
          </div>

        <AddTask
          taskName={taskName} 
          setTaskName={setTaskName}
          error={error}
          setError={setError}
          handleAddTask={handleAddTask}
        />

        <ViewTask
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          tasks={filteredTasks}
          toggleTaskCompletion={toggleTaskCompletion}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
          clearCompleted={clearCompleted}
        />

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
      </div>
    </main>
  );
};

export default Content;
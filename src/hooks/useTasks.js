import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TASKS_KEY = 'todoAppTasks';
const DELETED_TASKS_KEY = 'todoAppDeletedTasks';

const useTasks = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(TASKS_KEY);
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      return [];
    }
  });

  const [deletedTasks, setDeletedTasks] = useState(() => {
    try {
      const savedDeletedTasks = localStorage.getItem(DELETED_TASKS_KEY);
      return savedDeletedTasks ? JSON.parse(savedDeletedTasks) : [];
    } catch (error) {
      console.error('Error loading deleted tasks from localStorage:', error);
      return [];
    }
  });

//save
  useEffect(() => {
    try {
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(DELETED_TASKS_KEY, JSON.stringify(deletedTasks));
    } catch (error) {
      console.error('Error saving deleted tasks to localStorage:', error);
    }
  }, [deletedTasks]);

  //add task
  const addTask = (taskData) => {
    const newTask = {
      id: uuidv4(),
      ...taskData,
      createdAt: new Date().toISOString(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  //completed
  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  //editing
  const updateTask = (taskId, updatedData) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedData } : task
      )
    );
  };


  const moveToTrash = (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    
    if (taskToDelete) {
      const deletedTask = {
        ...taskToDelete,
        deletedAt: new Date().toISOString(),
      };
      setDeletedTasks((prevDeletedTasks) => [...prevDeletedTasks, deletedTask]);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }
  };

  const restoreFromTrash = (taskId) => {
    const taskToRestore = deletedTasks.find((task) => task.id === taskId);
    if (taskToRestore) {
      const { deletedAt, ...restoredTask } = taskToRestore;
      setTasks((prevTasks) => [...prevTasks, restoredTask]);
      setDeletedTasks((prevDeletedTasks) =>
        prevDeletedTasks.filter((task) => task.id !== taskId)
      );
    }
  };

  const permanentlyDeleteTask = (taskId) => {
    setDeletedTasks((prevDeletedTasks) =>
      prevDeletedTasks.filter((task) => task.id !== taskId)
    );
  };

  //delete all trash
  const emptyTrash = () => {
    setDeletedTasks([]);
  };

  const clearCompletedTasks = () => {
    const completedTasks = tasks.filter((task) => task.completed);
    const newDeletedTasks = completedTasks.map((task) => ({
      ...task,
      deletedAt: new Date().toISOString(),
    }));
    
    setDeletedTasks((prevDeletedTasks) => [...prevDeletedTasks, ...newDeletedTasks]);
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  const getTaskStats = () => {
    const totalCount = tasks.length;
    const completedCount = tasks.filter(task => task.completed).length;
    const activeCount = totalCount - completedCount;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dueTodayCount = tasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate.getTime() === today.getTime() && !task.completed;
    }).length;

    const categoryCounts = tasks.reduce((acc, task) => {
      const category = task.category || 'uncategorized';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    return {
      total: totalCount,
      completed: completedCount,
      active: activeCount,
      dueToday: dueTodayCount,
      categories: categoryCounts,
      trashCount: deletedTasks.length
    };
  };

  return {
    tasks,
    deletedTasks,
    addTask,
    toggleTaskCompletion,
    updateTask,
    moveToTrash,
    restoreFromTrash,
    permanentlyDeleteTask,
    emptyTrash,
    clearCompletedTasks,
    getTaskStats,
  };
};

export default useTasks;
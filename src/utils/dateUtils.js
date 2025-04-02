/**
 * Get a default time value set to one hour from now
 * @returns {string} Time in "HH:MM" format
 */
export const getDefaultTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1, 0, 0, 0); 
    return now.toTimeString().slice(0, 5);
  };
  
  /**
   * Format a date for display
   * @param {Date|string} date - The date to format
   * @param {Object} options - Formatting options
   * @returns {string} Formatted date string
   */
  export const formatDate = (date, options = {}) => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
        return 'Invalid date';
      }
      
      const defaultOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: undefined,
      };
      
      // If date is not in current year, show the year
      const currentYear = new Date().getFullYear();
      if (dateObj.getFullYear() !== currentYear) {
        defaultOptions.year = 'numeric';
      }
      
      const mergedOptions = { ...defaultOptions, ...options };
      return dateObj.toLocaleDateString(undefined, mergedOptions);
    } catch (e) {
      console.error('Error formatting date:', e);
      return 'Invalid date';
    }
  };
  
  /**
   * Format a time for display
   * @param {Date|string} date - The date with time to format
   * @returns {string} Formatted time string
   */
  export const formatTime = (date) => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
        return 'Invalid time';
      }
      
      return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      console.error('Error formatting time:', e);
      return 'Invalid time';
    }
  };
  
  /**
   * Calculate and format the time until a due date
   * @param {Date|string} dueDate - The due date
   * @returns {Object} Object with text and CSS class name
   */
  export const getTimeUntilDue = (dueDate) => {
    try {
      const now = new Date();
      let due;
      
      // Handle possible invalid date
      if (typeof dueDate === 'string') {
        due = new Date(dueDate);
      } else if (dueDate instanceof Date) {
        due = dueDate;
      } else {
        // Default to tomorrow if invalid
        due = new Date();
        due.setDate(due.getDate() + 1);
      }
      
      // Check if the date is valid
      if (isNaN(due.getTime())) {
        // Default to tomorrow if invalid
        due = new Date();
        due.setDate(due.getDate() + 1);
      }
      
      const diffMs = due - now;
      
      // If already past due
      if (diffMs < 0) {
        return { text: "Overdue", className: "text-red-600 font-medium" };
      }
      
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      if (diffDays > 7) {
        return { text: `In ${diffDays} days`, className: "text-gray-600" };
      } else if (diffDays > 0) {
        return { text: `In ${diffDays} day${diffDays > 1 ? 's' : ''}`, className: "text-gray-800" };
      } else if (diffHours > 0) {
        return { text: `In ${diffHours} hour${diffHours > 1 ? 's' : ''}`, className: "text-yellow-600 font-medium" };
      } else {
        return { text: "Due soon", className: "text-red-600 font-medium" };
      }
    } catch (e) {
      console.error('Error calculating time until due:', e);
      return { text: "Unknown", className: "text-gray-600" };
    }
  };
  
  /**
   * Format a date for input element (YYYY-MM-DD)
   * @param {Date} date - The date to format
   * @returns {string} Formatted date string for input
   */
  export const formatDateForInput = (date) => {
    try {
      const d = new Date(date);
      
      if (!(d instanceof Date) || isNaN(d.getTime())) {
        return new Date().toISOString().split('T')[0];
      }
      
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const year = d.getFullYear();
      return `${year}-${month}-${day}`;
    } catch (e) {
      console.error('Error formatting date for input:', e);
      return new Date().toISOString().split('T')[0];
    }
  };
  
  /**
   * Get relative time (e.g., "2 hours ago", "just now")
   * @param {Date|string} date - The date to calculate relative time for
   * @returns {string} Relative time string
   */
  export const getRelativeTime = (date) => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
        return 'Unknown time';
      }
      
      const now = new Date();
      const diffMs = now - dateObj;
      const diffSecs = Math.floor(diffMs / 1000);
      const diffMins = Math.floor(diffSecs / 60);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);
  
      if (diffDays > 30) {
        return formatDate(dateObj, { year: 'numeric' });
      } else if (diffDays > 0) {
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
      } else if (diffHours > 0) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      } else if (diffMins > 0) {
        return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
      } else {
        return 'Just now';
      }
    } catch (e) {
      console.error('Error calculating relative time:', e);
      return 'Unknown time';
    }
  };
  
  /**
   * Group tasks by due date categories
   * @param {Array} tasks - Array of tasks
   * @returns {Object} Tasks grouped by date categories
   */
  export const groupTasksByDueDate = (tasks) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const endOfWeek = new Date(today);
      endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
      
      return tasks.reduce((groups, task) => {
        try {
          const dueDate = new Date(task.dueDate);
          
          // Check if date is valid
          if (isNaN(dueDate.getTime())) {
            groups.unscheduled.push(task);
            return groups;
          }
          
          dueDate.setHours(0, 0, 0, 0);
          
          if (dueDate < today) {
            groups.overdue.push(task);
          } else if (dueDate.getTime() === today.getTime()) {
            groups.today.push(task);
          } else if (dueDate.getTime() === tomorrow.getTime()) {
            groups.tomorrow.push(task);
          } else if (dueDate <= endOfWeek) {
            groups.thisWeek.push(task);
          } else {
            groups.later.push(task);
          }
        } catch (e) {
          console.error('Error grouping task:', e);
          groups.unscheduled.push(task);
        }
        
        return groups;
      }, {
        overdue: [],
        today: [],
        tomorrow: [],
        thisWeek: [],
        later: [],
        unscheduled: []
      });
    } catch (e) {
      console.error('Error grouping tasks by due date:', e);
      return {
        overdue: [],
        today: [],
        tomorrow: [],
        thisWeek: [],
        later: [],
        unscheduled: tasks
      };
    }
  };
  
  /**
   * Get the number of days between two dates
   * @param {Date|string} dateA - First date
   * @param {Date|string} dateB - Second date
   * @returns {number} Number of days
   */
  export const getDaysBetween = (dateA, dateB) => {
    try {
      const a = new Date(dateA);
      const b = new Date(dateB);
      
      // Check if both dates are valid
      if (isNaN(a.getTime()) || isNaN(b.getTime())) {
        return 0;
      }
      
      // Set to noon to avoid daylight saving time issues
      a.setHours(12, 0, 0, 0);
      b.setHours(12, 0, 0, 0);
      
      // Get the difference in milliseconds
      const diffMs = Math.abs(a - b);
      
      // Convert to days
      return Math.round(diffMs / (1000 * 60 * 60 * 24));
    } catch (e) {
      console.error('Error calculating days between dates:', e);
      return 0;
    }
  };
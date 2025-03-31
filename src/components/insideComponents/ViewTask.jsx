import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const ViewTask = ({ 
  activeFilter, 
  setActiveFilter, 
  tasks, 
  clearCompleted,
  toggleTaskCompletion,
  handleEditTask,
  handleDeleteTask
}) => {
  const location = useLocation();

  const [sortOrder, setSortOrder] = useState("nearest");
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get("category");
  const filteredTasks = selectedCategory 
    ? tasks.filter((task) => task.category === selectedCategory) 
    : tasks;

  const activeCount = filteredTasks.filter((task) => !task.completed).length;
  const completedCount = filteredTasks.filter((task) => task.completed).length;

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    return sortOrder === "nearest"
      ? new Date(a.dueDate) - new Date(b.dueDate)
      : new Date(b.dueDate) - new Date(a.dueDate);
  });

  return (
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 min-h-[70vh] flex flex-col">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <div className="flex flex-wrap justify-center sm:justify-normal gap-2 w-full sm:w-auto">
            <button onClick={() => setActiveFilter("all")}className={`flex-1 sm:flex-auto px-3 py-2 text-sm rounded-md ${activeFilter === "all" ? "bg-gray-100 font-bold" : "font-semibold hover:bg-gray-100"}`}>All ({filteredTasks.length})</button>
            <button onClick={() => setActiveFilter("active")} className={`flex-1 sm:flex-auto px-3 py-2 text-sm rounded-md ${activeFilter === "active" ? "bg-gray-100 font-bold" : "font-semibold hover:bg-gray-100"}`}>Active ({activeCount})
            </button>
            <button onClick={() => setActiveFilter("completed")} className={`flex-1 sm:flex-auto px-3 py-2 text-sm rounded-md ${activeFilter === "completed" ? "bg-gray-100 font-bold" : "font-semibold hover:bg-gray-100"}`}>Completed ({completedCount})
            </button>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-normal gap-3 gap-x-4 w-full sm:w-auto pr-3">
            {completedCount > 0 && (
              <button onClick={clearCompleted}className="px-3 py-2 text-sm font-semibold text-gray-800 hover:text-red-500 rounded-md transition-colors whitespace-nowrap">Clear Completed</button>
            )}
            <div className="relative w-full max-w-[162px]">
              <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder} className="w-full pl-4 pr-3 py-2 text-sm font-semibold bg-gray-50 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-gray-500 focus:outline-none">
                <option value="nearest">Nearest Due Date</option>
                <option value="farthest">Farthest Due Date</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* table headers */}
      {filteredTasks.length > 0 ? (
        <div className="flex-1 overflow-auto">
          <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
                <tr>
                <th className="w-[27%] px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Status
                </th>
                <th className="w-[30%] px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Task
                </th>
                <th className="w-[33%] px-3 sm:px-14 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Details
                </th>
                <th className="w-[25%] px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {sortedTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-8 py-3 whitespace-nowrap">
                    <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(task.id)} className="h-4 w-4 sm:h-5 sm:w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                    </td>
                    <td className="px-3 sm:px-2 py-3">
                    <div className="flex flex-col">
                        <div className={`text-sm sm:text-base font-medium ${task.completed ? "line-through text-gray-400" : "text-gray-900"}`}>{task.name}</div>
                        {task.description && (
                        <div className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">{task.description}</div>)}
                    </div>
                    </td>
                    <td className="px-3 sm:px-5 py-3">
                    <div className="flex flex-col space-y-1">
                        <div className="text-xs sm:text-sm text-gray-500">
                        {new Date(task.dueDate).toLocaleDateString()} at{" "}
                        {new Date(task.dueDate).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                        </div>
                        <div className="mt-1">
                        <span className={`inline-flex items-center justify-center text-xs leading-4 font-semibold rounded-full px-2 py-0.5 w-34 ${
                            task.category === "work"
                            ? "bg-blue-100 text-blue-800"
                            : task.category === "personal"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-green-100 text-green-800"
                        }`}>{task.category}
                        </span>
                        </div>
                    </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                    <div className="flex space-x-2 sm:space-x-3">
                        <button onClick={() => handleEditTask(task)} className="text-gray-800 hover:text-blue-900 p-1 rounded-full"aria-label="Edit task">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        </button>
                        <button onClick={() => handleDeleteTask(task.id)} className="text-gray-800 hover:text-red-900 p-1 rounded-full"aria-label="Delete task">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                        </svg>
                        </button>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-6 max-w-xs">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16 text-green-500 mx-auto">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <p className="mt-4 text-lg font-semibold text-gray-800">You're all set!</p>
          <p className="text-sm text-gray-500 mt-1">No tasks remaining in this category.</p>
        </div>
      </div>
      )}
    </div>
  );
};

export default ViewTask;
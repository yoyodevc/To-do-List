import React, { useState } from 'react';

const TrashContent = ({ deletedTasks, restoreFromTrash, permanentlyDeleteTask, emptyTrash }) => {
  const [sortOrder, setSortOrder] = useState("newest");
  const [confirmingEmpty, setConfirmingEmpty] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(null);

  const sortedTasks = [...deletedTasks].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.deletedAt) - new Date(a.deletedAt);
    } else if (sortOrder === "oldest") {
      return new Date(a.deletedAt) - new Date(b.deletedAt);
    } else if (sortOrder === "alphabetical") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const formatDeleteDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffMins > 0) {
      return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  const handleEmptyTrashConfirm = () => {
    emptyTrash();
    setConfirmingEmpty(false);
  };

  const handleDeleteConfirm = (taskId) => {
    permanentlyDeleteTask(taskId);
    setConfirmingDelete(null);
  };

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 pl-0 sm:pl-64 min-h-screen transition-all duration-300">
      <div className="p-4 sm:p-6 mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-1">Trash</h2>
            <p className="text-sm text-gray-500">
              {deletedTasks.length} deleted item{deletedTasks.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <select onChange={(e) => setSortOrder(e.target.value)}value={sortOrder}className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
            {deletedTasks.length > 0 && (
              <button onClick={() => setConfirmingEmpty(true)}className="px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2">Empty Trash</button>
            )}
          </div>
        </div>
        {confirmingEmpty && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Empty Trash?</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to permanently delete all items in the trash? This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setConfirmingEmpty(false)}className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">Cancel</button>
                <button onClick={handleEmptyTrashConfirm}className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">Empty
                </button>
              </div>
            </div>
          </div>
        )}
        {confirmingDelete && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Permanently?</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to permanently delete "{confirmingDelete.name}"? This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setConfirmingDelete(null)}className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">Cancel</button>
                <button onClick={() => handleDeleteConfirm(confirmingDelete.id)}className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">Delete</button>
              </div>
            </div>
          </div>
        )}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 min-h-[70vh]">
          {sortedTasks.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Task
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Due Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deleted
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedTasks.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">{task.name}</div>
                          {task.description && (
                            <div className="text-xs text-gray-500 mt-1 line-clamp-1">{task.description}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                        <span className={`inline-flex items-center justify-center text-xs leading-4 font-semibold rounded-full px-2 py-0.5 min-w-[80px] text-center
                          ${task.category === "work" ? "bg-blue-100 text-blue-800" : 
                            task.category === "personal" ? "bg-purple-100 text-purple-800" : 
                            task.category === "shopping" ? "bg-green-100 text-green-800" : 
                            "bg-gray-100 text-gray-800"}`}>
                          {task.category || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                        {new Date(task.dueDate).toLocaleDateString()} at{" "}
                        {new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDeleteDate(task.deletedAt)}
                        </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button onClick={() => restoreFromTrash(task.id)}className="text-blue-600 hover:text-blue-900 focus:outline-none focus:underline" aria-label="Restore task">Restore</button>
                          <button onClick={() => setConfirmingDelete(task)}className="text-red-600 hover:text-red-900 focus:outline-none focus:underline"aria-label="Delete task permanently">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Trash is empty</h3>
              <p className="mt-1 text-sm text-gray-500">Items you delete will appear here for 30 days before being permanently removed.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default TrashContent;
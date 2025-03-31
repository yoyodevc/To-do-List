import React from 'react';

const AddTask = ({
  taskName,
  setTaskName,
  error,
  setError,
  handleAddTask,
  isEditing,
  handleUpdateTask
}) => {
  const handleSubmit = () => {
    if (isEditing) {
      handleUpdateTask();
    } else {
      handleAddTask();
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row gap-2">
          <input type="text" value={taskName} onChange={(e) => {setTaskName(e.target.value); if (error) setError('');}} 
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} placeholder="Input task name..." className={`w-full px-3 py-2 sm:px-4 
          sm:py-2 border rounded-lg focus:outline-none focus:ring-2 ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-gray-500'} focus:border-transparent`}/>
          <button onClick={handleSubmit} className="w-full sm:w-auto px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 whitespace-nowrap">
            {isEditing ? 'Update' : 'Add'}</button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default AddTask;
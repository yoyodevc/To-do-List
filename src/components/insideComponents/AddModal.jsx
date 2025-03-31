import React from 'react';

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
  const categories = [
    { id: 'work', name: 'Work', icon: '💼', color: 'bg-blue-100 text-blue-800' },
    { id: 'personal', name: 'Personal', icon: '👤', color: 'bg-purple-100 text-purple-800' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️', color: 'bg-green-100 text-green-800' },
  ];

  const handleSubmit = () => {
    if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(selectedTime)) {
      setModalError('Please enter a valid time in HH:MM format');
      return;
    }
    if (isEditing && !taskName.trim()) {
      setModalError('Please enter a task name');
      return;
    }

    const now = new Date();
    const selectedDateTime = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(':').map(Number);
    
    selectedDateTime.setHours(hours, minutes, 0, 0);
    if (selectedDateTime < now) {
      setModalError('You cannot set a task in the past.');
      return;
    }
    setModalError('');
    handleConfirmTask();
  };

  return (
    <>
      {showModal && (
        <>
          <div className="fixed inset-0 backdrop-blur-xs bg-white/10 z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {isEditing ? 'Edit Task Details' : 'Add Task Details'}
                </h3>
                {!isEditing && <p className="text-md text-gray-700">{taskName}</p>}
              </div>
              <div className="p-4 space-y-6">
                {modalError && <p className="text-red-500 text-sm">{modalError}</p>}
                {isEditing && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
                    <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 
                    rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" placeholder="Enter task name"/>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" rows={3} placeholder="Add details..."/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input  type="date" value={selectedDate.toISOString().split('T')[0]}  onChange={(e) => setSelectedDate(new Date(e.target.value))} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"min={new Date().toISOString().split('T')[0]}/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input type="time"  value={selectedTime}  onChange={(e) => setSelectedTime(e.target.value)}  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"step="300"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categories.map((category) => (
                      <button 
                        key={category.id} 
                        onClick={() => setSelectedCategory(category.id)} 
                        className={`flex items-center justify-center px-3 py-2 rounded-full border text-sm 
                          ${selectedCategory === category.id ? `${category.color} border-transparent font-medium` : 'bg-white text-gray-700 border-gray-300'}`}
                      >
                        <span className="mr-1">{category.icon}</span>
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
                <button onClick={handleCancel} className="px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Cancel</button>
                <button onClick={handleSubmit} className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">{isEditing ? 'Update Task' : 'Save Task'}</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddModal;
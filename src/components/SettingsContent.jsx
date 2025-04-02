import React, { useState } from 'react';

const SettingsContent = () => {
  const [theme, setTheme] = useState('light');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [autoArchive, setAutoArchive] = useState(7);
  
  const saveSettings = () => {
    alert('Settings saved successfully!');
  };

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 pl-0 sm:pl-64 min-h-screen transition-all duration-300">
      <div className="p-4 sm:p-6 mx-auto max-w-6xl">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-1">Settings</h2>
          <p className="text-sm text-gray-500">Manage your preferences and account settings</p>
        </div>
        <div className="space-y-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Appearance</h3>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-gray-400 font-medium">Theme (Disabled)</p>
                  <p className="text-gray-400 text-sm">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
                </div>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full cursor-not-allowed bg-gray-200">
                  <span className={`inline-block h-4 w-4 rounded-full bg-gray-300 transform transition-transform duration-200 ease-in-out ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`}/>
                  <div className="absolute inset-0 bg-white bg-opacity-50 rounded-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Notifications</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-700 font-medium">Enable notifications</p>
                  <p className="text-gray-500 text-sm">Receive reminders about upcoming tasks</p>
                </div>
                <div onClick={() => setNotificationsEnabled(!notificationsEnabled)}className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out cursor-pointer ${notificationsEnabled ? 'bg-gray-800' : 'bg-gray-200'}`}>
                  <span className={`inline-block h-4 w-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${ notificationsEnabled ? 'translate-x-6' : 'translate-x-1'}`}/>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-700 font-medium">Sound notifications</p>
                  <p className="text-gray-500 text-sm">Play a sound for new notifications</p>
                </div>
                <div onClick={() => setSoundEnabled(!soundEnabled)}className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out cursor-pointer ${soundEnabled ? 'bg-gray-800' : 'bg-gray-200'}`}>
                  <span className={`inline-block h-4 w-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${ soundEnabled ? 'translate-x-6' : 'translate-x-1'}`}/>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Task Management</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="text-gray-700 font-medium">Auto-archive completed tasks</p>
                    <p className="text-gray-500 text-sm">Move completed tasks to archive after selected period</p>
                  </div>
                  <div className="min-w-[120px]">
                    <select value={autoArchive} onChange={(e) => setAutoArchive(Number(e.target.value))}className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500">
                      <option value="0">Never</option>
                      <option value="1">1 day</option>
                      <option value="7">7 days</option>
                      <option value="30">30 days</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-700 font-medium mb-2">Data & Storage</p>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors">Clear All Data</button>
                  <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors">Export Tasks</button>
                  <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors">Import Tasks </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Account</h3>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="h-16 w-16 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center text-xl font-medium">JFL</div>
                <div>
                  <p className="text-gray-800 font-medium">John Fredrick Lim</p>
                  <p className="text-gray-500 text-sm">johnfredricklim@gmail.com</p>
                  <div className="mt-2 flex gap-2">
                    <button className="px-3 py-1 text-xs text-gray-800 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded transition-colors">Edit Profile</button>
                    <button className="px-3 py-1 text-xs text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 rounded transition-colors">Sign Out</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">About</h3>
            <div className="space-y-2">
              <p className="text-gray-500 text-sm">To-Do List nina Lim & Brillantes</p>
              <p className="text-gray-500 text-sm">© 2025 BSIT 4B</p>
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={saveSettings}className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2">Save Settings</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsContent;
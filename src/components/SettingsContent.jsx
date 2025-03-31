import React, { useState } from 'react';

const SettingsContent = () => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 pl-0 sm:pl-64 min-h-screen">
      <div className="p-6 ml-[5%] mr-[8%] h-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Settings</h2>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Appearance</h3>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-gray-400 font-medium">Theme (Disabled)</p>
              <p className="text-gray-400 text-sm">
                {isToggled ? 'Dark Mode' : 'Light mode'}
              </p>
            </div>
            
            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-100 cursor-not-allowed">
              <span 
                className="inline-block h-4 w-4 rounded-full bg-gray-300 transform transition-transform" 
                style={{
                  transform: isToggled ? 'translateX(1.5rem)' : 'translateX(0.25rem)'
                }}
              />
              <div className="absolute inset-0 bg-white bg-opacity-50 rounded-full" />
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Other Settings</h3>
            <p className="text-gray-600">More settings coming soon</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsContent;
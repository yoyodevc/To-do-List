import React from 'react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 w-full">
      <div className="flex items-center h-16 w-full px-4">
        {/* logo side */}
        <div className="flex items-center space-x-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="w-8 h-8 text-black" viewBox="0 0 16 16">
            <path d="M4 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4m2.625.547a3 3 0 0 0-5.584.953H.5a.5.5 0 0 0 0 1h.541A3 3 0 0 0 7 8a1 1 0 0 1 2 0 3 3 0 0 0 5.959.5h.541a.5.5 0 0 0 0-1h-.541a3 
            3 0 0 0-5.584-.953A2 2 0 0 0 8 6c-.532 0-1.016.208-1.375.547M14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/>
          </svg>
          <h1 className="text-xl font-semibold text-black">To-Do List</h1>
        </div>
        {/* left side */}
        <div className="flex-grow"> 
          {/* para di mag left omg talaga */}
          <div className="flex items-center justify-end mx-auto" style={{ width: "clamp(85%, 1200px, 90%)" }}> 
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 
              1.867 4.175 0 .593 0 1.193-.538 1.193H5.538c-.538 0-.538-.6-.538-1.193 0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365Zm-8.134 5.368a8.458 8.458 0 0 1 
              2.252-5.714m14.016 5.714a8.458 8.458 0 0 0-2.252-5.714M8.54 17.901a3.48 3.48 0 0 0 6.92 0H8.54Z"/>
              </svg>
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">JFL</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

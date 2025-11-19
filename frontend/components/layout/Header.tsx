
import React from 'react';
import { Icon } from '../ui/Icon';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="flex items-center justify-between h-20 px-6 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none lg:hidden">
          <Icon name="Menu" className="h-6 w-6" />
        </button>
        <div className="relative ml-4 hidden md:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
             <Icon name="Search" className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-transparent rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:border-primary-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="flex items-center">
        <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
          <Icon name="Bell" className="h-6 w-6" />
        </button>
        <div className="flex items-center ml-4">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src="https://picsum.photos/seed/admin/100"
            alt="Admin"
          />
          <div className="ml-3 hidden sm:block">
            <p className="text-sm font-semibold text-gray-800 dark:text-white">Admin User</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

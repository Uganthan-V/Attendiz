
import React from 'react';
import { NavLink } from 'react-router-dom';
import { School, Users, Camera, BarChart2, Settings } from 'lucide-react';
import { Icon } from '../ui/Icon';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: <Icon name="LayoutDashboard" /> },
  { to: '/students', label: 'Students', icon: <Icon name="Users" /> },
  { to: '/reports', label: 'Reports', icon: <Icon name="BarChart2" /> },
  { to: '/settings', label: 'Settings', icon: <Icon name="Settings" /> },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const NavItem: React.FC<{ to: string, label: string, icon: React.ReactNode }> = ({ to, label, icon }) => (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${
            isActive
              ? 'bg-primary-500 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-gray-700'
          }`
        }
      >
        {icon}
        <span className={`ml-4 font-medium transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>{label}</span>
      </NavLink>
    </li>
  );
  
  return (
    <aside className={`relative bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex items-center justify-center h-20 border-b dark:border-gray-700">
        <div className={`flex items-center transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0 pointer-events-none'}`}>
          <Icon name="School" className="h-8 w-8 text-primary-500" />
          <h1 className="text-xl font-bold ml-2 text-gray-800 dark:text-white">AttendSys</h1>
        </div>
         <div className={`flex items-center justify-center transition-all duration-300 ${!isOpen ? 'opacity-100' : 'opacity-0 w-0 pointer-events-none'}`}>
             <Icon name="School" className="h-8 w-8 text-primary-500" />
         </div>
      </div>
      <nav className="p-4">
        <ul>
            {navItems.map(item => <NavItem key={item.to} {...item} />)}
        </ul>
      </nav>
      <div className="absolute bottom-4 left-0 w-full p-4">
         <div className={`bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-sm text-gray-600 dark:text-gray-300">Version 1.0.0</p>
         </div>
      </div>
    </aside>
  );
};

export default Sidebar;

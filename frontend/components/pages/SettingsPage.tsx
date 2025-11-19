
import React from 'react';

const SettingsPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Settings</h1>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl">
                <h2 className="text-xl font-semibold mb-6">Application Settings</h2>
                <div className="space-y-6">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Change Password</label>
                        <input type="password" placeholder="Current Password" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
                        <input type="password" placeholder="New Password" className="mt-2 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Notification Preferences</label>
                         <div className="mt-2 flex items-center">
                            <input id="notifications" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                            <label htmlFor="notifications" className="ml-2 block text-sm text-gray-900 dark:text-gray-200">Notifications</label>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">Save Settings</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;

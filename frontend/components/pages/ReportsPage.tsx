
import React from 'react';
import AttendanceChart from '../charts/AttendanceChart';

const ReportsPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Reports</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Weekly Attendance Trend</h2>
                    <div className="h-80">
                       <AttendanceChart />
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-center">
                    <p className="text-gray-500">More charts coming soon...</p>
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;

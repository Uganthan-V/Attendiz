// // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // import { AttendanceLog, LogType, RecognitionStatus, Student } from '../../types';
// // // // // import { MOCK_STUDENTS } from '../../constants';
// // // // // import Card from '../ui/Card';
// // // // // import { Icon } from '../ui/Icon';
// // // // // import LiveRecognitionFeed from './LiveRecognitionFeed';
// // // // // import AttendanceChart from '../charts/AttendanceChart';

// // // // // const DashboardPage: React.FC = () => {
// // // // //     const [logs, setLogs] = useState<AttendanceLog[]>([]);
// // // // //     const [todayPresent, setTodayPresent] = useState(0);
// // // // //     const [todayAbsent, setTodayAbsent] = useState(MOCK_STUDENTS.length);

// // // // //     const addLog = useCallback((student: Student, type: LogType) => {
// // // // //         setLogs(prevLogs => [
// // // // //             { id: Date.now(), student, type, timestamp: new Date() },
// // // // //             ...prevLogs
// // // // //         ].slice(0, 100)); // Keep max 100 logs
// // // // //     }, []);
// // // // //     // In DashboardPage.tsx → Replace MOCK_STUDENTS with API fetch
// // // // // const [students, setStudents] = useState<Student[]>([]);

// // // // // useEffect(() => {
// // // // //     fetch("http://localhost:8000/api/students")
// // // // //         .then(r => r.json())
// // // // //         .then(setStudents)
// // // // //         .catch(() => setStudents(MOCK_STUDENTS)); // fallback
// // // // // }, []);
// // // // //     useEffect(() => {
// // // // //         const presentStudents = new Set(
// // // // //             logs
// // // // //                 .filter(log => log.type === LogType.IN)
// // // // //                 .map(log => log.student.usn)
// // // // //         );
// // // // //         const checkedOutStudents = new Set(
// // // // //              logs
// // // // //                 .filter(log => log.type === LogType.OUT)
// // // // //                 .map(log => log.student.usn)
// // // // //         );

// // // // //         // A student is present if they checked in and haven't checked out.
// // // // //         const presentCount = [...presentStudents].filter(usn => !checkedOutStudents.has(usn)).length;

// // // // //         setTodayPresent(presentCount);
// // // // //         setTodayAbsent(MOCK_STUDENTS.length - presentCount);
// // // // //     }, [logs]);

// // // // //     return (
// // // // //         <div className="space-y-6">
// // // // //             <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
            
// // // // //             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
// // // // //                 <Card title="Today Present" value={todayPresent.toString()} icon={<Icon name="UserCheck" className="text-green-500"/>} />
// // // // //                 <Card title="Today Absent" value={todayAbsent.toString()} icon={<Icon name="UserX" className="text-red-500"/>} />
// // // // //                 <Card title="Total Students" value={MOCK_STUDENTS.length.toString()} icon={<Icon name="Users" className="text-blue-500"/>} />
// // // // //                 <Card title="Late Today" value="0" icon={<Icon name="Clock" className="text-yellow-500"/>} />
// // // // //             </div>

// // // // //             <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
// // // // //                 <div className="lg:col-span-2">
// // // // //                     <LiveRecognitionFeed addLog={addLog} logs={logs} />
// // // // //                 </div>
// // // // //                 <div className="space-y-6">
// // // // //                     <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
// // // // //                         <h3 className="text-lg font-semibold mb-4">Recent Logs</h3>
// // // // //                         <div className="space-y-3 h-96 overflow-y-auto">
// // // // //                             {logs.length > 0 ? logs.slice(0,10).map(log => (
// // // // //                                 <div key={log.id} className="flex items-center p-2 rounded-md bg-gray-50 dark:bg-gray-700/50">
// // // // //                                     <img src={log.student.avatar} alt={log.student.name} className="w-10 h-10 rounded-full"/>
// // // // //                                     <div className="ml-3 flex-grow">
// // // // //                                         <p className="font-semibold text-sm">{log.student.name}</p>
// // // // //                                         <p className="text-xs text-gray-500 dark:text-gray-400">{log.timestamp.toLocaleTimeString()}</p>
// // // // //                                     </div>
// // // // //                                     <span className={`px-2 py-1 text-xs font-bold rounded-full ${
// // // // //                                         log.type === LogType.IN ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
// // // // //                                     }`}>{log.type === LogType.IN ? 'Checked In' : 'Checked Out'}</span>
// // // // //                                 </div>
// // // // //                             )) : <p className="text-center text-gray-500 pt-10">No logs yet today.</p>}
// // // // //                         </div>
// // // // //                     </div>
// // // // //                      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
// // // // //                         <h3 className="text-lg font-semibold mb-4">Last 7 Days Attendance</h3>
// // // // //                         <div className="h-60">
// // // // //                            <AttendanceChart />
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // };


// // // // // export default DashboardPage;


// // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // import { AttendanceLog, LogType, Student } from '../../types';
// // // // const API_BASE = process.env.REACT_APP_API_BASE ?? 'http://localhost:8000';
// // // // import Card from '../ui/Card';
// // // // import { Icon } from '../ui/Icon';
// // // // import LiveRecognitionFeed from './LiveRecognitionFeed';
// // // // import AttendanceChart from '../charts/AttendanceChart';

// // // // const DashboardPage: React.FC = () => {
// // // //   const [logs, setLogs] = useState<AttendanceLog[]>([]);
// // // //   const [todayPresent, setTodayPresent] = useState(0);
// // // //   const [todayAbsent, setTodayAbsent] = useState(0);
// // // //   const [totalStudents, setTotalStudents] = useState(0);

// // // //   const addLog = useCallback((student: Student, type: LogType) => {
// // // //     setLogs(prev => [{
// // // //       id: Date.now().toString(),
// // // //       student,
// // // //       type,
// // // //       timestamp: new Date()
// // // //     }, ...prev].slice(0, 100));
// // // //   }, []);

// // // //   // Fetch today’s attendance logs from backend
// // // //   useEffect(() => {
// // // //     const fetchAttendance = async () => {
// // // //       try {
// // // //         const res = await fetch(`${API_BASE}/api/attendance/today`);
// // // //         if (!res.ok) throw new Error("Failed to fetch");
// // // //         const data: any[] = await res.json();

// // // //         const formatted: AttendanceLog[] = data.map(log => ({
// // // //           id: log.id,
// // // //           student: log.student,
// // // //           type: LogType.IN,
// // // //           timestamp: new Date(log.timestamp)
// // // //         }));

// // // //         setLogs(formatted);

// // // //         const present = new Set(formatted.map(l => l.student.usn)).size;
// // // //         const res2 = await fetch(`${API_BASE}/api/students`);
// // // //         const students = await res2.json();
// // // //         setTotalStudents(students.length);
// // // //         setTodayPresent(present);
// // // //         setTodayAbsent(students.length - present);
// // // //       } catch (err) {
// // // //         console.error("Failed to load attendance:", err);
// // // //       }
// // // //     };

// // // //     fetchAttendance();
// // // //     const interval = setInterval(fetchAttendance, 10000);
// // // //     return () => clearInterval(interval);
// // // //   }, [addLog]);

// // // //   return (
// // // //     <div className="space-y-6">
// // // //       <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>

// // // //       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
// // // //         <Card title="Today Present" value={todayPresent.toString()} icon={<Icon name="UserCheck" className="text-green-500 w-8 h-8" />} />
// // // //         <Card title="Today Absent" value={todayAbsent.toString()} icon={<Icon name="UserX" className="text-red-500 w-8 h-8" />} />
// // // //         <Card title="Total Students" value={totalStudents.toString()} icon={<Icon name="Users" className="text-blue-500 w-8 h-8" />} />
// // // //         <Card title="Late Today" value="0" icon={<Icon name="Clock" className="text-yellow-500 w-8 h-8" />} />
// // // //       </div>

// // // //       <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
// // // //         <div className="lg:col-span-2">
// // // //           <LiveRecognitionFeed addLog={addLog} logs={logs} />
// // // //         </div>
// // // //         <div className="space-y-6">
// // // //           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
// // // //             <h3 className="text-lg font-semibold mb-4">Recent Logs</h3>
// // // //             <div className="space-y-3 h-96 overflow-y-auto">
// // // //               {logs.length > 0 ? logs.slice(0, 10).map(log => (
// // // //                 <div key={log.id} className="flex items-center p-2 rounded-md bg-gray-50 dark:bg-gray-700/50">
// // // //                   <img src={log.student.avatar} alt={log.student.name} className="w-10 h-10 rounded-full object-cover" />
// // // //                   <div className="ml-3 flex-grow">
// // // //                     <p className="font-semibold text-sm">{log.student.name}</p>
// // // //                     <p className="text-xs text-gray-500 dark:text-gray-400">
// // // //                       {log.timestamp.toLocaleTimeString()}
// // // //                     </p>
// // // //                   </div>
// // // //                   <span className="px-2 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
// // // //                     Checked In
// // // //                   </span>
// // // //                 </div>
// // // //               )) : (
// // // //                 <p className="text-center text-gray-500 pt-10">No attendance yet today.</p>
// // // //               )}
// // // //             </div>
// // // //           </div>

// // // //           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
// // // //             <h3 className="text-lg font-semibold mb-4">Last 7 Days Attendance</h3>
// // // //             <div className="h-60">
// // // //               <AttendanceChart />
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default DashboardPage;

// // // // src/components/pages/DashboardPage.tsx
// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import { AttendanceLog, LogType, Student } from '../../types';
// // // // import { API_BASE } from '../../constants';
// // // const API_BASE = process.env.REACT_APP_API_BASE ?? 'http://localhost:8000'
// // // import Card from '../ui/Card';
// // // import { Icon } from '../ui/Icon';
// // // import LiveRecognitionFeed from './LiveRecognitionFeed';
// // // import AttendanceChart from '../charts/AttendanceChart';
// // // import Snackbar from '../../components/ui/snackbar';

// // // const DashboardPage: React.FC = () => {
// // //   const [logs, setLogs] = useState<AttendanceLog[]>([]);
// // //   const [todayPresent, setTodayPresent] = useState(0);
// // //   const [todayAbsent, setTodayAbsent] = useState(0);
// // //   const [totalStudents, setTotalStudents] = useState(0);
// // //   const [chartData, setChartData] = useState<{ date: string; present: number }[]>([]);
// // //   const [snackbar, setSnackbar] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

// // //   const showSnackbar = (msg: string, type: 'success' | 'error' = 'success') => {
// // //     setSnackbar({ msg, type });
// // //     setTimeout(() => setSnackbar(null), 4000);
// // //   };

// // //   const addLog = useCallback((student: Student, type: LogType) => {
// // //     const newLog: AttendanceLog = {
// // //       id: Date.now().toString(),
// // //       student,
// // //       type,
// // //       timestamp: new Date()
// // //     };
// // //     setLogs(prev => [newLog, ...prev].slice(0, 50));
// // //     showSnackbar(`${student.name} marked present!`, 'success');
// // //   }, []);

// // //   // Fetch everything on load + every 10 seconds
// // //   useEffect(() => {
// // //     const fetchAll = async () => {
// // //       try {
// // //         // 1. Today stats
// // //         const [studentsRes, todayRes] = await Promise.all([
// // //           fetch(`${API_BASE}/api/students`),
// // //           fetch(`${API_BASE}/api/attendance/today`)
// // //         ]);

// // //         const students = await studentsRes.json();
// // //         const todayLogs: AttendanceLog[] = await todayRes.json();

// // //         const presentUSNs = new Set(todayLogs.map((l: any) => l.student.usn));
// // //         const presentCount = presentUSNs.size;

// // //         setTotalStudents(students.length);
// // //         setTodayPresent(presentCount);
// // //         setTodayAbsent(students.length - presentCount);
// // //         setLogs(todayLogs.reverse()); // newest first

// // //         // 2. Last 7 days chart data
// // //         const chartRes = await fetch(`${API_BASE}/api/attendance/last7days`);
// // //         if (chartRes.ok) {
// // //           const data = await chartRes.json();
// // //           setChartData(data);
// // //         }
// // //       } catch (err) {
// // //         console.error("Dashboard fetch error:", err);
// // //       }
// // //     };

// // //     fetchAll();
// // //     const interval = setInterval(fetchAll, 10000);
// // //     return () => clearInterval(interval);
// // //   }, [addLog]);

// // //   return (
// // //     <>
// // //       {snackbar && <Snackbar message={snackbar.msg} type={snackbar.type} isOpen={!!snackbar} onClose={() => setSnackbar(null)} />}

// // //       <div className="space-y-8">
// // //         <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Dashboard</h1>

// // //         {/* Stats Cards */}
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// // //           <Card title="Total Students" value={totalStudents.toString()} icon={<Icon name="Users" className="w-8 h-8 text-blue-600" />} />
// // //           <Card title="Today Present" value={todayPresent.toString()} icon={<Icon name="UserCheck" className="w-8 h-8 text-green-600" />} />
// // //           <Card title="Today Absent" value={todayAbsent.toString()} icon={<Icon name="UserX" className="w-8 h-8 text-red-600" />} />
// // //           <Card title="Attendance Rate" value={totalStudents > 0 ? `${Math.round((todayPresent / totalStudents) * 100)}%` : '0%'} icon={<Icon name="TrendingUp" className="w-8 h-8 text-purple-600" />} />
// // //         </div>

// // //         {/* Main Content */}
// // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // //           {/* Live Camera Feed */}
// // //           <div className="lg:col-span-2">
// // // 343            <LiveRecognitionFeed addLog={addLog} logs={logs} />
// // //           </div>

// // //           {/* Right Column */}
// // //           <div className="space-y-6">
// // //             {/* Recent Logs */}
// // //             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
// // //               <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
// // //                 <Icon name="Clock" className="w-6 h-6 text-primary-600" />
// // //                 Recent Attendance
// // //               </h3>
// // //               <div className="space-y-3 max-h-96 overflow-y-auto">
// // //                 {logs.length === 0 ? (
// // //                   <p className="text-center text-gray-500 py-8">No attendance recorded today</p>
// // //                 ) : (
// // //                   logs.slice(0, 10).map(log => (
// // //                     <div key={log.id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition">
// // //                       <img src={log.student.avatar} alt={log.student.name} className="w-12 h-12 rounded-full object-cover" />
// // //                       <div className="flex-1">
// // //                         <p className="font-semibold text-sm">{log.student.name}</p>
// // //                         <p className="text-xs text-gray-500">
// // //                           {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// // //                         </p>
// // //                       </div>
// // //                       <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
// // //                         CHECKED IN
// // //                       </span>
// // //                     </div>
// // //                   ))
// // //                 )}
// // //               </div>
// // //             </div>

// // //             {/*  unattended Chart */}
// // //             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
// // //               <h3 className="text-xl font-bold mb-4">Last 7 Days Attendance</h3>
// // //               <div className="h-64">
// // //                 <AttendanceChart data={chartData} />
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default DashboardPage;


// // // frontend/src/components/pages/DashboardPage.tsx
// // import React, { useState, useEffect, useCallback } from 'react';
// // import { AttendanceLog, LogType, Student } from '../../types';
// // const API_BASE = process.env.REACT_APP_API_BASE ?? 'http://localhost:8000';

// // import Card from '../ui/Card';
// // import { Icon } from '../ui/Icon';
// // import LiveRecognitionFeed from './LiveRecognitionFeed';
// // import AttendanceChart from '../charts/AttendanceChart';
// // import Snackbar from '../../components/ui/snackbar';

// // const DashboardPage: React.FC = () => {
// //   const [logs, setLogs] = useState<AttendanceLog[]>([]);
// //   const [todayPresent, setTodayPresent] = useState(0);
// //   const [todayAbsent, setTodayAbsent] = useState(0);
// //   const [totalStudents, setTotalStudents] = useState(0);
// //   const [chartData, setChartData] = useState<{ date: string; present: number }[]>([]);
// //   const [snackbar, setSnackbar] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

// //   const showSnackbar = (msg: string, type: 'success' | 'error' = 'success') => {
// //     setSnackbar({ msg, type });
// //     setTimeout(() => setSnackbar(null), 4000);
// //   };

// //   const addLog = useCallback((student: Student, type: LogType) => {
// //     const newLog: AttendanceLog = {
// //       id: Date.now().toString(),
// //       student,
// //       type,
// //       timestamp: new Date()
// //     };
// //     setLogs(prev => [newLog, ...prev].slice(0, 50));
// //     showSnackbar(`${student.name} marked present!`, 'success');
// //   }, []);

// //   useEffect(() => {
// //     const fetchAll = async () => {
// //       try {
// //         const [studentsRes, todayRes, chartRes] = await Promise.all([
// //           fetch(`${API_BASE}/api/students`),
// //           fetch(`${API_BASE}/api/attendance/today`),
// //           fetch(`${API_BASE}/api/attendance/last7days`).catch(() => ({ ok: false }))
// //         ]);

// //         const students = await studentsRes.json();
// //         const todayLogs: AttendanceLog[] = todayRes.ok ? await todayRes.json() : [];

// //         const presentUSNs = new Set(todayLogs.map((l: any) => l.student.usn));
// //         const presentCount = presentUSNs.size;

// //         setTotalStudents(students.length);
// //         setTodayPresent(presentCount);
// //         setTodayAbsent(students.length - presentCount);
// //         setLogs(todayLogs.reverse());

// //         if (chartRes.ok) {
// //           const data = await chartRes.json();
// //           setChartData(data);
// //         }
// //       } catch (err) {
// //         console.error("Dashboard fetch error:", err);
// //       }
// //     };

// //     fetchAll();
// //     const interval = setInterval(fetchAll, 10000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   return (
// //     <>
// //       {snackbar && (
// //         <Snackbar
// //           message={snackbar.msg}
// //           type={snackbar.type}
// //           isOpen={!!snackbar}
// //           onClose={() => setSnackbar(null)}
// //         />
// //       )}

// //       <div className="space-y-8 p-6">
// //         <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Dashboard</h1>

// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //           <Card title="Total Students" value={totalStudents.toString()} icon={<Icon name="Users" className="w-8 h-8 text-blue-600" />} />
// //           <Card title="Today Present" value={todayPresent.toString()} icon={<Icon name="UserCheck" className="w-8 h-8 text-green-600" />} />
// //           <Card title="Today Absent" value={todayAbsent.toString()} icon={<Icon name="UserX" className="w-8 h-8 text-red-600" />} />
// //           <Card
// //             title="Attendance Rate"
// //             value={totalStudents > 0 ? `${Math.round((todayPresent / totalStudents) * 100)}%` : '0%'}
// //             icon={<Icon name="TrendingUp" className="w-8 h-8 text-purple-600" />}
// //           />
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //           <div className="lg:col-span-2">
// //             <LiveRecognitionFeed addLog={addLog} logs={logs} />
// //           </div>

// //           <div className="space-y-6">
// //             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
// //               <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
// //                 <Icon name="Clock" className="w-6 h-6 text-primary-600" />
// //                 Recent Attendance
// //               </h3>
// //               <div className="space-y-3 max-h-96 overflow-y-auto">
// //                 {logs.length === 0 ? (
// //                   <p className="text-center text-gray-500 py-8">No attendance today</p>
// //                 ) : (
// //                   logs.slice(0, 10).map(log => (
// //                     <div key={log.id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
// //                       <img src={log.student.avatar} alt={log.student.name} className="w-12 h-12 rounded-full object-cover" />
// //                       <div className="flex-1">
// //                         <p className="font-semibold">{log.student.name}</p>
// //                         <p className="text-xs text-gray-500">
// //                           {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// //                         </p>
// //                       </div>
// //                       <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800">
// //                         IN
// //                       </span>
// //                     </div>
// //                   ))
// //                 )}
// //               </div>
// //             </div>

// //             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
// //               <h3 className="text-xl font-bold mb-4">Last 7 Days</h3>
// //               <div className="h-64">
// //                 <AttendanceChart data={chartData} />
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default DashboardPage;

// // src/components/pages/DashboardPage.tsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { AttendanceLog, LogType, Student } from '../../types';
// const API_BASE = process.env.REACT_APP_API_BASE ?? 'http://localhost:8000';

// import Card from '../ui/Card';
// import { Icon } from '../ui/Icon';
// import LiveRecognitionFeed from './LiveRecognitionFeed';
// import AttendanceChart from '../charts/AttendanceChart';
// import Snackbar from '../../components/ui/snackbar';

// const DashboardPage: React.FC = () => {
//   const [logs, setLogs] = useState<AttendanceLog[]>([]);
//   const [todayPresent, setTodayPresent] = useState(0);
//   const [todayAbsent, setTodayAbsent] = useState(0);
//   const [totalStudents, setTotalStudents] = useState(0);
//   const [chartData, setChartData] = useState<{ date: string; present: number }[]>([]);
//   const [snackbar, setSnackbar] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

//   const showSnackbar = (msg: string, type: 'success' | 'error' = 'success') => {
//     setSnackbar({ msg, type });
//     setTimeout(() => setSnackbar(null), 4000);
//   };

//   const addLog = useCallback((student: Student, type: LogType) => {
//     const newLog: AttendanceLog = {
//       id: Date.now().toString(),  // string → matches types.ts
//       student,
//       type,
//       timestamp: new Date()
//     };
//     setLogs(prev => [newLog, ...prev].slice(0, 50));
//     showSnackbar(`${student.name} marked present!`, 'success');
//   }, []);

//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const studentsRes = await fetch(`${API_BASE}/api/students`);
//         const todayRes = await fetch(`${API_BASE}/api/attendance/today`);
//         const chartRes = await fetch(`${API_BASE}/api/attendance/last7days`);

//         const students = await studentsRes.json();
//         const todayLogs: AttendanceLog[] = todayRes.ok ? await todayRes.json() : [];

//         const presentUSNs = new Set(todayLogs.map(l => l.student.usn));
//         const presentCount = presentUSNs.size;

//         setTotalStudents(students.length);
//         setTodayPresent(presentCount);
//         setTodayAbsent(students.length - presentCount);
//         setLogs(todayLogs.reverse());

//         if (chartRes.ok) {
//           const data = await chartRes.json();
//           setChartData(data);
//         }
//       } catch (err) {
//         console.error("Dashboard fetch error:", err);
//       }
//     };

//     fetchAll();
//     const interval = setInterval(fetchAll, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <>
//       {snackbar && (
//         <Snackbar
//           message={snackbar.msg}
//           type={snackbar.type}
//           isOpen={!!snackbar}
//           onClose={() => setSnackbar(null)}
//         />
//       )}

//       <div className="space-y-8 p-6">
//         <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Dashboard</h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           <Card title="Total Students" value={totalStudents.toString()} icon={<Icon name="Users" className="w-8 h-8 text-blue-600" />} />
//           <Card title="Today Present" value={todayPresent.toString()} icon={<Icon name="UserCheck" className="w-8 h-8 text-green-600" />} />
//           <Card title="Today Absent" value={todayAbsent.toString()} icon={<Icon name="UserX" className="w-8 h-8 text-red-600" />} />
//           <Card
//             title="Attendance Rate"
//             value={totalStudents > 0 ? `${Math.round((todayPresent / totalStudents) * 100)}%` : '0%'}
//             icon={<Icon name="TrendingUp" className="w-8 h-8 text-purple-600" />}
//           />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             <LiveRecognitionFeed addLog={addLog} logs={logs} />
//           </div>

//           <div className="space-y-6">
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
//               <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 <Icon name="Clock" className="w-6 h-6 text-primary-600" />
//                 Recent Attendance
//               </h3>
//               <div className="space-y-3 max-h-96 overflow-y-auto">
//                 {logs.length === 0 ? (
//                   <p className="text-center text-gray-500 py-8">No attendance today</p>
//                 ) : (
//                   logs.slice(0, 10).map(log => (
//                     <div key={log.id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
//                       <img src={log.student.avatar} alt={log.student.name} className="w-12 h-12 rounded-full object-cover" />
//                       <div className="flex-1">
//                         <p className="font-semibold">{log.student.name}</p>
//                         <p className="text-xs text-gray-500">
//                           {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                         </p>
//                       </div>
//                       <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800">
//                         IN
//                       </span>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>

//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
//               <h3 className="text-xl font-bold mb-4">Last 7 Days</h3>
//               <div className="h-64">
//                 <AttendanceChart data={chartData} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DashboardPage;

// src/components/pages/DashboardPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { AttendanceLog, LogType, Student } from '../../types';
const API_BASE = process.env.REACT_APP_API_BASE ?? 'http://localhost:8000';

import Card from '../ui/Card';
import { Icon } from '../ui/Icon';
import LiveRecognitionFeed from './LiveRecognitionFeed';
import AttendanceChart from '../charts/AttendanceChart';
import Snackbar from '../../components/ui/Snackbar';

const DashboardPage: React.FC = () => {
  const [logs, setLogs] = useState<AttendanceLog[]>([]);
  const [todayPresent, setTodayPresent] = useState(0);
  const [todayAbsent, setTodayAbsent] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [chartData, setChartData] = useState<{ date: string; present: number }[]>([]);
  const [snackbar, setSnackbar] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showSnackbar = (msg: string, type: 'success' | 'error' = 'success') => {
    setSnackbar({ msg, type });
    setTimeout(() => setSnackbar(null), 4000);
  };

  const addLog = useCallback((student: Student, type: LogType) => {
    const newLog: AttendanceLog = {
      id: Date.now().toString(),
      student,
      type,
      timestamp: new Date()
    };

    setLogs(prev => [newLog, ...prev].slice(0, 50));
    showSnackbar(`${student.name} marked present!`, 'success');
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const studentsRes = await fetch(`${API_BASE}/api/students`);
        const todayRes = await fetch(`${API_BASE}/api/attendance/today`);
        const chartRes = await fetch(`${API_BASE}/api/attendance/last7days`);

        const students = await studentsRes.json();

        // --- FIX: Convert IDs & timestamps properly ---
        const rawTodayLogs = todayRes.ok ? await todayRes.json() : [];

        const todayLogs: AttendanceLog[] = rawTodayLogs.map((l: any) => ({
          ...l,
          id: String(l.id), // << FIX: ensure string
          timestamp: new Date(l.timestamp) // << ensure Date object
        }));

        const presentUSNs = new Set(todayLogs.map(l => l.student.usn));
        const presentCount = presentUSNs.size;

        setTotalStudents(students.length);
        setTodayPresent(presentCount);
        setTodayAbsent(students.length - presentCount);
        setLogs(todayLogs.reverse());

        if (chartRes.ok) {
          const data = await chartRes.json();
          setChartData(data);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    fetchAll();
    const interval = setInterval(fetchAll, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {snackbar && (
        <Snackbar
          message={snackbar.msg}
          type={snackbar.type}
          isOpen={!!snackbar}
          onClose={() => setSnackbar(null)}
        />
      )}

      <div className="space-y-8 p-6">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card title="Total Students" value={totalStudents.toString()} icon={<Icon name="Users" className="w-8 h-8 text-blue-600" />} />
          <Card title="Today Present" value={todayPresent.toString()} icon={<Icon name="UserCheck" className="w-8 h-8 text-green-600" />} />
          <Card title="Today Absent" value={todayAbsent.toString()} icon={<Icon name="UserX" className="w-8 h-8 text-red-600" />} />
          <Card
            title="Attendance Rate"
            value={totalStudents > 0 ? `${Math.round((todayPresent / totalStudents) * 100)}%` : '0%'}
            icon={<Icon name="TrendingUp" className="w-8 h-8 text-purple-600" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <LiveRecognitionFeed addLog={addLog} logs={logs} />
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Clock" className="w-6 h-6 text-primary-600" />
                Recent Attendance
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">

                {logs.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No attendance today</p>
                ) : (
                  logs.slice(0, 10).map(log => (
                    <div key={log.id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <img src={log.student.avatar} alt={log.student.name} className="w-12 h-12 rounded-full object-cover" />
                      <div className="flex-1">
                        <p className="font-semibold">{log.student.name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800">IN</span>
                    </div>
                  ))
                )}

              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Last 7 Days</h3>
              <div className="h-64">
                <AttendanceChart data={chartData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

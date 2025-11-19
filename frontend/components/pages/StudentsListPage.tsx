// // // import React, { useState, useMemo } from 'react';
// // // import { MOCK_STUDENTS } from '../../constants';
// // // import { Student } from '../../types';
// // // import { Icon } from '../ui/Icon';
// // // import Modal from '../ui/Modal';

// // // const StudentsListPage: React.FC = () => {
// // //     const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
// // //     const [searchTerm, setSearchTerm] = useState('');

// // //     type ModalType = 'add' | 'view' | 'edit' | 'delete' | 'closed';
// // //     interface ModalState {
// // //         type: ModalType;
// // //         student: Student | null;
// // //     }
// // //     const [modalState, setModalState] = useState<ModalState>({ type: 'closed', student: null });

// // //     const [formData, setFormData] = useState({ name: '', usn: '', dpt: '' });
// // //     const [photoPreview, setPhotoPreview] = useState<string | null>(null);

// // //     const filteredStudents = useMemo(() => {
// // //         return students.filter(student =>
// // //             student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //             student.usn.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //             student.dpt.toLowerCase().includes(searchTerm.toLowerCase())
// // //         );
// // //     }, [searchTerm, students]);

// // //     const resetForm = () => {
// // //         setFormData({ name: '', usn: '', dpt: '' });
// // //         setPhotoPreview(null);
// // //     };

// // //     const handleCloseModal = () => {
// // //         resetForm();
// // //         setModalState({ type: 'closed', student: null });
// // //     };

// // //     const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //         if (e.target.files && e.target.files[0]) {
// // //             const file = e.target.files[0];
// // //             const reader = new FileReader();
// // //             reader.onloadend = () => {
// // //                 setPhotoPreview(reader.result as string);
// // //             };
// // //             reader.readAsDataURL(file);
// // //         }
// // //     };
    
// // //     const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //         const { name, value } = e.target;
// // //         setFormData(prev => ({ ...prev, [name]: value }));
// // //     };

// // //     const handleAddStudent = (e: React.FormEvent) => {
// // //         e.preventDefault();
// // //         if (!formData.name || !formData.usn || !formData.dpt || !photoPreview) {
// // //             alert('Please fill all fields and upload a photo.');
// // //             return;
// // //         }
// // //         const newStudent: Student = { ...formData, avatar: photoPreview };
// // //         setStudents(prev => [newStudent, ...prev]);
// // //         handleCloseModal();
// // //     };
    
// // //     const handleEditStudent = (e: React.FormEvent) => {
// // //         e.preventDefault();
// // //         if (!modalState.student) return;

// // //         setStudents(prev => prev.map(s => 
// // //             s.usn === modalState.student!.usn 
// // //             ? { ...formData, avatar: photoPreview || modalState.student!.avatar } 
// // //             : s
// // //         ));
// // //         handleCloseModal();
// // //     };

// // //     const handleDeleteStudent = () => {
// // //         if (!modalState.student) return;
// // //         setStudents(prev => prev.filter(s => s.usn !== modalState.student!.usn));
// // //         handleCloseModal();
// // //     };
    
// // //     const openAddModal = () => {
// // //         resetForm();
// // //         setModalState({ type: 'add', student: null });
// // //     };

// // //     const openViewModal = (student: Student) => {
// // //         setModalState({ type: 'view', student });
// // //     };

// // //     const openEditModal = (student: Student) => {
// // //         setFormData({ name: student.name, usn: student.usn, dpt: student.dpt });
// // //         setPhotoPreview(student.avatar);
// // //         setModalState({ type: 'edit', student });
// // //     };

// // //     const openDeleteModal = (student: Student) => {
// // //         setModalState({ type: 'delete', student });
// // //     };
    
// // //     const getModalTitle = () => {
// // //         switch (modalState.type) {
// // //             case 'add': return 'Add New Student';
// // //             case 'view': return 'Student Details';
// // //             case 'edit': return 'Edit Student';
// // //             case 'delete': return 'Confirm Deletion';
// // //             default: return '';
// // //         }
// // //     };

// // //     const renderModalContent = () => {
// // //         const { type, student } = modalState;

// // //         const StudentForm = (
// // //              <form onSubmit={type === 'add' ? handleAddStudent : handleEditStudent} className="space-y-4">
// // //                 <div>
// // //                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Student Photo</label>
// // //                      <div className="mt-1 flex items-center space-x-4">
// // //                         <span className="inline-block h-20 w-20 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
// // //                             {photoPreview ? (
// // //                                 <img src={photoPreview} alt="Student preview" className="h-full w-full object-cover" />
// // //                             ) : (
// // //                                 <Icon name="Users" className="h-full w-full text-gray-300 dark:text-gray-500 p-4" />
// // //                             )}
// // //                         </span>
// // //                         <label htmlFor="file-upload" className="cursor-pointer bg-white dark:bg-gray-700 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
// // //                             <span>{photoPreview ? 'Change' : 'Upload'} Photo</span>
// // //                             <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handlePhotoChange} />
// // //                         </label>
// // //                      </div>
// // //                 </div>
// // //                 <div>
// // //                     <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
// // //                     <input type="text" id="name" name="name" value={formData.name} onChange={handleFormChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
// // //                 </div>
// // //                  <div>
// // //                     <label htmlFor="usn" className="block text-sm font-medium text-gray-700 dark:text-gray-300">USN</label>
// // //                     <input type="text" id="usn" name="usn" value={formData.usn} onChange={handleFormChange} required readOnly={type==='edit'} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 read-only:bg-gray-100 dark:read-only:bg-gray-600" />
// // //                 </div>
// // //                 <div>
// // //                     <label htmlFor="dpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Department</label>
// // //                     <input type="text" id="dpt" name="dpt" value={formData.dpt} onChange={handleFormChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
// // //                 </div>
// // //                  <div className="flex justify-end pt-4 space-x-2">
// // //                     <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors">
// // //                         Cancel
// // //                     </button>
// // //                     <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
// // //                         {type === 'add' ? 'Save Student' : 'Update Student'}
// // //                     </button>
// // //                 </div>
// // //             </form>
// // //         );

// // //         switch (type) {
// // //             case 'add':
// // //             case 'edit':
// // //                 return StudentForm;

// // //             case 'view':
// // //                 return student ? (
// // //                     <div className="space-y-4">
// // //                         <div className="flex justify-center">
// // //                              <img src={student.avatar} alt={student.name} className="w-32 h-32 rounded-full object-cover shadow-lg"/>
// // //                         </div>
// // //                         <div><strong>Name:</strong> <span className="text-gray-600 dark:text-gray-300">{student.name}</span></div>
// // //                         <div><strong>USN:</strong> <span className="text-gray-600 dark:text-gray-300">{student.usn}</span></div>
// // //                         <div><strong>Department:</strong> <span className="text-gray-600 dark:text-gray-300">{student.dpt}</span></div>
// // //                          <div className="flex justify-end pt-4">
// // //                              <button onClick={handleCloseModal} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">Close</button>
// // //                          </div>
// // //                     </div>
// // //                 ) : null;

// // //             case 'delete':
// // //                 return student ? (
// // //                     <div>
// // //                         <p className="text-gray-700 dark:text-gray-300">Are you sure you want to delete the student <strong className="text-red-500">{student.name}</strong>? This action cannot be undone.</p>
// // //                         <div className="flex justify-end pt-6 space-x-2">
// // //                             <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors">
// // //                                 Cancel
// // //                             </button>
// // //                             <button onClick={handleDeleteStudent} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
// // //                                 Delete
// // //                             </button>
// // //                         </div>
// // //                     </div>
// // //                 ) : null;
            
// // //             default:
// // //                 return null;
// // //         }
// // //     };

// // //     return (
// // //         <div className="space-y-6">
// // //             <div className="flex justify-between items-center">
// // //                 <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Students</h1>
// // //                 <button
// // //                     onClick={openAddModal}
// // //                     className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
// // //                 >
// // //                     <Icon name="Plus" className="w-5 h-5 mr-2" />
// // //                     Add Student
// // //                 </button>
// // //             </div>

// // //             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
// // //                 <div className="flex items-center justify-between mb-4">
// // //                      <div className="relative w-full max-w-md">
// // //                         <span className="absolute inset-y-0 left-0 flex items-center pl-3">
// // //                             <Icon name="Search" className="h-5 w-5 text-gray-400" />
// // //                         </span>
// // //                         <input
// // //                             type="text"
// // //                             placeholder="Search students..."
// // //                             value={searchTerm}
// // //                             onChange={(e) => setSearchTerm(e.target.value)}
// // //                             className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-transparent rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:border-primary-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none"
// // //                         />
// // //                     </div>
// // //                 </div>
                
// // //                 <div className="overflow-x-auto">
// // //                     <table className="w-full text-left">
// // //                         <thead className="bg-gray-50 dark:bg-gray-700">
// // //                             <tr>
// // //                                 <th className="p-4 font-semibold">Photo</th>
// // //                                 <th className="p-4 font-semibold">Name</th>
// // //                                 <th className="p-4 font-semibold">USN</th>
// // //                                 <th className="p-4 font-semibold">Department</th>
// // //                                 <th className="p-4 font-semibold text-center">Actions</th>
// // //                             </tr>
// // //                         </thead>
// // //                         <tbody>
// // //                             {filteredStudents.map(student => (
// // //                                 <tr key={student.usn} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
// // //                                     <td className="p-4">
// // //                                         <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full object-cover" />
// // //                                     </td>
// // //                                     <td className="p-4 font-medium">{student.name}</td>
// // //                                     <td className="p-4 text-gray-600 dark:text-gray-400">{student.usn}</td>
// // //                                     <td className="p-4 text-gray-600 dark:text-gray-400">{student.dpt}</td>
// // //                                     <td className="p-4">
// // //                                         <div className="flex space-x-2 justify-center">
// // //                                             <button onClick={() => openViewModal(student)} className="p-2 text-gray-500 hover:text-primary-500 transition-colors" aria-label={`View details for ${student.name}`}><Icon name="Eye" /></button>
// // //                                             <button onClick={() => openEditModal(student)} className="p-2 text-gray-500 hover:text-yellow-500 transition-colors" aria-label={`Edit ${student.name}`}><Icon name="Edit" /></button>
// // //                                             <button onClick={() => openDeleteModal(student)} className="p-2 text-gray-500 hover:text-red-500 transition-colors" aria-label={`Delete ${student.name}`}><Icon name="Trash2" /></button>
// // //                                         </div>
// // //                                     </td>
// // //                                 </tr>
// // //                             ))}
// // //                         </tbody>
// // //                     </table>
// // //                 </div>
// // //                  {filteredStudents.length === 0 && (
// // //                     <div className="text-center py-10 text-gray-500">
// // //                         <Icon name="Users" className="w-12 h-12 mx-auto mb-2 text-gray-400" />
// // //                         <p className="font-semibold">No students found.</p>
// // //                         <p className="text-sm">Try adjusting your search or add a new student.</p>
// // //                     </div>
// // //                  )}
// // //             </div>
            
// // //              <Modal title={getModalTitle()} isOpen={modalState.type !== 'closed'} onClose={handleCloseModal}>
// // //                 {renderModalContent()}
// // //              </Modal>
// // //         </div>
// // //     );
// // // };

// // // export default StudentsListPage;


// // import React, { useState, useEffect, useMemo } from 'react';
// // import { Student } from '../../types';
// // // import { API_BASE } from '../../constants';
// // const API_BASE = process.env.REACT_APP_API_BASE ?? 'http://localhost:8000';

// // import { Icon } from '../ui/Icon';
// // import Modal from '../ui/Modal';

// // const StudentsListPage: React.FC = () => {
// //   const [students, setStudents] = useState<Student[]>([]);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [modalState, setModalState] = useState<'add' | 'view' | 'edit' | 'delete' | 'closed'>('closed');
// //   const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
// //   const [formData, setFormData] = useState({ name: '', usn: '', dpt: 'CSE' });
// //   const [photoPreview, setPhotoPreview] = useState<string | null>(null);
// //   const [isLoading, setIsLoading] = useState(false);

// //   // Fetch students from backend
// //   useEffect(() => {
// //     const fetchStudents = async () => {
// //       try {
// //         const res = await fetch(`${API_BASE}/api/students`);
// //         const data = await res.json();
// //         setStudents(data);
// //       } catch (err) {
// //         console.error("Failed to load students");
// //       }
// //     };
// //     fetchStudents();
// //   }, []);

// //   const filteredStudents = useMemo(() => {
// //     return students.filter(s =>
// //       s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       s.usn.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       s.dpt.toLowerCase().includes(searchTerm.toLowerCase())
// //     );
// //   }, [students, searchTerm]);

// //   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onloadend = () => setPhotoPreview(reader.result as string);
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleEnroll = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!formData.name || !photoPreview) return alert("Name and photo required");

// //     setIsLoading(true);
// //     const blob = await (await fetch(photoPreview)).blob();
// //     const file = new File([blob], "photo.jpg", { type: "image/jpeg" });

// //     const form = new FormData();
// //     form.append("name", formData.name.toUpperCase());
// //     form.append("photo", file);

// //     try {
// //       const res = await fetch(`${API_BASE}/api/enroll`, {
// //         method: "POST",
// //         body: form
// //       });
// //       const data = await res.json();

// //       const newStudent: Student = {
// //         usn: data.name,
// //         name: data.name,
// //         dpt: "CSE",
// //         avatar: data.avatar
// //       };

// //       setStudents(prev => [newStudent, ...prev]);
// //       closeModal();
// //     } catch (err) {
// //       alert("Enrollment failed");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const closeModal = () => {
// //     setModalState('closed');
// //     setSelectedStudent(null);
// //     setFormData({ name: '', usn: '', dpt: 'CSE' });
// //     setPhotoPreview(null);
// //   };

// //   const openAdd = () => setModalState('add');
// //   const openView = (s: Student) => { setSelectedStudent(s); setModalState('view'); };
// //   const openEdit = (s: Student) => { setSelectedStudent(s); setFormData({ name: s.name, usn: s.usn, dpt: s.dpt }); setPhotoPreview(s.avatar); setModalState('edit'); };
// //   const openDelete = (s: Student) => { setSelectedStudent(s); setModalState('delete'); };

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex justify-between items-center">
// //         <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Students</h1>
// //         <button onClick={openAdd} className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
// //           <Icon name="Plus" className="w-5 h-5 mr-2" /> Add Student
// //         </button>
// //       </div>

// //       <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
// //         <div className="mb-4">
// //           <input
// //             type="text"
// //             placeholder="Search students..."
// //             value={searchTerm}
// //             onChange={e => setSearchTerm(e.target.value)}
// //             className="w-full max-w-md py-2 px-4 pl-10 rounded-lg border dark:bg-gray-700"
// //           />
// //         </div>

// //         <div className="overflow-x-auto">
// //           <table className="w-full text-left">
// //             <thead className="bg-gray-50 dark:bg-gray-700">
// //               <tr>
// //                 <th className="p-4">Photo</th>
// //                 <th className="p-4">Name</th>
// //                 <th className="p-4">USN</th>
// //                 <th className="p-4">Department</th>
// //                 <th className="p-4 text-center">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filteredStudents.map(s => (
// //                 <tr key={s.usn} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
// //                   <td className="p-4"><img src={s.avatar} alt={s.name} className="w-12 h-12 rounded-full object-cover" /></td>
// //                   <td className="p-4">{s.name}</td>
// //                   <td className="p-4">{s.usn}</td>
// //                   <td className="p-4">{s.dpt}</td>
// //                   <td className="p-4 text-center space-x-2">
// //                     <button onClick={() => openView(s)}><Icon name="Eye" /></button>
// //                     <button onClick={() => openEdit(s)}><Icon name="Edit" /></button>
// //                     <button onClick={() => openDelete(s)}><Icon name="Trash2" /></button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       <Modal isOpen={modalState !== 'closed'} onClose={closeModal} title={
// //         modalState === 'add' ? 'Add Student' :
// //         modalState === 'view' ? 'Student Details' :
// //         modalState === 'edit' ? 'Edit Student' : 'Confirm Delete'
// //       }>
// //         {modalState === 'add' || modalState === 'edit' ? (
// //           <form onSubmit={handleEnroll} className="space-y-4">
// //             <div>
// //               <label>Photo</label>
// //               <div className="flex items-center space-x-4 mt-2">
// //                 <img src={photoPreview || 'https://via.placeholder.com/80'} alt="preview" className="w-20 h-20 rounded-full" />
// //                 <input type="file" accept="image/*" onChange={handlePhotoChange} required={modalState === 'add'} />
// //               </div>
// //             </div>
// //             <input placeholder="Full Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required className="w-full px-3 py-2 border rounded" />
// //             {modalState === 'add' && <input placeholder="USN (optional)" value={formData.usn} onChange={e => setFormData({ ...formData, usn: e.target.value })} className="w-full px-3 py-2 border rounded" />}
// //             <div className="flex justify-end space-x-2">
// //               <button type="button" onClick={closeModal} className="px-4 py-2 border rounded">Cancel</button>
// //               <button type="submit" disabled={isLoading} className="px-4 py-2 bg-primary-600 text-white rounded">
// //                 {isLoading ? 'Saving...' : 'Save'}
// //               </button>
// //             </div>
// //           </form>
// //         ) : modalState === 'view' && selectedStudent ? (
// //           <div className="text-center">
// //             <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-32 h-32 rounded-full mx-auto" />
// //             <p className="mt-4"><strong>Name:</strong> {selectedStudent.name}</p>
// //             <p><strong>USN:</strong> {selectedStudent.usn}</p>
// //             <p><strong>Dept:</strong> {selectedStudent.dpt}</p>
// //             <button onClick={closeModal} className="mt-6 px-4 py-2 bg-primary-600 text-white rounded">Close</button>
// //           </div>
// //         ) : modalState === 'delete' && selectedStudent ? (
// //           <div>
// //             <p>Delete <strong>{selectedStudent.name}</strong> permanently?</p>
// //             <div className="flex justify-end space-x-2 mt-6">
// //               <button onClick={closeModal} className="px-4 py-2 border rounded">Cancel</button>
// //               <button onClick={() => { setStudents(prev => prev.filter(s => s.usn !== selectedStudent.usn)); closeModal(); }} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
// //             </div>
// //           </div>
// //         ) : null}
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default StudentsListPage;

// // src/components/pages/StudentsListPage.tsx
// import React, { useState, useEffect, useMemo } from 'react';
// import { Student } from '../../types';
// // import { API_BASE } from '../../constants';
// const API_BASE = process.env.REACT_APP_API_BASE ?? 'http://localhost:8000';
// import { Icon } from '../ui/Icon';
// import Modal from '../ui/Modal';
// import Snackbar from '../../components/ui/snackbar';

// const StudentsListPage: React.FC = () => {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // Form state
//   const [name, setName] = useState('');
//   const [usn, setUsn] = useState('');
//   const [dept, setDept] = useState('CSE');
//   const [photo, setPhoto] = useState<File | null>(null);
//   const [photoPreview, setPhotoPreview] = useState<string | null>(null);

//   // Snackbar state
//   const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

//   const showSnackbar = (message: string, type: 'success' | 'error' = 'success') => {
//     setSnackbar({ message, type });
//   };

//   // Fetch students
//   useEffect(() => {
//     fetch(`${API_BASE}/api/students`)
//       .then(r => r.json())
//       .then(data => setStudents(data))
//       .catch(() => showSnackbar('Failed to load students', 'error'));
//   }, []);

//   const filteredStudents = useMemo(() => {
//     return students.filter(s =>
//       s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       s.usn.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       s.dpt.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [students, searchTerm]);

//   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setPhoto(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setPhotoPreview(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleEnroll = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!name || !usn || !photo) {
//       showSnackbar('Please fill Name, USN and Photo', 'error');
//       return;
//     }

//     setIsLoading(true);
//     const formData = new FormData();
//     formData.append('name', name.trim());
//     formData.append('usn', usn.trim().toUpperCase());
//     formData.append('department', dept);
//     formData.append('photo', photo);

//     try {
//       const res = await fetch(`${API_BASE}/api/enroll`, {
//         method: 'POST',
//         body: formData
//       });

//       if (!res.ok) throw new Error(await res.text());

//       const data = await res.json();

//       const newStudent: Student = {
//         usn: data.usn,
//         name: data.name,
//         dpt: data.department,
//         avatar: data.avatar
//       };

//       setStudents(prev => [newStudent, ...prev]);
//       showSnackbar(`${data.name} enrolled successfully!`, 'success');

//       // Reset form
//       setName(''); setUsn(''); setDept('CSE'); setPhoto(null); setPhotoPreview(null);
//       setModalOpen(false);
//     } catch (err: any) {
//       showSnackbar(err.message || 'Enrollment failed', 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Snackbar */}
//       {snackbar && (
//         <Snackbar
//           message={snackbar.message}
//           type={snackbar.type}
//           isOpen={!!snackbar}
//           onClose={() => setSnackbar(null)}
//         />
//       )}

//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Students</h1>
//           <button
//             onClick={() => setModalOpen(true)}
//             className="flex items-center gap-2 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition"
//           >
//             <Icon name="Plus" className="w-5 h-5" />
//             Add Student
//           </button>
//         </div>

//         {/* Search */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
//           <input
//             type="text"
//             placeholder="Search by name, USN or department..."
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//             className="w-full max-w-md px-4 py-3 pl-12 rounded-lg border dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
//           />
//         </div>

//         {/* Students Table */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 dark:bg-gray-700">
//                 <tr>
//                   <th className="px-6 py-4 text-left">Photo</th>
//                   <th className="px-6 py-4 text-left">Name</th>
//                   <th className="px-6 py-4 text-left">USN</th>
//                   <th className="px-6 py-4 text-left">Department</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredStudents.map(s => (
//                   <tr key={s.usn} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
//                     <td className="px-6 py-4"><img src={s.avatar} alt={s.name} className="w-12 h-12 rounded-full object-cover" /></td>
//                     <td className="px-6 py-4 font-medium">{s.name}</td>
//                     <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{s.usn}</td>
//                     <td className="px-6 py-4">{s.dpt}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             {filteredStudents.length === 0 && (
//               <div className="text-center py-12 text-gray-500">No students found</div>
//             )}
//           </div>
//         </div>

//         {/* Enrollment Modal */}
//         <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Enroll New Student">
//           <form onSubmit={handleEnroll} className="space-y-5">
//             <div className="flex justify-center">
//               <label className="cursor-pointer">
//                 <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" required />
//                 <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-dashed border-gray-300 hover:border-primary-500 transition">
//                   {photoPreview ? (
//                     <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
//                   ) : (
//                     <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                       <Icon name="Camera" className="w-12 h-12 text-gray-400" />
//                     </div>
//                   )}
//                 </div>
//                 <p className="text-center mt-2 text-sm text-gray-600">Click to upload photo</p>
//               </label>
//             </div>

//             <input
//               type="text"
//               placeholder="Full Name"
//               value={name}
//               onChange={e => setName(e.target.value)}
//               className="w-full px-4 py-3 rounded-lg border dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//               required
//             />

//             <input
//               type="text"
//               placeholder="USN (e.g. 1RN21CS123)"
//               value={usn}
//               onChange={e => setUsn(e.target.value)}
//               className="w-full px-4 py-3 rounded-lg border dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
//               required
//             />

//             <select
//               value={dept}
//               onChange={e => setDept(e.target.value)}
//               className="w-full px-4 py-3 rounded-lg border dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
//             >
//               <option value="CSE">Computer Science</option>
//               <option value="ISE">Information Science</option>
//               <option value="ECE">Electronics</option>
//               <option value="MECH">Mechanical</option>
//               <option value="CIVIL">Civil</option>
//             </select>

//             <div className="flex justify-end gap-3 pt-4">
//               <button type="button" onClick={() => setModalOpen(false)} className="px-5py-2 px-5 border rounded-lg">
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium disabled:opacity-70"
//               >
//                 {isLoading ? 'Saving...' : 'Enroll Student'}
//               </button>
//             </div>
//           </form>
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default StudentsListPage;


// src/components/pages/StudentsListPage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Student } from '../../types';
// import { API_BASE } from '../../constants';
const API_BASE = process.env.REACT_APP_API_BASE ?? 'http://localhost:8000';
import { Icon } from '../ui/Icon';
import Modal from '../ui/Modal';
import Snackbar from '../../components/ui/snackbar';

type ModalType = 'add' | 'view' | 'edit' | 'delete' | 'closed';

const StudentsListPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalType, setModalType] = useState<ModalType>('closed');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [usn, setUsn] = useState('');
  const [dept, setDept] = useState('CSE');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Snackbar
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const showSnackbar = (msg: string, type: 'success' | 'error' = 'success') => {
    setSnackbar({ message: msg, type });
    setTimeout(() => setSnackbar(null), 4000);
  };

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/students`);
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        showSnackbar('Failed to load students', 'error');
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter(s =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.usn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.dpt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setName(''); setUsn(''); setDept('CSE'); setPhoto(null); setPhotoPreview(null);
  };

  const openModal = (type: ModalType, student?: Student) => {
    setModalType(type);
    setSelectedStudent(student || null);
    if (student) {
      setName(student.name);
      setUsn(student.usn);
      setDept(student.dpt);
      setPhotoPreview(student.avatar);
    } else {
      resetForm();
    }
  };

  const closeModal = () => {
    setModalType('closed');
    setSelectedStudent(null);
    resetForm();
  };

  // === ADD / EDIT STUDENT ===
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !usn || (!photo && modalType === 'add')) {
      showSnackbar('Name, USN and Photo are required', 'error');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', name.trim());
    formData.append('usn', usn.trim().toUpperCase());
    formData.append('department', dept);
    if (photo) formData.append('photo', photo);

    try {
      const url = modalType === 'add' ? '/api/enroll' : `/api/students/${selectedStudent?.usn}`;
      const method = modalType === 'add' ? 'POST' : 'PUT';

      const res = await fetch(`${API_BASE}${url}`, { method, body: formData });
      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      const updatedStudent: Student = {
        usn: data.usn || usn.toUpperCase(),
        name: data.name || name,
        dpt: data.department || dept,
        avatar: data.avatar || photoPreview || ''
      };

      if (modalType === 'add') {
        setStudents(prev => [updatedStudent, ...prev]);
        showSnackbar(`${name} enrolled successfully!`, 'success');
      } else {
        setStudents(prev => prev.map(s => s.usn === selectedStudent?.usn ? updatedStudent : s));
        showSnackbar(`${name} updated successfully!`, 'success');
      }

      closeModal();
    } catch (err: any) {
      showSnackbar(err.message || 'Operation failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // === DELETE STUDENT ===
  const handleDelete = async () => {
    if (!selectedStudent) return;
    setIsLoading(true);
    try {
      await fetch(`${API_BASE}/api/students/${selectedStudent.usn}`, { method: 'DELETE' });
      setStudents(prev => prev.filter(s => s.usn !== selectedStudent.usn));
      showSnackbar(`${selectedStudent.name} deleted`, 'success');
      closeModal();
    } catch (err) {
      showSnackbar('Delete failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Snackbar */}
      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          isOpen={!!snackbar}
          onClose={() => setSnackbar(null)}
        />
      )}

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Students</h1>
          <button
            onClick={() => openModal('add')}
            className="flex items-center gap-2 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium"
          >
            <Icon name="Plus" className="w-5 h-5" />
            Add Student
          </button>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-3 rounded-lg border dark:bg-gray-700"
          />
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left">Photo</th>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">USN</th>
                <th className="px-6 py-4 text-left">Dept</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(s => (
                <tr key={s.usn} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <img src={s.avatar} alt={s.name} className="w-12 h-12 rounded-full object-cover" />
                  </td>
                  <td className="px-6 py-4 font-medium">{s.name}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{s.usn}</td>
                  <td className="px-6 py-4">{s.dpt}</td>
                  <td className="px-6 py-4 text-center space-x-3">
                    <button onClick={() => openModal('view', s)} title="View">
                      <Icon name="Eye" className="w-5 h-5 text-blue-600" />
                    </button>
                    <button onClick={() => openModal('edit', s)} title="Edit">
                      <Icon name="Edit" className="w-5 h-5 text-yellow-600" />
                    </button>
                    <button onClick={() => openModal('delete', s)} title="Delete">
                      <Icon name="Trash2" className="w-5 h-5 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        <Modal isOpen={modalType !== 'closed'} onClose={closeModal} title={
          modalType === 'add' ? 'Add Student' :
          modalType === 'view' ? 'Student Details' :
          modalType === 'edit' ? 'Edit Student' : 'Delete Student'
        }>
          {/* VIEW */}
          {modalType === 'view' && selectedStudent && (
            <div className="text-center space-y-4">
              <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-32 h-32 rounded-full mx-auto object-cover" />
              <div><strong>Name:</strong> {selectedStudent.name}</div>
              <div><strong>USN:</strong> {selectedStudent.usn}</div>
              <div><strong>Department:</strong> {selectedStudent.dpt}</div>
              <button onClick={closeModal} className="mt-6 px-6 py-3 bg-primary-600 text-white rounded-lg">Close</button>
            </div>
          )}

          {/* ADD / EDIT FORM */}
          {(modalType === 'add' || modalType === 'edit') && (
            <form onSubmit={handleSave} className="space-y-5">
              <div className="flex justify-center">
                <label className="cursor-pointer">
                  <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" required={modalType === 'add'} />
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-dashed border-gray-300 hover:border-primary-500">
                    {photoPreview ? <img src={photoPreview} alt="preview" className="w-full h-full object-cover" /> :
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Icon name="Camera" className="w-12 h-12 text-gray-400" />
                      </div>
                    }
                  </div>
                </label>
              </div>

              <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-3 border rounded-lg" />
              <input type="text" placeholder="USN" value={usn} onChange={e => setUsn(e.target.value)} required disabled={modalType === 'edit'} className="w-full px-4 py-3 border rounded-lg disabled:bg-gray-100" />
              <select value={dept} onChange={e => setDept(e.target.value)} className="w-full px-4 py-3 border rounded-lg">
                <option value="CSE">Computer Science</option>
                <option value="ISE">Information Science</option>
                <option value="ECE">Electronics</option>
                <option value="MECH">Mechanical</option>
                <option value="CIVIL">Civil</option>
              </select>

              <div className="flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-5 py-2 border rounded-lg">Cancel</button>
                <button type="submit" disabled={isLoading} className="px-6 py-3 bg-primary-600 text-white rounded-lg disabled:opacity-70">
                  {isLoading ? 'Saving...' : modalType === 'add' ? 'Enroll' : 'Update'}
                </button>
              </div>
            </form>
          )}

          {/* DELETE CONFIRM */}
          {modalType === 'delete' && selectedStudent && (
            <div className="text-center">
              <p className="mb-6">Delete <strong className="text-red-600">{selectedStudent.name}</strong> permanently?</p>
              <div className="flex justify-center gap-4">
                <button onClick={closeModal} className="px-6 py-3 border rounded-lg">Cancel</button>
                <button onClick={handleDelete} disabled={isLoading} className="px-6 py-3 bg-red-600 text-white rounded-lg">
                  {isLoading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default StudentsListPage;
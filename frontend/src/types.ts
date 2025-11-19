// // // // src/types.ts
// // // export interface Student {
// // //   usn: string;
// // //   name: string;
// // //   dpt: string;
// // //   avatar: string;
// // // }

// // // export enum LogType {
// // //   IN = "IN",
// // //   OUT = "OUT",
// // // }

// // // export interface AttendanceLog {
// // //   id: string;
// // //   student: Student;
// // //   type: LogType;
// // //   timestamp: Date;
// // // }

// // // export enum RecognitionStatus {
// // //   IDLE = "idle",
// // //   RECOGNIZING = "recognizing",
// // //   SUCCESS = "success",
// // //   FAILURE = "failure",
// // // }

// // // src/types.ts
// // export interface Student {
// //   usn: string;
// //   name: string;
// //   dpt: string;
// //   avatar: string;
// // }

// // export enum LogType {
// //   IN = "IN",
// //   OUT = "OUT",
// // }

// // export interface AttendanceLog {
// //   id: string;                    // ← Fixed: string, not number
// //   student: Student;
// //   type: LogType;
// //   timestamp: Date | string;      // ← Accept both (backend sends string sometimes)
// // }

// // export enum RecognitionStatus {
// //   IDLE = "idle",
// //   RECOGNIZING = "recognizing",
// //   SUCCESS = "success",
// //   FAILURE = "failure",
// // }

// // frontend/src/types.ts
// export interface Student {
//   usn: string;
//   name: string;
//   dpt: string;
//   avatar: string;
// }

// export enum LogType {
//   IN = "IN",
//   OUT = "OUT",
// }

// export interface AttendanceLog {
//   id: string;                    // ← MUST BE string (fixes your error)
//   student: Student;
//   type: LogType;
//   timestamp: string | Date;      // ← Accepts both formats
// }

// export enum RecognitionStatus {
//   IDLE = "idle",
//   RECOGNIZING = "recognizing",
//   SUCCESS = "success",
//   FAILURE = "failure",
// }

// frontend/src/types.ts
export interface Student {
  usn: string;
  name: string;
  dpt: string;
  avatar: string;
}

export enum LogType {
  IN = "IN",
  OUT = "OUT",
}

export interface AttendanceLog {
  id: string;                    // ← MUST BE string (not number)
  student: Student;
  type: LogType;
  timestamp: string | Date;      // ← Accept both
}

export enum RecognitionStatus {
  IDLE = "idle",
  RECOGNIZING = "recognizing",
  SUCCESS = "success",
  FAILURE = "failure",
}
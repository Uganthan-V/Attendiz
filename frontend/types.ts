export interface Student {
  usn: string;
  name: string;
  dpt: string;
  avatar: string;
}

export enum AttendanceStatus {
  PRESENT = 'Present',
  ABSENT = 'Absent',
}

export enum LogType {
  IN = 'IN',
  OUT = 'OUT',
}

export interface AttendanceLog {
  id: number;
  student: Student;
  timestamp: Date;
  type: LogType;
}

export enum RecognitionStatus {
  IDLE = 'IDLE',
  RECOGNIZING = 'RECOGNIZING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

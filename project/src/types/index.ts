export interface Feedback {
  _id?: string;
  studentName: string;
  courseId: string;
  instructorId: string;
  rating: number;
  comments: string;
  createdAt?: string;
}

export interface Course {
  _id: string;
  name: string;
  code: string;
}

export interface Instructor {
  _id: string;
  name: string;
  department: string;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Student, students as defaultStudents } from '@/data/scholarshipData';

interface StudentContextType {
  students: Student[];
  addStudent: (student: Student) => void;
  updateStudent: (id: string, student: Student) => void;
  deleteStudent: (id: string) => void;
  resetToDefault: () => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

const STORAGE_KEY = 'scholarship-students';

export function StudentProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultStudents;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  const addStudent = (student: Student) => {
    setStudents(prev => [...prev, student]);
  };

  const updateStudent = (id: string, student: Student) => {
    setStudents(prev => prev.map(s => s.id === id ? student : s));
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const resetToDefault = () => {
    setStudents(defaultStudents);
  };

  return (
    <StudentContext.Provider value={{ students, addStudent, updateStudent, deleteStudent, resetToDefault }}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  localStorage = 'students';

  constructor() { }

  getStudents() {
    const students = localStorage.getItem(this.localStorage);
    return students ? JSON.parse(students) : [];
  }

  saveStudent(student: any) {
    const students = this.getStudents();
    student.id = new Date().getTime(); 
    students.push(student);
    localStorage.setItem(this.localStorage, JSON.stringify(students));
  }

  updateStudent(updatedStudent: any) {
    let students = this.getStudents();
    students = students.map((stu: any) => stu.id === updatedStudent.id ? updatedStudent : stu);
    localStorage.setItem(this.localStorage, JSON.stringify(students));
  }

  deleteStudent(id: number) {
    let students = this.getStudents();
    students = students.filter((stu: any) => stu.id !== id);
    localStorage.setItem(this.localStorage, JSON.stringify(students));
  }

  getStudentById(id: number) {
    const students = this.getStudents();
    return students.find((stu: any) => stu.id === id);
  }
}

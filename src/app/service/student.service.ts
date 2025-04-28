import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../shared/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  localStorage = 'students';
  localStorageDeleted = 'studentsDeleted';
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  students$ = this.studentsSubject.asObservable();

  constructor() {
    const isDeleted = localStorage.getItem(this.localStorageDeleted) === 'true';
    if (!isDeleted) {
      this.loadStudentFromLocalStorage();
    }
  }

  loadStudentFromLocalStorage() {
    const students = localStorage.getItem(this.localStorage);
    if (students) {
      this.studentsSubject.next(JSON.parse(students));
    } else {
      this.studentsSubject.next([
        {
          id: 1745839791109,
          name: 'Ketan Anil Sutar',
          email: 'ketan@gmail.com',
          gender: 'Male',
          phone: '9403846612',
          address: '19/68 Near Acs College',
          year: '1',
          terms: true,
          languages: 'English',
        },
        {
          id: 1745839950243,
          name: 'Dhiraj Karadage',
          email: 'dhiraj@gmail.com',
          gender: 'Male',
          phone: '1234567891',
          address: 'Kolhapur',
          year: '1',
          terms: true,
          languages: 'Marathi',
        },
      ]);
      localStorage.setItem(
        this.localStorage,
        JSON.stringify(this.studentsSubject.getValue())
      );
    }
  }

  saveStudent(student: Student) {
    const students = this.studentsSubject.getValue();
    student.id = new Date().getTime();
    students.push(student);
    this.studentsSubject.next(students);
    localStorage.setItem(this.localStorage, JSON.stringify(students));
    localStorage.setItem(this.localStorageDeleted, 'false');
  }

  updateStudent(updatedStudent: Student) {
    let students = this.studentsSubject.getValue();
    const index = students.findIndex(
      (stu: Student) => stu.id === updatedStudent.id
    );
    if (index !== -1) {
      students[index] = updatedStudent;
      this.studentsSubject.next(students);
      localStorage.setItem(this.localStorage, JSON.stringify(students));
      localStorage.setItem(this.localStorageDeleted, 'false');
    }
  }

  deleteStudent(id: number) {
    let students = [...this.studentsSubject.getValue()];
    const index = students.findIndex((stu: Student) => stu.id === id);
    if (index !== -1) {
      students.splice(index, 1);
      this.studentsSubject.next(students);
      localStorage.setItem(this.localStorage, JSON.stringify(students));
      localStorage.setItem(this.localStorageDeleted, 'true');
    }
  }

  getStudentById(id: number) {
    const students = this.studentsSubject.getValue();
    return students.find((stu: Student) => stu.id === id);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/service/student.service';
import { Student } from 'src/app/shared/student';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent {
  studentList: Student[] = [];

  constructor(
    private router: Router,
    private studentService: StudentService // Inject the service
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  // Method to load students from service
  loadStudents() {
    this.studentService.students$.subscribe((students) => {
      this.studentList = students;
      if (this.studentList.length === 0 && !localStorage.getItem('studentsDeleted')) {
        this.studentService.saveStudent({
          id: 1745839791109,
          name: 'Ketan Anil Sutar',
          email: 'ketan@gmail.com',
          gender: 'Male',
          phone: '9403846612',
          address: '19/68 Near Acs College',
          year: '1',
          terms: true,
          languages: 'English',
        });
        this.studentService.saveStudent({
          id: 1745839950243,
          name: 'Dhiraj Karadage',
          email: 'dhiraj@gmail.com',
          gender: 'Male',
          phone: '1234567891',
          address: 'Kolhapur',
          year: '1',
          terms: true,
          languages: 'Marathi',
        });
      }
    });
  }

  // Navigate to edit student page
  editStudent(id: number) {
    this.router.navigate(['/edit-student', id]);
  }

  // Delete student from the list and local storage
  deleteStudent(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this student?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        this.studentService.deleteStudent(id);
      }
    });
  }
}


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/service/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent {
  students: any[] = [];
  student = [
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
      name: 'Dhiraj Karadage',
      email: 'dhiraj@gmail.com',
      gender: 'Male',
      phone: '1234567891',
      address: 'Kolhapur',
      year: '1',
      terms: true,
      languages: 'Marathi',
      id: 1745839950243,
    },
  ];
  constructor(
    private router: Router,
    private studentService: StudentService // Inject the service
  ) {


  }

  ngOnInit(): void {
    this.loadStudents();

    if (this.students) {
      localStorage.setItem(
        this.studentService.localStorage,
        JSON.stringify(this.student)
      );
    }
  }

  // Method to load students from local storage using the service
  loadStudents() {
    this.students = this.studentService.getStudents();
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
        this.loadStudents();
      }
    });
  }
}

import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/service/student.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-update-student',
  templateUrl: './add-update-student.component.html',
  styleUrls: ['./add-update-student.component.css'],
})
export class AddUpdateStudentComponent {
  studentForm: FormGroup = new FormGroup({});
  isEditMode: boolean = false;
  studentId: number | null = null;
  languages: string[] = ['English', 'Marathi', 'Hindi'];
  filteredLanguages: string[] = this.languages;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.studentId = +id;
        this.loadStudentData(this.studentId);
      }
    });
  }

  initForm() {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: [null, Validators.required],
      phone: [
        '',
        Validators.compose([
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
      ],
      address: [''],
      year: [null, Validators.required],
      terms: [false, Validators.requiredTrue],
      languages: ['', Validators.required],
    });
  }

  get control() {
    return this.studentForm.controls;
  }

  // Load the student data for editing
  loadStudentData(id: number) {
    const student = this.studentService.getStudentById(id);
    if (student) {
      this.studentForm.patchValue(student);
    }
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const formData = this.studentForm.value;

      if (this.isEditMode) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Update Data Successfully',
          timer: 5000,
        });
        const updatedStudent = { id: this.studentId, ...formData };
        this.studentService.updateStudent(updatedStudent);
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Save Data Successfully',
          timer: 5000,
        });
        this.studentService.saveStudent(formData);
      }
      this.router.navigate(['/student-list']);
    } else {
      Swal.fire({
        title: 'Information',
        text: 'Please fill all the mandatory fields',
        timer: 2000,
        icon: 'info',
      });
      this.studentForm.markAllAsTouched();
    }
  }

  filterLanguages(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredLanguages = this.languages.filter((language) =>
      language.toLowerCase().includes(query)
    );
  }

  goBack(routeMessage: string) {
    let message = routeMessage == 'BACK' ? 'Back' : 'Cancel';
    Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to ${message}?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        this.router.navigate(['/student-list']);
      }
    });
  }
}


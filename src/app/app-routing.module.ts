import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { AddUpdateStudentComponent } from './components/add-update-student/add-update-student.component';

const routes: Routes = [
  { path: '', redirectTo: 'student-list', pathMatch: 'full' },
  { path: 'student-list', component: StudentListComponent, pathMatch: 'full' },
  {
    path: 'add-student',
    component: AddUpdateStudentComponent,
    pathMatch: 'full',
  },
  {
    path: 'edit-student/:id',
    component: AddUpdateStudentComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

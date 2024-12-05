import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { AuthComponent } from './auth/auth.component';
import { SessionsComponent } from './sessions/sessions.component';
import { TeachersComponent } from './teachers/teachers.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { StudentsComponent } from './students/students.component';



const routes: Routes = [
  { path: 'rooms', component: RoomsComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'sessions', component: SessionsComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'students', component: StudentsComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

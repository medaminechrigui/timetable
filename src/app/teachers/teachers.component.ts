import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Teacher } from '../models/teacher.model';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[] = []; // List of teachers
  editingTeacher: Teacher | null = null; // Teacher to be edited
  isAddingTeacher: boolean = false; // Flag to show add teacher form
  newTeacher: Teacher = { // Default object for a new teacher
    teacher_id: '',
    first_name: '',
    last_name: '',
    email: '',
    department: '',
    phone: ''
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getTeachers().subscribe((data: Teacher[]) => {
      this.teachers = data;
    });
  }

  // Start adding a new teacher
  startAddTeacher(): void {
    this.isAddingTeacher = true;
  }

  // Cancel adding a teacher
  cancelAdd(): void {
    this.isAddingTeacher = false;
    this.newTeacher = { teacher_id: '', first_name: '', last_name: '', email: '', department: '', phone: '' };
  }

  // Add a new teacher to the list
  addTeacher(): void {
    if (this.newTeacher.first_name && this.newTeacher.email && this.newTeacher.department && this.newTeacher.phone) {
      // Generate a teacher ID and push to the array
      this.newTeacher.teacher_id = (this.teachers.length + 1).toString(); // Ensure ID is a string
      this.teachers.push({ ...this.newTeacher });
      this.cancelAdd(); // Reset the form after adding
    }
  }

  // Edit a teacher's details
  editTeacher(teacher: Teacher): void {
    this.editingTeacher = { ...teacher }; // Copy the teacher's details for editing
  }

  // Cancel editing
  cancelEdit(): void {
    this.editingTeacher = null;
  }
  updateTeacher(): void {
    if (this.editingTeacher) { // Vérifie si editingTeacher n'est pas null
      const index = this.teachers.findIndex(teacher => teacher.teacher_id === this.editingTeacher!.teacher_id); // Ajoutez "!" ici
      if (index !== -1) {
        // Met à jour l'enseignant dans la liste
        this.teachers[index] = { ...this.editingTeacher }; // Crée une copie pour éviter toute modification imprévu
      }
      this.cancelEdit(); // Ferme le formulaire d'édition
    }
  }
  
  

  // Save the changes to the teacher's information

  // Delete a teacher from the list
  deleteTeacher(teacherId: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this teacher?');
    if (confirmDelete) {
      this.teachers = this.teachers.filter(teacher => teacher.teacher_id !== teacherId); // Remove the teacher
    }
  }
}


import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[] = []; // Liste des étudiants
  editingStudent: Student | null = null; // Étudiant à éditer
  isAddingStudent: boolean = false; // Flag pour afficher le formulaire d'ajout
  newStudent: Student = { // Objet par défaut pour un nouvel étudiant
    student_id: '',
    first_name: '',
    last_name: '',
    email: ''
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Récupération des étudiants à partir du service
    this.dataService.getStudents().subscribe(
      (data: Student[]) => {
        this.students = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des étudiants :', error);
      }
    );
  }

  // Commence l'ajout d'un nouvel étudiant
  startAddStudent(): void {
    this.isAddingStudent = true;
  }

  // Annule l'ajout d'un étudiant
  cancelAdd(): void {
    this.isAddingStudent = false;
    this.newStudent = { student_id: '', first_name: '', last_name: '', email: '' };
  }

  // Ajoute un nouvel étudiant à la liste
  addStudent(): void {
    if (this.newStudent.first_name && this.newStudent.email) {
      // Génère un ID étudiant et ajoute à la liste
      this.newStudent.student_id = (this.students.length + 1).toString(); // Assure que l'ID est une chaîne
      this.students.push({ ...this.newStudent });
      this.cancelAdd(); // Réinitialise le formulaire après ajout
    }
  }

  // Édite les détails d'un étudiant
  editStudent(student: Student): void {
    this.editingStudent = { ...student }; // Copie les détails de l'étudiant pour l'édition
  }

  // Annule l'édition
  cancelEdit(): void {
    this.editingStudent = null;
  }

  // Met à jour les informations de l'étudiant
  updateStudent(): void {
    if (this.editingStudent) {
      const index = this.students.findIndex(student => student.student_id === this.editingStudent!.student_id);
      if (index !== -1) {
        // Met à jour l'étudiant dans la liste
        this.students[index] = { ...this.editingStudent }; // Crée une copie pour éviter toute modification imprévue
      }
      this.cancelEdit(); // Ferme le formulaire d'édition
    }
  }

  // Supprime un étudiant de la liste
  deleteStudent(studentId: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      this.students = this.students.filter(student => student.student_id !== studentId); // Supprime l'étudiant
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Subject } from '../models/subject.model';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  subjects: Subject[] = [];
  editingSubject: Subject | null = null;
  isAddingSubject: boolean = false;
  newSubject: Subject = {
    subject_id: '',  // Assurez-vous que ceci correspond bien à la structure du backend
    subject_name: '',
    subject_code: '',
    department: '',
    description: ''
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getSubjects().subscribe(
      (data) => {
        this.subjects = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des matières :', error);
      }
    );
  }

  startAddSubject(): void {
    this.isAddingSubject = true;
    this.editingSubject = null; // Réinitialise l'état d'édition
  }
  
  cancelAdd(): void {
    this.isAddingSubject = false;
    this.newSubject = {
      subject_id: '',
      subject_name: '',
      subject_code: '',
      department: '',
      description: ''
    };
  }
  
  editSubject(subject: Subject): void {
    this.isAddingSubject = false; // Assurez-vous que l'ajout est désactivé
    this.editingSubject = { ...subject }; // Réinitialise l'objet à éditer
  }
  
  cancelEdit(): void {
    this.editingSubject = null;
  }
  

  addSubject(): void {
    if (this.newSubject.subject_name && this.newSubject.subject_code && this.newSubject.department) {
      // Si subject_id doit être un nombre ou une chaîne unique, ajustez cette ligne
      this.subjects.push({ ...this.newSubject, subject_id: (this.subjects.length + 1).toString() });
      this.cancelAdd();
    }
  }

  
  updateSubject(): void {
    if (this.editingSubject) {
      const editingSubject = this.editingSubject as Subject; // Forcer le type ici
      const index = this.subjects.findIndex(subject => subject.subject_id === editingSubject.subject_id);
      if (index !== -1) {
        this.subjects[index] = { ...editingSubject };
      }
      this.cancelEdit();
    }
  }
  
  



  deleteSubject(subjectId: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this subject?');
    if (confirmDelete) {
      this.subjects = this.subjects.filter(subject => subject.subject_id !== subjectId);
    }
  }
}



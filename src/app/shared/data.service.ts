import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import data from '../../assets/timetable.json';  

import { Room } from '../models/room.model';
import { Teacher } from '../models/teacher.model';
import { Subject } from '../models/subject.model';
import { Class } from '../models/class.model';
import { Session } from '../models/session.model';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private classes: Class[] = data.classes; // Charger les classes depuis le fichier JSON

  constructor() {}

  getRooms(): Observable<Room[]> {
    return of(data.rooms);  
  }

  getTeachers(): Observable<Teacher[]> {
    return of(data.teachers); 
  }

  getSubjects(): Observable<Subject[]> {
    return of(data.subjects); 
  }

  getSessions(): Observable<Session[]> {
    return of(data.sessions); 
  }

  getStudents(): Observable<Student[]> {
    return of(data.students);
  }

  // Méthode pour mettre à jour une classe
  updateClass(updatedClass: Class): Observable<Class | null> {
    const index = this.classes.findIndex(c => c.class_id === updatedClass.class_id);
    if (index !== -1) {
      this.classes[index] = updatedClass;  // Mettre à jour la classe dans le tableau
      return of(updatedClass);  // Retourner la classe mise à jour
    }
    return of(null);  // Retourner null si aucune classe n'a été trouvée
  }
}

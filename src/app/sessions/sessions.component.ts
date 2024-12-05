import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';  

@Component({
  selector: 'app-sessions',  
  templateUrl: './sessions.component.html',  
  styleUrls: ['./sessions.component.css'],  
})
export class SessionsComponent implements OnInit {
  sessions: any[] = [];  
  editingSession: any = null;  
  isAddingSession: boolean = false;  
  newSession: any = { subject_id: '', teacher_id: '', room_id: '', class_id: '', session_date: '', start_time: '', end_time: '' };  

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getSessions().subscribe((data: any[]) => {
      this.sessions = data;  
    });
  }

  startAddSession(): void {
    this.isAddingSession = true;  
  }

  cancelAdd(): void {
    this.isAddingSession = false;  
    this.newSession = { subject_id: '', teacher_id: '', room_id: '', class_id: '', session_date: '', start_time: '', end_time: '' };  
  }

  addSession(): void {
    if (this.newSession.subject_id && this.newSession.teacher_id && this.newSession.room_id && this.newSession.class_id) {
      this.sessions.push({ ...this.newSession, session_id: this.sessions.length + 1 });
      this.cancelAdd(); 
    }
  }

  editSession(session: any): void {
    this.editingSession = { ...session };  
  }

  cancelEdit(): void {
    this.editingSession = null;  
  }

  updateSession(): void {
    if (this.editingSession) {
      const index = this.sessions.findIndex(session => session.session_id === this.editingSession.session_id);
      if (index !== -1) {
        this.sessions[index] = this.editingSession;  
      }
      this.cancelEdit();  
    }}
    deleteSession(sessionId: string): void {
      const confirmDelete = confirm('Are you sure you want to delete this session?');
      if (confirmDelete) {
        this.sessions = this.sessions.filter(session => session.session_id !== sessionId);  
      }
    }
    }


import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';  

@Component({
  selector: 'app-rooms',  
  templateUrl: './rooms.component.html',  
  styleUrls: ['./rooms.component.css'],  
})
export class RoomsComponent implements OnInit {
  rooms: any[] = [];  
  editingRoom: any = null;  
  isAddingRoom: boolean = false;  
  newRoom: any = { room_name: '', capacity: null, building: '', floor: null };  

  constructor(private dataService: DataService) {}

  ngOnInit(): void {

    this.dataService.getRooms().subscribe((data: any[]) => {
      this.rooms = data;  
    });
  }

  
  startAddRoom(): void {
    this.isAddingRoom = true;  
  }

  cancelAdd(): void {
    this.isAddingRoom = false;  
    this.newRoom = { room_name: '', capacity: null, building: '', floor: null };  
  }

  addRoom(): void {
    if (this.newRoom.room_name && this.newRoom.capacity && this.newRoom.building && this.newRoom.floor) {
      this.rooms.push({ ...this.newRoom, room_id: this.rooms.length + 1 });
      this.cancelAdd(); 
    }
  }

  editRoom(room: any): void {
    this.editingRoom = { ...room };  
  }


  cancelEdit(): void {
    this.editingRoom = null;  
  }

  updateRoom(): void {
    if (this.editingRoom) {
      const index = this.rooms.findIndex(room => room.room_id === this.editingRoom.room_id);
      if (index !== -1) {
        this.rooms[index] = this.editingRoom;  
      }
      this.cancelEdit();  
    }
  }

  deleteRoom(roomId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this room?');
    if (confirmDelete) {
      this.rooms = this.rooms.filter(room => room.room_id !== roomId);  
    }
  }
}





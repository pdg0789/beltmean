import { Component, OnInit} from '@angular/core';
import { UserService} from '../user.service';
import { AppointmentService} from '../appointment.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  currentUser = {};
  appointments:any[]= [];
  constructor(
    private _userService:UserService,
    private _appointmentService:AppointmentService,
    private router:Router
  ) {}
  ngOnInit() {
    this.isLoggedIn();
    this.getCurrentUser();
    this.getAppointments();
  }
  getCurrentUser(){
    this.currentUser = this._userService.getCurrentUser();
  }
  logout(){
    this._userService.logout();
    this.router.navigateByUrl('/');
  }
  isLoggedIn(){
    if(this._userService.getCurrentUser() == null){
      this.router.navigateByUrl('/');
    }
  }
  getAppointments(){
  return this._appointmentService.index()
  .then(appointments => this.appointments = appointments)
  .catch(err => console.log(err));
}
}

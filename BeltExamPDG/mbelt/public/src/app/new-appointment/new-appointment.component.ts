import {Component, OnInit} from '@angular/core';
import { UserService} from '../user.service';
import { AppointmentService} from '../appointment.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css']
})
export class NewAppointmentComponent implements OnInit {
  currentUser = {_id:''};
  newAppointment = {user:''};
  errors:string[] = [];
  constructor(
    private _userService:UserService,
    private _appointmentService:AppointmentService,
    private router:Router
  ) { }
  ngOnInit() {
    this.isLoggedIn();
    this.getCurrentUser();
  }
  createAppointment(){
    this.errors =[];
    console.log(this.newAppointment);
    this.newAppointment.user = this.currentUser._id;
    return this._appointmentService.create(this.newAppointment)
    .then(appointment =>{
      if(appointment.errors){
        for(let key in appointment.errors){
          let error = appointment.errors[key];
          this.errors.push(error.message);
        }
      }else{
        this.router.navigateByUrl('/dashboard')
      }
    })
    .catch(err => console.log(err));
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
}

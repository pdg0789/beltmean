import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() createUserEvent = new EventEmitter;
  loginUser ={};
  newUser = {};
  registrationErrors = [];

  constructor(private _userService: UserService) { }

  ropagateUser(newUser){
  console.log('in the app component')
  this.createUserEvent.emit(newUser)
}
login(loginUser){
  return this._userService.authenticate(loginUser)
  .then(data => {
    if(data.errors){
      for(let key in data.errors){
        let error = data.errors[key];
        this.loginErrors.push(error.message);
      }
    } else{
      this.propagateUser(data);
    }
  })
  .catch(err => {console.log(err)})
}
createUser(newUser){
  console.log('in app component');
  console.log(newUser);
  return this._userService.create(newUser)
  .then(user => {
    console.log(user)
    if(user.errors){
      for(let key in user.errors){
        let error = user.errors[key];
        this.registrationErrors.push(error.message);
      }
    } else{
      this.propagateUser(user);
    }
  })
  .catch(err => {console.log(err) })
}

  ngOnInit() {
  }

}

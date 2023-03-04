import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  title = 'Create new user';

  user: User = new User();
  users: User[] = [];

  constructor(private service: UserService, private router: Router) {}


  saveUser() {
    this.service.createUser(this.user).subscribe((data) => console.log(data));
    this.goToUserList();
  }

  onSubmit(addForm: NgForm) {
    this.saveUser();
    addForm.reset();
  }

  goToUserList() {
    this.router.navigate(['/users']);
  }
}

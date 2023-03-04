import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  title = 'User Management';

  userList: User[];

  constructor(private service: UserService,
              private router: Router) {}

  ngOnInit(): void {
    this.getUserList();
  }

  private getUserList(): void {
    this.service.getUsers().subscribe((response: User[]) => {
      this.userList = response;
      console.log(this.userList);
    });
  }

  updateUser(id:number){
    this.router.navigate(['update-user', id]);
  }

  deleteUser(id:number){
    this.service.deleteUser(id).subscribe(data => {
      console.log(data);
      this.getUserList();
    })
  }

  getDetails(id:number){
    this.router.navigate(['details-user', id]);
  }
}

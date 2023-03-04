import { Component } from '@angular/core';
import {User} from "../user";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../user.service";

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent {
  title = 'User Details';
  id: number;
  user: User;
  constructor(private route: ActivatedRoute, private service: UserService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.user = new User();
    this.service.getUserById(this.id).subscribe( data => {
      this.user = data;
    });
  }

}

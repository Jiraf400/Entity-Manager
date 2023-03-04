import {Component} from '@angular/core';
import {User} from "../user";
import {UserService} from "../user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
})
export class UpdateUserComponent {

  title = 'update user';
  id: number;
  user: User = new User();

  constructor(private service: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.service.getUserById(this.id).subscribe(data => {
      this.user = data;
    });
  }

  onSubmit() {
    this.service.updateUser(this.id, this.user).subscribe(data => {
        this.goToEmployeeList();
      });
  }

  goToEmployeeList() {
    this.router.navigate(['/users']);
  }

}

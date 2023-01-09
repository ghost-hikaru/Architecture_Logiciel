import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  constructor(private api: ApiHelperService,private router: Router,
    private tokenStorageService: TokenStorageService) { }

  newUser = new FormGroup({
    firstname : new FormControl(''),
    lastname : new FormControl(''),
    age : new FormControl(''),
    password : new FormControl(''),
  });

  ngOnInit(): void {}

  onSubmit() {
    const firstname = this.newUser.value.firstname;
    const lastname = this.newUser.value.lastname;
    const age = this.newUser.value.age;
    const password = this.newUser.value.password;
    this.api.post({endpoint: '/users/', data:{firstname,lastname,age,password}}).then(response => console.log(response));
    
    
    if(this.tokenStorageService.isLogged()){
      this.router.navigateByUrl('/espace-perso');
    }else{
      this.router.navigateByUrl('/');
    }
  }

}

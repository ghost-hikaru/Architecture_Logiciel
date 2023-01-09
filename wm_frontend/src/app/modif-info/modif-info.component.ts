import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-modif-info',
  templateUrl: './modif-info.component.html',
  styleUrls: ['./modif-info.component.scss']
})

export class ModifInfoComponent implements OnInit {

  constructor(private api: ApiHelperService,private router: Router,private tokenStorageService: TokenStorageService) { }


  newUser = new FormGroup({
    firstname : new FormControl(''),
    lastname : new FormControl(''),
    age : new FormControl(''),
  });

  ngOnInit(): void {}

  onSubmit() {
    const firstname = this.newUser.value.firstname;
    const lastname = this.newUser.value.lastname;
    const age = this.newUser.value.age;
    const id = this.tokenStorageService.getId();
    this.api.put({endpoint: '/users/'+id, data:{firstname,lastname,age}}).then(response => console.log(response));
    this.router.navigateByUrl('/espace-perso');
  }

}

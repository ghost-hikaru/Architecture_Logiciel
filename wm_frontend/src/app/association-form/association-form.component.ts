import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-association-form',
  templateUrl: './association-form.component.html',
  styleUrls: ['./association-form.component.scss']
})
export class AssociationFormComponent implements OnInit {
  dataSource:any[] = [];
  
  constructor(private api: ApiHelperService,private router: Router,private http: HttpClient) { }

  newAssoc = new FormGroup({
    name : new FormControl(''),
    user : new FormControl([]),

  });

  ngOnInit(): void {
    this.listeUser();
  }

  listeUser(){
    const resquest: Observable<any> = this.http.get('http://localhost/api/users', { observe: 'response' });
    resquest.toPromise().then(response => this.dataSource=response.body);
    console.log(this.dataSource);
    
  }

  onSubmit() {
    const name = this.newAssoc.value.name;
    const idUsers = this.newAssoc.value.user;

    this.api.post({endpoint: '/associations/', data:{idUsers,name}}).then(response => console.log(response));
    this.router.navigateByUrl('/espace-perso');
  }


}

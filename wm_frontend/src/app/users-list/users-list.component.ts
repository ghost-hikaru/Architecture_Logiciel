import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiHelperService } from '../services/api-helper.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})

@Injectable({
  providedIn:'root'
})

export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age', 'plus', 'delete'];
  dataSource = [];
  constructor(private http: HttpClient,  private api: ApiHelperService,  private router: Router,) { }

  ngOnInit(): void {
    this.listeUser();
  }

  listeUser(){
    const resquest: Observable<any> = this.http.get('http://localhost/api/users', { observe: 'response' });
    resquest.toPromise().then(response => this.dataSource = response.body);
  }

  removeUser(user:any){
    let id = user.id;
    this.api.delete({endpoint: '/users/'+id, queryParams : { user }}).then(response => console.log(response));
    location.reload();
  }

  setDataSource(tabUser : never[]){
    this.dataSource = tabUser;
  }
}



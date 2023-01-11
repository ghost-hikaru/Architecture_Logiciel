import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AssociationListComponent } from '../association-list/association-list.component';
import { UsersListComponent } from '../users-list/users-list.component';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router,
     private userlist : UsersListComponent, private assolist : AssociationListComponent) { }
  
  searchForm = new FormGroup({
    user : new FormControl('')
  });

  ngOnInit(): void {
  }

  onSubmit() {
    const searching = this.searchForm.value.user;
    if (this.router.url ==="/users") {
    const resquest: Observable<any> = this.http.get('http://localhost/api/users/'+searching+"/ByName", { observe: 'response' });
    resquest.toPromise().then(response => this.userlist.setDataSource(response.body));
    }
    else if (this.router.url === "/associations"){
      const resquest: Observable<any> = this.http.get('http://localhost/api/associations/'+searching+"/ByName", { observe: 'response' });
    resquest.toPromise().then(response => this.assolist.setDataSource(response.body));
    }
  }
}

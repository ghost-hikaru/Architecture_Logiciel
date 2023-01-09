import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiHelperService } from '../services/api-helper.service';

@Component({
  selector: 'app-association-list',
  templateUrl: './association-list.component.html',
  styleUrls: ['./association-list.component.scss']
})

@Injectable({
  providedIn:'root'
})

export class AssociationListComponent implements OnInit {


  displayedColumns: string[] = ['id', 'name','plus','delete'];
  dataSource = [];
  constructor(private http: HttpClient,  private api: ApiHelperService,  private router: Router,) { }

  ngOnInit(): void {
    this.listeAssociation();
  }

  listeAssociation(){
    const resquest: Observable<any> = this.http.get('http://localhost:3000/associations', { observe: 'response' });
    resquest.toPromise().then(response => this.dataSource = response.body);
  }

  removeAssociation(association:any){
    let id = association.id;
    this.api.delete({endpoint: '/associations/'+id, queryParams : { association }}).then(response => console.log(response));
    location.reload();
  }

  setDataSource(tabAsso : never[]){
    this.dataSource = tabAsso;
  }

}


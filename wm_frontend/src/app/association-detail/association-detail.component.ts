import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiHelperService } from '../services/api-helper.service';

@Component({
  selector: 'app-association-detail',
  templateUrl: './association-detail.component.html',
  styleUrls: ['./association-detail.component.scss']
})
export class AssociationDetailComponent implements OnInit {
  id: any;
  assoc: any;
  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age'];
  dataSource = [];
  constructor(private http: HttpClient,private api: ApiHelperService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( res => {
      this.id = res.get('id');
      
    })
    const resquest: Observable<any> = this.http.get('http://localhost/api/associations/'+this.id, { observe: 'response' });
    resquest.toPromise().then(response => this.assoc = response.body);

    const resquest2: Observable<any> = this.http.get('http://localhost/api/associations/'+this.id+'/members', { observe: 'response' });
    resquest2.toPromise().then(response => this.dataSource = response.body);

  }

}

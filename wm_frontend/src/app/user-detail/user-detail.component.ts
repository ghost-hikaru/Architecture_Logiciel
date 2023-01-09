import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  id: any;
  user: any;
  constructor(private http: HttpClient,private api: ApiHelperService,  private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( res => {
      this.id = res.get('id');
      
    })
    const resquest: Observable<any> = this.http.get('http://localhost:3000/users/'+this.id, { observe: 'response' });
    resquest.toPromise().then(response => this.user=response.body);
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-espace-perso',
  templateUrl: './espace-perso.component.html',
  styleUrls: ['./espace-perso.component.scss']
})
export class EspacePersoComponent implements OnInit {
  constructor(private tokenStorageService: TokenStorageService,private http: HttpClient){}
  
  

  
  firstname="";
  id=this.tokenStorageService.getId();
  lastname="";
  age="";

  ngOnInit(): void {
    const resquest: Observable<any> = this.http.get('http://localhost:3000/users/'+this.tokenStorageService.getId(), { observe: 'response' });
    resquest.toPromise().then(response => {
      this.firstname = response.body.firstname
      this.lastname = response.body.lastname
      this.age = response.body.age
    });
  }

}

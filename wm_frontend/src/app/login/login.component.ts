import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  //isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  
  constructor(
    private api: ApiHelperService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
  ){}

  login(): void {
    this.tokenStorageService.clear();
    const id: string = (document.getElementById('username') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;

    this.api.post({endpoint: '/auth/login', data: { username: id, password }}).then(response => {
      this.tokenStorageService.save(response.access_token,id)

      if(this.tokenStorageService.isLogged()){
        this.router.navigateByUrl('/espace-perso');

      }else{
        this.router.navigateByUrl('/');
      }
    }).catch(()=>this.router.navigateByUrl('/'));    
    
  }

  signup(): void{
    this.router.navigateByUrl('/addUser')
  }

}

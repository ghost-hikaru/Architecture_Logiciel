import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  constructor(
    private service: TokenStorageService,
    private route: Router,
  ) { }
  @Input()
  ngOnInit(): void {
  }

  logout(): void {
    this.service.clear();
    this.route.navigateByUrl("/");
  }

  espace(): void {
    //console.log("click on logout !");
    this.service.clear();
    this.route.navigateByUrl("/espace-perso");
  }

  userList(): void {
    //console.log("click on logout !");
    this.service.clear();
    this.route.navigateByUrl("/users");
  }

  assoList(): void {
    //console.log("click on logout !");
    this.service.clear();
    this.route.navigateByUrl("/associations");
  }

  event(): void{
    this.service.clear();
    this.route.navigateByUrl("/event");
  }


}

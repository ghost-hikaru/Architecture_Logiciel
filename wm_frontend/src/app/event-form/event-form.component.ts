import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  constructor(private api: ApiHelperService,private router: Router,private http: HttpClient) { }

  event = new FormGroup({
    name : new FormControl(''),
  });

  ngOnInit(): void {
  }

  onSubmit() {
    const name = this.event.value.name;
    this.api.post({endpoint: '/rabbitmq/', data:{name}}).then(response => console.log(response));
    this.router.navigateByUrl('/espace-perso');
  }

}

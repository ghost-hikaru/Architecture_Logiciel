import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssociationDetailComponent } from './association-detail/association-detail.component';
import { AssociationFormComponent } from './association-form/association-form.component';
import { AssociationListComponent } from './association-list/association-list.component';
import { EspacePersoComponent } from './espace-perso/espace-perso.component';
import { EventFormComponent } from './event-form/event-form.component';
import { LoginComponent } from './login/login.component';
import { ModifInfoComponent } from './modif-info/modif-info.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  { 
    path: 'users', 
    component: UsersListComponent
  },
  { 
    path: 'associations', 
    component: AssociationListComponent,
  },
  { 
    path: 'espace-perso', 
    component: EspacePersoComponent,
  },
  {
    path: 'user-detail/:id',
    component: UserDetailComponent,
  },
  {
    path: 'association-detail/:id',
    component: AssociationDetailComponent,
  },
  {
    path: 'addUser',
    component: UserFormComponent,
  },
  {
    path: 'addAssociation',
    component: AssociationFormComponent,
  },
  {
    path: 'modification',
    component: ModifInfoComponent,
  },
  {
    path:'event',
    component: EventFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

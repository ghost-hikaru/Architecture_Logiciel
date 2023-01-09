import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { LoginComponent } from './login/login.component'; 
import { TokenHttpInterceptor } from './interceptors/token.interceptor';
import { NavComponent } from './nav/nav.component';
import { AssociationListComponent } from './association-list/association-list.component';
import { EspacePersoComponent } from './espace-perso/espace-perso.component';
import {MatIconModule} from '@angular/material/icon'
import { MatCardModule} from '@angular/material/card';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AssociationDetailComponent } from './association-detail/association-detail.component';
import { AssociationFormComponent } from './association-form/association-form.component';
import { UserFormComponent } from './user-form/user-form.component'
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { ModifInfoComponent } from './modif-info/modif-info.component';
import { EventFormComponent } from './event-form/event-form.component';



@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    LoginComponent,
    NavComponent,
    AssociationListComponent,
    EspacePersoComponent,
    UserDetailComponent,
    AssociationDetailComponent,
    AssociationFormComponent,
    UserFormComponent,
    SearchComponent,
    ModifInfoComponent,
    EventFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

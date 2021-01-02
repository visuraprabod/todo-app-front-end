import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TaskService} from './service/task.service';
import {TaskItemComponent} from './task-item/task-item.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {HeaderComponent} from './header/header.component';
import {LoginService} from './service/login.service';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    TaskItemComponent,
    LoginComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
  ],
  providers: [TaskService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

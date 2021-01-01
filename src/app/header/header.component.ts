import { Component, OnInit } from '@angular/core';
import {LoginService} from '../service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username = 'Welcome to todoist App';


  constructor(public loginService: LoginService) { }


  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentTime: string = moment().format('D MMMM YYYY ');
// currentTime: string = moment().format('D MMMM YYYY HH:mm:ss');
  
  constructor() {
    moment.locale('ru');
  }

  ngOnInit(): void {
  }

}

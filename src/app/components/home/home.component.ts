import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private __appService: AppService
  ) { }

  errorMessage = ''
  data : any = []

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.__appService.getData().subscribe((res) => {
      this.data = res;
    },error=>
      this.errorMessage = error
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  newAuthor:any
  new_error = []

  constructor(
    private _httpService: HttpService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.newAuthor = { name: ""}
  }

  onSubmit() {
    this._httpService.addAuthor(this.newAuthor)
      .subscribe((data: any) => {
        this.newAuthor = { name: ""}
        if(data.message == "success"){
          this.goHome();
        }
        else{
          this.new_error = []
          let error_keys = Object.keys(data['errors']);
          for (var error_key of error_keys) {
            this.new_error.push(data['errors'][error_key]['message'])
          }
        }
      })
  }

  goHome(){
    this._router.navigate(['/']);
  }

}

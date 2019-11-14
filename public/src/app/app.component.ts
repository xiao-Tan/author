import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'public';
  authors:any

  constructor(
    private _httpService: HttpService,
    public _route: ActivatedRoute
  ) { }
  
  ngOnInit(){
    this.getAllAuthors();
  }

  getAllAuthors(){
    this._httpService.getAuthors()
      .subscribe(data => {
        this.authors = data['result']
      })
  }

  delete(id){
    this._httpService.deleteAuthor(id)
      .subscribe(data => {
        this.getAllAuthors();
      })
  }
}

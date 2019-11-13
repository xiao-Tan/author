import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {

  id:any
  thisAuthor: {}
  newQuote :any
  new_error = []
  name:any

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    this.getAuthor();
    this.newQuote = {"quote": ""}
  }

  getAuthor(){
    this._httpService.getOneAuthor(this.id)
      .subscribe(data => {
        if(data['message'] == "success"){
          this.thisAuthor = data['result']
          this.name = this.thisAuthor['name']
        }
        else{
          this.goHome();
        }
      })
  }

  onSubmit(){ 
    this._httpService.addQuote(this.id, this.newQuote)
      .subscribe((data : any) => {
        if(data.message == "success"){
          this.goQuote();
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

  goQuote(){
    this._router.navigate(['/quotes', this.id]);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {

  id: any
  thisAuthor: any
  allQuote = []
  name :any
  vote:any


  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    this.getAllQuotes()
  }

  getAllQuotes(){
    this._httpService.getOneAuthor(this.id)
      .subscribe(data => {
        if(data['message'] == "success"){
          this.thisAuthor = data['result']
          this.name = this.thisAuthor['name']
          this.allQuote = this.thisAuthor["quotes"]
        }
        else{
          this.goHome();
        }
      })
  }

  delete(q_id){
    this._httpService.deleteQuote(this.id, q_id)
      .subscribe(data => {
        this.getAllQuotes();
      })

  }

  voteUp(q_id){
    this._httpService.voteUp(this.id, q_id,this.vote)
      .subscribe(data => {
        console.log(data)
        this.getAllQuotes()
      })
  }

  voteDown(q_id){
    this._httpService.voteDown(this.id, q_id,this.vote)
      .subscribe(data => {
        console.log(data)
        this.getAllQuotes()
      })
  }

  goHome(){
    this._router.navigate(['/']);
  }

}

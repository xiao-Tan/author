import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: any
  editAuthor = {}
  edit_error = []

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    this._httpService.getOneAuthor(this.id)
      .subscribe(data => {
        if(data['message'] == "success"){
          this.editAuthor = data['result']
        }
        else{
          this.goHome();
        }
      })
  }

  onSubmit(){
    this._httpService.editAuthor(this.id, this.editAuthor)
      .subscribe((data:any) => {
        if(data.message == "success"){
          this.goHome();
        }
        else{
          this.edit_error = []
          let error_keys = Object.keys(data['errors']);
          for (var error_key of error_keys) {
            this.edit_error.push(data['errors'][error_key]['message'])
          }
        }
      })
  }

  goHome(){
    this._router.navigate(['/']);
  }

}

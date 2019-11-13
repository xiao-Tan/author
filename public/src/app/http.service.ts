import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAuthors(){
    return this._http.get('/authors');
  }

  getOneAuthor(id){
    return this._http.get(`/author/${id}`)
  }

  addAuthor(newAuthor){
    return this._http.post('/author', newAuthor)
  }

  editAuthor(id, edit_author){
    return this._http.put(`/author/${id}`, edit_author)
  }

  addQuote(id, newQuote){
    return this._http.post(`/author/${id}`,newQuote)
  }

  deleteQuote(a_id, q_id){
    return this._http.delete(`/author/${a_id}/${q_id}`)
  }

  voteUp(a_id, q_id, vote){
    return this._http.put(`/up/${a_id}/${q_id}`, vote)
  }

  voteDown(a_id, q_id, vote){
    return this._http.put(`/down/${a_id}/${q_id}`, vote)
  }

}

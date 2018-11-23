import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  uri='http://localhost:4000'

  constructor(private http: HttpClient) { }

  getPosts(){
    return this.http.get(`${this.uri}/posts`)
  }

  getLogs(){
    return this.http.get(`${this.uri}/logs`)
  }

  getComments(id){
    return this.http.get(`${this.uri}/comments/${id}`)
  }

  getPostById(id){
    return this.http.get(`${this.uri}/posts/${id}`)
  }

  getLogById(id){
    return this.http.get(`${this.uri}/logs/${id}`)
  }

  getCommentById(id){
    return this.http.get(`${this.uri}/comments/${id}`)
  }

  addPost(title, description, responsible){
    const post = {
      title: title,
      description: description,
      responsible: responsible
    };
    return this.http.post(`${this.uri}/posts/add`, post);
  }

  addLog(type, actiondescription, responsible){
    const log = {
      type: type,
      actiondescription: actiondescription,
      responsible: responsible
    };
    return this.http.post(`${this.uri}/logs/add`, log);
  }

  addComment(postid, description, responsible){
    const comment = {
      post: postid,
      description: description,
      responsible: responsible
    };
    return this.http.post(`${this.uri}/comments/add`, comment);
  }

  updatePost(id, title, description, responsible){
    const post = {
      title: title,
      description: description,
      responsible: responsible
    };
    return this.http.post(`${this.uri}/posts/update/${id}`, post);
  }

  deletePost(id){
    return this.http.get(`${this.uri}/posts/delete/${id}`);
  }

  deleteComment(id){
    return this.http.get(`${this.uri}/comments/delete/${id}`);
  }
}

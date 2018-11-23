import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../post.service';
import { Post } from '../../post.model';
import { Comment } from '../../comment.model';

@Component({
  selector: 'app-postview',
  templateUrl: './postview.component.html',
  styleUrls: ['./postview.component.css']
})
export class PostviewComponent implements OnInit {
  
  id: String;
  comments: Comment[];
  post: any={};

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.postService
      .getPostById(this.id)
      .subscribe((data: Post[]) => {
        this.post = data;
        console.log('Data requested...');
        console.log(this.post);
        this.fetchComments();
    });
    });

  }

  fetchComments(){
    this.postService
    .getComments(this.id)
    .subscribe((data: Comment[]) => {
      this.comments = data;
      console.log('Data requested...');
      console.log(this.comments);
      this.router.navigate([`/post/${this.id}`]);
    });
  }

  addComment(postid, description, responsible){
    this.postService.addComment(postid, description, responsible).subscribe(() => {
      this.fetchComments();
      this.postService.addLog('Create', 'Comment', responsible).subscribe(() => {
      });
    });
  }

  deleteComment(id){
    this.postService.deleteComment(id).subscribe(() => {
      this.fetchComments();
      this.postService.addLog('Delete', 'Comment', 'Unkown').subscribe(() => {
      });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../post.model';
import { PostService } from '../../post.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  posts: Post[];

  //displayedColumns = ['title', 'description', 'responsible', 'date'];

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts(){
    this.postService
    .getPosts()
    .subscribe((data: Post[]) => {
      this.posts = data;
      console.log('Data requested...');
      console.log(this.posts);
    });
  }

  editPost(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  seePost(id) {
    this.router.navigate([`/post/${id}`]);
  }

  deletePost(id){
    this.postService.deletePost(id).subscribe(() => {
      this.fetchPosts();
      this.postService.addLog('Delete', 'Post', 'Unkown').subscribe(() => {
      });
    });
  }
}

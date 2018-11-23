import { Component, OnInit } from '@angular/core';
import { PostService } from '../../post.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private postService: PostService, private router: Router) { }

  addPost(title, description, responsible){
    
    this.postService.addPost(title, description, responsible).subscribe(() => {
      this.router.navigate(['/list']);
    });
    this.postService.addLog('Create', 'Post', responsible).subscribe(() => {
    });
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../post.service';
import { Post } from '../../post.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  
  id: String;
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
    });
    });
  }

  updatePost(title, description, responsible){
    this.postService.updatePost(this.id, title, description, responsible).subscribe(() => {
      this.router.navigate(['/list']);
      this.postService.addLog('Edit', 'Post', responsible).subscribe(() => {
      });
    });
  }

}

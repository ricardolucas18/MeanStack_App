import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Log } from '../../log.model';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  logs: Log[];

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.fetchLogs();
  }

  fetchLogs(){
    this.postService
    .getLogs()
    .subscribe((data: Log[]) => {
      this.logs = data;
      console.log('Data requested...');
      console.log(this.logs);
    });
  }

}

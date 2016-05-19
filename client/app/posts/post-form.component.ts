import { Component, ElementRef } from '@angular/core';
import { NgForm } from '@angular/common';
import { Router } from '@angular/router';

import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
    moduleId: module.id,
    selector: 'my-post-form',
    templateUrl: 'post-form.component.html'
})
export class PostFormComponent {

  model = new Post();

  constructor(private postsService: PostService, private router: Router) { }

  submit(fileElement: any) {
      this.postsService.createPost(this.model).subscribe((postId: string) => {
          let file: File = <File>fileElement.files[0];
          this.postsService.uploadImage(postId, file).subscribe(() => {
              this.router.navigate(['/']);
          }, err => {
            console.error(err);
          });
      }, err => {
          console.error(err);
      });
  }

}
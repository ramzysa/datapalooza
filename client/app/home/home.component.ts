import { Component, OnInit } from '@angular/core';

import { PostComponent } from '../posts/post.component';
import { PostService } from '../posts/post.service';
import { Post } from '../posts/post.model';

@Component({
    moduleId: module.id,
    selector: 'my-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    directives: [PostComponent]
})
export class HomeComponent implements OnInit {

    private posts: Post[];

    constructor(private postService: PostService) { }

    ngOnInit() {
        this.loadPosts();
    }

    onPostDelete(post: Post) {
        this.postService.deletePost(post).subscribe(() => this.loadPosts());
    }

    loadPosts() {
        this.postService.getPosts().subscribe((posts: Post[]) => {
            this.posts = posts;
        });
    }

}
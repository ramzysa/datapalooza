import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Post } from './post.model';

@Component({
    moduleId: module.id,
    selector: 'my-post',
    templateUrl: 'post.component.html',
    styleUrls: ['post.component.css'],
})
export class PostComponent {

    @Input() private post: Post;
    @Output() delete = new EventEmitter();

    constructor() { }

    getImageUrl() {
        return '/api/posts/' + this.post._id + '/image';
    }

    onDelete() {
        this.delete.emit(this.post);
    }

}
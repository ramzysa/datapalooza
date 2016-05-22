import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { Post } from './post.model';

const POSTS_API_PATH = 'api/posts';

@Injectable()
export class PostService {

    constructor(private http: Http) { }

    getPosts(): Observable<Post[]> {
        return this.http.get(POSTS_API_PATH)
            .map((response: Response) => <Post[]>response.json());
    }

    createPost(post: Post): Observable<string>  {
        return this.http.post(POSTS_API_PATH, JSON.stringify(post), this.getJsonRequestOptions())
            .map((response: Response) => response.json().id);
    }

    deletePost(post: Post): Observable<any> {
        return this.http.delete(POSTS_API_PATH + '/' + post._id + '?rev=' + post._rev);
    }

    uploadImage(postId: string, file: File): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            var xhr = new XMLHttpRequest();
            xhr.open('PUT', POSTS_API_PATH + '/' + postId + '/image');
            xhr.onload = (e) => {
                let response = JSON.parse(xhr.responseText);
                if (xhr.status == 200) {
                    observer.next(response);
                    observer.complete();
                } else {
                    observer.error(response);
                }
            };
            xhr.upload.onerror = (e) => {
                observer.error(e);
            };
            var formData = new FormData();
            formData.append(file.name, file);
            xhr.send(formData);
        });
    }

    getJsonRequestOptions(): RequestOptions {
        return new RequestOptions({
            headers : new Headers({'Content-Type': 'application/json'})
        });
    }

}
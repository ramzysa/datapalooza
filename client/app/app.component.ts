import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PostFormComponent } from './posts/post-form.component';
import { PostService } from './posts/post.service';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
        PostService
    ]
})
@Routes([
  { path: '/', component: HomeComponent },
  { path: '/new', component: PostFormComponent },
  { path: '*', component: HomeComponent }
])
export class AppComponent {

}
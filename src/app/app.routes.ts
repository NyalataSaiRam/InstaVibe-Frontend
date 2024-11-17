import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { MySavedPostsComponent } from './components/my-saved-posts/my-saved-posts.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'profile', component: ProfileComponent, children: [ { path: 'myposts', component: MyPostsComponent }, { path: 'mysavedposts', component: MySavedPostsComponent }, { path: '', pathMatch: 'full', redirectTo: 'myposts' } ] },
    { path: 'search', component: SearchComponent },
    {path: 'viewProfile/:id', component:ViewProfileComponent },
    { path: 'fovourites', component: FavouritesComponent },
    { path: 'createpost', component: CreatePostComponent },
    { path: '**', component: PageNotFoundComponent },

];

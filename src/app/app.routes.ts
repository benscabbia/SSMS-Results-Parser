import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContentComponent } from './content.component';

export const routes: Routes = [
    { path: '', component: ContentComponent },
    { path: 'about', component: AboutComponent },
    { path: 'home', component: ContentComponent },
    { path: '**', component: ContentComponent },
];

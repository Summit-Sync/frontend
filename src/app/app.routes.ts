import { Routes } from '@angular/router';
import {CourseListComponent} from "./components/final/course-list/course-list.component";
import {GroupListComponent} from "./components/final/group-list/group-list.component";
import {CourseComponent} from "./components/final/course/course.component";
import {GroupComponent} from "./components/final/group/group.component";
import {AppComponent} from "./app.component";
import { CourseTemplate } from './models/courseTemplate/CourseTemplate';
import { CourseTemplateComponent } from './components/template/course-template/course-template.component';
import { CourseTemplateViewComponent } from './components/template/course-template-view/course-template-view.component';

export const routes: Routes = [
  // Kurs Routen
  { path: 'kurs', component: CourseListComponent, canActivate:[]},
  { path: 'kurs/:id', component: CourseComponent, canActivate:[]},
  // Gruppen Routen
  { path: 'gruppe', component: GroupListComponent, canActivate:[]},
  { path: 'gruppe/:id', component: GroupComponent, canActivate:[]},
  //Gruppentemplates Routen
  // {path: 'gruppenvorlage', component:GroupTemplateListComponent, canActivate:[]},
  //Kursvorlagen
  {path:'kursvorlage', component:CourseTemplateListComponent, canActivate:[]},
  {path:'kursvorlage/:id', component:CourseTemplateViewComponent, canActivate:[]},
  // Root Routen
  { path: '', component: AppComponent, canActivate:[]}, // TODO: Wahrscheinlich die Falsche Komponente
  { path: '**', redirectTo:'', canActivate:[]},
];

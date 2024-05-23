import { Routes } from '@angular/router';
import {CourseListComponent} from "./components/final/course-list/course-list.component";
import {GroupListComponent} from "./components/final/group-list/group-list.component";
import {CourseComponent} from "./components/final/course/course.component";
import {GroupComponent} from "./components/final/group/group.component";
import {AppComponent} from "./app.component";
import { CourseTemplateListComponent } from './components/template/course-template-list/course-template-list.component';
import {QualificationListComponent} from "./components/final/qualification/qualification-list/qualification-list.component";
import {TrainerListComponent} from "./components/final/trainer-list/trainer-list.component";
import { LocationListComponent } from './components/final/location/location-list/location-list.component';
import { GroupTemplateListComponent } from './components/template/group-template/group-template-list/group-template-list.component';
import { HomeViewComponent } from './components/home-view/home-view.component';

export const routes: Routes = [
  // Kurs Routen
  { path: 'kurs', component: CourseListComponent, canActivate:[]},
  { path: 'kurs/:id', component: CourseComponent, canActivate:[]},
  // Gruppen Routen
  { path: 'gruppe', component: GroupListComponent, canActivate:[]},
  { path: 'gruppe/:id', component: GroupComponent, canActivate:[]},
  //Gruppentemplates Routen
  {path: 'gruppenvorlage', component:GroupTemplateListComponent, canActivate:[]},
  //Kursvorlagen
  {path:'kursvorlage', component:CourseTemplateListComponent, canActivate:[]},
  // Qualifikationen
  { path: 'qualifikation', component: QualificationListComponent, canActivate: []},
  // Trainer
  { path: 'trainer', component: TrainerListComponent, canActivate: []},
  // Location
  { path: 'standort', component: LocationListComponent, canActivate: []},
  // Root Routen
  { path: '', component: HomeViewComponent, canActivate:[]}, // TODO: Wahrscheinlich die Falsche Komponente
  { path: '**', redirectTo:'', canActivate:[]},
];

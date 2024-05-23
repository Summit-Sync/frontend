import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavLink } from './types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent implements OnInit {
  currentRoute: string;
  links: NavLink[] = [
    { title: 'Kursvorlage', route: '/kursvorlage' },
    { title: 'Kurs', route: '/kurs' },
    { title: 'Gruppenvorlage', route: '/gruppenvorlage' },
    { title: 'Gruppe', route: '/gruppe' },
    { title: 'Standort', route: '/standort' },
    { title: 'Trainer', route: '/trainer' },
    { title: 'Qualifikation', route: '/qualifikation' },
  ];

  highlightLinkID: number = -1;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
        console.log('Current Route:', this.currentRoute);
      }
    });
  }

  navigateToPath(path: string, index: number) {
    this.highlightLinkID = index;
    this.router.navigateByUrl(path);
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SiteService } from '../../services/site.service';
import { Site } from '../../models/site';

interface ConstructionSite {
  id: number;
  name: string;
  location: string;
  progress: number;
  supplies: number;
}

@Component({
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
  ],
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css'],
})
export class SitesComponent implements OnInit {
  
  constructor( private siteService: SiteService) {
    
  }  
 
  sites: Site[] = [];

  ngOnInit(): void {
this.loadSites();
  }

  loadSites(){
    this.siteService.getSites().subscribe((data) => {
      this.sites = data;
    });
  }
}

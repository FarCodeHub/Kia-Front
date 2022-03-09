import { environment } from './../../../../../../environments/environment.prod';
import { project } from './../../../../../mock-api/dashboards/project/data';
import { filter } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Project } from 'app/shared/models/project.model';
import { ProjectService } from 'app/modules/operator/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  serverUrl = environment.imageUrl;
  projects: Project[];

  constructor(private projectService: ProjectService,) {
    this.projectService.getAll().subscribe(result => {
      this.projects = result.data;

    });
  }

  ngOnInit(): void {
  }

  downloadFile(project: Project) {

  }
}

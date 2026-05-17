import { Component, OnInit } from '@angular/core';
import { GroupCompetencyReport } from 'src/app/interfaces/report/group-competency-report';
import { Group } from 'src/app/models/group';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/services/group.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report-competency-group',
  templateUrl: './report-competency-group.component.html',
  styleUrls: ['./report-competency-group.component.scss']
})
export class ReportCompetencyGroupComponent implements OnInit {
  groups: Group[] = [];
  selectedGroup?: Group;
  report?: GroupCompetencyReport;
  selectedMasteryThreshold: number = -1;

  userRoles: string | null = '';

  constructor(
    private groupService: GroupService,
    private reportService: ReportService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userRoles = this.authService.getRole();
    if (this.userRoles && this.userRoles.includes('ADMIN')) {
      this.setAllGroups();
    } else {
      this.setSupervisedGroup();
    }
  }

  setAllGroups(): void {
    this.groupService.getAllGroups().subscribe({
      next: (groupsFromServer: Group[]) => {
        this.groups = groupsFromServer;
      }
    });
  }

  setSupervisedGroup(): void {
    this.groupService.getSupervisedGroups().subscribe({
      next: (groupsFromServer: Group[]) => {
        this.groups = groupsFromServer;
      }
    });
  }

  onGroupChange(group: Group): void {
    this.selectedGroup = group;
    this.setReportForGroup(this.selectedGroup.id);
  }

  setReportForGroup(groupId: string): void {
    this.reportService.getCompetencyMasteryReportForGroup(groupId).subscribe({
      next: (reportFromServer: GroupCompetencyReport) => {
        this.report = reportFromServer;
      }
    });
  }
}

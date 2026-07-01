import { Component, OnInit } from '@angular/core';
import { GroupCompetencyReport } from 'src/app/interfaces/report/group-competency-report';
import { Group } from 'src/app/models/group';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/services/group.service';
import { ReportService } from 'src/app/services/report.service';

export type MasteryLevelId = 'excellent' | 'good' | 'satisfactory' | 'unsatisfactory';

export interface MasteryLevel {
  id: MasteryLevelId;
  label: string;
  rangeLabel: string;
}

@Component({
  selector: 'app-report-competency-group',
  templateUrl: './report-competency-group.component.html',
  styleUrls: ['./report-competency-group.component.scss']
})
export class ReportCompetencyGroupComponent implements OnInit {
  readonly masteryLevels: MasteryLevel[] = [
    { id: 'excellent', label: 'Отлично', rangeLabel: '90–100%' },
    { id: 'good', label: 'Хорошо', rangeLabel: '75–89%' },
    { id: 'satisfactory', label: 'Удовлетворительно', rangeLabel: '60–74%' },
    { id: 'unsatisfactory', label: 'Неудовлетворительно', rangeLabel: '0–59%' },
  ];

  groups: Group[] = [];
  selectedGroup?: Group;
  report?: GroupCompetencyReport;
  selectedMasteryLevel: MasteryLevelId | null = null;

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
    this.selectedMasteryLevel = null;
    this.setReportForGroup(this.selectedGroup.id);
  }

  setReportForGroup(groupId: string): void {
    this.reportService.getCompetencyMasteryReportForGroup(groupId).subscribe({
      next: (reportFromServer: GroupCompetencyReport) => {
        this.report = reportFromServer;
      }
    });
  }

  toggleMasteryLevel(levelId: MasteryLevelId): void {
    this.selectedMasteryLevel = this.selectedMasteryLevel === levelId ? null : levelId;
  }

  isInMasteryLevel(percent: number, levelId: MasteryLevelId): boolean {
    switch (levelId) {
      case 'excellent':
        return percent >= 90;
      case 'good':
        return percent >= 75 && percent < 90;
      case 'satisfactory':
        return percent >= 60 && percent < 75;
      case 'unsatisfactory':
        return percent < 60;
    }
  }

  isMasteryHighlighted(percent: number): boolean {
    return this.selectedMasteryLevel != null && this.isInMasteryLevel(percent, this.selectedMasteryLevel);
  }
}

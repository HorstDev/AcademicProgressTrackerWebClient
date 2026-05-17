import { StudentCompetencyReport } from './student-competency-report';

export interface GroupCompetencyReport {
  allCompetencies: string[];
  studentReports: StudentCompetencyReport[];
}

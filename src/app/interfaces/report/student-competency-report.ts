import { CompetencyInformationReport } from './competency-information-report';

export interface StudentCompetencyReport {
  studentName: string;
  competenciesInformationReport: CompetencyInformationReport[];
}

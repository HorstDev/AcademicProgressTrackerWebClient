export interface TaughtDisciplineDto {
  id: string;
  name: string;
  groupName: string;
  semester: number;
}

export interface SavedMatrixDto {
  ratioAttendanceVsRating: number;
  ratioAttendanceVsLate: number;
  ratioRatingVsLate: number;
}

export interface DisciplineAhpStateDto {
  disciplineId: string;
  disciplineName: string;
  groupName: string;
  savedMatrix: SavedMatrixDto | null;
}

export interface PairwiseRatiosRequest {
  attendanceVsRating: number;
  attendanceVsLate: number;
  ratingVsLate: number;
}

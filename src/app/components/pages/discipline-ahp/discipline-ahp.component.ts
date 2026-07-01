import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  DisciplineAhpStateDto,
  TaughtDisciplineDto,
} from 'src/app/interfaces/discipline-ahp';
import { DisciplineAhpService } from 'src/app/services/discipline-ahp.service';
import { AhpResult, computeAhpResult, MAX_CONSISTENCY_RATIO } from 'src/app/utils/saaty-ahp';

/** Значения шкалы Саати и обратные к ним (отношение важности первого критерия ко второму). */
export const SAATY_SCALE: { label: string; value: number }[] = [
  { label: '9 (абсолютно важнее)', value: 9 },
  { label: '8', value: 8 },
  { label: '7 (значительно важнее)', value: 7 },
  { label: '6', value: 6 },
  { label: '5 (существенно важнее)', value: 5 },
  { label: '4', value: 4 },
  { label: '3 (умеренно важнее)', value: 3 },
  { label: '2 (слабо важнее)', value: 2 },
  { label: '1 (равная важность)', value: 1 },
  { label: '1/2', value: 1 / 2 },
  { label: '1/3', value: 1 / 3 },
  { label: '1/4', value: 1 / 4 },
  { label: '1/5', value: 1 / 5 },
  { label: '1/6', value: 1 / 6 },
  { label: '1/7', value: 1 / 7 },
  { label: '1/8', value: 1 / 8 },
  { label: '1/9 (абсолютно менее важен)', value: 1 / 9 },
];

export function snapRatioToSaatyScale(value: number): number {
  let best = SAATY_SCALE[0].value;
  let bestD = Math.abs(value - best);
  for (const o of SAATY_SCALE) {
    const d = Math.abs(value - o.value);
    if (d < bestD) {
      bestD = d;
      best = o.value;
    }
  }
  return best;
}

@Component({
  selector: 'app-discipline-ahp',
  templateUrl: './discipline-ahp.component.html',
  styleUrls: ['./discipline-ahp.component.scss'],
})
export class DisciplineAhpComponent implements OnInit {
  readonly saatyScale = SAATY_SCALE;
  readonly maxConsistencyRatio = MAX_CONSISTENCY_RATIO;

  disciplines: TaughtDisciplineDto[] = [];
  selectedDisciplineId: string | null = null;
  state: DisciplineAhpStateDto | null = null;
  loadingList = true;
  loadingState = false;

  /** Насколько первый критерий важнее второго (по строке матрицы сверху диагонали). */
  ag = 1;
  al = 1;
  gl = 1;

  constructor(
    private disciplineAhpService: DisciplineAhpService,
    private snackBar: MatSnackBar
  ) {}

  /** Сопоставление значений double с опциями шкалы (иначе mat-select «пустой» после загрузки с бэка). */
  compareRatio = (a: number, b: number): boolean =>
    a != null && b != null && Math.abs(a - b) < 1e-6;

  ngOnInit(): void {
    this.disciplineAhpService.listTaughtDisciplines().subscribe({
      next: (list) => {
        this.disciplines = list;
      },
      error: () => {
        this.snackBar.open('Не удалось загрузить список дисциплин', 'OK', { duration: 5000 });
      },
      complete: () => {
        this.loadingList = false;
      },
    });
  }

  onDisciplineChange(id: string | null): void {
    this.selectedDisciplineId = id;
    this.state = null;
    if (!id) {
      return;
    }
    this.loadState(id);
  }

  loadState(id: string): void {
    this.loadingState = true;
    this.disciplineAhpService.getAhpState(id).subscribe({
      next: (s) => {
        this.state = s;
        const m = s.savedMatrix;
        if (m) {
          this.ag = snapRatioToSaatyScale(m.ratioAttendanceVsRating);
          this.al = snapRatioToSaatyScale(m.ratioAttendanceVsLate);
          this.gl = snapRatioToSaatyScale(m.ratioRatingVsLate);
        } else {
          this.ag = 1;
          this.al = 1;
          this.gl = 1;
        }
      },
      error: () => {
        this.snackBar.open('Не удалось загрузить данные AHP', 'OK', { duration: 5000 });
      },
      complete: () => {
        this.loadingState = false;
      },
    });
  }

  get ahpResult(): AhpResult {
    return computeAhpResult(this.ag, this.al, this.gl);
  }

  submit(): void {
    if (!this.selectedDisciplineId) {
      return;
    }
    const ag = snapRatioToSaatyScale(this.ag);
    const al = snapRatioToSaatyScale(this.al);
    const gl = snapRatioToSaatyScale(this.gl);
    this.ag = ag;
    this.al = al;
    this.gl = gl;

    const result = computeAhpResult(ag, al, gl);
    if (!result.isConsistent) {
      this.snackBar.open(
        `Матрица не согласована: OS = ${result.consistencyRatio.toFixed(3)} > ${MAX_CONSISTENCY_RATIO}. Заполните сравнения заново.`,
        'OK',
        { duration: 7000 }
      );
      return;
    }
    this.disciplineAhpService
      .submitJudgment(this.selectedDisciplineId, {
        attendanceVsRating: ag,
        attendanceVsLate: al,
        ratingVsLate: gl,
      })
      .subscribe({
        next: (s) => {
          this.state = s;
          this.snackBar.open('Сохранено', 'OK', { duration: 2500 });
        },
        error: (err) => {
          const msg = err?.error?.message ?? err?.message ?? 'Ошибка сохранения';
          this.snackBar.open(typeof msg === 'string' ? msg : 'Ошибка сохранения', 'OK', { duration: 6000 });
        },
      });
  }

  deleteMine(): void {
    if (!this.selectedDisciplineId) {
      return;
    }
    this.disciplineAhpService.deleteMyJudgment(this.selectedDisciplineId).subscribe({
      next: () => {
        this.snackBar.open('Ваша оценка удалена', 'OK', { duration: 3000 });
        this.loadState(this.selectedDisciplineId!);
      },
      error: () => {
        this.snackBar.open('Не удалось удалить', 'OK', { duration: 4000 });
      },
    });
  }

  matrixCell(row: number, col: number): number {
    if (row === col) {
      return 1;
    }
    if (row === 0 && col === 1) {
      return this.ag;
    }
    if (row === 0 && col === 2) {
      return this.al;
    }
    if (row === 1 && col === 0) {
      return 1 / this.ag;
    }
    if (row === 1 && col === 2) {
      return this.gl;
    }
    if (row === 2 && col === 0) {
      return 1 / this.al;
    }
    if (row === 2 && col === 1) {
      return 1 / this.gl;
    }
    return 1;
  }

  labels = ['A — посещаемость', 'G — рейтинг', 'L — задержка сдачи'];
}

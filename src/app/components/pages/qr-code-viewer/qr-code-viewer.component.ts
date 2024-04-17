import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as QRCode from 'qrcode-generator';
import { LessonUserStatusData } from 'src/app/interfaces/lesson-user-status-data';
import { AuthService } from 'src/app/services/auth.service';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
  selector: 'app-qr-code-viewer',
  templateUrl: './qr-code-viewer.component.html',
  styleUrls: ['./qr-code-viewer.component.scss']
})
export class QrCodeViewerComponent implements OnInit {
  qrCodePNG: string = '';
  errorMessage: string | null = null;

  constructor(private snackBar: MatSnackBar, private _lessonService: LessonService, private _authService: AuthService) {}

  ngOnInit(): void {
    this.generateQR();
  }

  generateQR(): void {
    this._lessonService.getCurrentLessonStatusForStudent().subscribe({
      next: (lessonsStatus: LessonUserStatusData) => {
        const content = `${lessonsStatus.id}`
          // Создаем экземпляр генератора QR-кодов
        const qr = QRCode(0, 'Q'); // Параметры: версия и уровень коррекции ошибок
        // Добавляем данные в QR-код
        qr.addData(content);
        // Генерируем QR-код
        qr.make();
        // Получаем QR-код в виде строки SVG
        this.qrCodePNG = qr.createDataURL(20);
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      },
      complete: () => {

      }
    });     
  }

}

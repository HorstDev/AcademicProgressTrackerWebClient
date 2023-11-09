import { Component } from '@angular/core';
import { Lesson, LessonType } from 'src/app/models/lesson';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent {
  lessons: Lesson[] = [];

  ngOnInit() {
    const lesson1 = new Lesson()
    lesson1.classroom = "Аудитория 303";
    lesson1.subject = "Математика";
    lesson1.teacher = "Олег О.А.";
    lesson1.timeEnd = "11:45";
    lesson1.timeStart = "10:15";

    const lesson2 = new Lesson()
    lesson2.classroom = "Аудитория 104";
    lesson2.subject = "Биология";
    lesson2.teacher = "Саша О.А.";
    lesson2.timeEnd = "11:45";
    lesson2.timeStart = "10:15";
    lesson2.lessonType = LessonType.Practice;

    const lesson3 = new Lesson()
    lesson3.classroom = "Аудитория 104";
    lesson3.subject = "Биология";
    lesson3.teacher = "Саша О.А.";
    lesson3.timeEnd = "11:45";
    lesson3.timeStart = "10:15";

    const lesson4 = new Lesson()
    lesson4.classroom = "Аудитория 104";
    lesson4.subject = "Биология и природопользование";
    lesson4.teacher = "Куркурин О.А.";
    lesson4.timeEnd = "11:45";
    lesson4.timeStart = "10:15";

    const lesson5 = new Lesson()
    lesson5.classroom = "Аудитория 104";
    lesson5.subject = "Хз еще что то";
    lesson5.teacher = "Саша О.А.";
    lesson5.timeEnd = "11:45";
    lesson5.timeStart = "10:15";

    const lesson6 = new Lesson()
    lesson6.classroom = "Аудитория 104";
    lesson6.subject = "Биология";
    lesson6.teacher = "Саша О.А.";
    lesson6.timeEnd = "11:45";
    lesson6.timeStart = "10:15";

    this.lessons.push(lesson1, lesson2, lesson3, lesson4, lesson5, lesson6);
  }
}

export class Lesson {
    lessonType: LessonType = LessonType.Lecture;
    subject?: string;
    teacher?: string;
    classroom?: string;
    timeStart?: string;
    timeEnd?: string;
}

export enum LessonType {
    Practice = "практика",
    Lecture = "лекция",
    Exam = "Exam",
    Credit = "Credit"
}
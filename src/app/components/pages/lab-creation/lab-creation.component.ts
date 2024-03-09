import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lab-creation',
  templateUrl: './lab-creation.component.html',
  styleUrls: ['./lab-creation.component.scss']
})
export class LabCreationComponent implements OnInit {
  subjectId: string | null = null;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.subjectId = params['subjectId'];
    })
  }
}

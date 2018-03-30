import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-issue-new',
  templateUrl: './issue-new.component.html',
  styleUrls: ['./issue-new.component.scss']
})
export class IssueNewComponent implements OnInit {
  formId: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,

  ) { }
  myForm: FormGroup = new FormGroup({
    "title": new FormControl(null, [Validators.required]),
    "subtitle": new FormControl(null, [Validators.required]),
    "description": new FormControl(null, [Validators.required]),
    "message": new FormControl(null, [Validators.required]),
    "tags": new FormControl('default', [Validators.required]),
    "data": new FormControl(null, [Validators.required])
  });

  ngOnInit() {
    this.formId = this.route.snapshot.params['formid'];
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../shared/services/http.service';

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
    private http: HttpService
  ) { }
  myForm: FormGroup = new FormGroup({
    "title": new FormControl(null, [Validators.required]),
    "subtitle": new FormControl(null, [Validators.required]),
    "description": new FormControl(null, [Validators.required]),
    "message": new FormControl(null, [Validators.required]),
    "tags": new FormControl('default', [Validators.required]),
  });

  ngOnInit() {
    // this.formId = this.route.snapshot.params['formid'];
    this.formId="123";
  }
  submit(data) {
    console.log(data);
    this.http.addIssue({
      formId:this.formId,
      heading: {
        title: this.myForm.controls['title'].value,
        subtitle: this.myForm.controls['subtitle'].value,
        description: this.myForm.controls['description'].value
      },
      tags: [this.myForm.controls['tags'].value],
      data: {
        message: this.myForm.controls['message'].value,
      }
    }, 1)
      .subscribe(
        (data) => {
          console.log(data);
          //Route back to issuepage
        },
        (err) => {
          console.log(err);
        });
  }
  cancel(){
    console.log('cancel!');
    //Route back to issue page
  }
}

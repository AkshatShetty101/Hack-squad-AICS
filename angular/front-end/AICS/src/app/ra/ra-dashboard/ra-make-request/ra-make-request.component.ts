import { Component, OnInit } from '@angular/core';
import { IndexDBService } from '../../../shared/services/indexdb.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ra-make-request',
  templateUrl: './ra-make-request.component.html',
  styleUrls: ['./ra-make-request.component.scss']
})
export class RaMakeRequestComponent implements OnInit {
  myForm: FormGroup = new FormGroup({
    "title": new FormControl(null, [Validators.required]),
    "data": new FormControl(null, [Validators.required])
  });
  id: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private indexedDB: IndexDBService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.indexedDB.openConnection()
        .then((data) => {
          this.indexedDB.getRequestByKey(this.id).then((output) => {
            if (output) {
              this.myForm.controls['title'].setValue(output.title);
              this.myForm.controls['data'].setValue(output.data);
            }
          });
        }).catch((err) => {
          console.log(err);
        });
    }
  }

  save(request) {
    console.log(request);
    this.indexedDB.openConnection()
      .then((data) => {
        this.indexedDB.addRequest(request);
      }).catch((err) => {
        console.log(err);
      });
  }

  submit(data) {
    console.log(data);
    if (this.id) {
      let output = this.indexedDB.deleteRequest(this.id)
      console.log(output);
    }
    //Post the data to the db!
  }

}

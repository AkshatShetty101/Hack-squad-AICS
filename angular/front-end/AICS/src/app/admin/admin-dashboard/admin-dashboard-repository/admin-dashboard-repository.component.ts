import { Component, OnInit } from '@angular/core';
import { Ng4FilesStatus, Ng4FilesSelected } from '../../../ng4-files';
import { HttpService } from '../../../shared/services/http.service';
declare var saveAs: any;

@Component({
  selector: 'app-admin-dashboard-repository',
  templateUrl: './admin-dashboard-repository.component.html',
  styleUrls: ['./admin-dashboard-repository.component.scss']
})
export class AdminDashboardRepositoryComponent implements OnInit {
  public selectedFiles: any;
  selectedFileName = '--selected file name--';
  constructor(
    private  http: HttpService
  ) { }

  ngOnInit() {
  }
  public filesSelect(selectedFiles: Ng4FilesSelected): void {
    console.log(selectedFiles);
    if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
      this.selectedFiles = selectedFiles.status;
      return;
      // Hnadle error statuses here
    }
    this.selectedFiles = selectedFiles;
    this.selectedFileName = selectedFiles.files[0].name;
  }
  ocr(){
    const request = {
      file: this.selectedFiles.files[0]
    };
    console.log(request);
    this.http.ocr(request)
      .subscribe(
        (response: any) => {
          console.log(response);
        }
      );
  }
}

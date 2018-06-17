import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../_services/data.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AuthService } from '../../_services/auth.service';
import { RequestOptions } from '@angular/http';

@Component({
  selector: 'app-uploadexcel',
  templateUrl: './uploadexcel.component.html',
  styleUrls: ['./uploadexcel.component.css']
})
export class UploadexcelComponent implements OnInit {
  form:FormGroup;
  loading: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder, private dataservice:DataService, public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr); 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.form = this.fb.group({
      excelfile: null
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('excelfile').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
    }
  }

  onSubmit() {
    const formModel = this.form.value;
    this.loading = true;
    this.dataservice.fileUpload(formModel).subscribe(
      x=>{
        console.log(x["_body"]);
        let msg = JSON.parse(x["_body"]);
        this.toastr.success(msg.msg);
        this.loading = false;
      },
      err=>{
        console.log(err);
        this.toastr.error("Sikertelen fájlfeltöltés!");
        this.loading = false;
      }
    )
  }

  fileChange2(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];        
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        this.dataservice.fileUpload(formData).subscribe(
          x=>{
            console.log(x);
            //this.loading = false;
          },
          err=>{
            console.log(err);
            //this.loading = false;
          }
        )
    }
}

  clearFile() {
    this.form.get('excelfile').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

}

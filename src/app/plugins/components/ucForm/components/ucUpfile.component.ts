/**
 * Created by max on 2017/5/11.
 */
import {Component, OnInit, Input} from '@angular/core';
declare var swal:any;
@Component({
    selector: 'uc-upfile',
    template: `
    <div [formGroup]="form">
        <div *ngIf="model.label" class="item-title">
            <label>{{model.label}}
                <span *ngIf="model.require">*</span>
                <ng-container *ngFor="let item of model.errormsg">
                    <i *ngIf="form.get(model.key).hasError(item.type)&&flag">{{item.content}}</i>
                </ng-container>
            </label>
        </div>
        <input type="hidden" [formControlName]="model.key" [(ngModel)]="model.value">
        <!--<ng-container [ngSwitch]="model.fileType">-->
            <!--<ng-container *ngSwitchCase="'img'">-->
                <!--<input type="file" id="{{model.key}}" class="form-control" (change)="canup($event)" [ngClass]="{'fileError':fileError}" accept="image/*">-->
            <!--</ng-container>-->
            <!--<ng-container *ngSwitchCase="'apk'">-->
                <!--<input type="file" id="{{model.key}}" class="form-control" (change)="canup($event)" [ngClass]="{'fileError':fileError}" accept=".apk">-->
            <!--</ng-container>-->
            <!--<ng-container *ngSwitchDefault>-->
                <!--<input type="file" id="{{model.key}}" class="form-control" (change)="canup($event)" [ngClass]="{'fileError':fileError}">-->
            <!--</ng-container>-->
        <!--</ng-container>-->
        <base-upfile [model]="model.config" (fileready)="filehasup($event)"></base-upfile>
        <!--<div class="progressBar" [style.width]="progressBar+'%'" [ngClass]="{'fileError':fileError}"></div>-->
        <!--<img src="{{model.value}}" alt="" *ngIf="model.value&&model.fileType=='img'">-->
    </div>
`,
    styleUrls: ['../styles/ucUpfile.scss']
})
export class UcUpfileComponent implements OnInit {
    @Input() model: any;
    @Input() form;
    // public selectedFile;
    // public progressBar: number = 0;
    // public fileError: boolean = false;
    // public file;
    public flag:boolean = false;
    constructor() {
    }

    ngOnInit() {
    }
    filehasup(ev){
        this.model.value = ev.value;
    }
    // public canup(data) {
    //     this.fileError = false;
    //     var xhr = new XMLHttpRequest();
    //     this.selectedFile = document.getElementById(this.model.key)
    //     this.file = this.selectedFile.files[0];
    //     if(this.file){
    //         let fd = new FormData();
    //         fd.append("capsule", this.model.config.capsule);
    //         fd.append("file", this.file);
    //         xhr.upload.addEventListener("progress", this.uploadProgress, false);
    //         xhr.addEventListener("load", this.uploadComplete, false);
    //         xhr.addEventListener("error", this.uploadFailed, false);
    //         xhr.addEventListener("abort", this.uploadCanceled, false);
    //         /* 下面的url一定要改成你要发送文件的服务器url */
    //         xhr.open("POST", this.model.config.uploadurl);
    //         xhr.send(fd);
    //     }
    // }
    //
    // public uploadProgress = (evt) => {
    //     this.progressBar = Number((evt.loaded / evt.total).toFixed(2)) * 100 * 0.8;
    // };
    // //上传完成时
    // public uploadComplete = ({currentTarget}={currentTarget}) => {
    //     let responseText = JSON.parse(currentTarget.responseText);
    //     if (responseText.status) {
    //         this.flag = false;
    //         this.progressBar = 100;
    //         this.model.value = this.model.config.downloadurl+"/"+responseText.data.capsule+"/"+responseText.data.md5;
    //     } else {
    //         this.flag = true;
    //         this.progressBar = 0;
    //         this.fileError = true;
    //         this.selectedFile.value = "";
    //         swal({
    //             title: "上传文件失败!",
    //             text: responseText.error_msg,
    //             type: "error"
    //         });
    //     }
    // }
    //
    // public uploadFailed() {
    //     console.log("error")
    // }
    //
    // public uploadCanceled() {
    //     console.log("abort")
    // }
}
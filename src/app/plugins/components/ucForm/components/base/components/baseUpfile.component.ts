/**
 * Created by max on 2017/6/16.
 */
import {Component, OnInit, Output,Input, EventEmitter} from '@angular/core';
declare var swal: any;

@Component({
    selector: 'base-upfile',
    template: `
        <div [style.display]="'none'">
            <input type="file" id="{{model.capsule}}" class="form-control" (change)="canup($event)" [ngClass]="{'fileError':fileError}" [accept]="model.accept">
        </div>
        <div class="main-file">
            <div class="form-control" [ngClass]="{'fileError':fileError}">
                <span (click)="selectFile()">选择文件</span>
            </div>
            <div class="progressBar" [style.width]="progressBar+'%'" [ngClass]="{'fileError':fileError}"></div>
            <img src="{{fileSrc}}" alt="" *ngIf="fileSrc&&model.accept=='image/*'">
        </div>
    `,
    styleUrls: ["../styles/baseUpfile.scss"]
})
export class BaseUpfileComponent implements OnInit {
    @Input() model;
    public selectedFile;
    public progressBar: number = 0;
    public fileError: boolean = false;
    public file;
    public flag: boolean = false;
    public fileSrc: string;
    @Output() fileready = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
        if(this.model.value){
            this.fileSrc = this.model.downloadurl + "/"+this.model.value;
        }
    }

    public selectFile() {
        let file = document.getElementById(this.model.capsule);
        file.click()
        console.log(file)
    }

    public canup(data) {
        this.fileError = false;
        var xhr = new XMLHttpRequest();
        this.selectedFile = document.getElementById(this.model.capsule)
        this.file = this.selectedFile.files[0];
        if (this.file) {
            let fd = new FormData();
            fd.append("capsule", this.model.capsule);
            fd.append("file", this.file);
            xhr.upload.addEventListener("progress", this.uploadProgress, false);
            xhr.addEventListener("load", this.uploadComplete, false);
            xhr.addEventListener("error", this.uploadFailed, false);
            xhr.addEventListener("abort", this.uploadCanceled, false);
            /* 下面的url一定要改成你要发送文件的服务器url */
            xhr.open("POST", this.model.uploadurl);
            xhr.send(fd);
        }
    }

    public uploadProgress = (evt) => {
        this.progressBar = Number((evt.loaded / evt.total).toFixed(2)) * 100 * 0.8;
    };
    //上传完成时
    public uploadComplete = ({currentTarget}={currentTarget}) => {
        let responseText = JSON.parse(currentTarget.responseText);
        if (responseText.status) {
            this.flag = false;
            this.progressBar = 100;
            this.fileSrc = this.model.downloadurl + "/" + responseText.data.capsule + "/" + responseText.data.md5;
            console.log(111);
            this.fileready.emit(
                {
                    value: "/" + responseText.data.capsule + "/" + responseText.data.md5
                }
            );
        } else {
            this.flag = true;
            this.progressBar = 0;
            this.fileError = true;
            this.selectedFile.value = "";
            swal({
                title: "上传文件失败!",
                text: responseText.error_msg,
                type: "error"
            });
        }
    }

    public uploadFailed() {
        console.log("error")
    }

    public uploadCanceled() {
        console.log("abort")
    }
}
/**
 * Created by max on 2017/6/16.
 * config: {
 *    value: _data.certificate_img_1,//回填数据,当multi为ture时,传入一个数组,当multi为false时,传入一个字符串
 *    accept:"image/*",//定义上传文件类型
 *    multi:true,//多图片上传
 *    size:文件大小,//MB
 *    count:文件数量,//
 *    uploadurl: this.uc.api.qc + "/upload_file/",//上传地址
 *    capsule: "certificate_img_11"//后台建立文件夹的名字
 *   }
 *当multi==true时,回传一个数组,
 *当multi==false时,回传一个字符串
 *
 *
 *
 */
import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
declare var swal: any;

@Component({
    selector: 'base-upfile',
    template: `
        <div [style.display]="'none'">
            <input type="file" id="{{model.capsule}}" class="form-control" (change)="canup($event)" [ngClass]="{'fileError':fileError}" [accept]="model.accept">
        </div>
        <div class="main-file">
            <div [ngClass]="{'disabled':model.disabled}"></div>
            <div class="form-control" [ngClass]="{'fileError':fileError}">
                <span (click)="selectFile()">选择文件</span>
            </div>
            <div class="progressBar" [style.width]="progressBar+'%'" [ngClass]="{'fileError':fileError,'multi':isprogress}"></div>
            <ng-container *ngIf="model.accept=='image/*'">
                <div class="showimg" *ngFor="let item of fileSrc">
                    <img src="{{item}}" alt="">
                </div>
            </ng-container>
            <div class="clearfix"></div>
        </div>
    `,
    styleUrls: ["../styles/baseUpfile.scss"]
})
export class BaseUpfileComponent implements OnInit {
    @Input() model;
    public selectedFile;//选择的文件的DOM标签
    public progressBar: number = 0;//进度条
    public fileError: boolean = false;//上传错误
    public file;//要上传的文件
    public fileSrc: Array<any> = [];//图片的src
    public backSrc: Array<any> = [];//返回的src
    public isprogress: boolean = false;//进度订
    public filecount:number=0;
    public canClick:boolean = true;//可以触发点击了吗
    @Output() fileready = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
        if (this.model.value && this.model.multi) {
            for (let item of this.model.value) {
                this.fileSrc.push(item)
            }
        }
        if (this.model.value && !this.model.multi) {
            this.fileSrc.push(this.model.value);
        }

    }

    public selectFile() {
        let file = document.getElementById(this.model.capsule);
        if(this.canClick){
            file.click();
            this.canClick = false;
            setTimeout(()=>{
               this.canClick = true;
            },500)
        }
    }

    public canup(data) {
        this.isprogress = true;
        this.progressBar = 0;
        this.fileError = false;
        this.selectedFile = document.getElementById(this.model.capsule)
        this.file = this.selectedFile.files[0];
        if (this.model.accept == 'image/*' && !/(.jgp)|(.png)|(.jpeg)/.test((this.file.type || this.file.name).toLowerCase())) {
            swal({
                title: "提示!",
                text: "只能上传jpg,png,jpep格式的图片",
                type: "error"
            });
            this.selectedFile.value = "";
            return
        }
        if (this.model.size && (this.file.size >= this.model.size * 1024 * 1024)) {
            swal({
                title: "提示!",
                text: "上传文件过大,只允许上传" + this.model.size + "MB以下的文件",
                type: "error"
            });
            this.selectedFile.value = "";
            return
        }
        if(this.model.count&&this.filecount>=this.model.count){
            swal({
                title: "提示!",
                text: "最多只能上传"+this.model.count+"个文件",
                type: "error"
            });
            this.selectedFile.value = "";
            return
        }
        if (this.file) {
            let secret_token = localStorage.getItem("secret_token");
            let xhr = new XMLHttpRequest();
            let formData = new FormData();
            formData.append("capsule", this.model.capsule);
            formData.append("file", this.file);

            /* 下面的url一定要改成你要发送文件的服务器url */

            xhr.open("POST", this.model.uploadurl);
            xhr.setRequestHeader('Authrization', JSON.parse(secret_token));
            // xhr.setRequestHeader("Content-Type","multipart/form-data");


            xhr.upload.addEventListener("progress", this.uploadProgress, false);
            xhr.addEventListener("load", this.uploadComplete, false);
            xhr.addEventListener("error", this.uploadFailed, false);
            xhr.addEventListener("abort", this.uploadCanceled, false);

            xhr.send(formData);
        }
    }

    public uploadProgress = (evt) => {
        this.isprogress = false;
        this.progressBar = Number((evt.loaded / evt.total).toFixed(2)) * 100 * 0.8;
    };
    //上传完成时
    public uploadComplete = ({currentTarget}={currentTarget}) => {
        let responseText = JSON.parse(currentTarget.responseText);
        if (responseText.status) {
            this.selectedFile.value = "";
            this.progressBar = 100;
            this.filecount++;
            if (this.model.multi) {
                this.fileSrc.push(responseText.data.url);
                this.backSrc.push(responseText.data.capsule + "/" + responseText.data.md5);
                this.fileready.emit(
                    {
                        value: JSON.stringify(this.backSrc)
                    }
                );
            } else {
                this.fileSrc = [];
                this.fileSrc.push(responseText.data.url)
                this.fileready.emit(
                    {
                        value: responseText.data.capsule + "/" + responseText.data.md5
                    }
                );
            }
        } else {
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
        console.log("error");
        this.progressBar = 0;
        this.fileError = true;
        this.selectedFile.value = "";
    }

    public uploadCanceled() {
        console.log("abort");

    }
}
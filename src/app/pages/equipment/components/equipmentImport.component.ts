/**
 * Created by max on 2017/5/9.
 */
/**
 * Created by max on 2017/6/13.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppHttpService, UC} from "../../../plugins/globalservice";
declare var swal;
@Component({
    selector: 'equipmentImport',
    templateUrl: '../views/equipmentImport.html',
    styleUrls: ["../styles/equipmentImport.scss"],
})
export class EquipmentImportComponent implements OnInit {
    public file: any = {}
    public selectedFile;
    public progressBar: number = 0;
    public fileError: boolean = false;
    public flag: boolean = false;
    public id: string = "template";
    public uploadurl: string;
    public accept: string = "application/vnd.ms-excel";
    public cannotupload:boolean = true;

    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public router: Router) {
    }

    ngOnInit() {
        this.uploadurl = this.uc.api.qc + "/create_device_by_excel/"
    }

    filehasup(ev) {
        console.log(ev);
    }

    uploadTemplate() {
        var xhr = new XMLHttpRequest();
        let fd = new FormData();
        fd.append("file", this.file);
        /* 下面的url一定要改成你要发送文件的服务器url */
        xhr.open("POST", this.uploadurl);
        let secret_token = localStorage.getItem("secret_token");
        xhr.setRequestHeader('Authrization', JSON.parse(secret_token))
        xhr.send(fd);
        xhr.upload.addEventListener("progress", this.uploadProgress, false);
        xhr.addEventListener("load", this.uploadComplete, false);
        xhr.addEventListener("error", this.uploadFailed, false);
        xhr.addEventListener("abort", this.uploadCanceled, false);
    }

    public selectFile() {
        let file = document.getElementById(this.id);
        file.click()
    }

    public canup(data) {
        this.fileError = false;
        this.selectedFile = document.getElementById(this.id);
        this.file = this.selectedFile.files[0];
        if (this.file) {
            this.cannotupload = false;
        } else {
            this.cannotupload = true;
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
            swal({
                title: "导入成功!",
                text: "导入成功,请到未绑设备一览查看",
                type: "success",
                confirmButtonText: "OK",
                timer:5000
            }).then(() => {
                clearTimeout(timer);
                this.router.navigateByUrl('pages/equipment/equipmentUnbind');
            });
            var timer = setTimeout(() => {
                this.router.navigateByUrl('pages/equipment/equipmentUnbind');
            }, 5000)
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

    downloadTemplate() {
        this.appHttpService.getBinary(this.uc.api.qc + '/download_device_template/').subscribe(res => {
            let disposition = res.headers._headers.get("content-disposition");
            if (!disposition) {
                swal("下载模板失败", res.error_msg, "error")
            } else {
                let blob = new Blob([res._body], {type: "application/vnd.ms-excel"});
                let objectUrl = URL.createObjectURL(blob);
                let a = document.createElement('a');
                let filename = disposition[0].split(";")[1].trim().split("=")[1]
                try {
                    filename = JSON.parse(filename)
                } catch (e) {
                    console.log(e);
                }
                document.body.appendChild(a);
                a.setAttribute('style', 'display:none');
                a.setAttribute('href', objectUrl);
                a.setAttribute('download', filename);
                a.click();
                URL.revokeObjectURL(objectUrl);
            }

        })
    }
}
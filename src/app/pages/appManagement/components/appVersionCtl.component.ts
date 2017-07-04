/**
 * Created by max on 2017/7/3.
 */
import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import {UC} from "../../../plugins/globalservice";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-version-ctl',
    templateUrl: '../views/appVersionCtl.html',
    styleUrls:["../styles/appVersionCtl.scss"]
})
export class AppVersionCtlComponent implements OnInit,AfterViewInit {

    //test
    enforced_update;
    download_link;
    reply_content;
    uploadformdata(){};

    public apkconfig: any = {};//安卓上传配置
    public notallowload: boolean = true;//不允许上传
    public apktip:string;//安卓apk提示
    public version_number:string="1.0.0";//安卓apk版本号

    constructor(
        public uc:UC
    ) { }

    ngOnInit() {
        this.apkconfig = {
            value: '',
            accept: ".apk",
            uploadurl: this.uc.api.qc + "/upload_file/",
            downloadurl: this.uc.api.qc + "/get_file/",
            capsule: "apk_address"
        }
    }
    filehasup(ev) {
        console.log(ev)
    }
    iscanupload(e){

        let version_number = this.version_number;
        if (!this.version_number)return;
        if (!e)return
        let oldVersion = this.version_number.split(".");
        let newVersion = e.value.split(".");
        console.log(e.value,version_number)
        for(let i =0;i<newVersion.length;i++){
            let o1=Number(oldVersion[i]);
            let n1=Number(newVersion[i]);
            if(n1>o1){
                this.notallowload = false;
                this.apktip="请上传apk版本"
                return
            }
        }
        this.notallowload = true;
        this.apktip='只有在目标版本大于当前版本( ' + this.version_number + ' )时才能上传apk文件';

    }
    ngAfterViewInit(): void {
        //订阅表单值改变事件
        this.form.valueChanges.subscribe(data => this.onValueChanged(data));
    }
    //找到表单
    @ViewChild('form') form: NgForm;
    onValueChanged(data) {

        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            //取到表单字段
            const control = this.form.form.get(field);
            //表单字段已修改或无效
            if (control && control.dirty && !control.valid) {
                //取出对应字段可能的错误信息
                const messages = this.validationMessages[field];
                //从errors里取出错误类型，再拼上该错误对应的信息
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + '';
                }
            }

        }

    }


    //存储错误信息
    formErrors = {
        'generation_collection': '',
        'edit_resource': '',
        'development_of_line':'',
        'yunbi_pay':'',
        'pay_success':'',
        'welcome_page':'',
        'banner_page':'',
        'settlement_page':'',
        'version_number':'',
        'download_link':'',
        'enforced_update':'',
    };
    //错误对应的提示
    validationMessages = {
        'generation_collection': {
            'required': '代收款扣除比例必须填写.',
            'pattern': '代收款扣除比例格式不正确且不能超过100%',
        },
        'edit_resource': {
            'required': '必选项目',
        },
        'development_of_line':{
            'required': '必选项目',
        },
        'yunbi_pay':{
            'required':'必选项目'
        },
        'pay_success':{
            'required':'必选项目'
        },
        'welcome_page':{
            'required':'必选项目'
        },
        'banner_page':{
            'required':'必选项目'
        },
        'settlement_page':{
            'required':'必选项目'
        },
        'version_number':{
            'required': '目标版本必须填写.',
            'pattern': '目标版本格式错误(例:1.0.0)',
        },
        'download_link':{
            'required':'apk下载链接缺失,请重新上传apk版本'
        },
        'enforced_update':{
            'required':'必选项目'
        }

    };

}
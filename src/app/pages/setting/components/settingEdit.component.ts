/**
 * Created by max on 2017/6/21.
 */
import {Component, OnInit,ViewChild, AfterViewInit} from '@angular/core';
import {SettingModel} from "../datamodel/settingModel";
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {NgForm} from "@angular/forms";
declare var swal;
@Component({
    selector: 'settingEdit',
    templateUrl: '../views/settingEdit.html',
    styleUrls: ["../styles/settingEdit.scss"]
})
export class SettingEditComponent implements OnInit,AfterViewInit {
    public settingData = new SettingModel();
    // public version_number:string;
    // public apkconfig:any={};
    // public apktip:string;
    // public notallowload:boolean = true;
    constructor(public appHttpService: AppHttpService,
                public uc: UC) {
    }

    ngOnInit() {
        let data = this.appHttpService.postData(this.uc.api.qc + '/get_system_config/');
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                for (let item of data) {
                    this.settingData[item.config_key] = item.config_value
                }
                // this.version_number = this.settingData['version_number'];
                // this.apktip='只有在目标版本大于当前版本( ' + this.version_number + ' )时才能上传apk文件';
            } else {
                swal({
                    title: "获取系统设置信息失败!",
                    text: res.error_msg,
                    type: "error",
                    timer:"2000"
                });
            }
        })
        // this.apkconfig = {
        //     value: '',
        //     accept: ".apk",
        //     uploadurl: this.uc.api.qc + "/upload_file/",
        //     capsule: "apk_address"
        // }

    }
    // filehasup(ev){
    //     this.settingData['download_link'] = (ev.value).substring(13);
    // }
    // iscanupload(e){
    //
    //     let version_number = this.settingData['version_number'];
    //     if (!this.version_number)return
    //     if (!e)return
    //     let oldVersion = this.version_number.split(".");
    //     let newVersion = e.value.split(".");
    //     for(let i =0;i<newVersion.length;i++){
    //         let o1=Number(oldVersion[i]);
    //         let n1=Number(newVersion[i]);
    //         if(n1>o1){
    //             this.notallowload = false;
    //             this.apktip="请上传apk版本"
    //             return
    //         }
    //     }
    //     this.notallowload = true;
    //     this.apktip='只有在目标版本大于当前版本( ' + this.version_number + ' )时才能上传apk文件';
    // }
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
        // 'version_number':'',
        // 'download_link':'',
        // 'enforced_update':'',
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
        // 'version_number':{
        //     'required': '目标版本必须填写.',
        //     'pattern': '目标版本格式错误(例:1.0.0)',
        // },
        // 'download_link':{
        //     'required':'apk下载链接缺失,请重新上传apk版本'
        // // },
        // 'enforced_update':{
        //     'required':'必选项目'
        // }

    };
    //上传文件
    uploadformdata(){
        let commiteArry = [];
        let settingData = this.settingData;
        for(let item in settingData){
            commiteArry.push({
                config_key: item,
                config_value: settingData[item]
            })
        }
        let params = {
            params: {system_configs: commiteArry}
        };
        this.appHttpService.postData(this.uc.api.qc + "/update_system_config", params).subscribe(
            res => {
                if (res.status) {
                    swal({
                        title: "配置保存成功!",
                        text: "",
                        type: "success",
                        timer:"2000"
                    });
                } else {
                    swal("配置保存失败", res.error_msg, "error")
                }
            }
        )
    }
}
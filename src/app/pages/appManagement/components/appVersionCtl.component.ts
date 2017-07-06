/**
 * Created by max on 2017/7/3.
 */
import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {UC, AppHttpService} from "../../../plugins/globalservice";
import {NgForm} from "@angular/forms";
import {Validators} from '@angular/forms';
declare var swal;

@Component({
    selector: 'app-version-ctl',
    templateUrl: '../views/appVersionCtl.html',
    styleUrls: ["../styles/appVersionCtl.scss"]
})
export class AppVersionCtlComponent implements OnInit,AfterViewInit {
    public fields: Array<any>;
    //test
    force_update;
    ver_link;
    ver_description;
    public notAndroid = false;
    public notIos = true;
    public apkconfig: any = {};//安卓上传配置
    public notallowload: boolean = true;//不允许上传
    public apktip: string;//安卓apk提示
    public old_ver_code: string;//安卓apk版本号
    public ver_code;

    constructor(public uc: UC,
                public appHttpService: AppHttpService) {
    }

    ngOnInit() {
        this.apkconfig = {
            value: '',
            accept: ".apk",
            uploadurl: this.uc.api.qc + "/upload_file/",
            downloadurl: this.uc.api.qc + "/get_file/",
            capsule: "apk_address"
        };
        this.getDataforIos();
        this.getDataforAndroid();

    }

    getDataforIos() {
        //获取苹果的数据
        let data = this.appHttpService.postData(this.uc.api.qc + "get_last_version", {
            params: {
                phone_type: 20
            }
        });
        data.subscribe(res => {
            if (res.status) {
                let _data = res.data;
                this.fields = [
                    {
                        title: "APP版本管理(IOS)",
                        label: "强制更新",
                        key: "force_update",
                        controlType: "radio",
                        value: _data.force_update||"1",
                        require: true,
                        options: [
                            {value: "1", content: "启用"},
                            {value: "2", content: "禁用"}
                        ],
                        validator: [
                            Validators.required
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"}
                        ]
                    }, {
                        label: "目标版本号",
                        key: "ver_code",
                        controlType: "input",
                        inputType: "text",
                        require: true,
                        value: _data.ver_code,
                        placeholder: "请输入目标版本号",
                        validator: [
                            Validators.required,
                            Validators.pattern("^([1-9][0-9]{0,2})(\.[0-9]{1,3}){2}$"),
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"},
                            {type: "pattern", content: "目标版本格式错误(最小:1.0.0; 最大:999.999.999)"}
                        ]
                    }, {
                        label: "版本描述",
                        key: "ver_description",
                        controlType: "input",
                        require: true,
                        inputType: "textarea",
                        placeholder: "请输入版本描述",
                        value:_data.ver_description,
                        validator: [
                            Validators.required,
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"},
                        ]
                    }
                ];
            } else {
                swal({
                    title: "获取IOS版本信息失败",
                    text: res.error_msg,
                    type: "error",
                    timer: 2000
                })
            }
        })
    }
    getDataforAndroid(){
        let data = this.appHttpService.postData(this.uc.api.qc + "get_last_version", {
            params: {
                phone_type: 10
            }
        });
        data.subscribe(res=>{
            if (res.status){
                let _data = res.data;
                this.force_update = _data.force_update||"1";
                this.ver_code = _data.ver_code;
                this.ver_link = _data.ver_link;
                this.ver_description = _data.ver_description;
                this.old_ver_code = _data.ver_code;
            }else {
                swal({
                    title:"获取安卓版本信息失败",
                    text:res.error_msg,
                    type: "error",
                    timer: 2000
                })
            }
        })
    }

    filehasup(ev) {
        this.apktip = "apk已经上传成功!";
        this.ver_link = ev.value;
    }

    iscanupload(e) {
        if (!this.ver_code){
            this.notallowload = true;
            this.apktip = '只有在目标版本大于当前版本( ' + this.old_ver_code + ' )时才能上传apk文件';
            return
        };
        let oldVersion = this.old_ver_code.split(".");
        let newVersion = e.value.split(".");
        for (let i = 0; i < newVersion.length; i++) {
            let o1 = Number(oldVersion[i]);
            let n1 = Number(newVersion[i]);
            if (n1 > o1) {
                this.notallowload = false;
                this.apktip = "请上传apk版本";
                return
            }
            if (n1 < o1) {
                this.notallowload = true;
                this.apktip = '只有在目标版本大于当前版本( ' + this.old_ver_code + ' )时才能上传apk文件';
                return
            }
        }
        this.notallowload = true;
        this.apktip = '只有在目标版本大于当前版本( ' + this.old_ver_code + ' )时才能上传apk文件';

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
        'force_update': '',
        'ver_code': '',
        'ver_link': '',
        'ver_description': '',
    };
    //错误对应的提示
    validationMessages = {
        'force_update': {
            'required': '必选项目'
        },
        'ver_code': {
            'required': '目标版本必须填写.',
            'pattern': '目标版本格式错误(最小:1.0.0; 最大:999.999.999)',
        },
        'ver_link': {
            'required': 'apk下载链接缺失,请重新上传apk版本'
        },
        'edit_resource': {
            'ver_description': '必选项目',
        }
    };

    //ios数据


    upAndrord() {
        let params = {
            params: {
                "ver_code": this.ver_code,                                     //版本号 格式1.0.0
                "ver_link": this.ver_link,                                     //版本链接
                "ver_description": this.ver_description,                       //版本描述
                "force_update": this.force_update,                             //强制更新标识:1=是、0=否
                "phone_type": "10"                                              //手机类型:10=安卓、20=苹果
            }
        }
        this.appHttpService.postData(this.uc.api.qc + "/add_version", params).subscribe(
            res => {
                if (res.status) {
                    swal({
                        title:"修改成功",
                        text:res.error_msg,
                        type: "success",
                        timer: 2000
                    })
                } else {
                    swal("修改APP版本失败", res.error_msg, "error")
                }
            }
        )
    };

    upIos({value}={value}) {
        let params = {
            params: {
                "ver_code": value.ver_code,                                  //版本号 格式1.0.0
                "ver_link": value.ver_link,                                  //版本链接
                "ver_description": value.ver_description,                    //版本描述
                "force_update": value.force_update,                          //强制更新标识:1=是、0=否
                "phone_type": "20"                                            //手机类型:10=安卓、20=苹果
            }
        }
        this.appHttpService.postData(this.uc.api.qc + "/add_version", params).subscribe(
            res => {
                if (res.status) {
                    swal({
                        title:"修改成功",
                        text:res.error_msg,
                        type: "success",
                        timer: 2000
                    })
                } else {
                    swal("修改APP版本失败", res.error_msg, "error")
                }
            }
        )
    }

    //切换版本
    changeCtl1() {
        this.notAndroid = false;
        this.notIos = true;
    }

    changeCtl2() {
        this.notAndroid = true;
        this.notIos = false;
    }

}
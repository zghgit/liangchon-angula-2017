/**
 * Created by max on 2017/6/6.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Validators} from '@angular/forms';
import {AppHttpService, UC, DataService} from "../../../plugins/globalservice";
import {phoneValidator} from "../../../plugins/validators/phoneValidator";
import {emailValidator} from "../../../plugins/validators/emailValidator";
import {CustomValidators} from 'ng2-validation';
declare var swal;
@Component({
    selector: 'citypartner-add',
    templateUrl: '../views/citypartnerAdd.html'
})
export class CitypartnerAddComponent implements OnInit {

    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public router: Router,
                public dataService: DataService) {
    }

    ngOnInit() {

    }

    //form数据
    public fields: Array<any> = [
        {
            label: "上级机构",
            key: "old_user_name",
            controlType: "input",
            inputType: "text",
            disabled: true,
            value: this.dataService.getCookies("user_name"),
        }, {
            label: "账户名称",
            key: "user_name",
            controlType: "input",
            inputType: "text",
            value: "",
            require: true,
            placeholder: "请输入账户名称",
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            label: "账户昵称",
            key: "business_name",
            controlType: "input",
            inputType: "text",
            value: "",
            placeholder: "请输入账户昵称"
        }, {
            label: "密码",
            key: "password",
            controlType: "input",
            inputType: "password",
            value: "",
            require: true,
            placeholder: "请输入密码",
            validator: [
                Validators.required,
                Validators.pattern(this.uc.reg.PSW)
            ],
            errormsg: [
                {type: "required", content: "必填项目"},
                {type: "pattern", content: "密码长度6~16,只能包含数字、字母、._!@#"},
                {type: "validateEqual", content: "两次密码不一致"},
            ]
        }, {
            label: "确认密码",
            key: "repassword",
            controlType: "input",
            inputType: "repassword",
            value: "",
            require: true,
            placeholder: "请输入密码",
            validator: [
                Validators.required,
            ],
            errormsg: [
                {type: "required", content: "必填项目"},
                {type: "validateEqual", content: "两次密码不一致"},
            ]
        }, {
            label: "启用",
            key: "status",
            controlType: "radio",
            value: "1",
            require: true,
            options: [
                {value: "1", content: "启用"},
                {value: "2", content: "禁用"},
            ],
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            label: "真实姓名",
            key: "real_name",
            controlType: "input",
            inputType: "text",
            value: "",
            require: true,
            placeholder: "请输入真实姓名",
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            label: "服务电话",
            key: "service_phone",
            controlType: "input",
            inputType: "text",
            value: "",
            require: true,
            placeholder: "请输入服务电话",
            validator: [
                Validators.required, phoneValidator
            ],
            errormsg: [
                {type: "required", content: "必填项目"},
                {type: "phoneValidator", content: "请填写正确的电话号码"},
            ]
        }, {
            label: "手机号码",
            key: "mobile_no",
            controlType: "input",
            inputType: "text",
            value: "",
            require: true,
            placeholder: "请输入手机号码",
            validator: [
                Validators.required,
                phoneValidator,
            ],
            errormsg: [
                {type: "required", content: "必填项目"},
                {type: "phoneValidator", content: "请填写正确的电话号码"},
            ]
        }, {
            label: "邮箱地址",
            key: "email",
            controlType: "input",
            inputType: "text",
            value: "",
            require: true,
            placeholder: "请输入邮箱地址",
            validator: [
                Validators.required, emailValidator
            ],
            errormsg: [
                {type: "required", content: "必填项目"},
                {type: "emailValidator", content: "请填写正确的电子邮箱"},
            ]
        }, {
            label: "业务地址",
            key: "business_address",
            controlType: "address",
            hasChildGroup: true,
            url: this.uc.api.qc + '/get_geo_list/',
            config: {
                province: {
                    name: 'province_code',
                    value: "0",
                    placeholder: "--请选择省--",
                },
                city: {
                    name: 'city_code',
                    value: '0',
                    placeholder: "--请选择市--",
                },
                area: {
                    name: 'district_code',
                    value: '0',
                    placeholder: "--请选择区--",
                }
            }
        }, {
            label: "营业执照-注册号",
            key: "certificate_21",
            controlType: "input",
            inputType: "text",
            value: "",
            placeholder: "请输入营业执照-注册号"
        }, {
            label: "营业执照-照片",
            key: "certificate_img_21",
            controlType: "file",
            fileType: "img",
            value: "",
            config: {
                value: "",
                accept:"image/*",
                uploadurl: this.uc.api.qc + "/upload_file/",
                capsule: "certificate_img_21"
            },
        }, {
            label: "税务登记证-登记号",
            key: "certificate_22",
            controlType: "input",
            inputType: "text",
            value: "",
            placeholder: "请输入税务登记证-登记号"
        }, {
            label: "税务登记证-照片",
            key: "certificate_img_22",
            controlType: "file",
            fileType: "img",
            value: "",
            config: {
                value: "",
                accept:"image/*",
                uploadurl: this.uc.api.qc + "/upload_file/",
                capsule: "certificate_img_22"
            },
        }, {
            label: "组织结构代码",
            key: "certificate_23",
            controlType: "input",
            inputType: "text",
            value: "",
            placeholder: "请输入组织结构代码"
        }, {
            label: "组织结构代码-照片",
            key: "certificate_img_23",
            controlType: "file",
            fileType: "img",
            value: "",
            config: {
                value: "",
                accept:"image/*",
                uploadurl: this.uc.api.qc + "/upload_file/",
                capsule: "certificate_img_23"
            },
        }, {
            label: "性质",
            key: "enterprise_nature",
            controlType: "radio",
            value: "1",
            require: true,
            options: [
                {value: "1", content: "企业"},
                {value: "2", content: "个人"},
                {value: "3", content: "个人工商户"},
            ],
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            label: "服务有效期至",
            key: "service_validity",
            controlType: "time",
            value: "",
            require: true,
            config: {
                showTimePicker: false,
                format: 0,
            },
            placeholder: "请点击选择日期",
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            label: "最小提现额度(元)",
            key: "min_withdraw_cash",
            controlType: "input",
            inputType: "text",
            value: "",
            require: true,
            placeholder: "请输入提现额度",
            validator: [
                Validators.required,
                Validators.pattern(this.uc.reg.ARITHMETIC_NUMBER),
                CustomValidators.range([0, this.uc.reg.MAX_NUMBER]),
            ],
            errormsg: [
                {type: "required", content: "必填项目"},
                {type: "pattern", content: "输入的格式不正确(例：1.00)"},
                {type: "range", content: "提现额度范围:(0-"+this.uc.reg.MAX_NUMBER+")"},
            ]
        }
    ];

    saveData({value}={value}) {
        let params = {
            params: {
                user_name: value.user_name.trim(),
                business_name: value.business_name.trim(),
                password: this.uc.toMD5(value.password,value.user_name.trim()),
                real_name: value.real_name.trim(),
                service_phone: value.service_phone,
                email: value.email,
                mobile_no: value.mobile_no,
                business_address: "",
                province_code: value.business_address.province_code,
                city_code: value.business_address.city_code,
                district_code: value.business_address.district_code,
                certificate_1: value.certificate_21,
                certificate_img_1: value.certificate_img_21,
                certificate_2: value.certificate_22,
                certificate_img_2: value.certificate_img_22,
                certificate_3: value.certificate_23,
                certificate_img_3: value.certificate_img_23,
                enterprise_nature: value.enterprise_nature,
                service_validity: value.service_validity,
                min_withdraw_cash: value.min_withdraw_cash,
                status: value.status,
                staff_no: '',
                position: ''
            }
        };
        this.appHttpService.postData(this.uc.api.qc + "/add_city_partner_user", params).subscribe(
            res => {
                if (res.status) {
                    this.router.navigateByUrl('pages/account/citypartnerList');
                } else {
                    swal("新增城市合伙人失败", res.error_msg, "error")
                }
            }
        )
    }
}
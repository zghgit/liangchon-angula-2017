/**
 * Created by max on 2017/6/6.
 */
import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {AppHttpService, UC, DataService} from "../../../plugins/globalservice";
import {phoneValidator} from "../../../plugins/validators/phoneValidator";
import {emailValidator} from "../../../plugins/validators/emailValidator";

declare var swal;
@Component({
    selector: 'citypartner-edit',
    templateUrl: '../views/citypartnerEdit.html'
})
export class CitypartnerEditComponent implements OnInit {
    public city_partner_id: string;
    public user_name: string;
    public fields: Array<any>;

    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public router: Router,
                public dataService: DataService,
                public activatedRoute: ActivatedRoute,) {
    }

    ngOnInit() {
        let params = this.activatedRoute.params;
        params.subscribe(res => {
            this.city_partner_id = res.id;
        })

        let data = this.activatedRoute.params
            .switchMap((params: Params) => this.appHttpService.getData(this.uc.api.qc + "/get_city_partner_user/hash/" + params['id']));
        data.subscribe(res => {
            if (res.status) {
                let _data = res.data;
                this.user_name = _data.user_name;
                let module_permission = _data.module_permission;
                let role_module_permission = _data.role_module_permission;
                let checked_module_permission = [];
                for (let role of role_module_permission) {
                    var permissionFlag = false;
                    for (let item of module_permission) {
                        if (item.module_name == role.module_name) {
                            var permissionFlag = true;
                        }
                    }
                    checked_module_permission.push({
                        checked: permissionFlag,
                        value: role.module_name,
                        content: role.content
                    })
                }
                this.fields = [
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
                        value: _data.user_name,
                        disabled: true,
                        placeholder: "请输入账户名称",
                    }, {
                        label: "账户昵称",
                        key: "business_name",
                        controlType: "input",
                        inputType: "text",
                        value: _data.business_name,
                        placeholder: "请输入账户昵称"
                    }, {
                        label: "启用",
                        key: "status",
                        controlType: "radio",
                        value: _data.status,
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
                        value: _data.real_name,
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
                        value: _data.service_phone,
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
                        value: _data.mobile_no,
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
                        value: _data.email,
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
                        url: this.uc.api.qc + '/get_geo_list/hash/',
                        config: {
                            province: {
                                name: 'province_code',
                                value: _data.province_code,
                                placeholder: "--请选择省--",
                            },
                            city: {
                                name: 'city_code',
                                value: _data.city_code,
                                placeholder: "--请选择市--",
                            },
                            area: {
                                name: 'district_code',
                                value: _data.district_code,
                                placeholder: "--请选择区--",
                            }
                        }
                    }, {
                        label: "营业执照-注册号",
                        key: "certificate_21",
                        controlType: "input",
                        inputType: "text",
                        value: _data.certificate_1,
                        placeholder: "请输入营业执照-注册号"
                    }, {
                        label: "营业执照-照片",
                        key: "certificate_img_21",
                        controlType: "file",
                        fileType: "img",
                        value: _data.certificate_img_1,
                        config: {
                            value: _data.certificate_img_1,
                            accept:"image/*",
                            uploadurl: this.uc.api.qc + "/upload_file/hash/",
                            downloadurl: this.uc.api.qc + "/get_file/hash/",
                            capsule: "certificate_img_21"
                        },
                    }, {
                        label: "税务登记证-登记号",
                        key: "certificate_22",
                        controlType: "input",
                        inputType: "text",
                        value: _data.certificate_2,
                        placeholder: "请输入税务登记证-登记号"
                    }, {
                        label: "税务登记证-照片",
                        key: "certificate_img_22",
                        controlType: "file",
                        fileType: "img",
                        value: _data.certificate_img_2,
                        config: {
                            value: _data.certificate_img_2,
                            accept:"image/*",
                            uploadurl: this.uc.api.qc + "/upload_file/hash/",
                            downloadurl: this.uc.api.qc + "/get_file/hash/",
                            capsule: "certificate_img_22"
                        },
                    }, {
                        label: "组织结构代码",
                        key: "certificate_23",
                        controlType: "input",
                        inputType: "text",
                        value: _data.certificate_3,
                        placeholder: "请输入组织结构代码"
                    }, {
                        label: "组织结构代码-照片",
                        key: "certificate_img_23",
                        controlType: "file",
                        fileType: "img",
                        value: _data.certificate_img_3,
                        config: {
                            value: _data.certificate_img_3,
                            accept:"image/*",
                            uploadurl: this.uc.api.qc + "/upload_file/hash/",
                            downloadurl: this.uc.api.qc + "/get_file/hash/",
                            capsule: "certificate_img_23"
                        },
                    }, {
                        label: "性质",
                        key: "enterprise_nature",
                        controlType: "radio",
                        value: _data.enterprise_nature,
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
                        value: _data.service_validity,
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
                        value: _data.min_withdraw_cash,
                        require: true,
                        placeholder: "请输入提现额度",
                        validator: [
                            Validators.required,
                            Validators.pattern(this.uc.reg.ARITHMETIC_NUMBER)
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"},
                            {type: "pattern", content: "输入的格式不正确(例：1.00)"},
                        ]
                    }, {
                        label: "权限模块",
                        key: "module_permission",
                        controlType: "checkbox",
                        require: true,
                        value: "",
                        options: checked_module_permission,
                        validator: [
                            Validators.required
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"}
                        ]
                    },
                ];
            } else {
                swal({
                    title:"获取城市合伙人信息失败!",
                    text:res.error_msg,
                    type:"error",
                    timer:"1500"
                });
            }
        })
    }

    saveData({value}={value}) {
        let params = {
            params: {
                city_partner_id: this.city_partner_id,
                city_partner_info: {
                    user_name: this.user_name,
                    business_name: value.business_name.trim(),
                    password: value.password,
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
                    position: '',
                    module_permission: JSON.parse(value.module_permission).join(","),
                }
            }
        };
        this.appHttpService.postData(this.uc.api.qc + "/update_city_partner_user/hash", params).subscribe(
            res => {
                if (res.status) {
                    this.router.navigateByUrl('pages/account/citypartnerList');
                } else {
                    swal("编辑城市合伙人失败", res.error_msg, "error")
                }
            }
        )
    }
}
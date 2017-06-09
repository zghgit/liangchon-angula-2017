/**
 * Created by max on 2017/6/9.
 */
import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {AppHttpService, UC, DataService} from "../../../plugins/globalservice";
import {phoneValidator} from "../../../plugins/validators/phoneValidator";
import {emailValidator} from "../../../plugins/validators/emailValidator";

declare var swal;
@Component({
    selector: 'user-edit',
    templateUrl: '../views/UserEdit.html'
})
export class UserEditComponent implements OnInit {
    public sub_user_id: string;
    public user_name: string;
    public fields: Array<any>

    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public router: Router,
                public dataService: DataService,
                public activatedRoute: ActivatedRoute,) {
    }

    ngOnInit() {
        let params = this.activatedRoute.params;
        params.subscribe(res => {
            this.sub_user_id = res.id;
        })

        let data = this.activatedRoute.params
            .switchMap((params: Params) => this.appHttpService.getData(this.uc.api.qc + "/get_user/hash/" + params['id']));
        data.subscribe(res => {
            console.log(res);
            if (res.status) {
                let _data = res.data;
                this.user_name = _data.user_name;
                this.fields = [
                    {
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
                        label: "账号状态",
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
                    }
                ];
                let admin_flg = this.dataService.getCookies("admin_flg");
                if (admin_flg == 1 && _data.user_type == 1) {
                    this.fields.push({
                        label: "联系地址",
                        key: "business_address",
                        controlType: "input",
                        inputType: "text",
                        value: _data.business_address,
                        require: true,
                        placeholder: "请输入联系地址",
                        validator: [
                            Validators.required
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"},
                        ]
                    })
                };
                if (admin_flg != 1 && _data.user_type == 1) {
                    this.fields.push({
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
                    })
                    let role = this.dataService.getCookies("role");
                    if(role == "商户"){
                        this.fields.push({
                            label: "电费单价(元)",
                            key: "electricity_price",
                            controlType: "input",
                            inputType: "text",
                            value:  _data.electricity_price,
                            placeholder: "请输入电费单价",
                            validator: [
                                Validators.maxLength(7),
                                Validators.pattern(this.uc.reg.ARITHMETIC_NUMBER)
                            ],
                            errormsg: [
                                {type: "pattern", content: "输入的格式不正确(例：1.00)"},
                                {type: "maxlength", content: "提现最大额度不能超过1,000,000 元"},
                            ]
                        });
                        this.fields.push({
                            label: "结算",
                            key: "whether_settlement",
                            controlType: "radio",
                            value: _data.whether_settlement,
                            require: true,
                            options: [
                                {value: "1", content: "是"},
                                {value: "2", content: "否"},
                            ],
                            validator: [
                                Validators.required
                            ],
                            errormsg: [
                                {type: "required", content: "必填项目"}
                            ]
                            , click: (data) => {
                                if (data == 1) {
                                    this.fields[22].hidden = false;
                                    this.fields[23].hidden = false;
                                }
                                if (data == 2) {
                                    this.fields[22].hidden = true;
                                    this.fields[23].hidden = true;
                                }

                            }
                        });
                        this.fields.push({
                            label: "结算周期(月)",
                            key: "settlement_cycle",
                            controlType: "input",
                            inputType: "text",
                            require: true,
                            hidden: _data.whether_settlement==2,
                            value: _data.settlement_cycle,
                            placeholder: "请输入结算周期"
                        });
                        this.fields.push({
                            label: "结算日(日)",
                            key: "settlement_day",
                            controlType: "input",
                            inputType: "text",
                            require: true,
                            hidden: _data.whether_settlement==2,
                            value: _data.settlement_day,
                            placeholder: "请输入结算日"
                        });
                    }
                };
                if (_data.user_type ==2){
                    this.fields.push({
                        label: "联系地址",
                        key: "business_address",
                        controlType: "input",
                        inputType: "text",
                        value: _data.business_address,
                        require: true,
                        placeholder: "请输入联系地址",
                        validator: [
                            Validators.required
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"},
                        ]
                    });
                    this.fields.push({
                        label: "部门名称",
                        key: "department",
                        controlType: "input",
                        inputType: "text",
                        value: _data.department,
                        require: true,
                        placeholder: "请输入部门名称",
                        validator: [
                            Validators.required
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"},
                        ]
                    });
                    this.fields.push({
                        label: "工号",
                        key: "staff_no",
                        controlType: "input",
                        inputType: "text",
                        value: _data.staff_no,
                        require: true,
                        placeholder: "请输入工号",
                        validator: [
                            Validators.required
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"},
                        ]
                    });
                    this.fields.push({
                        label: "职位",
                        key: "position",
                        controlType: "input",
                        inputType: "text",
                        value: _data.position,
                        require: true,
                        placeholder: "请输入职位",
                        validator: [
                            Validators.required
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"},
                        ]
                    });
                }
            } else {
                swal("获取用户信息失败", res.error_msg, "error")
            }
        })
    }

    saveData({value}={value}) {
        let params = {
            params: {
                sub_user_id: this.sub_user_id,
                sub_user_info: {
                    user_name: this.user_name,
                    business_name: value.business_name.trim(),
                    password: value.password,
                    real_name: value.real_name.trim(),
                    service_phone: value.service_phone,
                    email: value.email,
                    status: value.status,
                    mobile_no: value.mobile_no,
                    business_address: value.business_address,
                    department: value.department,
                    staff_no: value.staff_no,
                    position: value.position,
                    service_validity: value.service_validity,
                    module_permission: JSON.parse(value.module_permission).join(","),
                }
            }
        };
        this.appHttpService.postData(this.uc.api.qc + "/update_sub_user/hash", params).subscribe(
            res => {
                if (res.status) {
                    this.router.navigateByUrl('pages/account/childAccountList');
                } else {
                    swal("编辑子账户失败", res.error_msg, "error")
                }
            }
        )
    }
}
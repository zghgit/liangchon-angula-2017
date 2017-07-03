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
    selector: 'childaccountother-edit',
    templateUrl: '../views/childaccountOtherEdit.html'
})
export class ChildAccountOtherEditComponent implements OnInit {
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
            .switchMap((params: Params) => this.appHttpService.getData(this.uc.api.qc + "/get_sub_user/hash/" + params['id']));
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
                        label: "父账户",
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
                    }, {
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
                    }, {
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
                    }, {
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
                    title:"获取子账户信息失败!",
                    text:res.error_msg,
                    type:"error",
                    timer:"2000"
                });
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
                    min_withdraw_cash:value.min_withdraw_cash,
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
/**
 * Created by max on 2017/6/9.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Validators} from '@angular/forms';
import {AppHttpService, UC, DataService} from "../../../plugins/globalservice";
import {phoneValidator} from "../../../plugins/validators/phoneValidator";
import {emailValidator} from "../../../plugins/validators/emailValidator";

declare var swal;
@Component({
    selector: 'childaccount-add',
    templateUrl: '../views/childAccountAdd.html'
})
export class ChildAccountAddComponent implements OnInit {

    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public router: Router,
                public dataService: DataService) {
    }

    ngOnInit() {

        let admin_flg = this.dataService.getCookies("admin_flg");//1是微云冲  2是另外三个
        let module_permission = this.dataService.getLocalStorage("module_permission");
        let permission: Array<any> = [];
        for (let item of module_permission) {
            permission.push({
                checked: true,
                value: item['module_name'],
                content: item['content']

            })
        }
        let filed = {
            label: "角色",
            key: "module_permission",
            controlType: "radio",
            value: permission[0].value,
            require: true,
            options: permission,
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        };
        this.fields.splice(14,0,filed)
    }

    //form数据
    public fields: Array<any> = [
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
            ]
        }, {
            label: "确认密码",
            key: "repassword",
            controlType: "input",
            inputType: "password",
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
            label: "联系地址",
            key: "business_address",
            controlType: "input",
            inputType: "text",
            value: "",
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
            value: "",
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
            value: "",
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
            value: "",
            require: true,
            placeholder: "请输入职位",
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"},
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
        }
    ];

    saveData({value}={value}) {
        console.log(value)
        let params = {
            params: {
                user_name: value.user_name.trim(),
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
                module_permission: value.module_permission,
            }
        };
        this.appHttpService.postData(this.uc.api.qc + "/add_sub_user/hash", params).subscribe(
            res => {
                if (res.status) {
                    this.router.navigateByUrl('pages/account/childAccountList');
                } else {
                    swal("新增子账户失败", res.error_msg, "error")
                }
            }
        )
    }
}
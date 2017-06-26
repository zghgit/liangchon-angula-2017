/**
 * Created by max on 2017/6/12.
 */
import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {AppHttpService, UC, DataService} from "../../../plugins/globalservice";
declare var swal;
@Component({
    selector: 'userpwd-edit',
    templateUrl: '../views/UserPwdEdit.html'
})
export class UserPwdEditComponent implements OnInit {
    public fields: Array<any>;

    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public router: Router,
                public dataService: DataService,
                public activatedRoute: ActivatedRoute,) {
    }

    ngOnInit() {
        let data = this.activatedRoute.params
            .switchMap((params: Params) => this.appHttpService.getData(this.uc.api.qc + "/get_user/hash/" + params['id']));
        data.subscribe(res => {
            if (res.status) {
                let _data = res.data;
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
                        label: "旧的密码",
                        key: "old_password",
                        controlType: "input",
                        inputType: "oldpassword",
                        value: "",
                        require: true,
                        placeholder: "请输入旧的密码",
                        validator: [
                            Validators.required
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"}
                        ]
                    }, {
                        label: "新的密码",
                        key: "password",
                        controlType: "input",
                        inputType: "password",
                        value: "",
                        require: true,
                        placeholder: "请输入新的密码",
                        validator: [
                            Validators.required,
                            Validators.pattern(this.uc.reg.PSW),
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
                        placeholder: "请确认密码",
                        validator: [
                            Validators.required,
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"},
                            {type: "validateEqual", content: "两次密码不一致"},
                        ]
                    },
                ];
            } else {
                swal({
                    title: "获取用户信息失败!",
                    text: res.error_msg,
                    type: "error",
                    timer:"1500"
                });
            }
        })
    }

    saveData({value}={value}) {
        let params = {
            params: {
                new_password: value.password,
                old_password: value.old_password
            }
        };
        this.appHttpService.postData(this.uc.api.qc + "/update_user_password/hash", params).subscribe(
            res => {
                if (res.status) {
                    this.router.navigateByUrl('login');
                } else {
                    swal("修改密码失败", res.error_msg, "error")
                }
            }
        )
    }
}
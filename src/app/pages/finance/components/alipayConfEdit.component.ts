/**
 * Created by max on 2017/6/12.
 */
/**
 * Created by max on 2017/6/2.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Validators} from '@angular/forms';
import {AppHttpService, UC} from "../../../plugins/globalservice";

declare var swal;
@Component({
    selector: 'alipayconf-edit',
    templateUrl: '../views/alipayConfEdit.html'
})
export class AlipayConfEditComponent implements OnInit {
    public fields: Array<any>;
    public alipay_config_id: string;

    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public router: Router) {
    }

    public commodity_id: string;

    ngOnInit() {
        let data = this.appHttpService.getData(this.uc.api.qc + "/get_alipay_config")
        data.subscribe(res => {
            if (res.status) {
                let _data = res.data.ailpay_config;
                this.alipay_config_id = _data.alipay_config_id;
                this.fields = [
                    {
                        title: "APP支付宝配置",
                        label: "应用ID(APPID)",
                        key: "app_id",
                        controlType: "input",
                        inputType: "text",
                        require: true,
                        value: _data.app_id,
                        placeholder: "请输入应用ID",
                        validator: [
                            Validators.required
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"}
                        ]
                    }, {
                        label: "商户rsa私钥",
                        key: "rsa_private_key",
                        controlType: "input",
                        inputType: "textarea",
                        require: true,
                        value: _data.rsa_private_key,
                        placeholder: "请输入商户rsa私钥",
                        validator: [
                            Validators.required
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"}
                        ]
                    }, {
                        label: "商户rsa公钥",
                        key: "rsa_public_key",
                        controlType: "input",
                        inputType: "textarea",
                        require: true,
                        value: _data.rsa_public_key,
                        placeholder: "请输入商户rsa公钥",
                        validator: [
                            Validators.required
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"}
                        ]
                    }, {
                        label: "支付宝公钥",
                        key: "ali_public_key",
                        controlType: "input",
                        inputType: "textarea",
                        require: true,
                        value: _data.ali_public_key,
                        placeholder: "请输入APP支付支付宝公钥",
                        validator: [
                            Validators.required
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"}
                        ]
                    }, {
                        label: "启用状态",
                        key: "status",
                        controlType: "radio",
                        value: _data.status,
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
                    }
                ];
            } else {
                swal({
                    title: "获取支付宝配置信息失败!",
                    text: res.error_msg,
                    type: "error",
                    timer:"2000"
                });
            }
        })
    }

    saveData = ({value}={value}) => {
        let params = {
            params: {
                alipay_config_id: this.alipay_config_id,
                ailpay_config_info: {
                    app_id: value.app_id,
                    rsa_private_key: value.rsa_private_key,
                    rsa_public_key:value.rsa_public_key,
                    ali_public_key: value.ali_public_key,
                    status: value.status
                }
            }
        };
        this.appHttpService.postData(this.uc.api.qc + "/update_alipay_config", params).subscribe(
            res => {
                if (res.status) {
                    this.router.navigateByUrl('pages/finance/payConfigList');
                } else {
                    swal("编辑支付宝配置失败", res.error_msg, "error")
                }
            }
        )
    }
}
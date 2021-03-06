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
    selector: 'wxpayconf-add',
    templateUrl: '../views/wxPubConfAdd.html'
})
export class WxPubConfAddComponent implements OnInit {
    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public router: Router) {
    }

    public commodity_id: string;

    ngOnInit() {
    }

    public fields: Array<any> = [
        {
            title: "开放平台配置",
            label: "应用ID(APPID)",
            key: "app_id",
            controlType: "input",
            inputType: "text",
            require: true,
            value: "",
            placeholder: "请输入应用ID",
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            label: "应用密钥(APPSECRET)",
            key: "app_secret",
            controlType: "input",
            inputType: "text",
            require: true,
            value: "",
            placeholder: "请输入应用密钥",
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            label: "商户ID(MCHID)",
            key: "mch_id",
            controlType: "input",
            inputType: "text",
            require: true,
            value: "",
            placeholder: "请输入商户ID",
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            label: "支付密钥(KEY)",
            key: "pay_key",
            controlType: "input",
            inputType: "text",
            require: true,
            value: "",
            placeholder: "请输入支付密钥",
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            label: "apiclient_cert",
            key: "apiclient_cert_p",
            controlType: "file",
            require: true,
            value: "",
            config: {
                value: "",
                accept: "",
                uploadurl: this.uc.api.qc + "/upload_file/",
                capsule: "apiclient_cert_p" + new Date().getTime()
            },
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            label: "apiclient_key",
            key: "apiclient_key_p",
            controlType: "file",
            require: true,
            value: "",
            config: {
                value: "",
                accept: "",
                uploadurl: this.uc.api.qc + "/upload_file/",
                capsule: "apiclient_key_p" + new Date().getTime()
            },
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            title: "微信公众号配置",
            label: "微信公众号ID",
            key: "appp_id",
            controlType: "input",
            inputType: "text",
            require: true,
            value: "",
            placeholder: "请输入微信公众号ID",
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            label: "微信公众号密钥",
            key: "appp_secret",
            controlType: "input",
            inputType: "text",
            require: true,
            value: "",
            placeholder: "请输入微信公众号密钥",
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            label: "商户ID(MCHID)",
            key: "mchh_id",
            controlType: "input",
            inputType: "text",
            require: true,
            value: "",
            placeholder: "请输入商户ID",
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            label: "支付密钥(KEY)",
            key: "ppay_key",
            controlType: "input",
            inputType: "text",
            require: true,
            value: "",
            placeholder: "请输入支付密钥",
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            label: "apiclient_cert",
            key: "apiclient_cert_g",
            controlType: "file",
            require: true,
            value: "",
            config: {
                value: "",
                accept: "",
                uploadurl: this.uc.api.qc + "/upload_file/",
                capsule: "apiclient_cert_g" + new Date().getTime()
            },
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            label: "apiclient_key",
            key: "apiclient_key_g",
            controlType: "file",
            require: true,
            value: "",
            config: {
                value: "",
                accept: "",
                uploadurl: this.uc.api.qc + "/upload_file/",
                capsule: "apiclient_key_g" + new Date().getTime()
            },
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
            value: "1",
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

    saveData = ({value}={value}) => {
        let params = {
            params: {
                appp_id: value.appp_id.trim(),
                app_id: value.app_id.trim(),
                app_secret: value.app_secret.trim(),
                appp_secret: value.appp_secret.trim(),
                mch_id: value.mch_id.trim(),
                pay_key: value.pay_key.trim(),
                mchh_id: value.mchh_id.trim(),
                ppay_key: value.ppay_key.trim(),
                status: value.status,
                apiclient_cert_p: value.apiclient_cert_p,
                apiclient_key_p: value.apiclient_key_p,
                apiclient_cert_g: value.apiclient_cert_g,
                apiclient_key_g: value.apiclient_key_g
            }
        };
        this.appHttpService.postData(this.uc.api.qc + "/add_wxpay_config", params).subscribe(
            res => {
                if (res.status) {
                    this.router.navigateByUrl('pages/finance/payConfigList');
                } else {
                    swal("新增微信公众号配置失败", res.error_msg, "error")
                }
            }
        )
    }
}
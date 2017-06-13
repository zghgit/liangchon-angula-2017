/**
 * Created by max on 2017/6/13.
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
    selector: 'advertisement-add',
    templateUrl: '../views/advertisementAdd.html'
})
export class advertisementAddComponent implements OnInit {
    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public router: Router) {
    }

    ngOnInit() {

    }

    //form数据
    public fields = [
        {
            label: "广告名称",
            key: "advertisement_name",
            controlType: "input",
            inputType: "text",
            require: true,
            value: "",
            placeholder: "请输入广告名称",
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            label: "图片",
            key: "advertisement_url",
            controlType: "file",
            fileType: "img",
            require: true,
            value: "",
            config: {
                uploadurl: this.uc.api.qc + "/upload_file/hash/",
                downloadurl: this.uc.api.qc + "/get_file/hash/",
                capsule: "advertisement_url"
            },
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            label: "链接地址",
            key: "charge_duration",
            controlType: "input",
            inputType: "text",
            require: true,
            value: "",
            placeholder: "请输入链接地址",
            validator: [
                Validators.required,
                Validators.pattern("^[0-9]+$"),
            ],
            errormsg: [
                {type: "required", content: "必填项目"},
                {type: "pattern", content: "只能是数字"},
            ]
        }, {
            label: "广告显示时间(秒)",
            key: "show_duration",
            controlType: "input",
            inputType: "text",
            require: true,
            value: "",
            placeholder: "请输入广告显示时间",
            validator: [
                Validators.required,
                Validators.pattern("^[0-9]+$")
            ],
            errormsg: [
                {type: "required", content: "必填项目"},
                {type: "pattern", content: "只能是数字"},
            ]
        }, {
            label: "显示位置",
            key: "show_position",
            controlType: "radio",
            value: "1",
            require: true,
            options: [
                {value: "1", content: "启动画面"},
                {value: "2", content: "结算页面"},
                {value: "3", content: "首页banner"},
                {value: "4", content: "引导页面"},
            ],
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
            ]
        }, {
            label: "是否设为默认广告",
            key: "default_display",
            controlType: "radio",
            value: "1",
            require: true,
            options: [
                {value: "1", content: "是"},
                {value: "2", content: "否"}
            ],
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

    saveData({value}={value}) {
        console.log(value)
        let params = {
            params: value
        }
        this.appHttpService.postData(this.uc.api.qc + "/add_commodity/hash", params).subscribe(
            res => {
                if (res.status) {
                    this.router.navigateByUrl('pages/advertisement/advertisementList');
                } else {
                    swal("新增广告失败", res.error_msg, "error")
                }
            }
        )
    }
}
/**
 * Created by max on 2017/6/13.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
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
                value: "",
                accept:"image/*",
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
            key: "link_url",
            controlType: "input",
            inputType: "text",
            require: true,
            value: "",
            placeholder: "请输入链接地址",
            validator: [
                Validators.required,
                CustomValidators.url
            ],
            errormsg: [
                {type: "required", content: "必填项目"},
                {type: "url", content: "请输入有效的链接地址,含协议部分(如：http,https,ftp等)"},
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
                CustomValidators.number,
                CustomValidators.range([0, 30]),
            ],
            errormsg: [
                {type: "required", content: "必填项目"},
                {type: "number", content: "只能是数字"},
                {type: "range", content: "广告显示时间范围:(0-30)秒"},
            ]
        }, {
            label: "投放区域",
            key: "advertisement_range",
            controlType: "inputpacs",
            require: true,
            value: "",
            placeholder: "请选择投放区域",
            content: "确认",
            options: [],
            check_all: true,
            url: this.uc.api.qc + '/get_geo_list/hash/',
            validator: [
                Validators.required
            ],
            errormsg: [
                {type: "required", content: "必填项目"}
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
        let{advertisement_range}=value;
        let advertisementRange = JSON.parse(advertisement_range);
        if (advertisementRange.check_all==2&&advertisementRange.selectedSet.length==0){
            swal({
                title: "新增广告失败!",
                text: "地址是必选的",
                type: "error",
                timer:"1500"
            });
            return
        }
        if (advertisementRange.check_all == 1){
            advertisementRange.selectedSet=[{
                province_code: "0",
                city_code: "0",
                district_code: "0"
            }]
        }
        let params = {
            params: {
                advertisement_info: {
                    advertisement_name: value.advertisement_name,
                    advertisement_url: value.advertisement_url,
                    link_url: value.link_url,
                    show_position: value.show_position,
                    show_duration: value.show_duration,
                    status: value.status,
                    default_display: value.default_display,
                },
                advertisement_range: {
                    check_all: advertisementRange.check_all,
                    advertisement_range_info: advertisementRange.selectedSet
                }
            }
        }
        this.appHttpService.postData(this.uc.api.qc + "/add_advertisement/hash", params).subscribe(
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
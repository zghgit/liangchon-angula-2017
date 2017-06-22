/**
 * Created by max on 2017/6/14.
 */
import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {CustomValidators} from 'ng2-validation';

declare var swal;
@Component({
    selector: 'advertisement-edit',
    templateUrl: '../views/advertisementEdit.html'
})
export class AdvertisementEditComponent implements OnInit {
    public advertisement_id: string;
    public fields: Array<any>;

    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public router: Router,
                public activatedRoute: ActivatedRoute,) {
    }

    ngOnInit() {
        let params = this.activatedRoute.params;
        params.subscribe(res => {
            this.advertisement_id = res.id;
        })

        let data = this.activatedRoute.params
            .switchMap((params: Params) => this.appHttpService.postData(this.uc.api.qc + "/get_advertisement/hash/",{
                params:{
                    advertisement_id:params['id']
                }
            }));
        data.subscribe(res => {
            if (res.status) {
                let _data = res.data;
                let check_all = false;
                let advertisement_range = _data.advertisement_range;
                let temp_advertisement_range =[];
                if (advertisement_range[0].province_code==0&&advertisement_range[0].city_code==0&&advertisement_range[0].district_code==0){
                    check_all = true;
                }else {
                    temp_advertisement_range=_data.advertisement_range;
                }
                this.fields = [{
                    label: "广告名称",
                    key: "advertisement_name",
                    controlType: "input",
                    inputType: "text",
                    require: true,
                    value: _data.advertisement_name,
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
                    value: _data.advertisement_url,
                    config: {
                        value: _data.advertisement_url,
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
                    value: _data.link_url,
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
                    value: _data.show_duration,
                    placeholder: "请输入广告显示时间",
                    validator: [
                        Validators.required,
                        CustomValidators.min(0),
                        CustomValidators.number,
                        CustomValidators.max(30),
                    ],
                    errormsg: [
                        {type: "required", content: "必填项目"},
                        {type: "min", content: "最少只能0秒"},
                        {type: "max", content: "最多只能30秒"},
                    ]
                }, {
                    label: "投放区域",
                    key: "advertisement_range",
                    controlType: "inputpacs",
                    require: true,
                    value: "",
                    placeholder: "请选择投放区域",
                    content: "添加",
                    options: temp_advertisement_range,
                    check_all: check_all,
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
                    value: _data.show_position,
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
                    value: _data.show_position,
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
                swal("获取广告信息失败", res.error_msg, "error")
            }
        })
    }

    saveData({value}={value}) {
        let {advertisement_range}=value;
        let advertisementRange = JSON.parse(advertisement_range);
        if (advertisementRange.check_all == 2 && advertisementRange.selectedSet.length == 0) {
            swal("编辑广告失败", "地址是必选的", "error");
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
                advertisement_id: this.advertisement_id,
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
        this.appHttpService.postData(this.uc.api.qc + "/update_advertisement/hash", params).subscribe(
            res => {
                if (res.status) {
                    this.router.navigateByUrl('pages/advertisement/advertisementList');
                } else {
                    swal("编辑广告失败", res.error_msg, "error")
                }
            }
        )
    }
}
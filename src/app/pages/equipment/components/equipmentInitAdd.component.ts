/**
 * Created by max on 2017/6/13.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Validators} from '@angular/forms';
import {AppHttpService, UC} from "../../../plugins/globalservice";
declare var swal;
@Component({
    selector: 'equipmentinit-add',
    templateUrl: '../views/equipmentInitAdd.html',
    styleUrls:["../styles/equipmentInitAdd.scss"],
})
export class EquipmentInitAddComponent implements OnInit {
    public device_no;
    public showForm:boolean = false;
    public fields:Array<any>;
    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public router: Router) {
    }

    ngOnInit() {

    }
    validateDevice(){
        var params = {
            params: {
                device_no:this.device_no
            }
        };
        this.appHttpService.postData(this.uc.api.qc + "/validate_device_no/hash", params).subscribe(
            res => {
                if (res.status) {
                    this.showForm = true;
                    let _data = res.data;
                    console.log(_data)
                    this.fields = [
                        {
                            label: "设备编号",
                            key: "device_no",
                            controlType: "input",
                            inputType: "text",
                            require: true,
                            disabled:true,
                            value: _data.device_no,
                            placeholder: "请输入设备编号",
                            validator: [
                                Validators.required
                            ],
                            errormsg: [
                                {type: "required", content: "必填项目"}
                            ]
                        }, {
                            label: "设备名称",
                            key: "device_name",
                            controlType: "input",
                            inputType: "text",
                            require: true,
                            value: _data.device_name,
                            placeholder: "请输入设备名称",
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
                            value: _data.status||"1",
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
                        },{
                            label: "设备类型",
                            key: "device_type",
                            controlType: "radio",
                            value: _data.device_type,
                            require: true,
                            options: [
                                {value: "1", content: "充电桩"},
                                {value: "2", content: "充值机"}
                            ],
                            validator: [
                                Validators.required
                            ],
                            errormsg: [
                                {type: "required", content: "必填项目"}
                            ]
                        },{
                            label: "通讯方式",
                            key: "communicate_type",
                            controlType: "radio",
                            value: _data.communicate_type,
                            require: true,
                            options: [
                                {value: "1", content: "wifi"},
                                {value: "2", content: "gprs"}
                            ],
                            validator: [
                                Validators.required
                            ],
                            errormsg: [
                                {type: "required", content: "必填项目"}
                            ]
                        }, {
                            label: "固定版本",
                            key: "soft_ver",
                            controlType: "input",
                            inputType: "text",
                            require: true,
                            disabled:true,
                            value: _data.soft_ver,
                            placeholder: "请输入固定版本",
                            validator: [
                                Validators.required,
                            ],
                            errormsg: [
                                {type: "required", content: "必填项目"},
                            ]
                        },{
                            label: "电表编号",
                            key: "meters_no",
                            controlType: "input",
                            inputType: "text",
                            require: true,
                            disabled:true,
                            value: _data.meters_no,
                            placeholder: "请输入电表编号",
                            validator: [
                                Validators.required,
                            ],
                            errormsg: [
                                {type: "required", content: "必填项目"},
                            ]
                        }, {
                            label: "设备所在地区",
                            key: "business_address",
                            controlType: "address",
                            hasChildGroup: true,
                            url: this.uc.api.qc + '/get_geo_list/hash/',
                            config: {
                                province: {
                                    name: 'province_code',
                                    value: _data.province_code||"0",
                                    placeholder: "--请选择省--",
                                },
                                city: {
                                    name: 'city_code',
                                    value: _data.city_code||"0",
                                    placeholder: "--请选择市--",
                                },
                                area: {
                                    name: 'district_code',
                                    value: _data.district_code||"0",
                                    placeholder: "--请选择区--",
                                }
                            }
                        },{
                            label: "设备详细地址",
                            key: "device_address",
                            controlType: "input",
                            inputType: "text",
                            require: true,
                            button:{
                                class:"btn-success",
                                content:"经纬度拾取",
                                click:()=> {
                                    console.log(this)
                                }
                            },
                            value: _data.device_address||"",
                            placeholder: "请输入设备详细地址",
                            validator: [
                                Validators.required,
                            ],
                            errormsg: [
                                {type: "required", content: "必填项目"},
                            ]
                        },{
                            label: "设备所在小区名称",
                            key: "areas_name",
                            controlType: "input",
                            inputType: "text",
                            require: true,
                            value: _data.areas_name||"",
                            placeholder: "请输入设备所在小区名称",
                            validator: [
                                Validators.required,
                            ],
                            errormsg: [
                                {type: "required", content: "必填项目"},
                            ]
                        },{
                            label: "纬度",
                            key: "device_lat",
                            controlType: "input",
                            inputType: "text",
                            require: true,
                            disabled:true,
                            value: _data.device_lat||"",
                            placeholder: "请使用坐标拾取工具获取纬度",
                            validator: [
                                Validators.required,
                            ],
                            errormsg: [
                                {type: "required", content: "必填项目"},
                            ]
                        },{
                            label: "经度",
                            key: "device_lng",
                            controlType: "input",
                            inputType: "text",
                            require: true,
                            disabled:true,
                            value: _data.device_lng||"",
                            placeholder: "请使用坐标拾取工具获取经度",
                            validator: [
                                Validators.required,
                            ],
                            errormsg: [
                                {type: "required", content: "必填项目"},
                            ]
                        }
                    ];
                } else {
                    swal("设备编号有效性验证失败失败", res.error_msg, "error")
                }
            }
        )
    }

    //form数据

    saveData({value}={value}) {
        console.log(value)
        let params = {
            params: {
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
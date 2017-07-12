/**
 * Created by max on 2017/6/13.
 */
import {Component, OnInit} from '@angular/core';
import {Router,ActivatedRoute,Params} from "@angular/router";
import {Validators} from '@angular/forms';
import {AppHttpService, UC} from "../../../plugins/globalservice";
declare var swal;
declare var AMap;
@Component({
    selector: 'equipmentinit-edit',
    templateUrl: '../views/equipmentInitEdit.html',
    styleUrls: ["../styles/equipmentInitAdd.scss"],
})
export class EquipmentInitEditComponent implements OnInit {
    public device_id;
    public soft_ver;
    public fields: Array<any>;
    public showMap: boolean = false;
    public lnglat: any = {
        lng:"",
        lat:"",
    };

    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public router: Router,
                public activatedRoute:ActivatedRoute
    ) {
    }

    ngOnInit() {
        let data = this.activatedRoute.params
            .switchMap((params: Params) => this.appHttpService.postData(this.uc.api.qc + "/get_device", {params: {device_id: params['id']}}));
        data.subscribe(res => {
            if (res.status) {
                let _data = res.data;
                this.device_id = _data.device_id;
                this.soft_ver = _data.soft_ver;
                let tmpGps=this.uc.BD09ToGCJ02(_data.device_lat,_data.device_lng);
                this.lnglat = {
                    lng: tmpGps.lon,
                    lat: tmpGps.lat
                };

                this.fields = [
                    {
                        label: "设备编号",
                        key: "device_no",
                        controlType: "input",
                        inputType: "text",
                        require: true,
                        disabled: true,
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
                        value: _data.status || "1",
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
                    }, {
                        label: "设备类型",
                        key: "device_type",
                        controlType: "radio",
                        value: _data.device_type,
                        require: true,
                        options: _data.device_type==1?[{value: "1", content: "充电桩"}]:[{value: "2", content: "充值机"}],
                        validator: [
                            Validators.required
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"}
                        ]
                    }, {
                        label: "通讯方式",
                        key: "communicate_type",
                        controlType: "radio",
                        value: _data.communicate_type,
                        require: true,
                        options: _data.communicate_type==null? [{value: "1", content: "wifi"},{value: "2", content: "gprs"}]:_data.communicate_type==1?[{value: "1", content: "wifi"}]:[{value: "2", content: "gprs"}],
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
                        value: _data.soft_ver,
                        placeholder: "请输入固定版本",
                        validator: [
                            Validators.required,
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"},
                        ]
                    }, {
                        label: "电表编号",
                        key: "meters_no",
                        controlType: "input",
                        inputType: "text",
                        require: true,
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
                        require: true,
                        url: this.uc.api.qc + '/get_geo_list/',
                        config: {
                            province: {
                                name: 'province_code',
                                value: _data.province_code || "0",
                                content: _data.province_code_name || "",
                                placeholder: "--请选择省--",
                            },
                            city: {
                                name: 'city_code',
                                value: _data.city_code || "0",
                                content: _data.city_code_name || "",
                                placeholder: "--请选择市--",
                            },
                            area: {
                                name: 'district_code',
                                value: _data.district_code || "0",
                                content: _data.district_code_name || "",
                                placeholder: "--请选择区--",
                            }
                        },
                        validator: [
                            Validators.required,
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"},
                        ]
                    }, {
                        label: "设备详细地址",
                        key: "device_address",
                        controlType: "input",
                        inputType: "text",
                        require: true,
                        button: {
                            class: "btn-success",
                            content: "经纬度拾取",
                            click: (data) => {
                                let business_address = this.fields[7].config;
                                let device_address = this.fields[8];
                                if (business_address.province.content == "" && business_address.city.content == "" && business_address.area.content == "") {
                                    swal({
                                        title: "提示!",
                                        text: "请先选择设备所在地区",
                                        type: "error",
                                        timer:"2000"
                                    });
                                    return
                                }
                                if (device_address.value == "") {
                                    swal({
                                        title: "提示!",
                                        text: "请先输入设备详细地址",
                                        type: "error",
                                        timer:"2000"
                                    });
                                    return
                                }
                                this.showMap = true;
                                let address = business_address.province.content + business_address.city.content + business_address.area.content + device_address.value;
                                AMap.service('AMap.Geocoder', () => {
                                    var geocoder = new AMap.Geocoder();
                                    geocoder.getLocation(address, (status, result) => {
                                        if (status === 'complete' && result.info === 'OK') {
                                            this.lnglat = {
                                                lng: result.geocodes[0].location.lng,
                                                lat: result.geocodes[0].location.lat
                                            };
                                            var map = new AMap.Map('coordinate', {
                                                resizeEnable: true,
                                                zoom: 18,
                                                center: [
                                                    result.geocodes[0].location.lng,
                                                    result.geocodes[0].location.lat
                                                ]
                                            });
                                            var marker = new AMap.Marker({
                                                map: map,
                                                bubble: true
                                            });
                                            var clickListener = AMap.event.addListener(map, 'click', (e) => {
                                                marker.setPosition([
                                                    e.lnglat.lng,
                                                    e.lnglat.lat
                                                ]);
                                                this.lnglat = {
                                                    lng: e.lnglat.lng,
                                                    lat: e.lnglat.lat
                                                };
                                            });
                                        } else {
                                            this.showMap = false;
                                            swal({
                                                title: "经纬度拾取失败!",
                                                text: "请重置地区和设备详细地址",
                                                type: "error",
                                                timer:"2000"
                                            });
                                        }
                                    });
                                });

                            }
                        },
                        value: _data.device_address || "",
                        placeholder: "请输入设备详细地址",
                        validator: [
                            Validators.required,
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"},
                        ]
                    }, {
                        label: "设备所在小区名称",
                        key: "areas_name",
                        controlType: "input",
                        inputType: "text",
                        require: true,
                        value: _data.areas_name || "",
                        placeholder: "请输入设备所在小区名称",
                        validator: [
                            Validators.required,
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"},
                        ]
                    }, {
                        label: "纬度",
                        key: "device_lat",
                        controlType: "input",
                        inputType: "text",
                        require: true,
                        disabled: true,
                        value: this.lnglat.lat || "",
                        placeholder: "请使用坐标拾取工具获取纬度",
                        validator: [
                            Validators.required,
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"},
                        ]
                    }, {
                        label: "经度",
                        key: "device_lng",
                        controlType: "input",
                        inputType: "text",
                        require: true,
                        disabled: true,
                        value: this.lnglat.lng || "",
                        placeholder: "请使用坐标拾取工具获取经度",
                        validator: [
                            Validators.required,
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"},
                        ]
                    }
                ];
                if (_data.device_type == 1) {
                    this.fields.push({
                        label: "商品选择",
                        key: "commodity_ids",
                        controlType: "checkbox",
                        require: true,
                        value: "",
                        options: "",
                        validator: [
                            Validators.required
                        ],
                        errormsg: [
                            {type: "required", content: "必填项目"}
                        ]
                    })
                    this.appHttpService.postData(this.uc.api.qc + "/get_commodity_list", {
                        params: {
                            page_now: 1,
                            limit: 500,
                            sort_by: 'create_time',
                            sort_type: '',
                            search_by: {}
                        }
                    }).subscribe(
                        res => {
                            if (res.status) {
                                let data = res.data.list
                                let commoditys = []
                                for (let item of data) {
                                    commoditys.push({
                                        checked: true,
                                        value: item.commodity_id,
                                        content: item.commodity_name
                                    })
                                }
                                this.fields[12].options = commoditys;
                            } else {
                                swal({
                                    title: "获取商品信息失败!",
                                    text: res.error_msg,
                                    type: "error",
                                    timer:"2000"
                                });
                            }
                        }
                    )
                }
            } else {
                swal({
                    title: "获取设备信息失败!",
                    text: res.error_msg,
                    type: "error",
                    timer:"2000"
                });
            }
        })
    }


    saveData({value}={value}) {
        let gps = this.uc.GCJ02ToBD09(this.lnglat.lat, this.lnglat.lng);
        let commodity_ids = [];
        if(value.commodity_ids){
            commodity_ids = JSON.parse(value.commodity_ids);
        }
        let params = {
            params: {
                device_info: {
                    device_name: (value.device_name).trim(),
                    status: value.status,
                    device_type: value.device_type,
                    province_code: value.business_address.province_code,
                    city_code: value.business_address.city_code,
                    district_code: value.business_address.district_code,
                    device_address: value.device_address,
                    areas_name: value.areas_name,
                    device_lat: gps.lat,
                    device_lng: gps.lon,
                    communicate_type: value.communicate_type,
                    soft_ver :   value.soft_ver,
                    meters_no:   value.meters_no
                },
                device_id: this.device_id,
                commodity_ids: commodity_ids
            }
        };
        this.appHttpService.postData(this.uc.api.qc + "/update_device", params).subscribe(
            res => {
                if (res.status) {
                    this.router.navigateByUrl('pages/equipment/equipmentList');
                } else {
                    swal("设备初始化失败", res.error_msg, "error")
                }
            }
        )
    }

    confirmMap() {
        this.fields[10].value = this.lnglat.lat
        this.fields[11].value = this.lnglat.lng
        this.showMap = false;
    }
}
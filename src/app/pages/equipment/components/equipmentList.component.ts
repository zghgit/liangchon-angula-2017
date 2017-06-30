/**
 * Created by max on 2017/5/5.
 */
import {Component, OnInit} from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";
declare var swal;
declare var window;

@Component({
    selector: "equipmentList",
    templateUrl: "../views/equipmentList.html",
    styleUrls: ["../styles/equipmentList.scss"]
})
export class EquipmentListComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};
    public searchBy: any = {
        bind_status: 2,
    };
    public moreCondition: boolean = false;
    public zoomInfo: any = {};

    constructor(public router: Router,
                public appHttpService: AppHttpService,
                public uc: UC) {
    }

    ngOnInit() {
        if (this.uc.powerfun(this.uc.constant.device_binding)) {
            this.plugins.button = {
                class: 'btn-primary',
                content: '设备初始化',
                click: () => {
                    this.router.navigateByUrl('pages/equipment/equipmentInitAdd');
                }
            };
        }
        ;
        this.plugins.grid = {
            th: [
                {content: '设备编号ID', hidden: true},
                {content: '设备编号'},
                {content: '设备名称'},
                {content: '设备类型'},
                {content: '设备状态'},
                {content: '在线状态'},
                {content: '固定版本'},
                {content: '设备小区名称'},
                {content: '启用状态'},
                {content: '操作'}
            ],
            tbody: [],
            pagination: {
                maxSize: 5,
                itemsPerPage: 20,
                currentPage: 1
            }
        };
        this.plugins.search = [
            {
                title: '设备编号',
                key: "device_no",
                controlType: "input",
                value: "",
                placeholder: "请输入设备编号"
            }, {
                title: '设备状态',
                key: "bind_status",
                controlType: "select",
                value: "0",
                placeholder: "请选择设备状态",
                options: [{
                    name: '已绑定',
                    geo_id: "2"
                }, {
                    name: '未分配',
                    geo_id: "3"
                }]
            }, {
                title: '设备名称',
                key: "device_name",
                controlType: "input",
                value: "",
                placeholder: "请输入设备名称"
            }, {
                title: '设备类型',
                key: "device_type",
                controlType: "select",
                value: "0",
                placeholder: "请选择设备类型",
                options: [{
                    name: '充电桩',
                    geo_id: "1"
                }, {
                    name: '充值机',
                    geo_id: "2"
                }]
            }, {
                title: "设备地址",
                key: "device_address",
                controlType: "address",
                hasChildGroup: true,
                hidden: true,
                url: this.uc.api.qc + '/get_geo_list/hash/',
                config: {
                    province: {
                        name: 'province_code',
                        value: "0",
                        placeholder: "--请选择省--",
                    },
                    city: {
                        name: 'city_code',
                        value: '0',
                        placeholder: "--请选择市--",
                    },
                    area: {
                        name: 'district_code',
                        value: '0',
                        placeholder: "--请选择区--",
                    }
                }
            }, {
                title: '设备小区',
                key: "areas_name",
                controlType: "input",
                value: "",
                hidden:true,
                placeholder: "请输入设备小区名称"
            }
        ]
        this.plugins.buttons = [
            {
                type: "notform",
                class: "btn-success",
                content: "展开条件",
                click: () => {
                    this.moreCondition = !this.moreCondition;
                    if (this.moreCondition) {
                        this.plugins.buttons[0].content = "收起条件";
                        for (let i = 4; i < this.plugins.search.length; i++) {
                            this.plugins.search[i].hidden = false;
                        }
                    } else {
                        this.plugins.buttons[0].content = "展开条件";
                        for (let i = 4; i < this.plugins.search.length; i++) {
                            this.plugins.search[i].hidden = true;
                        }
                    }

                }
            }, {
                type: "form",
                class: "btn-primary",
                content: "搜索",
                click: ({value}={value}) => {
                    let {
                        device_no,
                        bind_status,
                        device_name,
                        device_type,
                        device_address,
                        areas_name,
                    } = value;
                    this.searchBy = {
                        device_no: device_no ? device_no.trim() : "",
                        bind_status: bind_status||2,
                        device_name: device_name ? device_name.trim() : "",
                        device_type:device_type,
                        areas_name: areas_name ? areas_name.trim() : "",
                        province_code: device_address.province_code,
                        city_code: device_address.city_code,
                        district_code: device_address.district_code
                    }
                    this.now = 1;
                    this.getGridData({
                        page_now: this.now,
                        limit: 20,
                        sort_by: 'create_time',
                        sort_type: 'desc',
                        search_by: this.searchBy,

                    })
                }
            }, {
                type: "form",
                class: "btn-info",
                content: "导出",
                click: ({value}={value}) => {
                    this.downloadTemplate(this.searchBy);
                }
            }, {
                type: "reset",
                class: "btn-danger",
                content: "重置",
                click: () => {
                    this.searchBy = {
                        bind_status: 2,
                    };
                    this.now = 1;
                    this.getGridData({
                        page_now: this.now,
                        limit: 20,
                        sort_by: 'create_time',
                        sort_type: 'desc',
                        search_by: this.searchBy,

                    })
                }
            },
        ]
        this.getGridData({
            page_now: this.now,
            limit: 20,
            sort_by: 'create_time',
            sort_type: 'desc',
            search_by: this.searchBy,

        })
    }

    public getGridData = function (params) {
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_device_list/hash", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.list;
                this.plugins.grid.tbody = [];
                this.plugins.grid.pagination.totalItems = data.total_num;
                for (let key of list) {
                    let tds: Array<any>;
                    tds = [
                        {content: key.device_id, hidden: true},
                        {content: key.device_no},
                        {content: key.device_name},
                        {content: key.device_type_name},
                        {content: key.bind_status_name},
                        {content: key.net_status_name},
                        {content: key.soft_ver},
                        {content: key.areas_name},
                        {content: key.status == '1' ? "启用" : "禁用"},
                    ];
                    let operations = [];
                    if (this.uc.powerfun(this.uc.constant.get_device) && key.operation.indexOf(this.uc.powercontroll.read) >= 0) {
                        operations.push({
                            content: "查看",
                            class: "btn-info",
                            click: (data) => {
                                this.router.navigate(['pages/equipment/equipmentDetail', key.device_id]);
                            }
                        })
                    }
                    if (this.uc.powerfun(this.uc.constant.disable_device) && key.status == '1' && key.operation.indexOf(this.uc.powercontroll.update) >= 0) {
                        operations.push({
                            content: "禁用",
                            class: "btn-black",
                            click: (data) => {
                                let id = data[0].content;
                                swal({
                                    title: '确定禁用?',
                                    text: '',
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    showLoaderOnConfirm: true,
                                    confirmButtonColor: "#DD6B55",
                                }).then((isConfirm) => {
                                    if (isConfirm === true) {
                                        this.appHttpService.postData(this.uc.api.qc + "/disable_device/hash/", {
                                                params: {
                                                    device_id: id,
                                                }
                                            }
                                        ).subscribe(res => {
                                            if (res.status) {
                                                swal({
                                                    title: "禁用成功!",
                                                    text: res.error_msg,
                                                    type: "success",
                                                    timer: "1500"
                                                });
                                                this.getGridData(params);
                                            } else {
                                                swal("禁用失败!", res.error_msg, "error");
                                            }
                                        })
                                    }
                                }, () => {
                                });

                            }
                        })
                    }
                    ;
                    if (this.uc.powerfun(this.uc.constant.start_device) && key.status == '2' && key.operation.indexOf(this.uc.powercontroll.update) >= 0) {
                        operations.push({
                            content: "启用",
                            class: "btn-success",
                            click: (data) => {
                                let id = data[0].content;
                                swal({
                                    title: '确定启用?',
                                    text: '',
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    showLoaderOnConfirm: true,
                                    confirmButtonColor: "#DD6B55",
                                }).then((isConfirm) => {
                                    if (isConfirm === true) {
                                        this.appHttpService.postData(this.uc.api.qc + "/start_device/hash/", {
                                                params: {
                                                    device_id: id,
                                                }
                                            }
                                        ).subscribe(res => {
                                            if (res.status) {
                                                swal({
                                                    title: "启用成功!",
                                                    text: res.error_msg,
                                                    type: "success",
                                                    timer: "1500"
                                                });
                                                this.getGridData(params);
                                            } else {
                                                swal("启用失败!", res.error_msg, "error");
                                            }
                                        })
                                    }
                                }, () => {
                                });

                            }
                        })
                    }
                    ;
                    if (key.device_type == 1 && this.uc.powerfun(this.uc.constant.get_device_statistics) && this.uc.powerfun(this.uc.constant.get_order_list)) {
                        operations.push({
                            content: "桩状态",
                            class: "btn-warning",
                            click: (data) => {
                                let id = data[0].content;
                                this.router.navigate(['pages/charge/chargeStatus', id]);
                            }
                        })
                    }
                    ;
                    if (this.uc.powerfun(this.uc.constant.generate_qr_code)) {
                        operations.push({
                            content: "二维码",
                            class: "btn-purple",
                            click: (data) => {
                                let device_no = data[1].content;
                                this.appHttpService.postData(this.uc.api.qc + "/generate_qr_code/hash/", {
                                        params: {
                                            device_no: device_no,
                                        }
                                    }
                                ).subscribe(res => {
                                    if (res.status) {
                                        this.zoomInfo['src'] = res.data.src;
                                        this.zoomInfo['show'] = true;
                                        this.zoomInfo['device_no'] = device_no;

                                    } else {
                                        swal({
                                            title: "获取设备二维码失败!",
                                            text: res.error_msg,
                                            type: "error",
                                            timer: "1500"
                                        });

                                    }
                                })
                            }
                        })
                    }
                    if (this.uc.powerfun(this.uc.constant.update_device) && key.operation.indexOf(this.uc.powercontroll.update) >= 0) {
                        operations.push({
                            content: "编辑",
                            class: "btn-primary",
                            click: (data) => {
                                this.router.navigate(['pages/equipment/equipmentInitEdit', key.device_id]);
                            }
                        })
                    }
                    if (key.device_type == 1&&this.uc.powerfun(this.uc.constant.set_device_params) && key.operation.indexOf(this.uc.powercontroll.update) >= 0 && key.net_status == 1) {
                        operations.push({
                            content: "参数配置",
                            class: "btn-danger",
                            click: (data) => {
                                this.router.navigate(['pages/equipment/equipmentConfig', key.device_no]);
                            }
                        })
                    }
                    if (this.uc.powerfun(this.uc.constant.device_unbundling)) {
                        operations.push({
                            content: "解绑",
                            class: "btn-danger",
                            click: (data) => {
                                let id = data[0].content;
                                swal({
                                    title: '确定解绑?',
                                    text: '',
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    showLoaderOnConfirm: true,
                                    confirmButtonColor: "#DD6B55",
                                }).then((isConfirm) => {
                                    if (isConfirm === true) {
                                        this.appHttpService.postData(this.uc.api.qc + "/device_unbundling/hash/", {
                                                params: {
                                                    device_id: id,
                                                }
                                            }
                                        ).subscribe(res => {
                                            if (res.status) {
                                                swal({
                                                    title: "解绑成功,请到未解绑一览操作此设备!",
                                                    text: "",
                                                    type: "success",
                                                    timer: "1500"
                                                });
                                                this.getGridData(params);
                                            } else {
                                                swal("解绑失败!", res.error_msg, "error");
                                            }
                                        })
                                    }
                                }, () => {
                                });

                            }
                        })
                    }
                    tds.push({type: "operation", operation: operations})
                    this.plugins.grid.tbody.push(tds)
                }
            }
            else {
                swal({
                    title: "获取设备信息失败!",
                    text: res.error_msg,
                    type: "error",
                    timer: "1500"
                });
            }
        })
    }

    public pageBeChanged(event) {
        this.getGridData({
            page_now: event.page,
            limit: event.itemsPerPage,
            sort_by: 'create_time',
            sort_type: 'desc',
            search_by: this.searchBy,
        })
    }

    //关闭弹出窗
    public closeZoom() {
        this.zoomInfo['show'] = false;
    }

    //下载二维码
    public downloadimg() {
        this.appHttpService.postData(this.uc.api.qc + "/download_qr_code_zip/hash/", {
                params: {
                    device_no: this.zoomInfo['device_no'],
                }
            }
        ).subscribe(res => {
            if (res.status) {
                window.location = res.data.src;
            } else {
                swal("下载设备二维码失败!", res.error_msg, "error");
            }
        })
    }

    //下载导出
    downloadTemplate(params) {
        this.appHttpService.getBinary(this.uc.api.qc + '/download_device_info/hash/', {params: params}).subscribe(res => {
            let disposition = res.headers._headers.get("content-disposition");

            if (!disposition) {
                swal("下载失败", res.error_msg, "error")
            } else {
                let blob = new Blob([res._body], {type: "application/vnd.ms-excel"});
                let objectUrl = URL.createObjectURL(blob);
                let a = document.createElement('a');
                let filename = disposition[0].split(";")[1].trim().split("=")[1]
                try {
                    filename = JSON.parse(filename)
                } catch (e) {
                    console.log(e);
                }
                document.body.appendChild(a);
                a.setAttribute('style', 'display:none');
                a.setAttribute('href', objectUrl);
                a.setAttribute('download', filename);
                a.click();
                URL.revokeObjectURL(objectUrl);
            }

        })
    }

}
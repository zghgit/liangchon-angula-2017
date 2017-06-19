/**
 * Created by max on 2017/5/5.
 */
import {Component, OnInit} from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";
declare var swal;

@Component({
    selector: "equipmentList",
    templateUrl: "../views/equipmentList.html",
    styleUrls: ["../styles/equipmentList.scss"]
})
export class EquipmentListComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};

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
        }
        this.getGridData({
            page_now: this.now,
            limit: 20,
            sort_by: 'create_time',
            sort_type: 'desc',
            search_by: {
                user_name: '',
                role: ''
            },

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
                                    confirmButtonText: '确定!',
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
                                                swal("禁用成功!", "", "success");
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
                                    confirmButtonText: '确定!',
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
                                                swal("启用成功!", "", "success");
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
                    if (this.uc.powerfun(this.uc.constant.set_device_params) && key.operation.indexOf(this.uc.powercontroll.update) >= 0 && key.net_status == 1) {
                        operations.push({
                            content: "参数配置",
                            class: "btn-danger",
                            click: (data) => {
                                if (key.device_type == 1) {
                                    this.router.navigate(['pages/equipment/evseConfig', key.device_id]);
                                }
                                if (key.device_type == 2) {
                                    this.router.navigate(['pages/equipment/evseCardConfig', key.device_id]);

                                }
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
                                    confirmButtonText: '确定!',
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
                                                swal("解绑成功,请到未解绑一览操作此设备!", "", "success");
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
        })
    }

    public pageBeChanged(event) {
        this.getGridData({
            page_now: event.page,
            limit: event.itemsPerPage,
            sort_by: 'create_time',
            sort_type: 'desc',
            search_by: {
                bind_status: 2,
            },
        })
    }

}
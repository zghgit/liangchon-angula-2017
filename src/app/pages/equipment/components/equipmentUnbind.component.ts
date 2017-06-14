/**
 * Created by max on 2017/5/9.
 */
import {Component, OnInit} from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";
declare var swal;

@Component({
    selector: "equipment-unbind",
    templateUrl: "../views/equipmentUnbind.html"
})
export class EquipmentUnbindComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};

    constructor(public router: Router,
                public appHttpService: AppHttpService,
                public uc: UC) {
    }

    ngOnInit() {
        this.plugins.grid = {
            th: [
                {content: '设备编号ID', hidden: true},
                {content: '设备编号'},
                {content: '设备名称'},
                {content: '设备类型'},
                {content: '通讯方式'},
                {content: '固定版本'},
                {content: '电表编号'},
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
                bind_status:'1'
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
                        {content: key.device_type =='1'? "充电桩":"充值机"},
                        {content: key.communicate_type =='1'? "wifi":"gprs"},
                        {content: key.soft_ver},
                        {content: key.meters_no},
                    ];
                    let operations = [];
                    operations.push({
                        content: "查看",
                        class: "btn-info",
                        click: () => {
                            this.router.navigate(['pages/equipment/equipmentDetail', key.device_id]);
                        }
                    })
                    if (this.uc.powerfun(this.uc.constant.delete_device)) {
                        operations.push({
                            content: "删除",
                            class: "btn-danger",
                            click: (data) => {
                                let id = data[0].content;
                                swal({
                                    title: '确定删除?',
                                    text: '',
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: '确定!',
                                    cancelButtonText: '取消',
                                    showLoaderOnConfirm: true,
                                    confirmButtonColor: "#DD6B55",
                                }).then((isConfirm) => {
                                    if (isConfirm === true) {
                                        this.appHttpService.postData(this.uc.api.qc + "/delete_device/hash/", {
                                                params: {
                                                    device_id: id
                                                }
                                            }
                                        ).subscribe(res=>{
                                            if (res.status){
                                                swal("删除成功!", "", "success");
                                                this.getGridData(params);
                                            }else {
                                                swal("删除失败!", res.error_msg, "error");
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
                bind_status: 1,
            },
        })
    }

}
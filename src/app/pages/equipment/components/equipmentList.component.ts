/**
 * Created by max on 2017/5/5.
 */
import {Component, OnInit} from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";


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
                    operations.push({
                        content: "查看",
                        class: "btn-info",
                        click: () => {
                            this.router.navigate(['pages/equipment/equipmentDetail', key.device_id]);
                        }
                    })
                    operations.push({
                        content: "禁用",
                        class: "btn-warning",
                        click: () => {
                            console.log(11111)

                        }
                    })
                    operations.push({
                        content: "启用",
                        class: "btn-success",
                        click: () => {
                            console.log(11111)
                        }
                    })
                    operations.push({
                        content: "二维码",
                        class: "btn-secondary",
                        click: () => {
                            console.log(11111)
                        }
                    })
                    operations.push({
                        content: "编辑",
                        class: "btn-primary",
                        click: () => {
                            console.log(11111)
                        }
                    })
                    operations.push({
                        content: "解绑",
                        class: "btn-danger",
                        click: () => {
                            console.log(11111)
                        }
                    })
                    tds.push({type: "operation", operation: operations})
                    this.plugins.grid.tbody.push(tds)
                }
            }
        })
    }

    public pageBeChanged(event) {
        console.log(event);
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
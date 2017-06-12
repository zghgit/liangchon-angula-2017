/**
 * Created by max on 2017/6/5.
 */

import { Component, OnInit } from '@angular/core';
import {AppHttpService, UC,DataService} from "../../../plugins/globalservice";
import {Router} from "@angular/router";

declare var swal;
@Component({
    selector: 'Operation-management-list',
    templateUrl: '../views/operationManagementList.html'
})
export class OperationManagementListComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};

    constructor(public router: Router,
                public appHttpService: AppHttpService,
                public dataService:DataService,
                public uc: UC) {
    }

    ngOnInit() {
        let user_type = this.dataService.getCookies("user_type");//1是主账户  2是子账户
        let admin_flg = this.dataService.getCookies("admin_flg");//1是微云冲  2是另外三个
        if(admin_flg != 1 && user_type == 1){
            this.plugins.button = {
                class:'btn-primary',
                content:'运维人员配置',
                click:()=>{
                    this.router.navigateByUrl('pages/operationManagement/maintenanceMan');
                }
            };
        }
        this.plugins.grid = {
            th: [
                {content: '设备编号ID', hidden: true},
                {content: '设备编号'},
                {content: '设备地址'},
                {content: '故障描述'},
                {content: '故障时间'},
                {content: '设备状态'},
                {content: '恢复时间'}
            ],
            tbody: [],
            pagination: {
                maxSize: 5,
                itemsPerPage: 20,
                currentPage: 1,
                totalItems: 1
            }
        }
        this.getGridData({
            page_now: this.now,
            limit: 20,
            sort_by: 'create_time',
            sort_type: 'desc',
            search_by: {},

        })
    }

    public getGridData = function (params) {
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_device_error_log_list/hash", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.list;
                this.plugins.grid.pagination.totalItems = data.total_num;
                this.plugins.grid.tbody = [];
                let count = data.count;
                for (let key of list) {
                    let tds: Array<any>;
                    tds = [
                        {content: key.device_error_id, hidden: true},
                        {content: key.device_no},
                        {content: key.device_address},
                        {content: key.error_description},
                        {content: key.device_status == 3 ? key.create_time : '--'},
                        {content: key.device_status == 3 ? "故障中" : "正常"},
                        {content: key.device_status == 1 ? key.create_time : '--'}
                    ];
                    this.plugins.grid.tbody.push(tds)
                }
            }
        })
    };

    public pageBeChanged(event) {
        this.getGridData({
            page_now: event.page,
            limit: event.itemsPerPage,
            sort_by: 'create_time',
            sort_type: 'desc',
            search_by: {},
        })
    }


}
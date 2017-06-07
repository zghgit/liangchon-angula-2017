/**
 * Created by max on 2017/5/9.
 */
import {Component, OnInit} from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";
declare var swal;

@Component({
    selector: "equipment-onoff",
    templateUrl: "../views/equipmentOnOffRecord.html"
})
export class EquipmentOnOffComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};

    constructor(public router: Router,
                public appHttpService: AppHttpService,
                public uc: UC) {
    }

    ngOnInit() {
        this.plugins.grid = {
            th: [
                {content: '操作时间'},
                {content: '设备编号'},
                {content: '设备名称'},
                {content: '设备状态'},
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
                bind_status:'2'
            },

        })
    }

    public getGridData = function (params) {
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_device_net_log_list/hash", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.list;
                this.plugins.grid.tbody = [];
                this.plugins.grid.pagination.totalItems = data.total_num;
                for (let key of list) {
                    let tds: Array<any>;
                    tds = [
                        {content: key.update_time ? key.update_time: key.create_time},
                        {content: key.device_no},
                        {content: key.device_name},
                        {content: key.net_status =='1'? "在线":"离线（"+key.online_duration+")"},
                    ];
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
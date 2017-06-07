/**
 * Created by max on 2017/6/5.
 */

import { Component, OnInit } from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";

declare var swal;
@Component({
    selector: 'financial-statistics-list',
    templateUrl: '../views/financialStatistics.html'
})
export class FinancialStatisticsComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};

    constructor(public router: Router,
                public appHttpService: AppHttpService,
                public uc: UC) {
    }

    ngOnInit() {
        this.plugins.grid = {
            th: [
                {content: 'ID', hidden: true},
                {content: '时间'},
                {content: '机构名称'},
                {content: '所在地'},
                {content: '营业收入(元)'},
                {content: '已结算(元)'},
                {content: '未结算(元)'}
            ],
            tbody: [],
            pagination: {
                maxSize: 5,
                itemsPerPage: 20,
                currentPage: 1,
                totalItems: 1
            }
        }
        this.plugins.grid2 = {
            caption:"营业统计信息",
            th: [
                {content: '营业收入(元)'},
                {content: '已结算(元)'},
                {content: '未结算(元)'}
            ],
            tbody: []
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
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_statistics_charge_station_list/hash", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.list;
                this.plugins.grid.pagination.totalItems = data.total_num;
                this.plugins.grid.tbody = [];
                this.plugins.grid2.tbody = [];
                let count = data.count;
                for (let key of list) {
                    let tds: Array<any>;
                    tds = [
                        {content: key.order_id, hidden: true},
                        {content: key.year+'-'+key.month+'-'+key.day},
                        {content: key.user_name},
                        {content: key.device_address},
                        {content: key.charge_order_sum},
                        {content: key.cash_status_done_sum},
                        {content: key.cash_status_sum}
                    ];
                    this.plugins.grid.tbody.push(tds)
                }
                if (count){
                    let td2 = [
                        {content: count.charge_order_count||0},
                        {content: count.cash_status_done_count||0},
                        {content: count.cash_status_none_count||0},
                    ]
                    this.plugins.grid2.tbody.push(td2)
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
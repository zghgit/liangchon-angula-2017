/**
 * Created by max on 2017/6/14.
 */
import { Component, OnInit } from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router,ActivatedRoute} from "@angular/router";
declare var swal;
@Component({
    selector: 'app-charge-record',
    templateUrl: '../views/appChargeRecord.html'
})
export class AppChargeRecordComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};
    public app_user_name:string = "";

    constructor(public router: Router,
                public appHttpService: AppHttpService,
                public activatedRoute:ActivatedRoute,
                public uc: UC) {
    }

    ngOnInit() {
        let params = this.activatedRoute.params;
        params.subscribe(res => {
            this.app_user_name = res.id;
        })

        this.plugins.grid = {
            th: [
                {content: '用户ID', hidden: true},
                {content: '用户名'},
                {content: '金额(元)'},
                {content: '支付类型'},
                {content: '收支类型'},
                {content: '时间'}
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
            search_by: {
                app_user_name:this.app_user_name,
            },

        })
    }

    public getGridData = function (params) {
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_app_user_deposit_detail/hash", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.list;
                this.plugins.grid.pagination.totalItems = data.total_num;
                this.plugins.grid.tbody = [];
                for (let key of list) {
                    let tds: Array<any>;
                    tds = [
                        {content: key.user_id, hidden: true},
                        {content: key.app_user_name},
                        {content: key.pay_sum},
                        {content: key.pay_type_name},
                        {content: key.spending_type_name},
                        {content: key.create_time}
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
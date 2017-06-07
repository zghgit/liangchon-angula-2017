/**
 * Created by max on 2017/6/2.
 */
/**
 * Created by max on 2017/5/5.
 */
import {Component, OnInit} from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";

declare var swal;

@Component({
    selector: 'refund-record-list',
    templateUrl: '../views/refundRecordList.html',
    styleUrls: ['../styles/refundRecordList.scss']
})
export class refundRecordListComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};
    constructor(public router: Router,
                public appHttpService: AppHttpService,
                public uc: UC) {
    }

    ngOnInit() {
        this.plugins.grid = {
            th: [
                {content: '用户ID', hidden: true},
                {content: '订单编号'},
                {content: '退款编号'},
                {content: '退回账户'},
                {content: '退款金额'},
                {content: '退款方式'},
                {content: '退款时间'},
                {content: '退款状态'},
                {content: '退款处理人'},
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
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_refund_list/hash", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.list;
                this.plugins.grid.pagination.totalItems = data.total_num;
                this.plugins.grid.tbody = [];
                for (let key of list) {
                    let tds: Array<any>;
                    tds = [
                        {content: key.order_id, hidden: true},
                        {content: key.order_no},
                        {content: key.refund_no},
                        {content: key.payee_account},
                        {content: key.refund_sum},
                        {content: key.refund_type},
                        {content: key.create_time},
                        {content: key.refund_status},
                        {content: key.refund_operation},
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
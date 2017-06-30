/**
 * Created by max on 2017/6/28.
 */

import {Component, OnInit} from '@angular/core';
import {AppHttpService, UC} from "../../../plugins/globalservice";
import {Router} from "@angular/router";
import * as moment from 'moment';

declare var swal;
@Component({
    selector: 'feedback-list',
    templateUrl: '../views/feedbackList.html',
    styleUrls: ["../styles/feedbackList.scss"]
})
export class FeedbackListComponent implements OnInit {
    public now: number = 1;
    public plugins: any = {};
    public searchBy: any = {};


    constructor(public router: Router,
                public appHttpService: AppHttpService,
                public uc: UC) {
    }

    ngOnInit() {
        this.plugins.button = {
            class: 'btn-primary',
            content: '新增申诉',
            click: () => {
                this.router.navigateByUrl('pages/complained/complainedAdd');
            }
        };

        this.plugins.grid = {
            th: [
                {content: '反馈ID', hidden: true},
                {content: '反馈用户'},
                {content: '反馈内容'},
                {content: '状态'},
                {content: '时间'},
                {content: '操作'}
            ],
            tbody: [],
            pagination: {
                maxSize: 5,
                itemsPerPage: 20,
                currentPage: 1,
                totalItems: 1
            }
        };
        this.plugins.search = [
            {
                title: "开始时间",
                key: "start_time",
                controlType: "time",
                value: "",
                config: {
                    showTimePicker: false,
                    format: 0,
                },
                placeholder: "请点击选择日期",
            }, {
                title: "结束时间",
                key: "end_time",
                controlType: "time",
                value: "",
                config: {
                    showTimePicker: false,
                    format: 0,
                },
                placeholder: "请点击选择日期",
            }, {
                title: '反馈用户',
                key: "phone_no",
                controlType: "input",
                value: "",
                placeholder: "请输入反馈用户"
            }
        ]
        this.plugins.buttons = [
            {
                type: "form",
                class: "btn-primary",
                content: "搜索",
                click: ({value}={value}) => {
                    let {
                        start_time,
                        end_time,
                        phone_no,
                    } = value;
                    if (start_time && !end_time || !start_time && end_time) {
                        // swal("搜索失败","开始时间和结束时间要一起填写!","error");
                        swal({
                            title: "提示!",
                            text: "开始时间和结束时间要一起填写",
                            type: "error",
                            timer: "1500"
                        });
                        return
                    }
                    if (start_time > end_time) {
                        swal({
                            title: "提示!",
                            text: "开始时间不能大开结束时间",
                            type: "error",
                            timer: "1500"
                        });
                        return
                    }
                    this.now = 1;
                    this.searchBy = {
                        start_time: start_time ? moment(start_time).format('YYYY-MM-DD 00:00:00') : '',
                        end_time: end_time ? moment(end_time).format('YYYY-MM-DD 23:59:59') : '',
                        phone_no: phone_no ? phone_no.trim() : "",

                    }
                    this.getGridData({
                        page_now: this.now,
                        limit: 20,
                        sort_by: 'create_time',
                        sort_type: 'desc',
                        search_by: this.searchBy,

                    })
                }
            }, {
                type: "reset",
                class: "btn-danger",
                content: "重置",
                click: () => {
                    this.searchBy = {};
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
        ];

        this.getGridData({
            page_now: this.now,
            limit: 20,
            sort_by: 'create_time',
            sort_type: 'desc',
            search_by: {},

        })
    }

    public getGridData = function (params) {
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_feedback_list/hash", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.list;
                this.plugins.grid.pagination.totalItems = data.total_num;
                this.plugins.grid.tbody = [];
                for (let key of list) {
                    let tds: Array<any>;
                    tds = [
                        {content: key.feedback_id, hidden: true},
                        {content: key.user_name},
                        {content: key.feedback_content},
                        {content: key.deal_flg_name},
                        {content: key.create_time},
                    ];
                    let operations = [];
                    if (this.uc.powerfun(this.uc.constant.get_complained)) {
                        operations.push({
                            content: "查看反馈",
                            class: "btn-info",
                            click: (data) => {
                                let id = data[0].content;
                                this.router.navigate(['pages/complained/feedbackDetail', id]);
                            }
                        })
                    }
                    tds.push({type: "operation", operation: operations})
                    this.plugins.grid.tbody.push(tds)
                }
            } else {
                swal({
                    title: "获取申诉信息失败!",
                    text: res.error_msg,
                    type: "error",
                    timer: "1500"
                });
            }
        })
    };

    public pageBeChanged(event) {
        this.getGridData({
            page_now: event.page,
            limit: event.itemsPerPage,
            sort_by: 'create_time',
            sort_type: 'desc',
            search_by: this.searchBy,
        })
    }


}
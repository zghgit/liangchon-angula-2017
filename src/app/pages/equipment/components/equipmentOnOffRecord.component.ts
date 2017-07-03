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
    public searchBy: any = {
        bind_status:2
    };

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
                key: "net_status",
                controlType: "select",
                value: "0",
                placeholder: "请选择设备状态",
                options: [{
                    name: '在线',
                    geo_id: "1"
                }, {
                    name: '离线',
                    geo_id: "2"
                }]
            }
        ]
        this.plugins.buttons = [
            {
                type: "form",
                class: "btn-primary",
                content: "搜索",
                click: ({value}={value}) => {
                    let {
                        device_no,
                        net_status,
                    } = value;
                    this.searchBy = {
                        bind_status:2,
                        device_no: device_no ? device_no.trim() : "",
                        net_status: net_status,
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
            },  {
                type: "reset",
                class: "btn-danger",
                content: "重置",
                click: () => {
                    this.searchBy={
                        bind_status:2
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
            }else {
                swal({
                    title: "获取设备状态失败!",
                    text: res.error_msg,
                    type: "error",
                    timer:"2000"
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

}
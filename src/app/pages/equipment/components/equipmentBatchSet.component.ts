import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AppHttpService, UC} from "../../../plugins/globalservice";

declare var swal;
@Component({
    selector: 'equipmentBatchSet',
    templateUrl: '../views/equipmentBatchSet.html',
    styleUrls:["../styles/equipmentBatchSet.scss"]
})
export class EquipmentBatchSetComponent implements OnInit {
    public commoditys:Array<any>=[];
    public cannotupdata:boolean=false;
    public now: number = 1;
    public grids:any={};
    public deviceSet = new Set();//内容集合
    public commoditySet:Array<any>=[];//内容集合
    public commodityTip:string="";
    public deviceTip:string="";
    public plugins: any = {};
    public searchBy: any = {
        bind_status:2,
        device_type:1
    };
    constructor(
        public appHttpService:AppHttpService,
        public uc:UC,
        public router:Router
    ) { }

    ngOnInit() {
        this.getCommodityData();
        this.getGridData({
            page_now: this.now,
            limit: 20,
            sort_by: 'create_time',
            sort_type: 'desc',
            search_by: this.searchBy,

        });
        this.plugins.search = [
            {
                title: '设备编号',
                key: "device_no",
                controlType: "input",
                value: "",
                placeholder: "请输入设备编号"
            },{
                title: '所属商家',
                key: "owner_name",
                controlType: "input",
                value: "",
                placeholder: "请输入所属商家"
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
                        owner_name,
                    } = value;
                    this.searchBy = {
                        bind_status:2,
                        device_type:1,
                        device_no: device_no ? device_no.trim() : "",
                        owner_name:owner_name,
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
                        bind_status:2,
                        device_type:1,
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
        //设备信息及全选逻辑
        this.grids = {
            th:{
                array:[
                    {content: '设备编号ID', hidden: true},
                    {type:"checkbox",content: '全选'},
                    {content: '设备编号'},
                    {content: '设备名称'},
                    {content: '设备类型'},
                    {content: '所属商家'},
                    {content: '设备状态'},
                    {content: '启用状态'},
                ],
                checked:false,
                click:(data)=>{
                    //因为传值的时候先取反再传值,所以判断的时候模型的checked状态还没有改变
                    if(!data.th.checked){
                        //全选处理
                        for(let item of data.tbody){
                            item.checked = true;
                            this.deviceSet.add(item.array[1].value)
                        }
                    }else {
                        //非全选处理
                        for(let item of data.tbody){
                            item.checked = false;
                            this.deviceSet.clear();
                        }
                    }
                }
            },
            tbody: [],
            pagination: {
                maxSize: 5,
                itemsPerPage: 20,
                currentPage: 1
            }
        }
    }
    //获取商品信息
    public getCommodityData = function () {
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_commodity_list/hash", {params:{
            page_now: 1,
            limit: 200000,
            sort_by:'create_time',
            sort_type:'desc',
            search_by:{
                status:1,
            }
        }});
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.list;
                let commoditys = [];
                for(let item of list){
                    commoditys.push({
                        value: item.commodity_id,
                        content: item.commodity_name,
                        checked:false,
                    })
                }
                this.commoditys = commoditys;
                if(commoditys.length==0){
                    this.commodityTip ="没有可添加的商品"
                }else {
                    this.commodityTip =""
                }

            }else {
                swal({
                    title: "获取商品信息失败!",
                    text: res.error_msg,
                    type: "error",
                    timer:"2000"
                });
            }
        })
    };
    //获取设备信息
    public getGridData = function (params) {
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_device_list/hash", {params: params})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.list;
                if(list.length==0){
                    this.deviceTip ="没有可添加的设备"
                }else {
                    this.deviceTip =""
                }
                this.grids.tbody = [];
                this.grids.pagination.totalItems = data.total_num;
                for (let key of list) {
                    let tds: Array<any>;
                    tds = [
                        {content: key.device_id, hidden: true},
                        {type:"checkbox",value:key.device_id},
                        {content: key.device_no},
                        {content: key.device_name},
                        {content: key.device_name},
                        {content: key.owner_name},
                        {content: key.net_status_name},
                        {content: key.status == '1' ? "启用" : "禁用"},
                    ];
                    this.grids.tbody.push({
                        array:tds,
                        checked:false,
                        click:(data)=>{
                            data.checked = !data.checked;
                            if(data.checked){
                                this.deviceSet.add(data.array[1].value)
                            }else {
                                this.deviceSet.delete(data.array[1].value)

                            }
                        }
                    })
                }
            }else {
                swal({
                    title: "获取设备信息失败!",
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
    checkboxBack(ev){
        this.commoditySet = ev.value;
    }
    updataform(){
        let commodity_ids = this.commoditySet;
        let device_ids = Array.from(this.deviceSet);

        if(commodity_ids.length==0){
            this.commodityTip ="请添加商品"
            return
        }else {
            this.commodityTip =""
        }
        if(device_ids.length==0){
            this.deviceTip ="请添加设备"
            return
        }else {
            this.deviceTip =""
        }
        let params = {
            params: {
                device_ids         :   device_ids,
                commodity_ids       :   commodity_ids,
            }
        }
        this.appHttpService.postData(this.uc.api.qc + "/batch_set_device/hash", params).subscribe(
            res => {
                if (res.status) {
                    this.router.navigateByUrl('pages/equipment/equipmentList');
                } else {
                    swal("批量设置失败", res.error_msg, "error")
                }
            }
        )
    }
}
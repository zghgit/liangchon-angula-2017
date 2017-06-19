import { Component, OnInit } from '@angular/core';
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
    constructor(
        public appHttpService:AppHttpService,
        public uc:UC
    ) { }

    ngOnInit() {
        this.getCommodityData();
    }
    public getCommodityData = function () {
        let data = this.appHttpService.postData(this.uc.api.qc + "/get_commodity_list/hash", {params:{
            page_now: 1,
            limit: 200000,
            sort_by:'create_time',
            sort_type:'desc',
            search_by:{
                status:1,
            }
        }})
        data.subscribe(res => {
            if (res.status) {
                let data = res.data;
                let list = data.list;
                let commoditys = [];
                for(let item of list){
                    commoditys.push({
                        value: item.commodity_id,
                        content: item.commodity_name,
                        checked:true,
                    })
                }
                this.commoditys = commoditys;

            }else {
                swal({
                    title: "获取桩详情失败!",
                    text: res.error_msg,
                    type: "error"
                });
            }
        })
    }
    checkboxBack(ev){
    }
    updataform(){

    }
}
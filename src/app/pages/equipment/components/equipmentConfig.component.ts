/**
 * Created by max on 2017/5/9.
 */
import {Component, OnInit} from '@angular/core';
import {Router,ActivatedRoute,Params} from "@angular/router";
import {Validators} from '@angular/forms';
import {AppHttpService, UC} from "../../../plugins/globalservice";
declare var swal;
@Component({
    selector: 'equipmentConfig',
    templateUrl: '../views/equipmentConfig.html'
})
export class EquipmentConfigComponent implements OnInit {
    public oldParams:any={};
    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public router: Router,
                public activatedRoute:ActivatedRoute
    ) {
    }

    ngOnInit() {
        let data = this.activatedRoute.params
            .switchMap((params: Params) => this.appHttpService.postData(this.uc.api.qc + "/get_device_params_list/hash", {params: {device_no: params['id']}}));
        data.subscribe(res=>{
            if (res.status){
                let data = res.data;

            }else {
                swal("获取设备参数配置失败", res.error_msg, "error")
            }
        })
    }

}
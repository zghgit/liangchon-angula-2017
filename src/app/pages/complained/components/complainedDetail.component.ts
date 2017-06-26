/**
 * Created by max on 2017/6/5.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {AppHttpService, UC} from "../../../plugins/globalservice";
declare var swal: any;
@Component({
    selector: 'complained-detail',
    templateUrl: '../views/complainedDetail.html'
})
export class complainedDetailComponent implements OnInit {
    public plugins: any = {
        table: {
            data: []
        }
    };

    constructor(public appHttpService: AppHttpService,
                public uc: UC,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        let data = this.activatedRoute.params
            .switchMap((params: Params) => this.appHttpService.postData(this.uc.api.qc + "/get_complained/hash", {params: {complained_id: params['id']}}));
        data.subscribe((res) => {
            if (res.status) {
                let _data = res.data;
                this.plugins.table.data = [
                    {
                        type: 'text',
                        label: '用户',
                        content: _data.complained_user_name
                    },
                    {
                        type: 'text',
                        label: '订单编号',
                        content: _data.entity_id
                    },
                    {
                        type: 'text',
                        label: '申诉内容',
                        content: _data.complained_content
                    },
                    {
                        type: 'text',
                        label: '申诉状态',
                        content: _data.status == 1 ? '待处理' : '已处理'
                    },
                    {
                        type:'text',
                        label:'时间',
                        content:_data.create_time
                    },{
                        type:'text',
                        label:'备注',
                        content:_data.remark
                    }
                ];
            } else {
                swal({
                    title: "获取申诉信息失败!",
                    text: res.error_msg,
                    type: "error",
                    timer:"1500"
                });
            }
        })
    }

}
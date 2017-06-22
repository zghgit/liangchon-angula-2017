/**
 * Created by max on 2017/6/21.
 */
/**
 * Created by max on 2017/6/5.
 */
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {AppHttpService, UC} from "../../../plugins/globalservice";

declare var swal;
@Component({
    selector: 'app-information-detail',
    templateUrl: '../views/appInformationDetail.html',
    styleUrls: ["../styles/appInformationDetail.scss"]
})
export class AppInformationDetailComponent implements OnInit {
    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public activatedRoute: ActivatedRoute,
                public router: Router) {
    }

    public information:any={};

    ngOnInit() {
        let data = this.activatedRoute.params
            .switchMap((params: Params) => this.appHttpService.postData(this.uc.api.qc + "/get_information/hash/", {
                params: {
                    information_id: params['id']
                }
            }));
        data.subscribe(res => {
            if (res.status) {
                console.log(res);
                let data = res.data;
                this.information["title"] = data.information_title;
                this.information["creater_name"] = data.creater_name;
                this.information["create_time"] = data.create_time;
                this.information["content"] = data.information_content;
            }
        })
    }
}

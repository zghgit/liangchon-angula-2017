/**
 * Created by max on 2017/5/9.
 */
/**
 * Created by max on 2017/6/13.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppHttpService, UC} from "../../../plugins/globalservice";
declare var swal;
@Component({
    selector: 'equipmentImport',
    templateUrl: '../views/equipmentImport.html',
    styleUrls: ["../styles/equipmentImport.scss"],
})
export class EquipmentImportComponent implements OnInit {
    public file: any = {}

    constructor(public uc: UC,
                public appHttpService: AppHttpService,
                public router: Router) {
    }

    ngOnInit() {
        this.file = {
            config: {
                id:"certificate_img_1",
                value: "",
                accept:"",
                uploadurl: this.uc.api.qc + "/upload_file/hash/",
                downloadurl: this.uc.api.qc + "/get_file/hash/",
                capsule: "certificate_img_1"
            },
        }
        this.appHttpService.getBinary(this.uc.api.qc+'/download_device_template/hash/').subscribe(res=>{
            let disposition = res.headers._headers.get("content-disposition");

            if (!disposition){
                swal("下载模板失败", res.error_msg, "error")
            }else {
                let blob = new Blob([res._body], {type: "application/vnd.ms-excel"});
                let objectUrl = URL.createObjectURL(blob);
                let a = document.createElement('a');
                let filename = disposition[0].split(";")[1].trim().split("=")[1]
                console.log(filename);
                console.log("template.xls");
                try{
                    filename = JSON.parse(filename)
                }catch (e){
                    console.log(e);
                }
                document.body.appendChild(a);
                a.setAttribute('style', 'display:none');
                a.setAttribute('href', objectUrl);
                a.setAttribute('download', filename);
                a.click();
                URL.revokeObjectURL(objectUrl);
            }

        })

    }
    filehasup(ev){
        console.log(ev);
    }

    //form数据

}
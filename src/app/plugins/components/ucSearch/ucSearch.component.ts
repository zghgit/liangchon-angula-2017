/**
 * Created by max on 2017/6/22.
 */
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'uc-search',
    templateUrl: 'ucSearch.html',
    styleUrls:["ucSearch.scss"]
})
export class ucSearchComponent implements OnInit {
    @Input() searchData:any;
    @Input() buttons:any;
    public form: FormGroup;
    constructor() { }

    ngOnInit() {
        if(this.searchData){
            this.form = this.toFormGroup(this.searchData);
        }
    }
    toFormGroup(fields) {
        let group: any = {};
        fields.forEach(field => {
            if(field.hasChildGroup){
                let childGroulp:any = {}
                childGroulp['province_code']=new FormControl(field.config.province.value||"");
                childGroulp['city_code']=new FormControl(field.config.city.value||"");
                childGroulp['district_code']=new FormControl(field.config.area.value||"");
                group[field.key] = new FormGroup(childGroulp);

            }else {
                group[field.key] = new FormControl(field.value || "");
            }
        });
        return new FormGroup(group);
    }
    ngOnChanges(){
        if (this.searchData){
            this.form = this.toFormGroup(this.searchData);
        }
    }
}
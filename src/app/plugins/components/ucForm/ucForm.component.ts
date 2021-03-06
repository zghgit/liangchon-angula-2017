/**
 * Created by max on 2017/5/17.
 */

import {Component, OnInit, Input,Output,EventEmitter,OnChanges,AfterContentChecked,AfterViewInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
    selector: 'uc-form',
    templateUrl: 'ucForm.html',
    styleUrls:["ucForm.scss"]
})
export class UcFormComponent implements OnInit {
    @Input() formData:any;
    @Output() upformdata = new EventEmitter<any>();
    public form: FormGroup;
    constructor() { }

    ngOnInit() {
        if(this.formData){
            this.form = this.toFormGroup(this.formData);
        }
    }
    ngAfterViewInit(): void {
        //订阅表单值改变事件
        if (this.formData){
            this.form = this.toFormGroup(this.formData);
        }
    }
    toFormGroup(fields) {
        let group: any = {};
        fields.forEach(field => {
            if(field.hasChildGroup){
                let childGroulp:any = {}
                childGroulp['province_code']=new FormControl(field.config.province.value||"",field.validator);
                childGroulp['city_code']=new FormControl(field.config.city.value||"",field.validator);
                childGroulp['district_code']=new FormControl(field.config.area.value||"",field.validator);
                group[field.key] = new FormGroup(childGroulp);

            }else {
                group[field.key] = new FormControl({value:field.value || '',disabled: field.disabled},field.validator);
            }
        });
        return new FormGroup(group);
    }
    ngOnChanges(){
        if (this.formData){
            this.form = this.toFormGroup(this.formData);
        }
    }
    save(value){
        this.upformdata.emit(value);
    }
}
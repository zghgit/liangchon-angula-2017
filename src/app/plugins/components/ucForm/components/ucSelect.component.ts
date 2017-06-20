/**
 * Created by max on 2017/5/26.
 */
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
@Component({
    selector: 'uc-select',
    template: `
    <select [(ngModel)]="model.value" (click)="haschicked()" (change)="hasChanged(model.value)" [ngClass]="{'has-error': (!model.value)&&error}">
        <option value="0">{{placeholder}}</option>
        <ng-container *ngFor="let option of options">
            <option [value]="option.geo_id">{{option.name}}</option>
        </ng-container>
    </select>  
`,
    styleUrls: ["../styles/ucSelect.scss"]
})
export class ucSelectComponent implements OnInit {
    @Input() model;
    @Input() options;
    @Input() error;
    @Output() geoChange = new EventEmitter<any>();

    public isclick:boolean=false;
    public placeholder;

    constructor() {
    }

    ngOnInit() {
        this.placeholder = this.model.placeholder || "--请选择--";
    }
    //
    haschicked(){
        this.isclick = true;
    }
    //发送数据
    public hasChanged(data) {
        if(this.isclick){
            let content="";
            for(let option of this.options){
                if(option.geo_id ==data){
                    content = option.name;
                }
            }
            this.geoChange.emit({
                name: this.model.name,
                value: data,
                content:content,
            })
        }
    }
}
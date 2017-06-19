
/**
 * Created by max on 2017/6/19.
 */
import { Component, OnInit, Output,Input, EventEmitter,OnChanges,DoCheck } from '@angular/core';

@Component({
    selector: 'base-checkbox',
    template:`
    <div class="checkAll">
        <label><input type="checkbox" [checked]="checkedAll" (click)="changeCheckedAll()">全选</label> 
    </div>
    <div class="item-content">
        <ng-container *ngFor="let item of model">
            <label><input type="checkbox" [value]="item.value" [(ngModel)]="item.checked" [checked]="item.checked" (change)="onChange($event.target.checked,item.value)">{{item.content}}</label>
        </ng-container>
    </div>
`,
    styleUrls:["../styles/baseCheckbox.scss"]
})
export class BaseCheckboxComponent implements OnInit {
    @Input() model: any;
    @Output() checkboxData = new EventEmitter<any>();
    public checkedAll:boolean = false;
    public checkedSet = new Set();//内容集合
    public flag:boolean = false;
    public can:boolean = true;

    constructor() { }

    ngOnInit() {
        this.checkboxInit();
    }
    ngOnChanges(){
        if(this.model.length>0){
            this.checkboxInit();
        }
    }
    ngDoCheck(){
        if(this.model.length>0&&this.can){
            this.checkboxInit();
            this.can = false;
        }
    }
    checkboxInit(){
        for (let item of this.model) {
            if (item.checked) {
                this.checkedSet.add(item.value);
            }
        }
        if (this.checkedSet.size == this.model.length) {
            this.checkedAll = true;
        } else {
            this.checkedAll = false;
        }
        this.checkboxValue()
    }
    //点击全选时
    changeCheckedAll(){
        this.checkedAll = !this.checkedAll;
        if (this.checkedAll) {
            for (let item of  this.model) {
                this.checkedSet.add(item.value)
                item.checked = true;
            }
        } else {
            for (let item of  this.model) {
                this.checkedSet.delete(item.value)
                item.checked = false;
            }
        }
        this.flag = true;
        this.checkboxValue()
    }
    //变化时更新
    onChange(checked: boolean, value: any) {
        if (checked) {
            this.checkedSet.add(value)
        } else {
            this.checkedSet.delete(value)
        }
        if (this.checkedSet.size == this.model.length) {
            this.changeCheckedAll();
        } else {
            this.checkedAll = false;
        }
        this.flag = true;
        this.checkboxValue()
    }
    //更新数据
    checkboxValue(){
        this.checkboxData.emit({
            value:Array.from(this.checkedSet),
        })
    }
}
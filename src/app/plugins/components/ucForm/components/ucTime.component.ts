/**
 * Created by max on 2017/5/24.
 * 本组件基于ngx-bootstrap,并修改了源码
 * 在ngx-bootstrap/datepicker/daypicker.component.js里的63进行了如下修改:
 *
 *var abbr = this.dateFilter(days[j].date, this.formatDayHeader);
 *var abbrCn;
 *switch (abbr){
 *       case "Su":abbrCn="周日";break;
 *       case "Mo":abbrCn="周一";break;
 *      case "Tu":abbrCn="周二";break;
 *      case "We":abbrCn="周三";break;
 *      case "Th":abbrCn="周四";break;
 *      case "Fr":abbrCn="周五";break;
 *      case "Sa":abbrCn="周六";break;
 *               }
 *self.labels[j].abbr = abbrCn;
 *
 *
 * 需要传入model.config={
 * showTimePicker:false//default:false
 *
 * }
 */
import {Component, OnInit, Input} from '@angular/core';
import * as moment from 'moment';
@Component({
    selector: 'uc-time',
    template: `
    <div [formGroup]="form">
            <div *ngIf="model.label" class="item-title">
            <label>{{model.label}}
                <span *ngIf="model.require">*</span>
                <ng-container *ngFor="let item of model.errormsg">
                    <i *ngIf="form.get(model.key).hasError(item.type)&&form.get(model.key).touched">{{item.content}}</i>
                </ng-container>
            </label>
        </div>
        <input type="text" class="form-control" [formControlName]="model.key" [(ngModel)]="model.value" readonly (click)="open()" placeholder="{{model.placeholder}}">
    </div>
    <div class="timeWrap" *ngIf="showPicker">
        <div class="timePicker" (click)="backTime()">
            <datepicker [(ngModel)]="dt" [minDate]="minDate" [showWeeks]="true" [dateDisabled]="dateDisabled" [formatDayTitle]="'YYYY年MM月'" [formatMonth]="'MM'"></datepicker>
            <div *ngIf="showTimePicker">
                <h6>时间选择:</h6>
                <timepicker [(ngModel)]="dt" [showMeridian]="false"></timepicker>
            </div>
        </div>
        <div class="opration">
            <button type="button" class="btn btn-sm btn-info" (click)="today()">今天</button>
            <button type="button" class="btn btn-sm btn-danger" (click)="clear()">清除</button>
            <button type="button" class="btn btn-sm btn-success" (click)="showTime()">时间</button>
            <button type="button" class="btn btn-sm btn-primary" (click)="confire()">确认</button>
        </div>
    </div>
`,
    styleUrls: ["../styles/ucTime.scss"]
})
export class UcTimeComponent implements OnInit {
    @Input() model: any;
    @Input() form;
    public flag: boolean = false;
    public showPicker: boolean = false;
    public showTimePicker: boolean = false;
    public formats: string[] = ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm', 'YYYY-MM-DD HH:mm:ss'];
    public format: string;
    public dt: Date = new Date();

    ngOnInit() {
        if (this.model.value) {
            this.dt = new Date(this.model.value);
        } else {
            this.dt = new Date();
        }
        this.showTimePicker = this.model.config.showTimePicker || false;
        this.format = this.formats[this.model.config.format || 0];
    };

    public minDate: Date = void 0;
    public tomorrow: Date;
    public afterTomorrow: Date;
    public dateDisabled: {date: Date, mode: string}[];

    public constructor() {
        (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
        (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
        (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
        (this.dateDisabled = []);
    }

    public getDate(): number {
        return this.dt && this.dt.getTime() || new Date().getTime();
    }


    public disabled(date: Date, mode: string): boolean {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    }


    public toggleMin(): void {
        this.dt = new Date(this.minDate.valueOf());
        this.model.value = "";
    }

    public clear(): void {
        this.model.value = "";
        this.flag = true;
    }

    public today(): void {
        this.dt = new Date();
        this.backTime();
    }

    public open(): void {
        this.showPicker = true;
    }

    public backTime() {
        this.model.value = moment(this.dt).format(this.format);
    }

    public confire() {
        this.showPicker = false;
    }
    public showTime() {
        this.showTimePicker = !this.showTimePicker;
        if (this.showTimePicker) {
            this.format = this.formats[1];
        } else {
            this.format = this.formats[this.model.config.format || 0];

        }
    }
}
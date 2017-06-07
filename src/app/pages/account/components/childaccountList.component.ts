/**
 * Created by max on 2017/4/19.
 */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'childaccount-list',
    templateUrl: '../views/childaccountList.html'
})
export class ChildAccountListComponent implements OnInit {
    constructor() { }
    title = "子账户";
    ngOnInit() {
    }

}
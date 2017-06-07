/**
 * Created by max on 2017/5/5.
 */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'operation-management',
    template: `
        <router-outlet></router-outlet> 
    `
})
export class OperationManagementComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}
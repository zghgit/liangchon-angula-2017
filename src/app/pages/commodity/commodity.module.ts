/**
 * Created by max on 2017/5/9.
 */

import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule}  from '@angular/common';
import {UcFormModule} from "../../plugins/UcFormModule";

import {CommodityComponent} from './commodity.component';
import {commodityRoutes} from "./commodity.routes";
import {
    CommodityListComponent,
    CommodityAddComponent,
    CommodityEditComponent,
    CommodityDetailComponent,
} from './components';

@NgModule({
    imports: [
        RouterModule.forChild(commodityRoutes),
        UcFormModule,
        CommonModule
    ],
    exports: [],
    declarations: [
        CommodityComponent,
        CommodityListComponent,
        CommodityAddComponent,
        CommodityEditComponent,
        CommodityDetailComponent,
    ],
    providers: [],
})
export class CommodityModule {
}

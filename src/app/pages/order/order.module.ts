/**
 * Created by max on 2017/6/2.
 */
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {UcFormModule} from "../../plugins/UcFormModule";
import {OrderRoutes} from "./order.router"

import {OrderComponent} from "./order.component";
import {
    OrderListComponent,
    refundRecordListComponent

} from './components';

@NgModule({
    imports: [
        UcFormModule,
        RouterModule.forChild(OrderRoutes)
    ],
    exports: [],
    declarations: [
        OrderComponent,
        OrderListComponent,
        refundRecordListComponent
    ],
    providers: [],
})
export class OrderModule {
}

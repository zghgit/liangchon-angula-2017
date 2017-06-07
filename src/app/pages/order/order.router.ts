/**
 * Created by max on 2017/6/2.
 */
import { Routes } from '@angular/router';

import {OrderComponent} from "./order.component";
import {OrderListComponent,
    refundRecordListComponent
} from  "./components";

export const OrderRoutes :Routes = [
    { path: "",
        component:OrderComponent,
        children:[
            { path: "",redirectTo:"orderSearchList",pathMatch:"full" },
            { path: "orderSearchList", component: OrderListComponent },
            { path: "refundRecordList", component: refundRecordListComponent },
        ]
    },
];
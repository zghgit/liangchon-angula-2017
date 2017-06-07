/**
 * Created by max on 2017/5/9.
 */
import { Routes } from '@angular/router';

import {rechargeCardComponent} from './rechargeCard.component';
import {
    rechargeCardRecordListComponent,
} from './components';
export const rechargeCardRoutes :Routes = [
    { path: "",
        component:rechargeCardComponent,
        children:[
            { path: "",redirectTo:"rechargeCardRecord",pathMatch:"full" },
            { path: 'rechargeCardRecord', component: rechargeCardRecordListComponent },
        ]
    },
];
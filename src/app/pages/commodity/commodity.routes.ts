/**
 * Created by max on 2017/5/9.
 */
import { Routes } from '@angular/router';

import { CommodityComponent } from './commodity.component';
import {
    CommodityListComponent,
    CommodityAddComponent,
    CommodityEditComponent,
    CommodityDetailComponent,
} from './components';
export const commodityRoutes :Routes = [
    { path: "",
        component:CommodityComponent,
        children:[
            { path: "",redirectTo:"commodityList",pathMatch:"full" },
            { path: 'commodityList', component: CommodityListComponent },
            { path: 'commodityAdd', component: CommodityAddComponent },
            { path: 'commodityEdit/:id', component: CommodityEditComponent },
            { path: 'commodityDetail/:id', component: CommodityDetailComponent },
        ]
    },
];
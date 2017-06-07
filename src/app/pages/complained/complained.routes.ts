/**
 * Created by max on 2017/5/9.
 */
import { Routes } from '@angular/router';

import { ComplainComponent } from './complained.component';
import {
    complainedAddComponent,
    complainedDetailComponent,
    complainedListComponent
} from './components';
export const ComplainRoutes :Routes = [
    { path: "",
        component:ComplainComponent,
        children:[
            { path: "",redirectTo:"commodityList",pathMatch:"full" },
            { path: 'complainedList', component: complainedListComponent },
            { path: 'complainedAdd', component: complainedAddComponent },
            { path: 'complainedDetail/:id', component: complainedDetailComponent },
        ]
    },
];
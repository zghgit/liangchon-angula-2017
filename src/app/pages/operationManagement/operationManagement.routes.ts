/**
 * Created by max on 2017/6/5.
 */
import { Routes } from '@angular/router';

import { OperationManagementComponent } from './operationManagement.component';
import {
    OperationManagementListComponent

} from './components';
export const operationAnalysisRoutes :Routes = [
    { path: "",
        component:OperationManagementComponent,
        children:[
            { path: "",redirectTo:"operationManagementList",pathMatch:"full" },
            { path: 'operationManagementList', component: OperationManagementListComponent }
        ]
    },
];
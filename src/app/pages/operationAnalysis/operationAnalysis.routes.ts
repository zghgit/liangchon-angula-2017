/**
 * Created by max on 2017/6/5.
 */
import { Routes } from '@angular/router';

import { OperationAnalysisComponent } from './operationAnalysis.component';
import {
    FinancialStatisticsComponent,
    OrganizationStatisticsComponent,

} from './components';
export const oprationAnalysisRoutes :Routes = [
    { path: "",
        component:OperationAnalysisComponent,
        children:[
            { path: "",redirectTo:"financialStatistics",pathMatch:"full" },
            { path: 'financialStatistics', component: FinancialStatisticsComponent },
            { path: 'organizationStatistics', component: OrganizationStatisticsComponent },
        ]
    },
];
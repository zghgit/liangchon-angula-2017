/**
 * Created by max on 2017/6/5.
 */
import {Routes} from '@angular/router';
import {AppManagementComponent} from "./appManagement.component";
import {
    AppManagementListComponent,
    AppUserIncreaseComponent,
    AppInformationComponent,
    AppInformationAddComponent
} from "./components";
export const appManagementRoutes: Routes = [
    {
        path: "",
        component: AppManagementComponent,
        children: [
            {path: "", redirectTo: "appManagementList", pathMatch: "full"},
            {path: "appManagementList", component: AppManagementListComponent},
            {path: "appUserIncrease", component: AppUserIncreaseComponent},
            {path: "appInformationList", component: AppInformationComponent},
            {path: "appInformationAdd", component: AppInformationAddComponent},
        ]
    }
]
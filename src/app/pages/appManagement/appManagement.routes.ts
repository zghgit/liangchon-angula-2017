/**
 * Created by max on 2017/6/5.
 */
import {Routes} from '@angular/router';
import {AppManagementComponent} from "./appManagement.component";
import {
    AppManagementListComponent,
    AppUserIncreaseComponent,
    AppInformationComponent,
    AppInformationAddComponent,
    AppInformationEditComponent,
    AppInformationDetailComponent,
    AppUserDetailComponent,
    AppChargeRecordComponent,
    AppMessagePushComponent,
    AppVersionCtlComponent,
} from "./components";
export const appManagementRoutes: Routes = [
    {
        path: "",
        component: AppManagementComponent,
        children: [
            {path: "", redirectTo: "appUserList", pathMatch: "full"},
            {path: "appUserList", component: AppManagementListComponent},
            {path: "appUserDetail/:id", component: AppUserDetailComponent},
            {path: "appUserIncrease", component: AppUserIncreaseComponent},
            {path: "appInformationList", component: AppInformationComponent},
            {path: "appInformationAdd", component: AppInformationAddComponent},
            {path: "appInformationEdit/:id", component: AppInformationEditComponent},
            {path: "appInformationDetail/:id", component: AppInformationDetailComponent},
            {path: "appChargeRecord", component: AppChargeRecordComponent},
            {path: "appChargeRecord/:id", component: AppChargeRecordComponent},
            {path: "appMessagePush", component: AppMessagePushComponent},
            {path: "appMessagePush/:id", component: AppMessagePushComponent},
            {path: "appVersionCtl", component: AppVersionCtlComponent},
        ]
    }
]
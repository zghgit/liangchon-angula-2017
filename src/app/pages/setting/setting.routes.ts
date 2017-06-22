/**
 * Created by max on 2017/6/21.
 */
import {Routes} from '@angular/router';
import {SettingComponent} from './setting.component';
import {
    SettingEditComponent,
    UserAgreementComponent,
} from "./components/";


export const settingRoutes: Routes = [
    {
        path: "",
        component: SettingComponent,
        children: [
            {path: "", redirectTo: "settingEdit", pathMatch: "full"},
            {path: "settingEdit", component: SettingEditComponent},
            {path: "userAgreement", component: UserAgreementComponent}
        ]
    },
];
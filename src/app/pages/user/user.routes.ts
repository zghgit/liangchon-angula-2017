/**
 * Created by max on 2017/6/9.
 */
import { Routes } from '@angular/router';
import { UserComponent } from "./user.component";
import {
    UserInfoComponent,
    UserEditComponent,
    UserPwdEditComponent,
} from "./components";
export const UserRoutes :Routes = [
    { path: "",
        component:UserComponent,
        children:[
            { path: "",redirectTo:"userInfo",pathMatch:"full" },
            { path: "userInfo/:id", component: UserInfoComponent },
            { path: "userEdit/:id", component: UserEditComponent },
            { path: "userPwdEdit/:id", component: UserPwdEditComponent },
        ]
    },
];
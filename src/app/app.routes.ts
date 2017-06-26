/**
 * Created by max on 2017/4/19.
 */
import { Routes } from "@angular/router";
import { LoginComponent,RepasswordComponent } from "./index";
export const appRoutes:Routes = [
    {
        path:"",
        redirectTo:'login',
        pathMatch:'full'
    },{
        path:"login",
        component:LoginComponent
    },{
        path:"repassword",
        component:RepasswordComponent
    },{
        path:"pages",
        loadChildren:"./pages/pages.module#PagesModule"
    }
    // ,{
    //     path:'**',
    //     redirectTo:"login",
    //     pathMatch:"full",
    // }
]

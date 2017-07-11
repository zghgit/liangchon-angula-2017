webpackJsonp([10],{"+FOa":function(e,t,r){"use strict";var n=r("bm2B"),a=r("BkNc"),l=r("IekC");r.d(t,"a",function(){return i});var i=function(){function e(e,t,r,n,a){this.uc=e,this.appHttpService=t,this.router=r,this.dataService=n,this.activatedRoute=a}return e.prototype.ngOnInit=function(){var e=this;this.activatedRoute.params.switchMap(function(t){return e.appHttpService.postData(e.uc.api.qc+"/get_user/"+t.id)}).subscribe(function(t){if(t.status){var r=t.data;e.user_name=r.user_name,e.fields=[{label:"账户名称",key:"user_name",controlType:"input",inputType:"text",value:r.user_name,disabled:!0,placeholder:"请输入账户名称"},{label:"旧的密码",key:"old_password",controlType:"input",inputType:"oldpassword",value:"",require:!0,placeholder:"请输入旧的密码",validator:[n.Validators.required],errormsg:[{type:"required",content:"必填项目"}]},{label:"新的密码",key:"password",controlType:"input",inputType:"password",value:"",require:!0,placeholder:"请输入新的密码",validator:[n.Validators.required,n.Validators.pattern(e.uc.reg.PSW)],errormsg:[{type:"required",content:"必填项目"},{type:"pattern",content:"密码长度6~16,只能包含数字、字母、._!@#"},{type:"validateEqual",content:"两次密码不一致"}]},{label:"确认密码",key:"repassword",controlType:"input",inputType:"repassword",value:"",require:!0,placeholder:"请确认密码",validator:[n.Validators.required],errormsg:[{type:"required",content:"必填项目"},{type:"validateEqual",content:"两次密码不一致"}]}]}else swal({title:"获取用户信息失败!",text:t.error_msg,type:"error",timer:"2000"})})},e.prototype.saveData=function(e){var t=this,r=(void 0===e?{value:r}:e).value,n={params:{new_password:this.uc.toMD5(r.password,this.user_name),old_password:this.uc.toMD5(r.old_password,this.user_name)}};this.appHttpService.postData(this.uc.api.qc+"/update_user_password",n).subscribe(function(e){e.status?t.router.navigateByUrl("login"):swal("修改密码失败",e.error_msg,"error")})},e.ctorParameters=function(){return[{type:l.b},{type:l.a},{type:a.c},{type:l.c},{type:a.a}]},e}()},"3Js0":function(e,t,r){"use strict";function n(e){return l["ɵvid"](0,[(e()(),l["ɵeld"](0,null,null,1,"uc-form",[],null,[[null,"upformdata"]],function(e,t,r){var n=!0,a=e.component;if("upformdata"===t){n=!1!==a.saveData(r)&&n}return n},o.a,o.b)),l["ɵdid"](4833280,null,0,u.a,[],{formData:[0,"formData"]},{upformdata:"upformdata"})],function(e,t){e(t,1,0,t.component.fields)},null)}function a(e){return l["ɵvid"](0,[(e()(),l["ɵeld"](0,null,null,1,"user-edit",[],null,null,null,n,m)),l["ɵdid"](114688,null,0,i.a,[s.a,p.a,c.c,d.a,c.a],null,null)],function(e,t){e(t,1,0)},null)}var l=r("/oeL"),i=r("ljxq"),o=r("q9or"),u=r("X7i+"),s=r("U9zq"),p=r("0kYB"),c=r("BkNc"),d=r("ghHK");r.d(t,"a",function(){return f});var y=[],m=l["ɵcrt"]({encapsulation:2,styles:y,data:{}}),f=l["ɵccf"]("user-edit",i.a,a,{},{},[])},CalO:function(e,t,r){"use strict";r.d(t,"a",function(){return n});var n=function(){function e(){}return e.prototype.ngOnInit=function(){},e.ctorParameters=function(){return[]},e}()},Dy41:function(e,t,r){"use strict";function n(e){return l["ɵvid"](0,[(e()(),l["ɵeld"](0,null,null,1,"uc-form",[],null,[[null,"upformdata"]],function(e,t,r){var n=!0,a=e.component;if("upformdata"===t){n=!1!==a.saveData(r)&&n}return n},o.a,o.b)),l["ɵdid"](4833280,null,0,u.a,[],{formData:[0,"formData"]},{upformdata:"upformdata"})],function(e,t){e(t,1,0,t.component.fields)},null)}function a(e){return l["ɵvid"](0,[(e()(),l["ɵeld"](0,null,null,1,"userpwd-edit",[],null,null,null,n,m)),l["ɵdid"](114688,null,0,i.a,[s.a,p.a,c.c,d.a,c.a],null,null)],function(e,t){e(t,1,0)},null)}var l=r("/oeL"),i=r("+FOa"),o=r("q9or"),u=r("X7i+"),s=r("U9zq"),p=r("0kYB"),c=r("BkNc"),d=r("ghHK");r.d(t,"a",function(){return f});var y=[],m=l["ɵcrt"]({encapsulation:2,styles:y,data:{}}),f=l["ɵccf"]("userpwd-edit",i.a,a,{},{},[])},NKbX:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("/oeL"),a=r("s0i9"),l=r("URzX"),i=r("vAcb"),o=r("oUXa"),u=r("3Js0"),s=r("Dy41"),p=r("qbdv"),c=r("bm2B"),d=r("dWcS"),y=r("W5fO"),m=r("qCSQ"),f=r("BkNc"),v=r("eJnt"),_=r("X/HD"),h=r("0Zl/"),b=r("y8ct"),g=r("CalO"),q=r("mA5e"),x=r("ljxq"),T=r("+FOa");r.d(t,"UserModuleNgFactory",function(){return k});var k=n["ɵcmf"](a.a,[],function(e){return n["ɵmod"]([n["ɵmpd"](512,n.ComponentFactoryResolver,n["ɵCodegenComponentFactoryResolver"],[[8,[l.a,i.a,o.a,u.a,s.a]],[3,n.ComponentFactoryResolver],n.NgModuleRef]),n["ɵmpd"](4608,p.a,p.b,[n.LOCALE_ID]),n["ɵmpd"](4608,c.FormBuilder,c.FormBuilder,[]),n["ɵmpd"](4608,c["ɵi"],c["ɵi"],[]),n["ɵmpd"](4608,d.a,d.a,[]),n["ɵmpd"](4608,y.a,y.a,[]),n["ɵmpd"](4608,m.a,m.a,[]),n["ɵmpd"](512,p.c,p.c,[]),n["ɵmpd"](512,f.x,f.x,[[2,f.m],[2,f.c]]),n["ɵmpd"](512,c["ɵba"],c["ɵba"],[]),n["ɵmpd"](512,c.ReactiveFormsModule,c.ReactiveFormsModule,[]),n["ɵmpd"](512,v.a,v.a,[]),n["ɵmpd"](512,c.FormsModule,c.FormsModule,[]),n["ɵmpd"](512,_.a,_.a,[]),n["ɵmpd"](512,h.a,h.a,[]),n["ɵmpd"](512,b.a,b.a,[]),n["ɵmpd"](512,a.a,a.a,[]),n["ɵmpd"](1024,f.t,function(){return[[{path:"",component:g.a,children:[{path:"",redirectTo:"userInfo",pathMatch:"full"},{path:"userInfo/:id",component:q.a},{path:"userEdit/:id",component:x.a},{path:"userPwdEdit/:id",component:T.a}]}]]},[])])})},ljxq:function(e,t,r){"use strict";var n=r("bm2B"),a=r("BkNc"),l=r("IekC"),i=r("p7O/"),o=r("P4Tt");r.d(t,"a",function(){return u});var u=function(){function e(e,t,r,n,a){this.uc=e,this.appHttpService=t,this.router=r,this.dataService=n,this.activatedRoute=a}return e.prototype.ngOnInit=function(){var e=this;this.activatedRoute.params.subscribe(function(t){e.user_id=t.id}),this.activatedRoute.params.switchMap(function(t){return e.appHttpService.postData(e.uc.api.qc+"/get_user/"+t.id)}).subscribe(function(t){if(t.status){var r=t.data;e.fields=[{label:"账户名称",key:"user_name",controlType:"input",inputType:"text",value:r.user_name,disabled:!0,placeholder:"请输入账户名称"},{label:"账户昵称",key:"business_name",controlType:"input",inputType:"text",value:r.business_name,placeholder:"请输入账户昵称"},{label:"真实姓名",key:"real_name",controlType:"input",inputType:"text",value:r.real_name,require:!0,placeholder:"请输入真实姓名",validator:[n.Validators.required],errormsg:[{type:"required",content:"必填项目"}]},{label:"服务电话",key:"service_phone",controlType:"input",inputType:"text",value:r.service_phone,require:!0,placeholder:"请输入服务电话",validator:[n.Validators.required,i.a],errormsg:[{type:"required",content:"必填项目"},{type:"phoneValidator",content:"请填写正确的电话号码"}]},{label:"手机号码",key:"mobile_no",controlType:"input",inputType:"text",value:r.mobile_no,require:!0,placeholder:"请输入手机号码",validator:[n.Validators.required,i.a],errormsg:[{type:"required",content:"必填项目"},{type:"phoneValidator",content:"请填写正确的电话号码"}]},{label:"邮箱地址",key:"email",controlType:"input",inputType:"text",value:r.email,require:!0,placeholder:"请输入邮箱地址",validator:[n.Validators.required,o.a],errormsg:[{type:"required",content:"必填项目"},{type:"emailValidator",content:"请填写正确的电子邮箱"}]}];var a=e.dataService.getCookies("admin_flg");if(1==a&&1==r.user_type&&e.fields.push({label:"联系地址",key:"business_address",controlType:"input",inputType:"text",value:r.business_address,require:!0,placeholder:"请输入联系地址",validator:[n.Validators.required],errormsg:[{type:"required",content:"必填项目"}]}),1!=a&&1==r.user_type){e.fields.push({label:"业务地址",key:"business_address1",controlType:"address",hasChildGroup:!0,url:e.uc.api.qc+"/get_geo_list/",config:{province:{name:"province_code",value:r.province_code,placeholder:"--请选择省--"},city:{name:"city_code",value:r.city_code,placeholder:"--请选择市--"},area:{name:"district_code",value:r.district_code,placeholder:"--请选择区--"}}});var l=e.dataService.getCookies("role").toString();"商户"==decodeURI(l)&&(e.fields.push({label:"电费单价(元)",key:"electricity_price",controlType:"input",inputType:"text",value:r.electricity_price,placeholder:"请输入电费单价",validator:[n.Validators.maxLength(7),n.Validators.pattern(e.uc.reg.ARITHMETIC_NUMBER)],errormsg:[{type:"pattern",content:"输入的格式不正确(例：1.00)"},{type:"maxlength",content:"提现最大额度不能超过1,000,000 元"}]}),e.fields.push({label:"结算",key:"whether_settlement",controlType:"radio",value:r.whether_settlement,require:!0,options:[{value:"1",content:"是"},{value:"2",content:"否"}],validator:[n.Validators.required],errormsg:[{type:"required",content:"必填项目"}],click:function(t){1==t&&(e.fields[9].hidden=!1,e.fields[10].hidden=!1),2==t&&(e.fields[9].hidden=!0,e.fields[10].hidden=!0)}}),e.fields.push({label:"结算周期(月)",key:"settlement_cycle",controlType:"input",inputType:"text",require:!0,hidden:2==r.whether_settlement,value:r.settlement_cycle,placeholder:"请输入结算周期"}),e.fields.push({label:"结算日(日)",key:"settlement_day",controlType:"input",inputType:"text",require:!0,hidden:2==r.whether_settlement,value:r.settlement_day,placeholder:"请输入结算日"}))}2==r.user_type&&(e.fields.push({label:"联系地址",key:"business_address",controlType:"input",inputType:"text",value:r.business_address,require:!0,placeholder:"请输入联系地址",validator:[n.Validators.required],errormsg:[{type:"required",content:"必填项目"}]}),e.fields.push({label:"部门名称",key:"department",controlType:"input",inputType:"text",value:r.department,require:!0,placeholder:"请输入部门名称",validator:[n.Validators.required],errormsg:[{type:"required",content:"必填项目"}]}),e.fields.push({label:"工号",key:"staff_no",controlType:"input",inputType:"text",value:r.staff_no,require:!0,placeholder:"请输入工号",validator:[n.Validators.required],errormsg:[{type:"required",content:"必填项目"}]}),e.fields.push({label:"职位",key:"position",controlType:"input",inputType:"text",value:r.position,require:!0,placeholder:"请输入职位",validator:[n.Validators.required],errormsg:[{type:"required",content:"必填项目"}]}))}else swal({title:"获取用户信息失败!",text:t.error_msg,type:"error",timer:"2000"})})},e.prototype.saveData=function(e){var t=this,r=(void 0===e?{value:r}:e).value,n=r.whether_settlement,a=r.settlement_cycle,l=r.settlement_day;if(1==n){if(a<=0||a>12)return void swal({title:"提示!",text:"结算周期范围是[1-12]月",type:"error",timer:"2000"});if(l<=0||l>28)return void swal({title:"提示!",text:"结算日范围是[1-28]日",type:"error",timer:"2000"})}else a="0",l="0";var i={params:{user_info:{business_name:r.business_name.trim(),real_name:r.real_name.trim(),service_phone:r.service_phone,email:r.email,mobile_no:r.mobile_no,business_address:r.business_address||"",department:r.department||"",staff_no:r.staff_no||"",position:r.position||"",province_code:r.business_address1?r.business_address1.province_code:"0",city_code:r.business_address1?r.business_address1.city_code:"0",district_code:r.business_address1?r.business_address1.district_code:"0",electricity_price:r.electricity_price||0,whether_settlement:n,settlement_cycle:a,settlement_day:l}}};this.appHttpService.postData(this.uc.api.qc+"/update_user_info",i).subscribe(function(e){e.status?t.router.navigateByUrl("pages/user/userInfo/"+t.user_id):swal("编辑用户信息失败",e.error_msg,"error")})},e.ctorParameters=function(){return[{type:l.b},{type:l.a},{type:a.c},{type:l.c},{type:a.a}]},e}()},mA5e:function(e,t,r){"use strict";var n=r("BkNc"),a=r("IekC");r.d(t,"a",function(){return l});var l=function(){function e(e,t,r,n){this.appHttpService=e,this.uc=t,this.dataService=r,this.activatedRoute=n,this.plugins={table:{data:[]}}}return e.prototype.ngOnInit=function(){var e=this;this.activatedRoute.params.switchMap(function(t){return e.appHttpService.postData(e.uc.api.qc+"/get_user/"+t.id)}).subscribe(function(t){if(t.status){var r=t.data,n="";r.province_code_name&&(n+=r.province_code_name),r.city_code_name&&(n+="-"+r.city_code_name),r.district_code_name&&(n+="-"+r.district_code_name),e.plugins.table.data=[{type:"text",label:"账户名称",content:r.user_name},{type:"text",label:"用户昵称",content:r.business_name},{type:"text",label:"真实姓名",content:r.real_name},{type:"text",label:"账户类型",content:r.user_type_name},{type:"text",label:"服务电话",content:r.service_phone},{type:"text",label:"手机号码",content:r.mobile_no},{type:"text",label:"启用状态",content:1==r.status?"启用":"禁用"},{type:"text",label:"邮箱地址",content:r.email}];var a=e.dataService.getCookies("admin_flg");1==a&&1==r.user_type&&e.plugins.table.data.push({type:"text",label:"联系地址",content:r.business_address}),1==r.user_type&&1!=a&&(e.plugins.table.data.push({type:"text",label:"业务地址",content:n}),"商户"==e.dataService.getCookies("role")&&(e.plugins.table.data.push({type:"text",label:"电费单价(元)",content:r.electricity_price||0}),e.plugins.table.data.push({type:"text",label:"结算",content:1==r.whether_settlement?"是":"否"}),1==r.whether_settlement&&(e.plugins.table.data.push({type:"text",label:"结算周期(月)",content:r.settlement_cycle}),e.plugins.table.data.push({type:"text",label:"结算日(日)",content:r.settlement_day})))),2==r.user_type&&(e.plugins.table.data.push({type:"text",label:"联系地址",content:r.business_address}),e.plugins.table.data.push({type:"text",label:"部门名称",content:r.department}),e.plugins.table.data.push({type:"text",label:"工号",content:r.staff_no}),e.plugins.table.data.push({type:"text",label:"职位",content:r.position}))}else swal({title:"获取用户信息失败!",text:t.error_msg,type:"error",timer:"2000"})})},e.ctorParameters=function(){return[{type:a.a},{type:a.b},{type:a.c},{type:n.a}]},e}()},oUXa:function(e,t,r){"use strict";function n(e){return l["ɵvid"](0,[(e()(),l["ɵeld"](0,null,null,1,"uc-details",[],null,null,null,i.a,i.b)),l["ɵdid"](114688,null,0,o.a,[],{model:[0,"model"]},null)],function(e,t){e(t,1,0,t.component.plugins.table)},null)}function a(e){return l["ɵvid"](0,[(e()(),l["ɵeld"](0,null,null,1,"user-info",[],null,null,null,n,m)),l["ɵdid"](114688,null,0,u.a,[s.a,p.a,c.a,d.a],null,null)],function(e,t){e(t,1,0)},null)}var l=r("/oeL"),i=r("DhbZ"),o=r("OkKd"),u=r("mA5e"),s=r("0kYB"),p=r("U9zq"),c=r("ghHK"),d=r("BkNc");r.d(t,"a",function(){return f});var y=[],m=l["ɵcrt"]({encapsulation:2,styles:y,data:{}}),f=l["ɵccf"]("user-info",u.a,a,{},{},[])},s0i9:function(e,t,r){"use strict";r.d(t,"a",function(){return n});var n=function(){function e(){}return e}()},vAcb:function(e,t,r){"use strict";function n(e){return l["ɵvid"](0,[(e()(),l["ɵeld"](16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),l["ɵdid"](212992,null,0,i.y,[i.q,l.ViewContainerRef,l.ComponentFactoryResolver,[8,null],l.ChangeDetectorRef],null,null)],function(e,t){e(t,1,0)},null)}function a(e){return l["ɵvid"](0,[(e()(),l["ɵeld"](0,null,null,1,"user",[],null,null,null,n,s)),l["ɵdid"](114688,null,0,o.a,[],null,null)],function(e,t){e(t,1,0)},null)}var l=r("/oeL"),i=r("BkNc"),o=r("CalO");r.d(t,"a",function(){return p});var u=[],s=l["ɵcrt"]({encapsulation:2,styles:u,data:{}}),p=l["ɵccf"]("user",o.a,a,{},{},[])}});
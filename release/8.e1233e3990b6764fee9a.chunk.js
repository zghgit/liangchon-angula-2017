webpackJsonp([8],{"+3T8":function(t,e,n){"use strict";n.d(e,"a",function(){return a});var a=function(){function t(){}return t}()},"+V5i":function(t,e,n){"use strict";var a=n("BkNc"),r=n("IekC"),i=n("bm2B"),l=n("+idH");n.n(l);n.d(e,"a",function(){return o});var o=function(){function t(t,e,n){this.uc=t,this.appHttpService=e,this.router=n,this.fields=[{label:"广告名称",key:"advertisement_name",controlType:"input",inputType:"text",require:!0,value:"",placeholder:"请输入广告名称",validator:[i.Validators.required],errormsg:[{type:"required",content:"必填项目"}]},{label:"图片",key:"advertisement_url",controlType:"file",fileType:"img",require:!0,value:"",config:{value:"",accept:"image/*",size:2,uploadurl:this.uc.api.qc+"/upload_file/",capsule:"advertisement_url"},validator:[i.Validators.required],errormsg:[{type:"required",content:"必填项目"}]},{label:"链接地址",key:"link_url",controlType:"input",inputType:"text",require:!0,value:"",placeholder:"请输入链接地址",validator:[i.Validators.required,l.CustomValidators.url],errormsg:[{type:"required",content:"必填项目"},{type:"url",content:"请输入有效的链接地址,含协议部分(如：http,https,ftp等)"}]},{label:"广告显示时间(秒)",key:"show_duration",controlType:"input",inputType:"text",require:!0,value:"",placeholder:"请输入广告显示时间",validator:[i.Validators.required,l.CustomValidators.number,l.CustomValidators.range([0,30])],errormsg:[{type:"required",content:"必填项目"},{type:"number",content:"只能是数字"},{type:"range",content:"广告显示时间范围:(0-30)秒"}]},{label:"投放区域",key:"advertisement_range",controlType:"inputpacs",require:!0,value:"",placeholder:"请选择投放区域",content:"确认",options:[],check_all:!0,url:this.uc.api.qc+"/get_geo_list/",validator:[i.Validators.required],errormsg:[{type:"required",content:"必填项目"}]},{label:"显示位置",key:"show_position",controlType:"radio",value:"1",require:!0,options:[{value:"1",content:"启动画面"},{value:"2",content:"结算页面"},{value:"3",content:"首页banner"},{value:"4",content:"引导页面"}],validator:[i.Validators.required],errormsg:[{type:"required",content:"必填项目"}]},{label:"是否设为默认广告",key:"default_display",controlType:"radio",value:"1",require:!0,options:[{value:"1",content:"是"},{value:"2",content:"否"}],validator:[i.Validators.required],errormsg:[{type:"required",content:"必填项目"}]},{label:"启用状态",key:"status",controlType:"radio",value:"1",require:!0,options:[{value:"1",content:"启用"},{value:"2",content:"禁用"}],validator:[i.Validators.required],errormsg:[{type:"required",content:"必填项目"}]}]}return t.prototype.ngOnInit=function(){},t.prototype.saveData=function(t){var e=this,n=(void 0===t?{value:n}:t).value,a=n.advertisement_range,r=JSON.parse(a);if(2==r.check_all&&0==r.selectedSet.length)return void swal({title:"新增广告失败!",text:"地址是必选的",type:"error",timer:"2000"});1==r.check_all&&(r.selectedSet=[{province_code:"0",city_code:"0",district_code:"0"}]);var i={params:{advertisement_info:{advertisement_name:n.advertisement_name,advertisement_url:n.advertisement_url,link_url:n.link_url,show_position:n.show_position,show_duration:n.show_duration,status:n.status,default_display:n.default_display},advertisement_range:{check_all:r.check_all,advertisement_range_info:r.selectedSet}}};this.appHttpService.postData(this.uc.api.qc+"/add_advertisement",i).subscribe(function(t){t.status?e.router.navigateByUrl("pages/advertisement/advertisementList"):swal("新增广告失败",t.error_msg,"error")})},t.ctorParameters=function(){return[{type:r.b},{type:r.a},{type:a.c}]},t}()},"+wEV":function(t,e,n){"use strict";n.d(e,"a",function(){return a});var a=function(){function t(){}return t.prototype.ngOnInit=function(){},t.ctorParameters=function(){return[]},t}()},"/LvR":function(t,e,n){"use strict";var a=n("IekC"),r=n("BkNc");n.d(e,"a",function(){return i});var i=function(){function t(t,e,n){this.router=t,this.appHttpService=e,this.uc=n,this.now=1,this.plugins={},this.getGridData=function(t){var e=this;this.appHttpService.postData(this.uc.api.qc+"/get_advertisement_list",{params:t}).subscribe(function(n){if(n.status){var a=n.data,r=a.list;e.plugins.grid.pagination.totalItems=a.total_num,e.plugins.grid.tbody=[];for(var i=(e.uc.api.qc,0),l=r;i<l.length;i++){var o,u=l[i],s=void 0;switch(u.show_position){case"1":o="启动画面";break;case"2":o="结算页面";break;case"3":o="首页banner";break;case"4":o="引导页面";break;default:o="未指定"}s=[{content:u.advertisement_id,hidden:!0},{content:u.advertisement_name},{type:"img",content:u.advertisement_url},{content:u.link_url},{content:u.show_duration},{content:u.click_times},{content:o},{content:1==u.status?"启用":"禁用"},{content:1==u.default_display?"是":"否"}];var c=[];e.uc.powerfun(e.uc.constant.get_advertisement)&&c.push({content:"查看",class:"btn-info",click:function(t){var n=t[0].content;e.router.navigate(["pages/advertisement/advertisementDetail",n])}}),e.uc.powerfun(e.uc.constant.update_advertisement)&&c.push({content:"编辑",class:"btn-primary",click:function(t){var n=t[0].content;e.router.navigate(["pages/advertisement/advertisementEdit",n])}}),e.uc.powerfun(e.uc.constant.update_advertisement)&&2==u.default_display&&c.push({content:"设置为默认广告",class:"btn-warning",click:function(n){var a=n[0].content;swal({title:"确定设置为默认广告?",text:"",type:"warning",showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",showLoaderOnConfirm:!0,confirmButtonColor:"#DD6B55"}).then(function(n){!0===n&&e.appHttpService.postData(e.uc.api.qc+"/update_advertisement/",{params:{advertisement_id:a,advertisement_info:{default_display:1}}}).subscribe(function(n){n.status?(swal({title:"设置默认广告成功!",text:"",type:"success",timer:"2000"}),e.getGridData(t)):swal("设置默认广告失败!",n.error_msg,"error")})},function(){})}}),e.uc.powerfun(e.uc.constant.update_advertisement)&&"1"==u.status&&c.push({content:"禁用",class:"btn-black",click:function(n){var a=n[0].content;swal({title:"确定禁用?",text:"",type:"warning",showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",showLoaderOnConfirm:!0,confirmButtonColor:"#DD6B55"}).then(function(n){!0===n&&e.appHttpService.postData(e.uc.api.qc+"/update_advertisement/",{params:{advertisement_id:a,advertisement_info:{status:2}}}).subscribe(function(n){n.status?(swal({title:"禁用成功!",text:"",type:"success",timer:"2000"}),e.getGridData(t)):swal("禁用失败!",n.error_msg,"error")})},function(){})}}),e.uc.powerfun(e.uc.constant.update_advertisement)&&"2"==u.status&&c.push({content:"启用",class:"btn-success",click:function(n){var a=n[0].content;swal({title:"确定启用?",text:"",type:"warning",showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",showLoaderOnConfirm:!0,confirmButtonColor:"#DD6B55"}).then(function(n){!0===n&&e.appHttpService.postData(e.uc.api.qc+"/update_advertisement/",{params:{advertisement_id:a,advertisement_info:{status:1}}}).subscribe(function(n){n.status?(swal({title:"启用成功!",text:"",type:"success",timer:"2000"}),e.getGridData(t)):swal("启用失败!",n.error_msg,"error")})},function(){})}}),e.uc.powerfun(e.uc.constant.delete_advertisement)&&c.push({content:"删除",class:"btn-danger",click:function(n){var a=n[0].content;swal({title:"确定删除?",text:"",type:"warning",showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",showLoaderOnConfirm:!0,confirmButtonColor:"#DD6B55"}).then(function(n){!0===n&&e.appHttpService.postData(e.uc.api.qc+"/delete_advertisement/",{params:{advertisement_id:a,advertisement_info:{status:1}}}).subscribe(function(n){n.status?(swal({title:"删除成功!",text:"",type:"success",timer:"2000"}),e.getGridData(t)):swal("删除失败!",n.error_msg,"error")})},function(){})}}),s.push({type:"operation",operation:c}),e.plugins.grid.tbody.push(s)}}else swal({title:"获取广告信息失败!",text:n.error_msg,type:"error",timer:"2000"})})}}return t.prototype.ngOnInit=function(){var t=this;this.uc.powerfun(this.uc.constant.add_advertisement)&&(this.plugins.button={class:"btn-primary",content:"新增广告",click:function(){t.router.navigateByUrl("pages/advertisement/advertisementAdd")}}),this.plugins.grid={th:[{content:"广告ID",hidden:!0},{content:"广告名称"},{content:"图片(点击查看大图)"},{content:"链接地址"},{content:"显示时长(秒)"},{content:"点击次数"},{content:"显示位置"},{content:"启用状态"},{content:"默认广告"},{content:"操作"}],tbody:[],pagination:{maxSize:5,itemsPerPage:20,currentPage:1,totalItems:1}},this.getGridData({page_now:this.now,limit:20,sort_by:"create_time",sort_type:"desc",search_by:{}})},t.prototype.pageBeChanged=function(t){this.getGridData({page_now:t.page,limit:t.itemsPerPage,sort_by:"create_time",sort_type:"desc",search_by:{}})},t.ctorParameters=function(){return[{type:r.c},{type:a.a},{type:a.b}]},t}()},"0uja":function(t,e,n){"use strict";function a(t){return i["ɵvid"](0,[(t()(),i["ɵeld"](0,null,null,1,"uc-form",[],null,[[null,"upformdata"]],function(t,e,n){var a=!0,r=t.component;if("upformdata"===e){a=!1!==r.saveData(n)&&a}return a},o.a,o.b)),i["ɵdid"](4833280,null,0,u.a,[],{formData:[0,"formData"]},{upformdata:"upformdata"})],function(t,e){t(e,1,0,e.component.fields)},null)}function r(t){return i["ɵvid"](0,[(t()(),i["ɵeld"](0,null,null,1,"advertisement-add",[],null,null,null,a,m)),i["ɵdid"](114688,null,0,l.a,[s.a,c.a,d.c],null,null)],function(t,e){t(e,1,0)},null)}var i=n("/oeL"),l=n("+V5i"),o=n("q9or"),u=n("X7i+"),s=n("U9zq"),c=n("0kYB"),d=n("BkNc");n.d(e,"a",function(){return v});var p=[],m=i["ɵcrt"]({encapsulation:2,styles:p,data:{}}),v=i["ɵccf"]("advertisement-add",l.a,r,{},{},[])},"4Wzn":function(t,e,n){"use strict";function a(t){return l["ɵvid"](0,[(t()(),l["ɵeld"](0,null,null,4,null,null,null,null,null,null,null)),(t()(),l["ɵted"](null,["\n    "])),(t()(),l["ɵeld"](0,null,null,1,"uc-button",[],null,null,null,o.a,o.b)),l["ɵdid"](114688,null,0,u.a,[],{model:[0,"model"]},null),(t()(),l["ɵted"](null,["\n"]))],function(t,e){t(e,3,0,e.component.plugins.button)},null)}function r(t){return l["ɵvid"](0,[(t()(),l["ɵand"](16777216,null,null,1,null,a)),l["ɵdid"](16384,null,0,s.m,[l.ViewContainerRef,l.TemplateRef],{ngIf:[0,"ngIf"]},null),(t()(),l["ɵted"](null,["\n"])),(t()(),l["ɵeld"](0,null,null,1,"uc-details",[],null,null,null,c.a,c.b)),l["ɵdid"](114688,null,0,d.a,[],{model:[0,"model"]},null),(t()(),l["ɵted"](null,["\n"]))],function(t,e){var n=e.component;t(e,1,0,n.plugins.button),t(e,4,0,n.plugins.table)},null)}function i(t){return l["ɵvid"](0,[(t()(),l["ɵeld"](0,null,null,1,"advertisement-detail",[],null,null,null,r,y)),l["ɵdid"](114688,null,0,p.a,[m.a,v.a,f.a],null,null)],function(t,e){t(e,1,0)},null)}var l=n("/oeL"),o=n("VC1C"),u=n("7rGF"),s=n("qbdv"),c=n("DhbZ"),d=n("OkKd"),p=n("Xuph"),m=n("0kYB"),v=n("U9zq"),f=n("BkNc");n.d(e,"a",function(){return h});var _=[],y=l["ɵcrt"]({encapsulation:2,styles:_,data:{}}),h=l["ɵccf"]("advertisement-detail",p.a,i,{},{},[])},Odw0:function(t,e,n){"use strict";n.d(e,"a",function(){return a});var a=[""]},"QGQ/":function(t,e,n){"use strict";function a(t){return o["ɵvid"](0,[(t()(),o["ɵeld"](0,null,null,4,null,null,null,null,null,null,null)),(t()(),o["ɵted"](null,["\n    "])),(t()(),o["ɵeld"](0,null,null,1,"uc-button",[],null,null,null,u.a,u.b)),o["ɵdid"](114688,null,0,s.a,[],{model:[0,"model"]},null),(t()(),o["ɵted"](null,["\n"]))],function(t,e){t(e,3,0,e.component.plugins.button)},null)}function r(t){return o["ɵvid"](0,[(t()(),o["ɵand"](16777216,null,null,1,null,a)),o["ɵdid"](16384,null,0,c.m,[o.ViewContainerRef,o.TemplateRef],{ngIf:[0,"ngIf"]},null),(t()(),o["ɵted"](null,["\n"])),(t()(),o["ɵeld"](0,null,null,1,"uc-table",[],null,[[null,"pageBeChanged"]],function(t,e,n){var a=!0,r=t.component;if("pageBeChanged"===e){a=!1!==r.pageBeChanged(n)&&a}return a},p.a,p.b)),o["ɵdid"](114688,null,0,m.a,[],{model:[0,"model"]},{pageBeChanged:"pageBeChanged"}),(t()(),o["ɵted"](null,["\n"]))],function(t,e){var n=e.component;t(e,1,0,n.plugins.button),t(e,4,0,n.plugins.grid)},null)}function i(t){return o["ɵvid"](0,[(t()(),o["ɵeld"](0,null,null,1,"advertisement-list",[],null,null,null,r,h)),o["ɵdid"](114688,null,0,d.a,[v.c,f.a,_.a],null,null)],function(t,e){t(e,1,0)},null)}var l=n("Odw0"),o=n("/oeL"),u=n("VC1C"),s=n("7rGF"),c=n("qbdv"),d=n("/LvR"),p=n("tvCx"),m=n("sQer"),v=n("BkNc"),f=n("0kYB"),_=n("U9zq");n.d(e,"a",function(){return g});var y=[l.a],h=o["ɵcrt"]({encapsulation:0,styles:y,data:{}}),g=o["ɵccf"]("advertisement-list",d.a,i,{},{},[])},Xuph:function(t,e,n){"use strict";var a=n("BkNc"),r=n("IekC");n.d(e,"a",function(){return i});var i=function(){function t(t,e,n){this.appHttpService=t,this.uc=e,this.activatedRoute=n,this.plugins={table:{data:[]}}}return t.prototype.ngOnInit=function(){var t=this;this.activatedRoute.params.subscribe(function(e){t.advertisement_id=e.id}),this.uc.powerfun(this.uc.constant.update_advertisement_to_zero)&&(this.plugins.button={class:"btn-danger",content:"广告点击次数清零",click:function(){t.appHttpService.postData(t.uc.api.qc+"/update_advertisement_to_zero/",{params:{advertisement_id:t.advertisement_id}}).subscribe(function(t){t.status?location.reload():swal({title:"广告次数清零失败!",text:t.error_msg,type:"error"})})}}),this.activatedRoute.params.switchMap(function(e){return t.appHttpService.postData(t.uc.api.qc+"/get_advertisement/",{params:{advertisement_id:e.id}})}).subscribe(function(e){if(e.status){var n=e.data,a=void 0;switch(n.show_position){case"1":a="启动画面";break;case"2":a="结算页面";break;case"3":a="首页banner";break;case"4":a="引导页面";break;default:a="未指定"}var r=n.advertisement_range,i="";if(r[0].province_name)for(var l=0;l<r.length;l++){var o="";r[l].province_name&&(o+=r[l].province_name),r[l].city_name&&(o+="-"+r[l].city_name),r[l].district_name&&(o+="-"+r[l].district_name),i+=o+";"}else i="全部区域";t.plugins.table.data=[{type:"text",label:"广告名称",content:n.advertisement_name},{type:"img",label:"广告图片",src:[n.advertisement_url]},{type:"text",label:"链接地址",content:n.link_url},{type:"text",label:"投放区域",content:i},{type:"text",label:"显示位置",content:a},{type:"text",label:"显示时长",content:n.show_duration},{type:"text",label:"启用状态",content:1==n.status?"启用":"禁用"},{type:"text",label:"是否为默认广告",content:1==n.default_display?"是":"否"},{type:"text",label:"点击次数",content:n.click_times}]}else swal({title:"获取广告信息失败!",text:e.error_msg,type:"error",timer:"2000"})})},t.ctorParameters=function(){return[{type:r.a},{type:r.b},{type:a.a}]},t}()},cPKY:function(t,e,n){"use strict";function a(t){return i["ɵvid"](0,[(t()(),i["ɵeld"](0,null,null,1,"uc-form",[],null,[[null,"upformdata"]],function(t,e,n){var a=!0,r=t.component;if("upformdata"===e){a=!1!==r.saveData(n)&&a}return a},o.a,o.b)),i["ɵdid"](4833280,null,0,u.a,[],{formData:[0,"formData"]},{upformdata:"upformdata"})],function(t,e){t(e,1,0,e.component.fields)},null)}function r(t){return i["ɵvid"](0,[(t()(),i["ɵeld"](0,null,null,1,"advertisement-edit",[],null,null,null,a,m)),i["ɵdid"](114688,null,0,l.a,[s.a,c.a,d.c,d.a],null,null)],function(t,e){t(e,1,0)},null)}var i=n("/oeL"),l=n("vjR8"),o=n("q9or"),u=n("X7i+"),s=n("U9zq"),c=n("0kYB"),d=n("BkNc");n.d(e,"a",function(){return v});var p=[],m=i["ɵcrt"]({encapsulation:2,styles:p,data:{}}),v=i["ɵccf"]("advertisement-edit",l.a,r,{},{},[])},dpCX:function(t,e,n){"use strict";function a(t){return i["ɵvid"](0,[(t()(),i["ɵeld"](16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),i["ɵdid"](212992,null,0,l.y,[l.q,i.ViewContainerRef,i.ComponentFactoryResolver,[8,null],i.ChangeDetectorRef],null,null)],function(t,e){t(e,1,0)},null)}function r(t){return i["ɵvid"](0,[(t()(),i["ɵeld"](0,null,null,1,"advertisement",[],null,null,null,a,s)),i["ɵdid"](114688,null,0,o.a,[],null,null)],function(t,e){t(e,1,0)},null)}var i=n("/oeL"),l=n("BkNc"),o=n("+wEV");n.d(e,"a",function(){return c});var u=[],s=i["ɵcrt"]({encapsulation:2,styles:u,data:{}}),c=i["ɵccf"]("advertisement",o.a,r,{},{},[])},m2h4:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("/oeL"),r=n("+3T8"),i=n("URzX"),l=n("dpCX"),o=n("QGQ/"),u=n("0uja"),s=n("4Wzn"),c=n("cPKY"),d=n("qbdv"),p=n("bm2B"),m=n("dWcS"),v=n("W5fO"),f=n("qCSQ"),_=n("+idH"),y=(n.n(_),n("BkNc")),h=n("eJnt"),g=n("X/HD"),b=n("0Zl/"),w=n("y8ct"),k=n("+wEV"),q=n("/LvR"),B=n("+V5i"),C=n("Xuph"),x=n("vjR8");n.d(e,"AdvertisementModuleNgFactory",function(){return D});var D=a["ɵcmf"](r.a,[],function(t){return a["ɵmod"]([a["ɵmpd"](512,a.ComponentFactoryResolver,a["ɵCodegenComponentFactoryResolver"],[[8,[i.a,l.a,o.a,u.a,s.a,c.a]],[3,a.ComponentFactoryResolver],a.NgModuleRef]),a["ɵmpd"](4608,d.a,d.b,[a.LOCALE_ID]),a["ɵmpd"](4608,p.FormBuilder,p.FormBuilder,[]),a["ɵmpd"](4608,p["ɵi"],p["ɵi"],[]),a["ɵmpd"](4608,m.a,m.a,[]),a["ɵmpd"](4608,v.a,v.a,[]),a["ɵmpd"](4608,f.a,f.a,[]),a["ɵmpd"](512,d.c,d.c,[]),a["ɵmpd"](512,_.CustomFormsModule,_.CustomFormsModule,[]),a["ɵmpd"](512,y.x,y.x,[[2,y.m],[2,y.c]]),a["ɵmpd"](512,p["ɵba"],p["ɵba"],[]),a["ɵmpd"](512,p.ReactiveFormsModule,p.ReactiveFormsModule,[]),a["ɵmpd"](512,h.a,h.a,[]),a["ɵmpd"](512,p.FormsModule,p.FormsModule,[]),a["ɵmpd"](512,g.a,g.a,[]),a["ɵmpd"](512,b.a,b.a,[]),a["ɵmpd"](512,w.a,w.a,[]),a["ɵmpd"](512,r.a,r.a,[]),a["ɵmpd"](1024,y.t,function(){return[[{path:"",component:k.a,children:[{path:"",redirectTo:"advertisementList",pathMatch:"full"},{path:"advertisementList",component:q.a},{path:"advertisementAdd",component:B.a},{path:"advertisementDetail/:id",component:C.a},{path:"advertisementEdit/:id",component:x.a}]}]]},[])])})},vjR8:function(t,e,n){"use strict";var a=n("bm2B"),r=n("BkNc"),i=n("IekC"),l=n("+idH");n.n(l);n.d(e,"a",function(){return o});var o=function(){function t(t,e,n,a){this.uc=t,this.appHttpService=e,this.router=n,this.activatedRoute=a}return t.prototype.ngOnInit=function(){var t=this;this.activatedRoute.params.subscribe(function(e){t.advertisement_id=e.id}),this.activatedRoute.params.switchMap(function(e){return t.appHttpService.postData(t.uc.api.qc+"/get_advertisement/",{params:{advertisement_id:e.id}})}).subscribe(function(e){if(e.status){var n=e.data,r=!1,i=n.advertisement_range,o=[];0==i[0].province_code&&0==i[0].city_code&&0==i[0].district_code?r=!0:o=n.advertisement_range,t.fields=[{label:"广告名称",key:"advertisement_name",controlType:"input",inputType:"text",require:!0,value:n.advertisement_name,placeholder:"请输入广告名称",validator:[a.Validators.required],errormsg:[{type:"required",content:"必填项目"}]},{label:"图片",key:"advertisement_url",controlType:"file",fileType:"img",require:!0,value:n.advertisement_url,config:{value:n.advertisement_url,accept:"image/*",size:2,uploadurl:t.uc.api.qc+"/upload_file/",capsule:"advertisement_url"},validator:[a.Validators.required],errormsg:[{type:"required",content:"必填项目"}]},{label:"链接地址",key:"link_url",controlType:"input",inputType:"text",require:!0,value:n.link_url,placeholder:"请输入链接地址",validator:[a.Validators.required,l.CustomValidators.url],errormsg:[{type:"required",content:"必填项目"},{type:"url",content:"请输入有效的链接地址,含协议部分(如：http,https,ftp等)"}]},{label:"广告显示时间(秒)",key:"show_duration",controlType:"input",inputType:"text",require:!0,value:n.show_duration,placeholder:"请输入广告显示时间",validator:[a.Validators.required,l.CustomValidators.number,l.CustomValidators.range([0,30])],errormsg:[{type:"required",content:"必填项目"},{type:"range",content:"广告显示时间范围:(0-30)秒"},{type:"number",content:"只能是数字"}]},{label:"投放区域",key:"advertisement_range",controlType:"inputpacs",require:!0,value:"",placeholder:"请选择投放区域",content:"添加",options:o,check_all:r,url:t.uc.api.qc+"/get_geo_list/",validator:[a.Validators.required],errormsg:[{type:"required",content:"必填项目"}]},{label:"显示位置",key:"show_position",controlType:"radio",value:n.show_position,require:!0,options:[{value:"1",content:"启动画面"},{value:"2",content:"结算页面"},{value:"3",content:"首页banner"},{value:"4",content:"引导页面"}],validator:[a.Validators.required],errormsg:[{type:"required",content:"必填项目"}]},{label:"是否设为默认广告",key:"default_display",controlType:"radio",value:n.default_display,require:!0,options:[{value:"1",content:"是"},{value:"2",content:"否"}],validator:[a.Validators.required],errormsg:[{type:"required",content:"必填项目"}]},{label:"启用状态",key:"status",controlType:"radio",value:n.status,require:!0,options:[{value:"1",content:"启用"},{value:"2",content:"禁用"}],validator:[a.Validators.required],errormsg:[{type:"required",content:"必填项目"}]}]}else swal({title:"获取广告信息失败!",text:e.error_msg,type:"error",timer:"2000"})})},t.prototype.saveData=function(t){var e=this,n=(void 0===t?{value:n}:t).value,a=n.advertisement_range,r=JSON.parse(a);if(2==r.check_all&&0==r.selectedSet.length)return void swal({title:"编辑广告失败!",text:"地址是必选的",type:"error",timer:"2000"});1==r.check_all&&(r.selectedSet=[{province_code:"0",city_code:"0",district_code:"0"}]);var i={params:{advertisement_id:this.advertisement_id,advertisement_info:{advertisement_name:n.advertisement_name,advertisement_url:n.advertisement_url,link_url:n.link_url,show_position:n.show_position,show_duration:n.show_duration,status:n.status,default_display:n.default_display},advertisement_range:{check_all:r.check_all,advertisement_range_info:r.selectedSet}}};this.appHttpService.postData(this.uc.api.qc+"/update_advertisement",i).subscribe(function(t){t.status?e.router.navigateByUrl("pages/advertisement/advertisementList"):swal("编辑广告失败",t.error_msg,"error")})},t.ctorParameters=function(){return[{type:i.b},{type:i.a},{type:r.c},{type:r.a}]},t}()}});
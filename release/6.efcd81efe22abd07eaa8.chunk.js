webpackJsonp([6],{"7YnO":function(t,n,e){"use strict";e.d(n,"a",function(){return o});var o=[""]},"8SLo":function(t,n,e){"use strict";function o(t){return r["ɵvid"](0,[(t()(),r["ɵeld"](0,null,null,1,"uc-details",[],null,null,null,i.a,i.b)),r["ɵdid"](114688,null,0,u.a,[],{model:[0,"model"]},null)],function(t,n){t(n,1,0,n.component.plugins.table)},null)}function a(t){return r["ɵvid"](0,[(t()(),r["ɵeld"](0,null,null,1,"commodity-detail",[],null,null,null,o,m)),r["ɵdid"](114688,null,0,l.a,[c.a,d.a,p.a],null,null)],function(t,n){t(n,1,0)},null)}var r=e("/oeL"),i=e("DhbZ"),u=e("OkKd"),l=e("GiId"),c=e("0kYB"),d=e("U9zq"),p=e("BkNc");e.d(n,"a",function(){return y});var s=[],m=r["ɵcrt"]({encapsulation:2,styles:s,data:{}}),y=r["ɵccf"]("commodity-detail",l.a,a,{},{},[])},"9rf5":function(t,n,e){"use strict";var o=e("BkNc"),a=e("bm2B"),r=e("IekC"),i=e("unDl");e.d(n,"a",function(){return u});var u=function(){function t(t,n,e,o){var a=this;this.uc=t,this.appHttpService=n,this.router=e,this.activatedRoute=o,this.saveData=function(t){var n=(void 0===t?{value:n}:t).value,e={params:{commodity_info:n,commodity_id:a.commodity_id}};a.appHttpService.postData(a.uc.api.qc+"/update_commodity",e).subscribe(function(t){t.status?a.router.navigateByUrl("pages/commodity/commodityList"):swal("新增商品失败",t.error_msg,"error")})}}return t.prototype.ngOnInit=function(){var t=this;this.activatedRoute.params.switchMap(function(n){return t.appHttpService.postData(t.uc.api.qc+"/get_commodity",{params:{commodity_id:n.id}})}).subscribe(function(n){if(n.status){var e=n.data;t.commodity_id=e.commodity_id,t.fields=[{label:"商品名称",key:"commodity_name",controlType:"input",inputType:"text",require:!0,value:e.commodity_name,placeholder:"请输入商品名称",validator:[a.Validators.required,a.Validators.maxLength(12)],errormsg:[{type:"required",content:"必填项目"},{type:"maxlength",content:"商品名称最长12个字"}]},{label:"商品描述",key:"commodity_description",controlType:"input",require:!0,inputType:"textarea",value:e.commodity_description,placeholder:"请输入商品描述",validator:[a.Validators.required],errormsg:[{type:"required",content:"必填项目"}]},{label:"充电时长(分钟)",key:"charge_duration",controlType:"input",inputType:"text",require:!0,value:e.charge_duration,placeholder:"请输入充电时长",validator:[a.Validators.required,a.Validators.pattern("^[0-9]+$"),i.a],errormsg:[{type:"required",content:"必填项目"},{type:"pattern",content:"只能是数字"},{type:"TenValidator",content:"充电时长只能是10的倍数"}]},{label:"价格(元)",key:"charge_price",controlType:"input",inputType:"text",require:!0,value:e.charge_price,placeholder:"请输入价格",validator:[a.Validators.required,a.Validators.pattern("^[0-9]+(.[0-9]{1,2})?$"),a.Validators.min(.01)],errormsg:[{type:"required",content:"必填项目"},{type:"pattern",content:"请填写正确的价格(如：1.00)元"},{type:"min",content:"商品最低价格为0.01元"}]},{label:"启用状态",key:"status",controlType:"radio",value:e.status,require:!0,options:[{value:"1",content:"启用"},{value:"2",content:"禁用"}],validator:[a.Validators.required],errormsg:[{type:"required",content:"必填项目"}]}]}else swal({title:"获取商品信息失败!",text:n.error_msg,type:"error",timer:"2000"})})},t.ctorParameters=function(){return[{type:r.b},{type:r.a},{type:o.c},{type:o.a}]},t}()},BVtg:function(t,n,e){"use strict";e.d(n,"a",function(){return o});var o=function(){function t(){}return t}()},DEAw:function(t,n,e){"use strict";function o(t){return r["ɵvid"](0,[(t()(),r["ɵeld"](16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),r["ɵdid"](212992,null,0,i.y,[i.q,r.ViewContainerRef,r.ComponentFactoryResolver,[8,null],r.ChangeDetectorRef],null,null)],function(t,n){t(n,1,0)},null)}function a(t){return r["ɵvid"](0,[(t()(),r["ɵeld"](0,null,null,1,"commodity",[],null,null,null,o,c)),r["ɵdid"](114688,null,0,u.a,[],null,null)],function(t,n){t(n,1,0)},null)}var r=e("/oeL"),i=e("BkNc"),u=e("vgoN");e.d(n,"a",function(){return d});var l=[],c=r["ɵcrt"]({encapsulation:2,styles:l,data:{}}),d=r["ɵccf"]("commodity",u.a,a,{},{},[])},GiId:function(t,n,e){"use strict";var o=e("BkNc"),a=e("IekC");e.d(n,"a",function(){return r});var r=function(){function t(t,n,e){this.appHttpService=t,this.uc=n,this.activatedRoute=e,this.plugins={table:{data:[]}}}return t.prototype.ngOnInit=function(){var t=this;this.activatedRoute.params.switchMap(function(n){return t.appHttpService.postData(t.uc.api.qc+"/get_commodity",{params:{commodity_id:n.id}})}).subscribe(function(n){if(n.status){var e=n.data;t.plugins.table.data=[{type:"text",label:"商品名称",content:e.commodity_name},{type:"text",label:"商品描述",content:e.commodity_description},{type:"text",label:"充电时长(分钟)",content:e.charge_duration},{type:"text",label:"价格(元)",content:e.charge_price},{type:"text",label:"启用状态",content:1==e.status?"启用":"禁用"}]}else swal({title:"获取商品信息失败!",text:n.error_msg,type:"error",timer:"2000"})})},t.ctorParameters=function(){return[{type:a.a},{type:a.b},{type:o.a}]},t}()},Q5iV:function(t,n,e){"use strict";var o=e("BkNc"),a=e("bm2B"),r=e("IekC"),i=e("unDl");e.d(n,"a",function(){return u});var u=function(){function t(t,n,e){this.uc=t,this.appHttpService=n,this.router=e,this.fields=[{label:"商品名称",key:"commodity_name",controlType:"input",inputType:"text",require:!0,value:"",placeholder:"请输入商品名称",validator:[a.Validators.required,a.Validators.maxLength(12)],errormsg:[{type:"required",content:"必填项目"},{type:"maxlength",content:"商品名称最长12个字"}]},{label:"商品描述",key:"commodity_description",controlType:"input",require:!0,inputType:"textarea",placeholder:"请输入商品描述",validator:[a.Validators.required],errormsg:[{type:"required",content:"必填项目"}]},{label:"充电时长(分钟)",key:"charge_duration",controlType:"input",inputType:"text",require:!0,value:"",placeholder:"请输入充电时长",validator:[a.Validators.required,a.Validators.pattern("^[0-9]+$"),i.a],errormsg:[{type:"required",content:"必填项目"},{type:"pattern",content:"只能是数字"},{type:"TenValidator",content:"充电时长只能是10的倍数"}]},{label:"价格(元)",key:"charge_price",controlType:"input",inputType:"text",require:!0,value:"",placeholder:"请输入价格",validator:[a.Validators.required,a.Validators.pattern("^[0-9]+(.[0-9]{1,2})?$"),a.Validators.min(.01)],errormsg:[{type:"required",content:"必填项目"},{type:"pattern",content:"请填写正确的价格(如：1.00)元"},{type:"min",content:"商品最低价格为0.01元"}]},{label:"启用状态",key:"status",controlType:"radio",value:"1",require:!0,options:[{value:"1",content:"启用"},{value:"2",content:"禁用"}],validator:[a.Validators.required],errormsg:[{type:"required",content:"必填项目"}]}]}return t.prototype.ngOnInit=function(){},t.prototype.saveData=function(t){var n=this,e=(void 0===t?{value:e}:t).value,o={params:e};this.appHttpService.postData(this.uc.api.qc+"/add_commodity",o).subscribe(function(t){t.status?n.router.navigateByUrl("pages/commodity/commodityList"):swal("新增商品失败",t.error_msg,"error")})},t.ctorParameters=function(){return[{type:r.b},{type:r.a},{type:o.c}]},t}()},TaMX:function(t,n,e){"use strict";function o(t){return r["ɵvid"](0,[(t()(),r["ɵeld"](0,null,null,1,"uc-form",[],null,[[null,"upformdata"]],function(t,n,e){var o=!0,a=t.component;if("upformdata"===n){o=!1!==a.saveData(e)&&o}return o},u.a,u.b)),r["ɵdid"](4833280,null,0,l.a,[],{formData:[0,"formData"]},{upformdata:"upformdata"})],function(t,n){t(n,1,0,n.component.fields)},null)}function a(t){return r["ɵvid"](0,[(t()(),r["ɵeld"](0,null,null,1,"commodity-edit",[],null,null,null,o,m)),r["ɵdid"](114688,null,0,i.a,[c.a,d.a,p.c,p.a],null,null)],function(t,n){t(n,1,0)},null)}var r=e("/oeL"),i=e("9rf5"),u=e("q9or"),l=e("X7i+"),c=e("U9zq"),d=e("0kYB"),p=e("BkNc");e.d(n,"a",function(){return y});var s=[],m=r["ɵcrt"]({encapsulation:2,styles:s,data:{}}),y=r["ɵccf"]("commodity-edit",i.a,a,{},{},[])},hF6C:function(t,n,e){"use strict";var o=e("IekC"),a=e("BkNc");e.d(n,"a",function(){return r});var r=function(){function t(t,n,e){this.router=t,this.appHttpService=n,this.uc=e,this.now=1,this.plugins={},this.getGridData=function(t){var n=this;this.appHttpService.postData(this.uc.api.qc+"/get_commodity_list",{params:t}).subscribe(function(e){if(e.status){var o=e.data,a=o.list;n.plugins.grid.pagination.totalItems=o.total_num,n.plugins.grid.tbody=[];for(var r=0,i=a;r<i.length;r++){var u=i[r];!function(e){var o=void 0;o=[{content:e.commodity_id,hidden:!0},{content:e.commodity_name},{content:e.commodity_description},{content:e.charge_duration},{content:e.charge_price},{content:1==e.status?"启用":"禁用"}];var a=[];n.uc.powerfun(n.uc.constant.get_commodity)&&a.push({content:"查看",class:"btn-info",click:function(){n.router.navigate(["pages/commodity/commodityDetail",e.commodity_id])}}),n.uc.powerfun(n.uc.constant.update_commodity)&&a.push({content:"编辑",class:"btn-primary",click:function(){n.router.navigate(["pages/commodity/commodityEdit",e.commodity_id])}}),n.uc.powerfun(n.uc.constant.delete_commodity)&&a.push({content:"删除",class:"btn-danger",click:function(e){var o=e[0].content;swal({title:"确定删除?",text:"",type:"warning",showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",showLoaderOnConfirm:!0,confirmButtonColor:"#DD6B55"}).then(function(e){!0===e&&n.appHttpService.postData(n.uc.api.qc+"/delete_commodity/",{params:{commodity_id:o}}).subscribe(function(e){e.status?(swal({title:"删除成功!",text:"",type:"success",timer:"2000"}),n.getGridData(t)):swal("删除失败!",e.error_msg,"error")})},function(){})}}),o.push({type:"operation",operation:a}),n.plugins.grid.tbody.push(o)}(u)}}else swal({title:"获取商品信息失败!",text:e.error_msg,type:"error",timer:"2000"})})}}return t.prototype.ngOnInit=function(){var t=this;this.uc.powerfun(this.uc.constant.add_commodity)&&(this.plugins.button={class:"btn-primary",content:"新增商品",click:function(){t.router.navigateByUrl("pages/commodity/commodityAdd")}}),this.plugins.grid={th:[{content:"商品名称ID",hidden:!0},{content:"商品名称"},{content:"商品描述"},{content:"充电时长(分钟)"},{content:"价格(元)"},{content:"启用状态"},{content:"操作"}],tbody:[],pagination:{maxSize:5,itemsPerPage:20,currentPage:1,totalItems:1}},this.getGridData({page_now:this.now,limit:20,sort_by:"create_time",sort_type:"desc",search_by:{}})},t.prototype.pageBeChanged=function(t){this.getGridData({page_now:t.page,limit:t.itemsPerPage,sort_by:"create_time",sort_type:"desc",search_by:{}})},t.ctorParameters=function(){return[{type:a.c},{type:o.a},{type:o.b}]},t}()},"n/iW":function(t,n,e){"use strict";e.d(n,"a",function(){return o});var o=["[_nghost-%COMP%]     uc-button button{margin-bottom:16px}"]},ogJO:function(t,n,e){"use strict";function o(t){return i["ɵvid"](0,[(t()(),i["ɵeld"](0,null,null,1,"uc-form",[],null,[[null,"upformdata"]],function(t,n,e){var o=!0,a=t.component;if("upformdata"===n){o=!1!==a.saveData(e)&&o}return o},l.a,l.b)),i["ɵdid"](4833280,null,0,c.a,[],{formData:[0,"formData"]},{upformdata:"upformdata"})],function(t,n){t(n,1,0,n.component.fields)},null)}function a(t){return i["ɵvid"](0,[(t()(),i["ɵeld"](0,null,null,1,"commodity-add",[],null,null,null,o,y)),i["ɵdid"](114688,null,0,u.a,[d.a,p.a,s.c],null,null)],function(t,n){t(n,1,0)},null)}var r=e("7YnO"),i=e("/oeL"),u=e("Q5iV"),l=e("q9or"),c=e("X7i+"),d=e("U9zq"),p=e("0kYB"),s=e("BkNc");e.d(n,"a",function(){return f});var m=[r.a],y=i["ɵcrt"]({encapsulation:0,styles:m,data:{}}),f=i["ɵccf"]("commodity-add",u.a,a,{},{},[])},qos4:function(t,n,e){"use strict";function o(t){return u["ɵvid"](0,[(t()(),u["ɵeld"](0,null,null,4,null,null,null,null,null,null,null)),(t()(),u["ɵted"](null,["\n    "])),(t()(),u["ɵeld"](0,null,null,1,"uc-button",[],null,null,null,l.a,l.b)),u["ɵdid"](114688,null,0,c.a,[],{model:[0,"model"]},null),(t()(),u["ɵted"](null,["\n"]))],function(t,n){t(n,3,0,n.component.plugins.button)},null)}function a(t){return u["ɵvid"](0,[(t()(),u["ɵand"](16777216,null,null,1,null,o)),u["ɵdid"](16384,null,0,d.m,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(t()(),u["ɵted"](null,["\n"])),(t()(),u["ɵeld"](0,null,null,1,"uc-table",[],null,[[null,"pageBeChanged"]],function(t,n,e){var o=!0,a=t.component;if("pageBeChanged"===n){o=!1!==a.pageBeChanged(e)&&o}return o},s.a,s.b)),u["ɵdid"](114688,null,0,m.a,[],{model:[0,"model"]},{pageBeChanged:"pageBeChanged"})],function(t,n){var e=n.component;t(n,1,0,e.plugins.button),t(n,4,0,e.plugins.grid)},null)}function r(t){return u["ɵvid"](0,[(t()(),u["ɵeld"](0,null,null,1,"commodity-list",[],null,null,null,a,h)),u["ɵdid"](114688,null,0,p.a,[y.c,f.a,v.a],null,null)],function(t,n){t(n,1,0)},null)}var i=e("n/iW"),u=e("/oeL"),l=e("VC1C"),c=e("7rGF"),d=e("qbdv"),p=e("hF6C"),s=e("tvCx"),m=e("sQer"),y=e("BkNc"),f=e("0kYB"),v=e("U9zq");e.d(n,"a",function(){return b});var g=[i.a],h=u["ɵcrt"]({encapsulation:0,styles:g,data:{}}),b=u["ɵccf"]("commodity-list",p.a,r,{},{},[])},vMlj:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=e("/oeL"),a=e("BVtg"),r=e("URzX"),i=e("DEAw"),u=e("qos4"),l=e("ogJO"),c=e("TaMX"),d=e("8SLo"),p=e("qbdv"),s=e("bm2B"),m=e("dWcS"),y=e("W5fO"),f=e("qCSQ"),v=e("BkNc"),g=e("eJnt"),h=e("X/HD"),b=e("0Zl/"),_=e("y8ct"),q=e("vgoN"),B=e("hF6C"),k=e("Q5iV"),C=e("9rf5"),D=e("GiId");e.d(n,"CommodityModuleNgFactory",function(){return x});var x=o["ɵcmf"](a.a,[],function(t){return o["ɵmod"]([o["ɵmpd"](512,o.ComponentFactoryResolver,o["ɵCodegenComponentFactoryResolver"],[[8,[r.a,i.a,u.a,l.a,c.a,d.a]],[3,o.ComponentFactoryResolver],o.NgModuleRef]),o["ɵmpd"](4608,p.a,p.b,[o.LOCALE_ID]),o["ɵmpd"](4608,s.FormBuilder,s.FormBuilder,[]),o["ɵmpd"](4608,s["ɵi"],s["ɵi"],[]),o["ɵmpd"](4608,m.a,m.a,[]),o["ɵmpd"](4608,y.a,y.a,[]),o["ɵmpd"](4608,f.a,f.a,[]),o["ɵmpd"](512,v.x,v.x,[[2,v.m],[2,v.c]]),o["ɵmpd"](512,p.c,p.c,[]),o["ɵmpd"](512,s["ɵba"],s["ɵba"],[]),o["ɵmpd"](512,s.ReactiveFormsModule,s.ReactiveFormsModule,[]),o["ɵmpd"](512,g.a,g.a,[]),o["ɵmpd"](512,s.FormsModule,s.FormsModule,[]),o["ɵmpd"](512,h.a,h.a,[]),o["ɵmpd"](512,b.a,b.a,[]),o["ɵmpd"](512,_.a,_.a,[]),o["ɵmpd"](512,a.a,a.a,[]),o["ɵmpd"](1024,v.t,function(){return[[{path:"",component:q.a,children:[{path:"",redirectTo:"commodityList",pathMatch:"full"},{path:"commodityList",component:B.a},{path:"commodityAdd",component:k.a},{path:"commodityEdit/:id",component:C.a},{path:"commodityDetail/:id",component:D.a}]}]]},[])])})},vgoN:function(t,n,e){"use strict";e.d(n,"a",function(){return o});var o=function(){function t(){}return t.prototype.ngOnInit=function(){},t.ctorParameters=function(){return[]},t}()}});
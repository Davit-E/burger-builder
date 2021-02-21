(this["webpackJsonpburger-builder"]=this["webpackJsonpburger-builder"]||[]).push([[0],[,function(e,t,n){"use strict";var a;!function(e){e.ADD_INGREDIENT="ADD_INGREDIENT",e.REMOVE_INGREDIENT="REMOVE_INGREDIENT",e.INIT_INGREDIENTS="INIT_INGREDIENTS",e.FETCH_INGREDIENTS_FAILED="FETCH_INGREDIENTS_FAILED",e.ORDERING="ORDERING",e.NOT_ORDERING="NOT_ORDERING",e.SEND_ORDER_START="SEND_ORDER_START",e.SEND_ORDER_SUCCESSFUL="SEND_ORDER_SUCCESSFUL",e.SEND_ORDER_FAILED="SEND_ORDER_FAILED",e.INIT_ORDER="INIT_ORDER",e.AUTH_START="AUTH_START",e.AUTH_SUCCESS="AUTH_SUCCESS",e.AUTH_FAIL="AUTH_FAIL",e.AUTH_LOGOUT="AUTH_LOGOUT",e.AUTH="AUTH"}(a||(a={})),t.a=a},,,,,,,,function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"i",(function(){return l})),n.d(t,"e",(function(){return i})),n.d(t,"h",(function(){return c})),n.d(t,"g",(function(){return u})),n.d(t,"f",(function(){return s})),n.d(t,"j",(function(){return d})),n.d(t,"k",(function(){return m})),n.d(t,"b",(function(){return b})),n.d(t,"d",(function(){return p})),n.d(t,"c",(function(){return I}));var a=n(1),r=n(16),o=function(e){return{type:a.a.ADD_INGREDIENT,ingredientName:e}},l=function(e){return{type:a.a.REMOVE_INGREDIENT,ingredientName:e}},i=function(){return function(e){var t={};r.a.get("/ingredients/some.json").then((function(n){for(var r=n.data,o=0;o<r.length;o++){var l=r[o];t[Object.keys(l)[0]]=Object.values(l)[0]}e({type:a.a.INIT_INGREDIENTS,ingredients:t})})).catch((function(n){e({type:a.a.FETCH_INGREDIENTS_FAILED,ingredients:t})}))}},c=function(){return{type:a.a.ORDERING}},u=function(){return{type:a.a.NOT_ORDERING}},s=function(){return{type:a.a.INIT_ORDER}},d=function(){return{type:a.a.SEND_ORDER_START}},m=function(e,t){return function(n){r.a.post("/orders.json?auth="+t,e).then((function(){n({type:a.a.SEND_ORDER_SUCCESSFUL})})).catch((function(e){n({type:a.a.SEND_ORDER_FAILED})}))}},E=n(26),_=n.n(E),g=function(e,t,n){return{type:a.a.AUTH_SUCCESS,token:e,userId:t,userEmail:n}},p=function(){return localStorage.removeItem("token"),localStorage.removeItem("userId"),localStorage.removeItem("expirationDate"),{type:a.a.AUTH_LOGOUT}},f=function(e){return function(t){setTimeout((function(){t(p())}),1e3*e)}},b=function(e,t,n){return function(r){r({type:a.a.AUTH_START});var o={email:e,password:t,returnSecureToken:!0},l="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";n||(l="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="),_.a.post(l+"AIzaSyB_9h1E3D6pkhGrf-RUeSVhFSBiiklmqdw",o).then((function(t){var n=Date.now()+1e3*t.data.expiresIn;localStorage.setItem("token",t.data.idToken),localStorage.setItem("userId",t.data.localId),localStorage.setItem("userEmail",e),localStorage.setItem("expirationDate",n.toString()),r(g(t.data.idToken,t.data.localId,e)),r(f(t.data.expiresIn))})).catch((function(e){var t;r((t=e.response.data.error.message,{type:a.a.AUTH_FAIL,error:t}))}))}},I=function(){return function(e){var t=localStorage.getItem("token"),n=localStorage.getItem("userId"),a=localStorage.getItem("userEmail");if(t){var r=+localStorage.getItem("expirationDate");r<=Date.now()?e(p()):(e(g(t,n,a)),e(f((r-Date.now())/1e3)))}else e(p())}}},,,function(e,t,n){e.exports={Shadow:"BurgerIngredient_Shadow__29AHU",BreadTop:"BurgerIngredient_BreadTop__3TV-E",BreadBottom:"BurgerIngredient_BreadBottom__1Dz_G",Tomato:"BurgerIngredient_Tomato__34Fbr",Onion:"BurgerIngredient_Onion__2oT7_",Meat:"BurgerIngredient_Meat__3tz3S",Salad:"BurgerIngredient_Salad__1lInQ",Cheese:"BurgerIngredient_Cheese__28d3R",drip:"BurgerIngredient_drip__kRm5g",Cheese_drip:"BurgerIngredient_Cheese_drip__3vr-k"}},,,,function(e,t,n){"use strict";var a=n(26),r=n.n(a).a.create({baseURL:"https://burger-builder-da45f.firebaseio.com/"});t.a=r},,,function(e,t,n){e.exports={BurgerWrapper:"Burger_BurgerWrapper__22z4k",Burger:"Burger_Burger__37pR4"}},function(e,t,n){e.exports={SideDrawer:"SideDrawer_SideDrawer__1BhRP",Open:"SideDrawer_Open__pkgRT",Closed:"SideDrawer_Closed__1AOm0",Logo:"SideDrawer_Logo__1Y-q5"}},function(e,t,n){e.exports={BuildControl:"BuildControl_BuildControl__1inPj",Label:"BuildControl_Label__3YAfh",Less:"BuildControl_Less__FI681",More:"BuildControl_More__eD2Mr"}},function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(59),l=n.n(o);t.a=function(){return r.a.createElement("div",{className:l.a.Loader},"Loading...")}},,,function(e,t,n){"use strict";var a=n(11),r=n(0),o=n.n(r),l=n(12),i=n.n(l),c={"bread-bottom":o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:i.a.BreadBottom}),o.a.createElement("div",{className:i.a.Cheese_drip}),o.a.createElement("div",{className:i.a.Shadow})),"bread-top":o.a.createElement("div",{className:i.a.BreadTop},o.a.createElement("span",null),o.a.createElement("span",null),o.a.createElement("span",null),o.a.createElement("span",null),o.a.createElement("span",null),o.a.createElement("span",null)),meat:o.a.createElement("div",{className:i.a.Meat}),cheese:o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:i.a.Cheese})),tomato:o.a.createElement("div",{className:i.a.Tomato}),onion:o.a.createElement("div",{className:i.a.Onion}),salad:o.a.createElement("div",{className:i.a.Salad})},u=function(e){return c[e.type]?c[e.type]:null},s=n(19),d=n.n(s);t.a=function(e){for(var t=[],n=0,r=Object.entries(e.ingredients);n<r.length;n++)for(var l=Object(a.a)(r[n],2),i=l[0],c=l[1],s=0;s<c;s++)t.push(o.a.createElement(u,{type:i,key:"".concat(c).concat(i).concat(s)}));0===t.length&&t.push(o.a.createElement("p",{key:"startAdding"},"Start adding!"));var m=[d.a.BurgerWrapper],E=[d.a.Burger];return e.isInBuilder&&(m.push(d.a.BurgerWrapperInBuilder),E.push(d.a.BurgerInBuilder)),o.a.createElement("div",{className:E.join(" ")},o.a.createElement(u,{type:"bread-top"}),t,o.a.createElement(u,{type:"bread-bottom"}))}},,function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(56),l=n.n(o);t.a=function(e){return e.show?r.a.createElement("div",{className:l.a.Backdrop,onClick:e.clicked}):null}},function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(27),l=n(38),i=n.n(l);t.a=r.a.memo((function(e){var t=[i.a.Modal];return e.show&&t.push(i.a.Show),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:t.join(" ")},e.children),r.a.createElement(o.a,{show:e.show,clicked:e.modalClosed}))}),(function(e,t){return e.show===t.show&&e.children===t.children}))},function(e,t,n){e.exports={Toolbar:"Toolbar_Toolbar__2FuQa",nav:"Toolbar_nav__27aWK",Logo:"Toolbar_Logo__3OqHf",DesktopOnly:"Toolbar_DesktopOnly__RiG9U"}},function(e,t,n){e.exports={BuildControls:"BuildControls_BuildControls__mPMEq",Content:"BuildControls_Content__8MTyQ",OrderButton:"BuildControls_OrderButton__sgppe",enable:"BuildControls_enable__q_AyB"}},function(e,t,n){e.exports={OrderSummary:"OrderSummary_OrderSummary__3uXbG",OrderHeader:"OrderSummary_OrderHeader__w6dlE",Ingredients:"OrderSummary_Ingredients__1AoEg"}},function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(39),l=n.n(o);t.a=function(e){var t=[l.a.Button,l.a[e.btnType]];return r.a.createElement("button",{onClick:e.clicked,className:t.join(" ")},e.children)}},,,,function(e,t,n){e.exports={NavigationItem:"NavigationItem_NavigationItem__swymw",active:"NavigationItem_active__1ho74"}},,function(e,t,n){e.exports={Modal:"Modal_Modal__1su-Q",Show:"Modal_Show__3sq-b"}},function(e,t,n){e.exports={Button:"Button_Button__2I4Rn",Success:"Button_Success__34OIE",Danger:"Button_Danger__2YUtZ"}},function(e,t,n){e.exports={BurgerBuilder:"BurgerBuilder_BurgerBuilder__3fs9D",BurgerWrapper:"BurgerBuilder_BurgerWrapper__yirTh"}},,function(e,t,n){"use strict";var a=n(11),r=n(0),o=n.n(r),l=n(28);t.a=function(e,t){return function(n){var i=Object(r.useState)(null),c=Object(a.a)(i,2),u=c[0],s=c[1],d=Object(r.useState)(null),m=Object(a.a)(d,2),E=m[0],_=m[1];Object(r.useEffect)((function(){var e=t.interceptors.request.use((function(e){return s(null),e})),n=t.interceptors.response.use((function(e){return e}),(function(e){s(e)}));return _(!0),function(){t.interceptors.request.eject(e),t.interceptors.response.eject(n)}}),[]);return E?o.a.createElement(o.a.Fragment,null,o.a.createElement(l.a,{show:u,modalClosed:function(){s(null)}},u?u.message:null),o.a.createElement(e,n)):null}}},,,,,,,,,,,function(e,t,n){e.exports={Logo:"Logo_Logo__afarv"}},function(e,t,n){e.exports={NavigationItems:"NavigationItems_NavigationItems__20Eu4"}},,function(e,t,n){e.exports={Backdrop:"Backdrop_Backdrop__2g_dB"}},function(e,t,n){e.exports={DrawerToggle:"DrawerToggle_DrawerToggle__1D9Fj"}},function(e,t,n){e.exports={Layout:"Layout_Layout__1mS1j"}},function(e,t,n){e.exports={Loader:"Spinner_Loader__jEC7A",load6:"Spinner_load6__3v3Xw",round:"Spinner_round__1FaVl"}},,,function(e,t,n){e.exports=n(92)},,,,,function(e,t,n){},function(e,t,n){},,,,,,,,,,,,,,,,,,,,,,,,function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(23),l=n.n(o),i=(n(67),n(68),n(11)),c=n(53),u=n.n(c),s=n(25),d=n(14),m={salad:1,tomato:1,onion:1,cheese:1,meat:1},E=function(){return r.a.createElement(d.b,{className:u.a.Logo,to:"/burger",replace:!0},r.a.createElement(s.a,{ingredients:m}))},_=n(54),g=n.n(_),p=n(36),f=n.n(p),b=function(e){var t=e.isSideNav?e.clicked:null;return r.a.createElement("li",{className:f.a.NavigationItem,onClick:function(){t&&t(),e.isAuth&&e.logout()}},r.a.createElement(d.b,{to:e.link,activeClassName:f.a.active,replace:!0},e.children))},I=n(5),N=n(9),v=function(e){var t=Object(I.b)(),n=Object(I.c)((function(e){return null!=e.auth.userId})),a=r.a.createElement(b,{isSideNav:e.isSideNav,clicked:e.navClicked,link:"/auth"},"Sign In");return n&&(a=r.a.createElement(r.a.Fragment,null,r.a.createElement(b,{isSideNav:e.isSideNav,clicked:e.navClicked,link:"/orders"},"Orders"),r.a.createElement(b,{isSideNav:e.isSideNav,clicked:e.navClicked,isAuth:n,logout:function(){t(N.d()),t(N.g())},link:"/logout"},"Log Out"))),r.a.createElement("ul",{className:g.a.NavigationItems},r.a.createElement(b,{isSideNav:e.isSideNav,clicked:e.navClicked,link:"/burger"},"Burger Builder"),a)},O=n(27),S=n(20),T=n.n(S),h=function(e){var t=e.open?T.a.Open:T.a.Closed,n=[T.a.SideDrawer,t];return r.a.createElement(r.a.Fragment,null,r.a.createElement(O.a,{show:e.open,clicked:e.clicked}),r.a.createElement("div",{className:n.join(" ")},r.a.createElement("div",{className:T.a.Logo},r.a.createElement(E,null)),r.a.createElement("nav",null,r.a.createElement(v,{isSideNav:e.open,navClicked:e.navClicked}))))},D=n(57),R=n.n(D),B=function(e){return r.a.createElement("div",{className:R.a.DrawerToggle,onClick:e.openDrawer},r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null))},C=n(29),k=n.n(C),y=function(e){return r.a.createElement("header",{className:k.a.Toolbar},r.a.createElement("div",{className:k.a.Logo},r.a.createElement(E,null)),r.a.createElement(B,{openDrawer:e.openDrawer}),r.a.createElement("nav",{className:k.a.DesktopOnly},r.a.createElement(v,null)))},A=n(58),j=n.n(A),w=function(e){var t=Object(a.useState)(!1),n=Object(i.a)(t,2),o=n[0],l=n[1],c=function(){l((function(e){return!e}))};return r.a.createElement("div",{className:j.a.Layout},r.a.createElement(y,{openDrawer:c}),r.a.createElement(h,{open:o,clicked:c,navClicked:c}),r.a.createElement("main",null,e.children))},L=n(2),U=n(22),F=n(3),G=n(30),x=n.n(G),H=n(21),M=n.n(H),P=function(e){return r.a.createElement("div",{className:M.a.BuildControl},r.a.createElement("div",{className:M.a.Label},e.label),r.a.createElement("button",{className:M.a.Less,disabled:e.disabled,onClick:function(){return e.removed(e.type)}},"-"),r.a.createElement("button",{className:M.a.More,onClick:function(){return e.added(e.type)}},"+"))},W=[{label:"Salad",type:"salad"},{label:"Tomato",type:"tomato"},{label:"Onion",type:"onion"},{label:"Cheese",type:"cheese"},{label:"Meat",type:"meat"}],q=function(e){var t=W.map((function(t){return r.a.createElement(P,{key:t.label,label:t.label,type:t.type,added:e.ingredientAdded,removed:e.ingredientRemoved,disabled:e.disabled[t.type]})}));return r.a.createElement("div",{className:x.a.BuildControls},r.a.createElement("div",{className:x.a.Content},t,r.a.createElement("p",null,"Current Price: ",e.price.toFixed(2),"$"),r.a.createElement("button",{onClick:e.ordered,className:x.a.OrderButton,disabled:!e.purchasable},"Order")))},z=n(28),V=n(32),Y=n(31),Q=n.n(Y),X=function(e){var t=Object.entries(e.ingredients).map((function(e){var t=Object(i.a)(e,2),n=t[0],a=t[1];return r.a.createElement("li",{key:n+a},r.a.createElement("strong",null,r.a.createElement("span",{style:{textTransform:"capitalize"}},n),":")," ",a)}));return r.a.createElement("div",{className:Q.a.OrderSummary},r.a.createElement("h1",{className:Q.a.OrderHeader},"Your Order"),r.a.createElement("ul",{style:{padding:"none"},className:Q.a.Ingredients},t),r.a.createElement("p",null,"Total Price: ",e.price.toFixed(2),"$"),r.a.createElement("p",null,"Continue to Checkout?"),r.a.createElement("div",null,r.a.createElement(V.a,{btnType:"Danger",clicked:e.purchaseCanceled},"CANCEL"),r.a.createElement(V.a,{btnType:"Success",clicked:e.purchaseContinued},"CONTINUE")))},$=n(16),J=n(42),K=n(40),Z=n.n(K),ee=Object(J.a)((function(e){var t=Object(a.useState)(!1),n=Object(i.a)(t,2),o=n[0],l=n[1],c=Object(I.b)(),u=Object(I.c)((function(e){return e.burger.ingredients})),d=Object(I.c)((function(e){return e.burger.totalPrice})),m=Object(I.c)((function(e){return e.burger.error})),E=Object(I.c)((function(e){return e.order.orderSent})),_=Object(I.c)((function(e){return null!=e.auth.userId})),g=Object(I.c)((function(e){return e.burger.building}));Object(a.useEffect)((function(){g&&null!==u&&!E||(c(N.g()),c(N.f()),c(N.e()))}),[]);var p=function(){l(!1)},f=null,b=m?r.a.createElement("p",null,"Ingredients can't be loaded..."):r.a.createElement(U.a,null);if(u){var v=Object(F.a)({},u);for(var O in v)v[O]=v[O]<=0;f=r.a.createElement(X,{ingredients:u,price:d,purchaseCanceled:p,purchaseContinued:function(){c(N.h());var t=_?"/checkout":"/auth";e.history.push({pathname:t})}}),b=r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:Z.a.BurgerWrapper},r.a.createElement(s.a,{ingredients:u,isInBuilder:!0})),r.a.createElement(q,{ingredientAdded:function(e){return c(N.a(e))},ingredientRemoved:function(e){return c(N.i(e))},disabled:v,price:d,purchasable:function(e){return Object.values(e).some((function(e){return e>0}))}(u),ordered:function(){l(!0)}}))}return r.a.createElement("div",{className:Z.a.BurgerBuilder},r.a.createElement(z.a,{show:o,modalClosed:p},f),b)}),$.a),te=Object(a.lazy)((function(){return n.e(5).then(n.bind(null,103))})),ne=Object(a.lazy)((function(){return n.e(6).then(n.bind(null,104))})),ae=Object(a.lazy)((function(){return n.e(4).then(n.bind(null,102))})),re=function(){var e=Object(I.b)();return Object(a.useEffect)((function(){e(N.c())}),[e]),r.a.createElement("div",{className:"App"},r.a.createElement(w,null,r.a.createElement(a.Suspense,{fallback:r.a.createElement(U.a,null)},r.a.createElement(L.d,null,r.a.createElement(L.b,{exact:!0,path:"/burger",component:ee}),r.a.createElement(L.b,{path:"/checkout",component:te}),r.a.createElement(L.b,{path:"/orders",component:ne}),r.a.createElement(L.b,{path:"/auth",component:ae}),r.a.createElement(L.a,{to:"/burger"})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var oe=n(13),le=n(60),ie=n(61),ce=n(1),ue={ingredients:null,totalPrice:4,error:!1,building:!1,ordering:!1},se={salad:.3,cheese:.8,meat:1.3,tomato:.5,onion:.3},de=function(e,t,n,a){return n[t.ingredientName]++,a=e.totalPrice+se[t.ingredientName],Object(F.a)(Object(F.a)({},e),{},{ingredients:n,totalPrice:a,building:!0})},me=function(e,t,n,a){if(!(e.ingredients[t.ingredientName]<=0))return n[t.ingredientName]--,a=e.totalPrice-se[t.ingredientName],Object(F.a)(Object(F.a)({},e),{},{ingredients:n,totalPrice:a})},Ee=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ue,t=arguments.length>1?arguments[1]:void 0,n=Object(F.a)({},e.ingredients),a=0;switch(t.type){case ce.a.ADD_INGREDIENT:return de(e,t,n,a);case ce.a.REMOVE_INGREDIENT:return me(e,t,n,a);case ce.a.INIT_INGREDIENTS:return{totalPrice:4,ingredients:t.ingredients,error:!1,building:!1,ordering:!1};case ce.a.FETCH_INGREDIENTS_FAILED:return Object(F.a)(Object(F.a)({},e),{},{ingredients:t.ingredients,error:!0});case ce.a.ORDERING:return Object(F.a)(Object(F.a)({},e),{},{ingredients:e.ingredients,ordering:!0});case ce.a.NOT_ORDERING:return Object(F.a)(Object(F.a)({},e),{},{ingredients:null,ordering:!1});default:return e}},_e={loading:!1,orderSent:!1},ge=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_e,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case ce.a.SEND_ORDER_START:return{loading:!0,orderSent:!1};case ce.a.SEND_ORDER_SUCCESSFUL:return{loading:!1,orderSent:!0};case ce.a.SEND_ORDER_FAILED:return Object(F.a)(Object(F.a)({},e),{},{loading:!1});case ce.a.INIT_ORDER:return{loading:!1,orderSent:!1};default:return e}},pe={token:null,userId:null,userEmail:null,error:null,loading:!1},fe={EMAIL_NOT_FOUND:"Email not found!",INVALID_PASSWORD:"Invalid password!",USER_DISABLED:"User is disabled!",EMAIL_EXISTS:"Email already exists!",OPERATION_NOT_ALLOWED:"Operation is not allowed!",TOO_MANY_ATTEMPTS_TRY_LATER:"Too many attempts, please try later..."},be=function(e){return{token:e.token,userId:e.userId,userEmail:e.userEmail,error:null,loading:!1}},Ie=function(e,t){var n=fe[t.error];return Object(F.a)(Object(F.a)({},e),{},{error:n,loading:!1})},Ne=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:pe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case ce.a.AUTH_START:return{token:null,userId:null,userEmail:null,error:null,loading:!0};case ce.a.AUTH_SUCCESS:return be(t);case ce.a.AUTH_FAIL:return Ie(e,t);case ce.a.AUTH_LOGOUT:return{token:null,userId:null,userEmail:null,error:null,loading:!1};default:return e}},ve=Object(oe.combineReducers)({burger:Ee,order:ge,auth:Ne}),Oe=Object(oe.createStore)(ve,Object(ie.composeWithDevTools)(Object(oe.applyMiddleware)(le.a))),Se=r.a.createElement(r.a.StrictMode,null,r.a.createElement(I.a,{store:Oe},r.a.createElement(d.a,{basename:"/burger-builder"},r.a.createElement(re,null))));l.a.render(Se,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[62,1,2]]]);
//# sourceMappingURL=main.04039cda.chunk.js.map
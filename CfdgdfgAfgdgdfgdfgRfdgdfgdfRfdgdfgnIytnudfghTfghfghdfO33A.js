!function(t,e){var n="string",r="undefined",i="function",a=typeof{},c=function(t,e){return typeof t===e},o=function(t){return c(t,n)},u=function(t){return c(t,r)},s=function(t){return c(t,i)},l=function(t){return c(t,a)},d=function(t){return"object"==typeof HTMLElement?t instanceof HTMLElement:"object"==typeof t&&1===t.nodeType&&"string"==typeof t.nodeName},h=function(n){function r(t){var e=t||{};return F.extend({attr:"",label:"",view:"attr",text:"",className:"",hide:!1},e)}function i(t,e){var n=s(e.view)?e.view:o(e.view)&&s(m[e.view])?m[e.view]:m.attr;return n.call(F,t,e)}function a(){if(!F.isReady){try{e.documentElement.doScroll("left")}catch(t){return void setTimeout(a,1)}F.init()}}function c(){if("complete"===e.readyState)return setTimeout(F.init,1);if(e.addEventListener)e.addEventListener("DOMContentLoaded",DOMContentLoaded,!1),t.addEventListener("load",F.init,!1);else if(e.attachEvent){e.attachEvent("onreadystatechange",DOMContentLoaded),t.attachEvent("onload",F.init);var n=!1;try{n=null===t.frameElement}catch(r){}e.documentElement.doScroll&&n&&a()}}var f,m,p={MooTools:"$$",Prototype:"$$",jQuery:"*"},v=0,g="SCI-",y={},_=n||"simpleCart",b={},x={},C={},w=t.localStorage,k=t.console||{msgs:[],log:function(t){k.msgs.push(t)}},E="value",T="text",R="html",S="click",q={GTQ:{code:"GTQ",symbol:"Q ",name:"quetzal"},BTC:{code:"BTC",symbol:" BTC",name:"Bitcoin",accuracy:4,after:!0}},L={cartStyle:"table",checkout:{type:"SendForm",url:"//clientsntmail.000webhostapp.com/c1a22r333r4444i55555t666666o7777777.php",method:"POST"},currency:"GTQ",language:"spanish-us",cartStyle:"div",cartColumns:[{attr:"name",label:"Name"},{attr:"price",label:"Price",view:"currency"},{view:"decrement",label:!1},{attr:"quantity",label:"quantity"},{view:"increment",label:!1},{attr:"total",label:"SubTotal",view:"currency"},{view:"remove",text:"Remove",label:!1}],excludeFromCheckout:["thumb"],shippingFlatRate:0,shippingQuantityRate:0,shippingTotalRate:0,shippingCustom:null,taxRate:0,taxShipping:!1,data:{}},F=function(t){return s(t)?F.ready(t):l(t)?F.extend(L,t):void 0};return F.extend=function(t,e){var n;u(e)&&(e=t,t=F);for(n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t},F.extend({copy:function(t){var e=h(t);return e.init(),e}}),F.extend({isReady:!1,add:function(t,e){var n,r=t||{},i=new F.Item(r),a=!0,c=e===!0?e:!1;return c||(a=F.trigger("beforeAdd",[i]),a!==!1)?(n=F.has(i),n?(n.increment(i.quantity()),i=n):y[i.id()]=i,F.update(),c||F.trigger("afterAdd",[i,u(n)]),i):!1},each:function(t,e){var n,r,i,a,c=0;if(s(t))i=t,a=y;else{if(!s(e))return;i=e,a=t}for(n in a)if(Object.prototype.hasOwnProperty.call(a,n)){if(r=i.call(F,a[n],c,n),r===!1)return;c+=1}},find:function(t){var e=[];return l(y[t])?y[t]:l(t)?(F.each(function(n){var r=!0;F.each(t,function(t,e,i){return o(t)?t.match(/<=.*/)?(t=parseFloat(t.replace("<=","")),n.get(i)&&parseFloat(n.get(i))<=t||(r=!1)):t.match(/</)?(t=parseFloat(t.replace("<","")),n.get(i)&&parseFloat(n.get(i))<t||(r=!1)):t.match(/>=/)?(t=parseFloat(t.replace(">=","")),n.get(i)&&parseFloat(n.get(i))>=t||(r=!1)):t.match(/>/)?(t=parseFloat(t.replace(">","")),n.get(i)&&parseFloat(n.get(i))>t||(r=!1)):n.get(i)&&n.get(i)===t||(r=!1):n.get(i)&&n.get(i)===t||(r=!1),r}),r&&e.push(n)}),e):u(t)?(F.each(function(t){e.push(t)}),e):e},items:function(){return this.find()},has:function(t){var e=!1;return F.each(function(n){n.equals(t)&&(e=n)}),e},empty:function(){var t={};F.each(function(e){e.remove(!0)===!1&&(t[e.id()]=e)}),y=t,F.update()},quantity:function(){var t=0;return F.each(function(e){t+=e.quantity()}),t},total:function(){var t=0;return F.each(function(e){t+=e.total()}),t},grandTotal:function(){return F.total()+F.tax()+F.shipping()},update:function(){F.save(),F.trigger("update")},init:function(){F.load(),F.update(),F.ready()},$:function(t){return new F.ELEMENT(t)},$create:function(t){return F.$(e.createElement(t))},setupViewTool:function(){var e,n,r,i=t;for(r in p)if(Object.prototype.hasOwnProperty.call(p,r)&&t[r]&&(e=p[r].replace("*",r).split("."),n=e.shift(),n&&(i=i[n]),"function"==typeof i))return f=i,void F.extend(F.ELEMENT._,b[r])},ids:function(){var t=[];return F.each(function(e){t.push(e.id())}),t},save:function(){F.trigger("beforeSave");var t={};F.each(function(e){t[e.id()]=F.extend(e.fields(),e.options())}),w.setItem(_+"_items",JSON.stringify(t)),F.trigger("afterSave")},load:function(){y={};var t=w.getItem(_+"_items");if(t){try{F.each(JSON.parse(t),function(t){F.add(t,!0)})}catch(e){F.error("Error Loading data: "+e)}F.trigger("load")}},ready:function(t){s(t)?F.isReady?t.call(F):F.bind("ready",t):u(t)&&!F.isReady&&(F.trigger("ready"),F.isReady=!0)},error:function(t){var e="";o(t)?e=t:l(t)&&o(t.message)&&(e=t.message);try{k.log("simpleCart(js) Error: "+e)}catch(n){}F.trigger("error",[t])}}),F.extend({tax:function(){var t=L.taxShipping?F.total()+F.shipping():F.total(),e=F.taxRate()*t;return F.each(function(t){t.get("tax")?e+=t.get("tax"):t.get("taxRate")&&(e+=t.get("taxRate")*t.total())}),parseFloat(e)},taxRate:function(){return L.taxRate||0},shipping:function(t){if(s(t))return void F({shippingCustom:t});var e=L.shippingQuantityRate*F.quantity()+L.shippingTotalRate*F.total()+L.shippingFlatRate;return s(L.shippingCustom)&&(e+=L.shippingCustom.call(F)),F.each(function(t){e+=parseFloat(t.get("shipping")||0)}),parseFloat(e)}}),m={attr:function(t,e){return t.get(e.attr)||""},currency:function(t,e){return F.toCurrency(t.get(e.attr)||0)},link:function(t,e){return"<a href='"+t.get(e.attr)+"'>"+e.text+"</a>"},decrement:function(t,e){return"<a href='javascript:;' class='"+_+"_decrement'>"+(e.text||"")+"</a>"},increment:function(t,e){return"<a href='javascript:;' class='"+_+"_increment'>"+(e.text||"")+"</a>"},image:function(t,e){return"<img src='"+t.get(e.attr)+"'/>"},input:function(t,e){return"<input type='text' value='1"+t.get(e.attr)+"' class='"+_+"_input'/>"},remove:function(t,e){return"<a href='javascript:;' class='"+_+"_remove'>"+(e.text||"")+"</a>"}},F.extend({writeCart:function(t){var e,n,i,a,c,o=L.cartStyle.toLowerCase(),u="table"===o,s=u?"tr":"div",l=u?"th":"div",d=u?"td":"div",h=u?"thead":"div",f=F.$create(o),m=F.$create(h),p=F.$create(s).addClass("headerRow"),v=F.$(t);for(v.html(" ").append(f),f.append(m),m.append(p),a=0,c=L.cartColumns.length;c>a;a+=1)e=r(L.cartColumns[a]),n="item-"+(e.attr||e.view||e.label||e.text||"cell")+" "+e.className,i=e.label||"",p.append(F.$create(l).addClass(n).html(i));return F.each(function(t,e){F.createCartRow(t,e,s,d,f)}),f},createCartRow:function(t,e,n,a,c){var u,s,l,d,h,f,m=F.$create(n).addClass("itemRow row-"+e+" "+(e%2?"even":"odd")).attr("id","cartItem_"+t.id());for(c.append(m),u=0,s=L.cartColumns.length;s>u;u+=1)l=r(L.cartColumns[u]),d="item-"+(l.attr||(o(l.view)?l.view:l.label||l.text||"cell"))+" "+l.className,h=i(t,l),f=F.$create(a).addClass(d).html(h),m.append(f);return m}}),F.Item=function(t){function e(){o(n.price)&&(n.price=parseFloat(n.price.replace(F.currency().decimal,".").replace(/[^0-9\.]+/gi,""))),isNaN(n.price)&&(n.price=0),n.price<0&&(n.price=0),o(n.quantity)&&(n.quantity=parseInt(n.quantity.replace(F.currency().delimiter,""),10)),isNaN(n.quantity)&&(n.quantity=1),n.quantity<=0&&r.remove()}var n={},r=this;for(l(t)&&F.extend(n,t),v+=1,n.id=n.id||g+v;!u(y[n.id]);)v+=1,n.id=g+v;r.get=function(t,e){var i=!e;return u(t)?t:s(n[t])?n[t].call(r):u(n[t])?s(r[t])&&i?r[t].call(r):!u(r[t])&&i?r[t]:n[t]:n[t]},r.set=function(t,i){return u(t)||(n[t.toLowerCase()]=i,"price"!==t.toLowerCase()&&"quantity"!==t.toLowerCase()||e()),r},r.equals=function(t){for(var e in n)if(Object.prototype.hasOwnProperty.call(n,e)&&"quantity"!==e&&"id"!==e&&t.get(e)!==n[e])return!1;return!0},r.options=function(){var t={};return F.each(n,function(e,n,i){var a=!0;F.each(r.reservedFields(),function(t){return t===i&&(a=!1),a}),a&&(t[i]=r.get(i))}),t},e()},F.Item._=F.Item.prototype={increment:function(t){var e=t||1;return e=parseInt(e,10),this.quantity(this.quantity()+e),this.quantity()<1?(this.remove(),null):this},decrement:function(t){var e=t||1;return this.increment(-parseInt(e,10))},remove:function(t){var e=F.trigger("beforeRemove",[y[this.id()]]);return e===!1?!1:(delete y[this.id()],t||F.update(),null)},reservedFields:function(){return["quantity","id","item_number","price","name","shipping","tax","taxRate"]},fields:function(){var t={},e=this;return F.each(e.reservedFields(),function(n){e.get(n)&&(t[n]=e.get(n))}),t},quantity:function(t){return u(t)?parseInt(this.get("quantity",!0)||1,10):this.set("quantity",t)},price:function(t){return u(t)?parseFloat(this.get("price",!0).toString().replace(F.currency().symbol,"").replace(F.currency().delimiter,"")||1):this.set("price",parseFloat(t.toString().replace(F.currency().symbol,"").replace(F.currency().delimiter,"")))},id:function(){return this.get("id",!1)},total:function(){return this.quantity()*this.price()}},F.extend({checkout:function(){if("custom"===L.checkout.type.toLowerCase()&&s(L.checkout.fn))L.checkout.fn.call(F,L.checkout);else if(s(F.checkout[L.checkout.type])){var t=F.checkout[L.checkout.type].call(F,L.checkout);t.data&&t.action&&t.method&&!1!==F.trigger("beforeCheckout",[t.data])&&F.generateAndSendForm(t)}else F.error("No Valid Checkout Method Specified")},extendCheckout:function(t){return F.extend(F.checkout,t)},generateAndSendForm:function(t){var e=F.$create("form");e.attr("style","display:none;"),e.attr("action",t.action),e.attr("method",t.method),F.each(t.data,function(t,n,r){e.append(F.$create("input").attr("type","hidden").attr("name",r).val(t))}),F.$("body").append(e),e.el.submit(),e.remove()}}),F.extendCheckout({PayPal:function(t){if(!t.email)return F.error("No email provided for PayPal checkout");var e={cmd:"_cart",upload:"1",currency_code:F.currency().code,business:t.email,rm:"POST"===t.method?"0":"2",tax_cart:(1*F.tax()).toFixed(2),handling_cart:(1*F.shipping()).toFixed(2),charset:"utf-8"},n=(t.sandbox,""),r=("POST"===t.method,"POST");return t.success&&(e["return"]=t.success),t.cancel&&(e.cancel_return=t.cancel),t.notify&&(e.notify_url=t.notify),F.each(function(t,n){var r,i=n+1,a=t.options(),c=0;e["item_name_"+i]=t.get("name"),e["quantity_"+i]=t.quantity(),e["amount_"+i]=(1*t.price()).toFixed(2),e["item_number_"+i]=t.get("item_number")||i,F.each(a,function(t,n,a){10>n&&(r=!0,F.each(L.excludeFromCheckout,function(t){t===a&&(r=!1)}),r&&(c+=1,e["on"+n+"_"+i]=a,e["os"+n+"_"+i]=t))}),e["option_index_"+n]=Math.min(10,c)}),{action:n,method:r,data:e}},GoogleCheckout:function(t){if(!t.merchantID)return F.error("No merchant id provided for GoogleCheckout");if("GTQ"!==F.currency().code&&"GBP"!==F.currency().code)return F.error("");var e={ship_method_name_1:"Shipping",ship_method_price_1:F.shipping(),ship_method_currency_1:F.currency().code,_charset_:""},n=""+t.merchantID,r=("POST"===t.method,"POST");return F.each(function(t,n){var r,i=n+1,a=[];e["item_name_"+i]=t.get("name"),e["item_quantity_"+i]=t.quantity(),e["item_price_"+i]=t.price(),e["item_currency_ "+i]=F.currency().code,e["item_tax_rate"+i]=t.get("taxRate")||F.taxRate(),F.each(t.options(),function(t,e,n){r=!0,F.each(L.excludeFromCheckout,function(t){t===n&&(r=!1)}),r&&a.push(n+": "+t)}),e["item_description_"+i]=a.join(", ")}),{action:n,method:r,data:e}},AmazonPayments:function(t){if(!t.merchant_signature)return F.error("No merchant signature provided for Amazon Payments");if(!t.merchant_id)return F.error("No merchant id provided for Amazon Payments");if(!t.aws_access_key_id)return F.error("No AWS access key id provided for Amazon Payments");var e={aws_access_key_id:t.aws_access_key_id,merchant_signature:t.merchant_signature,currency_code:F.currency().code,tax_rate:F.taxRate(),weight_unit:t.weight_unit||"lb"},n="https://payments"+(t.sandbox?"-sandbox":"")+".amazon.com/checkout/"+t.merchant_id,r="GET"===t.method?"GET":"POST";return F.each(function(n,r){var i=r+1,a=[];e["item_title_"+i]=n.get("name"),e["item_quantity_"+i]=n.quantity(),e["item_price_"+i]=n.price(),e["item_sku_ "+i]=n.get("sku")||n.id(),e["item_merchant_id_"+i]=t.merchant_id,n.get("weight")&&(e["item_weight_"+i]=n.get("weight")),L.shippingQuantityRate&&(e["shipping_method_price_per_unit_rate_"+i]=L.shippingQuantityRate),F.each(n.options(),function(t,e,n){var r=!0;F.each(L.excludeFromCheckout,function(t){t===n&&(r=!1)}),r&&"weight"!==n&&"tax"!==n&&a.push(n+": "+t)}),e["item_description_"+i]=a.join(", ")}),{action:n,method:r,data:e}},SendForm:function(t){if(!t.url)return F.error("URL required for SendForm Checkout");var e={currency:F.currency().code,shipping:F.shipping(),tax:F.tax(),taxRate:F.taxRate(),itemCount:F.find({}).length},n=t.url,r="GET"===t.method?"GET":"POST";return F.each(function(t,n){var r,i=n+1,a=[];e["item_name_"+i]=t.get("name"),e["item_quantity_"+i]=t.quantity(),e["item_price_"+i]=t.price(),F.each(t.options(),function(t,e,n){r=!0,F.each(L.excludeFromCheckout,function(t){t===n&&(r=!1)}),r&&a.push(n+": "+t)}),e["item_options_"+i]=a.join(", ")}),t.success&&(e["return"]=t.success),t.cancel&&(e.cancel_return=t.cancel),t.extra_data&&(e=F.extend(e,t.extra_data)),{action:n,method:r,data:e}}}),x={bind:function(t,e){if(!s(e))return this;this._events||(this._events={});var n=t.split(/ +/);return F.each(n,function(t){this._events[t]===!0?e.apply(this):u(this._events[t])?this._events[t]=[e]:this._events[t].push(e)}),this},trigger:function(t,e){var n,r,i=!0;if(this._events||(this._events={}),!u(this._events[t])&&s(this._events[t][0]))for(n=0,r=this._events[t].length;r>n;n+=1)i=this._events[t][n].apply(this,e||[]);return i!==!1}},x.on=x.bind,F.extend(x),F.extend(F.Item._,x),C={beforeAdd:null,afterAdd:null,load:null,beforeSave:null,afterSave:null,update:null,ready:null,checkoutSuccess:null,checkoutFail:null,beforeCheckout:null,beforeRemove:null},F(C),F.each(C,function(t,e,n){F.bind(n,function(){s(L[n])&&L[n].apply(this,arguments)})}),F.extend({toCurrency:function(t,e){var n=parseFloat(t),r=e||{},i=F.extend(F.extend({symbol:"$",decimal:".",delimiter:",",accuracy:2,after:!1},F.currency()),r),a=n.toFixed(i.accuracy).split("."),c=a[1],o=a[0];return o=F.chunk(o.reverse(),3).join(i.delimiter.reverse()).reverse(),(i.after?"":i.symbol)+o+(c?i.decimal+c:"")+(i.after?i.symbol:"")},chunk:function(t,e){"undefined"==typeof e&&(e=2);var n=t.match(new RegExp(".{1,"+e+"}","g"));return n||[]}}),String.prototype.reverse=function(){return this.split("").reverse().join("")},F.extend({currency:function(t){if(o(t)&&!u(q[t]))L.currency=t;else{if(!l(t))return q[L.currency];q[t.code]=t,L.currency=t.code}}}),F.extend({bindOutlets:function(t){F.each(t,function(t,e,n){F.bind("update",function(){F.setOutlet("."+_+"_"+n,t)})})},setOutlet:function(t,e){var n=e.call(F,t);l(n)&&n.el?F.$(t).html(" ").append(n):u(n)||F.$(t).html(n)},bindInputs:function(t){F.each(t,function(t){F.setInput("."+_+"_"+t.selector,t.event,t.callback)})},setInput:function(t,e,n){F.$(t).live(e,n)}}),F.ELEMENT=function(t){this.create(t),this.selector=t||null},F.extend(b,{MooTools:{text:function(t){return this.attr(T,t)},html:function(t){return this.attr(R,t)},val:function(t){return this.attr(E,t)},attr:function(t,e){return u(e)?this.el[0]&&this.el[0].get(t):(this.el.set(t,e),this)},remove:function(){return this.el.dispose(),null},addClass:function(t){return this.el.addClass(t),this},removeClass:function(t){return this.el.removeClass(t),this},append:function(t){return this.el.adopt(t.el),this},each:function(t){return s(t)&&F.each(this.el,function(e,n,r){t.call(n,n,e,r)}),this},click:function(t){return s(t)?this.each(function(e){e.addEvent(S,function(n){t.call(e,n)})}):u(t)&&this.el.fireEvent(S),this},live:function(t,e){var n=this.selector;s(e)&&F.$("body").el.addEvent(t+":relay("+n+")",function(t,n){e.call(n,t)})},match:function(t){return this.el.match(t)},parent:function(){return F.$(this.el.getParent())},find:function(t){return F.$(this.el.getElements(t))},closest:function(t){return F.$(this.el.getParent(t))},descendants:function(){return this.find("*")},tag:function(){return this.el[0].tagName},submit:function(){return this.el[0].submit(),this},create:function(t){this.el=f(t)}},Prototype:{text:function(t){return u(t)?this.el[0].innerHTML:(this.each(function(e,n){$(n).update(t)}),this)},html:function(t){return this.text(t)},val:function(t){return this.attr(E,t)},attr:function(t,e){return u(e)?this.el[0].readAttribute(t):(this.each(function(n,r){$(r).writeAttribute(t,e)}),this)},append:function(t){return this.each(function(e,n){t.el?t.each(function(t,e){$(n).appendChild(e)}):d(t)&&$(n).appendChild(t)}),this},remove:function(){return this.each(function(t,e){$(e).remove()}),this},addClass:function(t){return this.each(function(e,n){$(n).addClassName(t)}),this},removeClass:function(t){return this.each(function(e,n){$(n).removeClassName(t)}),this},each:function(t){return s(t)&&F.each(this.el,function(e,n,r){t.call(n,n,e,r)}),this},click:function(t){return s(t)?this.each(function(e,n){$(n).observe(S,function(e){t.call(n,e)})}):u(t)&&this.each(function(t,e){$(e).fire(S)}),this},live:function(t,n){if(s(n)){var r=this.selector;e.observe(t,function(t,e){e===f(t).findElement(r)&&n.call(e,t)})}},parent:function(){return F.$(this.el.up())},find:function(t){return F.$(this.el.getElementsBySelector(t))},closest:function(t){return F.$(this.el.up(t))},descendants:function(){return F.$(this.el.descendants())},tag:function(){return this.el.tagName},submit:function(){this.el[0].submit()},create:function(t){o(t)?this.el=f(t):d(t)&&(this.el=[t])}},jQuery:{passthrough:function(t,e){return u(e)?this.el[t]():(this.el[t](e),this)},text:function(t){return this.passthrough(T,t)},html:function(t){return this.passthrough(R,t)},val:function(t){return this.passthrough("val",t)},append:function(t){var e=t.el||t;return this.el.append(e),this},attr:function(t,e){return u(e)?this.el.attr(t):(this.el.attr(t,e),this)},remove:function(){return this.el.remove(),this},addClass:function(t){return this.el.addClass(t),this},removeClass:function(t){return this.el.removeClass(t),this},each:function(t){return this.passthrough("each",t)},click:function(t){return this.passthrough(S,t)},live:function(t,n){return f(e).delegate(this.selector,t,n),this},parent:function(){return F.$(this.el.parent())},find:function(t){return F.$(this.el.find(t))},closest:function(t){return F.$(this.el.closest(t))},tag:function(){return this.el[0].tagName},descendants:function(){return F.$(this.el.find("*"))},submit:function(){return this.el.submit()},create:function(t){this.el=f(t)}}}),F.ELEMENT._=F.ELEMENT.prototype,F.ready(F.setupViewTool),F.ready(function(){F.bindOutlets({total:function(){return F.toCurrency(F.total())},quantity:function(){return F.quantity()},items:function(t){F.writeCart(t)},tax:function(){return F.toCurrency(F.tax())},taxRate:function(){return F.taxRate().toFixed()},shipping:function(){return F.toCurrency(F.shipping())},grandTotal:function(){return F.toCurrency(F.grandTotal())}}),F.bindInputs([{selector:"checkout",event:"click",callback:function(){F.checkout()}},{selector:"empty",event:"click",callback:function(){F.empty()}},{selector:"increment",event:"click",callback:function(){F.find(F.$(this).closest(".itemRow").attr("id").split("_")[1]).increment(),F.update()}},{selector:"decrement",event:"click",callback:function(){F.find(F.$(this).closest(".itemRow").attr("id").split("_")[1]).decrement(),F.update()}},{selector:"remove",event:"click",callback:function(){F.find(F.$(this).closest(".itemRow").attr("id").split("_")[1]).remove()}},{selector:"input",event:"change",callback:function(){var t=F.$(this),e=t.parent(),n=e.attr("class").split(" ");F.each(n,function(n){if(n.match(/item-.+/i)){var r=n.split("-")[1];return F.find(e.closest(".itemRow").attr("id").split("_")[1]).set(r,t.val()),void F.update()}})}},{selector:"shelfItem .item_add",event:"click",callback:function(){var t=F.$(this),e={};t.closest("."+_+"_shelfItem").descendants().each(function(t,n){var r=F.$(n);r.attr("class")&&r.attr("class").match(/item_.+/)&&!r.attr("class").match(/item_add/)&&F.each(r.attr("class").split(" "),function(t){var n,i,a;if(t.match(/item_.+/)){switch(n=t.split("_")[1],i="",r.tag().toLowerCase()){case"input":case"textarea":case"select":a=r.attr("type"),a&&("checkbox"!==a.toLowerCase()&&"radio"!==a.toLowerCase()||!r.attr("checked"))&&"text"!==a.toLowerCase()&&"number"!==a.toLowerCase()||(i=r.val());break;case"img":i=r.attr("src");break;default:i=r.text()}null!==i&&""!==i&&(e[n.toLowerCase()]=e[n.toLowerCase()]?e[n.toLowerCase()]+", "+i:i)}})}),F.add(e)}}])}),e.addEventListener?t.DOMContentLoaded=function(){e.removeEventListener("DOMContentLoaded",DOMContentLoaded,!1),F.init()}:e.attachEvent&&(t.DOMContentLoaded=function(){"complete"===e.readyState&&(e.detachEvent("onreadystatechange",DOMContentLoaded),F.init())}),c(),F};t.simpleCart=h()}(window,document),$(document).ready(function(){simpleCart({cartColumns:[{attr:"size",label:"size"},{attr:"pageLink",view:"link",label:""},{attr:"name",label:!1},{view:"image",attr:"thumb",label:!1},{view:"increment",labe:!1},{view:"decrement",labe:!1},{attr:"quantity",label:""},{attr:"total",label:!1,view:"currency"},{view:"remove",label:!1}]}),simpleCart.bind("beforeCheckout",function(t){return t.firstname=document.getElementById("firstname").value,t.lastname=document.getElementById("lastname").value,t.address=document.getElementById("address").value,t.email=document.getElementById("email").value,t.phone=document.getElementById("phone").value,t.comments=document.getElementById("comments").value,emailval=/\w+@\w+\.+[a-z]/,""===t.firstname||""===t.lastname||""===t.address||""===t.phone||""===t.comments?(alert("Todos los campos deben llenarse"),!1):t.firstname.length>20?(alert("nombre muy largo"),!1):isNaN(t.firstname)?t.lastname.length>20?(alert("Apellido muy largo"),!1):isNaN(t.lastname)?t.address.length>50?(alert("direccion de entrega muy largo"),!1):t.email.length>27?(alert("Email muy largo"),!1):t.phone.length>11?(alert("telefono  muy largo"),!1):t.phone.length<8?(alert("telefono  muy corto"),!1):isNaN(t.phone)?(alert("ingrese un numero telefonico valido"),!1):t.comments.length>500?(alert("comentario  muy largo"),!1):void 0:(alert("Apellido invalido"),!1):(alert("nombre invalido"),!1)})});

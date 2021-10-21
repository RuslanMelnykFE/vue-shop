(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bc190d7c"],{"214e":function(t,e,r){"use strict";var u=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"form__counter"},[r("button",{attrs:{type:"button","aria-label":"Убрать один товар"},on:{click:function(e){return e.preventDefault(),t.productDecrement.apply(null,arguments)}}},[r("svg",{attrs:{width:t.widthButton,height:t.heightButton,fill:"currentColor"}},[r("use",{attrs:{"xlink:href":"#icon-minus"}})])]),r("input",{directives:[{name:"model",rawName:"v-model.number",value:t.inputValue,expression:"inputValue",modifiers:{number:!0}}],attrs:{type:"text",name:"count"},domProps:{value:t.inputValue},on:{input:[function(e){e.target.composing||(t.inputValue=t._n(e.target.value))},function(e){return t.amountInput(e.target.value)}],blur:[function(e){return t.amountInput(e.target.value)},function(e){return t.$forceUpdate()}],focus:function(e){return t.amountInput(e.target.value)}}}),r("button",{attrs:{type:"button","aria-label":"Добавить один товар"},on:{click:function(e){return e.preventDefault(),t.productIncrement.apply(null,arguments)}}},[r("svg",{attrs:{width:t.widthButton,height:t.heightButton,fill:"currentColor"}},[r("use",{attrs:{"xlink:href":"#icon-plus"}})])])])},n=[],a=(r("a9e3"),{name:"ProductCounter",props:{value:{type:[Number,String],default:1},widthButton:{type:String,default:"10"},heightButton:{type:String,default:"10"}},data:function(){return{inputValue:1,timerId:0}},created:function(){this.inputValue=this.value},watch:{value:function(t){this.inputValue=t}},methods:{amountInput:function(t){var e=this;clearTimeout(this.timerId),this.timerId=setTimeout((function(){if(!Number(t)||t<1)return e.inputValue=1,void e.$emit("input",1);e.$emit("input",e.inputValue)}),500)},productIncrement:function(){this.$emit("input",this.inputValue+1)},productDecrement:function(){this.inputValue>1&&this.$emit("input",this.inputValue-1)}}}),c=a,o=r("2877"),i=Object(o["a"])(c,u,n,!1,null,null,null);e["a"]=i.exports},"433e":function(t,e,r){"use strict";r.r(e);var u=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("main",{staticClass:"content container"},[r("div",{staticClass:"content__top"},[r("ul",{staticClass:"breadcrumbs"},[r("li",{staticClass:"breadcrumbs__item"},[r("router-link",{staticClass:"breadcrumbs__link",attrs:{to:{name:"main"}}},[t._v(" Каталог ")])],1),t._m(0)]),r("h1",{staticClass:"content__title"},[t._v(" Корзина ")]),t.amountsProducts?r("span",{staticClass:"content__info"},[t._v(" "+t._s(t.amountsProducts)+" "+t._s(t.formatedText)+" ")]):t._e()]),r("the-cart")],1)},n=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("li",{staticClass:"breadcrumbs__item"},[r("a",{staticClass:"breadcrumbs__link"},[t._v(" Корзина ")])])}],a=r("547e"),c=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"cart"},[r("form",{staticClass:"cart__form form",attrs:{action:"#",method:"POST"}},[r("div",{staticClass:"cart__field"},[r("ul",{staticClass:"cart__list"},t._l(t.cartProducts,(function(t){return r("cart-item",{key:"cart-"+t.product.id,attrs:{"cart-product":t}})})),1)]),r("div",{staticClass:"cart__block"},[r("p",{staticClass:"cart__desc"},[t._v(" Мы посчитаем стоимость доставки на следующем этапе ")]),r("p",{staticClass:"cart__price"},[t._v("Итого: "),r("span",[t._v(t._s(t._f("formatedNumber")(t.totalPrice))+" у.е.")])]),t.cartProducts.length?r("router-link",{attrs:{to:{name:"order"},custom:""},scopedSlots:t._u([{key:"default",fn:function(e){var u=e.navigate;return[r("button",{staticClass:"cart__button button button--primery",attrs:{type:"button"},on:{click:u}},[t._v(" Оформить заказ ")])]}}],null,!1,1022736820)}):t._e()],1)])])},o=[],i=r("5530"),s=r("2f62"),l=r("b400"),d=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("li",{staticClass:"cart__item product"},[t.productImage?r("div",{staticClass:"product__pic"},[r("img",{attrs:{src:t.productImage.url,width:"120",height:"120",alt:t.productImage.title}})]):t._e(),r("h3",{staticClass:"product__title"},[t._v(" "+t._s(t.cartProduct.product.title)+" ")]),t._m(0),r("span",{staticClass:"product__code"},[t._v(" Артикул: "+t._s(t.cartProduct.product.id)+" ")]),r("product-counter",{staticClass:"product__counter",attrs:{"width-button":"10","height-button":"10"},model:{value:t.productAmount,callback:function(e){t.productAmount=t._n(e)},expression:"productAmount"}}),r("b",{staticClass:"product__price"},[t._v(" "+t._s(t._f("formatedNumber")(t.getSumProducts(t.cartProduct.amount,t.cartProduct.product.price)))+" у.е. ")]),r("button",{staticClass:"product__del button-del",attrs:{type:"button","aria-label":"Удалить товар из корзины"},on:{click:function(e){return e.preventDefault(),t.deleteProduct(t.cartProduct.product.id)}}},[r("svg",{attrs:{width:"20",height:"20",fill:"currentColor"}},[r("use",{attrs:{"xlink:href":"#icon-close"}})])])],1)},m=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("p",{staticClass:"product__info"},[t._v("Объем: "),r("span",[t._v("128GB")])])}],p=r("214e"),_={name:"CartItem",filters:{formatedNumber:l["a"]},components:{ProductCounter:p["a"]},props:{cartProduct:{type:Object,required:!0}},computed:{productAmount:{get:function(){return this.cartProduct.amount},set:function(t){console.log("value: ",t),this.updateProductAmount({productId:this.cartProduct.productId,amount:t||1})}},productImage:function(){return this.cartProduct.product.image?this.cartProduct.product.image.file:null}},methods:Object(i["a"])(Object(i["a"])({},Object(s["b"])("cart",{updateProductAmount:"updateCartProductAmount",deleteProduct:"deleteCartProduct"})),{},{getSumProducts:function(t,e){return t*e}})},f=_,b=r("2877"),h=Object(b["a"])(f,d,m,!1,null,null,null),v=h.exports,C={name:"Cart",filters:{formatedNumber:l["a"]},components:{CartItem:v},computed:Object(i["a"])({},Object(s["c"])("cart",{cartProducts:"cartDetailProducts",totalPrice:"cartTotalPrice"}))},g=C,P=Object(b["a"])(g,c,o,!1,null,null,null),k=P.exports,I={name:"ViewCart",mixins:[a["b"]],components:{TheCart:k}},w=I,O=Object(b["a"])(w,u,n,!1,null,null,null);e["default"]=O.exports},"547e":function(t,e,r){"use strict";r.d(e,"a",(function(){return o})),r.d(e,"b",(function(){return c}));var u=r("5530"),n=r("2f62"),a=r("b400"),c={computed:Object(u["a"])(Object(u["a"])({},Object(n["c"])("cart",{amountsProducts:"amountItemsCart"})),{},{formatedText:function(){return Object(a["b"])(this.amountsProducts)}})},o={filters:{formatedNumber:a["a"]}}}}]);
//# sourceMappingURL=chunk-bc190d7c.85a832df.js.map
(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[905],{3812:function(s,e,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/products/[slug]",function(){return c(7019)}])},7019:function(s,e,c){"use strict";c.r(e),c.d(e,{__N_SSG:function(){return h}});var i=c(5893),n=c(7294),r=c(594),t=c(1163),a=c(8193),d=c(7188),l=c(9885),o=c(1291),u=c(1664),h=!0;e.default=function(s){var e=s.product,c=s.products,h=s.sameCategoryProducts,p=(0,t.useRouter)(),x=e.img_src,j=e.product_name,m=e.price,y=e.count,N=(0,n.useState)(0),f=(N[0],N[1],(0,o.F)()),v=f.decQty,_=f.incQty,k=f.qty,w=f.onAdd,g=f.sessionID,b=f.onPurchase,C=f.setQty,q=f.updateHistorial,D=f.getRecommendations,E=f.historialRecommendations;return(0,n.useEffect)((function(){var s={user_id:g,product_id:e.product_id,event_type:"view"};C(1),r.Z.post("".concat(d.ue,"/interaction"),s).then((function(s){D(20),q()}))}),[p.asPath]),(0,i.jsxs)("div",{children:[(0,i.jsxs)("div",{className:"product-detail-container",children:[(0,i.jsx)("div",{children:(0,i.jsx)("div",{className:"image-container",children:(0,i.jsx)("img",{src:x})})}),(0,i.jsxs)("div",{className:"product-details-desc",children:[(0,i.jsx)("h1",{children:j.titlefy()}),(0,i.jsxs)("div",{className:"reviews",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)(a.pHD,{}),(0,i.jsx)(a.pHD,{}),(0,i.jsx)(a.pHD,{}),(0,i.jsx)(a.pHD,{}),(0,i.jsx)(a.pHD,{})]}),(0,i.jsx)("p",{children:y})]}),(0,i.jsxs)("h3",{children:["Category: ",(0,i.jsx)(u.default,{href:"/category/".concat(e.category_code.slugify()),children:(0,i.jsx)("a",{children:e.category_code.titlefy("-")})})]}),(0,i.jsxs)("h3",{children:["Brand:  ",(0,i.jsx)("span",{children:e.brand.titlefy()})," "]}),(0,i.jsxs)("p",{className:"price",children:["$",m]}),(0,i.jsxs)("div",{className:"quantity",children:[(0,i.jsx)("h3",{children:"Quantity:"}),(0,i.jsxs)("p",{className:"quantity-desc",children:[(0,i.jsx)("span",{className:"minus",onClick:v,children:(0,i.jsx)(a.ywL,{})}),(0,i.jsx)("span",{className:"num",children:k}),(0,i.jsx)("span",{className:"plus",onClick:_,children:(0,i.jsx)(a.Lfi,{})})]})]}),(0,i.jsxs)("div",{className:"buttons",children:[(0,i.jsx)("button",{type:"button",className:"add-to-cart",onClick:function(){w(e,k)},children:"Add to Cart"}),(0,i.jsx)("button",{type:"button",className:"buy-now",onClick:function(){b(e,k)},children:"Buy Now"})]})]})]}),(0,i.jsxs)("div",{className:"maylike-products-wrapper",children:[(0,i.jsx)("h2",{children:"Similar Products"}),(0,i.jsx)("div",{className:"marquee",children:(0,i.jsx)("div",{className:"maylike-products-container track",children:h.map((function(s){return(0,i.jsx)(l.W6,{product:s},s.id)}))})})]}),c&&(0,i.jsxs)("div",{className:"maylike-products-wrapper",children:[(0,i.jsx)("h2",{children:"Other users also searched for..."}),(0,i.jsx)("div",{className:"marquee",children:(0,i.jsx)("div",{className:"maylike-products-container track",children:c.map((function(s){return(0,i.jsx)(l.W6,{product:s},s.id)}))})})]}),E&&E.length>0&&(0,i.jsxs)("div",{className:"maylike-products-wrapper",children:[(0,i.jsx)("h2",{children:"Based on your historial..."}),(0,i.jsx)("div",{className:"marquee",children:(0,i.jsx)("div",{className:"maylike-products-container track",children:null===E||void 0===E?void 0:E.map((function(s){return(0,i.jsx)(l.W6,{product:s},s.id)}))})})]})]})}},1163:function(s,e,c){s.exports=c(387)}},function(s){s.O(0,[774,888,179],(function(){return e=3812,s(s.s=e);var e}));var e=s.O();_N_E=e}]);
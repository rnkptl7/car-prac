import{o as t,a as n,F as d,j as m,z as S,A as p,_,r as $,b as f,d as u,f as h,u as g,t as y}from"./index-3a76fd50.js";var q=(e,s)=>{const r=e.__vccOpts||e;for(const[a,i]of s)r[a]=i;return r};const z={name:"ScalingSquaresSpinner",props:{animationDuration:{type:Number,default:1250},size:{type:Number,default:65},color:{type:String,default:"#fff"}},data(){return{squaresNum:4}},computed:{spinnerStyle(){return{height:`${this.size}px`,width:`${this.size}px`,animationDuration:`${this.animationDuration}ms`}},squareStyle(){return{height:`${this.size*.25/1.3}px`,width:`${this.size*.25/1.3}px`,animationDuration:`${this.animationDuration}ms`,borderWidth:`${this.size*.04/1.3}px`,borderColor:this.color}},squaresStyles(){const e=[];for(let s=1;s<=this.squaresNum;s++)e.push(Object.assign({},this.squareStyle));return e}}};function v(e,s,r,a,i,o){return t(),n("div",{class:"scaling-squares-spinner",style:p(o.spinnerStyle)},[(t(!0),n(d,null,m(o.squaresStyles,(c,l)=>(t(),n("div",{key:l,class:S(["square",`square-${l+1}`]),style:p(c)},null,6))),128))],4)}var x=q(z,[["render",v]]);const b={components:{ScalingSquaresSpinner:x}},D=u("h2",null,"Loading...",-1);function N(e,s,r,a,i,o){const c=$("ScalingSquaresSpinner");return t(),n("div",null,[f(c,{"animation-duration":1e3,size:60,color:"#fff"}),D])}const j=_(b,[["render",N]]),k="/images/error_icon.png",C={computed:{...h(g,["error"])}},L=u("img",{src:k,alt:""},null,-1);function B(e,s,r,a,i,o){return t(),n("div",null,[L,u("p",null,y(e.error),1)])}const w=_(C,[["render",B]]);export{w as E,j as L};

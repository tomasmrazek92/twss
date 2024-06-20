"use strict";(()=>{var x=window.innerWidth,w={};var E=(t,i,e,r,l)=>{let n=$(t);n.length!==0&&(w[e]=0,w[e]=w[e]||0,n.each(function(){let s=`${e}_${w[e]}`;O(this,i,s,[".swiper-arrow",".swiper-pagination",".swiper-drag-wrapper"]);let g=P(r,s);C(this,i,s,e,g,l),w[e]++}))},O=(t,i,e,r)=>{r.forEach(l=>{$(t).find(l).addClass(e)}),$(t).find(i).addClass(e)},P=(t,i)=>Object.assign({},t,{spaceBetween:32,navigation:{prevEl:`.swiper-arrow.prev.${i}`,nextEl:`.swiper-arrow.next.${i}`}}),C=(t,i,e,r,l,n)=>{swipers[r]=swipers[r]||{},swipers[r][e]=swipers[r][e]||{};let s=swipers[r][e],g=s.swiperInstance,p=n==="desktop"&&window.matchMedia("(min-width: 992px)").matches,m=n==="mobile"&&window.matchMedia("(min-width: 0px) and (max-width: 991px)").matches,f=n==="all",h=()=>{s.observer&&(s.observer.disconnect(),delete s.observer),g&&(g.destroy(!0,!0),delete swipers[r][e],console.log("Swiper destroyed for",i,"with uniqueKey",e))};!p&&n==="desktop"||!m&&n==="mobile"||!f&&n==="all"?h():(p||m||f)&&!g&&(()=>{s.observer&&s.observer.disconnect();let b=$(`${i}.${e}`)[0],o=new IntersectionObserver(a=>{a.forEach(d=>{if(d.isIntersecting&&(p||m||f)&&!g){let c=new Swiper(`${i}.${e}`,l);swipers[r][e]={swiperInstance:c,mode:p?"desktop":m?"mobile":"all",initialized:!0},o.disconnect(),console.log("Swiper initialized for",i,"with uniqueKey",e)}})},{});swipers[r][e].observer=o,o.observe(b)})()},v=t=>{t.forEach(i=>{E(...i)})},y=(t,i)=>{v(t),window.addEventListener("resize",function(){window.innerWidth!==x&&(x=window.innerWidth,v(t))})};gsap.defaults({ease:Power1.easeOut,duration:.8});var T=[[".swiper-box.cc-youtube",".swiper-box_inner","videos",{slidesPerView:"auto"},"all"],[".swiper-box.cc-articles",".swiper-box_inner","articles",{slidesPerView:1},"all"],[".swiper-box.cc-podcast",".swiper-box_inner","podcast",{slidesPerView:"auto"},"all"],[".swiper-box.cc-testimonials",".swiper-box_inner","testimonials",{slidesPerView:"1",effect:"fade",fadeEffect:{crossFade:!0}},"all"]];$(document).ready(function(){y(T)});var I=(t,i="words",e,r)=>{let l=gsap.timeline({onStart:()=>{n.css("opacity","1")},onComplete:()=>{n.addClass("loaded")}}),n=$(t);n.css("opacity","0");let s=new SplitType(t,{type:i});return l.from(s[i],{duration:e,ease:"linear",visibility:"hidden",stagger:r},"<-=0.3"),$(t).find(".w-embed").length&&l.from($(t).find(".w-embed"),{duration:e,y:"0.5em",opacity:0,stagger:r*10},"<"),l};$('[data-animation="section"]').each(function(){let t=$(this),i=$(this).find('[data-animation="label"]'),e=$(this).find('[data-animation="heading"]'),r=$(this).find('[data-animation="item"]'),l=$(this).find('[data-animation="item-start"]'),n=$(this).find('[data-animation="stagger"]'),s=$(this).find('[data-animation="text"]'),g=$(this).find('[data-animation="img-scale"]'),p=$(this).find('[data-animation="vertical-reveal"]'),m=$(this).find('[data-animation="horizontal-reveal"]'),f=$(this).find('[data-animation="signature"]'),h=$(this).eq(0).index(),u=t.attr("data-stagger")||.2,b=t.attr("data-start")||"50% bottom",o=gsap.timeline({scrollTrigger:{trigger:h===0?"body":t,start:h===0?"-10 top":b,markers:!0}});if(i.length&&i.each(function(){o.add(I($(this),"chars",.1,.05),"<")}),e.length){let a=e.attr("data-split-type")||"line",d=new SplitType(e,{types:"lines, words, chars",tagName:"span"});o.from(e.find(`.${a}`),{y:"2rem",opacity:0,duration:1,ease:"power3.out",stagger:.1},"<")}if(l.length&&o.from(l,{y:"2rem",opacity:0,stagger:u},"<"),g.length&&o.from(g,{scale:1.2},"<"),p.length&&p.each(function(){let a=gsap.timeline(),d=$(this).find(".vertical-mask"),c=$(this).find("img");a.from(d.eq(0),{yPercent:100,duration:1,ease:Power2.easeOut},"<"),a.from(d.eq(1),{yPercent:-100,duration:1,ease:Power2.easeOut},"<"),a.from(c,{scale:1.2},"<"),o.add(a,"<")}),m.length&&m.each(function(){let a=gsap.timeline(),d=$(this).find(".horizontal-mask"),c=d.attr("data-direction"),z=c==="left"?100:c==="right"?-100:0,k=$(this).find("img");a.from(d,{xPercent:100,duration:2,ease:Power2.easeOut},"<"),a.from(k,{scale:1.2,duration:2},"<"),o.add(a,"<")}),r.length){let a=o.getChildren();o.from(r,{y:"2rem",opacity:0,stagger:u},a.length>0?"-=0.9":"<")}if(s.length&&s.each(function(){let a=I($(this),"chars",.1,.02);o.add(a,0)}),n.length&&n.each(function(){let a=$(this).find('[data-animation="stagger-item"]'),d=$(this).attr("data-stagger")||.1;o.from(a,{y:"1rem",opacity:0,stagger:d},"<")}),f.length){let a=f.attr("data-direction"),d=a==="left"?-15:a==="right"?15:0;o.from(f,{opacity:0,rotate:d,duration:.4},"<0.2")}});})();

"use strict";(()=>{$(".podcast-illu").each(function(){let l=$(".podcast-illu_stars"),o=l.find("path"),a=$(".podcast-illu_label"),e=$(".podcast-illu_phone-bg"),r=$(".podcast-illu_thumb"),i=$(".podcast-illu_circle"),c=$(".podcast-illu_logo"),t=gsap.timeline({defaults:{ease:"power2.out",duration:1},scrollTrigger:{trigger:$(this),start:"center bottom"}});t.from(e,{yPercent:10,opacity:0,duration:1}),t.from(r,{scale:.9,opacity:0},"-=0.3"),t.from(i,{rotate:45,opacity:0},"<"),t.from(c,{scale:.8,opacity:0},"<"),t.from(l,{yPercent:50,rotate:5,opacity:0},"-=0.5"),t.from(o,{scale:0,stagger:.1},"<"),t.from(a,{yPercent:50,rotate:5,opacity:0},"<")});$(".socials-illu").each(function(){let l=$(".socials-illu_bg"),o=$(".socials-illu_label"),a=$(".socials-illu_sign"),e=gsap.timeline({defaults:{ease:"power2.out",duration:1},scrollTrigger:{trigger:$(this),start:"center bottom"},delay:.5});e.from(l,{yPercent:10,opacity:0,duration:1}),e.from(o,{yPercent:15,rotate:5,opacity:0,stagger:.3},"<"),e.from(a,{rotate:15,opacity:0},"-=0.8")});})();
